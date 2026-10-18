import { useId } from 'react'

export function ArrowUpRight({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M6 14 14 6M8 6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      {open ? (
        <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      ) : (
        <path d="M10 5h10M4 12h16M10 19h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  )
}

// Torn-paper edge. Draws a band of `color` whose edge facing away from the section is ragged.
export function TornEdge({ color, side = 'top', height = 40, strip = false, className = '' }) {
  const id = useId().replace(/:/g, '')
  const flip = side === 'bottom'
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 z-10 w-full ${flip ? 'top-full -translate-y-px' : 'bottom-full translate-y-px'} ${className}`}
      style={{ height }}
      viewBox="0 0 400 40"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id={`torn-${id}`} x="-5%" y="-50%" width="110%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.09 0.12" numOctaves="3" seed={flip ? 7 : 1992} />
          <feDisplacementMap in="SourceGraphic" scale="7" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g transform={flip ? 'matrix(1 0 0 -1 0 40)' : undefined} filter={`url(#torn-${id})`}>
        {strip && <path d="M-10 14 C 60 2, 140 26, 220 16 S 360 4, 410 12 L410 40 L-10 40 Z" fill="#fff" />}
        <path d="M-10 22 C 50 12, 130 34, 210 24 S 350 12, 410 22 L410 44 L-10 44 Z" fill={color} />
      </g>
    </svg>
  )
}

// Strip of masking tape, as used above pinned photos.
export function Tape({ className = '' }) {
  return <span aria-hidden="true" className={`absolute h-[42px] w-5 -rotate-[7.5deg] bg-sand shadow-tape ${className}`} />
}

// White mounted photo hung from a bulldog clip (Fashion section).
export function ClippedPhoto({ src, alt, small = false }) {
  return (
    <div className={`relative ${small ? 'w-[94px] pt-[2px]' : 'w-[169px] pt-[3px]'}`}>
      <div className={`relative overflow-hidden bg-white ${small ? 'rounded-t px-[6px] pb-[7px] pt-[14px]' : 'rounded-t-lg px-3 pb-3 pt-7'}`}>
        <span
          className={`absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-clip shadow-[inset_0_4px_12px_rgba(0,0,0,.14),0_4px_8px_rgba(0,0,0,.12)] ${small ? 'h-4 w-[127px]' : 'h-[15px] w-[250px]'}`}
        />
        <img src={src} alt={alt} loading="lazy" className={`relative w-full object-cover ${small ? 'aspect-[80/97]' : 'aspect-[145/181]'}`} />
      </div>
      <span
        aria-hidden="true"
        className={`absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-muted shadow-pin ${small ? 'h-3 w-[11px]' : 'h-[22px] w-[21px]'}`}
      />
    </div>
  )
}
