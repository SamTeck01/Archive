import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { categories, footer } from '../data'
import { ArrowUpRight, MenuIcon } from './ui'
import { SavedLink, SearchDialog, SearchIcon } from './extras'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const last = useRef(0)
  const { pathname, hash } = useLocation()

  useEffect(() => setOpen(false), [pathname, hash])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearch(true)
      }
      if (e.key === '/' && !/input|textarea/i.test(document.activeElement?.tagName)) {
        e.preventDefault()
        setSearch(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Hide the bar while scrolling down, bring it back on any upward scroll.
  useEffect(() => {
    const on = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      setHidden(y > 300 && y > last.current + 4)
      if (y < last.current - 4 || y <= 300) setHidden(false)
      last.current = y
    }
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur transition-all duration-300 ${hidden && !open ? '-translate-y-full' : ''} ${
          scrolled ? 'shadow-[0_1px_0_rgba(20,17,15,.08)]' : ''
        }`}
      >
        <div className="mx-auto flex h-[58px] max-w-6xl items-center justify-between px-[26px]">
          <Link to="/" className="group font-display text-lg font-extrabold leading-[22px] tracking-tight">
            ARCHIVE
            <span className="block h-px origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
          <nav className="hidden gap-8 md:flex" aria-label="Sections">
            {categories.map((c) => (
              <Link key={c.id} to={`/#${c.id}`} className="link-underline text-sm font-medium uppercase">
                {c.label}
              </Link>
            ))}
          </nav>
          <div className="-mr-1 flex items-center gap-2">
            <button type="button" aria-label="Search the archive" onClick={() => setSearch(true)} className="p-1 transition hover:scale-110">
              <SearchIcon />
            </button>
            <SavedLink className="transition hover:scale-110" />
            <button
              type="button"
              className="p-1 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>
        <div
          id="mobile-menu"
          className={`fixed inset-x-0 bottom-0 top-[58px] h-[calc(100dvh-58px)] overflow-y-auto bg-ink text-white transition-[opacity,visibility] duration-300 md:hidden ${
            open ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
          <nav className="flex flex-col gap-2 px-[26px] pt-10" aria-label="Sections">
            {categories.map((c, i) => (
              <Link
                key={c.id}
                to={`/#${c.id}`}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${80 + i * 60}ms` : '0ms' }}
                className={`flex items-center gap-3 py-2 font-display text-[42px] font-medium leading-[50px] transition duration-500 ${
                  open ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
                }`}
              >
                <ArrowUpRight className="h-7 w-7 text-white/60" />
                {c.label}
              </Link>
            ))}
          </nav>
          <nav aria-label="About" className="mt-10 grid grid-cols-2 gap-2 border-t border-white/10 px-[26px] pt-6 text-white/60">
            {footer.about.map((a) => (
              <NavLink key={a.to} to={a.to} className="py-1 hover:text-white">
                {a.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      {search && <SearchDialog onClose={() => setSearch(false)} />}
    </>
  )
}
