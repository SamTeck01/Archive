import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const KEY = 'archive:saved'
const SavedContext = createContext(null)

function read() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(v) ? v : []
  } catch {
    return []
  }
}

export function SavedProvider({ children }) {
  const [saved, setSaved] = useState(read)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(saved))
    } catch {
      /* storage unavailable: keep in memory only */
    }
  }, [saved])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const isSaved = useCallback((slug) => saved.includes(slug), [saved])
  const toggle = useCallback((slug, title) => {
    setSaved((s) => {
      const has = s.includes(slug)
      setToast({ id: Date.now(), text: has ? `Removed ${title} from your collection` : `Saved ${title} to your collection` })
      return has ? s.filter((x) => x !== slug) : [...s, slug]
    })
  }, [])
  const notify = useCallback((text) => setToast({ id: Date.now(), text }), [])

  const value = useMemo(() => ({ saved, isSaved, toggle, toast, notify }), [saved, isSaved, toggle, toast, notify])
  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>
}

export const useSaved = () => useContext(SavedContext)
