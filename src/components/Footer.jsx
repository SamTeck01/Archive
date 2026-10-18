import { Link } from 'react-router-dom'
import { categories, footer } from '../data'
import { TornEdge } from './ui'

export default function Footer() {
  return (
    <footer id="about" className="relative bg-ink text-white">
      <TornEdge color="#14110f" strip />
      <div className="mx-auto max-w-6xl px-[27px] pt-24 md:pt-28">
        <div className="max-w-[332px] md:max-w-md">
          <p className="font-display text-base leading-[19px]">{footer.tagline}</p>
          <p className="mt-3 text-xs leading-4 text-white/60">{footer.blurb}</p>
          <p className="mt-6 text-xs text-white/40">© {new Date().getFullYear()} Archive</p>
        </div>
        <div className="mt-[149px] flex gap-[40px] md:mt-24 md:gap-32">
          <FooterList title="EXPLORE">
            {categories.map((c) => (
              <Link key={c.id} to={`/#${c.id}`} className="block p-2 transition hover:translate-x-1 hover:text-white">
                {c.label}
              </Link>
            ))}
          </FooterList>
          <FooterList title="ABOUT">
            {footer.about.map((a) => (
              <Link key={a.to} to={a.to} className="block whitespace-nowrap p-2 transition hover:translate-x-1 hover:text-white">
                {a.label}
              </Link>
            ))}
          </FooterList>
        </div>
      </div>
      <div className="reveal overflow-hidden !translate-y-0 !opacity-100">
      <p
        aria-hidden="true"
        className="italic-serif mt-[211px] -mb-[0.32em] select-none whitespace-nowrap text-center text-[100px] font-semibold leading-[123px] md:mt-40 md:text-[20vw] md:leading-none"
      >
        {'ARCHIVE'.split('').map((ch, i) => (
          <span key={i} className="letter" style={{ transitionDelay: `${i * 70}ms` }}>
            {ch}
          </span>
        ))}
      </p>
      </div>
    </footer>
  )
}

function FooterList({ title, children }) {
  return (
    <div className="w-[150px] shrink-0 sm:w-[170px]">
      <h2 className="text-lg font-medium leading-[23px]">{title}</h2>
      <div className="mt-2 flex flex-col gap-[7px] text-base font-medium leading-[21px] text-white/60">{children}</div>
    </div>
  )
}
