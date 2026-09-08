import { useCallback, useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { formatMoney } from '../lib/money'

// ─── useInView ───────────────────────────────────────────────────────────────
export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ─── RippleButton ────────────────────────────────────────────────────────────
type RippleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }

export function RippleButton({ children, onClick, className, ...rest }: RippleButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = ref.current
      if (btn) {
        const rect = btn.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const ripple = document.createElement('span')
        ripple.style.cssText = `position:absolute;border-radius:50%;pointer-events:none;width:${size}px;height:${size}px;left:${
          e.clientX - rect.left - size / 2
        }px;top:${e.clientY - rect.top - size / 2}px;background:rgba(255,255,255,0.35);transform:scale(0);animation:ripple 0.5s linear`
        btn.appendChild(ripple)
        ripple.addEventListener('animationend', () => ripple.remove())
      }
      onClick?.(e)
    },
    [onClick],
  )

  return (
    <button ref={ref} onClick={handleClick} className={`relative overflow-hidden ${className ?? ''}`} {...rest}>
      {children}
    </button>
  )
}

// ─── Money ───────────────────────────────────────────────────────────────────
export function Money({ value, className }: { value: number; className?: string }) {
  return (
    <span className={className} dir="ltr">
      ₪{formatMoney(value)}
    </span>
  )
}
