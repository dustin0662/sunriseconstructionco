// Backend storage helpers for the Midway field tool — designed to scale
// to ~20k+ captures without fanning out per-blob requests.
//
// Layout:
//   captures store (Netlify Blobs):
//     "index"   -> JSON { entries: { [moduleId]: { serial, user, ts, hasPhoto, row } } }
//                  Single blob, read in one round-trip. Updated with
//                  conditional writes (etag) + retry to stay race-safe.
//     "<id>"    -> JPEG bytes, one blob per captured module's photo.
//   sections store:
//     "index"   -> JSON { entries: { [moduleId]: sectionName } }
//
// We keep photos in their own keys (not in the index) so the index stays
// small (~3 MB at 20k entries) and photo reads are direct.
import { getStore } from "@netlify/blobs";

export const capturesStore       = () => getStore("captures");
export const sectionsStore       = () => getStore("sections");
export const photosStore         = () => getStore("photos");
export const drawingsStore       = () => getStore("drawings");
export const drawingChunksStore  = () => getStore("drawing-chunks");
const drawingsIndexBlobs         = () => getStore("drawings-index");
const INDEX_KEY = "index";
const MAX_CAS_RETRIES = 6;

// Read a JSON "index" blob with its etag. Returns { entries, etag }.
// Missing blob is treated as an empty index.
async function readIndex(store) {
  try {
    const r = await store.getWithMetadata(INDEX_KEY, { type: "json" });
    if (!r) return { entries: {}, etag: null };
    const data = r.data || {};
    return { entries: data.entries || {}, etag: r.etag || null };
  } catch { return { entries: {}, etag: null }; }
}

// Read-modify-write the index with optimistic concurrency. The mutator
// receives the current entries map and may mutate it directly; return
// value is ignored. On etag conflict we re-read and retry.
async function updateIndex(store, mutate) {
  for (let i = 0; i < MAX_CAS_RETRIES; i++) {
    const cur = await readIndex(store);
    await mutate(cur.entries);
    const body = JSON.stringify({ entries: cur.entries });
    const opts = cur.etag ? { onlyIfMatch: cur.etag } : { onlyIfNew: true };
    try {
      await store.set(INDEX_KEY, body, opts);
      return cur.entries;
    } catch (err) {
      const msg = String(err && err.message || err);
      // Conditional-write conflict -> retry. Anything else -> bubble up.
      if (!/precondition|etag|If-Match|If-None-Match|412|conflict/i.test(msg)) throw err;
    }
  }
  throw new Error("Index write contention exceeded retries");
}

export async function readCapturesIndex() { return readIndex(capturesStore()); }
export async function readSectionsIndex() { return readIndex(sectionsStore()); }
export async function readDrawingsIndex() { return readIndex(drawingsIndexBlobs()); }
export async function updateCaptures(mutate) { return updateIndex(capturesStore(), mutate); }
export async function updateSections(mutate) { return updateIndex(sectionsStore(), mutate); }
export async function updateDrawingsIndex(mutate) { return updateIndex(drawingsIndexBlobs(), mutate); }
