import type { CSSProperties } from 'react'

/**
 * The homepage's full-page visual environment — one art-directed composition
 * that sits BEHIND every section and continues naturally while scrolling:
 *
 *  - a soft blue-white vertical wash (stays near white, dips to pale cool blue
 *    around the Categories and Featured bands, eases back between them);
 *  - a few very wide, low-opacity blue blooms for ambient depth;
 *  - botanical leaf accents scattered along the OUTER edges only, with varied
 *    size / rotation / density and deliberate empty stretches;
 *  - a small number of translucent soap-bubble accents on off-beats;
 *  - a gentle fade into the dark footer.
 *
 * Purely decorative: `aria-hidden`, `pointer-events-none`, no semantic content,
 * no animation (so nothing to reconcile with `prefers-reduced-motion`). Rendered
 * once inside the homepage wrapper, which is `relative isolate`, so it never
 * touches the real section markup. Desktop gets the full composition; tablet a
 * lighter one; phones only a couple of small hints.
 */

function LeafDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <linearGradient id="ragwaLeaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5cb86b" />
          <stop offset="1" stopColor="#237e42" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function Leaf({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 96 96"
      className={`absolute ${className}`}
      style={{ filter: 'blur(0.5px)', ...style }}
      aria-hidden="true"
      fill="url(#ragwaLeaf)"
    >
      <path d="M48 4C63 19 76 42 72 70C70 83 60 92 48 92C36 92 26 83 24 70C20 42 33 19 48 4Z" />
      <path
        d="M48 12C47 40 47 64 48 86M48 36C42 39 36 45 32 52M48 36C54 39 60 45 64 52M48 56C43 59 38 64 35 70"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.38"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Bubble({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute block rounded-full ${className}`}
      style={{
        background:
          'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), rgba(255,255,255,0.28) 42%, rgba(224,238,255,0.12) 66%, rgba(224,238,255,0) 78%)',
        boxShadow:
          'inset 0 0 0 1px rgba(255,255,255,0.42), inset -6px -9px 16px rgba(148,197,255,0.18)',
        ...style,
      }}
    />
  )
}

export function HomeAtmosphere() {
  return (
    <div
      aria-hidden="true"
      dir="ltr"
      className="pointer-events-none absolute inset-0 -z-[2] overflow-hidden"
    >
      {/* art-directed vertical wash — subtle, always close to white */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg,#ffffff 0%,#f4f9ff 8%,#dfeafb 25%,#eef5ff 41%,#fbfdff 53%,#dde9fb 71%,#ecf3ff 86%,#d8e4f6 100%)',
        }}
      />
      {/* wide ambient blue blooms for depth (part of the scrolling comp) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(58% 30% at 4% 3%, rgba(8,120,255,0.10), transparent 70%),' +
            'radial-gradient(50% 28% at 99% 21%, rgba(29,111,224,0.09), transparent 68%),' +
            'radial-gradient(72% 24% at 52% 58%, rgba(8,120,255,0.06), transparent 72%),' +
            'radial-gradient(56% 30% at 3% 90%, rgba(29,111,224,0.08), transparent 70%)',
        }}
      />

      <LeafDefs />

      {/* ── leaves: outer edges only, organic spacing, deliberate gaps.
          All offsets are >= 0 (a negative left/right makes an RTL page
          overflow-clip its own left edge), so leaves sit flush to the edge
          and rotation carries the tip outward; the container clips the rest. */}
      {/* top band (around hero) */}
      <Leaf className="hidden lg:block" style={{ top: '0.5%', right: 0, width: 176, transform: 'rotate(26deg) translateX(22%)', opacity: 0.24 }} />
      <Leaf className="hidden md:block" style={{ top: '3%', left: 0, width: 148, transform: 'rotate(-22deg) translateX(-20%) scaleX(-1)', opacity: 0.2 }} />
      <Leaf className="hidden xl:block" style={{ top: '9%', right: '1.5%', width: 70, transform: 'rotate(-8deg)', opacity: 0.13 }} />
      {/* benefits / categories band */}
      <Leaf className="hidden md:block" style={{ top: '17%', left: 0, width: 116, transform: 'rotate(34deg) translateX(-16%) scaleX(-1)', opacity: 0.2 }} />
      <Leaf className="hidden xl:block" style={{ top: '21%', left: '2.5%', width: 74, transform: 'rotate(54deg) scaleX(-1)', opacity: 0.13 }} />
      <Leaf className="hidden md:block" style={{ top: '26%', right: 0, width: 162, transform: 'rotate(-28deg) translateX(18%)', opacity: 0.23 }} />
      <Leaf className="hidden lg:block" style={{ top: '31%', right: '1%', width: 78, transform: 'rotate(-70deg)', opacity: 0.12 }} />
      {/* deliberate quiet stretch on the right ~34–46% */}
      <Leaf className="hidden md:block" style={{ top: '45%', left: 0, width: 158, transform: 'rotate(-12deg) translateX(-18%) scaleX(-1)', opacity: 0.19 }} />
      <Leaf className="hidden xl:block" style={{ top: '51%', left: '2%', width: 82, transform: 'rotate(20deg) scaleX(-1)', opacity: 0.12 }} />
      <Leaf className="hidden lg:block" style={{ top: '48%', right: 0, width: 122, transform: 'rotate(-44deg) translateX(14%)', opacity: 0.16 }} />
      {/* deliberate quiet stretch on the left ~55–68% */}
      <Leaf className="hidden md:block" style={{ top: '64%', right: 0, width: 170, transform: 'rotate(-38deg) translateX(20%)', opacity: 0.23 }} />
      <Leaf className="hidden xl:block" style={{ top: '70%', right: '2%', width: 76, transform: 'rotate(-6deg)', opacity: 0.12 }} />
      {/* featured band → footer */}
      <Leaf className="hidden md:block" style={{ top: '77%', left: 0, width: 130, transform: 'rotate(26deg) translateX(-16%) scaleX(-1)', opacity: 0.2 }} />
      <Leaf className="hidden lg:block" style={{ top: '86%', left: 0, width: 158, transform: 'rotate(-22deg) translateX(-18%) scaleX(-1)', opacity: 0.2 }} />
      <Leaf className="hidden md:block" style={{ top: '92%', right: 0, width: 144, transform: 'rotate(16deg) translateX(18%)', opacity: 0.19 }} />
      {/* phones: a few small hints flush to the edge */}
      <Leaf className="md:hidden" style={{ top: '6%', right: 0, width: 76, transform: 'rotate(-14deg) translateX(30%)', opacity: 0.12 }} />
      <Leaf className="md:hidden" style={{ top: '40%', left: 0, width: 82, transform: 'rotate(26deg) translateX(-32%) scaleX(-1)', opacity: 0.11 }} />
      <Leaf className="md:hidden" style={{ top: '78%', right: 0, width: 78, transform: 'rotate(-8deg) translateX(32%)', opacity: 0.11 }} />

      {/* ── bubbles: sparse, on off-beats from the leaves ── */}
      <Bubble className="hidden sm:block" style={{ top: '10%', left: '4.5%', width: 46, height: 46 }} />
      <Bubble className="hidden sm:block" style={{ top: '13.5%', left: '8.5%', width: 20, height: 20 }} />
      <Bubble className="hidden md:block" style={{ top: '36%', right: '5.5%', width: 58, height: 58 }} />
      <Bubble className="hidden md:block" style={{ top: '39.5%', right: '10.5%', width: 22, height: 22 }} />
      <Bubble className="hidden sm:block" style={{ top: '57%', left: '6.5%', width: 36, height: 36 }} />
      <Bubble className="hidden md:block" style={{ top: '82%', left: '5.5%', width: 50, height: 50 }} />
      <Bubble className="hidden sm:block" style={{ top: '91%', right: '7.5%', width: 28, height: 28 }} />

      {/* ease into the dark footer */}
      <div
        className="absolute inset-x-0 bottom-0 h-56"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(203,215,236,0.95))' }}
      />
    </div>
  )
}
