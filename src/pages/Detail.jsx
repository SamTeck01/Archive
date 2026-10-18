import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { categories, details } from '../data'
import { askGuide, suggestions } from '../guide'
import { ArrowUpRight, ClippedPhoto } from '../components/ui'
import { SaveButton, Zoomable } from '../components/extras'
import NotFound from './NotFound'

const paper = `${import.meta.env.BASE_URL}images/paper.webp`

export default function Detail() {
  const { category, slug } = useParams()
  const item = details[slug]

  useEffect(() => {
    if (item) document.title = `${item.title} · Archive`
    return () => (document.title = 'Archive · Nigerian creative heritage')
  }, [item])

  if (!item || item.category !== category) return <NotFound />

  const label = categories.find((c) => c.id === category)?.label
  const big = item.size === 'lg'
  const siblings = Object.entries(details).filter(([, d]) => d.category === category)
  const i = siblings.findIndex(([s]) => s === slug)
  const prev = siblings[(i - 1 + siblings.length) % siblings.length]
  const next = siblings[(i + 1) % siblings.length]

  return (
    <div className="bg-sand px-0 py-0 sm:px-6 sm:py-12">
      <article
        className="mx-auto max-w-[480px] bg-paper bg-cover bg-top px-6 pb-14 pt-6 sm:rounded-2xl sm:shadow-card"
        style={{ backgroundImage: `url(${paper})` }}
      >
        <div className="mb-4 flex items-center justify-between">
          <Link to={`/#${category}`} className="group inline-flex items-center gap-1 text-sm text-ink/70 hover:text-ink">
            <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">
              ←
            </span>{' '}
            {label}
          </Link>
          <SaveButton slug={slug} title={item.title} />
        </div>
        <div className="px-1">
          <header className="flex items-start justify-between gap-[26px]">
            <div className={big ? 'pt-[25px]' : ''}>
              <h1 className={`animate-rise font-display font-normal ${big ? 'text-5xl leading-[58px]' : 'text-4xl leading-[43px]'}`}>{item.title}</h1>
              <p className="mt-1 text-sm leading-[18px] text-ink/70">
                {item.meta.map((line, i) => (
                  <span key={i} className="block min-h-[18px]">
                    {line}
                  </span>
                ))}
              </p>
            </div>
            {item.thumb && (
              <div className="animate-swing shrink-0 origin-top">
                <ClippedPhoto src={item.thumb} alt="" small />
              </div>
            )}
          </header>

          <div className="reveal mt-[21px] space-y-[18px] text-sm leading-[18px] text-ink/70">
            {item.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <figure className="reveal mt-6">
            {item.image.framed ? (
              <div className="picture-frame bg-white p-[13px]">
                <Zoomable src={item.image.src} alt={item.image.alt} className="w-full object-cover" style={{ aspectRatio: item.image.ratio }} />
              </div>
            ) : (
              <div className="overflow-hidden rounded-lg">
                <Zoomable
                  src={item.image.src}
                  alt={item.image.alt}
                  className="w-full object-cover transition duration-700 hover:scale-105"
                  style={{ aspectRatio: item.image.ratio }}
                />
              </div>
            )}
            <figcaption className="mt-2 text-xs text-muted">Tap the image to enlarge</figcaption>
          </figure>

          {item.after && <p className="reveal mt-6 text-sm leading-[18px] text-ink/70">{item.after}</p>}

          {item.list && (
            <div className="reveal mt-6">
              <p className="text-sm leading-[18px] text-ink/70">{item.listLabel}</p>
              <ul className="mt-2 space-y-0.5 text-base leading-[21px]">
                {item.list.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <AskGuide key={slug} slug={slug} title={item.title} category={category} />

        <nav aria-label={`More ${label}`} className="mt-10 grid grid-cols-2 gap-3 text-sm">
          <Link to={`/${category}/${prev[0]}`} className="group rounded-xl border border-ink/10 p-3 transition hover:border-ink/40">
            <span className="text-xs text-muted">← Previous</span>
            <span className="mt-1 block font-display text-base group-hover:underline">{prev[1].title}</span>
          </Link>
          <Link to={`/${category}/${next[0]}`} className="group rounded-xl border border-ink/10 p-3 text-right transition hover:border-ink/40">
            <span className="text-xs text-muted">Next →</span>
            <span className="mt-1 block font-display text-base group-hover:underline">{next[1].title}</span>
          </Link>
        </nav>
      </article>
    </div>
  )
}

function AskGuide({ slug, title, category }) {
  const [q, setQ] = useState('')
  const [msgs, setMsgs] = useState([])
  const [thinking, setThinking] = useState(false)
  const end = useRef(null)

  useEffect(() => {
    if (msgs.length) end.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [msgs, thinking])

  const ask = (text) => {
    const question = text.trim()
    if (!question || thinking) return
    setMsgs((m) => [...m, { from: 'you', text: question }])
    setQ('')
    setThinking(true)
    setTimeout(() => {
      setMsgs((m) => [...m, { from: 'guide', ...askGuide(question, slug) }])
      setThinking(false)
    }, 600 + Math.random() * 500)
  }

  return (
    <section className="mt-8 border-t border-ink/20 pt-4" aria-label="Museum guide">
      <h2 className="italic-serif text-base font-semibold leading-5 text-black">Wanna know more?</h2>

      {msgs.length > 0 && (
        <ol className="mt-3 space-y-2" aria-live="polite">
          {msgs.map((m, i) => (
            <li key={i} className={`animate-rise flex ${m.from === 'you' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-[18px] ${m.from === 'you' ? 'rounded-br-sm bg-ink text-white' : 'rounded-bl-sm bg-white/80 text-ink shadow-sm'}`}>
                {m.text}
                {m.related && (
                  <Link to={`/${details[m.related.slug].category}/${m.related.slug}`} className="mt-1 block font-medium text-indigo underline">
                    Read about {m.related.title} →
                  </Link>
                )}
              </div>
            </li>
          ))}
          {thinking && (
            <li className="flex">
              <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-white/80 px-4 py-3 shadow-sm" aria-label="The guide is typing">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${d * 120}ms` }} />
                ))}
              </div>
            </li>
          )}
          <li ref={end} aria-hidden="true" />
        </ol>
      )}

      {msgs.length === 0 && (
        <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto">
          {suggestions[category].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => ask(s)}
              className="shrink-0 rounded-full border border-ink/15 bg-white/50 px-3 py-1 text-xs transition hover:-translate-y-0.5 hover:border-ink/40"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        className="glass mt-3 flex h-14 items-center justify-between rounded-full bg-indigo/10 py-2 pl-3 pr-2 transition focus-within:ring-2 focus-within:ring-indigo/30"
        onSubmit={(e) => {
          e.preventDefault()
          ask(q)
        }}
      >
        <label htmlFor="ask" className="sr-only">
          Ask the museum guide about {title}
        </label>
        <input
          id="ask"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask the museum guide"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent px-1 text-base leading-[21px] placeholder:text-muted focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Ask"
          disabled={!q.trim() || thinking}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white transition hover:rotate-45 hover:bg-sand disabled:opacity-60 disabled:hover:rotate-0"
        >
          <ArrowUpRight />
        </button>
      </form>
    </section>
  )
}
