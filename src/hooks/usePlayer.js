import { useEffect, useState } from 'react'

// Plays 30-second song previews from Apple's public iTunes Search API, looked up
// in the visitor's browser at play time. Nothing is downloaded or hosted by the site.
// JSONP is used because it works from any static host without CORS setup.

const cache = new Map()
const audio = typeof Audio !== 'undefined' ? new Audio() : null
let current = null
const listeners = new Set()
const emit = () => listeners.forEach((l) => l())

function jsonp(url) {
  return new Promise((resolve, reject) => {
    const cb = `__itunes_${Math.random().toString(36).slice(2)}`
    const s = document.createElement('script')
    const done = () => {
      delete window[cb]
      s.remove()
      clearTimeout(t)
    }
    const t = setTimeout(() => (done(), reject(new Error('timeout'))), 8000)
    window[cb] = (data) => (done(), resolve(data))
    s.onerror = () => (done(), reject(new Error('network')))
    s.src = `${url}&callback=${cb}`
    document.head.appendChild(s)
  })
}

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '')

async function findPreview(track) {
  if (cache.has(track.key)) return cache.get(track.key)
  const term = encodeURIComponent(track.search || `${track.artist} ${track.title}`)
  const data = await jsonp(`https://itunes.apple.com/search?media=music&entity=song&limit=15&term=${term}`)
  const results = (data.results || []).filter((r) => r.previewUrl)
  const artistKey = norm(track.artistMatch || track.artist).slice(0, 6)
  const titleKey = norm(track.title)
  const pick =
    results.find((r) => norm(r.trackName).includes(titleKey) && norm(r.artistName).includes(artistKey)) ||
    results.find((r) => norm(r.artistName).includes(artistKey)) ||
    null
  const found = pick && { url: pick.previewUrl, name: pick.trackName, artist: pick.artistName, link: pick.trackViewUrl }
  cache.set(track.key, found)
  return found
}

if (audio) {
  audio.addEventListener('ended', () => {
    if (current) current = { ...current, state: 'idle', progress: 0 }
    emit()
  })
  audio.addEventListener('timeupdate', () => {
    if (current && audio.duration) {
      current = { ...current, progress: audio.currentTime / audio.duration }
      emit()
    }
  })
}

export async function toggleTrack(track, onMissing) {
  if (!audio) return
  if (current?.key === track.key && current.state === 'playing') {
    audio.pause()
    current = { ...current, state: 'idle' }
    return emit()
  }
  audio.pause()
  current = { key: track.key, state: 'loading', progress: 0 }
  emit()
  try {
    const found = await findPreview(track)
    if (current?.key !== track.key) return
    if (!found) throw new Error('missing')
    if (audio.src !== found.url) audio.src = found.url
    await audio.play()
    current = { key: track.key, state: 'playing', progress: 0, info: found }
  } catch (e) {
    current = { key: track.key, state: 'error', progress: 0 }
    onMissing?.(e.message)
  }
  emit()
}

export function useTrack(key) {
  const [, force] = useState(0)
  useEffect(() => {
    const l = () => force((n) => n + 1)
    listeners.add(l)
    return () => listeners.delete(l)
  }, [])
  return current?.key === key ? current : { state: 'idle', progress: 0 }
}
