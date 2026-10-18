import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { categories, footer, infoPages } from '../data'
import { useSaved } from '../hooks/useSaved'
import NotFound from './NotFound'

export default function Info() {
  const { page } = useParams()
  const p = infoPages[page]
  useEffect(() => {
    if (p) document.title = `${p.title} · Archive`
  }, [p])
  if (!p) return <NotFound />

  return (
    <div className="bg-sand px-[25px] pb-24 pt-12">
      <div className="mx-auto max-w-2xl">
        <nav aria-label="About pages" className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto pb-6">
          {footer.about.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              aria-current={a.to.endsWith(page) ? 'page' : undefined}
              className={`shrink-0 rounded-full border px-3 py-1 text-sm transition ${a.to.endsWith(page) ? 'border-ink bg-ink text-white' : 'border-ink/15 hover:border-ink/40'}`}
            >
              {a.label}
            </Link>
          ))}
        </nav>
        <h1 className="animate-rise font-display text-[42px] font-medium leading-[50px]">{p.title}</h1>
        <p className="italic-serif mt-3 text-base leading-6 text-ink/70">{p.lead}</p>

        {p.sections && (
          <div className="mt-10 space-y-8">
            {p.sections.map(([h, t], i) => {
              const cat = categories.find((c) => c.label === h)
              return (
                <section key={h} className="reveal border-t border-ink/15 pt-6" style={{ transitionDelay: `${i * 60}ms` }}>
                  <h2 className="font-display text-2xl font-medium">{h}</h2>
                  <p className="mt-2 text-sm leading-6 text-ink/70">{t}</p>
                  {cat && (
                    <Link to={`/#${cat.id}`} className="link-underline mt-2 inline-block text-sm font-medium">
                      Explore {h.toLowerCase()} →
                    </Link>
                  )}
                </section>
              )
            })}
          </div>
        )}

        {p.form && <MessageForm kind={p.form} />}
      </div>
    </div>
  )
}

const FIELDS = {
  contribute: [
    { name: 'name', label: 'Your name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'collection', label: 'Collection', options: ['Photography', 'Music', 'Fashion', 'Design'], required: true },
    { name: 'era', label: 'Roughly when is it from?', placeholder: 'e.g. 1970s' },
    { name: 'message', label: 'Tell us its story', textarea: true, required: true, min: 20 },
  ],
  contact: [
    { name: 'name', label: 'Your name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'message', label: 'Message', textarea: true, required: true, min: 10 },
  ],
}

function validate(fields, v) {
  const e = {}
  fields.forEach((f) => {
    const val = (v[f.name] || '').trim()
    if (f.required && !val) e[f.name] = `${f.label} is required`
    else if (f.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) e[f.name] = 'Enter a valid email address'
    else if (f.min && val.length < f.min) e[f.name] = `Please write at least ${f.min} characters`
  })
  return e
}

// No server is attached yet, so messages are kept on this device until one is.
function MessageForm({ kind }) {
  const fields = FIELDS[kind]
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [state, setState] = useState('idle')
  const { notify } = useSaved()

  const set = (name, val) => {
    const next = { ...values, [name]: val }
    setValues(next)
    if (touched[name]) setErrors(validate(fields, next))
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = validate(fields, values)
    setErrors(errs)
    setTouched(Object.fromEntries(fields.map((f) => [f.name, true])))
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    setState('sending')
    setTimeout(() => {
      try {
        const key = `archive:${kind}`
        const prev = JSON.parse(localStorage.getItem(key) || '[]')
        localStorage.setItem(key, JSON.stringify([...prev, { ...values, at: new Date().toISOString() }]))
      } catch {
        /* storage unavailable */
      }
      setState('sent')
      requestAnimationFrame(() => document.getElementById('form-top')?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
      notify(kind === 'contribute' ? 'Thanks! Your contribution was received.' : 'Thanks! Your message was received.')
    }, 900)
  }

  if (state === 'sent')
    return (
      <div id="form-top" className="animate-rise mt-10 rounded-2xl bg-white p-8 text-center shadow-card">
        <svg viewBox="0 0 52 52" className="mx-auto h-14 w-14" aria-hidden="true">
          <circle cx="26" cy="26" r="24" fill="none" stroke="#f2a900" strokeWidth="2" />
          <path className="animate-draw" d="M15 27l7 7 15-16" fill="none" stroke="#14110f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2 className="mt-4 font-display text-2xl">Thank you, {values.name?.split(' ')[0]}.</h2>
        <p className="mt-2 text-sm text-ink/70">We’ve noted your {kind === 'contribute' ? 'contribution' : 'message'} and will reply to {values.email}.</p>
        <button
          type="button"
          onClick={() => (setValues({}), setTouched({}), setErrors({}), setState('idle'))}
          className="link-underline mt-6 text-sm font-medium"
        >
          Send another
        </button>
      </div>
    )

  return (
    <form noValidate onSubmit={submit} className="mt-10 space-y-5">
      {fields.map((f) => {
        const err = touched[f.name] && errors[f.name]
        const common = {
          id: `f-${f.name}`,
          name: f.name,
          value: values[f.name] || '',
          placeholder: f.placeholder,
          'aria-invalid': !!err,
          'aria-describedby': err ? `e-${f.name}` : undefined,
          onChange: (e) => set(f.name, e.target.value),
          onBlur: () => (setTouched((t) => ({ ...t, [f.name]: true })), setErrors(validate(fields, values))),
          className: `w-full rounded-xl border bg-white px-4 py-3 text-base transition focus:outline-none focus:ring-2 ${
            err ? 'border-red-500 focus:ring-red-200' : 'border-ink/15 focus:border-ink/40 focus:ring-amber/30'
          }`,
        }
        return (
          <div key={f.name} className={err ? 'animate-shake' : ''}>
            <label htmlFor={common.id} className="mb-1 block text-sm font-medium">
              {f.label}
              {f.required && <span className="text-amber"> *</span>}
            </label>
            {f.textarea ? (
              <textarea rows={5} {...common} />
            ) : f.options ? (
              <select {...common}>
                <option value="">Choose one</option>
                {f.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input type={f.type || 'text'} {...common} />
            )}
            {err && (
              <p id={`e-${f.name}`} className="mt-1 text-xs text-red-600">
                {err}
              </p>
            )}
          </div>
        )
      })}
      <button
        type="submit"
        disabled={state === 'sending'}
        className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70"
      >
        {state === 'sending' && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
        {state === 'sending' ? 'Sending…' : kind === 'contribute' ? 'Send contribution' : 'Send message'}
      </button>
    </form>
  )
}
