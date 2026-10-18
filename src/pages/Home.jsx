import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  bannerSubtitle,
  banners,
  categories,
  designColumns,
  fashion,
  festac,
  hero,
  music,
  photoStrip,
  photography,
  vinyl,
} from '../data'
import { ArrowUpRight, ClippedPhoto, Tape, TornEdge } from '../components/ui'
import { SaveButton, Tilt, useLightbox } from '../components/extras'
import { toggleTrack, useTrack } from '../hooks/usePlayer'
import { useSaved } from '../hooks/useSaved'

const SAND = '#f2ebdd'

export default function Home() {
  return (
    <>
      <Hero />
      <Banner id="photography" {...banners.photography} />
      <Photography />
      <Banner id="music" {...banners.music} />
      <Music />
      <Banner id="fashion" {...banners.fashion} />
      <Fashion />
      <Banner id="design" {...banners.design} />
      <Design />
    </>
  )
}

function Hero() {
  const bg = useRef(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const on = () => bg.current && (bg.current.style.transform = `translateY(${Math.min(scrollY, 700) * 0.3}px) scale(1.06)`)
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  return (
    <section className="relative h-[612px] overflow-hidden bg-ink text-white md:h-[min(760px,85vh)]">
      <img ref={bg} src={hero.image} alt="" className="absolute inset-0 h-full w-full object-cover will-change-transform" />
      <div className="relative mx-auto h-full max-w-6xl px-[25px]">
        <p style={{ animationDelay: '100ms' }} className="hero-line italic-serif absolute left-[26px] top-[105px] w-[215px] text-xs font-bold leading-[15px] md:top-24 md:w-72 md:text-sm">
          {hero.tagline}
        </p>
        <nav
          aria-label="Explore the archive"
          style={{ animationDelay: '250ms' }}
          className="hero-line glass absolute right-[27px] top-[174px] w-[198px] rounded-2xl bg-ink/40 p-6 md:top-[200px]"
        >
          <ul className="flex flex-col gap-2">
            {categories.map((c) => (
              <li key={c.id}>
                <a href={`#/#${c.id}`} className="group flex items-center gap-[10px] rounded-lg p-2 text-sm font-medium uppercase leading-[18px] transition hover:bg-white/10">
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" />
                  <span className="transition-transform group-hover:translate-x-1">{c.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <h1 className="absolute bottom-[50px] left-[25px] w-[350px] font-display text-[52px] font-normal leading-[52px] md:w-auto md:text-[88px] md:leading-[88px]">
          {hero.title.map((line, i) => (
            <span key={line} className="hero-line block" style={{ animationDelay: `${400 + i * 140}ms` }}>
              {line}
            </span>
          ))}
        </h1>
      </div>
    </section>
  )
}

function Banner({ id, title, image }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="group relative h-[200px] scroll-mt-[58px] overflow-x-clip bg-ink text-white md:h-[280px]">
      <TornEdge color="#fff" height={32} />
      <div className="reveal absolute inset-0 overflow-hidden !translate-y-0 !opacity-100">
        <img src={image} alt="" className="kenburns h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.6)_0%,rgba(0,0,0,.42)_41%,rgba(0,0,0,0)_100%)]" />
      <div className="reveal relative mx-auto flex h-full max-w-6xl flex-col justify-center gap-1 px-6">
        <h2 id={`${id}-title`} className="text-[28px] font-semibold leading-9 md:text-4xl">
          {title}
        </h2>
        <p className="italic-serif text-xs font-semibold leading-[15px]">{bannerSubtitle}</p>
      </div>
    </section>
  )
}

function Heading({ first, aside, word, last }) {
  return (
    <div className="reveal reveal-mask font-display text-[42px] font-medium leading-[50px]">
      <span className="block overflow-hidden"><span className="mask-line block">{first}</span></span>
      <div className="mt-1 flex items-center gap-4">
        <p className="italic-serif w-[188px] text-xs font-normal leading-[17px] text-ink/70 transition-opacity delay-500 duration-1000 sm:w-[220px]">{aside}</p>
        <span className="block overflow-hidden"><span className="mask-line block" style={{ transitionDelay: '120ms' }}>{word}</span></span>
      </div>
      <span className="mt-1 block overflow-hidden"><span className="mask-line block" style={{ transitionDelay: '240ms' }}>{last}</span></span>
    </div>
  )
}

function Photography() {
  return (
    <section className="relative bg-sand pb-16 pt-16">
      <TornEdge color={SAND} height={53} strip />
      <div className="mx-auto max-w-6xl px-[25px]">
        <h2 className="sr-only">Preserving our memories</h2>
        <div className="px-1">
          <Heading
            first="Preserving"
            aside="Every image is a connection to our past. Explore the photographs that preserve our heritage, celebrate our diversity, and keep our stories alive."
            word="our"
            last="Memories"
          />
        </div>
        <div className="mt-[49px] grid gap-6 md:grid-cols-3">
          {photography.map((p, i) => (
            <Link key={p.slug} to={`/photography/${p.slug}`} className="reveal group relative block" data-cursor="View" style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="picture-frame relative mx-auto aspect-[353/438] max-w-[353px] bg-white p-[17px] transition duration-500 group-hover:-translate-y-1.5 group-hover:shadow-2xl">
                <div className="h-full w-full overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                </div>
                <SaveButton slug={p.slug} title={p.title} className="absolute right-5 top-5 opacity-90 md:opacity-0 md:group-hover:opacity-100" />
              </div>
              <div className="mx-auto mt-3 max-w-[353px]">
                <h3 className="font-display text-2xl font-medium leading-[29px] group-hover:underline">{p.title}</h3>
                <p className="mt-1 text-xs leading-4 text-muted">{p.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <PhotoStrip />
    </section>
  )
}

function PhotoStrip() {
  const tilts = ['rotate-2', 'rotate-2', 'rotate-2', '-rotate-2', '-rotate-2']
  const open = useLightbox()
  const loop = [...photoStrip, ...photoStrip, ...photoStrip, ...photoStrip]
  return (
    <div className="mt-6 overflow-hidden pb-6">
      <ul className="marquee flex w-max items-start pt-2" aria-label="More photographs from the archive">
        {loop.map((src, i) => (
          <li key={i} className="relative -ml-1 shrink-0 pt-6" aria-hidden={i >= photoStrip.length || undefined}>
            <Tape className="left-1/2 top-0 -translate-x-1/2" />
            <button
              type="button"
              tabIndex={i >= photoStrip.length ? -1 : undefined}
              onClick={() => open(src, 'From the photography archive')}
              aria-label="Enlarge photograph"
              className={`block w-[127px] cursor-zoom-in bg-white px-[6px] pb-[6px] pt-10 shadow-card transition duration-300 hover:z-10 hover:rotate-0 hover:scale-110 ${tilts[i % 5]}`}
            >
              <img src={src} alt="" loading="lazy" className="aspect-[111/96] w-full object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Music() {
  return (
    <section className="relative bg-white pb-[52px] pt-[82px]">
      <TornEdge color="#fff" height={40} />
      <div className="mx-auto max-w-6xl overflow-hidden">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-14">
          {music.map((m) => (
            <Record key={m.era} m={m} />
          ))}
        </div>
        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-wider text-muted">Tap a record to play a preview · Previews courtesy of Apple Music</p>
        <div className="mt-[49px] px-[26px] md:mt-20">
          <h2 className="sr-only">Music and heritage</h2>
          <Heading
            first="Music"
            aside={
              <>
                Discover Nigeria’s music, artists, <br />
                and timeless traditions connecting <br />
                generations across the world.
              </>
            }
            word="&"
            last="Heritage"
          />
        </div>
      </div>
    </section>
  )
}

function Record({ m }) {
  const track = useTrack(m.key)
  const { notify } = useSaved()
  const playing = track.state === 'playing'
  const loading = track.state === 'loading'
  const play = () =>
    toggleTrack(m, () => notify(`Couldn’t load a preview of ${m.title} right now`))
  return (
    <article id={`music-${m.key}`} className="reveal relative scroll-mt-24">
      <p className="px-[26px] font-mono text-xs leading-4 text-ink/80">{m.era}</p>
      <div className="mt-4 flex h-[163px] items-center justify-center gap-3">
        <img src={m.left} alt="" loading="lazy" className="h-[120px] w-[120px] shrink-0 rounded-r-[6.5px] object-cover shadow-album transition hover:-translate-y-1" />
        <button
          type="button"
          aria-pressed={playing}
          aria-label={`${playing ? 'Pause' : 'Play'} a preview of ${m.title} by ${m.artist}`}
          onClick={play}
          data-cursor={playing ? 'Pause' : 'Play'}
          className="group relative h-[163px] w-[230px] shrink-0"
        >
          <img
            src={vinyl}
            alt=""
            className={`vinyl-spin absolute right-0 top-0 h-[163px] w-[163px] ${playing ? 'is-playing' : ''}`}
            style={{ translate: playing ? '28px 0' : '0 0', transition: 'translate .5s cubic-bezier(.2,.7,.2,1)' }}
          />
          <span className="relative block h-[163px] w-[163px]">
            <img
              src={m.cover}
              alt={`${m.title} by ${m.artist}, album cover`}
              loading="lazy"
              className={`h-full w-full rounded-l-[9px] object-cover shadow-album transition-transform duration-500 ${playing ? '-translate-x-4 -rotate-2' : 'group-hover:-translate-x-2'}`}
            />
            <span
              className={`absolute inset-0 grid place-items-center transition-opacity duration-300 ${playing || loading ? 'opacity-0' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'}`}
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 shadow-lg">
                <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
              </span>
            </span>
            {loading && (
              <span className="absolute inset-0 grid place-items-center">
                <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              </span>
            )}
          </span>
        </button>
        <img src={m.right} alt="" loading="lazy" className="h-[120px] w-[120px] shrink-0 rounded-l-[6.5px] object-cover shadow-album transition hover:-translate-y-1" />
      </div>
      <div className="mt-[19px] text-center">
        <h3 className="font-display text-base font-medium leading-[19px]">{m.title}</h3>
        <p className="mt-1 text-sm leading-[18px] text-ink/80">{m.artist}</p>
        <div className={`mx-auto mt-2 flex h-5 w-[180px] items-center gap-2 transition-opacity ${playing ? 'opacity-100' : 'opacity-0'}`} aria-hidden={!playing}>
          <span className="flex h-3 items-end gap-[2px]">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="eq-bar w-[3px] rounded-sm bg-amber" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </span>
          <span className="h-[2px] flex-1 overflow-hidden rounded bg-ink/10">
            <span className="block h-full origin-left bg-amber" style={{ transform: `scaleX(${track.progress})` }} />
          </span>
          {track.info?.link && (
            <a href={track.info.link} target="_blank" rel="noreferrer" className="font-mono text-[9px] uppercase text-muted hover:text-ink" tabIndex={playing ? 0 : -1}>
              Apple Music
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

function Fashion() {
  return (
    <section className="relative bg-sand pb-[106px] pt-[71px]">
      <TornEdge color={SAND} height={43} />
      <div className="mx-auto flex max-w-[402px] flex-col gap-9 px-[23px] md:max-w-5xl md:flex-row md:gap-8">
        {fashion.map((f, i) => (
          <FashionRow key={f.slug} item={f} reverse={i === 1} />
        ))}
      </div>
    </section>
  )
}

function FashionRow({ item, reverse }) {
  const [a, b, c] = item.images
  const intro = (
    <Link to={`/fashion/${item.slug}`} data-cursor="Read" className="group flex w-[174px] flex-col gap-4 pt-[41px] md:pt-12">
      <div>
        <h3 className="font-display text-[32px] font-medium leading-[38px] group-hover:underline">{item.title}</h3>
        <p className="mt-1 whitespace-nowrap text-base leading-[21px] text-ink/70">{item.date}</p>
      </div>
      <div className="origin-top transition-transform duration-500 group-hover:rotate-2">
        <ClippedPhoto src={a} alt={`${item.title} cloth`} />
      </div>
      <p className="italic-serif text-xs leading-[15px] text-indigo">{item.caption}</p>
    </Link>
  )
  const stack = (
    <Link to={`/fashion/${item.slug}`} className="flex w-[169px] flex-col gap-3" aria-label={`More about ${item.title}`}>
      <div className="origin-top transition-transform duration-500 hover:-rotate-2">
        <ClippedPhoto src={b} alt="" />
      </div>
      <div className="origin-top transition-transform duration-500 hover:rotate-2">
        <ClippedPhoto src={c} alt="" />
      </div>
    </Link>
  )
  return (
    <article className="reveal flex justify-between gap-[7px] md:flex-1 md:justify-center">
      {reverse ? (
        <>
          {stack}
          {intro}
        </>
      ) : (
        <>
          {intro}
          {stack}
        </>
      )}
    </article>
  )
}

function Design() {
  return (
    <section className="relative bg-white pb-[112px] pt-[74px]">
      <TornEdge color="#fff" height={30} />
      <div className="mx-auto max-w-[402px] px-[22px] md:max-w-3xl">
        <Link to={`/design/${festac.slug}`} className="reveal group block" data-cursor="Open">
          <div className="relative flex min-h-[293px] items-center justify-between">
            <h3 className="w-[120px] pl-3 font-display text-[32px] font-medium leading-[38px] group-hover:underline">{festac.title}</h3>
            <div className="relative mr-1 pt-[26px]">
              <Tape className="left-1/2 top-0 -translate-x-1/2" />
              <div className="float">
              <div className="w-[217px] -rotate-[4deg] bg-white p-3 shadow-card transition duration-500 group-hover:-rotate-1 group-hover:scale-105">
                <img src={festac.image} alt="The FESTAC ’77 poster" className="aspect-[192/242] w-full object-cover" />
              </div>
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-[313px] pl-[6px] text-xs leading-4 text-ink/80">{festac.caption}</p>
        </Link>
        <div className="mt-[49px] flex justify-between gap-3 md:justify-center md:gap-6">
          {designColumns.map((col, i) => (
            <div key={i} className={`flex w-[169px] flex-col gap-4 md:w-[220px] ${i === 0 ? 'pt-[47px]' : ''}`}>
              {col.map((d) => (
                <DesignCard key={d.title} item={d} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DesignCard({ item }) {
  const body = (
    <>
      <img src={item.image} alt={item.title} loading="lazy" className="aspect-[153/180] w-full object-cover" />
      <h4 className="mt-4 font-display text-sm font-medium leading-[17px]">{item.title}</h4>
      <p className="mt-1.5 flex items-end justify-between">
        <span className="text-xs leading-4 text-muted">{item.year}</span>
        <span className="text-[8px] leading-[10px] text-amber">{item.tag}</span>
      </p>
    </>
  )
  const cls = 'block bg-white p-2 shadow-card'
  return (
    <Tilt className="reveal">
      {item.slug ? (
        <Link to={`/design/${item.slug}`} className={cls} data-cursor="Open">
          {body}
        </Link>
      ) : (
        <div className={cls}>{body}</div>
      )}
    </Tilt>
  )
}
