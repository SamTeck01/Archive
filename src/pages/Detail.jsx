import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { categories, details } from '../data'
import { ArrowUpRight, ClippedPhoto } from '../components/ui'

const paper = `${import.meta.env.BASE_URL}images/paper.webp`

export default function Detail() {
  const { category, slug } = useParams()
  const item = details[slug]

  if (!item || item.category !== category) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <p className="font-display text-3xl">This item isn’t in the archive yet.</p>
        <Link to="/" className="mt-6 inline-block underline">
          Back to the archive
        </Link>
      </div>
    )
  }

  const label = categories.find((c) => c.id === category)?.label
  const big = item.size === 'lg'

  return (
    <div className="bg-sand px-0 py-0 sm:px-6 sm:py-12">
      <article
        className="mx-auto max-w-[480px] bg-paper bg-cover bg-top px-6 pb-14 pt-6 sm:rounded-2xl sm:shadow-card"
        style={{ backgroundImage: `url(${paper})` }}
      >
        <Link to={`/#${category}`} className="mb-4 inline-flex items-center gap-1 text-sm text-ink/70 hover:text-ink">
          <span aria-hidden="true">←</span> {label}
        </Link>
        <div className="px-1">
          <header className="flex items-start justify-between gap-[26px]">
            <div className={big ? 'pt-[25px]' : ''}>
              <h1 className={`font-display font-normal ${big ? 'text-5xl leading-[58px]' : 'text-4xl leading-[43px]'}`}>{item.title}</h1>
              <p className="mt-1 text-sm leading-[18px] text-ink/70">
                {item.meta.map((line, i) => (
                  <span key={i} className="block min-h-[18px]">
                    {line}
                  </span>
                ))}
              </p>
            </div>
            {item.thumb && (
              <div className="shrink-0">
                <ClippedPhoto src={item.thumb} alt="" small />
              </div>
            )}
          </header>

          <div className="mt-[21px] space-y-[18px] text-sm leading-[18px] text-ink/70">
            {item.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <figure className="mt-6">
            {item.image.framed ? (
              <div className="picture-frame bg-white p-[13px]">
                <img src={item.image.src} alt={item.image.alt} className="w-full object-cover" style={{ aspectRatio: item.image.ratio }} />
              </div>
            ) : (
              <img src={item.image.src} alt={item.image.alt} className="w-full rounded-lg object-cover" style={{ aspectRatio: item.image.ratio }} />
            )}
          </figure>

          {item.after && <p className="mt-6 text-sm leading-[18px] text-ink/70">{item.after}</p>}

          {item.list && (
            <div className="mt-6">
              <p className="text-sm leading-[18px] text-ink/70">{item.listLabel}</p>
              <ul className="mt-2 space-y-0.5 text-base leading-[21px]">
                {item.list.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <AskGuide title={item.title} />
      </article>
    </div>
  )
}

function AskGuide({ title }) {
  const [q, setQ] = useState('')
  const [sent, setSent] = useState('')
  return (
    <section className="mt-8 border-t border-ink/20 pt-4">
      <h2 className="italic-serif text-base font-semibold leading-5 text-black">Wanna know more?</h2>
      <form
        className="glass mt-[5px] flex h-14 items-center justify-between rounded-full bg-indigo/10 py-2 pl-3 pr-2"
        onSubmit={(e) => {
          e.preventDefault()
          if (q.trim()) setSent(q.trim())
          setQ('')
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
          className="min-w-0 flex-1 bg-transparent px-1 text-base leading-[21px] placeholder:text-muted focus:outline-none"
        />
        <button type="submit" aria-label="Ask" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white transition hover:bg-sand">
          <ArrowUpRight />
        </button>
      </form>
      {sent && (
        <p role="status" className="mt-3 text-sm leading-[18px] text-ink/70">
          Thanks for asking “{sent}”. The museum guide isn’t connected yet, so answers will appear here once it is.
        </p>
      )}
    </section>
  )
}
