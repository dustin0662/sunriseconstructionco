import React, { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { Search, Plus, Trash2, Edit, Download, Upload, X, Check, ChevronLeft, ChevronRight, Menu, User, Users, Shield, Calendar as CalIcon, FileText, Settings as SettingsIcon, BarChart3, ClipboardList, FlaskConical, History as HistoryIcon, Home, Scale, ChevronDown, AlertTriangle, Info, MessageCircle, Send, Loader2, Eye, EyeOff } from "lucide-react"
import * as XLSX from "xlsx"

const CSS = `
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;touch-action:manipulation}
body{overflow-x:hidden;-webkit-overflow-scrolling:touch}
input,select,textarea{font-size:16px !important}
@media(max-width:768px){
  body{padding-bottom:env(safe-area-inset-bottom,0)}
  .desktop-only{display:none !important}
  input,select,textarea{font-size:16px !important}
}
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600&family=Barlow+Condensed:wght@400;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
@keyframes spin{to{transform:rotate(360deg)}}@keyframes spinR{to{transform:rotate(-360deg)}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
@keyframes pulseGlow{0%,100%{filter:drop-shadow(0 0 4px #F97316)}50%{filter:drop-shadow(0 0 18px #F97316)}}
@keyframes twinkle{0%,100%{opacity:.1}50%{opacity:.9}}
@keyframes letterIn{0%{opacity:0;transform:translateY(38px) skewY(8deg)}100%{opacity:1;transform:translateY(0)}}
@keyframes subIn{0%{opacity:0;letter-spacing:.8em}100%{opacity:1;letter-spacing:.36em}}
@keyframes glowPulse{0%,100%{box-shadow:0 0 28px rgba(249,115,22,.5)}50%{box-shadow:0 0 70px rgba(249,115,22,1)}}
@keyframes wave{0%{transform:scale(.2);opacity:.9}100%{transform:scale(3);opacity:0}}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes sonarWave{0%{r:6;opacity:.9}100%{r:28;opacity:0}}
@keyframes prismRay{0%{opacity:0;transform:scaleY(0)}100%{opacity:.75;transform:scaleY(1)}}
@keyframes mountainGlow{0%,100%{filter:drop-shadow(0 0 4px rgba(249,115,22,.3))}50%{filter:drop-shadow(0 0 18px rgba(249,115,22,.8))}}
@keyframes cityFlicker{0%,100%{opacity:.5}50%{opacity:1}}
@keyframes grassTrack{0%,100%{transform:rotateX(0)}50%{transform:rotateX(22deg)}}
@keyframes scrollLine{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
@keyframes shimmer{0%{left:-60%}100%{left:160%}}
@keyframes siteLight{0%,100%{opacity:.5}50%{opacity:1}}
@keyframes rayIn{0%{transform:scaleY(0);opacity:0}60%{transform:scaleY(1.1)}100%{transform:scaleY(1);opacity:1}}
@keyframes dustPuff{0%{opacity:.6;transform:scale(1)}100%{opacity:0;transform:scale(2.5) translate(4px,-8px)}}
`

const A='#F97316', G='#EAB308', N='#1e3a5f'

const SKY_STOPS=[
  ['#010108','#03011a','#140506','#220400'],['#040115','#0a041c','#200b04','#d45808'],
  ['#0a1225','#183050','#7a2006','#ff8c00'],['#163050','#234e80','#60a0c0','#ffc440'],
  ['#0048a0','#1070c0','#54a0c0','#c0e0ff'],['#122040','#235070','#b06030','#e89030'],
  ['#240a00','#501600','#b03000','#ff3800'],['#010106','#040818','#070e18','#100318'],
]
const SUN_STOPS=[[18,88],[27,78],[40,64],[54,40],[68,18],[80,42],[90,70],[97,92]]
const h2r=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16))
const lc=(c1,c2,t)=>{ const a=h2r(c1),b=h2r(c2); return `rgb(${a.map((v,i)=>Math.round(v+(b[i]-v)*t)).join(',')})` }
const lv=(a,b,t)=>a+(b-a)*t
function skyAt(p){const idx=p*(SKY_STOPS.length-1),i=Math.min(SKY_STOPS.length-2,Math.floor(idx)),t=idx-i;return SKY_STOPS[i].map((c,ci)=>lc(c,SKY_STOPS[i+1][ci],t))}
function sunAt(p){const idx=p*(SUN_STOPS.length-1),i=Math.min(SUN_STOPS.length-2,Math.floor(idx)),t=idx-i;return[lv(SUN_STOPS[i][0],SUN_STOPS[i+1][0],t),lv(SUN_STOPS[i][1],SUN_STOPS[i+1][1],t)]}

function bbox(pts){
  const pairs=pts.trim().split(/\s+/).map(p=>p.split(',').map(Number))
  const xs=pairs.map(p=>p[0]),ys=pairs.map(p=>p[1])
  return{x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)}
}

const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v))
const phaseP=(scrollP,start,end)=>clamp((scrollP-start)/(end-start),0,1)

// ── 4 zones matching real aerial solar construction photo ──────────
const Z_PTS = [
  '211,0 533,0 600,0 622,31 589,59 589,248 111,248 111,203 61,203 61,126 111,64 211,0',
  '111,259 589,259 589,303 689,303 733,414 733,526 644,537 589,537 467,537 411,537 278,537 222,492 156,470 50,437 39,359 56,281 111,259',
  '156,481 278,548 411,548 589,548 644,548 700,548 700,620 633,681 578,714 422,720 278,720 222,720 178,720 144,692 133,648 117,603 133,548 156,481',
  '822,120 822,359 989,359 1000,314 1000,126 822,120',
]
const Z_BBOXES = Z_PTS.map(bbox)

// Construction phase timing per zone: [pileStart, pileEnd, tubeStart, tubeEnd, panelStart, panelEnd]
const Z_PHASES = [
  [0.08, 0.28,  0.20, 0.40,  0.34, 0.54],
  [0.16, 0.36,  0.28, 0.48,  0.42, 0.62],
  [0.26, 0.46,  0.38, 0.58,  0.50, 0.70],
  [0.20, 0.40,  0.32, 0.52,  0.44, 0.64],
]

// ── SINGLE ZONE: renders pile → tube → panel phases ─────────────────────────






// SVG construction overlays (piles → tubes → panels) draw on top.

// ── AERIAL PHOTO BACKGROUND ────────────────────────────────────────────────────
function AerialBG({ scrollP }) {
  const sky = skyAt(scrollP)
  const ph = scrollP * 6
  const phases = Z_PHASES.map(([ps,pe,ts,te,ms,me])=>({
    pileP: phaseP(scrollP,ps,pe), tubeP: phaseP(scrollP,ts,te), panelP: phaseP(scrollP,ms,me)
  }))
  const overallP = phases.reduce((s,p)=>s+(p.pileP+p.tubeP+p.panelP)/3,0)/phases.length
  const totalPct = Math.round(phases.reduce((s,p)=>s+p.panelP,0)/phases.length*100)
  const nightOp = ph>5?clamp((ph-5)*2.5,0,1):0
  const phLabel = overallP<0.12?'SITE CLEARED':overallP<0.35?'PILE INSTALLATION':overallP<0.56?'TORQUE TUBE & RACKING':overallP<0.78?'MODULE PLACEMENT':'COMMISSIONING'
  const skyBg = 'linear-gradient(to bottom,'+sky[0]+','+sky[1]+' 55%,'+sky[2]+' 85%,transparent)'
  return (
    <div style={{position:'fixed',inset:0,zIndex:0,overflow:'hidden',background:'#010108'}}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:'28%',background:skyBg,transition:'background 1.4s'}}/>
      {nightOp>0&&<div style={{position:'absolute',inset:0,background:'rgba(0,5,18,'+nightOp*0.55+')'}}/>}
      <svg viewBox="0 0 1200 720" style={{position:'absolute',inset:0,width:'100%',height:'100%',display:'block'}}>
        <defs>
          <pattern id="pileGrid" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse"><circle cx="10" cy="5" r="2" fill="#505850" opacity=".88"/></pattern>
          <pattern id="rackGrid" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse"><rect x="0" y="3.8" width="20" height="2.4" fill="#7a9896" opacity=".82"/><circle cx="10" cy="5" r="2" fill="#96b2b0" opacity=".88"/></pattern>
          <pattern id="panelGrid" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse"><rect x=".5" y=".5" width="19" height="9" fill="#1a304e" rx=".3" opacity=".82"/><line x1="10" y1=".5" x2="10" y2="9.5" stroke="rgba(60,110,170,.35)" strokeWidth=".6"/></pattern>
          {Z_PTS.map((pts,i)=><clipPath key={i} id={'cp-z'+i}><polygon points={pts}/></clipPath>)}
          <filter id="blurM"><feGaussianBlur stdDeviation="3"/></filter>
          <radialGradient id="vig" cx="50%" cy="50%" r="58%"><stop offset="36%" stopColor="transparent"/><stop offset="72%" stopColor="rgba(0,0,0,.22)"/><stop offset="100%" stopColor="rgba(0,0,0,.92)"/></radialGradient>
        </defs>
        {phases.map((ph2,zi)=>{const pts=Z_PTS[zi],b=Z_BBOXES[zi],pW=b.w*ph2.pileP,tW=b.w*ph2.tubeP,mW=b.w*ph2.panelP;return(<g key={zi}>{ph2.pileP>0.01&&<g clipPath={'url(#cp-z'+zi+')'}><clipPath id={'pi-'+zi}><rect x={b.x-2} y={b.y-2} width={clamp(pW+2,0,b.w+4)} height={b.h+4}/></clipPath><g clipPath={'url(#pi-'+zi+')'} opacity={Math.min(1,ph2.pileP*3)}><polygon points={pts} fill="url(#pileGrid)"/></g></g>}{ph2.tubeP>0.01&&<g clipPath={'url(#cp-z'+zi+')'}><clipPath id={'tu-'+zi}><rect x={b.x-2} y={b.y-2} width={clamp(tW+2,0,b.w+4)} height={b.h+4}/></clipPath><g clipPath={'url(#tu-'+zi+')'} opacity={Math.min(1,ph2.tubeP*2.5)}><polygon points={pts} fill="url(#rackGrid)"/></g></g>}{ph2.panelP>0.01&&<g clipPath={'url(#cp-z'+zi+')'}><clipPath id={'pa-'+zi}><rect x={b.x-2} y={b.y-2} width={clamp(mW+2,0,b.w+4)} height={b.h+4}/></clipPath><g clipPath={'url(#pa-'+zi+')'} opacity={Math.min(1,ph2.panelP*2)}><polygon points={pts} fill="url(#panelGrid)"/></g></g>}<polygon points={pts} fill="none" stroke="rgba(249,115,22,.2)" strokeWidth="1" opacity={0.2+completion*0.3}/></g>)})}
        <rect x="0" y="0" width="1200" height="720" fill="url(#vig)"/>
        <text x="1162" y="100" textAnchor="end" fill="rgba(249,115,22,.5)" fontSize="7.5" fontFamily="'Barlow Condensed',sans-serif" letterSpacing="2">{phLabel}</text>
        {scrollP>0.12&&<g opacity={clamp((scrollP-0.12)*6,0,1)}><rect x="36" y="103" width="90" height="25" fill="rgba(0,0,0,.55)" rx="2"/><text x="48" y="119" fill="rgba(249,115,22,.78)" fontSize="9" fontFamily="'Barlow Condensed',sans-serif" letterSpacing="1">INSTALLED</text><text x="118" y="119" textAnchor="end" fill="#F97316" fontSize="12" fontFamily="'Bebas Neue',sans-serif">{totalPct}%</text></g>}
      </svg>
    </div>
  )
}

const LOGO_SRC="data:image/webp;base64,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";



// ── GLB MODEL VIEWER (lazy-loads three.js) ──────────────────────────────────
function GLBViewer({ src, height }) {
  const mountRef = useRef(null)
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    let cancelled = false
    let renderer, controls, rafId, onResize
    Promise.all([
      import('three'),
      import('three/examples/jsm/loaders/GLTFLoader.js'),
      import('three/examples/jsm/controls/OrbitControls.js')
    ]).then(([THREE, gltfMod, ocMod]) => {
      if (cancelled || !mountRef.current) return
      const GLTFLoader = gltfMod.GLTFLoader
      const OrbitControls = ocMod.OrbitControls
      const w = mount.clientWidth
      const h = height
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, w/h, 0.1, 5000)
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      if (THREE.sRGBEncoding !== undefined) renderer.outputEncoding = THREE.sRGBEncoding
      mount.appendChild(renderer.domElement)
      scene.add(new THREE.HemisphereLight(0xffffff, 0x202030, 1.1))
      const dir = new THREE.DirectionalLight(0xffffff, 1.2)
      dir.position.set(40, 80, 60)
      scene.add(dir)
      const fill = new THREE.DirectionalLight(0xffe2b5, 0.5)
      fill.position.set(-40, 20, -30)
      scene.add(fill)
      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.08
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.5
      controls.enablePan = false
      new GLTFLoader().load(src, (gltf) => {
        if (cancelled) return
        const model = gltf.scene
        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        model.position.sub(center)
        const maxDim = Math.max(size.x, size.y, size.z)
        const fitDist = maxDim / (2 * Math.tan(Math.PI * camera.fov / 360))
        camera.position.set(fitDist*1.4, fitDist*0.75, fitDist*1.4)
        camera.near = Math.max(maxDim/100, 0.01)
        camera.far = maxDim * 20
        camera.updateProjectionMatrix()
        controls.target.set(0,0,0)
        controls.minDistance = fitDist * 0.5
        controls.maxDistance = fitDist * 3
        controls.update()
        scene.add(model)
        setLoaded(true)
      }, undefined, () => setError(true))
      const animate = () => {
        rafId = requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
      }
      animate()
      onResize = () => {
        if (!mountRef.current) return
        const nw = mountRef.current.clientWidth
        camera.aspect = nw / h
        camera.updateProjectionMatrix()
        renderer.setSize(nw, h)
      }
      window.addEventListener('resize', onResize)
    }).catch(() => setError(true))
    return () => {
      cancelled = true
      if (rafId) cancelAnimationFrame(rafId)
      if (onResize) window.removeEventListener('resize', onResize)
      if (controls) controls.dispose()
      if (renderer) {
        renderer.dispose()
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      }
    }
  }, [src, height])
  return (
    <div ref={mountRef} style={{width:'100%',height:height,position:'relative',cursor:'grab'}}>
      {!loaded && !error && <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(249,115,22,.55)',fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:'3px',textTransform:'uppercase'}}>Loading site model…</div>}
      {error && <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(249,115,22,.6)',fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:'2px',textTransform:'uppercase'}}>Model unavailable</div>}
    </div>
  )
}

// ── ICON COMPONENTS — no template literals inside JSX ────────────────────────
function OrbitalIcon({on}) {
  const pu  = {animation: on?'pulse 1.4s ease-in-out infinite':'none', transformOrigin:'center'}
  const pg  = {animation: on?'pulseGlow 1.8s ease-in-out infinite':'none'}
  const sp3  = {animation: on?'spin 3s linear infinite':'none', transformOrigin:'32px 32px'}
  const sr45 = {animation: on?'spinR 4.5s linear infinite':'none', transformOrigin:'32px 32px'}
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <defs>
        <radialGradient id="og" cx="38%" cy="32%">
          <stop offset="0%" stopColor="#FFE082"/>
          <stop offset="100%" stopColor="#F97316"/>
        </radialGradient>
      </defs>
      <g style={pu}><circle cx="32" cy="32" r="10" fill="url(#og)" style={pg}/></g>
      <g style={sp3}>
        <ellipse cx="32" cy="32" rx="26" ry="9" stroke="#F97316" strokeWidth="1.5" fill="none" opacity=".65"/>
        <circle cx="58" cy="32" r="5" fill="#F97316"/>
      </g>
      <g style={sr45}>
        <ellipse cx="32" cy="32" rx="20" ry="8" stroke="#EAB308" strokeWidth="1" fill="none" opacity=".45" transform="rotate(55,32,32)"/>
        <circle cx="32" cy="12" r="3.5" fill="#EAB308"/>
      </g>
      {on && [0,60,120,180,240,300].map(a => {
        const r = a*Math.PI/180
        return <line key={a} x1={32+13*Math.cos(r)} y1={32+13*Math.sin(r)} x2={32+18*Math.cos(r)} y2={32+18*Math.sin(r)} stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round"/>
      })}
    </svg>
  )
}
function SunnyIcon({on}) {
  const pu = {animation: on?'pulse 1.4s ease-in-out infinite':'none', transformOrigin:'center'}
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="15" fill="#FFD700" style={pu}/>
      <circle cx="32" cy="32" r="11" fill="#FF9800"/>
      {on && <><circle cx="28" cy="29" r="2.5" fill="#333"/><circle cx="36" cy="29" r="2.5" fill="#333"/><path d="M27 37 Q32 43 37 37" stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round"/></>}
      {[0,45,90,135,180,225,270,315].map((a,i) => {
        const r  = a*Math.PI/180
        const x1 = 32+18*Math.cos(r), y1 = 32+18*Math.sin(r)
        const x2 = 32+26*Math.cos(r), y2 = 32+26*Math.sin(r)
        const anim   = on ? ('bounce ' + (.55+i*.08) + 's ease-in-out infinite') : 'none'
        const origin = x1 + 'px ' + y1 + 'px'
        return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" style={{animation:anim, transformOrigin:origin}}/>
      })}
    </svg>
  )
}
function TrackerIcon({on}) {
  const pu = {animation: on?'pulse 1.4s ease-in-out infinite':'none', transformOrigin:'center'}
  const pg = {animation: on?'pulseGlow 1.8s ease-in-out infinite':'none'}
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="13" r="8" fill="#F97316" style={{...pu,...pg}}/>
      {on && [0,45,90,135,180,225,270,315].map(a => {
        const r = a*Math.PI/180
        return <line key={a} x1={32+10*Math.cos(r)} y1={13+10*Math.sin(r)} x2={32+15*Math.cos(r)} y2={13+15*Math.sin(r)} stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
      })}
      {[-18,-7,4,15,26].map((ox, i) => {
        const anim   = on ? ('grassTrack ' + (2+i*.28) + 's ease-in-out infinite') : 'none'
        const origin = (32+ox) + 'px 40px'
        return (
          <g key={i} style={{animation:anim, transformOrigin:origin}}>
            <rect x={32+ox-4} y="28" width="8" height="12" rx="1" fill="#1e3a5f" stroke="#4a90d9" strokeWidth=".8"/>
            <line x1={32+ox-4} y1="31" x2={32+ox+4} y2="31" stroke="#4a90d9" strokeWidth=".5" opacity=".7"/>
            <line x1={32+ox-4} y1="34" x2={32+ox+4} y2="34" stroke="#4a90d9" strokeWidth=".5" opacity=".7"/>
            <line x1={32+ox} y1="28" x2={32+ox} y2="40" stroke="#4a90d9" strokeWidth=".7"/>
            <rect x={32+ox-1} y="40" width="2" height="8" fill="#555"/>
          </g>
        )
      })}
    </svg>
  )
}
function CityIcon({on}) {
  const pu = {animation: on?'pulse 1.4s ease-in-out infinite':'none', transformOrigin:'center'}
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="4"  y="44" width="11" height="22" fill="#1e3a5f" rx="1"/>
      <rect x="17" y="34" width="13" height="32" fill="#265a8a" rx="1"/>
      <rect x="32" y="40" width="9"  height="26" fill="#1e3a5f" rx="1"/>
      <rect x="43" y="28" width="15" height="38" fill="#265a8a" rx="1"/>
      {on && [[6,50],[8,56],[19,40],[22,48],[34,46],[45,34],[48,42],[54,36]].map(([x,y],i) => {
        const anim  = 'cityFlicker ' + (1+i*.2) + 's ease-in-out infinite'
        const delay = (i*.15) + 's'
        return <rect key={i} x={x} y={y} width="3" height="3" fill="#FFD700" opacity=".8" style={{animation:anim, animationDelay:delay}}/>
      })}
      <rect x="5"  y="42" width="9"  height="3" fill="#F97316" rx=".5" opacity={on?1:.4}/>
      <rect x="18" y="32" width="11" height="3" fill="#F97316" rx=".5" opacity={on?1:.4}/>
      <rect x="33" y="38" width="7"  height="3" fill="#F97316" rx=".5" opacity={on?1:.4}/>
      <rect x="44" y="26" width="13" height="3" fill="#F97316" rx=".5" opacity={on?1:.4}/>
      <circle cx="32" cy="11" r="7" fill="#EAB308" style={pu}/>
      {on && <circle cx="32" cy="11" r="12" stroke="#EAB308" strokeWidth="1.5" fill="none" style={{animation:'wave 2s ease-out infinite'}}/>}
    </svg>
  )
}
function MountainIcon({on}) {
  const pu = {animation: on?'pulse 1.4s ease-in-out infinite':'none', transformOrigin:'center'}
  const pg = {animation: on?'pulseGlow 1.8s ease-in-out infinite':'none'}
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <path d="M6 62 L32 16 L58 62Z" fill="#1e3a5f" stroke="#4a90d9" strokeWidth="1"/>
      <path d="M24 62 L40 36 L56 62Z" fill="#142f52"/>
      <path d="M32 16 L27 28 L37 28Z" fill="white" opacity=".6"/>
      {on && (
        <g style={{animation:'mountainGlow 2s ease-in-out infinite'}}>
          {[0,1,2,3].map(i => {
            const tr = 'rotate(-22,' + (12+i*9) + ',' + (52+i*2) + ')'
            return <rect key={i} x={9+i*9} y={50+i*2} width="6" height="4" fill="#F97316" rx=".5" transform={tr} opacity=".85"/>
          })}
        </g>
      )}
      <circle cx="54" cy="13" r="8" fill="#F97316" style={{...pg,...pu}}/>
      {on && [0,45,90,135,180,225,270,315].map(a => {
        const r = a*Math.PI/180
        return <line key={a} x1={54+10*Math.cos(r)} y1={13+10*Math.sin(r)} x2={54+15*Math.cos(r)} y2={13+15*Math.sin(r)} stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
      })}
    </svg>
  )
}
function SwarmIcon({on}) {
  const pu = {animation: on?'pulse 1.4s ease-in-out infinite':'none', transformOrigin:'center'}
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="8" fill="#F97316" style={pu}/>
      {[0,1,2,3,4,5,6,7].map(i => {
        const anim = on ? ('spin ' + (3+i*.3) + 's linear infinite') : 'none'
        return (
          <g key={i} style={{animation:anim, transformOrigin:'32px 32px'}}>
            <circle cx={32+22*Math.cos((i/8)*2*Math.PI)} cy={32+22*Math.sin((i/8)*2*Math.PI)} r={i%2===0?4.5:3} fill={i%2===0?'#F97316':'#EAB308'} opacity=".85"/>
          </g>
        )
      })}
      {on && <>
        <circle cx="32" cy="32" r="14" stroke="#F97316" strokeWidth="1" fill="none" style={{animation:'wave 1.8s ease-out infinite'}}/>
        <circle cx="32" cy="32" r="14" stroke="#F97316" strokeWidth="1" fill="none" style={{animation:'wave 1.8s ease-out infinite', animationDelay:'.6s'}}/>
      </>}
    </svg>
  )
}
function PulseIcon({on}) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="6" fill="#F97316"/>
      {on
        ? [1,2,3].map(i => {
            const anim  = 'sonarWave ' + (i*.65) + 's ease-out infinite'
            const delay = (i*.26) + 's'
            return <circle key={i} cx="32" cy="32" r="6" stroke="#F97316" strokeWidth={2.5-i*.4} fill="none" style={{animation:anim, animationDelay:delay}}/>
          })
        : [1,2,3].map(i => <circle key={i} cx="32" cy="32" r={6+i*9} stroke="#F97316" strokeWidth={2-i*.4} fill="none" opacity={.35-i*.08}/>)
      }
      <path d="M4 32 H18 L22 22 L26 42 L30 30 L34 32 H60" stroke={on?'#EAB308':'#F97316'} strokeWidth="1.5" fill="none" opacity={on?1:.4} style={on?{animation:'pulse 1s ease-in-out infinite',transformOrigin:'32px 32px'}:{}}/>
    </svg>
  )
}
function PrismIcon({on}) {
  const pu = {animation: on?'pulse 1.4s ease-in-out infinite':'none', transformOrigin:'center'}
  const pg = {animation: on?'pulseGlow 1.8s ease-in-out infinite':'none'}
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="pg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a90d9" stopOpacity=".4"/>
          <stop offset="100%" stopColor="#F97316" stopOpacity=".4"/>
        </linearGradient>
      </defs>
      <path d="M32 6 L62 58 L2 58Z" stroke="#4a90d9" strokeWidth="2" fill="url(#pg2)"/>
      {on && ['#FF4444','#FF9900','#FFD700','#44FF44','#4499FF','#AA44FF'].map((c,i) => {
        const delay = (i*.09) + 's'
        return <line key={i} x1="32" y1="14" x2={2+i*12} y2="58" stroke={c} strokeWidth="2" opacity=".7" style={{animation:'prismRay .6s ease forwards', animationDelay:delay, transformOrigin:'32px 14px'}}/>
      })}
      <circle cx="32" cy="8" r="6" fill="#F97316" style={{...pu,...pg}}/>
    </svg>
  )
}
function UnityIcon({on}) {
  const pu  = {animation: on?'pulse 1.4s ease-in-out infinite':'none', transformOrigin:'center'}
  const sr5 = {animation: on?'spinR 5s linear infinite':'none', transformOrigin:'24px 32px'}
  const ss5 = {animation: on?'spin 5s linear infinite':'none', transformOrigin:'40px 32px'}
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="24" cy="32" r="16" stroke="#1e3a5f" strokeWidth="2" fill="none" style={sr5}/>
      <circle cx="40" cy="32" r="16" stroke="#F97316" strokeWidth="2" fill="none" style={ss5}/>
      <path d="M32 19 Q40 25 40 32 Q40 39 32 45 Q24 39 24 32 Q24 25 32 19Z" fill="#F97316" opacity={on?.45:.2}/>
      <circle cx="32" cy="32" r="6" fill="#F97316" style={pu}/>
      {on && <circle cx="32" cy="32" r="10" stroke="#EAB308" strokeWidth="1" fill="none" style={{animation:'wave 2s ease-out infinite'}}/>}
    </svg>
  )
}
function Icon({type, on}) {
  if(type==='orbital')  return <OrbitalIcon  on={on}/>
  if(type==='sunny')    return <SunnyIcon    on={on}/>
  if(type==='tracker')  return <TrackerIcon  on={on}/>
  if(type==='city')     return <CityIcon     on={on}/>
  if(type==='mountain') return <MountainIcon on={on}/>
  if(type==='swarm')    return <SwarmIcon    on={on}/>
  if(type==='pulse')    return <PulseIcon    on={on}/>
  if(type==='prism')    return <PrismIcon    on={on}/>
  if(type==='unity')    return <UnityIcon    on={on}/>
  return null
}
// ── LOADER ───────────────────────────────────────────────────────────────────
function Loader({phase,prog}){
  const progWidth = prog + '%'
  const progBg    = 'linear-gradient(to right,#F97316,#EAB308)'
  return(
    <div style={{position:'fixed',inset:0,zIndex:1000,overflow:'hidden',background:'#010108'}}>
      <div style={{position:'absolute',top:0,left:0,right:0,bottom:'50%',background:'#010108',zIndex:20,transition:'transform .95s cubic-bezier(.76,0,.24,1)',transform:phase>=5?'translateY(-102%)':'translateY(0)'}}/>
      <div style={{position:'absolute',top:'50%',left:0,right:0,bottom:0,background:'#010108',zIndex:20,transition:'transform .95s cubic-bezier(.76,0,.24,1)',transform:phase>=5?'translateY(102%)':'translateY(0)'}}/>
      {phase>=1&&<div style={{position:'absolute',bottom:0,left:0,right:0,height:'40%',zIndex:2,opacity:clamp((phase-1)*.7,0,1),transition:'opacity .8s'}}>
        <svg viewBox="0 0 1200 280" preserveAspectRatio="xMidYMax slice" style={{width:'100%',height:'100%'}}>
          <rect width="1200" height="280" fill="#8a7248"/>
          <path d="M 28,20 L 300,14 L 308,0 L 660,0 L 658,16 L 720,8 L 1070,4 L 1078,200 L 725,205 L 610,240 L 86,245 L 30,200 Z" fill="rgba(180,68,24,0.75)"/>
          {Z_PTS.map((pts,i)=>{
            const shifted = pts.trim().split(/\s+/).map(p=>{
              const parts = p.split(',')
              return parts[0] + ',' + Math.max(0, parseFloat(parts[1])-440)
            }).join(' ')
            return <polygon key={i} points={shifted} fill="rgba(0,0,0,.55)" stroke="rgba(200,80,24,.4)" strokeWidth="1.5"/>
          })}
        </svg>
      </div>}
      {phase>=1&&<div style={{position:'absolute',bottom:'30%',left:0,right:0,height:'30%',background:'radial-gradient(ellipse 80% 60% at 50% 100%,rgba(249,115,22,.32) 0%,transparent 70%)',zIndex:3,opacity:phase>=4?0:1,transition:'opacity .5s'}}/>}
      {phase>=1&&<div style={{position:'absolute',left:'50%',bottom:'33%',zIndex:4,transform:'translateX(-50%)',opacity:phase>=4?0:1,transition:'opacity .4s'}}>
        <div style={{width:86,height:86,borderRadius:'50%',background:'radial-gradient(circle at 38% 32%,#FFE082,#F97316)',animation:'glowPulse 2s ease-in-out infinite',position:'relative',boxShadow:'0 0 60px 30px rgba(249,115,22,.4)'}}>
          {phase>=2&&[0,30,60,90,120,150,180,210,240,270,300,330].map(a=>{
            const rayBg  = 'linear-gradient(to bottom,' + (a%60===0?'#EAB308':'#F97316') + ',transparent)'
            const rayTr  = 'translate(-50%,43px) rotate(' + a + 'deg)'
            const rayDly = (a/360*.4) + 's'
            return(
              <div key={a} style={{position:'absolute',top:'50%',left:'50%',width:2,height:48,
                background:rayBg,transformOrigin:'top center',transform:rayTr,
                animation:'rayIn .55s ease forwards',animationDelay:rayDly,opacity:0}}/>
            )
          })}
        </div>
      </div>}
      {phase>=2&&<div style={{position:'absolute',bottom:'52%',left:0,right:0,display:'flex',justifyContent:'center',gap:5,zIndex:5,opacity:phase>=4?0:1,transition:'opacity .4s'}}>
        {"SUNRISE".split("").map((l,i)=>{
          const dly = (.35+i*.06) + 's'
          return(
            <span key={i} style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(42px,9vw,98px)',color:'#F5F0EB',display:'inline-block',animation:'letterIn .55s cubic-bezier(.34,1.56,.64,1) forwards',animationDelay:dly,opacity:0,textShadow:'0 0 40px rgba(249,115,22,.7)'}}>{l}</span>
          )
        })}
      </div>}
      {phase>=2&&<div style={{position:'absolute',bottom:'46%',left:0,right:0,textAlign:'center',zIndex:5,fontFamily:"'Barlow Condensed',sans-serif",fontSize:'clamp(11px,1.8vw,15px)',letterSpacing:'.36em',color:'#F97316',textTransform:'uppercase',animation:'subIn .8s ease .5s both',opacity:phase>=4?0:1,transition:'opacity .4s'}}>CONSTRUCTION & DEVELOPMENT</div>}
      {phase>=3&&<div style={{position:'absolute',bottom:'30%',left:'50%',transform:'translateX(-50%)',width:'min(440px,72vw)',zIndex:5,opacity:phase>=4?0:1,transition:'opacity .4s'}}>
        <div style={{display:'flex',justifyContent:'space-between',fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:'.2em',color:'#ccc',textShadow:'0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)',textTransform:'uppercase',marginBottom:9}}>
          <span>Deploying Solar Field</span><span style={{color:'#F97316',fontWeight:700}}>{Math.round(prog)}%</span>
        </div>
        <div style={{height:3,background:'rgba(255,255,255,.07)',borderRadius:2,overflow:'hidden',position:'relative'}}>
          <div style={{position:'absolute',inset:'0 auto 0 0',width:progWidth,background:progBg,transition:'width .1s',boxShadow:'0 0 14px rgba(249,115,22,.9)'}}/>
          <div style={{position:'absolute',inset:'0 auto 0 0',width:'36%',background:'linear-gradient(to right,transparent,rgba(255,255,255,.35),transparent)',animation:'shimmer 1.6s ease-in-out infinite'}}/>
        </div>
        <div style={{display:'flex',gap:18,marginTop:10,fontFamily:"'Barlow Condensed',sans-serif",fontSize:10,letterSpacing:'.18em',textTransform:'uppercase'}}>
          {['Piles','Trackers','Modules','Electrical'].map((t,i)=><span key={t} style={{color:prog>i*22+12?'#F97316':'#333',transition:'color .4s'}}>{prog>i*22+12?'✓ ':''}{t}</span>)}
        </div>
      </div>}
      {phase>=4&&<div style={{position:'absolute',bottom:'24%',left:0,right:0,textAlign:'center',zIndex:5,fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,letterSpacing:'.3em',color:'#22C55E',textTransform:'uppercase',opacity:phase>=5?0:1,transition:'opacity .3s'}}>⬤ &nbsp;SOLAR FIELD ONLINE</div>}
    </div>
  )
}

// ── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({p,i}){
  const[on,setOn]=useState(false);const[vis,setVis]=useState(false);const ref=useRef()
  useEffect(()=>{const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);io.disconnect()}},{threshold:.15});if(ref.current)io.observe(ref.current);return()=>io.disconnect()},[])
  return(<div ref={ref} onMouseEnter={()=>setOn(true)} onMouseLeave={()=>setOn(false)} onClick={()=>setOn(v=>!v)} style={{background:on?'rgba(249,115,22,.07)':'rgba(8,8,20,.22)',backdropFilter:'blur(14px)',borderLeft:'3px solid ' + (on?A:'rgba(249,115,22,.2)'),border:'1px solid rgba(255,255,255,.05)',borderLeftWidth:3,borderLeftColor:on?A:'rgba(249,115,22,.2)',padding:'30px 26px',cursor:'pointer',transition:'all .35s cubic-bezier(.34,1.56,.64,1)',transform:vis?(on?'translateX(4px)':'translateX(0)'):'translateX(-18px)',opacity:vis?1:0,transitionDelay:(i*.06)+"s",position:'relative',overflow:'hidden'}}>
    {on&&<div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,transparent 35%,rgba(249,115,22,.06) 50%,transparent 65%)',animation:'shimmer 1.5s ease-in-out infinite'}}/>}
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:78,height:78,marginBottom:14,background:on?'rgba(249,115,22,.13)':'rgba(255,255,255,.03)',border:'1px solid ' + (on?'rgba(249,115,22,.5)':'rgba(249,115,22,.15)'),transition:'all .3s',clipPath:'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)'}}><Icon type={p.icon} on={on}/></div>
    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:40,color:on?A:'#F5F0EB',lineHeight:1,transition:'color .3s'}}>{p.mw}<span style={{fontSize:19,color:'rgba(245,240,235,.45)'}}>MW</span></div>
    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',margin:'9px 0 4px',color:'#F5F0EB'}}>{p.name}</div>
    <div style={{fontSize:12,color:'#ccc',textShadow:'0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)',fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:'1.5px'}}>{p.loc}</div>
    <div style={{display:'flex',alignItems:'center',gap:10,marginTop:16,paddingTop:14,borderTop:'1px solid rgba(255,255,255,.06)'}}>
      <div style={{flex:1,height:3,background:'rgba(249,115,22,.1)',borderRadius:2,overflow:'hidden'}}><div style={{height:'100%',background:'linear-gradient(to right,#F97316,#EAB308)',width:vis?(p.fill*100)+'%':0,transition:'width 1.2s ease',transitionDelay:(.3+i*.07)+'s'}}/></div>
      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:'1.5px',textTransform:'uppercase',color:'#ccc',textShadow:'0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)',whiteSpace:'nowrap'}}>{p.mods} Modules</span>
    </div>
  </div>)
}
function CapCard({c,ci}){
  const[hov,setHov]=useState(false)
  return(<div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{background:hov?'rgba(249,115,22,.07)':'rgba(8,8,20,.18)',backdropFilter:'blur(14px)',padding:'48px 36px',position:'relative',overflow:'hidden',transition:'transform .4s cubic-bezier(.34,1.56,.64,1)',transform:hov?'translateY(-5px)':'translateY(0)',border:'1px solid rgba(255,255,255,.05)',borderBottom:'3px solid ' + (hov?A:'transparent')}}>
    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:75,color:'rgba(249,115,22,' + (hov?.16:.05) + ')',lineHeight:1,position:'absolute',top:16,right:22,transition:'color .4s'}}>{c.n}</div>
    <div style={{width:48,height:48,background:'rgba(249,115,22,.1)',border:'1px solid rgba(249,115,22,.22)',display:'flex',alignItems:'center',justifyContent:'center',clipPath:'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',marginBottom:24}}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="1.5">
        {ci===0&&<><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></>}
        {ci===1&&<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>}
        {ci===2&&<><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></>}
      </svg>
    </div>
    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:19,fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',marginBottom:12}}>{c.t}</div>
    <p style={{fontSize:15,fontWeight:300,color:'#777',lineHeight:1.7}}>{c.b}</p>
  </div>)
}

const CAPS=[{n:'01',t:'ISNet Compliance',b:'Full ISNetworld compliance ensuring safety protocols, training records, and insurance coverage meet the most stringent standards for utility-scale solar.'},{n:'02',t:'Apprenticeship Enabled',b:'Certified apprenticeship programs combining site experience with technical training to build skilled local labor pools for every region we operate.'},{n:'03',t:'EPC Subcontracting',b:'Precision tracking installation, pile driving, and mechanical assembly for utility-scale EPCs with industry-leading accuracy and zero schedule slippage.'}]
const PROJS=[{mw:'210',name:'Grimes Solar',loc:'Iola, TX',mods:'500,000',fill:1.0,icon:'orbital'},{mw:'135',name:'Happy Solar',loc:'White County, AR',mods:'285,000',fill:.57,icon:'sunny'},{mw:'80',name:'Grasshopper Solar',loc:'Chase City, VA',mods:'78,000',fill:.16,icon:'tracker'},{mw:'50',name:'Salt City Solar',loc:'Ross County, OH',mods:'125,000',fill:.25,icon:'city'},{mw:'50',name:'Whitehorn Solar',loc:'Gretna, VA',mods:'180,000',fill:.36,icon:'mountain'},{mw:'6.7',name:'Locust Solar',loc:'Cortland, NY',mods:'15,000',fill:.03,icon:'swarm'},{mw:'4.8',name:'Remsen Solar',loc:'E. Syracuse, NY',mods:'10,000',fill:.02,icon:'pulse'},{mw:'4.4',name:'Taft Solar',loc:'E. Syracuse, NY',mods:'10,000',fill:.02,icon:'prism'},{mw:'2.93',name:'Union Solar',loc:'Union, ME',mods:'8,000',fill:.016,icon:'unity'}]

// ── SEC with mobile padding ────────────────────────────────────────────────
function Sec({children,id,style={}}){
  const ref=useRef();const[vis,setVis]=useState(false)
  useEffect(()=>{const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);io.disconnect()}},{threshold:.06});if(ref.current)io.observe(ref.current);return()=>io.disconnect()},[])
  return <section id={id} ref={ref} style={{position:'relative',zIndex:5,padding:'clamp(36px,6vw,96px) clamp(14px,4vw,48px)',transition:'opacity .8s,transform .8s',opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(28px)',color:'#F5F0EB',...style}}>{children}</section>
}

// ═══ CONSTANTS ═══
const CSG='#f5c518', CSGD='#c9a000', CSBG='#f2f2ee', CSNAV='#0f0f0f', CSFF="'Agency FB','Arial Narrow',sans-serif"
const storage = window.storage || { get:async()=>null, set:async()=>null, delete:async()=>null, list:async()=>({keys:[]}) }

// ═══ HELPERS ═══
const uid=()=>Math.random().toString(36).slice(2,10)
const now=()=>new Date().toISOString()
const fmt=(d)=>{if(!d)return'';const dt=new Date(d);return dt.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
const fmtTime=(d)=>{if(!d)return'';const dt=new Date(d);return dt.toLocaleString('en-US',{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'})}

async function sGet(key){try{const r=await storage.get(key);return r?JSON.parse(r.value):null}catch(e){return null}}
async function sSet(key,val){try{await storage.set(key,JSON.stringify(val))}catch(e){console.error('storage set error',e)}}

const PROFILE_COLORS=['#e74c3c','#3498db','#2ecc71','#9b59b6','#e67e22','#1abc9c','#34495e','#f39c12']

const TABS=[
  {id:'dashboard',label:'Dashboard',icon:Home},
  {id:'employees',label:'Employees',icon:Users},
  {id:'picker',label:'Picker',icon:FlaskConical},
  {id:'drugtests',label:'Drug Tests',icon:ClipboardList},
  {id:'screenings',label:'Screenings',icon:Shield},
  {id:'history',label:'History',icon:HistoryIcon},
  {id:'calendar',label:'Calendar',icon:CalIcon},
  {id:'reports',label:'Reports',icon:BarChart3},
  {id:'settings',label:'Settings',icon:SettingsIcon},
  {id:'profile',label:'Profile',icon:User},
]

const MOB_TABS=['dashboard','picker','drugtests','screenings']

const TEST_TYPES=['random','pre-employment','incident','scheduled','follow-up','return-to-duty']
const POSITIONS=['Staff','Supervisor','Manager','Director','Executive','Other']
const DEPTS=['Operations','Safety','Engineering','Admin','HR','Finance','Field','Other']

// ═══ TOAST SYSTEM ═══
function Toasts({toasts,remove}){
  return <div style={{position:'fixed',top:16,right:16,zIndex:9999,display:'flex',flexDirection:'column',gap:8}}>
    {toasts.map(t=>(
      <div key={t.id} style={{background:t.type==='error'?'#dc2626':t.type==='warning'?'#d97706':'#16a34a',color:'#fff',padding:'12px 20px',borderRadius:6,fontFamily:CSFF,fontSize:14,display:'flex',alignItems:'center',gap:10,boxShadow:'0 4px 20px rgba(0,0,0,.3)',animation:'slideIn .3s ease',minWidth:250}}>
        <span style={{flex:1}}>{t.msg}</span>
        <X size={16} style={{cursor:'pointer',opacity:.7}} onClick={()=>remove(t.id)}/>
      </div>
    ))}
  </div>
}

function useToast(){
  const[toasts,setToasts]=useState([])
  const add=useCallback((msg,type='info')=>{
    const id=uid()
    setToasts(p=>[...p,{id,msg,type}])
    setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),5000)
  },[])
  const remove=useCallback((id)=>setToasts(p=>p.filter(t=>t.id!==id)),[])
  return{toasts,add,remove}
}

// ═══ SPLASH SCREEN ═══
function Splash({onDone}){
  const[phase,setPhase]=useState(0)
  useEffect(()=>{
    const t=[setTimeout(()=>setPhase(1),400),setTimeout(()=>setPhase(2),1200),setTimeout(()=>setPhase(3),2200),setTimeout(()=>setPhase(4),3400),setTimeout(()=>onDone(),5000)]
    return()=>t.forEach(clearTimeout)
  },[onDone])
  return(
    <div style={{position:'fixed',inset:0,background:'#0a0a0a',zIndex:10000,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:CSFF}}>
      <Scale size={64} color={CSG} style={{transform:phase>=1?'scale(1)':'scale(0)',transition:'transform .8s cubic-bezier(.34,1.56,.64,1)',opacity:phase>=1?1:0}}/>
      <div style={{marginTop:28,fontSize:36,letterSpacing:6,fontWeight:700,color:'#fff',opacity:phase>=2?1:0,transform:phase>=2?'translateY(0)':'translateY(20px)',transition:'all .7s ease'}}>
        Clear<span style={{color:CSG}}>Screen</span> HR
      </div>
      <div style={{width:200,height:2,background:'#333',marginTop:20,borderRadius:2,overflow:'hidden',opacity:phase>=3?1:0,transition:'opacity .4s'}}>
        <div style={{width:phase>=3?'100%':'0%',height:'100%',background:'linear-gradient(90deg,transparent,'+CSG+',transparent)',transition:'width 1.2s ease'}}/>
      </div>
      <div style={{marginTop:24,fontSize:13,letterSpacing:3,color:'#666',opacity:phase>=4?1:0,transition:'opacity .8s'}}>Made by Dustin Hanson</div>
    </div>
  )
}

// ═══ PROFILE PICKER ═══
function ProfilePicker({profiles,onSelect,onCreate,onDelete}){
  const[adding,setAdding]=useState(false)
  const[name,setName]=useState('')
  const[confirmDel,setConfirmDel]=useState(null)
  return(
    <div style={{position:'fixed',inset:0,background:'#0f0f0f',zIndex:9000,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:CSFF,padding:20}}>
      <Scale size={36} color={CSG}/>
      <div style={{fontSize:28,letterSpacing:4,fontWeight:700,color:'#fff',marginTop:12}}>Clear<span style={{color:CSG}}>Screen</span> HR</div>
      <div style={{fontSize:13,letterSpacing:2,color:'#888',marginTop:6,marginBottom:36}}>SELECT PROFILE</div>
      <div style={{display:'flex',flexWrap:'wrap',gap:16,justifyContent:'center',maxWidth:600}}>
        {profiles.map((p,i)=>(
          <div key={p.id} style={{width:m?120:140,background:'#1a1a1a',border:'1px solid #333',borderRadius:8,padding:'20px 16px',textAlign:'center',cursor:'pointer',transition:'all .2s',position:'relative'}}
            onClick={function(){onSelect(p)}} onMouseEnter={function(e){e.currentTarget.style.borderColor=CSG}} onMouseLeave={function(e){e.currentTarget.style.borderColor='#333'}}>
            <div style={{width:48,height:48,borderRadius:'50%',background:PROFILE_COLORS[i%PROFILE_COLORS.length],display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 10px',fontSize:20,fontWeight:700,color:'#fff'}}>{p.name.slice(0,2).toUpperCase()}</div>
            <div style={{color:'#fff',fontSize:15,fontWeight:600}}>{p.name}</div>
            <div style={{position:'absolute',top:6,right:6,cursor:'pointer',opacity:.4,transition:'opacity .2s'}} onClick={function(e){e.stopPropagation();setConfirmDel(p.id)}} onMouseEnter={function(e){e.currentTarget.style.opacity=1}} onMouseLeave={function(e){e.currentTarget.style.opacity=.4}}>
              <Trash2 size={14} color="#f66"/>
            </div>
            {confirmDel===p.id&&(
              <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,.9)',borderRadius:8,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8}} onClick={function(e){e.stopPropagation()}}>
                <div style={{color:'#f66',fontSize:12,letterSpacing:1}}>DELETE?</div>
                <div style={{display:'flex',gap:8}}>
                  <div style={{background:'#f66',color:'#fff',padding:'4px 14px',borderRadius:4,cursor:'pointer',fontSize:12}} onClick={function(){onDelete(p.id);setConfirmDel(null)}}>Yes</div>
                  <div style={{background:'#333',color:'#fff',padding:'4px 14px',borderRadius:4,cursor:'pointer',fontSize:12}} onClick={function(){setConfirmDel(null)}}>No</div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div style={{width:m?120:140,background:'#1a1a1a',border:'2px dashed #444',borderRadius:8,padding:'20px 16px',textAlign:'center',cursor:'pointer',transition:'all .2s',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}
          onClick={function(){setAdding(true)}} onMouseEnter={function(e){e.currentTarget.style.borderColor=CSG}} onMouseLeave={function(e){e.currentTarget.style.borderColor='#444'}}>
          <Plus size={28} color="#888"/>
          <div style={{color:'#888',fontSize:13,marginTop:6}}>New Profile</div>
        </div>
      </div>
      {adding&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:9500}} onClick={()=>setAdding(false)}>
          <div style={{background:'#1a1a1a',border:'1px solid #333',borderRadius:8,padding:28,width:'90%',maxWidth:320}} onClick={e=>e.stopPropagation()}>
            <div style={{color:'#fff',fontSize:16,fontWeight:600,marginBottom:16}}>New Profile</div>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Profile name" style={{width:'100%',background:'#0f0f0f',border:'1px solid #444',color:'#fff',padding:'10px 14px',borderRadius:4,fontSize:14,fontFamily:CSFF,outline:'none',boxSizing:'border-box'}} autoFocus onKeyDown={e=>{if(e.key==='Enter'&&name.trim()){onCreate(name.trim());setName('');setAdding(false)}}}/>
            <div style={{display:'flex',gap:8,marginTop:16}}>
              <div style={{flex:1,background:CSG,color:'#000',padding:'10px 0',borderRadius:4,textAlign:'center',cursor:'pointer',fontWeight:700,fontSize:13}} onClick={()=>{if(name.trim()){onCreate(name.trim());setName('');setAdding(false)}}}>Create</div>
              <div style={{flex:1,background:'#333',color:'#fff',padding:'10px 0',borderRadius:4,textAlign:'center',cursor:'pointer',fontSize:13}} onClick={()=>setAdding(false)}>Cancel</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ═══ E-SIGNATURE PAD ═══
function SignaturePad({onSave,onCancel}){
  const canRef=useRef(null)
  const drawing=useRef(false)
  const start=e=>{drawing.current=true;const c=canRef.current.getContext('2d');const r=canRef.current.getBoundingClientRect();c.beginPath();c.moveTo(e.clientX-r.left,e.clientY-r.top)}
  const move=e=>{if(!drawing.current)return;const c=canRef.current.getContext('2d');const r=canRef.current.getBoundingClientRect();c.lineTo(e.clientX-r.left,e.clientY-r.top);c.strokeStyle='#000';c.lineWidth=2;c.stroke()}
  const end=()=>{drawing.current=false}
  const clear=()=>{const c=canRef.current.getContext('2d');c.clearRect(0,0,400,150)}
  return(
    <div style={{background:'#fff',borderRadius:8,padding:20,width:420,maxWidth:'90vw'}}>
      <div style={{fontFamily:CSFF,fontSize:16,fontWeight:700,marginBottom:12}}>E-Signature</div>
      <canvas ref={canRef} width={400} height={150} style={{border:'1px solid #ccc',borderRadius:4,cursor:'crosshair',width:'100%'}} onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}/>
      <div style={{display:'flex',gap:8,marginTop:12}}>
        <div style={{flex:1,background:CSG,color:'#000',padding:'10px 0',borderRadius:4,textAlign:'center',cursor:'pointer',fontFamily:CSFF,fontWeight:700,fontSize:13}} onClick={()=>onSave(canRef.current.toDataURL())}>Save</div>
        <div style={{background:'#eee',color:'#333',padding:'10px 16px',borderRadius:4,textAlign:'center',cursor:'pointer',fontFamily:CSFF,fontSize:13}} onClick={clear}>Clear</div>
        <div style={{background:'#eee',color:'#333',padding:'10px 16px',borderRadius:4,textAlign:'center',cursor:'pointer',fontFamily:CSFF,fontSize:13}} onClick={onCancel}>Cancel</div>
      </div>
    </div>
  )
}

// ═══ DISCLAIMER & T&C MODALS ═══
const TC_TEXT=`ClearScreen HR Terms & Conditions

1. Acceptance of Terms: By using ClearScreen HR, you agree to these terms.
2. License: Limited, non-transferable license for internal business use only.
3. Intellectual Property: ClearScreen HR is the exclusive intellectual property of Dustin Hanson and is shared in good faith. Use constitutes acceptance of all Terms & Conditions. This software is provided 'as-is' without warranty of any kind.
4. Data Responsibility: User is solely responsible for data accuracy and compliance.
5. No Legal Advice: This software does not constitute legal or compliance advice.
6. Confidentiality: All employee data must be handled per applicable privacy laws.
7. DOT Compliance: Software assists with but does not guarantee DOT compliance.
8. SAMHSA Guidelines: Random selection uses CSPRNG but user must verify compliance.
9. MRO Process: Software facilitates but does not replace qualified MRO review.
10. Record Retention: User responsible for meeting retention requirements.
11. Data Security: User must implement appropriate access controls.
12. Liability Limitation: No liability for errors, omissions, or compliance failures.
13. Indemnification: User indemnifies developer against all claims.
14. Modifications: Terms may be updated; continued use implies acceptance.
15. Severability: Invalid provisions do not affect remaining terms.
16. Governing Law: Governed by applicable federal and state laws.
17. Dispute Resolution: Disputes resolved through binding arbitration.
18. Export Controls: User must comply with applicable export laws.
19. Third-Party Services: EmailJS integration governed by their own terms.
20. Audit Rights: Developer may audit usage for compliance with these terms.
21. Training: User responsible for training personnel on proper software use.
22. Backup: User responsible for maintaining adequate data backups.
23. Updates: No obligation to provide updates or new features.
24. Support: Support provided at developer's discretion.
25. Termination: License may be terminated for violation of terms.`

function DisclaimerModal({onAccept}){
  const[agreed,setAgreed]=useState(false)
  const[showTC,setShowTC]=useState(false)
  return(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.6)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:9900,padding:20,fontFamily:CSFF}}>
      {showTC?(
        <div style={{background:'#fff',borderRadius:8,padding:28,maxWidth:600,maxHeight:'80vh',overflow:'auto',width:'100%'}}>
          <div style={{fontSize:18,fontWeight:700,marginBottom:16}}>Terms & Conditions</div>
          <pre style={{whiteSpace:'pre-wrap',fontSize:13,lineHeight:1.7,color:'#444'}}>{TC_TEXT}</pre>
          <div style={{background:CSG,color:'#000',padding:'12px 0',borderRadius:4,textAlign:'center',cursor:'pointer',fontWeight:700,marginTop:20}} onClick={()=>setShowTC(false)}>Close</div>
        </div>
      ):(
        <div style={{background:'#fff',borderRadius:8,padding:28,maxWidth:480,width:'100%'}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
            <AlertTriangle size={24} color="#d97706"/>
            <div style={{fontSize:18,fontWeight:700}}>Important Disclaimer</div>
          </div>
          <p style={{fontSize:14,lineHeight:1.7,color:'#555',marginBottom:16}}>
            ClearScreen HR is a screening management tool designed to assist with drug testing program administration. It is <strong>not a substitute</strong> for legal counsel, qualified MRO review, or official compliance mechanisms.
          </p>
          <p style={{fontSize:14,lineHeight:1.7,color:'#555',marginBottom:20}}>
            Users are solely responsible for ensuring compliance with DOT 49 CFR Part 40, SAMHSA guidelines, and all applicable federal, state, and local regulations.
          </p>
          <label style={{display:'flex',alignItems:'flex-start',gap:10,cursor:'pointer',marginBottom:20}}>
            <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} style={{marginTop:3,accentColor:CSG}}/>
            <span style={{fontSize:13,color:'#555'}}>I have read and agree to the <span style={{color:CSGD,cursor:'pointer',textDecoration:'underline'}} onClick={e=>{e.preventDefault();setShowTC(true)}}>Terms & Conditions</span></span>
          </label>
          <div style={{background:agreed?CSG:'#ddd',color:agreed?'#000':'#999',padding:'12px 0',borderRadius:4,textAlign:'center',cursor:agreed?'pointer':'default',fontWeight:700,fontSize:14,transition:'all .2s'}} onClick={()=>agreed&&onAccept()}>Accept & Continue</div>
        </div>
      )}
    </div>
  )
}

// ═══ HR COMPLIANCE CHAT ═══
function ComplianceChat({show,onToggle}){
  const[msgs,setMsgs]=useState([{role:'assistant',content:'Welcome to HR Compliance Assistant. I specialize in DOT 49 CFR Part 40, SAMHSA guidelines, SAP procedures, and MRO processes. How can I help?'}])
  const[input,setInput]=useState('')
  const[loading,setLoading]=useState(false)
  const endRef=useRef(null)
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:'smooth'})},[msgs])
  const send=async()=>{
    if(!input.trim()||loading)return
    const q=input.trim();setInput('');setMsgs(p=>[...p,{role:'user',content:q}]);setLoading(true)
    try{
      const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,system:'You are an HR compliance specialist expert in DOT 49 CFR Part 40, SAMHSA workplace drug testing guidelines, SAP (Substance Abuse Professional) processes, and MRO (Medical Review Officer) procedures. Give concise, accurate compliance guidance.',messages:[...msgs.filter(m=>m.role!=='system'),{role:'user',content:q}]})})
      const data=await res.json()
      const text=data.content?.map(c=>c.text||'').join('')||'Sorry, I could not process that request.'
      setMsgs(p=>[...p,{role:'assistant',content:text}])
    }catch(e){setMsgs(p=>[...p,{role:'assistant',content:'Connection error. Please try again.'}])}
    setLoading(false)
  }
  if(!show)return(
    <div onClick={onToggle} style={{position:'fixed',bottom:24,right:24,width:56,height:56,borderRadius:'50%',background:CSG,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',boxShadow:'0 4px 20px rgba(0,0,0,.3)',zIndex:9000,transition:'transform .2s'}} onMouseEnter={e=>e.currentTarget.style.transform='scale(1.1)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
      <MessageCircle size={24} color="#000"/>
    </div>
  )
  return(
    <div style={{position:'fixed',bottom:24,right:24,width:380,maxWidth:'calc(100vw - 48px)',height:520,maxHeight:'calc(100vh - 100px)',background:'#fff',borderRadius:12,boxShadow:'0 8px 40px rgba(0,0,0,.25)',zIndex:9000,display:'flex',flexDirection:'column',fontFamily:CSFF,overflow:'hidden'}}>
      <div style={{background:CSNAV,color:'#fff',padding:'14px 18px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}><Scale size={18} color={CSG}/><span style={{fontWeight:700,letterSpacing:1}}>HR Compliance</span></div>
        <X size={18} style={{cursor:'pointer',opacity:.7}} onClick={onToggle}/>
      </div>
      <div style={{flex:1,overflow:'auto',padding:14,display:'flex',flexDirection:'column',gap:10}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{alignSelf:m.role==='user'?'flex-end':'flex-start',maxWidth:'85%',background:m.role==='user'?CSG:'#f0f0ee',color:'#000',padding:'10px 14px',borderRadius:10,fontSize:13,lineHeight:1.6,whiteSpace:'pre-wrap'}}>{m.content}</div>
        ))}
        {loading&&<div style={{alignSelf:'flex-start',padding:'10px 14px'}}><Loader2 size={18} style={{animation:'spin 1s linear infinite'}} color="#888"/></div>}
        <div ref={endRef}/>
      </div>
      <div style={{padding:10,borderTop:'1px solid #eee',display:'flex',gap:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask about compliance..." style={{flex:1,border:'1px solid #ddd',borderRadius:6,padding:'10px 12px',fontSize:13,fontFamily:CSFF,outline:'none'}}/>
        <div onClick={send} style={{width:40,height:40,borderRadius:6,background:CSG,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><Send size={16} color="#000"/></div>
      </div>
    </div>
  )
}

// ═══ MAIN COMPONENT ═══
function ClearScreenHR({onExit,portalUser}){
  // ── App state ──
  const[splash,setSplash]=useState(!portalUser)
  const[screen,setScreen]=useState('profiles') // profiles|disclaimer|app
  const[profiles,setProfiles]=useState([])
  const[profile,setProfile]=useState(null)
  const[tab,setTab]=useState('dashboard')
  const[mob,setMob]=useState(typeof window!=='undefined'&&window.innerWidth<768)
  const[drawer,setDrawer]=useState(false)
  const[chatOpen,setChatOpen]=useState(false)
  const{toasts,add:toast,remove:removeToast}=useToast()

  // ── Profile data ──
  const[employees,setEmployees]=useState([])
  const[screenings,setScreenings]=useState([])
  const[drugTests,setDrugTests]=useState([])
  const[settings,setSettings]=useState({companyName:'',logo:null,autoEnabled:false,autoInterval:24,autoUnit:'hours',emailService:'',emailTemplate:'',emailKey:''})
  const[accepted,setAccepted]=useState(false)

  // ── UI state ──
  const[search,setSearch]=useState('')
  const[filter,setFilter]=useState('all')
  const[modal,setModal]=useState(null)
  const[empForm,setEmpForm]=useState(null)
  const[testForm,setTestForm]=useState(null)
  const[calMonth,setCalMonth]=useState(new Date().getMonth())
  const[calYear,setCalYear]=useState(new Date().getFullYear())
  const[reportRange,setReportRange]=useState('monthly')
  const[pickerCount,setPickerCount]=useState(1)
  const[pickerResult,setPickerResult]=useState(null)
  const[sigModal,setSigModal]=useState(null)
  const[resultModal,setResultModal]=useState(null)
  const[importModal,setImportModal]=useState(null)

  // ── Resize ──
  useEffect(()=>{const h=()=>setMob(window.innerWidth<768);window.addEventListener('resize',h);return()=>window.removeEventListener('resize',h)},[])

  // ── Load profiles ──
  useEffect(function(){
    sGet('profiles').then(function(p){
      var pp=p||[]
      setProfiles(pp)
      if(portalUser&&!profile){
        var existing=pp.find(function(x){return x.name===portalUser})
        if(existing){
          setProfile(existing);setTab('dashboard')
        }else{
          var np={id:uid(),name:portalUser,color:'#F97316'}
          var npp=pp.concat([np])
          setProfiles(npp);sSet('profiles',npp)
          setProfile(np);setTab('dashboard')
        }
      }
    })
  },[])

  // ── Load profile data ──
  useEffect(()=>{
    if(!profile)return
    const pid=profile.id
    Promise.all([
      sGet('profile_'+pid+'_employees'),
      sGet('profile_'+pid+'_screenings'),
      sGet('profile_'+pid+'_drugtests'),
      sGet('profile_'+pid+'_settings'),
      sGet('profile_'+pid+'_accepted'),
    ]).then(function(results){
      var e=results[0],s=results[1],d=results[2],st=results[3],ac=results[4]
      setEmployees(e||[])
      setScreenings(s||[])
      setDrugTests(d||[])
      if(st)setSettings(function(prev){return Object.assign({},prev,st)})
      setAccepted(!!ac)
      if(portalUser){setAccepted(true);setScreen('app');sSet('profile_'+pid+'_accepted',true)}
      else{setScreen(ac?'app':'disclaimer')}
    }).catch(function(err){console.error('load err',err);if(portalUser){setScreen('app')}else{setScreen('disclaimer')}})
  },[profile])

  // ── Save helpers ──
  const pid=profile&&profile.id?profile.id:null
  const saveEmps=(e)=>{setEmployees(e);if(pid)sSet('profile_'+pid+'_employees',e)}
  const saveScreenings=(s)=>{setScreenings(s);if(pid)sSet('profile_'+pid+'_screenings',s)}
  const saveTests=(t)=>{setDrugTests(t);if(pid)sSet('profile_'+pid+'_drugtests',t)}
  const saveSettings=(s)=>{setSettings(s);if(pid)sSet('profile_'+pid+'_settings',s)}

  // ── Profile CRUD ──
  const createProfile=(name)=>{const p={id:uid(),name,color:PROFILE_COLORS[profiles.length%PROFILE_COLORS.length]};const np=[...profiles,p];setProfiles(np);sSet('profiles',np);toast('Profile created','info')}
  const deleteProfile=(id)=>{const np=profiles.filter(p=>p.id!==id);setProfiles(np);sSet('profiles',np);['employees','screenings','drugtests','settings','accepted'].forEach(k=>storage.delete('profile_'+id+'_'+k));toast('Profile deleted','warning')}
  const selectProfile=function(p){setProfile(p);setTab('dashboard')}

  // ── Auto-scheduler ──
  useEffect(()=>{
    if(!settings.autoEnabled||!pid)return
    const ms={minutes:60000,hours:3600000,days:86400000,weeks:604800000}[settings.autoUnit]||3600000
    const interval=settings.autoInterval*(ms)
    const iv=setInterval(()=>{
      const pool=employees.filter(e=>!e.exempt)
      if(pool.length===0)return
      const arr=new Uint32Array(1);crypto.getRandomValues(arr)
      const pick=pool[arr[0]%pool.length]
      const s={id:uid(),employeeId:pick.id,employeeName:pick.name,type:'random',status:'open',date:now(),result:null,signature:null,notes:'',mroNotes:'',auto:true}
      const dt={id:uid(),employeeId:pick.id,employeeName:pick.name,type:'random',date:now(),scheduledDate:null,result:'pending',mroNotes:'',auto:true,screeningId:s.id}
      saveScreenings([...screenings,s])
      saveTests([...drugTests,dt])
      toast('Auto-scheduled: '+pick.name,'info')
    },interval)
    return()=>clearInterval(iv)
  },[settings.autoEnabled,settings.autoInterval,settings.autoUnit,employees,pid])

  // ── Accept disclaimer ──
  const acceptDisclaimer=()=>{setAccepted(true);setScreen('app');if(pid)sSet('profile_'+pid+'_accepted',true)}

  // ── CSS keyframes ──
  const css=`@keyframes spin{to{transform:rotate(360deg)}}@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}`

  // ── Derived ──
  const pool=employees.filter(e=>!e.exempt)
  const pendingTests=drugTests.filter(t=>t.result==='pending')
  const passedTests=drugTests.filter(t=>t.result==='pass')
  const failedTests=drugTests.filter(t=>t.result==='fail')
  const openScreenings=screenings.filter(s=>s.status==='open'||s.status==='in-progress')
  const completedScreenings=screenings.filter(s=>s.status==='completed')

  const filteredEmps=employees.filter(e=>{
    if(filter==='active'&&e.exempt)return false
    if(filter==='exempt'&&!e.exempt)return false
    if(filter==='management'&&!e.management)return false
    if(search){const s=search.toLowerCase();return(e.name||'').toLowerCase().includes(s)||(e.id||'').toLowerCase().includes(s)||(e.title||'').toLowerCase().includes(s)||(e.department||'').toLowerCase().includes(s)}
    return true
  })

  // ── RANDOM PICKER ──
  const runPicker=()=>{
    if(pool.length===0){toast('No eligible employees in pool','error');return}
    const count=Math.min(pickerCount,pool.length)
    const picks=[];const used=new Set()
    const threeMonthsAgo=Date.now()-90*86400000
    while(picks.length<count){
      const arr=new Uint32Array(1);crypto.getRandomValues(arr)
      const idx=arr[0]%pool.length
      if(used.has(idx))continue
      used.add(idx)
      const emp=pool[idx]
      const recent=drugTests.some(t=>t.employeeId===emp.id&&t.type==='random'&&new Date(t.date)>threeMonthsAgo)
      picks.push({...emp,recent})
    }
    // Create pending tests + screenings
    const newScreenings=[...screenings]
    const newTests=[...drugTests]
    picks.forEach(p=>{
      const s={id:uid(),employeeId:p.id,employeeName:p.name,type:'random',status:'open',date:now(),result:null,signature:null,notes:'',mroNotes:'',auto:false}
      const dt={id:uid(),employeeId:p.id,employeeName:p.name,type:'random',date:now(),scheduledDate:null,result:'pending',mroNotes:'',auto:false,screeningId:s.id}
      newScreenings.push(s)
      newTests.push(dt)
    })
    saveScreenings(newScreenings)
    saveTests(newTests)
    setPickerResult(picks)
  }

  // ── EMPLOYEE CRUD ──
  const addEmployee=(emp)=>{const e={...emp,id:emp.id||uid()};saveEmps([...employees,e]);toast('Employee added','info')}
  const updateEmployee=(id,data)=>{saveEmps(employees.map(e=>e.id===id?{...e,...data}:e));toast('Employee updated','info')}
  const deleteEmployee=(id)=>{saveEmps(employees.filter(e=>e.id!==id));toast('Employee removed','warning')}

  // ── DRUG TEST CRUD ──
  const addDrugTest=(dt)=>{saveTests([...drugTests,{...dt,id:uid()}]);toast('Drug test added','info')}
  const updateTest=(id,data)=>{saveTests(drugTests.map(t=>t.id===id?{...t,...data}:t))}

  // ── SCREENING UPDATE ──
  const updateScreening=(id,data)=>{saveScreenings(screenings.map(s=>s.id===id?{...s,...data}:s))}

  // ── EXCEL EXPORT ──
  const exportExcel=()=>{
    try{
      const wb=XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(employees.map(e=>({ID:e.id,Name:e.name,Title:e.title,Department:e.department,Position:e.position,Management:e.management?'Yes':'No',Exempt:e.exempt?'Yes':'No'}))),'Employee Roster')
      XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(screenings.map(s=>({ID:s.id,Employee:s.employeeName,Type:s.type,Status:s.status,Date:fmt(s.date),Result:s.result||'',Notes:s.notes}))),'Screenings')
      XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(screenings.filter(s=>s.type==='random').map(s=>({Employee:s.employeeName,Date:fmt(s.date),Status:s.status,Result:s.result||''}))),'Random Picks')
      XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(drugTests.map(t=>({Employee:t.employeeName,Type:t.type,Date:fmt(t.date),Result:t.result,MRO:t.mroNotes||''}))),'Drug Tests')
      XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(completedScreenings.map(s=>({Employee:s.employeeName,Type:s.type,Date:fmt(s.date),Result:s.result}))),'Completed')
      XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet([{Total_Employees:employees.length,Active_Pool:pool.length,Exempt:employees.filter(e=>e.exempt).length,Total_Tests:drugTests.length,Passed:passedTests.length,Failed:failedTests.length,Pending:pendingTests.length}]),'Summary')
      XLSX.writeFile(wb,'ClearScreenHR_Report.xlsx')
      toast('Excel exported','info')
    }catch(e){toast('Export failed','error')}
  }

  // ── JSON EXPORT/IMPORT ──
  const exportJSON=()=>{
    const data={profile,employees,screenings,drugTests,settings}
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'})
    const url=URL.createObjectURL(blob)
    const a=document.createElement('a');a.href=url;a.download='ClearScreenHR_'+profile.name+'.json';a.click()
    URL.revokeObjectURL(url)
    toast('Profile exported','info')
  }
  const importJSON=(file)=>{
    const reader=new FileReader()
    reader.onload=(e)=>{
      try{
        const data=JSON.parse(e.target.result)
        if(data.employees)saveEmps(data.employees)
        if(data.screenings)saveScreenings(data.screenings)
        if(data.drugTests)saveTests(data.drugTests)
        if(data.settings)saveSettings({...settings,...data.settings})
        toast('Profile imported','info')
      }catch(e){toast('Invalid JSON file','error')}
    }
    reader.readAsText(file)
  }

  // ── EMPLOYEE IMPORT (Excel/CSV) ──
  const handleEmpImport=(file)=>{
    const reader=new FileReader()
    reader.onload=(e)=>{
      try{
        const wb=XLSX.read(e.target.result,{type:'array'})
        const ws=wb.Sheets[wb.SheetNames[0]]
        const rows=XLSX.utils.sheet_to_json(ws)
        if(rows.length===0){toast('No data found','error');return}
        const cols=Object.keys(rows[0])
        // Auto-detect columns
        const idCol=cols.find(c=>/^(id|employee.?id|id.?number|emp.?id)/i.test(c))
        const nameCol=cols.find(c=>/^(full.?name|name|employee.?name)/i.test(c))
        const firstCol=cols.find(c=>/^(first.?name|first)/i.test(c))
        const lastCol=cols.find(c=>/^(last.?name|last)/i.test(c))
        const titleCol=cols.find(c=>/^(title|job.?title|position)/i.test(c))
        const deptCol=cols.find(c=>/^(dept|department)/i.test(c))
        if(!idCol&&!nameCol&&!firstCol){setImportModal({rows,cols});return}
        let added=0,updated=0,skipped=0
        const newEmps=[...employees]
        rows.forEach(r=>{
          const empId=r[idCol]||uid()
          const empName=nameCol?r[nameCol]:(firstCol&&lastCol?r[firstCol]+' '+r[lastCol]:r[firstCol]||'')
          if(!empName){skipped++;return}
          const existing=newEmps.findIndex(e=>e.id===empId)
          const emp={id:String(empId),name:empName,title:r[titleCol]||'',department:r[deptCol]||'',position:'Staff',management:false,exempt:false,prescriptions:'',notes:''}
          if(existing>=0){newEmps[existing]={...newEmps[existing],...emp,prescriptions:newEmps[existing].prescriptions,notes:newEmps[existing].notes};updated++}
          else{newEmps.push(emp);added++}
        })
        saveEmps(newEmps)
        toast(added+' added, '+updated+' updated, '+skipped+' skipped','info')
      }catch(err){toast('Import error: '+err.message,'error')}
    }
    reader.readAsArrayBuffer(file)
  }

  // ══════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════
  if(splash)return <div><style>{css}</style><Splash onDone={()=>setSplash(false)}/></div>
  if(screen==='profiles'){
    if(portalUser){return <div style={{position:'fixed',inset:0,background:'#0f0f0f',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:CSFF,zIndex:9000}}><div style={{color:CSG,fontSize:16,letterSpacing:2}}>Loading profile...</div></div>}
    return <div><style>{css}</style><ProfilePicker profiles={profiles} onSelect={selectProfile} onCreate={createProfile} onDelete={deleteProfile}/><Toasts toasts={toasts} remove={removeToast}/></div>
  }
  if(screen==='disclaimer')return <div><style>{css}</style><DisclaimerModal onAccept={acceptDisclaimer}/><Toasts toasts={toasts} remove={removeToast}/></div>

  const A=CSG
  const SB=215
  const hdr={background:CSNAV,color:'#fff',padding:'12px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',fontFamily:CSFF,position:'fixed',top:0,left:mob?0:SB,right:0,zIndex:800,borderBottom:'1px solid #222'}

  // ── PAGE RENDERERS ──
  const renderDashboard=()=>(
    <div>
      <div style={{fontSize:24,fontWeight:700,letterSpacing:2,marginBottom:24}}>DASHBOARD</div>
      <div style={{display:'grid',gridTemplateColumns:mob?'1fr 1fr':'repeat(4,1fr)',gap:14}}>
        {[{l:'Total Employees',v:employees.length,c:'#3498db'},{l:'Active Pool',v:pool.length,c:'#2ecc71'},{l:'Pending Tests',v:pendingTests.length,c:CSG},{l:'Completed',v:completedScreenings.length,c:'#9b59b6'}].map(s=>(
          <div key={s.l} style={{background:'#fff',borderRadius:8,padding:'20px 18px',borderLeft:'4px solid '+s.c}}>
            <div style={{fontSize:11,letterSpacing:2,textTransform:'uppercase',color:'#888',marginBottom:6}}>{s.l}</div>
            <div style={{fontSize:32,fontWeight:700,color:'#111'}}>{s.v}</div>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:mob?'1fr':'1fr 1fr',gap:14,marginTop:20}}>
        <div style={{background:'#fff',borderRadius:8,padding:20}}>
          <div style={{fontSize:15,fontWeight:700,letterSpacing:1,marginBottom:14}}>RECENT TESTS</div>
          {drugTests.slice(-5).reverse().map(t=>(
            <div key={t.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid #f0f0ec'}}>
              <div><div style={{fontWeight:600,fontSize:14}}>{t.employeeName}</div><div style={{fontSize:11,color:'#888'}}>{t.type} · {fmt(t.date)}</div></div>
              <div style={{padding:'3px 10px',borderRadius:4,fontSize:11,fontWeight:700,letterSpacing:1,background:t.result==='pass'?'#d4edda':t.result==='fail'?'#f8d7da':'#fff3cd',color:t.result==='pass'?'#155724':t.result==='fail'?'#721c24':'#856404'}}>{(t.result||'pending').toUpperCase()}</div>
            </div>
          ))}
          {drugTests.length===0&&<div style={{color:'#aaa',fontSize:13}}>No tests yet</div>}
        </div>
        <div style={{background:'#fff',borderRadius:8,padding:20}}>
          <div style={{fontSize:15,fontWeight:700,letterSpacing:1,marginBottom:14}}>ACTIVE SCREENINGS</div>
          {openScreenings.slice(0,5).map(s=>(
            <div key={s.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid #f0f0ec'}}>
              <div><div style={{fontWeight:600,fontSize:14}}>{s.employeeName}</div><div style={{fontSize:11,color:'#888'}}>{s.type} · {fmt(s.date)}</div></div>
              <div style={{padding:'3px 10px',borderRadius:4,fontSize:11,fontWeight:700,background:'#e3f2fd',color:'#1565c0'}}>{s.status.toUpperCase()}</div>
            </div>
          ))}
          {openScreenings.length===0&&<div style={{color:'#aaa',fontSize:13}}>No active screenings</div>}
        </div>
      </div>
      {failedTests.length>0&&<div style={{marginTop:20,background:'#fff5f5',border:'1px solid #fed7d7',borderRadius:8,padding:16,display:'flex',alignItems:'center',gap:10}}>
        <AlertTriangle size={20} color="#e53e3e"/>
        <div style={{fontSize:14,color:'#c53030',fontWeight:600}}>{failedTests.length} failed test(s) require follow-up action</div>
      </div>}
    </div>
  )

  const renderEmployees=()=>(
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20,flexWrap:'wrap',gap:10}}>
        <div style={{fontSize:24,fontWeight:700,letterSpacing:2}}>EMPLOYEES</div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <div style={{background:CSG,color:'#000',padding:'8px 16px',borderRadius:4,cursor:'pointer',fontWeight:700,fontSize:12,letterSpacing:1,display:'flex',alignItems:'center',gap:6}} onClick={()=>setEmpForm({name:'',title:'',department:'Operations',position:'Staff',management:false,exempt:false,prescriptions:'',notes:''})}><Plus size={14}/>Add</div>
          <label style={{background:'#111',color:'#fff',padding:'8px 16px',borderRadius:4,cursor:'pointer',fontSize:12,letterSpacing:1,display:'flex',alignItems:'center',gap:6}}><Upload size={14}/>Import<input type="file" accept=".xlsx,.csv" style={{display:'none'}} onChange={e=>e.target.files[0]&&handleEmpImport(e.target.files[0])}/></label>
        </div>
      </div>
      <div style={{display:'flex',gap:8,marginBottom:14,flexWrap:'wrap'}}>
        <div style={{position:'relative',flex:1,minWidth:200}}><Search size={16} style={{position:'absolute',left:10,top:10,color:'#aaa'}}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{width:'100%',padding:'8px 12px 8px 34px',border:'1px solid #ddd',borderRadius:4,fontSize:13,fontFamily:CSFF,outline:'none',boxSizing:'border-box'}}/></div>
        {['all','active','exempt','management'].map(f=>(
          <div key={f} onClick={()=>setFilter(f)} style={{padding:'8px 14px',borderRadius:4,fontSize:12,fontWeight:600,letterSpacing:1,textTransform:'uppercase',cursor:'pointer',background:filter===f?CSG:'#fff',color:filter===f?'#000':'#666',border:'1px solid '+(filter===f?CSG:'#ddd')}}>{f}</div>
        ))}
      </div>
      <div style={{background:'#fff',borderRadius:8,overflow:'hidden'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13,fontFamily:CSFF}}>
          <thead><tr style={{background:'#fafaf8',borderBottom:'2px solid #eee'}}>
            {['ID','Name','Title','Dept','Position','Status'].map(h=><th key={h} style={{padding:'10px 14px',textAlign:'left',fontSize:11,letterSpacing:2,textTransform:'uppercase',color:'#888',fontWeight:600}}>{h}</th>)}
            <th style={{width:80}}></th>
          </tr></thead>
          <tbody>
            {filteredEmps.map(e=>(
              <tr key={e.id} style={{borderBottom:'1px solid #f0f0ec',transition:'background .15s',cursor:'pointer'}} onMouseEnter={ev=>ev.currentTarget.style.background='#fafaf8'} onMouseLeave={ev=>ev.currentTarget.style.background='transparent'} onClick={()=>setModal({type:'empDetail',emp:e})}>
                <td style={{padding:'10px 14px',color:'#888',fontSize:12}}>{e.id}</td>
                <td style={{padding:'10px 14px',fontWeight:600}}>{e.name}</td>
                <td style={{padding:'10px 14px',color:'#555'}}>{e.title}</td>
                <td style={{padding:'10px 14px',color:'#555'}}>{e.department}</td>
                <td style={{padding:'10px 14px',color:'#555'}}>{e.position}</td>
                <td style={{padding:'10px 14px'}}>
                  {e.exempt&&<span style={{background:'#fee2e2',color:'#991b1b',padding:'2px 8px',borderRadius:3,fontSize:10,fontWeight:700,letterSpacing:1}}>EXEMPT</span>}
                  {e.management&&<span style={{background:'#dbeafe',color:'#1e40af',padding:'2px 8px',borderRadius:3,fontSize:10,fontWeight:700,letterSpacing:1,marginLeft:4}}>MGMT</span>}
                </td>
                <td style={{padding:'10px 14px'}} onClick={ev=>ev.stopPropagation()}>
                  <div style={{display:'flex',gap:6}}>
                    <Edit size={14} style={{cursor:'pointer',color:'#888'}} onClick={()=>setEmpForm(e)}/>
                    <Trash2 size={14} style={{cursor:'pointer',color:'#e74c3c'}} onClick={()=>deleteEmployee(e.id)}/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredEmps.length===0&&<div style={{padding:30,textAlign:'center',color:'#aaa'}}>No employees found</div>}
      </div>
    </div>
  )

  const renderPicker=()=>(
    <div>
      <div style={{fontSize:24,fontWeight:700,letterSpacing:2,marginBottom:24}}>RANDOM PICKER</div>
      <div style={{background:'#fff',borderRadius:8,padding:24,maxWidth:500}}>
        <div style={{fontSize:13,color:'#888',letterSpacing:1,marginBottom:6}}>ELIGIBLE POOL: {pool.length} employees</div>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
          <div style={{fontSize:13,fontWeight:600}}>Pick count:</div>
          <input type="number" min={1} max={pool.length||1} value={pickerCount} onChange={e=>setPickerCount(Math.max(1,parseInt(e.target.value)||1))} style={{width:60,padding:'8px 10px',border:'1px solid #ddd',borderRadius:4,fontSize:14,fontFamily:CSFF,textAlign:'center'}}/>
        </div>
        <div style={{background:CSG,color:'#000',padding:'14px 0',borderRadius:4,textAlign:'center',cursor:'pointer',fontWeight:700,fontSize:15,letterSpacing:2}} onClick={runPicker}>🎲 RUN RANDOM PICK</div>
        <div style={{fontSize:11,color:'#aaa',marginTop:8,textAlign:'center'}}>Uses crypto.getRandomValues() — CSPRNG compliant</div>
      </div>
      {pickerResult&&(
        <div style={{marginTop:20,background:'#fff',borderRadius:8,padding:24}}>
          <div style={{fontSize:16,fontWeight:700,letterSpacing:1,marginBottom:14}}>SELECTED ({pickerResult.length})</div>
          {pickerResult.map(p=>(
            <div key={p.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid #f0f0ec'}}>
              <div><div style={{fontWeight:600}}>{p.name}</div><div style={{fontSize:12,color:'#888'}}>{p.title} · {p.department}</div></div>
              {p.recent&&<div style={{fontSize:10,fontWeight:700,letterSpacing:1,color:'#d97706',background:'#fff3cd',padding:'3px 8px',borderRadius:3}}>TESTED &lt;3 MO</div>}
            </div>
          ))}
          <div style={{marginTop:14,background:'#d4edda',padding:'10px 14px',borderRadius:4,fontSize:13,color:'#155724',display:'flex',alignItems:'center',gap:8}}>
            <Check size={16}/> Pending drug test(s) auto-created in Drug Tests tab
          </div>
        </div>
      )}
    </div>
  )

  const renderDrugTests=()=>(
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20,flexWrap:'wrap',gap:10}}>
        <div style={{fontSize:24,fontWeight:700,letterSpacing:2}}>DRUG TESTS</div>
        <div style={{background:CSG,color:'#000',padding:'8px 16px',borderRadius:4,cursor:'pointer',fontWeight:700,fontSize:12,letterSpacing:1,display:'flex',alignItems:'center',gap:6}} onClick={()=>setTestForm({employeeId:'',type:'pre-employment',date:new Date().toISOString().slice(0,10),result:'pending',mroNotes:''})}><Plus size={14}/>Add Test</div>
      </div>
      {pendingTests.length>0&&<div style={{background:'#fff3cd',border:'1px solid #ffeeba',borderRadius:8,padding:'12px 16px',marginBottom:16,fontSize:13,color:'#856404',display:'flex',alignItems:'center',gap:8}}>
        <Info size={16}/> {pendingTests.length} random pick(s) awaiting results
      </div>}
      <div style={{display:'grid',gridTemplateColumns:mob?'1fr 1fr':'repeat(4,1fr)',gap:10,marginBottom:16}}>
        {[{l:'Pass',v:passedTests.length,c:'#2ecc71'},{l:'Fail',v:failedTests.length,c:'#e74c3c'},{l:'Pending',v:pendingTests.length,c:CSG},{l:'Total',v:drugTests.length,c:'#3498db'}].map(s=>(
          <div key={s.l} style={{background:'#fff',borderRadius:6,padding:'12px 14px',borderTop:'3px solid '+s.c,textAlign:'center'}}>
            <div style={{fontSize:22,fontWeight:700}}>{s.v}</div>
            <div style={{fontSize:10,letterSpacing:2,textTransform:'uppercase',color:'#888'}}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{background:'#fff',borderRadius:8,overflow:'hidden'}}>
        {drugTests.slice().reverse().map(t=>(
          <div key={t.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px',borderBottom:'1px solid #f0f0ec',gap:10,flexWrap:'wrap'}}>
            <div style={{flex:1,minWidth:150}}>
              <div style={{fontWeight:600,fontSize:14}}>{t.employeeName||'Unknown'}</div>
              <div style={{fontSize:12,color:'#888',display:'flex',gap:8,flexWrap:'wrap',marginTop:2}}>
                <span>{t.type}</span><span>·</span><span>{fmt(t.date)}</span>
                {t.auto&&<span style={{background:'#e3f2fd',color:'#1565c0',padding:'1px 6px',borderRadius:3,fontSize:10,fontWeight:700}}>AUTO-PICKED</span>}
              </div>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <div style={{padding:'4px 12px',borderRadius:4,fontSize:11,fontWeight:700,letterSpacing:1,background:t.result==='pass'?'#d4edda':t.result==='fail'?'#f8d7da':'#fff3cd',color:t.result==='pass'?'#155724':t.result==='fail'?'#721c24':'#856404'}}>{(t.result||'pending').toUpperCase()}</div>
              {t.result==='pending'&&<div style={{background:CSG,color:'#000',padding:'4px 12px',borderRadius:4,fontSize:11,fontWeight:700,cursor:'pointer'}} onClick={()=>setResultModal(t)}>RESULT</div>}
            </div>
          </div>
        ))}
        {drugTests.length===0&&<div style={{padding:30,textAlign:'center',color:'#aaa'}}>No drug tests</div>}
      </div>
    </div>
  )

  const renderScreenings=()=>(
    <div>
      <div style={{fontSize:24,fontWeight:700,letterSpacing:2,marginBottom:24}}>ACTIVE SCREENINGS</div>
      {screenings.filter(s=>s.status!=='completed').slice().reverse().map(s=>(
        <div key={s.id} style={{background:'#fff',borderRadius:8,padding:'16px 20px',marginBottom:10,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
          <div>
            <div style={{fontWeight:600,fontSize:15}}>{s.employeeName}</div>
            <div style={{fontSize:12,color:'#888'}}>{s.type} · {fmt(s.date)}</div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{padding:'4px 12px',borderRadius:4,fontSize:11,fontWeight:700,background:s.status==='open'?'#fff3cd':s.status==='in-progress'?'#e3f2fd':'#d4edda',color:s.status==='open'?'#856404':s.status==='in-progress'?'#1565c0':'#155724'}}>{s.status.toUpperCase()}</div>
            {s.status==='open'&&<div style={{background:'#3498db',color:'#fff',padding:'4px 12px',borderRadius:4,fontSize:11,fontWeight:700,cursor:'pointer'}} onClick={()=>updateScreening(s.id,{status:'in-progress'})}>START</div>}
            {s.status==='in-progress'&&<div style={{background:CSG,color:'#000',padding:'4px 12px',borderRadius:4,fontSize:11,fontWeight:700,cursor:'pointer'}} onClick={()=>setSigModal(s)}>COMPLETE</div>}
          </div>
        </div>
      ))}
      {screenings.filter(s=>s.status!=='completed').length===0&&<div style={{background:'#fff',borderRadius:8,padding:30,textAlign:'center',color:'#aaa'}}>No active screenings</div>}
    </div>
  )

  const renderHistory=()=>(
    <div>
      <div style={{fontSize:24,fontWeight:700,letterSpacing:2,marginBottom:24}}>HISTORY</div>
      <div style={{background:'#fff',borderRadius:8,overflow:'hidden'}}>
        {completedScreenings.slice().reverse().map(s=>(
          <div key={s.id} style={{padding:'14px 18px',borderBottom:'1px solid #f0f0ec',display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer'}} onClick={()=>setModal({type:'historyDetail',screening:s})}>
            <div><div style={{fontWeight:600}}>{s.employeeName}</div><div style={{fontSize:12,color:'#888'}}>{s.type} · {fmt(s.date)}</div></div>
            <div style={{padding:'4px 12px',borderRadius:4,fontSize:11,fontWeight:700,background:s.result==='pass'?'#d4edda':'#f8d7da',color:s.result==='pass'?'#155724':'#721c24'}}>{(s.result||'N/A').toUpperCase()}</div>
          </div>
        ))}
        {completedScreenings.length===0&&<div style={{padding:30,textAlign:'center',color:'#aaa'}}>No completed screenings</div>}
      </div>
    </div>
  )

  const renderCalendar=()=>{
    const daysInMonth=new Date(calYear,calMonth+1,0).getDate()
    const firstDay=new Date(calYear,calMonth,1).getDay()
    const monthName=new Date(calYear,calMonth).toLocaleString('en-US',{month:'long',year:'numeric'})
    const cells=[]
    for(let i=0;i<firstDay;i++)cells.push(null)
    for(let d=1;d<=daysInMonth;d++)cells.push(d)
    const dayScreenings=(d)=>screenings.filter(s=>{const dt=new Date(s.date);return dt.getFullYear()===calYear&&dt.getMonth()===calMonth&&dt.getDate()===d})
    return(
      <div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
          <div style={{fontSize:24,fontWeight:700,letterSpacing:2}}>CALENDAR</div>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <ChevronLeft size={20} style={{cursor:'pointer'}} onClick={()=>{if(calMonth===0){setCalMonth(11);setCalYear(calYear-1)}else setCalMonth(calMonth-1)}}/>
            <div style={{fontSize:16,fontWeight:600,minWidth:160,textAlign:'center'}}>{monthName}</div>
            <ChevronRight size={20} style={{cursor:'pointer'}} onClick={()=>{if(calMonth===11){setCalMonth(0);setCalYear(calYear+1)}else setCalMonth(calMonth+1)}}/>
          </div>
        </div>
        <div style={{background:'#fff',borderRadius:8,padding:12}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:2}}>
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=><div key={d} style={{textAlign:'center',fontSize:11,fontWeight:600,letterSpacing:1,color:'#888',padding:8}}>{d}</div>)}
            {cells.map((d,i)=>{
              if(!d)return <div key={i}/>
              const ds=dayScreenings(d)
              return <div key={i} style={{textAlign:'center',padding:'10px 4px',borderRadius:4,background:ds.length?CSG:'transparent',color:ds.length?'#000':'#333',cursor:ds.length?'pointer':'default',fontWeight:ds.length?700:400,fontSize:14,position:'relative'}} onClick={()=>ds.length&&setModal({type:'dayDetail',day:d,month:calMonth,year:calYear,items:ds})}>
                {d}
                {ds.length>0&&<div style={{position:'absolute',bottom:2,left:'50%',transform:'translateX(-50%)',width:4,height:4,borderRadius:'50%',background:'#000'}}/>}
              </div>
            })}
          </div>
        </div>
      </div>
    )
  }

  function renderReports(){
    return (
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24,flexWrap:'wrap',gap:10}}>
        <div style={{fontSize:24,fontWeight:700,letterSpacing:2}}>REPORTS</div>
        <div style={{background:CSG,color:'#000',padding:'8px 20px',borderRadius:4,cursor:'pointer',fontWeight:700,fontSize:12,letterSpacing:1,display:'flex',alignItems:'center',gap:6}} onClick={exportExcel}><Download size={14}/>Export Excel</div>
      </div>
      <div style={{display:'flex',gap:8,marginBottom:20}}>
        {['weekly','monthly','quarterly','annual'].map(r=>(
          <div key={r} onClick={()=>setReportRange(r)} style={{padding:'8px 16px',borderRadius:4,fontSize:12,fontWeight:600,letterSpacing:1,textTransform:'uppercase',cursor:'pointer',background:reportRange===r?CSG:'#fff',color:reportRange===r?'#000':'#666',border:'1px solid '+(reportRange===r?CSG:'#ddd')}}>{r}</div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:mob?'1fr':'1fr 1fr',gap:14}}>
        <div style={{background:'#fff',borderRadius:8,padding:20}}>
          <div style={{fontSize:15,fontWeight:700,letterSpacing:1,marginBottom:14}}>SUMMARY</div>
          {[{l:'Total Tests',v:drugTests.length},{l:'Random Picks',v:drugTests.filter(t=>t.type==='random').length},{l:'Pass Rate',v:drugTests.length?Math.round(passedTests.length/drugTests.length*100)+'%':'N/A'},{l:'Active Pool Size',v:pool.length}].map(s=>(
            <div key={s.l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #f0f0ec'}}>
              <span style={{color:'#888',fontSize:13}}>{s.l}</span>
              <span style={{fontWeight:700,fontSize:14}}>{s.v}</span>
            </div>
          ))}
        </div>
        <div style={{background:'#fff',borderRadius:8,padding:20}}>
          <div style={{fontSize:15,fontWeight:700,letterSpacing:1,marginBottom:14}}>BY TYPE</div>
          {TEST_TYPES.map(t=>{const c=drugTests.filter(dt=>dt.type===t).length;return c>0?(
            <div key={t} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #f0f0ec'}}>
              <span style={{color:'#888',fontSize:13,textTransform:'capitalize'}}>{t.replace(/-/g,' ')}</span>
              <span style={{fontWeight:700}}>{c}</span>
            </div>
          ):null})}
        </div>
      </div>
    </div>
  )

  const renderSettings=()=>(
    <div>
      <div style={{fontSize:24,fontWeight:700,letterSpacing:2,marginBottom:24}}>SETTINGS</div>
      <div style={{display:'grid',gridTemplateColumns:mob?'1fr':'1fr 1fr',gap:14}}>
        <div style={{background:'#fff',borderRadius:8,padding:20}}>
          <div style={{fontSize:15,fontWeight:700,letterSpacing:1,marginBottom:14}}>COMPANY</div>
          <div style={{marginBottom:12}}>
            <div style={{fontSize:11,letterSpacing:2,color:'#888',marginBottom:4}}>COMPANY NAME</div>
            <input value={settings.companyName} onChange={e=>saveSettings({...settings,companyName:e.target.value})} style={{width:'100%',padding:'8px 12px',border:'1px solid #ddd',borderRadius:4,fontSize:13,fontFamily:CSFF,outline:'none',boxSizing:'border-box'}}/>
          </div>
          <div>
            <div style={{fontSize:11,letterSpacing:2,color:'#888',marginBottom:4}}>LOGO</div>
            <label style={{display:'inline-block',background:'#f0f0ec',padding:'8px 16px',borderRadius:4,cursor:'pointer',fontSize:12}}>
              <Upload size={14} style={{display:'inline',verticalAlign:'middle',marginRight:6}}/>Upload
              <input type="file" accept="image/*" style={{display:'none'}} onChange={e=>{const f=e.target.files[0];if(f){const r=new FileReader();r.onload=ev=>saveSettings({...settings,logo:ev.target.result});r.readAsDataURL(f)}}}/>
            </label>
            {settings.logo&&<img src={settings.logo} alt="logo" style={{height:40,marginLeft:12,verticalAlign:'middle'}}/>}
          </div>
        </div>
        <div style={{background:'#fff',borderRadius:8,padding:20}}>
          <div style={{fontSize:15,fontWeight:700,letterSpacing:1,marginBottom:14}}>AUTO-SCHEDULER</div>
          <label style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer',marginBottom:12}}>
            <input type="checkbox" checked={settings.autoEnabled} onChange={e=>saveSettings({...settings,autoEnabled:e.target.checked})} style={{accentColor:CSG}}/>
            <span style={{fontSize:14,fontWeight:600}}>Enable auto-scheduling</span>
          </label>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <span style={{fontSize:12,color:'#888'}}>Every</span>
            <input type="number" min={1} value={settings.autoInterval} onChange={e=>saveSettings({...settings,autoInterval:parseInt(e.target.value)||1})} style={{width:60,padding:'6px 8px',border:'1px solid #ddd',borderRadius:4,fontSize:13,fontFamily:CSFF,textAlign:'center'}}/>
            <select value={settings.autoUnit} onChange={e=>saveSettings({...settings,autoUnit:e.target.value})} style={{padding:'6px 10px',border:'1px solid #ddd',borderRadius:4,fontSize:13,fontFamily:CSFF}}>
              <option value="minutes">min</option><option value="hours">hrs</option><option value="days">days</option><option value="weeks">wks</option>
            </select>
          </div>
          {settings.autoEnabled&&<div style={{marginTop:12,background:'#d4edda',padding:'8px 12px',borderRadius:4,fontSize:12,color:'#155724'}}>Auto-scheduler active</div>}
        </div>
        <div style={{background:'#fff',borderRadius:8,padding:20}}>
          <div style={{fontSize:15,fontWeight:700,letterSpacing:1,marginBottom:14}}>DATA</div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            <div style={{background:CSG,color:'#000',padding:'8px 16px',borderRadius:4,cursor:'pointer',fontWeight:700,fontSize:12,display:'flex',alignItems:'center',gap:6}} onClick={exportJSON}><Download size={14}/>Export JSON</div>
            <label style={{background:'#111',color:'#fff',padding:'8px 16px',borderRadius:4,cursor:'pointer',fontSize:12,display:'flex',alignItems:'center',gap:6}}><Upload size={14}/>Import JSON<input type="file" accept=".json" style={{display:'none'}} onChange={e=>e.target.files[0]&&importJSON(e.target.files[0])}/></label>
          </div>
        </div>
        <div style={{background:'#fff',borderRadius:8,padding:20}}>
          <div style={{fontSize:15,fontWeight:700,letterSpacing:1,marginBottom:14}}>EMAIL (EmailJS)</div>
          {['emailService','emailTemplate','emailKey'].map(k=>(
            <div key={k} style={{marginBottom:10}}>
              <div style={{fontSize:11,letterSpacing:2,color:'#888',marginBottom:4}}>{k==='emailService'?'SERVICE ID':k==='emailTemplate'?'TEMPLATE ID':'PUBLIC KEY'}</div>
              <input value={settings[k]} onChange={e=>saveSettings({...settings,[k]:e.target.value})} style={{width:'100%',padding:'8px 12px',border:'1px solid #ddd',borderRadius:4,fontSize:13,fontFamily:CSFF,outline:'none',boxSizing:'border-box'}}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderProfile=()=>(
    <div>
      <div style={{fontSize:24,fontWeight:700,letterSpacing:2,marginBottom:24}}>PROFILE</div>
      <div style={{background:'#fff',borderRadius:8,padding:24,maxWidth:400}}>
        <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:20}}>
          <div style={{width:64,height:64,borderRadius:'50%',background:profile?.color||CSG,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,fontWeight:700,color:'#fff'}}>{profile?.name?.slice(0,2).toUpperCase()}</div>
          <div><div style={{fontSize:20,fontWeight:700}}>{profile?.name}</div><div style={{fontSize:13,color:'#888'}}>Active Profile</div></div>
        </div>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,letterSpacing:2,color:'#888',marginBottom:4}}>ORGANIZATION</div>
          <input value={settings.companyName} onChange={e=>saveSettings({...settings,companyName:e.target.value})} placeholder="Organization name" style={{width:'100%',padding:'8px 12px',border:'1px solid #ddd',borderRadius:4,fontSize:13,fontFamily:CSFF,outline:'none',boxSizing:'border-box'}}/>
        </div>
        <div style={{background:'#f0f0ec',padding:'12px 16px',borderRadius:4,cursor:'pointer',textAlign:'center',fontWeight:700,fontSize:13,letterSpacing:1}} onClick={()=>{setProfile(null);setScreen('profiles');setTab('dashboard')}}>Switch Profile</div>
      </div>
    </div>
  )

  const pages={dashboard:renderDashboard,employees:renderEmployees,picker:renderPicker,drugtests:renderDrugTests,screenings:renderScreenings,history:renderHistory,calendar:renderCalendar,reports:renderReports,settings:renderSettings,profile:renderProfile}

  // ══════════════════════════════════════════════
  // LAYOUT RENDER
  // ══════════════════════════════════════════════
  return(
    <div style={{position:'fixed',inset:0,background:CSBG,fontFamily:CSFF,display:'flex',overflow:'hidden'}}>
      <style>{css}</style>

      {/* ── SIDEBAR (desktop) ── */}
      {!mob&&<div style={{width:SB,background:CSNAV,color:'#fff',display:'flex',flexDirection:'column',flexShrink:0,overflow:'auto'}}>
        <div style={{padding:'20px 18px',borderBottom:'1px solid #222',display:'flex',alignItems:'center',gap:10}}>
          <Scale size={20} color={CSG}/>
          <div><div style={{fontSize:15,fontWeight:700,letterSpacing:2}}>Clear<span style={{color:CSG}}>Screen</span></div><div style={{fontSize:9,letterSpacing:2,color:'#888',textTransform:'uppercase'}}>{settings.companyName||'HR'}</div></div>
        </div>
        <div style={{flex:1,padding:'8px 0'}}>
          {TABS.map(t=>{const Icon=t.icon;return(
            <div key={t.id} onClick={()=>{setTab(t.id);setSearch('');setFilter('all')}} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 18px',cursor:'pointer',color:tab===t.id?CSG:'#aaa',background:tab===t.id?'rgba(245,197,24,.08)':'transparent',borderRight:tab===t.id?'3px solid '+CSG:'3px solid transparent',transition:'all .15s',fontSize:13,letterSpacing:1}}>
              <Icon size={16}/>{t.label}
            </div>
          )})}
        </div>
        <div style={{padding:14,borderTop:'1px solid #222'}}>
          <div style={{fontSize:9,letterSpacing:1,color:'#555',lineHeight:1.5}}>ClearScreen HR · BETA<br/>Not for sole compliance use</div>
        </div>
      </div>}

      {/* ── MAIN AREA ── */}
      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
        {/* Header */}
        <div style={hdr}>
          {mob&&<Menu size={20} style={{cursor:'pointer'}} onClick={()=>setDrawer(true)}/>}
          <div style={{fontSize:mob?14:15,fontWeight:700,letterSpacing:2}}>{TABS.find(t=>t.id===tab)?.label?.toUpperCase()}</div>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{fontSize:10,letterSpacing:1,color:'#555'}}>AUTO-SAVED</div>
            {!mob&&<div style={{background:'#222',color:'#aaa',padding:'5px 12px',borderRadius:4,cursor:'pointer',fontSize:11,letterSpacing:1}} onClick={exportJSON}>Export</div>}
            {!mob&&<div style={{background:'#222',color:'#aaa',padding:'5px 12px',borderRadius:4,cursor:'pointer',fontSize:11,letterSpacing:1}} onClick={exportExcel}>Excel</div>}
            <div style={{background:CSG,color:'#000',padding:'5px 12px',borderRadius:4,cursor:'pointer',fontSize:11,fontWeight:700,letterSpacing:1}} onClick={()=>{setProfile(null);setScreen('profiles');setTab('dashboard')}}>Switch</div>
            {onExit&&<div style={{background:'#333',color:'#fff',padding:'5px 12px',borderRadius:4,cursor:'pointer',fontSize:11,letterSpacing:1}} onClick={onExit}>✕ Exit</div>}
          </div>
        </div>

        {/* Content */}
        <div style={{flex:1,overflow:'auto',padding:mob?'68px 16px 80px':'60px 28px 28px'}}>
          {pages[tab]?.()}
        </div>

        {/* Mobile bottom nav */}
        {mob&&<div style={{position:'fixed',bottom:0,left:0,right:0,background:CSNAV,display:'flex',justifyContent:'space-around',padding:'8px 0',borderTop:'1px solid #222',zIndex:800}}>
          {MOB_TABS.map(id=>{const t=TABS.find(x=>x.id===id);const Icon=t.icon;return(
            <div key={id} onClick={()=>setTab(id)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2,cursor:'pointer',color:tab===id?CSG:'#888',fontSize:10,letterSpacing:1,padding:'4px 0'}}>
              <Icon size={18}/>{t.label}
            </div>
          )})}
        </div>}

        {/* Mobile drawer */}
        {mob&&drawer&&<>
          <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',zIndex:900}} onClick={()=>setDrawer(false)}/>
          <div style={{position:'fixed',top:0,left:0,bottom:0,width:260,background:CSNAV,color:'#fff',zIndex:901,padding:'20px 0',overflow:'auto'}}>
            <div style={{padding:'0 18px 16px',borderBottom:'1px solid #222',display:'flex',alignItems:'center',gap:10}}>
              <Scale size={18} color={CSG}/><div style={{fontSize:14,fontWeight:700,letterSpacing:2}}>Clear<span style={{color:CSG}}>Screen</span></div>
            </div>
            {TABS.map(t=>{const Icon=t.icon;return(
              <div key={t.id} onClick={()=>{setTab(t.id);setDrawer(false);setSearch('');setFilter('all')}} style={{display:'flex',alignItems:'center',gap:10,padding:'12px 18px',cursor:'pointer',color:tab===t.id?CSG:'#aaa',fontSize:13,letterSpacing:1}}>
                <Icon size={16}/>{t.label}
              </div>
            )})}
          </div>
        </>}
      </div>

      {/* ── MODALS ── */}
      {/* Employee form */}
      {empForm&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:16}} onClick={()=>setEmpForm(null)}>
          <div style={{background:'#fff',borderRadius:8,padding:24,width:'95vw',maxWidth:440,maxHeight:'85vh',overflow:'auto'}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:18,fontWeight:700,marginBottom:16}}>{employees.find(e=>e.id===empForm.id)?'Edit Employee':'Add Employee'}</div>
            {[{k:'id',l:'Employee ID'},{k:'name',l:'Full Name'},{k:'title',l:'Job Title'}].map(f=>(
              <div key={f.k} style={{marginBottom:12}}>
                <div style={{fontSize:11,letterSpacing:2,color:'#888',marginBottom:4}}>{f.l}</div>
                <input value={empForm[f.k]||''} onChange={e=>setEmpForm({...empForm,[f.k]:e.target.value})} style={{width:'100%',padding:'8px 12px',border:'1px solid #ddd',borderRadius:4,fontSize:13,fontFamily:CSFF,outline:'none',boxSizing:'border-box'}}/>
              </div>
            ))}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
              <div>
                <div style={{fontSize:11,letterSpacing:2,color:'#888',marginBottom:4}}>DEPARTMENT</div>
                <select value={empForm.department||'Operations'} onChange={e=>setEmpForm({...empForm,department:e.target.value})} style={{width:'100%',padding:'8px 12px',border:'1px solid #ddd',borderRadius:4,fontSize:13,fontFamily:CSFF}}>
                  {DEPTS.map(d=><option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <div style={{fontSize:11,letterSpacing:2,color:'#888',marginBottom:4}}>POSITION</div>
                <select value={empForm.position||'Staff'} onChange={e=>setEmpForm({...empForm,position:e.target.value})} style={{width:'100%',padding:'8px 12px',border:'1px solid #ddd',borderRadius:4,fontSize:13,fontFamily:CSFF}}>
                  {POSITIONS.map(p=><option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div style={{display:'flex',gap:16,marginBottom:12}}>
              <label style={{display:'flex',alignItems:'center',gap:6,cursor:'pointer',fontSize:13}}><input type="checkbox" checked={empForm.management||false} onChange={e=>setEmpForm({...empForm,management:e.target.checked})} style={{accentColor:CSG}}/>Management</label>
              <label style={{display:'flex',alignItems:'center',gap:6,cursor:'pointer',fontSize:13}}><input type="checkbox" checked={empForm.exempt||false} onChange={e=>setEmpForm({...empForm,exempt:e.target.checked})} style={{accentColor:CSG}}/>Exempt from random</label>
            </div>
            <div style={{display:'flex',gap:8,marginTop:16}}>
              <div style={{flex:1,background:CSG,color:'#000',padding:'12px 0',borderRadius:4,textAlign:'center',cursor:'pointer',fontWeight:700,fontSize:13}} onClick={()=>{const ex=employees.find(e=>e.id===empForm.id);if(ex)updateEmployee(empForm.id,empForm);else addEmployee(empForm);setEmpForm(null)}}>Save</div>
              <div style={{flex:1,background:'#eee',color:'#333',padding:'12px 0',borderRadius:4,textAlign:'center',cursor:'pointer',fontSize:13}} onClick={()=>setEmpForm(null)}>Cancel</div>
            </div>
          </div>
        </div>
      )}

      {/* Drug test form */}
      {testForm&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:16}} onClick={()=>setTestForm(null)}>
          <div style={{background:'#fff',borderRadius:8,padding:24,width:'95vw',maxWidth:420}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:18,fontWeight:700,marginBottom:16}}>Add Drug Test</div>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:11,letterSpacing:2,color:'#888',marginBottom:4}}>EMPLOYEE</div>
              <select value={testForm.employeeId} onChange={e=>setTestForm({...testForm,employeeId:e.target.value,employeeName:employees.find(x=>x.id===e.target.value)?.name||''})} style={{width:'100%',padding:'8px 12px',border:'1px solid #ddd',borderRadius:4,fontSize:13,fontFamily:CSFF}}>
                <option value="">Select...</option>
                {employees.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
              <div>
                <div style={{fontSize:11,letterSpacing:2,color:'#888',marginBottom:4}}>TYPE</div>
                <select value={testForm.type} onChange={e=>setTestForm({...testForm,type:e.target.value})} style={{width:'100%',padding:'8px 12px',border:'1px solid #ddd',borderRadius:4,fontSize:13,fontFamily:CSFF}}>
                  {TEST_TYPES.map(t=><option key={t} value={t}>{t.replace(/-/g,' ')}</option>)}
                </select>
              </div>
              <div>
                <div style={{fontSize:11,letterSpacing:2,color:'#888',marginBottom:4}}>DATE</div>
                <input type="date" value={testForm.date||''} onChange={e=>setTestForm({...testForm,date:e.target.value})} style={{width:'100%',padding:'8px 12px',border:'1px solid #ddd',borderRadius:4,fontSize:13,fontFamily:CSFF}}/>
              </div>
            </div>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:11,letterSpacing:2,color:'#888',marginBottom:4}}>MRO NOTES</div>
              <textarea value={testForm.mroNotes||''} onChange={e=>setTestForm({...testForm,mroNotes:e.target.value})} rows={3} style={{width:'100%',padding:'8px 12px',border:'1px solid #ddd',borderRadius:4,fontSize:13,fontFamily:CSFF,resize:'vertical',boxSizing:'border-box'}}/>
            </div>
            <div style={{display:'flex',gap:8}}>
              <div style={{flex:1,background:CSG,color:'#000',padding:'12px 0',borderRadius:4,textAlign:'center',cursor:'pointer',fontWeight:700,fontSize:13}} onClick={()=>{if(!testForm.employeeId){toast('Select an employee','error');return}addDrugTest({...testForm,date:testForm.date||now()});setTestForm(null)}}>Save</div>
              <div style={{flex:1,background:'#eee',color:'#333',padding:'12px 0',borderRadius:4,textAlign:'center',cursor:'pointer',fontSize:13}} onClick={()=>setTestForm(null)}>Cancel</div>
            </div>
          </div>
        </div>
      )}

      {/* Result modal */}
      {resultModal&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:16}} onClick={()=>setResultModal(null)}>
          <div style={{background:'#fff',borderRadius:8,padding:28,width:'95vw',maxWidth:400,textAlign:'center'}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:18,fontWeight:700,marginBottom:6}}>Record Result</div>
            <div style={{fontSize:14,color:'#555',marginBottom:4}}>{resultModal.employeeName}</div>
            <div style={{fontSize:12,color:'#888',marginBottom:20}}>{resultModal.type} · {fmt(resultModal.date)}</div>
            {(()=>{const emp=employees.find(e=>e.id===resultModal.employeeId);return emp?.prescriptions?<div style={{background:'#fff3cd',padding:'10px 14px',borderRadius:4,marginBottom:16,fontSize:12,color:'#856404',textAlign:'left'}}><strong>Prescriptions on file:</strong> {emp.prescriptions}</div>:null})()}
            <div style={{display:'flex',gap:12,marginBottom:16}}>
              <div style={{flex:1,background:'#22c55e',color:'#fff',padding:'16px 0',borderRadius:6,cursor:'pointer',fontWeight:700,fontSize:18,letterSpacing:2}} onClick={()=>{updateTest(resultModal.id,{result:'pass'});const s=screenings.find(x=>x.id===resultModal.screeningId);if(s)updateScreening(s.id,{status:'completed',result:'pass'});setResultModal(null);toast('Result: PASS','info')}}>✓ PASS</div>
              <div style={{flex:1,background:'#ef4444',color:'#fff',padding:'16px 0',borderRadius:6,cursor:'pointer',fontWeight:700,fontSize:18,letterSpacing:2}} onClick={()=>{updateTest(resultModal.id,{result:'fail'});const s=screenings.find(x=>x.id===resultModal.screeningId);if(s)updateScreening(s.id,{status:'completed',result:'fail'});setResultModal(null);toast('Result: FAIL','warning')}}>✗ FAIL</div>
            </div>
            <div style={{background:'#eee',padding:'10px 0',borderRadius:4,cursor:'pointer',fontSize:13}} onClick={()=>setResultModal(null)}>Cancel</div>
          </div>
        </div>
      )}

      {/* Signature modal */}
      {sigModal&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:16}} onClick={()=>setSigModal(null)}>
          <div onClick={e=>e.stopPropagation()}>
            <SignaturePad onSave={(sig)=>{updateScreening(sigModal.id,{status:'completed',signature:sig});toast('Screening completed','info');setSigModal(null)}} onCancel={()=>setSigModal(null)}/>
          </div>
        </div>
      )}

      {/* Employee detail modal */}
      {modal?.type==='empDetail'&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:16}} onClick={()=>setModal(null)}>
          <div style={{background:'#fff',borderRadius:8,padding:24,width:'95vw',maxWidth:500,maxHeight:'80vh',overflow:'auto'}} onClick={e=>e.stopPropagation()}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
              <div style={{fontSize:20,fontWeight:700}}>{modal.emp.name}</div>
              <X size={20} style={{cursor:'pointer',color:'#888'}} onClick={()=>setModal(null)}/>
            </div>
            {[{l:'ID',v:modal.emp.id},{l:'Title',v:modal.emp.title},{l:'Department',v:modal.emp.department},{l:'Position',v:modal.emp.position},{l:'Management',v:modal.emp.management?'Yes':'No'},{l:'Exempt',v:modal.emp.exempt?'Yes':'No'}].map(f=>(
              <div key={f.l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #f0f0ec'}}>
                <span style={{color:'#888',fontSize:13}}>{f.l}</span><span style={{fontWeight:600}}>{f.v}</span>
              </div>
            ))}
            <div style={{marginTop:16}}>
              <div style={{fontSize:12,letterSpacing:2,color:'#888',marginBottom:6}}>PRESCRIPTIONS (CONFIDENTIAL)</div>
              <textarea value={modal.emp.prescriptions||''} onChange={e=>{updateEmployee(modal.emp.id,{prescriptions:e.target.value});setModal({...modal,emp:{...modal.emp,prescriptions:e.target.value}})}} rows={2} style={{width:'100%',padding:'8px 12px',border:'1px solid #ddd',borderRadius:4,fontSize:13,fontFamily:CSFF,resize:'vertical',boxSizing:'border-box'}}/>
            </div>
            <div style={{marginTop:12}}>
              <div style={{fontSize:12,letterSpacing:2,color:'#888',marginBottom:6}}>NOTES</div>
              <textarea value={modal.emp.notes||''} onChange={e=>{updateEmployee(modal.emp.id,{notes:e.target.value});setModal({...modal,emp:{...modal.emp,notes:e.target.value}})}} rows={2} style={{width:'100%',padding:'8px 12px',border:'1px solid #ddd',borderRadius:4,fontSize:13,fontFamily:CSFF,resize:'vertical',boxSizing:'border-box'}}/>
            </div>
            {modal.emp.management&&!modal.emp.exempt&&<div style={{marginTop:12,background:CSG,color:'#000',padding:'10px 0',borderRadius:4,textAlign:'center',cursor:'pointer',fontWeight:700,fontSize:12,letterSpacing:1}} onClick={()=>{updateEmployee(modal.emp.id,{exempt:true});setModal({...modal,emp:{...modal.emp,exempt:true}});toast('Exempted','info')}}>Exempt from Random</div>}
            {modal.emp.exempt&&<div style={{marginTop:12,background:'#eee',color:'#333',padding:'10px 0',borderRadius:4,textAlign:'center',cursor:'pointer',fontWeight:700,fontSize:12,letterSpacing:1}} onClick={()=>{updateEmployee(modal.emp.id,{exempt:false});setModal({...modal,emp:{...modal.emp,exempt:false}});toast('Un-exempted','info')}}>Un-Exempt</div>}
            <div style={{marginTop:20,fontSize:14,fontWeight:700,letterSpacing:1}}>SCREENING HISTORY</div>
            {drugTests.filter(t=>t.employeeId===modal.emp.id).map(t=>(
              <div key={t.id} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #f0f0ec'}}>
                <div style={{fontSize:13}}>{t.type} · {fmt(t.date)}</div>
                <div style={{fontSize:12,fontWeight:700,color:t.result==='pass'?'#22c55e':t.result==='fail'?'#ef4444':'#d97706'}}>{(t.result||'pending').toUpperCase()}</div>
              </div>
            ))}
            {drugTests.filter(t=>t.employeeId===modal.emp.id).length===0&&<div style={{color:'#aaa',fontSize:12,marginTop:8}}>No screening history</div>}
          </div>
        </div>
      )}

      {/* History detail modal */}
      {modal?.type==='historyDetail'&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:16}} onClick={()=>setModal(null)}>
          <div style={{background:'#fff',borderRadius:8,padding:24,width:440,maxWidth:'100%'}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:18,fontWeight:700,marginBottom:12}}>{modal.screening.employeeName}</div>
            {[{l:'Type',v:modal.screening.type},{l:'Date',v:fmt(modal.screening.date)},{l:'Status',v:modal.screening.status},{l:'Result',v:modal.screening.result||'N/A'}].map(f=>(
              <div key={f.l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #f0f0ec'}}>
                <span style={{color:'#888',fontSize:13}}>{f.l}</span><span style={{fontWeight:600,textTransform:'capitalize'}}>{f.v}</span>
              </div>
            ))}
            {modal.screening.signature&&<div style={{marginTop:16}}><div style={{fontSize:12,letterSpacing:2,color:'#888',marginBottom:6}}>E-SIGNATURE</div><img src={modal.screening.signature} alt="sig" style={{border:'1px solid #ddd',borderRadius:4,maxWidth:'100%'}}/></div>}
            <div style={{marginTop:16,background:'#eee',padding:'10px 0',borderRadius:4,textAlign:'center',cursor:'pointer',fontSize:13}} onClick={()=>setModal(null)}>Close</div>
          </div>
        </div>
      )}

      {/* Day detail modal */}
      {modal?.type==='dayDetail'&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:16}} onClick={()=>setModal(null)}>
          <div style={{background:'#fff',borderRadius:8,padding:24,width:'95vw',maxWidth:400}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:16,fontWeight:700,marginBottom:12}}>Screenings on {new Date(modal.year,modal.month,modal.day).toLocaleDateString()}</div>
            {modal.items.map(s=>(
              <div key={s.id} style={{padding:'10px 0',borderBottom:'1px solid #f0f0ec'}}>
                <div style={{fontWeight:600}}>{s.employeeName}</div>
                <div style={{fontSize:12,color:'#888'}}>{s.type} · {s.status}</div>
              </div>
            ))}
            <div style={{marginTop:14,background:'#eee',padding:'10px 0',borderRadius:4,textAlign:'center',cursor:'pointer',fontSize:13}} onClick={()=>setModal(null)}>Close</div>
          </div>
        </div>
      )}

      {/* Compliance chat */}
      <ComplianceChat show={chatOpen} onToggle={()=>setChatOpen(!chatOpen)}/>

      {/* Toasts */}
      <Toasts toasts={toasts} remove={removeToast}/>

      {/* Footer */}
      <div style={{position:'fixed',bottom:mob?50:0,left:mob?0:SB,right:0,background:'#fafaf8',borderTop:'1px solid #eee',padding:'6px 20px',fontSize:10,color:'#aaa',letterSpacing:1,zIndex:700,display:'flex',justifyContent:'center',gap:8}}>
        <span>ClearScreen HR · BETA SOFTWARE · Not for use as sole compliance mechanism · Not legal advice</span>
      </div>
    </div>
  )
}
}







// ═══ EQUIPMENT MANAGER MODULE ═══
var EQ_GOLD='#F97316',EQ_NAV='#111',EQ_BG='#f4f4f0',EQ_FF="'Barlow Condensed','Arial Narrow',sans-serif"
var EQ_TYPES=['Work Trucks','PD10','ATV/Buggies','Skidsteer W/Forks','Telehandler','MiniEx','Klemm Drill']

function EquipmentManager({onExit,portalUser}){
  var[user,setUser]=useState(function(){
    if(portalUser){return{id:'portal_'+portalUser,name:portalUser,username:portalUser,accountType:'admin'}}
    try{var u=localStorage.getItem('eq_user');return u?JSON.parse(u):null}catch(e2){return null}
  })
  var[projects,setProjects]=useState([])
  var[selProj,setSelProj]=useState(null)
  var[equipment,setEquipment]=useState([])
  var[tools,setTools]=useState([])
  var[eqLog,setEqLog]=useState([])
  var[toolLog,setToolLog]=useState([])
  var[page,setPage]=useState('projects')
  var[mob,setMob]=useState(typeof window!=='undefined'&&window.innerWidth<768)
  var[drawer,setDrawer]=useState(false)
  var[toasts,setToasts]=useState([])
  // Auth
  var[loginU,setLU]=useState('')
  var[loginP,setLP]=useState('')
  var[signUp,setSignUp]=useState(false)
  var[err,setErr]=useState('')
  var[users,setUsrs]=useState([])
  // Forms
  var[eqForm,setEqForm]=useState(null)
  var[toolForm,setToolForm]=useState(null)
  var[newProj,setNP]=useState('')
  var[newColor,setNC]=useState('#3498db')
  var[eqFilter,setEqFilter]=useState('all')
  var[eqSearch,setEqSearch]=useState('')
  var[toolSearch,setToolSearch]=useState('')

  function toast(msg,type){var id=uid();setToasts(function(p){return p.concat([{id:id,msg:msg,type:type||'info'}])});setTimeout(function(){setToasts(function(p){return p.filter(function(t){return t.id!==id})})},4000)}
  function eqHash(s){var h=5381;for(var i=0;i<s.length;i++){h=((h<<5)+h)+s.charCodeAt(i);h=h&h}return Math.abs(h).toString(36)}

  useEffect(function(){var h=function(){setMob(window.innerWidth<768)};window.addEventListener('resize',h);return function(){window.removeEventListener('resize',h)}},[])
  useEffect(function(){sGet('eq_projects').then(function(p){setProjects(p||[])});sGet('eq_users').then(function(u){setUsrs(u||[])})},[])
  useEffect(function(){if(!selProj)return;sGet('eq_equip_'+selProj.id).then(function(e){setEquipment(e||[])});sGet('eq_tools_'+selProj.id).then(function(t){setTools(t||[])});sGet('eq_eqlog_'+selProj.id).then(function(l){setEqLog(l||[])});sGet('eq_toollog_'+selProj.id).then(function(l){setToolLog(l||[])})},[selProj])

  function svP(p){setProjects(p);sSet('eq_projects',p)}
  function svE(e){setEquipment(e);if(selProj)sSet('eq_equip_'+selProj.id,e)}
  function svT(t){setTools(t);if(selProj)sSet('eq_tools_'+selProj.id,t)}
  function svEL(l){setEqLog(l);if(selProj)sSet('eq_eqlog_'+selProj.id,l)}
  function svTL(l){setToolLog(l);if(selProj)sSet('eq_toollog_'+selProj.id,l)}

  function logEq(action,item){var entry={id:uid(),date:new Date().toISOString(),user:user?user.name:'Unknown',action:action,item:item.type||item.name||'',detail:JSON.stringify(item)};svEL(eqLog.concat([entry]))}
  function logTool(action,item){var entry={id:uid(),date:new Date().toISOString(),user:user?user.name:'Unknown',action:action,item:item.name||'',serial:item.serial||'',detail:JSON.stringify(item)};svTL(toolLog.concat([entry]))}

  // Auth
  function login(){setErr('');var u=users.find(function(x){return x.username===loginU&&x.passwordHash===eqHash(loginP)});if(!u){setErr('Invalid credentials');return}setUser(u);localStorage.setItem('eq_user',JSON.stringify(u))}
  function doSignup(){setErr('');if(!loginU.trim()||!loginP.trim()){setErr('Fill all fields');return}if(users.find(function(x){return x.username===loginU})){setErr('Username taken');return}var u={id:uid(),name:loginU,username:loginU,passwordHash:eqHash(loginP),createdAt:new Date().toISOString()};var nu=users.concat([u]);setUsrs(nu);sSet('eq_users',nu);setUser(u);localStorage.setItem('eq_user',JSON.stringify(u));toast('Welcome!')}
  function logout(){localStorage.removeItem('eq_user');setUser(null)}

  // Project CRUD
  function createProj(){if(!newProj.trim())return;var p={id:uid(),name:newProj.trim(),color:newColor,createdAt:new Date().toISOString()};svP(projects.concat([p]));setNP('');toast('Project created')}

  // Equipment CRUD
  function saveEquip(eq){
    var isNew=!equipment.find(function(e){return e.id===eq.id})
    if(isNew){svE(equipment.concat([eq]));logEq('ADDED',eq);toast('Equipment added')}
    else{svE(equipment.map(function(e){return e.id===eq.id?eq:e}));logEq('UPDATED',eq);toast('Equipment updated')}
    setEqForm(null)
  }
  function deleteEquip(id){var eq=equipment.find(function(e){return e.id===id});svE(equipment.filter(function(e){return e.id!==id}));if(eq)logEq('REMOVED',eq);toast('Removed','warning')}

  // Tool CRUD
  function saveTool(t){
    var isNew=!tools.find(function(x){return x.id===t.id})
    if(isNew){svT(tools.concat([t]));logTool('ADDED',t);toast('Tool added')}
    else{svT(tools.map(function(x){return x.id===t.id?t:x}));logTool('UPDATED',t);toast('Tool updated')}
    setToolForm(null)
  }
  function toggleToolStatus(t){
    var newStatus=t.status==='working'?'broken':'working'
    var updated=Object.assign({},t,{status:newStatus,statusChangedAt:new Date().toISOString(),statusChangedBy:user?user.name:'Unknown'})
    svT(tools.map(function(x){return x.id===t.id?updated:x}))
    logTool(newStatus==='broken'?'MARKED BROKEN':'MARKED WORKING',updated)
    toast(t.name+' → '+newStatus)
  }

  // Export
  function exportExcel(){
    try{
      var wb=XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(equipment.map(function(e){return{Type:e.type,Qty:e.qty,RentalCompany:e.rental,Rep:e.rep,Phone:e.phone,DayIn:e.dayIn,EstDayOut:e.dayOut,Notes:e.notes||''}})),'Equipment')
      XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(tools.map(function(t){return{Name:t.name,Serial:t.serial,Cost:t.cost,Acquired:t.acquired,Status:t.status,LastChanged:t.statusChangedAt||'',ChangedBy:t.statusChangedBy||''}})),'Tools & Inventory')
      XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(eqLog.map(function(l){return{Date:new Date(l.date).toLocaleString(),User:l.user,Action:l.action,Item:l.item}})),'Equipment Log')
      XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(toolLog.map(function(l){return{Date:new Date(l.date).toLocaleString(),User:l.user,Action:l.action,Item:l.item,Serial:l.serial||''}})),'Tooling Log')
      XLSX.writeFile(wb,'EquipmentManager_'+(selProj?selProj.name:'export')+'.xlsx')
      toast('Excel exported')
    }catch(e2){toast('Export failed','error')}
  }

  var IS={width:'100%',padding:'10px 12px',border:'1px solid #ddd',borderRadius:4,fontSize:16,fontFamily:EQ_FF,outline:'none',boxSizing:'border-box',marginBottom:10}
  var today=new Date().toISOString().slice(0,10)

  // Login
  if(!user){
    return (
      <div style={{position:'fixed',inset:0,background:EQ_NAV,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:EQ_FF,zIndex:2000}}>
        <div style={{width:'90%',maxWidth:360,background:'#fff',borderRadius:12,padding:m?24:32}}>
          <div style={{textAlign:'center',marginBottom:24}}>
            <div style={{fontSize:28,fontWeight:700,letterSpacing:3}}>SRC&D</div>
            <div style={{fontSize:12,color:'#888',letterSpacing:2}}>EQUIPMENT MANAGER</div>
          </div>
          {err&&<div style={{background:'#fee',color:'#c00',padding:8,borderRadius:4,marginBottom:10,fontSize:13}}>{err}</div>}
          <input value={loginU} onChange={function(e){setLU(e.target.value)}} placeholder="Username" style={IS}/>
          <input type="password" value={loginP} onChange={function(e){setLP(e.target.value)}} placeholder="Password" style={IS} onKeyDown={function(e){if(e.key==='Enter'){if(signUp)doSignup();else login()}}}/>
          <div style={{display:'flex',gap:8}}>
            <div onClick={function(){if(signUp)doSignup();else login()}} style={{flex:1,padding:12,background:EQ_GOLD,borderRadius:4,textAlign:'center',cursor:'pointer',fontWeight:700,fontSize:14,letterSpacing:2,color:'#fff'}}>{signUp?'SIGN UP':'SIGN IN'}</div>
          </div>
          <div style={{textAlign:'center',marginTop:12,fontSize:13,color:'#888'}}><span onClick={function(){setSignUp(!signUp);setErr('')}} style={{color:EQ_GOLD,cursor:'pointer'}}>{signUp?'← Back to Login':'Create Account →'}</span></div>
        </div>
      </div>
    )
  }

  // Filtered equipment
  var filteredEq=equipment.filter(function(e){
    if(eqFilter!=='all'&&e.type!==eqFilter)return false
    if(eqSearch){var s=eqSearch.toLowerCase();return(e.type||'').toLowerCase().indexOf(s)>=0||(e.rental||'').toLowerCase().indexOf(s)>=0||(e.rep||'').toLowerCase().indexOf(s)>=0}
    return true
  })
  var filteredTools=tools.filter(function(t){
    if(!toolSearch)return true
    var s=toolSearch.toLowerCase();return(t.name||'').toLowerCase().indexOf(s)>=0||(t.serial||'').toLowerCase().indexOf(s)>=0
  })
  var overdueEq=equipment.filter(function(e){return e.dayOut&&e.dayOut<today})

  var navItems=[{id:'projects',label:'Projects',ico:'📁'},{id:'equipment',label:'Equipment',ico:'🚜'},{id:'tools',label:'Tools',ico:'🔧'},{id:'records',label:'Records',ico:'📊'}]

  var sidebar=(
    <div style={{width:mob?260:200,background:EQ_NAV,color:'#fff',display:'flex',flexDirection:'column',flexShrink:0,fontFamily:EQ_FF,height:'100%'}}>
      <div style={{padding:'14px 12px',borderBottom:'1px solid #222'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{fontSize:13,fontWeight:700}}>{user.name}</div>
        </div>
        {selProj&&<div style={{marginTop:8,padding:'4px 8px',background:selProj.color+'22',borderLeft:'3px solid '+selProj.color,borderRadius:3,fontSize:11,color:'#ccc'}}>{selProj.name}</div>}
      </div>
      <div style={{flex:1,padding:'6px 0'}}>
        {navItems.map(function(n){return (
          <div key={n.id} onClick={function(){setPage(n.id);setDrawer(false)}} style={{display:'flex',alignItems:'center',gap:8,padding:'9px 12px',cursor:'pointer',color:page===n.id?EQ_GOLD:'#aaa',background:page===n.id?'rgba(249,115,22,.08)':'transparent',borderRight:page===n.id?'3px solid '+EQ_GOLD:'3px solid transparent',fontSize:13,letterSpacing:1}}><span>{n.ico}</span>{n.label}</div>
        )})}
      </div>
      <div style={{padding:10,borderTop:'1px solid #222'}}>
        <div onClick={logout} style={{padding:'6px 10px',background:'#222',borderRadius:4,textAlign:'center',cursor:'pointer',fontSize:11,color:'#aaa',marginBottom:4}}>Sign Out</div>
        {onExit&&<div onClick={onExit} style={{padding:'6px 10px',background:'#333',borderRadius:4,textAlign:'center',cursor:'pointer',fontSize:11,color:'#aaa'}}>✕ Exit</div>}
      </div>
    </div>
  )

  return (
    <div style={{position:'fixed',inset:0,display:'flex',fontFamily:EQ_FF,overflow:'hidden',background:EQ_BG,zIndex:2000}}>
      {!mob&&sidebar}
      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
        <div style={{background:EQ_NAV,color:'#fff',padding:'10px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            {mob&&<span onClick={function(){setDrawer(true)}} style={{fontSize:20,cursor:'pointer'}}>☰</span>}
            <span style={{fontWeight:700,letterSpacing:2,fontSize:14}}>{(navItems.find(function(n){return n.id===page})||{label:''}).label.toUpperCase()}</span>
          </div>
          <div style={{display:'flex',gap:6,alignItems:'center'}}>
            {selProj&&page!=='projects'&&<div onClick={exportExcel} style={{padding:'4px 10px',background:'#222',borderRadius:3,cursor:'pointer',fontSize:10,color:'#aaa',letterSpacing:1}}>Export XLSX</div>}
          </div>
        </div>
        <div style={{flex:1,overflow:'auto',padding:mob?12:'20px 28px'}}>

          {/* ═══ PROJECTS ═══ */}
          {page==='projects'&&<div>
            <div style={{fontSize:22,fontWeight:700,letterSpacing:2,marginBottom:16}}>PROJECTS</div>
            <div style={{display:'flex',gap:8,marginBottom:16}}>
              <input value={newProj} onChange={function(e){setNP(e.target.value)}} placeholder="New project" style={{flex:1,padding:'8px 12px',border:'1px solid #ddd',borderRadius:4,fontSize:13,fontFamily:EQ_FF,outline:'none'}} onKeyDown={function(e){if(e.key==='Enter')createProj()}}/>
              <input type="color" value={newColor} onChange={function(e){setNC(e.target.value)}} style={{width:38,height:38,border:'none',cursor:'pointer',borderRadius:4}}/>
              <div onClick={createProj} style={{padding:'8px 16px',background:EQ_GOLD,color:'#fff',borderRadius:4,cursor:'pointer',fontWeight:700,fontSize:12}}>+ CREATE</div>
            </div>
            {projects.map(function(p){return (
              <div key={p.id} onClick={function(){setSelProj(p);setPage('equipment')}} style={{background:'#fff',borderRadius:8,padding:16,marginBottom:8,cursor:'pointer',borderLeft:'4px solid '+p.color,transition:'transform .15s'}} onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-2px)'}} onMouseLeave={function(e){e.currentTarget.style.transform='translateY(0)'}}>
                <div style={{fontWeight:700,fontSize:15}}>{p.name}</div>
                <div style={{fontSize:11,color:'#888',marginTop:4}}>Created {new Date(p.createdAt).toLocaleDateString()}</div>
              </div>
            )})}
            {projects.length===0&&<div style={{textAlign:'center',padding:30,color:'#aaa'}}>No projects yet</div>}
          </div>}

          {/* ═══ EQUIPMENT ═══ */}
          {page==='equipment'&&!selProj&&<div style={{textAlign:'center',padding:40,color:'#888'}}>Select a project<br/><span onClick={function(){setPage('projects')}} style={{color:EQ_GOLD,cursor:'pointer'}}>← Projects</span></div>}
          {page==='equipment'&&selProj&&<div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12,flexWrap:'wrap',gap:8}}>
              <div style={{fontSize:22,fontWeight:700,letterSpacing:2}}>{selProj.name} — EQUIPMENT</div>
              <div onClick={function(){setEqForm({id:uid(),type:'Work Trucks',qty:1,rental:'',rep:'',phone:'',dayIn:today,dayOut:'',notes:''})}} style={{padding:'8px 16px',background:EQ_GOLD,color:'#fff',borderRadius:4,cursor:'pointer',fontWeight:700,fontSize:12}}>+ Add Equipment</div>
            </div>
            {overdueEq.length>0&&<div style={{background:'#fee',border:'1px solid #fcc',borderRadius:6,padding:'10px 14px',marginBottom:12,fontSize:13,color:'#c00',display:'flex',alignItems:'center',gap:8}}>⚠ {overdueEq.length} equipment past estimated day out</div>}
            <div style={{display:'flex',gap:6,marginBottom:12,flexWrap:'wrap'}}>
              <input value={eqSearch} onChange={function(e){setEqSearch(e.target.value)}} placeholder="Search..." style={{flex:1,minWidth:150,padding:'7px 10px',border:'1px solid #ddd',borderRadius:4,fontSize:12,fontFamily:EQ_FF,outline:'none'}}/>
              <div onClick={function(){setEqFilter('all')}} style={{padding:'6px 12px',borderRadius:4,fontSize:11,fontWeight:600,cursor:'pointer',background:eqFilter==='all'?EQ_GOLD:'#fff',color:eqFilter==='all'?'#fff':'#666',border:'1px solid '+(eqFilter==='all'?EQ_GOLD:'#ddd')}}>All</div>
              {EQ_TYPES.map(function(t){return <div key={t} onClick={function(){setEqFilter(eqFilter===t?'all':t)}} style={{padding:'6px 10px',borderRadius:4,fontSize:11,fontWeight:600,cursor:'pointer',background:eqFilter===t?EQ_GOLD:'#fff',color:eqFilter===t?'#fff':'#666',border:'1px solid '+(eqFilter===t?EQ_GOLD:'#ddd')}}>{t}</div>})}
            </div>
            {filteredEq.map(function(eq){
              var overdue=eq.dayOut&&eq.dayOut<today
              return (
                <div key={eq.id} style={{background:'#fff',borderRadius:6,padding:'12px 16px',marginBottom:6,borderLeft:'3px solid '+(overdue?'#ef4444':EQ_GOLD)}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:6}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:14}}>{eq.type} <span style={{fontWeight:400,color:'#888'}}>× {eq.qty}</span></div>
                      <div style={{fontSize:12,color:'#555',marginTop:2}}>{eq.rental} · {eq.rep} · {eq.phone}</div>
                      <div style={{fontSize:11,color:'#888',marginTop:2}}>In: {eq.dayIn} → Out: {eq.dayOut||'TBD'}{overdue&&<span style={{color:'#ef4444',fontWeight:700}}> OVERDUE</span>}</div>
                    </div>
                    <div style={{display:'flex',gap:4}}>
                      <div onClick={function(){setEqForm(Object.assign({},eq))}} style={{padding:'4px 10px',background:'#f0f0ec',borderRadius:3,cursor:'pointer',fontSize:10,fontWeight:600}}>Edit</div>
                      <div onClick={function(){deleteEquip(eq.id)}} style={{padding:'4px 10px',background:'#fee',color:'#c00',borderRadius:3,cursor:'pointer',fontSize:10}}>Remove</div>
                    </div>
                  </div>
                  {eq.notes&&<div style={{fontSize:11,color:'#888',marginTop:4}}>Notes: {eq.notes}</div>}
                </div>
              )
            })}
            {filteredEq.length===0&&<div style={{background:'#fff',borderRadius:6,padding:20,color:'#aaa',textAlign:'center'}}>No equipment</div>}
          </div>}

          {/* ═══ TOOLS ═══ */}
          {page==='tools'&&!selProj&&<div style={{textAlign:'center',padding:40,color:'#888'}}>Select a project<br/><span onClick={function(){setPage('projects')}} style={{color:EQ_GOLD,cursor:'pointer'}}>← Projects</span></div>}
          {page==='tools'&&selProj&&<div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12,flexWrap:'wrap',gap:8}}>
              <div style={{fontSize:22,fontWeight:700,letterSpacing:2}}>TOOLS & INVENTORY</div>
              <div onClick={function(){setToolForm({id:uid(),name:'',serial:'',cost:'',acquired:today,status:'working',statusChangedAt:'',statusChangedBy:''})}} style={{padding:'8px 16px',background:EQ_GOLD,color:'#fff',borderRadius:4,cursor:'pointer',fontWeight:700,fontSize:12}}>+ Add Tool</div>
            </div>
            <input value={toolSearch} onChange={function(e){setToolSearch(e.target.value)}} placeholder="Search tools..." style={{width:'100%',padding:'8px 12px',border:'1px solid #ddd',borderRadius:4,fontSize:12,fontFamily:EQ_FF,outline:'none',marginBottom:12,boxSizing:'border-box'}}/>
            {filteredTools.map(function(t){return (
              <div key={t.id} style={{background:'#fff',borderRadius:6,padding:'12px 16px',marginBottom:6,borderLeft:'3px solid '+(t.status==='working'?'#22c55e':'#ef4444')}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:6}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:14}}>{t.name}</div>
                    <div style={{fontSize:12,color:'#555',marginTop:2}}>SN: {t.serial} · ${t.cost} · Acquired: {t.acquired}</div>
                    {t.statusChangedAt&&<div style={{fontSize:10,color:'#888',marginTop:2}}>Status changed: {new Date(t.statusChangedAt).toLocaleString()} by {t.statusChangedBy}</div>}
                  </div>
                  <div style={{display:'flex',gap:4,alignItems:'center'}}>
                    <div onClick={function(){toggleToolStatus(t)}} style={{padding:'4px 12px',borderRadius:3,cursor:'pointer',fontSize:11,fontWeight:700,background:t.status==='working'?'#dcfce7':'#fee',color:t.status==='working'?'#16a34a':'#dc2626'}}>{t.status==='working'?'✓ Working':'✕ Broken'}</div>
                    <div onClick={function(){setToolForm(Object.assign({},t))}} style={{padding:'4px 10px',background:'#f0f0ec',borderRadius:3,cursor:'pointer',fontSize:10}}>Edit</div>
                  </div>
                </div>
              </div>
            )})}
            {filteredTools.length===0&&<div style={{background:'#fff',borderRadius:6,padding:20,color:'#aaa',textAlign:'center'}}>No tools</div>}
          </div>}

          {/* ═══ RECORDS ═══ */}
          {page==='records'&&<div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16,flexWrap:'wrap',gap:8}}>
              <div style={{fontSize:22,fontWeight:700,letterSpacing:2}}>RECORDS & LOGS</div>
              {selProj&&<div onClick={exportExcel} style={{padding:'8px 16px',background:EQ_GOLD,color:'#fff',borderRadius:4,cursor:'pointer',fontWeight:700,fontSize:12}}>📊 Export XLSX</div>}
            </div>
            {!selProj&&<div style={{color:'#888',textAlign:'center',padding:20}}>Select a project first</div>}
            {selProj&&<div>
              <div style={{fontSize:16,fontWeight:700,letterSpacing:1,marginBottom:8}}>EQUIPMENT LOG ({eqLog.length})</div>
              <div style={{background:'#fff',borderRadius:6,overflow:'hidden',marginBottom:20}}>
                {eqLog.slice().reverse().slice(0,30).map(function(l){return (
                  <div key={l.id} style={{padding:'8px 12px',borderBottom:'1px solid #f0f0ec',fontSize:12,display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:4}}>
                    <div><span style={{fontWeight:600}}>{l.action}</span> — {l.item}</div>
                    <div style={{color:'#888'}}>{l.user} · {new Date(l.date).toLocaleString()}</div>
                  </div>
                )})}
                {eqLog.length===0&&<div style={{padding:16,color:'#aaa',textAlign:'center'}}>No equipment logs</div>}
              </div>
              <div style={{fontSize:16,fontWeight:700,letterSpacing:1,marginBottom:8}}>TOOLING LOG ({toolLog.length})</div>
              <div style={{background:'#fff',borderRadius:6,overflow:'hidden'}}>
                {toolLog.slice().reverse().slice(0,30).map(function(l){return (
                  <div key={l.id} style={{padding:'8px 12px',borderBottom:'1px solid #f0f0ec',fontSize:12,display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:4}}>
                    <div><span style={{fontWeight:600}}>{l.action}</span> — {l.item}{l.serial?' ('+l.serial+')':''}</div>
                    <div style={{color:'#888'}}>{l.user} · {new Date(l.date).toLocaleString()}</div>
                  </div>
                )})}
                {toolLog.length===0&&<div style={{padding:16,color:'#aaa',textAlign:'center'}}>No tooling logs</div>}
              </div>
            </div>}
          </div>}

        </div>
        {mob&&<div style={{background:EQ_NAV,display:'flex',justifyContent:'space-around',padding:'8px 0',borderTop:'1px solid #222',flexShrink:0}}>
          {navItems.map(function(n){return (
            <div key={n.id} onClick={function(){setPage(n.id)}} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:1,cursor:'pointer',color:page===n.id?EQ_GOLD:'#888',fontSize:9}}><span style={{fontSize:16}}>{n.ico}</span>{n.label}</div>
          )})}
        </div>}
      </div>

      {/* Mobile drawer */}
      {mob&&drawer&&<div>
        <div onClick={function(){setDrawer(false)}} style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',zIndex:900}}/>
        <div style={{position:'fixed',top:0,left:0,bottom:0,width:260,zIndex:901,background:EQ_NAV}}>{sidebar}</div>
      </div>}

      {/* Equipment form modal */}
      {eqForm&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:7000,padding:16}}>
        <div style={{background:'#fff',borderRadius:10,padding:20,width:'95vw',maxWidth:460,maxHeight:'85vh',overflow:'auto',fontFamily:EQ_FF}} onClick={function(e){e.stopPropagation()}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:14}}>
            <div style={{fontSize:16,fontWeight:700}}>{equipment.find(function(e){return e.id===eqForm.id})?'Edit Equipment':'Add Equipment'}</div>
            <span onClick={function(){setEqForm(null)}} style={{cursor:'pointer',color:'#888',fontSize:18}}>✕</span>
          </div>
          <div style={{fontSize:10,letterSpacing:2,color:'#888',marginBottom:4}}>TYPE *</div>
          <select value={eqForm.type} onChange={function(e){setEqForm(Object.assign({},eqForm,{type:e.target.value}))}} style={IS}>
            {EQ_TYPES.map(function(t){return <option key={t} value={t}>{t}</option>})}
          </select>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            <div><div style={{fontSize:10,letterSpacing:2,color:'#888',marginBottom:4}}>QTY</div><input type="number" min="1" value={eqForm.qty} onChange={function(e){setEqForm(Object.assign({},eqForm,{qty:parseInt(e.target.value)||1}))}} style={IS}/></div>
            <div><div style={{fontSize:10,letterSpacing:2,color:'#888',marginBottom:4}}>PHONE *</div><input value={eqForm.phone} onChange={function(e){setEqForm(Object.assign({},eqForm,{phone:e.target.value}))}} placeholder="Rep phone" style={IS}/></div>
          </div>
          <div style={{fontSize:10,letterSpacing:2,color:'#888',marginBottom:4}}>RENTAL COMPANY *</div>
          <input value={eqForm.rental} onChange={function(e){setEqForm(Object.assign({},eqForm,{rental:e.target.value}))}} placeholder="Company name" style={IS}/>
          <div style={{fontSize:10,letterSpacing:2,color:'#888',marginBottom:4}}>REPRESENTATIVE *</div>
          <input value={eqForm.rep} onChange={function(e){setEqForm(Object.assign({},eqForm,{rep:e.target.value}))}} placeholder="Rep name" style={IS}/>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            <div><div style={{fontSize:10,letterSpacing:2,color:'#888',marginBottom:4}}>DAY IN</div><input type="date" value={eqForm.dayIn} onChange={function(e){setEqForm(Object.assign({},eqForm,{dayIn:e.target.value}))}} style={IS}/></div>
            <div><div style={{fontSize:10,letterSpacing:2,color:'#888',marginBottom:4}}>EST. DAY OUT</div><input type="date" value={eqForm.dayOut} onChange={function(e){setEqForm(Object.assign({},eqForm,{dayOut:e.target.value}))}} style={IS}/></div>
          </div>
          <div style={{fontSize:10,letterSpacing:2,color:'#888',marginBottom:4}}>NOTES</div>
          <textarea value={eqForm.notes||''} onChange={function(e){setEqForm(Object.assign({},eqForm,{notes:e.target.value}))}} rows={2} style={Object.assign({},IS,{resize:'vertical'})}/>
          <div style={{display:'flex',gap:8,marginTop:6}}>
            <div onClick={function(){if(!eqForm.rental||!eqForm.rep||!eqForm.phone){toast('Fill rental company, rep, and phone','error');return}saveEquip(eqForm)}} style={{flex:1,padding:12,background:EQ_GOLD,color:'#fff',borderRadius:4,textAlign:'center',cursor:'pointer',fontWeight:700,fontSize:14}}>SAVE</div>
            <div onClick={function(){setEqForm(null)}} style={{padding:'12px 16px',background:'#eee',borderRadius:4,cursor:'pointer',fontSize:13}}>Cancel</div>
          </div>
        </div>
      </div>}

      {/* Tool form modal */}
      {toolForm&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:7000,padding:16}}>
        <div style={{background:'#fff',borderRadius:10,padding:20,width:'95vw',maxWidth:420,fontFamily:EQ_FF}} onClick={function(e){e.stopPropagation()}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:14}}>
            <div style={{fontSize:16,fontWeight:700}}>{tools.find(function(t){return t.id===toolForm.id})?'Edit Tool':'Add Tool'}</div>
            <span onClick={function(){setToolForm(null)}} style={{cursor:'pointer',color:'#888',fontSize:18}}>✕</span>
          </div>
          <div style={{fontSize:10,letterSpacing:2,color:'#888',marginBottom:4}}>TOOL NAME *</div>
          <input value={toolForm.name} onChange={function(e){setToolForm(Object.assign({},toolForm,{name:e.target.value}))}} placeholder="e.g. Impact Driver" style={IS}/>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            <div><div style={{fontSize:10,letterSpacing:2,color:'#888',marginBottom:4}}>SERIAL NUMBER</div><input value={toolForm.serial} onChange={function(e){setToolForm(Object.assign({},toolForm,{serial:e.target.value}))}} style={IS}/></div>
            <div><div style={{fontSize:10,letterSpacing:2,color:'#888',marginBottom:4}}>COST ($)</div><input type="number" value={toolForm.cost} onChange={function(e){setToolForm(Object.assign({},toolForm,{cost:e.target.value}))}} style={IS}/></div>
          </div>
          <div style={{fontSize:10,letterSpacing:2,color:'#888',marginBottom:4}}>DATE ACQUIRED</div>
          <input type="date" value={toolForm.acquired} onChange={function(e){setToolForm(Object.assign({},toolForm,{acquired:e.target.value}))}} style={IS}/>
          <div style={{display:'flex',gap:8,marginTop:6}}>
            <div onClick={function(){if(!toolForm.name){toast('Enter tool name','error');return}saveTool(toolForm)}} style={{flex:1,padding:12,background:EQ_GOLD,color:'#fff',borderRadius:4,textAlign:'center',cursor:'pointer',fontWeight:700,fontSize:14}}>SAVE</div>
            <div onClick={function(){setToolForm(null)}} style={{padding:'12px 16px',background:'#eee',borderRadius:4,cursor:'pointer',fontSize:13}}>Cancel</div>
          </div>
        </div>
      </div>}

      {/* Toasts */}
      <div style={{position:'fixed',top:16,right:16,zIndex:9999,display:'flex',flexDirection:'column',gap:6}}>
        {toasts.map(function(t){return <div key={t.id} style={{background:t.type==='error'?'#dc2626':t.type==='warning'?'#d97706':'#16a34a',color:'#fff',padding:'10px 16px',borderRadius:6,fontFamily:EQ_FF,fontSize:13,boxShadow:'0 4px 16px rgba(0,0,0,.3)',minWidth:200}}>{t.msg}</div>})}
      </div>
    </div>
  )
}



// ═══════════════════════════════════════════════════════════════════════
//  CALCULATION ENGINE — faithfully recreates every Excel formula chain
// ═══════════════════════════════════════════════════════════════════════

function computeStaffingRate(baseRate, fringe, payrollTaxPct, hoursPerDay, wageType, pwMultiplier) {
  const std = 8, otMult = 1.5;
  const otHours = hoursPerDay > std ? hoursPerDay - std : 0;
  const payroll = baseRate * payrollTaxPct;
  if (wageType === "Prevailing Wage") {
    const pwRate = (baseRate + fringe) * pwMultiplier;
    return (pwRate * std) + (pwRate * otMult * otHours);
  }
  return ((baseRate + fringe + payroll) * std) + ((((baseRate + payroll) * otMult) + fringe) * otHours);
}

function computeAll(p) {
  const r = {};
  r.systemKW = p.systemSizeMW * 1000;
  r.systemWDC = p.systemSizeMW * 1000000;
  r.payrollTaxPct = p.ficaSS + p.medical + p.futa + p.suta + p.workersComp + p.umbrella + p.genLiability + p.payrollService;

  const roles = [
    { key: "admin", base: p.adminRate, fringe: 0 },
    { key: "generalLabor", base: p.generalLaborRate, fringe: p.generalLaborFringe },
    { key: "generalLaborApp", base: p.generalLaborRate, fringe: p.generalLaborFringe },
    { key: "telehandlerOp", base: p.telehandlerOpRate, fringe: p.telehandlerOpFringe },
    { key: "telehandlerOpApp", base: p.telehandlerOpRate, fringe: p.telehandlerOpFringe },
    { key: "pileDriverOp", base: p.pileDriverOpRate, fringe: p.pileDriverOpFringe },
    { key: "pileDriverOpApp", base: p.pileDriverOpRate, fringe: p.pileDriverOpFringe },
    { key: "skidSteerOp", base: p.skidSteerOpRate, fringe: p.skidSteerOpFringe },
    { key: "skidSteerOpApp", base: p.skidSteerOpRate, fringe: p.skidSteerOpFringe },
  ];
  roles.forEach(({ key, base, fringe }) => {
    r[`${key}DayRate`] = computeStaffingRate(base, fringe, r.payrollTaxPct, p.workHoursPerDay, p.wageType, p.pwMultiplier);
    r[`${key}HourlyRate`] = r[`${key}DayRate`] / p.workHoursPerDay;
  });

  const adjEff = p.fuelEfficiency;
  r.pileDriverFuelPerDay = p.pileDriverGalHr * p.workHoursPerDay * adjEff * p.dieselPerGallon;
  r.skidSteerFuelPerDay = p.skidSteerGalHr * p.workHoursPerDay * adjEff * p.dieselPerGallon;
  r.telehandlerFuelPerDay = p.telehandlerGalHr * p.workHoursPerDay * adjEff * p.dieselPerGallon;
  r.companyTruckFuelPerDay = p.companyTruckGalHr * p.workHoursPerDay * adjEff * p.dieselPerGallon;
  r.utvFuelPerDay = p.utvGalHr * p.workHoursPerDay * adjEff * p.dieselPerGallon;

  // PILE DRIVING
  r.totalPiles = p.rackingPiles + p.inverterPiles + p.cabPiles + p.combinerBoxPiles + p.loadBreakPiles;
  const minPerPile = p.estDriveTime + p.estTransitionTime;
  r.pileManhours = Math.ceil((minPerPile * r.totalPiles) / 60);
  r.pileAdjustedManhours = Math.round(r.pileManhours / p.pileEfficiency);
  r.pileDaysToComplete = Math.max(1, Math.ceil(Math.ceil(r.pileAdjustedManhours / p.numExcavators) / p.workHoursPerDay));
  r.pilesPerDayPerMachine = r.totalPiles / r.pileDaysToComplete;
  r.pileCalendarDays = Math.ceil(r.pileDaysToComplete * 7 / p.workdaysInWeek);
  r.pileTotalStaff = p.pileSkidSteerOps + p.pileGroundMan + p.pileAdditionalLaborers + p.numExcavators + Math.round(p.pileAdditionalLaborers * p.apprenticeReqPct);
  r.pileTotalManHours = r.pileTotalStaff * r.pileDaysToComplete * p.workHoursPerDay;
  const pileJourneymen = p.pileAdditionalLaborers + p.pileGroundMan - Math.floor((p.pileAdditionalLaborers + p.pileGroundMan) * p.apprenticeReqPct);
  const pileApprentices = Math.ceil((p.pileAdditionalLaborers + p.pileGroundMan) * p.apprenticeReqPct);
  r.pileLaborCost = (pileJourneymen * r.generalLaborDayRate * r.pileDaysToComplete) + (pileApprentices * r.generalLaborAppDayRate * r.pileDaysToComplete) + (p.numExcavators * r.pileDriverOpDayRate * r.pileDaysToComplete) + (p.pileSkidSteerOps * r.skidSteerOpDayRate * r.pileDaysToComplete);
  r.pilePerDiemCost = p.includeHotelPerDiem ? r.pileTotalStaff * p.perDiem * p.perDiemPct * r.pileCalendarDays : 0;
  r.pileEquipRental = (p.numExcavators * p.pileDriverEquipDaily * r.pileCalendarDays) + (p.pileSkidSteerOps * p.skidSteerEquipDaily * r.pileCalendarDays);
  r.pileFuelCost = (p.numExcavators * r.pileDriverFuelPerDay * r.pileDaysToComplete) + (p.pileSkidSteerOps * r.skidSteerFuelPerDay * r.pileDaysToComplete);
  r.pileScopeTotal = r.pileLaborCost + r.pilePerDiemCost + r.pileEquipRental + r.pileFuelCost;

  // RACKING
  r.linearFeetRacking = p.calculateByModules ? Math.ceil(((p.moduleWidth + 1) * p.moduleCount) / 12) : p.manualLinearFeet;
  r.rackingManhours = Math.ceil(r.linearFeetRacking / p.rackingLfPerHourPerMan);
  r.rackingAdjustedManhours = Math.ceil(r.rackingManhours / p.rackingEfficiency);
  r.rackingDaysToComplete = Math.max(1, Math.ceil(Math.ceil(r.rackingAdjustedManhours / p.rackingTotalWorkers) / p.workHoursPerDay));
  r.rackingCalendarDays = Math.ceil(r.rackingDaysToComplete * 7 / p.workdaysInWeek);
  r.rackingManHours = p.rackingTotalWorkers * r.rackingDaysToComplete * p.workHoursPerDay;
  r.rackingLaborCost = (p.rackingGeneralLabor * r.generalLaborDayRate * r.rackingDaysToComplete) + (p.rackingGeneralLaborApp * r.generalLaborAppDayRate * r.rackingDaysToComplete) + (p.rackingTelehandlerOps * r.telehandlerOpDayRate * r.rackingDaysToComplete) + (p.rackingSkidSteerOps * r.skidSteerOpDayRate * r.rackingDaysToComplete);
  r.rackingPerDiemCost = p.includeHotelPerDiem ? p.rackingTotalWorkers * p.perDiem * p.perDiemPct * r.rackingCalendarDays : 0;
  r.rackingEquipRental = (p.rackingSkidSteerOps * p.skidSteerEquipDaily * r.rackingCalendarDays) + (p.rackingTelehandlerOps * p.telehandlerEquipDaily * r.rackingCalendarDays) + (1 * p.companyTruckEquipDaily * r.rackingCalendarDays);
  r.rackingFuelCost = (p.rackingSkidSteerOps * r.skidSteerFuelPerDay * r.rackingDaysToComplete) + (p.rackingTelehandlerOps * r.telehandlerFuelPerDay * r.rackingDaysToComplete) + (1 * r.companyTruckFuelPerDay * r.rackingDaysToComplete);
  r.rackingScopeTotal = r.rackingLaborCost + r.rackingPerDiemCost + r.rackingEquipRental + r.rackingFuelCost;

  // MODULES
  r.moduleCount = p.moduleCount;
  r.moduleManhours = Math.ceil(r.moduleCount / p.modulesPerHourPerMan);
  r.moduleAdjustedManhours = Math.ceil(r.moduleManhours / p.moduleEfficiency);
  r.moduleDaysToComplete = Math.max(1, Math.ceil(Math.ceil(r.moduleAdjustedManhours / p.moduleTotalWorkers) / p.workHoursPerDay));
  r.moduleCalendarDays = Math.ceil(r.moduleDaysToComplete * 7 / p.workdaysInWeek);
  r.moduleManHours = p.moduleTotalWorkers * r.moduleDaysToComplete * p.workHoursPerDay;
  r.moduleLaborCost = (p.moduleGeneralLabor * r.generalLaborDayRate * r.moduleDaysToComplete) + (p.moduleGeneralLaborApp * r.generalLaborAppDayRate * r.moduleDaysToComplete) + (p.moduleSkidSteerOps * r.skidSteerOpDayRate * r.moduleDaysToComplete);
  r.modulePerDiemCost = p.includeHotelPerDiem ? p.moduleTotalWorkers * p.perDiem * p.perDiemPct * r.moduleCalendarDays : 0;
  r.moduleEquipRental = p.moduleSkidSteerOps * p.skidSteerEquipDaily * r.moduleCalendarDays;
  r.moduleFuelCost = p.moduleSkidSteerOps * r.skidSteerFuelPerDay * r.moduleDaysToComplete;
  r.moduleScopeTotal = r.moduleLaborCost + r.modulePerDiemCost + r.moduleEquipRental + r.moduleFuelCost;

  // QA/QC
  r.qcPileHours = Math.ceil(p.qcPileMultiplier * r.totalPiles);
  r.qcRackingHours = Math.ceil(p.qcRackMultiplier * r.linearFeetRacking);
  r.qcModuleHours = Math.ceil(p.qcModuleMultiplier * r.moduleCount);
  r.qcTotalHours = r.qcPileHours + r.qcRackingHours + r.qcModuleHours;
  r.qcWorkdays = Math.ceil(Math.ceil(r.qcTotalHours / p.qcNumMen) / p.workHoursPerDay);
  r.qcCalendarDays = Math.ceil(r.qcWorkdays * 7 / p.workdaysInWeek);
  r.qcManHours = p.qcNumMen * r.qcWorkdays * p.workHoursPerDay;
  const qcJourney = p.qcNumMen - p.qcApprentices;
  r.qcLaborCost = (qcJourney * r.generalLaborDayRate * r.qcWorkdays) + (p.qcApprentices * r.generalLaborDayRate * r.qcWorkdays);
  r.qcPerDiemCost = p.includeHotelPerDiem ? p.qcNumMen * p.perDiem * p.perDiemPct * r.qcCalendarDays : 0;
  r.qcScopeTotal = r.qcLaborCost + r.qcPerDiemCost;

  // MATERIAL HANDLING
  r.matHandlWorkDays = r.pileDaysToComplete + 3;
  r.matHandlCalendarDays = Math.ceil(r.matHandlWorkDays * 7 / p.workdaysInWeek);
  r.matHandlManHours = p.matHandlCrewSize * r.matHandlWorkDays * p.workHoursPerDay;
  r.matHandlLaborCost = (p.matHandlAdmin * r.adminDayRate * r.matHandlWorkDays) + (p.matHandlGeneralLabor * r.generalLaborHourlyRate * r.matHandlWorkDays * p.workHoursPerDay) + (p.matHandlTeleOps * r.telehandlerOpHourlyRate * r.matHandlWorkDays * p.workHoursPerDay) + (p.matHandlSkidOps * r.skidSteerOpHourlyRate * r.matHandlWorkDays * p.workHoursPerDay);
  r.matHandlPerDiemCost = p.includeHotelPerDiem ? p.matHandlCrewSize * p.perDiem * p.perDiemPct * r.matHandlCalendarDays : 0;
  r.matHandlEquipRental = (p.matHandlSkidOps * p.skidSteerEquipDaily * r.matHandlCalendarDays) + (p.matHandlTeleOps * p.telehandlerEquipDaily * r.matHandlCalendarDays);
  r.matHandlFuelCost = (p.matHandlSkidOps * r.skidSteerFuelPerDay * r.matHandlWorkDays) + (p.matHandlTeleOps * r.telehandlerFuelPerDay * r.matHandlWorkDays);
  r.matHandlScopeTotal = r.matHandlLaborCost + r.matHandlPerDiemCost + r.matHandlEquipRental + r.matHandlFuelCost;

  // SCHEDULE
  r.totalCalendarDays = r.pileCalendarDays + r.rackingCalendarDays + r.moduleCalendarDays + 6;
  r.totalWorkDays = r.pileDaysToComplete + r.rackingDaysToComplete + r.moduleDaysToComplete + 4;
  r.totalMonths = r.totalCalendarDays / 30.44;

  // GENERAL CONDITIONS
  r.totalManHoursAll = r.pileTotalManHours + r.rackingManHours + r.moduleManHours + r.qcManHours + r.matHandlManHours;
  r.cartsUtvCost = p.gcCartsRate * p.gcCartsQty * r.totalCalendarDays;
  r.cartsUtvFuelCost = r.utvFuelPerDay * p.gcCartsQty * r.totalWorkDays;
  r.maintenanceCost = p.gcMaintenanceRate * r.totalMonths;
  r.sanitaryCost = p.gcSanitaryRate * p.gcSanitaryQty * r.totalCalendarDays;
  r.safetyCost = p.gcSafetyRate * r.totalManHoursAll;
  r.siteOfficeCost = p.gcSiteOfficeRate * r.totalMonths;
  r.smallToolsCost = p.gcSmallToolsRate * r.totalManHoursAll;
  r.fuelDeliveryCost = p.gcFuelDeliveryRate;
  r.pileSurveyCost = p.gcPileSurveyRate * r.totalPiles;
  r.addlMobSurveyCost = p.gcAddlMobRate;
  r.twistBarsCost = p.gcTwistBarsRate * p.gcTwistBarsQty;
  r.payrollCost = p.gcPayrollRate * p.gcPayrollQty * r.totalWorkDays;
  r.gcTotalCost = r.cartsUtvCost + r.cartsUtvFuelCost + r.maintenanceCost + r.sanitaryCost + r.safetyCost + r.siteOfficeCost + r.smallToolsCost + r.fuelDeliveryCost + r.pileSurveyCost + r.addlMobSurveyCost + r.twistBarsCost + r.payrollCost;

  // MANAGEMENT
  const calcMgmt = (unburdened, qty, calDays, pctTime, isSalary, inclPD) => {
    if (qty === 0) return 0;
    const burdened = unburdened * p.mgmtBurdenMultiplier;
    const wDays = Math.ceil(calDays * pctTime);
    const hours = isSalary ? 8 : 8 + ((p.workHoursPerDay - 8) * 1.5);
    const pd = inclPD ? calDays * pctTime * p.mgmtPerDiem : 0;
    return (burdened * qty * wDays * hours) + pd;
  };
  r.mgmtSuperCost = calcMgmt(p.mgmtSuperRate, p.mgmtSuperQty, r.totalCalendarDays, p.mgmtPctOnSite, false, p.mgmtSuperPerDiem);
  r.mgmtForemanCost = calcMgmt(p.mgmtForemanRate, p.mgmtForemanQty, r.totalCalendarDays, p.mgmtPctOnSite, false, p.mgmtForemanPerDiem);
  r.mgmtSafetyCost = calcMgmt(p.mgmtSafetyRate, p.mgmtSafetyQty, r.totalCalendarDays, p.mgmtPctOnSite, false, p.mgmtSafetyPerDiem);
  r.mgmtTotalCost = r.mgmtSuperCost + r.mgmtForemanCost + r.mgmtSafetyCost;

  // MOBILIZATION
  r.mobCompanyTruckCost = p.mobCompanyTruckRate * p.mobCompanyTruckQty * (p.milesFromHQ / p.mobMPH);
  r.mobTrailerCost = p.mobTrailerRate * p.mobTrailerQty * (p.milesFromHQ * 2);
  r.mobRentalEquipCost = p.mobRentalEquipRate * p.mobRentalEquipQty * (p.mobExtraMobs + 1);
  r.mobLaborCost = r.generalLaborHourlyRate * (p.milesFromHQ / p.mobMPH);
  r.mobPerDiemCost = p.perDiem * 3;
  r.mobTotalCost = r.mobCompanyTruckCost + r.mobTrailerCost + r.mobRentalEquipCost + r.mobLaborCost + r.mobPerDiemCost;

  // WASTE
  r.wasteTotal = p.wasteDumpsterQty * p.wasteDumpsterEmptied * p.wasteDumpsterRate * 2;

  // FUEL TOTALS
  r.totalFuelCost = r.pileFuelCost + r.rackingFuelCost + r.moduleFuelCost + r.matHandlFuelCost + r.cartsUtvFuelCost;

  // ESTIMATE SUMMARY
  r.subtotalCost = r.gcTotalCost + r.mgmtTotalCost + r.mobTotalCost + r.wasteTotal + r.matHandlScopeTotal + r.pileScopeTotal + r.qcScopeTotal + r.rackingScopeTotal + r.moduleScopeTotal;
  r.contingencyAmt = r.subtotalCost * p.contingencyPct;
  r.subtotalWithContingency = r.subtotalCost + r.contingencyAmt;
  r.markupAmt = r.subtotalWithContingency * p.markupPct / (1 - p.markupPct);
  r.preBondTotal = r.subtotalWithContingency + r.markupAmt;
  r.bondAmt = r.preBondTotal * p.bondPct;
  r.postBondTotal = r.preBondTotal + r.bondAmt;
  r.dollarPerWatt = r.preBondTotal / r.systemWDC;
  r.dollarPerWattWithBond = r.postBondTotal / r.systemWDC;

  r.totalApprenticeHours = (pileApprentices * r.pileDaysToComplete * p.workHoursPerDay) + (p.rackingGeneralLaborApp * r.rackingDaysToComplete * p.workHoursPerDay) + (p.moduleGeneralLaborApp * r.moduleDaysToComplete * p.workHoursPerDay) + (p.qcApprentices * r.qcWorkdays * p.workHoursPerDay);
  r.apprenticePct = r.totalManHoursAll > 0 ? r.totalApprenticeHours / r.totalManHoursAll : 0;
  r.apprenticeMet = r.apprenticePct >= p.apprenticeReqPct;
  r.manHoursPerMW = r.totalManHoursAll / p.systemSizeMW;
  return r;
}

// ═══════════════════════════════════════════════════════════════════════
//  DEFAULT BID PARAMETERS
// ═══════════════════════════════════════════════════════════════════════

const DEFAULTS = {
  projectName: "", projectLocation: "", clientName: "", clientContact: "", bidDate: "",
  systemSizeMW: 5, milesFromHQ: 500, workdaysInWeek: 5, workHoursPerDay: 10,
  apprenticeReqPct: 0.15, perDiem: 125, perDiemPct: 1, wageType: "Union", pwMultiplier: 1,
  includeHotelPerDiem: true, status: "Draft",
  adminRate: 30, generalLaborRate: 25.20, generalLaborFringe: 9.85,
  telehandlerOpRate: 34.73, telehandlerOpFringe: 12.12,
  pileDriverOpRate: 38.61, pileDriverOpFringe: 12.18,
  skidSteerOpRate: 34.73, skidSteerOpFringe: 12.12,
  ficaSS: 0.062, medical: 0.0145, futa: 0.06, suta: 0.05,
  workersComp: 0.09, umbrella: 0.01, genLiability: 0.01, payrollService: 0.01,
  pileDriverEquipDaily: 734, skidSteerEquipDaily: 145, telehandlerEquipDaily: 175, companyTruckEquipDaily: 67,
  pileDriverGalHr: 2, skidSteerGalHr: 3.2, telehandlerGalHr: 1.5, companyTruckGalHr: 1.55, utvGalHr: 1,
  fuelEfficiency: 0.8, dieselPerGallon: 5.089,
  rackingPiles: 2000, inverterPiles: 0, cabPiles: 10, combinerBoxPiles: 20, loadBreakPiles: 0,
  estDriveTime: 3, estTransitionTime: 3, pileEfficiency: 1.1, numExcavators: 2,
  pileSkidSteerOps: 1, pileGroundMan: 2, pileAdditionalLaborers: 5,
  moduleCount: 10000, moduleWidth: 47.88, calculateByModules: true, manualLinearFeet: 40000,
  rackingLfPerHourPerMan: 17, rackingEfficiency: 1, rackingTotalWorkers: 20,
  rackingGeneralLabor: 8, rackingGeneralLaborApp: 7, rackingTelehandlerOps: 1, rackingSkidSteerOps: 4,
  modulesPerHourPerMan: 13, moduleEfficiency: 1, moduleTotalWorkers: 12,
  moduleGeneralLabor: 4, moduleGeneralLaborApp: 5, moduleSkidSteerOps: 3,
  qcPileMultiplier: 0.085, qcRackMultiplier: 0.009, qcModuleMultiplier: 0.008, qcNumMen: 3, qcApprentices: 1,
  matHandlCrewSize: 4, matHandlAdmin: 1, matHandlGeneralLabor: 1, matHandlTeleOps: 1, matHandlSkidOps: 1,
  gcCartsRate: 52, gcCartsQty: 5, gcMaintenanceRate: 2000, gcSanitaryRate: 4, gcSanitaryQty: 4,
  gcSafetyRate: 0.75, gcSiteOfficeRate: 2500, gcSmallToolsRate: 2.5,
  gcFuelDeliveryRate: 1000, gcPileSurveyRate: 6, gcAddlMobRate: 1000,
  gcTwistBarsRate: 200, gcTwistBarsQty: 2, gcPayrollRate: 137.5, gcPayrollQty: 6,
  mgmtBurdenMultiplier: 1.3, mgmtPerDiem: 135, mgmtPctOnSite: 0.89,
  mgmtSuperRate: 57.69, mgmtSuperQty: 1, mgmtSuperPerDiem: true,
  mgmtForemanRate: 54.68, mgmtForemanQty: 1, mgmtForemanPerDiem: true,
  mgmtSafetyRate: 30, mgmtSafetyQty: 1, mgmtSafetyPerDiem: true,
  mobMPH: 40, mobCompanyTruckRate: 6.7, mobCompanyTruckQty: 1,
  mobTrailerRate: 0.5, mobTrailerQty: 1, mobRentalEquipRate: 500, mobRentalEquipQty: 19, mobExtraMobs: 1,
  wasteDumpsterQty: 6, wasteDumpsterEmptied: 1, wasteDumpsterRate: 1000,
  contingencyPct: 0.03, markupPct: 0.20, bondPct: 0.02,
};

// ═══════════════════════════════════════════════════════════════════════
//  STORAGE HELPERS
// ═══════════════════════════════════════════════════════════════════════

async function loadProjects() {
  try {
    const res = await sGet("precon_bids");
    return res || [];
  } catch(e) { return []; }
}
async function saveProjects(projects) {
  try { await sSet("precon_bids", projects); } catch (e) { console.error(e); }
}

// ═══════════════════════════════════════════════════════════════════════
//  FORMATTERS
// ═══════════════════════════════════════════════════════════════════════
const bdFmt = v => "$" + Number(v||0).toLocaleString("en-US", {minimumFractionDigits:2, maximumFractionDigits:2});
const bdFmtK = v => {const n=Number(v||0); return n>=1000000?"$"+(n/1000000).toFixed(2)+"M":n>=1000?"$"+(n/1000).toFixed(1)+"K":bdFmt(n);};
const bdFmtN = (v,d=0) => Number(v||0).toLocaleString("en-US",{minimumFractionDigits:d,maximumFractionDigits:d});
const bdFmtPct = v => (Number(v||0)*100).toFixed(1)+"%";

// ═══════════════════════════════════════════════════════════════════════
//  MICRO-COMPONENTS
// ═══════════════════════════════════════════════════════════════════════

function Field({label,value,onChange,type="number",step,min,suffix,prefix,disabled,options,wide}) {
  if (options) return (
    <div className={`fld ${wide?"wide":""}`}><label>{label}</label>
      <select value={value} onChange={e=>onChange(e.target.value)}>{options.map(o=><option key={o} value={o}>{o}</option>)}</select>
    </div>
  );
  if (type==="checkbox") return (
    <div className="fld chk"><label><input type="checkbox" checked={value} onChange={e=>onChange(e.target.checked)} disabled={disabled}/><span>{label}</span></label></div>
  );
  return (
    <div className={`fld ${wide?"wide":""}`}><label>{label}</label>
      <div className="inp-w">
        {prefix&&<span className="fx">{prefix}</span>}
        <input type={type} value={value} onChange={e=>onChange(type==="number"?parseFloat(e.target.value)||0:e.target.value)} step={step||(type==="number"?"any":undefined)} min={min} disabled={disabled}/>
        {suffix&&<span className="fx">{suffix}</span>}
      </div>
    </div>
  );
}

function Row({label,value,sub,hl,warn}) {
  return <div className={`rrow${hl?" hl":""}${warn?" warn":""}${sub?" sub":""}`}><span className="rl">{label}</span><span className="rv">{value}</span></div>;
}

function Card({title,children,accent,className=""}) {
  return <div className={`card ${className}`} style={accent?{borderTopColor:accent}:{}}><h3>{title}</h3>{children}</div>;
}

// ═══════════════════════════════════════════════════════════════════════
//  STATUS CONFIG
// ═══════════════════════════════════════════════════════════════════════
const STATUSES = {
  "Draft":     {color:"#6b7a90",bg:"#161c28",icon:"✎"},
  "Submitted": {color:"#4a9eff",bg:"#0f1e35",icon:"↗"},
  "Awarded":   {color:"#4ae68a",bg:"#0f2a1c",icon:"✓"},
  "Lost":      {color:"#ff6b6b",bg:"#2a1010",icon:"✗"},
  "Revision":  {color:"#f5a623",bg:"#2a1f0a",icon:"⟳"},
};

// ═══════════════════════════════════════════════════════════════════════
//  BID EDITOR — full calculator
// ═══════════════════════════════════════════════════════════════════════
const BD_TABS = [
  {id:"overview",label:"Project"},
  {id:"rates",label:"Rates"},
  {id:"pile",label:"Piles"},
  {id:"racking",label:"Racking"},
  {id:"modules",label:"Modules"},
  {id:"qaqc",label:"QA/QC"},
  {id:"gc",label:"GC & Mgmt"},
  {id:"summary",label:"Summary"},
];

function BidEditor({project, onSave, onBack, onExit}) {
  const [params, setParams] = useState(project.params);
  const [tab, setTab] = useState("overview");
  const [dirty, setDirty] = useState(false);

  const set = useCallback((k,v)=>{setParams(p=>({...p,[k]:v}));setDirty(true);},[]);
  const r = useMemo(()=>computeAll(params),[params]);

  const handleSave = ()=>{
    onSave({...project, params, lastModified: Date.now(), totalPrice: r.preBondTotal, systemMW: params.systemSizeMW, dollarPerWatt: r.dollarPerWatt});
    setDirty(false);
  };

  return (
    <div className="editor">
      <div className="ed-top">
        <button className="btn-back" onClick={onBack}>← Projects</button>
        <div className="ed-title">
          <h2>{params.projectName || "Untitled Bid"}</h2>
          <span className="ed-mw">{params.systemSizeMW} MW DC</span>
        </div>
        <div className="ed-actions">
          <div className="ed-price">{bdFmt(r.preBondTotal)}</div>
          <button className={`btn-save ${dirty?"pulse":""}`} onClick={handleSave}>{dirty?"Save Changes":"Saved ✓"}</button>
        </div>
      </div>

      <div className="tabs">
        {BD_TABS.map(t=><button key={t.id} className={tab===t.id?"active":""} onClick={()=>setTab(t.id)}>{t.label}</button>)}
      </div>

      <div className="ed-body">
        {tab==="overview" && <>
          <div className="g2">
            <Card title="Project Details">
              <Field label="Project Name" value={params.projectName} onChange={v=>set("projectName",v)} type="text" wide/>
              <Field label="Project Location" value={params.projectLocation} onChange={v=>set("projectLocation",v)} type="text" wide/>
              <Field label="Client Name" value={params.clientName} onChange={v=>set("clientName",v)} type="text" wide/>
              <Field label="Client Contact" value={params.clientContact} onChange={v=>set("clientContact",v)} type="text" wide/>
              <Field label="Bid Date" value={params.bidDate} onChange={v=>set("bidDate",v)} type="date" wide/>
              <Field label="System Size" value={params.systemSizeMW} onChange={v=>set("systemSizeMW",v)} suffix="MW DC" step={0.01}/>
              <Field label="Miles from HQ" value={params.milesFromHQ} onChange={v=>set("milesFromHQ",v)} suffix="mi"/>
              <Field label="Status" value={params.status} onChange={v=>set("status",v)} options={Object.keys(STATUSES)}/>
            </Card>
            <Card title="Work Schedule & Labor">
              <Field label="Workdays / Week" value={params.workdaysInWeek} onChange={v=>set("workdaysInWeek",v)} min={1}/>
              <Field label="Hours / Day" value={params.workHoursPerDay} onChange={v=>set("workHoursPerDay",v)} min={1}/>
              <Field label="Wage Type" value={params.wageType} onChange={v=>set("wageType",v)} options={["Union","Prevailing Wage"]}/>
              <Field label="PW Multiplier" value={params.pwMultiplier} onChange={v=>set("pwMultiplier",v)} step={0.1}/>
              <Field label="Apprentice Req %" value={params.apprenticeReqPct} onChange={v=>set("apprenticeReqPct",v)} step={0.01}/>
              <Field label="Per Diem" value={params.perDiem} onChange={v=>set("perDiem",v)} prefix="$" suffix="/day"/>
              <Field label="Per Diem Distribution" value={params.perDiemPct} onChange={v=>set("perDiemPct",v)} step={0.01}/>
              <Field label="Include Hotel/Per Diem?" value={params.includeHotelPerDiem} onChange={v=>set("includeHotelPerDiem",v)} type="checkbox"/>
            </Card>
          </div>
          <Card title="Calculated Overview">
            <div className="g4">
              <div className="stat-box"><div className="stat-val">{bdFmtN(r.totalCalendarDays)}</div><div className="stat-lbl">Calendar Days</div></div>
              <div className="stat-box"><div className="stat-val">{bdFmtN(r.totalWorkDays)}</div><div className="stat-lbl">Work Days</div></div>
              <div className="stat-box"><div className="stat-val">{bdFmtN(r.totalManHoursAll)}</div><div className="stat-lbl">Man-Hours</div></div>
              <div className="stat-box"><div className="stat-val">{bdFmtN(r.manHoursPerMW,0)}</div><div className="stat-lbl">Man-Hr/MW</div></div>
              <div className="stat-box"><div className="stat-val">{bdFmtPct(r.apprenticePct)}</div><div className="stat-lbl">Apprentice %</div></div>
              <div className={`stat-box ${r.apprenticeMet?"met":"unmet"}`}><div className="stat-val">{r.apprenticeMet?"✓ MET":"✗ NOT MET"}</div><div className="stat-lbl">IRA Req</div></div>
            </div>
          </Card>
        </>}

        {tab==="rates" && <div className="g2">
          <Card title="Base Hourly Rates">
            <Field label="Admin" value={params.adminRate} onChange={v=>set("adminRate",v)} prefix="$" suffix="/hr"/>
            <Field label="General Labor" value={params.generalLaborRate} onChange={v=>set("generalLaborRate",v)} prefix="$" suffix="/hr"/>
            <Field label="GL Fringe" value={params.generalLaborFringe} onChange={v=>set("generalLaborFringe",v)} prefix="$" suffix="/hr"/>
            <Field label="Telehandler Op" value={params.telehandlerOpRate} onChange={v=>set("telehandlerOpRate",v)} prefix="$" suffix="/hr"/>
            <Field label="Tele Fringe" value={params.telehandlerOpFringe} onChange={v=>set("telehandlerOpFringe",v)} prefix="$" suffix="/hr"/>
            <Field label="Pile Driver Op" value={params.pileDriverOpRate} onChange={v=>set("pileDriverOpRate",v)} prefix="$" suffix="/hr"/>
            <Field label="PD Fringe" value={params.pileDriverOpFringe} onChange={v=>set("pileDriverOpFringe",v)} prefix="$" suffix="/hr"/>
            <Field label="Skid Steer Op" value={params.skidSteerOpRate} onChange={v=>set("skidSteerOpRate",v)} prefix="$" suffix="/hr"/>
            <Field label="Skid Fringe" value={params.skidSteerOpFringe} onChange={v=>set("skidSteerOpFringe",v)} prefix="$" suffix="/hr"/>
            <hr className="div"/>
            <Row label="Payroll Tax Total" value={bdFmtPct(r.payrollTaxPct)} hl/>
          </Card>
          <Card title="Computed Day Rates & Equipment">
            <Row label="Admin/day" value={bdFmt(r.adminDayRate)}/>
            <Row label="General Labor/day" value={bdFmt(r.generalLaborDayRate)}/>
            <Row label="Telehandler Op/day" value={bdFmt(r.telehandlerOpDayRate)}/>
            <Row label="Pile Driver Op/day" value={bdFmt(r.pileDriverOpDayRate)}/>
            <Row label="Skid Steer Op/day" value={bdFmt(r.skidSteerOpDayRate)}/>
            <hr className="div"/>
            <Field label="PD Equipment" value={params.pileDriverEquipDaily} onChange={v=>set("pileDriverEquipDaily",v)} prefix="$" suffix="/day"/>
            <Field label="Skid Steer" value={params.skidSteerEquipDaily} onChange={v=>set("skidSteerEquipDaily",v)} prefix="$" suffix="/day"/>
            <Field label="Telehandler" value={params.telehandlerEquipDaily} onChange={v=>set("telehandlerEquipDaily",v)} prefix="$" suffix="/day"/>
            <Field label="Company Truck" value={params.companyTruckEquipDaily} onChange={v=>set("companyTruckEquipDaily",v)} prefix="$" suffix="/day"/>
            <hr className="div"/>
            <Field label="Diesel $/gal" value={params.dieselPerGallon} onChange={v=>set("dieselPerGallon",v)} prefix="$"/>
            <Field label="Fuel Efficiency" value={params.fuelEfficiency} onChange={v=>set("fuelEfficiency",v)} step={0.05}/>
          </Card>
        </div>}

        {tab==="pile" && <div className="g2">
          <Card title="Pile Counts & Production">
            <Field label="Racking Piles" value={params.rackingPiles} onChange={v=>set("rackingPiles",v)}/>
            <Field label="Inverter Piles" value={params.inverterPiles} onChange={v=>set("inverterPiles",v)}/>
            <Field label="CAB Piles" value={params.cabPiles} onChange={v=>set("cabPiles",v)}/>
            <Field label="Combiner Box Piles" value={params.combinerBoxPiles} onChange={v=>set("combinerBoxPiles",v)}/>
            <Field label="Load Break Piles" value={params.loadBreakPiles} onChange={v=>set("loadBreakPiles",v)}/>
            <hr className="div"/>
            <Field label="Drive Time (min)" value={params.estDriveTime} onChange={v=>set("estDriveTime",v)}/>
            <Field label="Transition Time (min)" value={params.estTransitionTime} onChange={v=>set("estTransitionTime",v)}/>
            <Field label="Efficiency" value={params.pileEfficiency} onChange={v=>set("pileEfficiency",v)} step={0.1}/>
            <Field label="# Pile Drivers" value={params.numExcavators} onChange={v=>set("numExcavators",v)}/>
            <hr className="div"/>
            <Field label="Skid Steer Ops" value={params.pileSkidSteerOps} onChange={v=>set("pileSkidSteerOps",v)}/>
            <Field label="Ground Men" value={params.pileGroundMan} onChange={v=>set("pileGroundMan",v)}/>
            <Field label="Addl Laborers" value={params.pileAdditionalLaborers} onChange={v=>set("pileAdditionalLaborers",v)}/>
          </Card>
          <Card title="Pile Results">
            <Row label="Total Piles" value={bdFmtN(r.totalPiles)} hl/>
            <Row label="Manhours Needed" value={bdFmtN(r.pileManhours)}/>
            <Row label="Adjusted Manhours" value={bdFmtN(r.pileAdjustedManhours)}/>
            <Row label="Days to Complete" value={bdFmtN(r.pileDaysToComplete)}/>
            <Row label="Calendar Days" value={bdFmtN(r.pileCalendarDays)}/>
            <Row label="Piles/Day" value={bdFmtN(r.pilesPerDayPerMachine,1)}/>
            <hr className="div"/>
            <Row label="Labor" value={bdFmt(r.pileLaborCost)} sub/>
            <Row label="Per Diem" value={bdFmt(r.pilePerDiemCost)} sub/>
            <Row label="Equipment" value={bdFmt(r.pileEquipRental)} sub/>
            <Row label="Fuel" value={bdFmt(r.pileFuelCost)} sub/>
            <Row label="Pile Total" value={bdFmt(r.pileScopeTotal)} hl/>
            <Row label="$/Pile" value={bdFmt(r.pileScopeTotal/r.totalPiles)}/>
            <Row label="$/Wdc" value={"$"+(r.pileScopeTotal/r.systemWDC).toFixed(4)}/>
          </Card>
        </div>}

        {tab==="racking" && <div className="g2">
          <Card title="Racking Parameters">
            <Field label="Calculate by Modules?" value={params.calculateByModules} onChange={v=>set("calculateByModules",v)} type="checkbox"/>
            <Field label="Module Count" value={params.moduleCount} onChange={v=>set("moduleCount",v)}/>
            <Field label="Module Width (in)" value={params.moduleWidth} onChange={v=>set("moduleWidth",v)} step={0.01} suffix="in"/>
            {!params.calculateByModules&&<Field label="Manual LF" value={params.manualLinearFeet} onChange={v=>set("manualLinearFeet",v)}/>}
            <hr className="div"/>
            <Field label="LF/Hr/Man" value={params.rackingLfPerHourPerMan} onChange={v=>set("rackingLfPerHourPerMan",v)}/>
            <Field label="Efficiency" value={params.rackingEfficiency} onChange={v=>set("rackingEfficiency",v)} step={0.1}/>
            <Field label="Total Workers" value={params.rackingTotalWorkers} onChange={v=>set("rackingTotalWorkers",v)}/>
            <hr className="div"/>
            <Field label="GL Journeymen" value={params.rackingGeneralLabor} onChange={v=>set("rackingGeneralLabor",v)}/>
            <Field label="GL Apprentice" value={params.rackingGeneralLaborApp} onChange={v=>set("rackingGeneralLaborApp",v)}/>
            <Field label="Telehandler Ops" value={params.rackingTelehandlerOps} onChange={v=>set("rackingTelehandlerOps",v)}/>
            <Field label="Skid Steer Ops" value={params.rackingSkidSteerOps} onChange={v=>set("rackingSkidSteerOps",v)}/>
          </Card>
          <Card title="Racking Results">
            <Row label="Linear Feet" value={bdFmtN(r.linearFeetRacking)} hl/>
            <Row label="Manhours" value={bdFmtN(r.rackingManhours)}/>
            <Row label="Days to Complete" value={bdFmtN(r.rackingDaysToComplete)}/>
            <Row label="Calendar Days" value={bdFmtN(r.rackingCalendarDays)}/>
            <Row label="Man-Hours" value={bdFmtN(r.rackingManHours)}/>
            <Row label="LF/Day" value={bdFmtN(r.linearFeetRacking/r.rackingDaysToComplete,0)}/>
            <hr className="div"/>
            <Row label="Labor" value={bdFmt(r.rackingLaborCost)} sub/>
            <Row label="Per Diem" value={bdFmt(r.rackingPerDiemCost)} sub/>
            <Row label="Equipment" value={bdFmt(r.rackingEquipRental)} sub/>
            <Row label="Fuel" value={bdFmt(r.rackingFuelCost)} sub/>
            <Row label="Racking Total" value={bdFmt(r.rackingScopeTotal)} hl/>
            <Row label="$/LF" value={bdFmt(r.rackingScopeTotal/r.linearFeetRacking)}/>
            <Row label="$/Wdc" value={"$"+(r.rackingScopeTotal/r.systemWDC).toFixed(4)}/>
          </Card>
        </div>}

        {tab==="modules" && <div className="g2">
          <Card title="Module Parameters">
            <Row label="Module Count" value={bdFmtN(r.moduleCount)} hl/>
            <Field label="Modules/Hr/Man" value={params.modulesPerHourPerMan} onChange={v=>set("modulesPerHourPerMan",v)}/>
            <Field label="Efficiency" value={params.moduleEfficiency} onChange={v=>set("moduleEfficiency",v)} step={0.1}/>
            <Field label="Total Workers" value={params.moduleTotalWorkers} onChange={v=>set("moduleTotalWorkers",v)}/>
            <hr className="div"/>
            <Field label="GL Journeymen" value={params.moduleGeneralLabor} onChange={v=>set("moduleGeneralLabor",v)}/>
            <Field label="GL Apprentice" value={params.moduleGeneralLaborApp} onChange={v=>set("moduleGeneralLaborApp",v)}/>
            <Field label="Skid Steer Ops" value={params.moduleSkidSteerOps} onChange={v=>set("moduleSkidSteerOps",v)}/>
          </Card>
          <Card title="Module Results">
            <Row label="Manhours" value={bdFmtN(r.moduleManhours)}/>
            <Row label="Days to Complete" value={bdFmtN(r.moduleDaysToComplete)}/>
            <Row label="Calendar Days" value={bdFmtN(r.moduleCalendarDays)}/>
            <Row label="Man-Hours" value={bdFmtN(r.moduleManHours)}/>
            <Row label="Modules/Day" value={bdFmtN(r.moduleCount/r.moduleDaysToComplete,0)}/>
            <hr className="div"/>
            <Row label="Labor" value={bdFmt(r.moduleLaborCost)} sub/>
            <Row label="Per Diem" value={bdFmt(r.modulePerDiemCost)} sub/>
            <Row label="Equipment" value={bdFmt(r.moduleEquipRental)} sub/>
            <Row label="Fuel" value={bdFmt(r.moduleFuelCost)} sub/>
            <Row label="Module Total" value={bdFmt(r.moduleScopeTotal)} hl/>
            <Row label="$/Module" value={bdFmt(r.moduleScopeTotal/r.moduleCount)}/>
          </Card>
        </div>}

        {tab==="qaqc" && <div className="g2">
          <Card title="QA/QC Multipliers">
            <Field label="Pile Mult" value={params.qcPileMultiplier} onChange={v=>set("qcPileMultiplier",v)} step={0.001}/>
            <Field label="Rack Mult" value={params.qcRackMultiplier} onChange={v=>set("qcRackMultiplier",v)} step={0.001}/>
            <Field label="Module Mult" value={params.qcModuleMultiplier} onChange={v=>set("qcModuleMultiplier",v)} step={0.001}/>
            <Field label="QC Staff" value={params.qcNumMen} onChange={v=>set("qcNumMen",v)}/>
            <Field label="Apprentices" value={params.qcApprentices} onChange={v=>set("qcApprentices",v)}/>
          </Card>
          <Card title="QA/QC Results">
            <Row label="Pile QC Hrs" value={bdFmtN(r.qcPileHours)} sub/>
            <Row label="Rack QC Hrs" value={bdFmtN(r.qcRackingHours)} sub/>
            <Row label="Module QC Hrs" value={bdFmtN(r.qcModuleHours)} sub/>
            <Row label="Total QC Hours" value={bdFmtN(r.qcTotalHours)} hl/>
            <Row label="Work Days" value={bdFmtN(r.qcWorkdays)}/>
            <Row label="Man-Hours" value={bdFmtN(r.qcManHours)}/>
            <hr className="div"/>
            <Row label="Labor" value={bdFmt(r.qcLaborCost)} sub/>
            <Row label="Per Diem" value={bdFmt(r.qcPerDiemCost)} sub/>
            <Row label="QA/QC Total" value={bdFmt(r.qcScopeTotal)} hl/>
          </Card>
        </div>}

        {tab==="gc" && <>
          <div className="g2">
            <Card title="General Conditions">
              <Field label="Carts/UTV Rate" value={params.gcCartsRate} onChange={v=>set("gcCartsRate",v)} prefix="$" suffix="/day"/>
              <Field label="Carts Qty" value={params.gcCartsQty} onChange={v=>set("gcCartsQty",v)}/>
              <Field label="Maintenance $/mo" value={params.gcMaintenanceRate} onChange={v=>set("gcMaintenanceRate",v)} prefix="$"/>
              <Field label="Sanitary Rate" value={params.gcSanitaryRate} onChange={v=>set("gcSanitaryRate",v)} prefix="$"/>
              <Field label="Sanitary Qty" value={params.gcSanitaryQty} onChange={v=>set("gcSanitaryQty",v)}/>
              <Field label="Safety $/man-hr" value={params.gcSafetyRate} onChange={v=>set("gcSafetyRate",v)} prefix="$"/>
              <Field label="Site Office $/mo" value={params.gcSiteOfficeRate} onChange={v=>set("gcSiteOfficeRate",v)} prefix="$"/>
              <Field label="Small Tools $/hr" value={params.gcSmallToolsRate} onChange={v=>set("gcSmallToolsRate",v)} prefix="$"/>
              <Field label="Pile Survey $/pile" value={params.gcPileSurveyRate} onChange={v=>set("gcPileSurveyRate",v)} prefix="$"/>
              <Field label="Payroll $/person" value={params.gcPayrollRate} onChange={v=>set("gcPayrollRate",v)} prefix="$"/>
              <Field label="Payroll # ppl" value={params.gcPayrollQty} onChange={v=>set("gcPayrollQty",v)}/>
              <hr className="div"/>
              <Row label="GC Total" value={bdFmt(r.gcTotalCost)} hl/>
            </Card>
            <Card title="Management">
              <Field label="Burden Mult" value={params.mgmtBurdenMultiplier} onChange={v=>set("mgmtBurdenMultiplier",v)} step={0.1}/>
              <Field label="Mgmt Per Diem" value={params.mgmtPerDiem} onChange={v=>set("mgmtPerDiem",v)} prefix="$"/>
              <Field label="% On Site" value={params.mgmtPctOnSite} onChange={v=>set("mgmtPctOnSite",v)} step={0.01}/>
              <hr className="div"/>
              <Field label="Super Rate" value={params.mgmtSuperRate} onChange={v=>set("mgmtSuperRate",v)} prefix="$"/>
              <Field label="Super Qty" value={params.mgmtSuperQty} onChange={v=>set("mgmtSuperQty",v)}/>
              <Field label="Foreman Rate" value={params.mgmtForemanRate} onChange={v=>set("mgmtForemanRate",v)} prefix="$"/>
              <Field label="Foreman Qty" value={params.mgmtForemanQty} onChange={v=>set("mgmtForemanQty",v)}/>
              <Field label="Safety Rate" value={params.mgmtSafetyRate} onChange={v=>set("mgmtSafetyRate",v)} prefix="$"/>
              <Field label="Safety Qty" value={params.mgmtSafetyQty} onChange={v=>set("mgmtSafetyQty",v)}/>
              <hr className="div"/>
              <Row label="Mgmt Total" value={bdFmt(r.mgmtTotalCost)} hl/>
            </Card>
          </div>
          <div className="g2">
            <Card title="Mobilization">
              <Field label="Truck Rate" value={params.mobCompanyTruckRate} onChange={v=>set("mobCompanyTruckRate",v)} prefix="$" suffix="/mi"/>
              <Field label="Trailer Rate" value={params.mobTrailerRate} onChange={v=>set("mobTrailerRate",v)} prefix="$" suffix="/mi"/>
              <Field label="Rental Equip Rate" value={params.mobRentalEquipRate} onChange={v=>set("mobRentalEquipRate",v)} prefix="$"/>
              <Field label="Rental Equip Qty" value={params.mobRentalEquipQty} onChange={v=>set("mobRentalEquipQty",v)}/>
              <Field label="Extra Mobs" value={params.mobExtraMobs} onChange={v=>set("mobExtraMobs",v)}/>
              <Row label="Mob Total" value={bdFmt(r.mobTotalCost)} hl/>
            </Card>
            <Card title="Waste Management">
              <Field label="Dumpster Qty" value={params.wasteDumpsterQty} onChange={v=>set("wasteDumpsterQty",v)}/>
              <Field label="Emptied/Mo" value={params.wasteDumpsterEmptied} onChange={v=>set("wasteDumpsterEmptied",v)}/>
              <Field label="Rate" value={params.wasteDumpsterRate} onChange={v=>set("wasteDumpsterRate",v)} prefix="$"/>
              <Row label="Waste Total" value={bdFmt(r.wasteTotal)} hl/>
            </Card>
          </div>
        </>}

        {tab==="summary" && <>
          <div className="hero">
            <div className="hero-label">TOTAL BID PRICE</div>
            <div className="hero-big">{bdFmt(r.preBondTotal)}</div>
            <div className="hero-sub">{(r.dollarPerWatt*100).toFixed(2)}¢/Wdc &nbsp;·&nbsp; {params.systemSizeMW} MW DC</div>
            <div className="hero-bond">With {bdFmtPct(params.bondPct)} Bond: <strong>{bdFmt(r.postBondTotal)}</strong> ({(r.dollarPerWattWithBond*100).toFixed(2)}¢/Wdc)</div>
            {(()=>{
              const sc=[
                {l:"Piles",v:r.pileScopeTotal,c:"#4a7cff"},{l:"Racking",v:r.rackingScopeTotal,c:"#4ae68a"},
                {l:"Modules",v:r.moduleScopeTotal,c:"#f5a623"},{l:"QA/QC",v:r.qcScopeTotal,c:"#e04a7a"},
                {l:"Mat Handl",v:r.matHandlScopeTotal,c:"#9b59b6"},{l:"GC",v:r.gcTotalCost,c:"#3498db"},
                {l:"Mgmt",v:r.mgmtTotalCost,c:"#1abc9c"},{l:"Mob",v:r.mobTotalCost,c:"#e67e22"},
                {l:"Waste",v:r.wasteTotal,c:"#95a5a6"},
              ];
              const tot=sc.reduce((s,x)=>s+x.v,0);
              return <>
                <div className="scope-bar">{sc.map(s=><div key={s.l} style={{width:`${(s.v/tot)*100}%`,background:s.c}}/>)}</div>
                <div className="scope-leg">{sc.map(s=><span key={s.l}><i style={{background:s.c}}/>{s.l} {bdFmtPct(s.v/tot)}</span>)}</div>
              </>;
            })()}
          </div>
          <div className="g2">
            <Card title="Cost Breakdown">
              <Row label="General Conditions" value={bdFmt(r.gcTotalCost)}/>
              <Row label="Management" value={bdFmt(r.mgmtTotalCost)}/>
              <Row label="Mobilization" value={bdFmt(r.mobTotalCost)}/>
              <Row label="Waste Management" value={bdFmt(r.wasteTotal)}/>
              <Row label="Material Handling" value={bdFmt(r.matHandlScopeTotal)}/>
              <Row label="Pile Driving" value={bdFmt(r.pileScopeTotal)}/>
              <Row label="QA/QC" value={bdFmt(r.qcScopeTotal)}/>
              <Row label="Racking" value={bdFmt(r.rackingScopeTotal)}/>
              <Row label="Modules" value={bdFmt(r.moduleScopeTotal)}/>
              <hr className="div"/>
              <Row label="Subtotal" value={bdFmt(r.subtotalCost)} hl/>
            </Card>
            <Card title="Financials">
              <Field label="Contingency %" value={params.contingencyPct} onChange={v=>set("contingencyPct",v)} step={0.01}/>
              <Row label="Contingency" value={bdFmt(r.contingencyAmt)} sub/>
              <Row label="Sub + Contingency" value={bdFmt(r.subtotalWithContingency)}/>
              <hr className="div"/>
              <Field label="Markup %" value={params.markupPct} onChange={v=>set("markupPct",v)} step={0.01}/>
              <Row label="Markup" value={bdFmt(r.markupAmt)} sub/>
              <Row label="Pre-Bond Total" value={bdFmt(r.preBondTotal)} hl/>
              <hr className="div"/>
              <Field label="Bond %" value={params.bondPct} onChange={v=>set("bondPct",v)} step={0.01}/>
              <Row label="Bond" value={bdFmt(r.bondAmt)} sub/>
              <Row label="Post-Bond Total" value={bdFmt(r.postBondTotal)} hl/>
              <hr className="div"/>
              <Row label="$/Wdc Pre-Bond" value={"$"+r.dollarPerWatt.toFixed(4)}/>
              <Row label="$/Wdc Post-Bond" value={"$"+r.dollarPerWattWithBond.toFixed(4)}/>
              <Row label="Total Fuel Cost" value={bdFmt(r.totalFuelCost)}/>
            </Card>
          </div>
        </>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  DASHBOARD
// ═══════════════════════════════════════════════════════════════════════

function Dashboard({projects, onOpen, onCreate, onDuplicate, onDelete, onExit}) {
  const totals = useMemo(()=>{
    let totalVal=0,totalMW=0,awarded=0,active=0;
    projects.forEach(p=>{
      const r=computeAll(p.params);
      totalVal+=r.preBondTotal; totalMW+=p.params.systemSizeMW;
      if(p.params.status==="Awarded")awarded++;
      if(p.params.status!=="Lost")active++;
    });
    return {totalVal,totalMW,awarded,active,total:projects.length};
  },[projects]);

  return (
    <div className="dash">
      <div className="dash-head">
        <div>
          <h1>⚡ Mechanical Bid Dashboard</h1>
          <p className="dash-sub">Solar construction bid management</p>
        </div>
        <button className="btn-new" onClick={onCreate}>+ New Bid</button>
      </div>

      {projects.length > 0 && (
        <div className="dash-stats">
          <div className="ds"><div className="ds-v">{totals.total}</div><div className="ds-l">Total Bids</div></div>
          <div className="ds"><div className="ds-v">{totals.active}</div><div className="ds-l">Active</div></div>
          <div className="ds"><div className="ds-v">{totals.awarded}</div><div className="ds-l">Awarded</div></div>
          <div className="ds"><div className="ds-v">{bdFmtN(totals.totalMW,1)} MW</div><div className="ds-l">Total Capacity</div></div>
          <div className="ds accent"><div className="ds-v">{bdFmtK(totals.totalVal)}</div><div className="ds-l">Pipeline Value</div></div>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">⚡</div>
          <h2>No bids yet</h2>
          <p>Create your first mechanical bid to get started.</p>
          <button className="btn-new lg" onClick={onCreate}>+ Create First Bid</button>
        </div>
      ) : (
        <div className="proj-grid">
          {projects.sort((a,b)=>(b.lastModified||0)-(a.lastModified||0)).map(proj=>{
            const r = computeAll(proj.params);
            const st = STATUSES[proj.params.status]||STATUSES.Draft;
            return (
              <div className="proj-card" key={proj.id} onClick={()=>onOpen(proj.id)}>
                <div className="pc-top">
                  <div className="pc-status" style={{color:st.color,background:st.bg}}>{st.icon} {proj.params.status}</div>
                  <div className="pc-actions" onClick={e=>e.stopPropagation()}>
                    <button title="Duplicate" onClick={()=>onDuplicate(proj.id)}>⧉</button>
                    <button title="Delete" className="del" onClick={()=>onDelete(proj.id)}>✕</button>
                  </div>
                </div>
                <h3 className="pc-name">{proj.params.projectName||"Untitled"}</h3>
                <div className="pc-loc">{proj.params.projectLocation||"No location"}</div>
                <div className="pc-client">{proj.params.clientName||"No client"}</div>
                <div className="pc-metrics">
                  <div><span className="pc-mv">{proj.params.systemSizeMW}</span><span className="pc-ml">MW</span></div>
                  <div><span className="pc-mv">{bdFmtN(r.totalPiles)}</span><span className="pc-ml">Piles</span></div>
                  <div><span className="pc-mv">{bdFmtN(r.totalWorkDays)}</span><span className="pc-ml">Days</span></div>
                </div>
                <div className="pc-price">{bdFmt(r.preBondTotal)}</div>
                <div className="pc-watt">{(r.dollarPerWatt*100).toFixed(2)}¢/Wdc</div>
                {proj.lastModified && <div className="pc-date">Updated {new Date(proj.lastModified).toLocaleDateString()}</div>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════════════════

function PreConControls({onExit, portalUser}){
  const [projects, setProjects] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(()=>{loadProjects().then(p=>{setProjects(p);setLoading(false);});},[]);
  useEffect(()=>{if(!loading)saveProjects(projects);},[projects,loading]);

  const createProject = ()=>{
    const id = "bid_"+Date.now()+"_"+Math.random().toString(36).slice(2,6);
    const newP = {id, params:{...DEFAULTS, projectName:"New Bid "+(projects.length+1), bidDate:new Date().toISOString().split("T")[0]}, lastModified:Date.now(), totalPrice:0};
    setProjects(p=>[...p,newP]);
    setActiveId(id);
  };

  const saveProject = (updated)=>{
    setProjects(ps=>ps.map(p=>p.id===updated.id?updated:p));
  };

  const duplicateProject = (id)=>{
    const src = projects.find(p=>p.id===id);
    if(!src)return;
    const newId = "bid_"+Date.now()+"_"+Math.random().toString(36).slice(2,6);
    const dup = {...src, id:newId, params:{...src.params, projectName:src.params.projectName+" (Copy)", status:"Draft"}, lastModified:Date.now()};
    setProjects(p=>[...p,dup]);
  };

  const deleteProject = (id)=>{
    setProjects(ps=>ps.filter(p=>p.id!==id));
    setConfirmDelete(null);
    if(activeId===id) setActiveId(null);
  };

  const activeProject = projects.find(p=>p.id===activeId);

  if(loading) return <div className="app" style={{position:"fixed",inset:0,zIndex:2000}}><div className="loading">Loading bids…</div></div>;

  return (
    <div className="app" style={{position:"fixed",inset:0,zIndex:2000,overflow:"auto"}}>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
.app{font-family:'Agency FB','Arial Narrow',sans-serif;background:#f5f4f0;color:#333;min-height:100vh;}
.loading{display:flex;align-items:center;justify-content:center;height:100vh;font-size:16px;color:#888;}

/* DASHBOARD */
.dash{max-width:1200px;margin:0 auto;padding:20px;}
.dash-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;flex-wrap:wrap;gap:12px;}
.dash-head h1{font-size:24px;font-weight:700;color:#1a1a1a;letter-spacing:2px;text-transform:uppercase;}
.dash-sub{font-size:13px;color:#888;margin-top:2px;letter-spacing:1px;}
.btn-new{font-family:'Agency FB','Arial Narrow',sans-serif;font-size:14px;font-weight:700;padding:10px 20px;border:none;border-radius:4px;background:#c41e2e;color:#fff;cursor:pointer;transition:all .2s;letter-spacing:1px;text-transform:uppercase;}
.btn-new:hover{background:#a01020;box-shadow:0 4px 16px rgba(196,30,46,.25);}
.btn-new.lg{padding:14px 32px;font-size:16px;}

.dash-stats{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:24px;}
@media(max-width:700px){.dash-stats{grid-template-columns:repeat(3,1fr);}}
.ds{background:#fff;border:1px solid #e8e6e0;border-radius:8px;padding:14px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.04);}
.ds.accent{border-color:#d4a820;background:#fffdf5;}
.ds-v{font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:700;color:#1a1a1a;}
.ds.accent .ds-v{color:#c41e2e;}
.ds-l{font-size:11px;color:#888;margin-top:2px;text-transform:uppercase;letter-spacing:1px;}

.empty-state{text-align:center;padding:80px 20px;}
.empty-icon{font-size:48px;margin-bottom:16px;}
.empty-state h2{font-size:20px;color:#1a1a1a;margin-bottom:6px;}
.empty-state p{color:#888;margin-bottom:20px;}

.proj-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px;}
.proj-card{background:#fff;border:1px solid #e8e6e0;border-radius:10px;padding:18px;cursor:pointer;transition:all .2s;position:relative;box-shadow:0 1px 3px rgba(0,0,0,.04);}
.proj-card:hover{border-color:#d4a820;transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.08);}
.pc-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}
.pc-status{font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:1px;}
.pc-actions{display:flex;gap:4px;}
.pc-actions button{font-size:14px;background:transparent;border:1px solid #e8e6e0;color:#aaa;width:28px;height:28px;border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;}
.pc-actions button:hover{border-color:#d4a820;color:#c41e2e;}
.pc-actions button.del:hover{border-color:#c41e2e;color:#c41e2e;}
.pc-name{font-size:17px;font-weight:700;color:#1a1a1a;margin-bottom:3px;letter-spacing:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.pc-loc{font-size:12px;color:#888;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.pc-client{font-size:12px;color:#aaa;margin-bottom:12px;}
.pc-metrics{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:12px;}
.pc-mv{font-family:'JetBrains Mono',monospace;font-size:15px;font-weight:600;color:#333;}
.pc-ml{font-size:10px;color:#aaa;margin-left:4px;text-transform:uppercase;}
.pc-price{font-family:'JetBrains Mono',monospace;font-size:20px;font-weight:700;color:#c41e2e;}
.pc-watt{font-family:'JetBrains Mono',monospace;font-size:12px;color:#d4a820;margin-top:2px;}
.pc-date{font-size:11px;color:#ccc;margin-top:8px;}

/* CONFIRM MODAL */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:999;display:flex;align-items:center;justify-content:center;padding:20px;}
.modal{background:#fff;border:1px solid #e8e6e0;border-radius:12px;padding:28px;max-width:380px;width:100%;text-align:center;box-shadow:0 12px 40px rgba(0,0,0,.15);}
.modal h3{font-size:17px;color:#1a1a1a;margin-bottom:8px;letter-spacing:1px;}
.modal p{font-size:13px;color:#888;margin-bottom:20px;}
.modal-btns{display:flex;gap:10px;justify-content:center;}
.modal-btns button{font-family:'Agency FB','Arial Narrow',sans-serif;font-size:14px;font-weight:700;padding:9px 20px;border:none;border-radius:6px;cursor:pointer;letter-spacing:1px;}
.btn-cancel{background:#f0ede8;color:#666;}
.btn-danger{background:#c41e2e;color:#fff;}
.btn-danger:hover{background:#a01020;}
.btn-exit{font-family:'Agency FB','Arial Narrow',sans-serif;font-size:12px;font-weight:600;padding:7px 14px;border:1px solid #e0d0d0;border-radius:6px;background:transparent;color:#c41e2e;cursor:pointer;transition:all .15s;white-space:nowrap;}
.btn-exit:hover{border-color:#c41e2e;background:#fef5f5;}

/* EDITOR */
.editor{min-height:100vh;}
.ed-top{display:flex;align-items:center;gap:16px;padding:12px 20px;background:#fff;border-bottom:1px solid #e8e6e0;position:sticky;top:0;z-index:100;flex-wrap:wrap;box-shadow:0 1px 3px rgba(0,0,0,.04);}
.btn-back{font-family:'Agency FB','Arial Narrow',sans-serif;font-size:13px;font-weight:600;padding:7px 14px;border:1px solid #e8e6e0;border-radius:6px;background:transparent;color:#888;cursor:pointer;transition:all .15s;white-space:nowrap;}
.btn-back:hover{border-color:#d4a820;color:#1a1a1a;}
.ed-title{flex:1;min-width:120px;}
.ed-title h2{font-size:17px;font-weight:700;color:#1a1a1a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:1px;}
.ed-mw{font-family:'JetBrains Mono',monospace;font-size:12px;color:#888;}
.ed-actions{display:flex;align-items:center;gap:12px;}
.ed-price{font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:700;color:#c41e2e;}
.btn-save{font-family:'Agency FB','Arial Narrow',sans-serif;font-size:13px;font-weight:700;padding:8px 16px;border:none;border-radius:6px;background:#f0ede8;color:#888;cursor:pointer;transition:all .15s;white-space:nowrap;letter-spacing:1px;}
.btn-save.pulse{background:#c41e2e;color:#fff;animation:pulse-glow 2s infinite;}
@keyframes pulse-glow{0%,100%{box-shadow:0 0 0 rgba(196,30,46,0);}50%{box-shadow:0 0 12px rgba(196,30,46,.35);}}

.tabs{display:flex;gap:2px;padding:6px 14px;background:#faf9f6;overflow-x:auto;border-bottom:1px solid #e8e6e0;-ms-overflow-style:none;scrollbar-width:none;}
.tabs::-webkit-scrollbar{display:none;}
.tabs button{font-family:'Agency FB','Arial Narrow',sans-serif;font-size:13px;font-weight:600;padding:8px 14px;border:none;border-radius:6px;background:transparent;color:#aaa;cursor:pointer;white-space:nowrap;transition:all .15s;letter-spacing:1px;}
.tabs button:hover{color:#666;background:#f0ede8;}
.tabs button.active{color:#1a1a1a;background:#fff;box-shadow:inset 0 -2px 0 #c41e2e;}

.ed-body{padding:16px;max-width:1100px;margin:0 auto;}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.g4{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;}
@media(max-width:700px){.g2,.g4{grid-template-columns:1fr;}.g4{grid-template-columns:repeat(3,1fr);}}

.card{background:#fff;border:1px solid #e8e6e0;border-top:3px solid #d4a820;border-radius:8px;padding:16px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,.03);}
.card h3{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#d4a820;margin-bottom:12px;}

.stat-box{background:#faf9f6;border:1px solid #e8e6e0;border-radius:8px;padding:10px;text-align:center;}
.stat-box.met{border-color:#2a8a3a;background:#f0faf2;}.stat-box.met .stat-val{color:#1a7a2e;}
.stat-box.unmet{border-color:#c41e2e;background:#fef5f5;}.stat-box.unmet .stat-val{color:#c41e2e;}
.stat-val{font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:700;color:#1a1a1a;}
.stat-lbl{font-size:10px;color:#aaa;text-transform:uppercase;letter-spacing:1px;margin-top:2px;}

.fld{margin-bottom:8px;}
.fld label{display:block;font-size:12px;font-weight:600;color:#888;margin-bottom:2px;letter-spacing:.5px;}
.fld.chk label{display:flex;align-items:center;gap:7px;cursor:pointer;font-size:13px;color:#555;}
.fld.chk input[type=checkbox]{width:15px;height:15px;accent-color:#c41e2e;}
.inp-w{display:flex;align-items:center;background:#faf9f6;border:1px solid #e0ddd6;border-radius:6px;overflow:hidden;transition:border .15s;}
.inp-w:focus-within{border-color:#d4a820;}
.inp-w .fx{font-size:11px;color:#bbb;padding:0 7px;font-family:'JetBrains Mono',monospace;}
.inp-w input,select{font-family:'Agency FB','Arial Narrow',sans-serif;font-size:14px;color:#333;background:transparent;border:none;outline:none;padding:7px 9px;width:100%;}
select{background:#faf9f6;border:1px solid #e0ddd6;border-radius:6px;padding:7px 9px;font-family:'Agency FB','Arial Narrow',sans-serif;font-size:14px;color:#333;}
input[type=number]::-webkit-inner-spin-button{opacity:.3;}
input[type=date]{color:#333;}
input[type=date]::-webkit-calendar-picker-indicator{filter:none;}

.rrow{display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid #f0ede8;font-size:14px;}
.rrow.sub{padding-left:12px;}.rrow.sub .rl{color:#ccc;font-size:13px;}
.rrow .rl{color:#888;}.rrow .rv{font-family:'JetBrains Mono',monospace;font-weight:600;color:#444;font-size:13px;}
.rrow.hl{background:#fffdf5;border-radius:6px;padding:7px 10px;margin:3px -10px;border:1px solid #f0e8d0;}.rrow.hl .rl{color:#1a1a1a;font-weight:700;}.rrow.hl .rv{color:#c41e2e;font-size:14px;}
.rrow.warn .rv{color:#d4a820;}
.div{border:none;border-top:1px solid #f0ede8;margin:10px 0;}

.hero{background:#fff;border:1px solid #e8e6e0;border-radius:12px;padding:28px;text-align:center;margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,.04);}
.hero-label{font-size:11px;color:#d4a820;text-transform:uppercase;letter-spacing:2px;font-weight:700;}
.hero-big{font-family:'JetBrains Mono',monospace;font-size:34px;font-weight:700;color:#c41e2e;margin:4px 0;}
.hero-sub{font-family:'JetBrains Mono',monospace;font-size:14px;color:#d4a820;margin:2px 0;}
.hero-bond{font-size:12px;color:#aaa;margin-top:10px;}
.hero-bond strong{color:#c41e2e;}

.scope-bar{display:flex;gap:2px;height:8px;border-radius:4px;overflow:hidden;margin:14px 0 6px;}
.scope-bar div{min-width:3px;transition:width .3s;}
.scope-leg{display:flex;flex-wrap:wrap;gap:6px 10px;justify-content:center;}
.scope-leg span{font-size:10px;color:#888;display:flex;align-items:center;gap:4px;}
.scope-leg i{width:7px;height:7px;border-radius:2px;display:inline-block;}
      `}</style>

      {confirmDelete && (
        <div className="modal-overlay" onClick={()=>setConfirmDelete(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>Delete this bid?</h3>
            <p>This action cannot be undone. The bid and all its data will be permanently removed.</p>
            <div className="modal-btns">
              <button className="btn-cancel" onClick={()=>setConfirmDelete(null)}>Cancel</button>
              <button className="btn-danger" onClick={()=>deleteProject(confirmDelete)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {activeProject ? (
        <BidEditor
          project={activeProject}
          onSave={saveProject}
          onBack={()=>setActiveId(null)}
          onExit={onExit}
        />
      ) : (
        <Dashboard
          projects={projects}
          onOpen={setActiveId}
          onCreate={createProject}
          onDuplicate={duplicateProject}
          onDelete={id=>setConfirmDelete(id)}
          onExit={onExit}
        />
      )}
    </div>
  );
}

export default function App(){
  const[loading,setLoading]=useState(true)
  const[phase,setPhase]=useState(0)
  const[prog,setProg]=useState(0)
  const[scrollY,setScrollY]=useState(0)
  const[totalH,setTotalH]=useState(4000)
  const[mob,setMob]=useState(typeof window!=='undefined'?window.innerWidth<768:false)
  const[page,setPage]=useState('landing')
  const[user,setUser]=useState(null)
  const[loginErr,setLoginErr]=useState('')
  const[loginUser,setLoginUser]=useState('')
  const[loginPass,setLoginPass]=useState('')
  const[careerForm,setCareerForm]=useState({name:'',email:'',phone:'',position:'',experience:'',message:''})
  const[careerSubmitted,setCareerSubmitted]=useState(false)
  const[loginEmail,setLoginEmail]=useState('')
  const[portalUsers,setPortalUsers]=useState([])
  const[invites,setInvites]=useState([])
  const[accessReqs,setAccessReqs]=useState([])
  const[siteSettings,setSiteSettings]=useState({heroTitle:'WE DOMINATE SOLAR',heroSub:'The technical powerhouse delivering dominance, precision, and efficiency for the nation\'s largest utility-scale projects.',contactEmail:'Kaleb.LeBaron@sunriseconstructionco.com',contactPhone:'+1 (619) 870-4491',contactAddr:'12856 N Hwy 183 Ste B PMB 2011 Austin TX 78750',portalTitle:'EMPLOYEE PORTAL'})
  const[adminTab,setAdminTab2]=useState('invite')
  const[invForm,setInvForm]=useState({name:'',email:'',role:'member',tools:['field','equipment','hr','precon','compliance','hse','stakeholders']})
  const[reqReason,setReqReason]=useState('')
  const[reqTool,setReqTool]=useState('')

  function pHash(s){var h=5381;for(var i=0;i<s.length;i++){h=((h<<5)+h)+s.charCodeAt(i);h=h&h}return Math.abs(h).toString(36)}

  useEffect(function(){sGet('portal_users').then(function(u){
    if(!u||u.length===0){
      var admin={id:uid(),name:'Dustin Hanson',email:'dustin.hanson@sunriseconstructionco.com',role:'admin',tools:['field','equipment','hr','precon','compliance','hse','stakeholders','admin'],passwordHash:pHash('admin123'),createdAt:new Date().toISOString()}
      setPortalUsers([admin]);sSet('portal_users',[admin])
    }else{setPortalUsers(u)}
  });sGet('portal_invites').then(function(i){setInvites(i||[])});sGet('portal_requests').then(function(r){setAccessReqs(r||[])});
    // Check for invite token in URL
    try{var params=new URLSearchParams(window.location.search);var invToken=params.get('invite');if(invToken){setPage('login');setLoginErr('You have an invitation! Set a password below to create your account.');window._pendingInvite=invToken}}catch(e3){}sGet('portal_site').then(function(s){if(s)setSiteSettings(function(prev){return Object.assign({},prev,s)})})
  },[])

  function svPU(u){setPortalUsers(u);sSet('portal_users',u)}
  function svInv(i){setInvites(i);sSet('portal_invites',i)}
  function svReqs(r){setAccessReqs(r);sSet('portal_requests',r)}
  function svSite(s){setSiteSettings(s);sSet('portal_site',s)}

  function doPortalLogin(){
    setLoginErr('')
    if(!loginEmail.trim()||!loginPass.trim()){setLoginErr('Enter email and password');return}
    if(loginEmail.indexOf('@sunriseconstructionco.com')<0){setLoginErr('Only @sunriseconstructionco.com emails allowed');return}
    var u=portalUsers.find(function(x){return x.email===loginEmail&&x.passwordHash===pHash(loginPass)})
    if(!u){setLoginErr('Invalid credentials or no account. Contact admin for invite.');return}
    setUser(u);setPage('dashboard')
  }

  function doInviteSignup(token){
    setLoginErr('')
    try{
      var inv=JSON.parse(atob(token))
      if(!inv||!inv.email){setLoginErr('Invalid invite');return}
      if(portalUsers.find(function(x){return x.email===inv.email})){setLoginErr('Account already exists. Sign in.');return}
      if(!loginPass.trim()){setLoginErr('Set a password');return}
      var u={id:uid(),name:inv.name||'',email:inv.email,role:inv.role||'member',tools:inv.tools||[],passwordHash:pHash(loginPass),createdAt:new Date().toISOString(),invitedBy:inv.invitedBy||''}
      svPU(portalUsers.concat([u]))
      svInv(invites.map(function(x){return x.email===inv.email?Object.assign({},x,{used:true}):x}))
      setUser(u);setPage('dashboard')
    }catch(e2){setLoginErr('Invalid invite link')}
  }

  function sendInvite(){
    if(!invForm.email||invForm.email.indexOf('@sunriseconstructionco.com')<0){return}
    if(portalUsers.find(function(x){return x.email===invForm.email})){return}
    var inv={id:uid(),name:invForm.name,email:invForm.email,role:invForm.role,tools:invForm.tools,createdAt:new Date().toISOString(),invitedBy:user?user.name:'Admin',used:false}
    svInv(invites.concat([inv]))
    var token=btoa(JSON.stringify({name:inv.name,email:inv.email,role:inv.role,tools:inv.tools,invitedBy:inv.invitedBy}))
    var link=window.location.origin+window.location.pathname+'?invite='+token
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to='+encodeURIComponent(inv.email)+'&su='+encodeURIComponent('SRC%26D Employee Portal Invitation')+'&body='+encodeURIComponent('You have been invited to the SRC%26D Employee Portal.\n\nClick to join:\n'+link),'_blank')
    setInvForm({name:'',email:'',role:'member',tools:['field','equipment','hr','precon','compliance','hse','stakeholders']})
  }

  function submitAccessReq(){
    if(!reqTool||!reqReason.trim())return
    var r={id:uid(),userId:user?user.id:'',userName:user?user.name:'',userEmail:user?user.email:'',tool:reqTool,reason:reqReason,status:'pending',createdAt:new Date().toISOString()}
    svReqs(accessReqs.concat([r]));setReqTool('');setReqReason('')
  }

  function approveReq(reqId){
    var req=accessReqs.find(function(r){return r.id===reqId})
    if(!req)return
    svReqs(accessReqs.map(function(r){return r.id===reqId?Object.assign({},r,{status:'approved'}):r}))
    var pu=portalUsers.map(function(u){if(u.id===req.userId){var t=u.tools?u.tools.concat([req.tool]):[req.tool];return Object.assign({},u,{tools:t})}return u})
    svPU(pu)
    if(user&&user.id===req.userId){setUser(Object.assign({},user,{tools:(user.tools||[]).concat([req.tool])}))}
  }

  function denyReq(reqId){svReqs(accessReqs.map(function(r){return r.id===reqId?Object.assign({},r,{status:'denied'}):r}))}

  var isPortalAdmin=user&&user.role==='admin'
  var userTools=user&&user.tools?user.tools:[]
  function hasTool(t){return isPortalAdmin||userTools.indexOf(t)>=0}

  var TOOL_LABELS={field:'Field Manager',equipment:'Equipment Manager',hr:'HR Solutions',precon:'PreCon Controls',compliance:'Compliance Center',hse:'HS&E',stakeholders:'Stakeholder Reports'}

  const boxRef=useRef()

  useEffect(()=>{
    const onResize=()=>setMob(window.innerWidth<768)
    window.addEventListener('resize',onResize)
    return()=>window.removeEventListener('resize',onResize)
  },[])

  useEffect(()=>{
    const ts=[setTimeout(()=>setPhase(1),320),setTimeout(()=>setPhase(2),1050),setTimeout(()=>setPhase(3),1850),setTimeout(()=>setPhase(4),3100),setTimeout(()=>setPhase(5),3550),setTimeout(()=>setLoading(false),4500)]
    let p=0;const iv=setInterval(()=>{p=Math.min(100,p+Math.random()*5.5+2);setProg(p);if(p>=100)clearInterval(iv)},80)
    return()=>{ts.forEach(clearTimeout);clearInterval(iv)}
  },[])

  useEffect(()=>{
    if(loading)return;const el=boxRef.current;if(!el)return
    const fn=()=>{setScrollY(el.scrollTop);setTotalH(el.scrollHeight)}
    el.addEventListener('scroll',fn,{passive:true});setTimeout(fn,100)
    return()=>el.removeEventListener('scroll',fn)
  },[loading])

  const vp=typeof window!=='undefined'?window.innerHeight:700
  const scrollP=totalH>vp?scrollY/Math.max(totalH-vp,1):0
  const BB={fontFamily:"'Bebas Neue',sans-serif"}
  const NB={fontFamily:"'Barlow Condensed',sans-serif"}
  const m=mob

  const phases2=Z_PHASES.map(([ps,pe,ts,te,ms,me])=>({pileP:phaseP(scrollP,ps,pe),tubeP:phaseP(scrollP,ts,te),panelP:phaseP(scrollP,ms,me)}))
  const overallP2=phases2.reduce((s,p)=>s+(p.pileP+p.tubeP+p.panelP)/3,0)/phases2.length
  const phLabel2=overallP2<0.15?'SITE PREP':overallP2<0.35?'PILE INSTALL':overallP2<0.55?'RACKING':overallP2<0.75?'MODULES':'OPERATIONAL'

  const IST={width:'100%',background:'rgba(8,8,20,.7)',border:'1px solid rgba(255,255,255,.08)',color:'#F5F0EB',padding:'12px 16px',fontFamily:"'Barlow',sans-serif",fontSize:16,outline:'none',borderRadius:0,WebkitAppearance:'none'}
  const fIn=e=>{e.target.style.borderColor='rgba(249,115,22,.5)';e.target.style.boxShadow='0 0 0 3px rgba(249,115,22,.08)'}
  const fOut=e=>{e.target.style.borderColor='rgba(255,255,255,.08)';e.target.style.boxShadow=''}

  return(
    <div style={{position:'fixed',inset:0,fontFamily:"'Barlow',sans-serif"}}>
      <style>{CSS}</style>
      {loading&&<Loader phase={phase} prog={prog}/>}
      <div ref={boxRef} style={{position:'absolute',inset:0,overflowY:'scroll',overflowX:'hidden'}}>
        <AerialBG scrollP={scrollP}/>

        {/* Phase label — hide on mobile */}
        {/* ── NAV ── */}
        <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:m?'14px 20px':'16px 40px',background:'rgba(2,2,12,.85)',backdropFilter:'blur(14px)',borderBottom:'1px solid rgba(249,115,22,.1)'}}>
          <div style={{display:'flex',alignItems:'center',gap:10,flexShrink:0,marginRight:m?0:20}}>
            <img src={LOGO_SRC} alt="SRC" style={{width:m?36:48,height:m?36:48,objectFit:"contain"}}/>
            <div>
              <div style={{...BB,fontSize:m?17:21,letterSpacing:'4px',color:'#F5F0EB',lineHeight:1}}>SUNRISE</div>
              <div style={{...NB,fontSize:m?7:9,letterSpacing:'2px',color:A,textTransform:'uppercase',whiteSpace:'nowrap'}}>Construction & Development</div>
            </div>
          </div>

          {/* Nav links — hidden on mobile */}
          {!m&&<div style={{display:'flex',gap:22}}>
            {['Safety','Capabilities','Portfolio','Careers','Contact'].map(l=>(
              <a key={l} href={'#'+l.toLowerCase()} style={{...NB,fontSize:12,letterSpacing:'2px',textTransform:'uppercase',color:'#CCC8C2',whiteSpace:'nowrap',textDecoration:'none',transition:'color .2s'}} onMouseEnter={e=>e.target.style.color=A} onMouseLeave={e=>e.target.style.color='#CCC8C2'}>{l}</a>
            ))}
          </div>}

          {page==='landing'&&<div style={{...NB,fontSize:m?10:12,letterSpacing:m?'1px':'2px',textTransform:'uppercase',color:'#CCC8C2',cursor:'pointer',transition:'color .2s',whiteSpace:'nowrap'}} onClick={function(){setPage('login')}} onMouseEnter={e=>e.target.style.color=A} onMouseLeave={e=>e.target.style.color='#CCC8C2'}>Employee Portal</div>}
          {page!=='landing'&&<div style={{...NB,fontSize:m?10:12,letterSpacing:m?'1px':'2px',textTransform:'uppercase',color:'#CCC8C2',cursor:'pointer',transition:'color .2s',whiteSpace:'nowrap'}} onClick={function(){setPage('landing');setUser(null)}} onMouseEnter={e=>e.target.style.color=A} onMouseLeave={e=>e.target.style.color='#CCC8C2'}>Back to Site</div>}
          <a href="#contact" style={{background:A,color:'#1a1206',...NB,fontSize:m?11:13,fontWeight:700,letterSpacing:m?'2px':'3px',textTransform:'uppercase',textDecoration:'none',padding:m?'8px 12px':'10px 26px',clipPath:'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',transition:'background .2s',whiteSpace:'nowrap'}} onMouseEnter={e=>e.target.style.background='#FB923C'} onMouseLeave={e=>e.target.style.background=A}>
            {m?'Get In Touch':'Partner Now'}
          </a>
        </nav>


        {/* ── PHASE LABEL ── */}
        {page==='landing'&&!m&&<div style={{position:'fixed',top:76,right:20,zIndex:90,...NB,fontSize:9,letterSpacing:'4px',textTransform:'uppercase',color:'rgba(249,115,22,.5)'}}>{phLabel2}</div>}

        {/* ══════════════════════════════════════════════
            LOGIN PAGE
            ══════════════════════════════════════════════ */}
        {page==='login'&&(
          <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',zIndex:10,padding:m?'80px 16px 40px':'120px 48px'}}>
            <div style={{width:m?'100%':420,maxWidth:'95vw',background:'rgba(8,8,20,.88)',backdropFilter:'blur(18px)',border:'1px solid rgba(249,115,22,.15)',padding:m?'36px 28px':'48px 40px'}}>
              <div style={{textAlign:'center',marginBottom:32}}>
                <img src={LOGO_SRC} alt="SRC&D" style={{width:72,height:72,objectFit:'contain',marginBottom:16}}/>
                <div style={{...BB,fontSize:28,letterSpacing:'4px',color:'#F5F0EB'}}>{siteSettings.portalTitle}</div>
                <div style={{...NB,fontSize:12,letterSpacing:'3px',color:A,textTransform:'uppercase',marginTop:4}}>Sunrise Construction & Development</div>
              </div>
              {loginErr&&<div style={{background:'rgba(239,68,68,.12)',border:'1px solid rgba(239,68,68,.3)',color:'#EF4444',padding:'10px 14px',marginBottom:16,fontSize:13,...NB,letterSpacing:'1px'}}>{loginErr}</div>}
              <div style={{marginBottom:16}}>
                <div style={{...NB,fontSize:10,letterSpacing:'3px',textTransform:'uppercase',color:A,marginBottom:6}}>EMAIL</div>
                <input value={loginEmail} onChange={function(e){setLoginEmail(e.target.value)}} style={{...IST}} onFocus={fIn} onBlur={fOut} placeholder="name@sunriseconstructionco.com"/>
              </div>
              <div style={{marginBottom:24}}>
                <div style={{...NB,fontSize:10,letterSpacing:'3px',textTransform:'uppercase',color:A,marginBottom:6}}>PASSWORD</div>
                <input type="password" value={loginPass} onChange={function(e){setLoginPass(e.target.value)}} style={{...IST}} onFocus={fIn} onBlur={fOut} placeholder="Enter password" onKeyDown={function(e){if(e.key==='Enter')doPortalLogin()}}/>
              </div>
              <div style={{cursor:'pointer',background:A,color:'#1a1206',textAlign:'center',...NB,fontSize:14,fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',padding:'14px 0',clipPath:'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',transition:'background .2s'}} onClick={doPortalLogin} onMouseEnter={function(e){e.target.style.background='#FB923C'}} onMouseLeave={function(e){e.target.style.background=A}}>
                Sign In
              </div>
              {window._pendingInvite&&<div style={{cursor:'pointer',background:'#22c55e',color:'#fff',textAlign:'center',...NB,fontSize:14,fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',padding:'14px 0',marginTop:12,transition:'background .2s'}} onClick={function(){doInviteSignup(window._pendingInvite);window._pendingInvite=null}}>
                ACCEPT INVITE & CREATE ACCOUNT
              </div>}
              <div style={{textAlign:'center',marginTop:20,...NB,fontSize:11,letterSpacing:'1.5px',color:'#555'}}>
                Invite-only access · @sunriseconstructionco.com
              </div>
              <div style={{textAlign:'center',marginTop:8,...NB,fontSize:11,color:'#555'}}>
                Default admin: dustin.hanson@sunriseconstructionco.com / admin123
              </div>
            </div>
          </div>
        )}

        {page==='dashboard'&&(
          <div style={{minHeight:'100vh',position:'relative',zIndex:10,padding:m?'76px 14px 32px':'120px 48px 80px'}}>
            <div style={{maxWidth:1200,margin:'0 auto'}}>
              <div style={{marginBottom:m?28:40}}>
                <div style={{...NB,fontSize:12,letterSpacing:'4px',textTransform:'uppercase',color:A,marginBottom:8,display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:22,height:1,background:A}}/>Welcome back
                </div>
                <div style={{...BB,fontSize:m?'clamp(32px,8vw,48px)':'clamp(36px,5vw,56px)',letterSpacing:2,color:'#F5F0EB',textShadow:'0 2px 8px rgba(0,0,0,1)'}}>
                  {user ? user.name.toUpperCase() : 'OPERATOR'}
                </div>
                <div style={{...NB,fontSize:13,color:'#888',letterSpacing:'1.5px',marginTop:4}}>{user?user.email:''} · {user?user.role.toUpperCase():'MEMBER'}</div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:m?'1fr':'repeat(4, 1fr)',gap:m?14:20}}>
                {[
                  {key:'field',    label:'Field Manager',       icon:'F', desc:'Daily logs, crew tracking & site progress'},
                  {key:'equipment',label:'Equipment Manager',    icon:'E', desc:'Asset tracking, maintenance & utilization'},
                  {key:'hr',       label:'HR Solutions',         icon:'H', desc:'Onboarding, payroll & employee records'},
                  {key:'precon',   label:'PreCon Controls',      icon:'P', desc:'Estimating, takeoffs & bid management'},
                  {key:'compliance',label:'Compliance Center',   icon:'C', desc:'ISNet, licensing & regulatory docs'},
                  {key:'hse',      label:'HS&E',                 icon:'S', desc:'Safety incidents, training & audits'},
                  {key:'stakeholders',label:'Stakeholder Reports',icon:'R', desc:'Owner updates, financials & milestones'},
                ].filter(function(tile){return hasTool(tile.key)}).map(function(tile){
                  return (
                    <div key={tile.key} onClick={function(){setPage(tile.key)}} style={{
                      background:'rgba(8,8,20,.72)',backdropFilter:'blur(12px)',
                      border:'1px solid rgba(249,115,22,.12)',
                      padding:m?'24px 18px':'32px 28px',
                      cursor:'pointer',transition:'all .3s',position:'relative',overflow:'hidden'
                    }}
                    onMouseEnter={function(e){e.currentTarget.style.borderColor='rgba(249,115,22,.4)';e.currentTarget.style.background='rgba(249,115,22,.06)';e.currentTarget.style.transform='translateY(-4px)'}}
                    onMouseLeave={function(e){e.currentTarget.style.borderColor='rgba(249,115,22,.12)';e.currentTarget.style.background='rgba(8,8,20,.72)';e.currentTarget.style.transform='translateY(0)'}}>
                      <div style={{...BB,fontSize:m?36:48,color:A,opacity:.18,position:'absolute',top:m?12:16,right:m?14:20,lineHeight:1}}>{tile.icon}</div>
                      <div style={{...NB,fontSize:10,letterSpacing:'3px',textTransform:'uppercase',color:A,marginBottom:8}}>MODULE</div>
                      <div style={{...BB,fontSize:m?20:26,letterSpacing:'2px',color:'#F5F0EB',marginBottom:8}}>{tile.label.toUpperCase()}</div>
                      <div style={{...NB,fontSize:12,color:'#888',letterSpacing:'1px',lineHeight:1.5}}>{tile.desc}</div>
                      <div style={{marginTop:16,...NB,fontSize:10,letterSpacing:'2px',textTransform:'uppercase',color:A,display:'flex',alignItems:'center',gap:6}}>
                        Launch <span style={{fontSize:14}}>&#8594;</span>
                      </div>
                    </div>
                  )
                })}
                {isPortalAdmin&&(
                  <div onClick={function(){setPage('admin')}} style={{background:'rgba(8,8,20,.72)',backdropFilter:'blur(12px)',border:'1px solid rgba(249,115,22,.12)',padding:m?'24px 18px':'32px 28px',cursor:'pointer',transition:'all .3s',position:'relative',overflow:'hidden'}}
                    onMouseEnter={function(e){e.currentTarget.style.borderColor='rgba(249,115,22,.4)';e.currentTarget.style.background='rgba(249,115,22,.06)';e.currentTarget.style.transform='translateY(-4px)'}}
                    onMouseLeave={function(e){e.currentTarget.style.borderColor='rgba(249,115,22,.12)';e.currentTarget.style.background='rgba(8,8,20,.72)';e.currentTarget.style.transform='translateY(0)'}}>
                    <div style={{...BB,fontSize:m?36:48,color:A,opacity:.18,position:'absolute',top:m?12:16,right:m?14:20,lineHeight:1}}>&#9881;</div>
                    <div style={{...NB,fontSize:10,letterSpacing:'3px',textTransform:'uppercase',color:'#EF4444',marginBottom:8}}>ADMIN</div>
                    <div style={{...BB,fontSize:m?20:26,letterSpacing:'2px',color:'#F5F0EB',marginBottom:8}}>ADMIN DASHBOARD</div>
                    <div style={{...NB,fontSize:12,color:'#888',letterSpacing:'1px',lineHeight:1.5}}>Users, invites, access & site editor</div>
                    <div style={{marginTop:16,...NB,fontSize:10,letterSpacing:'2px',textTransform:'uppercase',color:'#EF4444',display:'flex',alignItems:'center',gap:6}}>
                      Manage <span style={{fontSize:14}}>&#8594;</span>
                    </div>
                  </div>
                )}
                {!isPortalAdmin&&(
                  <div onClick={function(){setPage('request')}} style={{background:'rgba(8,8,20,.72)',backdropFilter:'blur(12px)',border:'1px dashed rgba(249,115,22,.25)',padding:m?'24px 18px':'32px 28px',cursor:'pointer',transition:'all .3s'}}
                    onMouseEnter={function(e){e.currentTarget.style.borderColor='rgba(249,115,22,.4)'}}
                    onMouseLeave={function(e){e.currentTarget.style.borderColor='rgba(249,115,22,.25)'}}>
                    <div style={{...NB,fontSize:10,letterSpacing:'3px',textTransform:'uppercase',color:'#888',marginBottom:8}}>NEED ACCESS?</div>
                    <div style={{...BB,fontSize:m?20:26,letterSpacing:'2px',color:'#F5F0EB',marginBottom:8}}>REQUEST ACCESS</div>
                    <div style={{...NB,fontSize:12,color:'#888',letterSpacing:'1px',lineHeight:1.5}}>Request access to additional tools</div>
                  </div>
                )}
              </div>
              <div style={{marginTop:m?28:40,textAlign:'center'}}>
                <div style={{display:'inline-block',cursor:'pointer',...NB,fontSize:12,letterSpacing:'2px',textTransform:'uppercase',color:'#777',transition:'color .2s'}} onClick={function(){setPage('landing');setUser(null)}} onMouseEnter={function(e){e.target.style.color=A}} onMouseLeave={function(e){e.target.style.color='#777'}}>
                  &#8592; Sign Out & Return to Site
                </div>
              </div>
            </div>
          </div>
        )}


        {/* ══ ADMIN DASHBOARD ══ */}
        {page==='admin'&&isPortalAdmin&&(
          <div style={{minHeight:'100vh',position:'relative',zIndex:10,padding:m?'76px 14px 32px':'120px 48px 80px'}}>
            <div style={{maxWidth:1200,margin:'0 auto'}}>
              <div style={{cursor:'pointer',display:'inline-flex',alignItems:'center',gap:8,...NB,fontSize:12,letterSpacing:'2px',textTransform:'uppercase',color:A,marginBottom:28}} onClick={function(){setPage('dashboard')}}>&#8592; Back to Dashboard</div>
              <div style={{...BB,fontSize:m?'clamp(32px,8vw,48px)':'clamp(40px,5vw,64px)',letterSpacing:2,color:'#F5F0EB',textShadow:'0 2px 8px rgba(0,0,0,1)',marginBottom:24}}>ADMIN DASHBOARD</div>
              <div style={{display:'flex',gap:8,marginBottom:20,flexWrap:'wrap'}}>
                {['invite','users','requests','editor'].map(function(t){return (
                  <div key={t} onClick={function(){setAdminTab2(t)}} style={{padding:'8px 18px',...NB,fontSize:12,letterSpacing:'2px',textTransform:'uppercase',cursor:'pointer',background:adminTab===t?A:'rgba(8,8,20,.72)',color:adminTab===t?'#1a1206':'#aaa',border:'1px solid '+(adminTab===t?A:'rgba(249,115,22,.15)'),transition:'all .2s'}}>{t==='editor'?'Site Editor':t}</div>
                )})}
              </div>
              {adminTab==='invite'&&<div style={{background:'rgba(8,8,20,.72)',backdropFilter:'blur(12px)',border:'1px solid rgba(249,115,22,.12)',padding:m?24:32}}>
                <div style={{...BB,fontSize:22,letterSpacing:2,color:'#F5F0EB',marginBottom:20}}>INVITE USER</div>
                <div style={{marginBottom:12}}><div style={{...NB,fontSize:10,letterSpacing:'3px',textTransform:'uppercase',color:A,marginBottom:4}}>NAME</div><input value={invForm.name} onChange={function(e){setInvForm(Object.assign({},invForm,{name:e.target.value}))}} style={{...IST}} onFocus={fIn} onBlur={fOut} placeholder="Full name"/></div>
                <div style={{marginBottom:12}}><div style={{...NB,fontSize:10,letterSpacing:'3px',textTransform:'uppercase',color:A,marginBottom:4}}>EMAIL</div><input value={invForm.email} onChange={function(e){setInvForm(Object.assign({},invForm,{email:e.target.value}))}} style={{...IST}} onFocus={fIn} onBlur={fOut} placeholder="name@sunriseconstructionco.com"/></div>
                <div style={{marginBottom:12}}>
                  <div style={{...NB,fontSize:10,letterSpacing:'3px',textTransform:'uppercase',color:A,marginBottom:4}}>ROLE</div>
                  <div style={{display:'flex',gap:8}}>
                    <div onClick={function(){setInvForm(Object.assign({},invForm,{role:'member'}))}} style={{padding:'8px 18px',...NB,fontSize:12,letterSpacing:'2px',cursor:'pointer',background:invForm.role==='member'?A:'transparent',color:invForm.role==='member'?'#1a1206':'#888',border:'1px solid '+(invForm.role==='member'?A:'#444')}}>Member</div>
                    <div onClick={function(){setInvForm(Object.assign({},invForm,{role:'admin'}))}} style={{padding:'8px 18px',...NB,fontSize:12,letterSpacing:'2px',cursor:'pointer',background:invForm.role==='admin'?A:'transparent',color:invForm.role==='admin'?'#1a1206':'#888',border:'1px solid '+(invForm.role==='admin'?A:'#444')}}>Admin</div>
                  </div>
                </div>
                <div style={{marginBottom:16}}>
                  <div style={{...NB,fontSize:10,letterSpacing:'3px',textTransform:'uppercase',color:A,marginBottom:6}}>TOOL ACCESS</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                    {Object.keys(TOOL_LABELS).map(function(tk){var on=invForm.tools.indexOf(tk)>=0;return (
                      <div key={tk} onClick={function(){var nt=on?invForm.tools.filter(function(x){return x!==tk}):invForm.tools.concat([tk]);setInvForm(Object.assign({},invForm,{tools:nt}))}} style={{padding:'6px 14px',...NB,fontSize:11,letterSpacing:'1px',cursor:'pointer',background:on?'rgba(249,115,22,.15)':'transparent',color:on?A:'#666',border:'1px solid '+(on?A:'#444'),transition:'all .2s'}}>{TOOL_LABELS[tk]}</div>
                    )})}
                  </div>
                </div>
                <div style={{cursor:'pointer',background:A,color:'#1a1206',textAlign:'center',...NB,fontSize:14,fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',padding:'14px 0'}} onClick={sendInvite}>SEND INVITE VIA GMAIL</div>
              </div>}
              {adminTab==='users'&&<div style={{background:'rgba(8,8,20,.72)',backdropFilter:'blur(12px)',border:'1px solid rgba(249,115,22,.12)',padding:m?16:24}}>
                <div style={{...BB,fontSize:22,letterSpacing:2,color:'#F5F0EB',marginBottom:16}}>USERS ({portalUsers.length})</div>
                {portalUsers.map(function(u2){return (
                  <div key={u2.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 0',borderBottom:'1px solid rgba(255,255,255,.06)',flexWrap:'wrap',gap:8}}>
                    <div>
                      <div style={{...NB,fontSize:14,color:'#F5F0EB',fontWeight:600}}>{u2.name}</div>
                      <div style={{...NB,fontSize:11,color:'#888'}}>{u2.email} · {u2.role}</div>
                      <div style={{...NB,fontSize:10,color:'#555',marginTop:2}}>Tools: {(u2.tools||[]).join(', ')}</div>
                    </div>
                    <div style={{display:'flex',gap:6}}>
                      <div onClick={function(){var nu=portalUsers.map(function(x){return x.id===u2.id?Object.assign({},x,{role:x.role==='admin'?'member':'admin'}):x});svPU(nu)}} style={{padding:'4px 12px',...NB,fontSize:10,letterSpacing:'1px',cursor:'pointer',background:u2.role==='admin'?'rgba(59,130,246,.15)':'rgba(234,179,8,.15)',color:u2.role==='admin'?'#60a5fa':'#eab308'}}>{u2.role==='admin'?'Demote':'Promote'}</div>
                      {u2.email!=='dustin.hanson@sunriseconstructionco.com'&&<div onClick={function(){svPU(portalUsers.filter(function(x){return x.id!==u2.id}))}} style={{padding:'4px 12px',...NB,fontSize:10,letterSpacing:'1px',cursor:'pointer',background:'rgba(239,68,68,.12)',color:'#ef4444'}}>Remove</div>}
                    </div>
                  </div>
                )})}
              </div>}
              {adminTab==='requests'&&<div style={{background:'rgba(8,8,20,.72)',backdropFilter:'blur(12px)',border:'1px solid rgba(249,115,22,.12)',padding:m?16:24}}>
                <div style={{...BB,fontSize:22,letterSpacing:2,color:'#F5F0EB',marginBottom:16}}>ACCESS REQUESTS</div>
                {accessReqs.filter(function(r){return r.status==='pending'}).length===0&&<div style={{...NB,fontSize:13,color:'#888'}}>No pending requests</div>}
                {accessReqs.slice().reverse().map(function(r){return (
                  <div key={r.id} style={{padding:'12px 0',borderBottom:'1px solid rgba(255,255,255,.06)'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
                      <div>
                        <div style={{...NB,fontSize:14,color:'#F5F0EB'}}>{r.userName} requests <span style={{color:A}}>{TOOL_LABELS[r.tool]||r.tool}</span></div>
                        <div style={{...NB,fontSize:11,color:'#888'}}>{r.reason}</div>
                        <div style={{...NB,fontSize:10,color:'#555'}}>{new Date(r.createdAt).toLocaleDateString()}</div>
                      </div>
                      {r.status==='pending'&&<div style={{display:'flex',gap:6}}>
                        <div onClick={function(){approveReq(r.id)}} style={{padding:'4px 14px',...NB,fontSize:11,cursor:'pointer',background:'rgba(34,197,94,.15)',color:'#22c55e'}}>Approve</div>
                        <div onClick={function(){denyReq(r.id)}} style={{padding:'4px 14px',...NB,fontSize:11,cursor:'pointer',background:'rgba(239,68,68,.12)',color:'#ef4444'}}>Deny</div>
                      </div>}
                      {r.status!=='pending'&&<div style={{...NB,fontSize:11,color:r.status==='approved'?'#22c55e':'#ef4444'}}>{r.status.toUpperCase()}</div>}
                    </div>
                  </div>
                )})}
              </div>}
              {adminTab==='editor'&&<div style={{background:'rgba(8,8,20,.72)',backdropFilter:'blur(12px)',border:'1px solid rgba(249,115,22,.12)',padding:m?16:24}}>
                <div style={{...BB,fontSize:22,letterSpacing:2,color:'#F5F0EB',marginBottom:16}}>SITE EDITOR</div>
                <div style={{...NB,fontSize:11,color:'#888',marginBottom:16}}>Changes save automatically. Refresh to see updates on landing page.</div>
                {[{k:'heroTitle',l:'HERO TITLE'},{k:'heroSub',l:'HERO SUBTITLE'},{k:'contactEmail',l:'CONTACT EMAIL'},{k:'contactPhone',l:'CONTACT PHONE'},{k:'contactAddr',l:'CONTACT ADDRESS'},{k:'portalTitle',l:'PORTAL LOGIN TITLE'}].map(function(f){return (
                  <div key={f.k} style={{marginBottom:14}}>
                    <div style={{...NB,fontSize:10,letterSpacing:'3px',textTransform:'uppercase',color:A,marginBottom:4}}>{f.l}</div>
                    {f.k==='heroSub'||f.k==='contactAddr'?<textarea value={siteSettings[f.k]||''} onChange={function(e){var ns=Object.assign({},siteSettings);ns[f.k]=e.target.value;svSite(ns)}} rows={2} style={{...IST,resize:'vertical'}}/>:<input value={siteSettings[f.k]||''} onChange={function(e){var ns=Object.assign({},siteSettings);ns[f.k]=e.target.value;svSite(ns)}} style={{...IST}} onFocus={fIn} onBlur={fOut}/>}
                  </div>
                )})}
              </div>}
            </div>
          </div>
        )}

        {/* ══ REQUEST ACCESS ══ */}
        {page==='request'&&!isPortalAdmin&&(
          <div style={{minHeight:'100vh',position:'relative',zIndex:10,padding:m?'76px 14px 32px':'120px 48px 80px'}}>
            <div style={{maxWidth:600,margin:'0 auto'}}>
              <div style={{cursor:'pointer',display:'inline-flex',alignItems:'center',gap:8,...NB,fontSize:12,letterSpacing:'2px',textTransform:'uppercase',color:A,marginBottom:28}} onClick={function(){setPage('dashboard')}}>&#8592; Back</div>
              <div style={{...BB,fontSize:m?28:40,letterSpacing:2,color:'#F5F0EB',textShadow:'0 2px 8px rgba(0,0,0,1)',marginBottom:24}}>REQUEST ACCESS</div>
              <div style={{background:'rgba(8,8,20,.72)',backdropFilter:'blur(12px)',border:'1px solid rgba(249,115,22,.12)',padding:m?24:32}}>
                <div style={{marginBottom:16}}>
                  <div style={{...NB,fontSize:10,letterSpacing:'3px',textTransform:'uppercase',color:A,marginBottom:6}}>SELECT TOOL</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                    {Object.keys(TOOL_LABELS).filter(function(tk){return !hasTool(tk)}).map(function(tk){return (
                      <div key={tk} onClick={function(){setReqTool(tk)}} style={{padding:'6px 14px',...NB,fontSize:11,letterSpacing:'1px',cursor:'pointer',background:reqTool===tk?'rgba(249,115,22,.15)':'transparent',color:reqTool===tk?A:'#666',border:'1px solid '+(reqTool===tk?A:'#444')}}>{TOOL_LABELS[tk]}</div>
                    )})}
                  </div>
                  {Object.keys(TOOL_LABELS).filter(function(tk){return !hasTool(tk)}).length===0&&<div style={{...NB,fontSize:13,color:'#22c55e'}}>You have access to all tools!</div>}
                </div>
                <div style={{marginBottom:16}}>
                  <div style={{...NB,fontSize:10,letterSpacing:'3px',textTransform:'uppercase',color:A,marginBottom:4}}>REASON</div>
                  <textarea value={reqReason} onChange={function(e){setReqReason(e.target.value)}} rows={3} style={{...IST,resize:'vertical'}} placeholder="Why do you need access to this tool?"/>
                </div>
                <div style={{cursor:'pointer',background:reqTool&&reqReason.trim()?A:'#444',color:reqTool&&reqReason.trim()?'#1a1206':'#888',textAlign:'center',...NB,fontSize:14,fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',padding:'14px 0'}} onClick={function(){if(reqTool&&reqReason.trim()){submitAccessReq()}}}>SUBMIT REQUEST</div>
              </div>
              {accessReqs.filter(function(r){return r.userId===(user?user.id:'')}).length>0&&<div style={{marginTop:20}}>
                <div style={{...NB,fontSize:12,letterSpacing:'2px',color:'#888',marginBottom:8}}>YOUR REQUESTS</div>
                {accessReqs.filter(function(r){return r.userId===(user?user.id:'')}).map(function(r){return (
                  <div key={r.id} style={{background:'rgba(8,8,20,.5)',padding:'10px 14px',marginBottom:6,display:'flex',justifyContent:'space-between',...NB,fontSize:12}}>
                    <span style={{color:'#F5F0EB'}}>{TOOL_LABELS[r.tool]||r.tool}</span>
                    <span style={{color:r.status==='approved'?'#22c55e':r.status==='denied'?'#ef4444':'#eab308'}}>{r.status.toUpperCase()}</span>
                  </div>
                )})}
              </div>}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            MODULE PLACEHOLDER PAGES
            ══════════════════════════════════════════════ */}
        {page==='precon'&&<PreConControls onExit={function(){setPage('dashboard')}} portalUser={user&&user.name?user.name:user}/>}
        {page==='equipment'&&<EquipmentManager onExit={function(){setPage('dashboard')}} portalUser={user&&user.name?user.name:user}/>}
        {page==='field'&&<div style={{position:'fixed',inset:0,zIndex:2000,background:'#0a0a0a'}}>
          <iframe src="https://daily-task-tracker-a9c72.web.app" style={{width:'100%',height:'100%',border:'none'}} allow="camera;microphone;fullscreen" title="Field Reporting"/>
          <div onClick={function(){setPage('dashboard')}} style={{position:'fixed',top:16,right:16,zIndex:2001,width:40,height:40,borderRadius:'50%',background:'rgba(0,0,0,0.85)',border:'1px solid rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#fff',fontSize:18,fontFamily:"'Agency FB','Arial Narrow',sans-serif",backdropFilter:'blur(8px)',transition:'all .2s'}} onMouseEnter={function(e){e.currentTarget.style.background='rgba(249,115,22,0.9)';e.currentTarget.style.transform='scale(1.1)'}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(0,0,0,0.85)';e.currentTarget.style.transform='scale(1)'}}>✕</div>
        </div>}
        {page==='hr'&&<ClearScreenHR onExit={function(){setPage('dashboard')}} portalUser={user&&user.name?user.name:user}/>}
        {['compliance','hse','stakeholders'].includes(page)&&(
          <div style={{minHeight:'100vh',position:'relative',zIndex:10,padding:m?'76px 14px 32px':'120px 48px 80px'}}>
            <div style={{maxWidth:1200,margin:'0 auto'}}>
              <div style={{cursor:'pointer',display:'inline-flex',alignItems:'center',gap:8,...NB,fontSize:12,letterSpacing:'2px',textTransform:'uppercase',color:A,marginBottom:28,transition:'opacity .2s'}} onClick={()=>setPage('dashboard')} onMouseEnter={e=>e.currentTarget.style.opacity='.7'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                ← Back to Dashboard
              </div>
              <div style={{...BB,fontSize:m?'clamp(32px,8vw,48px)':'clamp(40px,5vw,64px)',letterSpacing:2,color:'#F5F0EB',textShadow:'0 2px 8px rgba(0,0,0,1)',marginBottom:16}}>
                {{field:'FIELD MANAGER',equipment:'EQUIPMENT MANAGER',precon:'PRECON CONTROLS',compliance:'COMPLIANCE CENTER',hse:'HS&E',stakeholders:'STAKEHOLDER REPORTS'}[page]}
              </div>
              <div style={{...NB,fontSize:14,color:'#888',letterSpacing:'1.5px'}}>Module content coming soon.</div>
            </div>
          </div>
        )}

        {/* ── LANDING PAGE CONTENT ── */}
        {page==='landing'&&<>
        {/* ── HERO ── */}
        <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'center',position:'relative',padding:m?'90px 24px 60px':'120px 48px 80px',zIndex:5}}>
          <div style={{maxWidth:m?'100%':1200,margin:'0 auto',width:'100%'}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16,...NB,fontSize:m?10:12,letterSpacing:'4px',textTransform:'uppercase',color:A}}>
              <div style={{width:28,height:1,background:A}}/>Elite Solar Subcontractor
            </div>
            <h1 style={{...BB,fontSize:m?'clamp(58px,16vw,88px)':'clamp(70px,10.5vw,155px)',lineHeight:.9,letterSpacing:2,color:'#F5F0EB',textShadow:'0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9)'}}>
              <span style={{display:'block',WebkitTextFillColor:'transparent',WebkitTextStroke:'1px rgba(245,240,235,.18)'}}>WE</span>
              <span style={{display:'block',color:'#F5F0EB',textShadow:'0 0 80px rgba(249,115,22,.28)'}}>DOMINATE</span>
              <span style={{display:'block',WebkitTextFillColor:'transparent',WebkitTextStroke:'1px rgba(245,240,235,.18)'}}>SOLAR</span>
            </h1>
            <p style={{fontSize:m?15:17,fontWeight:300,color:'#CCC8C2',maxWidth:460,lineHeight:1.75,margin:m?'18px 0':'26px 0'}}>
              The technical powerhouse delivering dominance, precision, and efficiency for the nation's largest utility-scale projects.
            </p>
            <div style={{display:'flex',gap:m?14:20,alignItems:'center',flexWrap:'wrap'}}>
              <a href="#contact" style={{display:'inline-flex',alignItems:'center',gap:10,background:A,color:'#1a1206',...NB,fontSize:m?12:14,fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',textDecoration:'none',padding:m?'13px 24px':'15px 34px',clipPath:'polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)',transition:'all .25s'}} onMouseEnter={e=>{e.currentTarget.style.background='#FB923C'}} onMouseLeave={e=>{e.currentTarget.style.background=A}}>
                Partner Now →
              </a>
              <a href="#portfolio" style={{...NB,fontSize:m?12:13,letterSpacing:'2.5px',textTransform:'uppercase',color:'#CCC8C2',textDecoration:'none',borderBottom:'1px solid rgba(255,255,255,.2)',paddingBottom:3,transition:'color .2s'}}>
                View Portfolio →
              </a>
            </div>

            {/* Stats — inline on mobile, absolute on desktop */}
            {m?(
              <div style={{display:'flex',gap:32,marginTop:36,paddingTop:28,borderTop:'1px solid rgba(255,255,255,.06)'}}>
                {[{n:'500+',l:'MW Installed'},{n:'1.2M+',l:'Modules Placed'},{n:'9',l:'States'}].map(s=>(
                  <div key={s.n}>
                    <div style={{...BB,fontSize:32,color:A,lineHeight:1}}>{s.n}</div>
                    <div style={{...NB,fontSize:9,letterSpacing:'2px',textTransform:'uppercase',color:'#ccc',textShadow:'0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)',marginTop:3}}>{s.l}</div>
                  </div>
                ))}
              </div>
            ):(
              <div style={{position:'absolute',right:48,bottom:'14%',display:'flex',flexDirection:'column',gap:26}}>
                {[{n:'500+',l:'Megawatts Installed'},{n:'1.2M+',l:'Modules Placed'}].map(s=>(
                  <div key={s.n} style={{textAlign:'right'}}>
                    <div style={{...BB,fontSize:50,color:A,lineHeight:1,textShadow:'0 0 30px rgba(249,115,22,.4)'}}>{s.n}</div>
                    <div style={{...NB,fontSize:11,letterSpacing:'3px',textTransform:'uppercase',color:'#ccc',textShadow:'0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)',marginTop:4}}>{s.l}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Scroll indicator — desktop only */}
          {!m&&<div style={{position:'absolute',bottom:34,left:48,display:'flex',alignItems:'center',gap:12,...NB,fontSize:11,letterSpacing:'3px',textTransform:'uppercase',color:'#bbb',textShadow:'0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)'}}>
            <div style={{width:38,height:1,background:'#333',overflow:'hidden',position:'relative'}}><div style={{position:'absolute',inset:0,background:A,animation:'scrollLine 2s ease-in-out infinite'}}/></div>Scroll
          </div>}
        </section>

        {/* ── STATS ── */}
        <Sec id="stats" style={{padding:m?'32px 20px':'56px 48px'}}>
          <div style={{maxWidth:1100,margin:'0 auto',background:'rgba(2,2,12,.82)',backdropFilter:'blur(16px)',border:'1px solid rgba(249,115,22,.1)',padding:m?'28px 20px':'46px 40px'}}>
            <div style={{textAlign:'center',marginBottom:m?22:32}}>
              <div style={{...NB,fontSize:m?10:11,letterSpacing:'4px',textTransform:'uppercase',color:A,marginBottom:8,display:'inline-flex',alignItems:'center',gap:12}}>
                <div style={{width:22,height:1,background:A}}/>Our Team's Track Record<div style={{width:22,height:1,background:A}}/>
              </div>
              <div style={{...NB,fontSize:m?12:14,fontWeight:300,color:'#999',letterSpacing:'.5px',maxWidth:680,margin:'0 auto',lineHeight:1.55}}>Built and installed by the people who run SRC&amp;D — combined field experience from utility-scale solar projects our team has personally delivered.</div>
            </div>
            {m?(
              <div style={{display:'flex',justifyContent:'space-around',gap:16}}>
                {[{n:'500+',l:'MW Our Team Installed'},{n:'1.2M+',l:'Modules Team Placed'},{n:'9',l:'States Worked'}].map(s=>(
                  <div key={s.n} style={{textAlign:'center'}}>
                    <div style={{...BB,fontSize:38,color:'#F5F0EB',lineHeight:1}}>{s.n}</div>
                    <div style={{...NB,fontSize:9,letterSpacing:'2px',textTransform:'uppercase',color:'#ccc',textShadow:'0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)',marginTop:6}}>{s.l}</div>
                  </div>
                ))}
              </div>
            ):(
              <div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr auto 1fr',alignItems:'center'}}>
                <div style={{textAlign:'center'}}><div style={{...BB,fontSize:66,color:'#F5F0EB',lineHeight:1}}>500+</div><div style={{...NB,fontSize:12,letterSpacing:'3.5px',textTransform:'uppercase',color:'#ccc',textShadow:'0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)',marginTop:8}}>Megawatts Our Team Installed</div></div>
                <div style={{width:1,height:70,background:'linear-gradient(to bottom,transparent,rgba(249,115,22,.4),transparent)',margin:'0 16px'}}/>
                <div style={{textAlign:'center'}}><div style={{...BB,fontSize:66,color:'#F5F0EB',lineHeight:1}}>1.2M+</div><div style={{...NB,fontSize:12,letterSpacing:'3.5px',textTransform:'uppercase',color:'#ccc',textShadow:'0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)',marginTop:8}}>Modules Team Placed</div></div>
                <div style={{width:1,height:70,background:'linear-gradient(to bottom,transparent,rgba(249,115,22,.4),transparent)',margin:'0 16px'}}/>
                <div style={{textAlign:'center'}}><div style={{...BB,fontSize:66,color:'#F5F0EB',lineHeight:1}}>9</div><div style={{...NB,fontSize:12,letterSpacing:'3.5px',textTransform:'uppercase',color:'#ccc',textShadow:'0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)',marginTop:8}}>States Team Worked</div></div>
              </div>
            )}
          </div>
        </Sec>

        {/* ── SAFETY ── */}
        <Sec id="safety">
          <div style={{maxWidth:1200,margin:'0 auto'}}>
            <div style={{...NB,fontSize:11,letterSpacing:'4px',textTransform:'uppercase',color:A,marginBottom:14,display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:22,height:1,background:A}}/>Our Commitment
            </div>
            <h2 style={{...BB,fontSize:'clamp(36px,8vw,76px)',letterSpacing:2,marginBottom:m?28:48,color:'#F5F0EB',textShadow:'0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9)'}}>SAFETY &amp; QUALITY FIRST</h2>
            <div style={{display:'grid',gridTemplateColumns:m?'1fr':'1fr 1fr',gap:m?32:68,alignItems:'center'}}>
              <div>
                <p style={{fontSize:m?15:17,fontWeight:300,color:'#CCC8C2',lineHeight:1.8,marginBottom:18}}>Getting it done right the first time through leading communication and transparency.</p>
                <p style={{fontSize:m?15:17,fontWeight:300,color:'#CCC8C2',lineHeight:1.8,marginBottom:m?20:28}}>Our commitment to excellence drives every pile we drive and every module we secure — with zero compromise.</p>
                <div>{['ISNetworld Certified','OSHA Compliant','Apprenticeship Enabled','Safety First Promise','Zero Tolerance'].map(t=>(
                  <span key={t} style={{display:'inline-block',padding:'6px 14px',border:'1px solid rgba(249,115,22,.28)',fontSize:m?9:11,letterSpacing:'2px',textTransform:'uppercase',color:A,...NB,background:'rgba(249,115,22,.05)',clipPath:'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)',margin:'3px 2px'}}>{t}</span>
                ))}</div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:m?'1fr 1fr':'1fr 1fr 1fr',gap:m?6:10}}>
                {[{n:'100%',l:'Compliance',hi:false},{n:'0',l:'Incidents',hi:true},{n:'A+',l:'Safety Rating',hi:false},{n:'24/7',l:'Oversight',hi:false},{n:'CREW\nFIRST',l:'Culture',hi:false},{n:'TOP\nTIER',l:'Training',hi:false}].map(s=>(
                  <div key={s.l} style={{height:m?80:102,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:s.hi?'rgba(249,115,22,.08)':'rgba(8,8,20,.55)',backdropFilter:'blur(8px)',border:'1px solid '+(s.hi?'rgba(249,115,22,.4)':'rgba(249,115,22,.18)'),transition:'all .3s'}}>
                    <div style={{...BB,fontSize:s.n.includes('\n')?(m?16:22):(m?22:30),color:A,lineHeight:1.1,textAlign:'center',whiteSpace:'pre-line'}}>{s.n}</div>
                    <div style={{...NB,fontSize:m?8:10,letterSpacing:'1px',textTransform:'uppercase',color:'#ccc',textShadow:'0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)',marginTop:3}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Sec>

        {/* ── CAPABILITIES ── */}
        <Sec id="capabilities">
          <div style={{maxWidth:1200,margin:'0 auto'}}>
            <div style={{...NB,fontSize:11,letterSpacing:'4px',textTransform:'uppercase',color:A,marginBottom:14,display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:22,height:1,background:A}}/>What We Deliver
            </div>
            <h2 style={{...BB,fontSize:'clamp(36px,8vw,76px)',letterSpacing:2,marginBottom:m?24:48,color:'#F5F0EB',textShadow:'0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9)'}}>CAPABILITIES</h2>
            <div style={{display:'grid',gridTemplateColumns:m?'1fr':'repeat(3,1fr)',gap:2}}>
              {CAPS.map((c,ci)=><CapCard key={ci} c={c} ci={ci}/>)}
            </div>
          </div>
        </Sec>

        {/* ── PORTFOLIO ── */}
        <Sec id="portfolio">
          <div style={{maxWidth:1200,margin:'0 auto'}}>
            <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:m?24:48,flexWrap:'wrap',gap:14}}>
              <div>
                <div style={{...NB,fontSize:11,letterSpacing:'4px',textTransform:'uppercase',color:A,marginBottom:12,display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:22,height:1,background:A}}/>Track Record
                </div>
                <h2 style={{...BB,fontSize:'clamp(36px,8vw,76px)',letterSpacing:2,color:'#F5F0EB',textShadow:'0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9)'}}>PROJECT PORTFOLIO</h2>
                <p style={{...NB,fontSize:m?14:16,lineHeight:1.7,color:'#ccc',textShadow:'0 1px 4px rgba(0,0,0,0.9)',marginBottom:m?20:32,maxWidth:600}}>Our core team has been key contributors on the following projects.</p>
              </div>
              {!m&&<p style={{maxWidth:280,fontSize:15,fontWeight:300,color:'#ccc',textShadow:'0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)',lineHeight:1.7}}></p>}
            </div>
            <div style={{display:'grid',gridTemplateColumns:m?'1fr':mob?'1fr 1fr':'repeat(3,1fr)',gap:2}}>
              {PROJS.map((p,i)=><ProjectCard key={p.name} p={p} i={i}/>)}
            </div>
          </div>
        </Sec>

        {/* ── TRACKING ── */}
        <Sec id="tracking">
          <div style={{maxWidth:1400,margin:'0 auto',display:'grid',gridTemplateColumns:m?'1fr':'1fr 1fr 1fr',gap:m?16:40,alignItems:'stretch'}}>
            <div style={{background:'rgba(8,8,20,.65)',backdropFilter:'blur(14px)',border:'1px solid rgba(249,115,22,.1)',padding:m?18:26}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
                <span style={{...NB,fontSize:10,letterSpacing:'2px',textTransform:'uppercase',color:'#bbb',textShadow:'0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)'}}>Task</span>
                <div style={{display:'flex',gap:m?3:4}}>
                  {['Wk 1','Wk 2','Wk 3'].map(w=><span key={w} style={{...NB,fontSize:9,letterSpacing:'1px',textTransform:'uppercase',color:'#bbb',textShadow:'0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)',width:m?40:56,textAlign:'center'}}>{w}</span>)}
                </div>
              </div>
              {[{n:'Pile Driving',c:3,a:0,e:0},{n:'Tracker Assy',c:2,a:1,e:0},{n:'Torque Tubes',c:1,a:1,e:1},{n:'Module Install',c:0,a:1,e:2},{n:'Electrical',c:0,a:0,e:3}].map(row=>(
                <div key={row.n} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                  <span style={{...NB,fontSize:m?10:12,letterSpacing:'1px',textTransform:'uppercase',color:'#CCC8C2',minWidth:m?80:108}}>{row.n}</span>
                  <div style={{display:'flex',gap:m?3:4}}>
                    {[...Array(row.c).fill('c'),...Array(row.a).fill('a'),...Array(row.e).fill('p')].map((t,i)=>(
                      <div key={i} style={{width:m?40:56,height:m?18:24,borderRadius:3,background:t==='c'?'linear-gradient(135deg,#16A34A,#22C55E)':t==='a'?'linear-gradient(135deg,#F97316,#EAB308)':'#1E1E1E',border:t==='p'?'1px solid rgba(255,255,255,.07)':'none'}}/>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{display:'flex',gap:14,marginTop:14,flexWrap:'wrap'}}>
                {[['#22C55E','Complete'],[A,'Active'],['#1E1E1E','Pending']].map(([bg,lbl])=>(
                  <div key={lbl} style={{display:'flex',alignItems:'center',gap:6,...NB,fontSize:10,letterSpacing:'1.5px',textTransform:'uppercase',color:'#ccc',textShadow:'0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)'}}>
                    <div style={{width:10,height:10,borderRadius:2,background:bg,border:bg==='#1E1E1E'?'1px solid rgba(255,255,255,.1)':'none'}}/>{lbl}
                  </div>
                ))}
              </div>
            </div>
            <div style={{position:'relative',overflow:'hidden',border:'1px solid rgba(249,115,22,.18)',background:'rgba(8,8,20,.65)',backdropFilter:'blur(8px)',marginBottom:24}}>
              <GLBViewer src="/models/midway.glb" height={m?240:340}/>
              <div style={{position:'absolute',top:10,left:12,fontFamily:"'Barlow Condensed',sans-serif",fontSize:9,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(249,115,22,.7)',pointerEvents:'none'}}>▲ LIVE SITE MODEL</div>
              <div style={{position:'absolute',bottom:10,right:12,fontFamily:"'Barlow Condensed',sans-serif",fontSize:9,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(249,115,22,.55)',pointerEvents:'none'}}>MIDWAY · 11/4/25</div>
              <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at center,transparent 55%,rgba(0,0,0,.45) 100%)',pointerEvents:'none'}}/>
            </div>
            <div>
              <div style={{...NB,fontSize:11,letterSpacing:'4px',textTransform:'uppercase',color:A,marginBottom:14,display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:22,height:1,background:A}}/>Real-Time Precision
              </div>
              <h2 style={{...BB,fontSize:'clamp(30px,6vw,66px)',letterSpacing:2,marginBottom:18,color:'#F5F0EB',textShadow:'0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9)'}}>TRACKING ACCURACY</h2>
              <p style={{fontSize:m?14:16,fontWeight:300,color:'#777',lineHeight:1.8,marginBottom:12}}>Precision is the backbone of utility-scale operations. Our industry-leading production tracking provides EPCs with absolute transparency.</p>
              <div style={{display:'inline-flex',alignItems:'center',gap:14,background:'rgba(249,115,22,.07)',border:'1px solid rgba(249,115,22,.2)',padding:m?'14px 20px':'18px 28px',marginTop:m?16:28,clipPath:'polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)'}}>
                <div style={{...BB,fontSize:m?38:50,color:A,lineHeight:1}}>99.8<span style={{fontSize:m?18:24}}>%</span></div>
                <div style={{...NB,fontSize:m?10:12,letterSpacing:'2px',textTransform:'uppercase',color:'#CCC8C2'}}>Production<br/>Tracking Accuracy</div>
              </div>
            </div>
          </div>
        </Sec>

        {/* ── COVERAGE ── */}
        <div style={{background:A,padding:m?'20px 20px':'28px 48px',display:'flex',alignItems:'center',justifyContent:'center',gap:m?12:34,flexWrap:'wrap',position:'relative',zIndex:5}}>
          {['National Coverage','Utility-Scale','ISNet Compliant','Safety First'].map(t=>(
            <div key={t} style={{display:'flex',alignItems:'center',gap:8,...NB,fontSize:m?10:13,letterSpacing:m?'2px':'3px',textTransform:'uppercase',color:'#F97316',textShadow:'0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)',fontWeight:700}}>
              <div style={{width:4,height:4,background:'#080808',borderRadius:'50%'}}/>{t}
            </div>
          ))}
          <a href="#contact" style={{background:'#080808',color:A,padding:m?'10px 20px':'12px 32px',...NB,fontSize:m?11:13,fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',textDecoration:'none',clipPath:'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)'}} onMouseEnter={e=>e.currentTarget.style.background='#1a1a1a'} onMouseLeave={e=>e.currentTarget.style.background='#080808'}>Partner Now →</a>
        </div>

        {/* ── CONTACT ── */}
        <Sec id="contact">
          <div style={{maxWidth:1200,margin:'0 auto',display:'grid',gridTemplateColumns:m?'1fr':'1fr 1fr',gap:m?36:88}}>
            <div>
              <div style={{...NB,fontSize:11,letterSpacing:'4px',textTransform:'uppercase',color:A,marginBottom:14,display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:22,height:1,background:A}}/>Make a Connection
              </div>
              <h2 style={{...BB,fontSize:'clamp(32px,7vw,66px)',letterSpacing:2,marginBottom:m?20:34,color:'#F5F0EB',textShadow:'0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9)'}}>GET IN TOUCH</h2>
              {[{l:'Headquarters',v:'12856 N Hwy 183, Ste B PMB 2011\nAustin, TX 78750'},{l:'Phone',v:'+1 (619) 870-4491'},{l:'Email',v:'Kaleb.LeBaron@sunriseconstructionco.com'}].map(c=>(
                <div key={c.l} style={{padding:'16px 0',borderBottom:'1px solid rgba(255,255,255,.06)'}}>
                  <div style={{...NB,fontSize:10,letterSpacing:'3px',textTransform:'uppercase',color:A,marginBottom:4}}>{c.l}</div>
                  <div style={{fontSize:m?13:15,fontWeight:300,color:'#F5F0EB',whiteSpace:'pre-line',wordBreak:'break-all'}}>{c.v}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={{...NB,fontSize:11,letterSpacing:'4px',textTransform:'uppercase',color:A,marginBottom:18,display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:22,height:1,background:A}}/>Start a Conversation
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                  {['First Name','Last Name'].map(n=>(
                    <div key={n}>
                      <div style={{...NB,fontSize:10,letterSpacing:'2px',textTransform:'uppercase',color:'#ccc',textShadow:'0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)',marginBottom:6}}>{n}</div>
                      <input placeholder={n==='First Name'?'John':'Smith'} style={IST} onFocus={fIn} onBlur={fOut}/>
                    </div>
                  ))}
                </div>
                {['Company / EPC','Email'].map(n=>(
                  <div key={n}>
                    <div style={{...NB,fontSize:10,letterSpacing:'2px',textTransform:'uppercase',color:'#ccc',textShadow:'0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)',marginBottom:6}}>{n}</div>
                    <input type={n==='Email'?'email':'text'} placeholder={n==='Email'?'john@company.com':'Company Name'} style={IST} onFocus={fIn} onBlur={fOut}/>
                  </div>
                ))}
                <div>
                  <div style={{...NB,fontSize:10,letterSpacing:'2px',textTransform:'uppercase',color:'#ccc',textShadow:'0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)',marginBottom:6}}>Project Details</div>
                  <textarea placeholder="MW capacity, location, timeline..." style={{...IST,minHeight:m?80:105,resize:'vertical'}} onFocus={fIn} onBlur={fOut}/>
                </div>
                <button onMouseEnter={e=>{e.currentTarget.style.background='#FB923C'}} onMouseLeave={e=>{e.currentTarget.style.background=A}} style={{display:'inline-flex',alignItems:'center',gap:10,background:A,color:'#1a1206',...NB,fontSize:m?12:14,fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',padding:m?'13px 24px':'15px 34px',border:'none',cursor:'pointer',clipPath:'polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)',transition:'all .25s',alignSelf:'flex-start'}}>
                  Send Message →
                </button>
              </div>
            </div>
          </div>
        </Sec>

        {/* ── FOOTER ── */}
        {/* ── CAREERS ── */}
        <Sec id="careers">
          <div style={{maxWidth:900,margin:'0 auto'}}>
            <div style={{...NB,fontSize:12,letterSpacing:'4px',textTransform:'uppercase',color:A,marginBottom:14,display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:22,height:1,background:A}}/>Join Our Team
            </div>
            <h2 style={{...BB,fontSize:'clamp(36px,8vw,76px)',letterSpacing:2,marginBottom:m?16:24,color:'#F5F0EB',textShadow:'0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9)'}}>CAREERS</h2>
            <p style={{...NB,fontSize:m?14:16,lineHeight:1.8,color:'#ccc',textShadow:'0 1px 4px rgba(0,0,0,0.9)',marginBottom:m?24:36,maxWidth:600}}>
              We're building the future of solar energy across 9 states. If you're ready to join a team that's installed 500+ MW and placed 1.2M+ modules, we want to hear from you.
            </p>
            {careerSubmitted?(
              <div style={{background:'rgba(34,197,94,.12)',border:'1px solid rgba(34,197,94,.3)',padding:m?'24px 20px':'32px 28px',textAlign:'center'}}>
                <div style={{...BB,fontSize:28,letterSpacing:2,color:'#22c55e',marginBottom:8}}>APPLICATION RECEIVED</div>
                <div style={{...NB,fontSize:14,color:'#ccc'}}>Thank you for your interest. Our team will review your application and reach out if there's a match.</div>
                <div onClick={function(){setCareerSubmitted(false);setCareerForm({name:'',email:'',phone:'',position:'',experience:'',message:''})}} style={{display:'inline-block',marginTop:16,...NB,fontSize:12,letterSpacing:'2px',color:A,cursor:'pointer'}}>Submit Another Application</div>
              </div>
            ):(
              <div style={{display:'grid',gridTemplateColumns:m?'1fr':'1fr 1fr',gap:m?12:20}}>
                <div>
                  <div style={{marginBottom:14}}>
                    <div style={{...NB,fontSize:10,letterSpacing:'3px',textTransform:'uppercase',color:A,marginBottom:6}}>FULL NAME *</div>
                    <input value={careerForm.name} onChange={function(e){setCareerForm(Object.assign({},careerForm,{name:e.target.value}))}} style={{...IST}} onFocus={fIn} onBlur={fOut} placeholder="Your full name"/>
                  </div>
                  <div style={{marginBottom:14}}>
                    <div style={{...NB,fontSize:10,letterSpacing:'3px',textTransform:'uppercase',color:A,marginBottom:6}}>EMAIL *</div>
                    <input value={careerForm.email} onChange={function(e){setCareerForm(Object.assign({},careerForm,{email:e.target.value}))}} style={{...IST}} onFocus={fIn} onBlur={fOut} placeholder="your@email.com"/>
                  </div>
                  <div style={{marginBottom:14}}>
                    <div style={{...NB,fontSize:10,letterSpacing:'3px',textTransform:'uppercase',color:A,marginBottom:6}}>PHONE</div>
                    <input value={careerForm.phone} onChange={function(e){setCareerForm(Object.assign({},careerForm,{phone:e.target.value}))}} style={{...IST}} onFocus={fIn} onBlur={fOut} placeholder="(xxx) xxx-xxxx"/>
                  </div>
                  <div style={{marginBottom:14}}>
                    <div style={{...NB,fontSize:10,letterSpacing:'3px',textTransform:'uppercase',color:A,marginBottom:6}}>POSITION OF INTEREST</div>
                    <select value={careerForm.position} onChange={function(e){setCareerForm(Object.assign({},careerForm,{position:e.target.value}))}} style={{...IST,appearance:'auto'}} onFocus={fIn} onBlur={fOut}>
                      <option value="">Select a position...</option>
                      <option value="Civil Foreman">Civil Foreman</option>
                      <option value="Pile Crew Lead">Pile Crew Lead</option>
                      <option value="Tracker Installer">Tracker Installer</option>
                      <option value="Electrician">Electrician</option>
                      <option value="Equipment Operator">Equipment Operator</option>
                      <option value="Site Superintendent">Site Superintendent</option>
                      <option value="Project Manager">Project Manager</option>
                      <option value="Safety Manager">Safety Manager</option>
                      <option value="QA/QC Inspector">QA/QC Inspector</option>
                      <option value="Field Engineer">Field Engineer</option>
                      <option value="General Laborer">General Laborer</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div style={{marginBottom:14}}>
                    <div style={{...NB,fontSize:10,letterSpacing:'3px',textTransform:'uppercase',color:A,marginBottom:6}}>YEARS OF EXPERIENCE</div>
                    <select value={careerForm.experience} onChange={function(e){setCareerForm(Object.assign({},careerForm,{experience:e.target.value}))}} style={{...IST,appearance:'auto'}} onFocus={fIn} onBlur={fOut}>
                      <option value="">Select...</option>
                      <option value="0-1">0-1 years</option>
                      <option value="2-4">2-4 years</option>
                      <option value="5-9">5-9 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div style={{marginBottom:14}}>
                    <div style={{...NB,fontSize:10,letterSpacing:'3px',textTransform:'uppercase',color:A,marginBottom:6}}>TELL US ABOUT YOURSELF</div>
                    <textarea value={careerForm.message} onChange={function(e){setCareerForm(Object.assign({},careerForm,{message:e.target.value}))}} rows={4} style={{...IST,resize:'vertical'}} onFocus={fIn} onBlur={fOut} placeholder="Relevant skills, certifications, availability..."/>
                  </div>
                  <div style={{marginBottom:14}}>
                    <div style={{...NB,fontSize:10,letterSpacing:'3px',textTransform:'uppercase',color:A,marginBottom:6}}>RESUME (PDF)</div>
                    <label style={{display:'flex',alignItems:'center',gap:10,padding:'12px 16px',background:'rgba(249,115,22,.06)',border:'1px dashed rgba(249,115,22,.3)',cursor:'pointer',transition:'background .2s'}} onMouseEnter={function(e){e.currentTarget.style.background='rgba(249,115,22,.12)'}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(249,115,22,.06)'}}>
                      <span style={{...NB,fontSize:13,color:A,letterSpacing:'1px'}}>Upload Resume</span>
                      <input type="file" accept=".pdf,.doc,.docx" style={{display:'none'}} onChange={function(e){if(e.target.files&&e.target.files[0]){setCareerForm(Object.assign({},careerForm,{resume:e.target.files[0].name}))}}}/>
                      {careerForm.resume&&<span style={{...NB,fontSize:11,color:'#888'}}>{careerForm.resume}</span>}
                    </label>
                  </div>
                </div>
                <div style={{gridColumn:m?'1':'1 / -1',marginTop:m?8:16}}>
                  <div onClick={function(){if(!careerForm.name||!careerForm.email){return}var submission=Object.assign({},careerForm,{id:uid(),submittedAt:new Date().toISOString()});sGet('career_submissions').then(function(prev){sSet('career_submissions',(prev||[]).concat([submission]))});setCareerSubmitted(true)}} style={{cursor:careerForm.name&&careerForm.email?'pointer':'default',background:careerForm.name&&careerForm.email?A:'rgba(249,115,22,.3)',color:careerForm.name&&careerForm.email?'#1a1206':'#888',textAlign:'center',...NB,fontSize:15,fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',padding:'16px 0',clipPath:'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',transition:'background .2s'}}>
                    SUBMIT APPLICATION
                  </div>
                  <div style={{textAlign:'center',marginTop:12,...NB,fontSize:11,color:'#666',letterSpacing:'1px'}}>
                    We are an equal opportunity employer. All positions require travel to project sites across the US.
                  </div>
                </div>
              </div>
            )}
          </div>
        </Sec>

                <footer style={{background:'rgba(1,1,6,.96)',padding:m?'28px 20px':'38px 48px',borderTop:'1px solid rgba(249,115,22,.1)',display:'flex',alignItems:m?'flex-start':'center',flexDirection:m?'column':'row',justifyContent:'space-between',flexWrap:'wrap',gap:m?16:18,position:'relative',zIndex:5}}>
          <div style={{display:'flex',alignItems:'center',gap:12,opacity:.7}}>
            <img src={LOGO_SRC} alt="SRC" style={{width:36,height:36,objectFit:"contain"}}/>
            <div><div style={{...BB,fontSize:16,letterSpacing:'4px',color:'#F5F0EB',lineHeight:1}}>SUNRISE</div><div style={{...NB,fontSize:8,letterSpacing:'3px',color:A,textTransform:'uppercase'}}>Construction & Development</div></div>
          </div>
          <div style={{...NB,fontSize:m?9:11,letterSpacing:'2px',textTransform:'uppercase',color:'#ddd',textShadow:'0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)',textAlign:m?'left':'center'}}>
            © 2026 Sunrise Construction & Development. All Rights Reserved.{!m&&<br/>}{m?' ':''}Elite Subcontracting for Utility-Scale Solar Dominance.
          </div>
          {!m&&<div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{padding:'7px 14px',border:'1px solid rgba(249,115,22,.25)',...NB,fontSize:10,letterSpacing:'2.5px',textTransform:'uppercase',color:A}}>ISNet Compliant</div>
            <div style={{...NB,fontSize:11,letterSpacing:'2px',textTransform:'uppercase',color:'#ddd',textShadow:'0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)'}}>National Coverage</div>
          </div>}
        </footer>
        </>}
      </div>
    </div>
  )
}


