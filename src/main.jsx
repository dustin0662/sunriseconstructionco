import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Storage polyfill - replaces window.storage (Anthropic artifact API) with localStorage
window.storage = {
  async get(key) {
    try {
      const val = localStorage.getItem('src_' + key)
      return val ? { key, value: val } : null
    } catch (e) { return null }
  },
  async set(key, value) {
    try {
      localStorage.setItem('src_' + key, typeof value === 'string' ? value : JSON.stringify(value))
      return { key, value }
    } catch (e) { return null }
  },
  async delete(key) {
    try {
      localStorage.removeItem('src_' + key)
      return { key, deleted: true }
    } catch (e) { return null }
  },
  async list(prefix) {
    try {
      const keys = []
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i)
        if (k.startsWith('src_' + (prefix || ''))) keys.push(k.replace('src_', ''))
      }
      return { keys }
    } catch (e) { return { keys: [] } }
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
