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
  return (
    <section className="relative h-[612px] overflow-hidden bg-ink text-white md:h-[min(760px,85vh)]">
      <img src={hero.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="relative mx-auto h-full max-w-6xl px-[25px]">
        <p className="italic-serif absolute left-[26px] top-[105px] w-[215px] text-xs font-bold leading-[15px] md:top-24 md:w-72 md:text-sm">
          {hero.tagline}
        </p>
        <nav
          aria-label="Explore the archive"
          className="glass absolute right-[27px] top-[174px] w-[198px] rounded-2xl bg-ink/40 p-6 md:top-[200px]"
        >
          <ul className="flex flex-col gap-2">
            {categories.map((c) => (
              <li key={c.id}>
                <a href={`#/#${c.id}`} className="flex items-center gap-[10px] rounded-lg p-2 text-sm font-medium uppercase leading-[18px] transition hover:bg-white/10">
                  <ArrowUpRight />
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <h1 className="absolute bottom-[50px] left-[25px] w-[350px] font-display text-[52px] font-normal leading-[52px] md:w-auto md:text-[88px] md:leading-[88px]">
          {hero.title.map((line) => (
            <span key={line} className="block">
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
    <section id={id} aria-labelledby={`${id}-title`} className="relative h-[200px] scroll-mt-[58px] bg-ink text-white md:h-[280px]">
      <TornEdge color="#fff" height={32} />
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.6)_0%,rgba(0,0,0,.42)_41%,rgba(0,0,0,0)_100%)]" />
      <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center gap-1 px-6">
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
    <div className="font-display text-[42px] font-medium leading-[50px]">
      <p>{first}</p>
      <div className="mt-1 flex items-center gap-4">
        <p className="italic-serif w-[188px] text-xs font-normal leading-[17px] text-ink/70 sm:w-[220px]">{aside}</p>
        <p>{word}</p>
      </div>
      <p className="mt-1">{last}</p>
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
          {photography.map((p) => (
            <Link key={p.slug} to={`/photography/${p.slug}`} className="group block">
              <div className="picture-frame mx-auto aspect-[353/438] max-w-[353px] bg-white p-[17px] transition group-hover:-translate-y-1">
                <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
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
  return (
    <div className="no-scrollbar mt-6 overflow-x-auto pb-6">
      <ul className="mx-auto flex w-max items-start gap-0 px-2 pt-2 md:gap-8" aria-label="More photographs from the archive">
        {photoStrip.map((src, i) => (
          <li key={src} className={`relative shrink-0 pt-6 ${i === 0 ? '-ml-[120px] md:ml-0' : '-ml-1'}`}>
            <Tape className="left-1/2 top-0 -translate-x-1/2" />
            <div className={`w-[127px] bg-white px-[6px] pb-[6px] pt-10 shadow-card ${tilts[i]}`}>
              <img src={src} alt="" loading="lazy" className="aspect-[111/96] w-full object-cover" />
            </div>
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
            <article key={m.era} className="relative">
              <p className="px-[26px] font-mono text-xs leading-4 text-ink/80">{m.era}</p>
              <div className="mt-4 flex h-[163px] items-center justify-center gap-3">
                <img src={m.left} alt="" loading="lazy" className="h-[120px] w-[120px] shrink-0 rounded-r-[6.5px] object-cover shadow-album" />
                <div className="group relative h-[163px] w-[230px] shrink-0">
                  <img src={vinyl} alt="" className="vinyl-spin absolute right-0 top-0 h-[163px] w-[163px]" />
                  <img
                    src={m.cover}
                    alt={`${m.title} by ${m.artist}, album cover`}
                    loading="lazy"
                    className="relative h-[163px] w-[163px] rounded-l-[9px] object-cover shadow-album transition-transform group-hover:-translate-x-2"
                  />
                </div>
                <img src={m.right} alt="" loading="lazy" className="h-[120px] w-[120px] shrink-0 rounded-l-[6.5px] object-cover shadow-album" />
              </div>
              <div className="mt-[19px] text-center">
                <h3 className="font-display text-base font-medium leading-[19px]">{m.title}</h3>
                <p className="mt-1 text-sm leading-[18px] text-ink/80">{m.artist}</p>
              </div>
            </article>
          ))}
        </div>
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
    <Link to={`/fashion/${item.slug}`} className="group flex w-[174px] flex-col gap-4 pt-[41px] md:pt-12">
      <div>
        <h3 className="font-display text-[32px] font-medium leading-[38px] group-hover:underline">{item.title}</h3>
        <p className="mt-1 whitespace-nowrap text-base leading-[21px] text-ink/70">{item.date}</p>
      </div>
      <ClippedPhoto src={a} alt={`${item.title} cloth`} />
      <p className="italic-serif text-xs leading-[15px] text-indigo">{item.caption}</p>
    </Link>
  )
  const stack = (
    <Link to={`/fashion/${item.slug}`} className="flex w-[169px] flex-col gap-3" aria-label={`More about ${item.title}`}>
      <ClippedPhoto src={b} alt="" />
      <ClippedPhoto src={c} alt="" />
    </Link>
  )
  return (
    <article className="flex justify-between gap-[7px] md:flex-1 md:justify-center">
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
        <Link to={`/design/${festac.slug}`} className="group block">
          <div className="relative flex min-h-[293px] items-center justify-between">
            <h3 className="w-[120px] pl-3 font-display text-[32px] font-medium leading-[38px] group-hover:underline">{festac.title}</h3>
            <div className="relative mr-1 pt-[26px]">
              <Tape className="left-1/2 top-0 -translate-x-1/2" />
              <div className="w-[217px] -rotate-[4deg] bg-white p-3 shadow-card transition group-hover:-rotate-2">
                <img src={festac.image} alt="The FESTAC ’77 poster" className="aspect-[192/242] w-full object-cover" />
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
  return item.slug ? (
    <Link to={`/design/${item.slug}`} className={`${cls} transition hover:-translate-y-1`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  )
}
