import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { categories, searchIndex } from '../data'
import { useSaved } from '../hooks/useSaved'

/* ---------- Lightbox: tap any zoomable image to see it full screen ---------- */

const LightboxContext = createContext(() => {})
export const useLightbox = () => useContext(LightboxContext)

export function LightboxProvider({ children }) {
  const [img, setImg] = useState(null)
  const open = useCallback((src, alt) => setImg({ src, alt }), [])
  useEffect(() => {
    if (!img) return
    const onKey = (e) => e.key === 'Escape' && setImg(null)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [img])
  return (
    <LightboxContext.Provider value={open}>
      {children}
      {img && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={img.alt || 'Image'}
          className="animate-fade fixed inset-0 z-[60] grid cursor-zoom-out place-items-center bg-ink/90 p-4"
          onClick={() => setImg(null)}
        >
          <img src={img.src} alt={img.alt} className="animate-zoom max-h-[86vh] max-w-full rounded shadow-2xl" />
          {img.alt && <p className="absolute bottom-6 left-0 right-0 px-6 text-center text-sm text-white/70">{img.alt}</p>}
          <button type="button" aria-label="Close image" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20">
            ×
          </button>
        </div>
      )}
    </LightboxContext.Provider>
  )
}

export function Zoomable({ src, alt, className = '', style }) {
  const open = useLightbox()
  return (
    <button type="button" onClick={() => open(src, alt)} className="block w-full cursor-zoom-in" aria-label={`Enlarge: ${alt}`}>
      <img src={src} alt={alt} loading="lazy" className={className} style={style} />
    </button>
  )
}

/* ---------- Save / heart button ---------- */

export function SaveButton({ slug, title, className = '' }) {
  const { isSaved, toggle } = useSaved()
  const on = isSaved(slug)
  const [pop, setPop] = useState(0)
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? `Remove ${title} from your collection` : `Save ${title} to your collection`}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(slug, title)
        setPop((p) => p + 1)
      }}
      className={`grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow-pin transition hover:scale-110 active:scale-95 ${className}`}
    >
      <svg key={pop} viewBox="0 0 24 24" className={`h-5 w-5 ${pop ? 'animate-pop' : ''}`} aria-hidden="true">
        <path
          d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"
          fill={on ? '#c0392b' : 'none'}
          stroke={on ? '#c0392b' : 'currentColor'}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

/* ---------- Toast ---------- */

export function Toast() {
  const { toast } = useSaved()
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-20 z-[70] flex justify-center px-4">
      {toast && (
        <p key={toast.id} className="animate-toast rounded-full bg-ink px-5 py-3 text-sm text-white shadow-2xl ring-1 ring-white/25">
          {toast.text}
        </p>
      )}
    </div>
  )
}

/* ---------- Scroll progress + back to top ---------- */

export function ScrollChrome() {
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const on = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - innerHeight
        setP(h > 0 ? scrollY / h : 0)
      })
    }
    on()
    addEventListener('scroll', on, { passive: true })
    addEventListener('resize', on)
    return () => {
      removeEventListener('scroll', on)
      removeEventListener('resize', on)
    }
  }, [])
  return (
    <>
      <div aria-hidden="true" className="fixed left-0 top-0 z-50 h-[3px] origin-left bg-amber" style={{ width: '100%', transform: `scaleX(${p})` }} />
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-ink text-white shadow-2xl transition duration-300 hover:-translate-y-1 ${
          p > 0.08 ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
          <path d="M10 15V5M5 10l5-5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  )
}

/* ---------- Search dialog ---------- */

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

export function SearchDialog({ onClose }) {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [active, setActive] = useState(0)
  const input = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    input.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = '')
  }, [])

  const results = useMemo(() => {
    const n = norm(q.trim())
    return searchIndex
      .filter((r) => cat === 'all' || r.category === cat)
      .map((r) => {
        if (!n) return { r, s: 1 }
        const t = norm(r.title)
        const s = t.startsWith(n) ? 4 : t.includes(n) ? 3 : norm(r.subtitle).includes(n) ? 2 : norm(r.text).includes(n) ? 1 : 0
        return { r, s }
      })
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.r)
  }, [q, cat])

  useEffect(() => setActive(0), [q, cat])

  const go = (r) => {
    onClose()
    navigate(r.to)
  }

  return (
    <div role="dialog" aria-modal="true" aria-label="Search the archive" className="animate-fade fixed inset-0 z-[55] bg-ink/60 p-3 sm:p-10" onClick={onClose}>
      <div className="animate-rise mx-auto flex max-h-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-ink/10 px-4">
          <SearchIcon className="h-5 w-5 text-muted" />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose()
              if (e.key === 'ArrowDown') (e.preventDefault(), setActive((a) => Math.min(a + 1, results.length - 1)))
              if (e.key === 'ArrowUp') (e.preventDefault(), setActive((a) => Math.max(a - 1, 0)))
              if (e.key === 'Enter' && results[active]) go(results[active])
            }}
            placeholder="Search photos, music, cloth, design…"
            aria-label="Search"
            className="h-14 flex-1 bg-transparent text-base focus:outline-none"
          />
          <button type="button" onClick={onClose} className="rounded px-2 py-1 text-sm text-muted hover:text-ink">
            Esc
          </button>
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3">
          {[{ id: 'all', label: 'All' }, ...categories].map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={cat === c.id}
              onClick={() => setCat(c.id)}
              className={`shrink-0 rounded-full border px-3 py-1 text-sm transition ${cat === c.id ? 'border-ink bg-ink text-white' : 'border-ink/15 hover:border-ink/40'}`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <ul className="overflow-y-auto px-2 pb-2" role="listbox" aria-label="Results">
          {results.map((r, i) => (
            <li key={r.key} role="option" aria-selected={i === active}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r)}
                className={`flex w-full items-center gap-3 rounded-xl p-2 text-left transition ${i === active ? 'bg-sand' : ''}`}
              >
                <img src={r.image} alt="" className="h-12 w-12 shrink-0 rounded-md object-cover" />
                <span className="min-w-0">
                  <span className="block truncate font-display font-medium">{r.title}</span>
                  <span className="block truncate text-xs text-muted">
                    <span className="capitalize">{r.category}</span> · {r.subtitle}
                  </span>
                </span>
              </button>
            </li>
          ))}
          {!results.length && <li className="px-3 py-8 text-center text-sm text-muted">Nothing in the archive matches “{q}” yet.</li>}
        </ul>
      </div>
    </div>
  )
}

export function SearchIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function SavedLink({ className = '' }) {
  const { saved } = useSaved()
  return (
    <Link to="/saved" aria-label={`Your collection, ${saved.length} saved`} className={`relative p-1 ${className}`}>
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      {saved.length > 0 && (
        <span key={saved.length} className="animate-pop absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-amber px-1 text-[10px] font-semibold text-ink">
          {saved.length}
        </span>
      )}
    </Link>
  )
}

/* ---------- 3D tilt that follows the pointer ---------- */

export function Tilt({ children, className = '', max = 8, ...rest }) {
  const ref = useRef(null)
  const move = (e) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(800px) rotateX(${-y * max}deg) rotateY(${x * max}deg) translateZ(0)`
    el.style.setProperty('--gx', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--gy', `${(y + 0.5) * 100}%`)
  }
  const leave = () => ref.current && (ref.current.style.transform = '')
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`tilt ${className}`} {...rest}>
      {children}
    </div>
  )
}

/* ---------- Cursor bubble: a "View" disc that trails the mouse over [data-cursor] ---------- */

export function CursorBubble() {
  const ref = useRef(null)
  const [label, setLabel] = useState('')
  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let x = 0, y = 0, cx = 0, cy = 0, raf
    const loop = () => {
      cx += (x - cx) * 0.18
      cy += (y - cy) * 0.18
      if (ref.current) ref.current.style.transform = `translate(${cx}px, ${cy}px)`
      raf = requestAnimationFrame(loop)
    }
    const on = (e) => {
      x = e.clientX
      y = e.clientY
      const t = e.target.closest?.('[data-cursor]')
      setLabel(t ? t.getAttribute('data-cursor') : '')
    }
    addEventListener('pointermove', on, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      removeEventListener('pointermove', on)
      cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[65] hidden md:block">
      <div
        className={`-ml-10 -mt-10 grid h-20 w-20 place-items-center rounded-full bg-amber text-xs font-semibold uppercase tracking-wider text-ink transition-[transform,opacity] duration-300 ${
          label ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        {label}
      </div>
    </div>
  )
}

/* ---------- Text that rises line by line from behind a mask ---------- */

export function MaskLines({ lines, className = '', lineClass = '', delay = 0 }) {
  return (
    <span className={`reveal-mask block ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <span className={`mask-line block ${lineClass}`} style={{ transitionDelay: `${delay + i * 110}ms` }}>
            {l}
          </span>
        </span>
      ))}
    </span>
  )
}
