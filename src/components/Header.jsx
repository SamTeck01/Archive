import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { categories } from '../data'
import { ArrowUpRight, MenuIcon } from './ui'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="mx-auto flex h-[58px] max-w-6xl items-center justify-between px-[26px]">
        <Link to="/" className="font-display text-lg font-extrabold leading-[22px] tracking-tight">
          ARCHIVE
        </Link>
        <nav className="hidden gap-8 md:flex" aria-label="Sections">
          {categories.map((c) => (
            <Link key={c.id} to={`/#${c.id}`} className="text-sm font-medium uppercase hover:text-muted">
              {c.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="-mr-1 p-1 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <MenuIcon open={open} />
        </button>
      </div>
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[58px] bg-ink text-white md:hidden">
          <nav className="flex flex-col gap-2 px-[26px] pt-10" aria-label="Sections">
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/#${c.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-2 font-display text-[42px] font-medium leading-[50px]"
              >
                <ArrowUpRight className="h-7 w-7 text-white/60" />
                {c.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
