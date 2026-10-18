import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-6 py-28 text-center">
      <p className="italic-serif text-[96px] font-semibold leading-none text-ink/15">404</p>
      <h1 className="mt-4 font-display text-3xl">This piece isn’t in the archive yet.</h1>
      <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-white transition hover:-translate-y-0.5">
        Back to the archive
      </Link>
    </div>
  )
}
