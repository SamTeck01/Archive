// A small offline "museum guide": answers questions by finding the most relevant
// sentences in the archive's own texts. No network or API key needed.
import { details } from './data'

const STOP = new Set(
  'a an the is are was were be been of in on at to for from by with and or but it its this that these those what who whom which when where why how do does did can could you me my i about tell more please there their they them as into than then so if any some'.split(
    ' ',
  ),
)

const tokens = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map((w) => w.replace(/(ies|es|s)$/, ''))

function sentences(slug, item) {
  const text = [...item.body, item.after, ...(item.list || []).map((l) => `${item.listLabel} ${l}.`)].filter(Boolean)
  const out = []
  text.forEach((t) => t.split(/(?<=[.!?])\s+/).forEach((s) => s.trim() && out.push({ slug, title: item.title, text: s.trim() })))
  out.push({ slug, title: item.title, text: `${item.title}: ${item.meta.filter(Boolean).join(', ')}.`, meta: true })
  return out
}

const corpus = Object.entries(details).flatMap(([slug, item]) => sentences(slug, item))

const SYN = {
  popular: ['boom', 'revival', 'successful', 'prominent'],
  made: ['woven', 'make', 'created', 'dyed', 'weaver', 'loom'],
  make: ['woven', 'made', 'dyeing', 'dipping', 'stitching'],
  where: ['town', 'state', 'lago', 'city', 'bonny', 'abeokuta', 'ibadan', 'yaba', 'iseyin'],
  who: ['photographer', 'women', 'weaver', 'artist', 'achebe', 'cadbury'],
  mean: ['mean', 'name'],
  name: ['mean', 'named'],
  look: ['look', 'closer'],
  photo: ['photograph', 'photographer', 'portrait'],
}

export const suggestions = {
  fashion: ['What does the name mean?', 'Where was it made?', 'When did it become popular?'],
  design: ['When was it made?', 'What should I look for?', 'Who was it for?'],
  photography: ['Who took these photos?', 'When did studios open?', 'What should I look for?'],
}

export function askGuide(question, currentSlug) {
  const base = tokens(question)
  const q = [...base, ...base.flatMap((w) => SYN[w] || [])]
  if (!q.length) return { text: 'Ask me anything about this piece, like when it was made or what to look for.' }
  const when = /\b(when|year|date|century|old|popular|history)\b/i.test(question)
  const scored = corpus
    .map((s) => {
      const t = tokens(s.text)
      let score = q.reduce((n, w) => n + (t.includes(w) ? 2 : t.some((x) => x.startsWith(w) || w.startsWith(x)) ? 1 : 0), 0)
      if (s.slug === currentSlug) score += 1.5
      if (when && /\b(1[89]\d\d|20\d\d|century|\d{4}s)\b/.test(s.text)) score += 2.5
      if (s.meta) score -= 1
      else if (tokens(s.title).some((w) => base.includes(w))) score += 2
      return { ...s, score }
    })
    .filter((s) => s.score > 1.5)
    .sort((a, b) => b.score - a.score)

  if (!scored.length)
    return { text: 'I don’t have an answer to that in the archive yet. Try asking about where it comes from, when it was made, or what to look for.' }

  const best = scored.filter((s) => s.slug === scored[0].slug).slice(0, 2)
  const text = best.map((s) => s.text).join(' ')
  return best[0].slug === currentSlug ? { text } : { text, related: { slug: best[0].slug, title: best[0].title } }
}
