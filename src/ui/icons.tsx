interface IconProps {
  size?: number
  className?: string
}

const base = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className,
})

export const CartIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
)

export const SearchIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size, className)}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

export const MenuIcon = ({ size = 22, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M3 12h18M3 6h18M3 18h18" />
  </svg>
)

export const XIcon = ({ size = 22, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

export const TrashIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M3 6h18M19 6l-1 14H6L5 6M9 6V4h6v2" />
  </svg>
)

export const PlusIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const MinusIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M5 12h14" />
  </svg>
)

export const CheckIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="m5 12 5 5 9-9" />
  </svg>
)

export const TruckIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size, className)}>
    <rect x="1" y="3" width="15" height="13" />
    <path d="M16 8h4l3 5v3h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
)

export const ChevronDownIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const GlobeIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

export const HeartIcon = ({ size = 18, className, filled = false }: IconProps & { filled?: boolean }) => (
  <svg {...base(size, className)} fill={filled ? '#ef4444' : 'none'} stroke={filled ? '#ef4444' : 'currentColor'}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

export const PhoneIcon = ({ size = 15, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 10.5a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.59 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 7.91a16 16 0 0 0 6.18 6.18l1.27-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

export const MailIcon = ({ size = 15, className }: IconProps) => (
  <svg {...base(size, className)}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
)

export const MapPinIcon = ({ size = 15, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

/** Chevron that points "forward" in the reading direction (flipped under RTL). */
export const ArrowForwardIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size, className)} className={`rtl:-scale-x-100 ${className ?? ''}`}>
    <path d="m9 18 6-6-6-6" />
  </svg>
)

export const SpinnerIcon = ({ size = 20, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={{ animation: 'spin 0.7s linear infinite' }}
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity="0.2" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
)
