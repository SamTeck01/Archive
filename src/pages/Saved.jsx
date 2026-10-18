import { Link } from 'react-router-dom'
import { details } from '../data'
import { useSaved } from '../hooks/useSaved'
import { SaveButton } from '../components/extras'

export default function Saved() {
  const { saved } = useSaved()
  const items = saved.filter((s) => details[s])

  return (
    <div className="min-h-[60vh] bg-sand px-[25px] pb-24 pt-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-[42px] font-medium leading-[50px]">Your collection</h1>
        <p className="italic-serif mt-2 text-sm text-ink/70">Pieces you’ve saved, kept on this device.</p>
        {items.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-ink/20 p-10 text-center">
            <p className="text-ink/70">Nothing saved yet. Tap the heart on any piece to keep it here.</p>
            <Link to="/#photography" className="mt-6 inline-block rounded-full bg-ink px-5 py-3 text-sm text-white transition hover:-translate-y-0.5">
              Start exploring
            </Link>
          </div>
        ) : (
          <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
            {items.map((slug) => {
              const d = details[slug]
              return (
                <li key={slug} className="animate-rise relative">
                  <Link to={`/${d.category}/${slug}`} className="group block bg-white p-2 shadow-card transition hover:-translate-y-1">
                    <div className="overflow-hidden">
                      <img src={d.thumb || d.image.src} alt="" className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                    <p className="mt-3 font-display text-sm font-medium">{d.title}</p>
                    <p className="text-xs capitalize text-muted">{d.category}</p>
                  </Link>
                  <SaveButton slug={slug} title={d.title} className="absolute right-3 top-3" />
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
