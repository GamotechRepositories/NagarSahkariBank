export function Icon({ name, className = 'h-5 w-5' }) {
  const props = {
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    viewBox: '0 0 24 24',
    'aria-hidden': true,
  }

  switch (name) {
    case 'bolt':
      return (
        <svg {...props}>
          <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      )
    case 'wallet':
      return (
        <svg {...props}>
          <path d="M3 7h15a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7z" />
          <path d="M3 7V6a3 3 0 0 1 3-3h11" />
          <circle cx="17" cy="13.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'document':
      return (
        <svg {...props}>
          <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M9 13h6M9 17h6" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...props}>
          <path d="M12 3 5 6v5c0 5 3.2 8.4 7 9.8 3.8-1.4 7-4.8 7-9.8V6l-7-3z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    case 'users':
      return (
        <svg {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="3" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a3 3 0 0 1 0 5.74" />
        </svg>
      )
    case 'map':
      return (
        <svg {...props}>
          <path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z" />
          <path d="M9 3v15M15 6v15" />
        </svg>
      )
    case 'check':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8.5 12.5 2.2 2.2 4.8-5" />
        </svg>
      )
    case 'star':
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="m12 2.5 2.7 5.5 6 .9-4.4 4.3 1 6-5.3-2.8L6.7 19.2l1-6L3.3 8.9l6-.9L12 2.5z" />
        </svg>
      )
    case 'arrow':
      return (
        <svg {...props}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...props}>
          <path d="M7 3h4l1.5 4-2.5 1.5a12 12 0 0 0 5.5 5.5L17 11.5 21 13v4a2 2 0 0 1-2 2A16 16 0 0 1 5 5a2 2 0 0 1 2-2z" />
        </svg>
      )
    case 'mail':
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      )
    case 'building':
      return (
        <svg {...props}>
          <path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M4 21h16M14 21V10h4a2 2 0 0 1 2 2v9" />
          <path d="M8 8h2M8 12h2M8 16h2" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      )
    case 'heart':
      return (
        <svg {...props}>
          <path d="M19.5 12.5 12 20l-7.5-7.5a4.5 4.5 0 1 1 7.5-5.1 4.5 4.5 0 1 1 7.5 5.1z" />
        </svg>
      )
    case 'briefcase':
      return (
        <svg {...props}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
        </svg>
      )
    case 'spark':
      return (
        <svg {...props}>
          <path d="M12 3v4M12 17v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M3 12h4M17 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
        </svg>
      )
    case 'menu':
      return (
        <svg {...props}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      )
    case 'close':
      return (
        <svg {...props}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      )
    case 'user':
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="4" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
      )
    case 'bell':
      return (
        <svg {...props}>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      )
    case 'transfer':
      return (
        <svg {...props}>
          <path d="M7 8h13M16 4l4 4-4 4" />
          <path d="M17 16H4M8 12l-4 4 4 4" />
        </svg>
      )
    case 'sms':
      return (
        <svg {...props}>
          <path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 1 1 18 0z" />
          <path d="M8 11h.01M12 11h.01M16 11h.01" />
        </svg>
      )
    case 'locker':
      return (
        <svg {...props}>
          <rect x="4" y="8" width="16" height="13" rx="2" />
          <path d="M8 8V6a4 4 0 0 1 8 0v2" />
          <circle cx="12" cy="14.5" r="1.5" />
        </svg>
      )
    case 'card':
      return (
        <svg {...props}>
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20M6 15h4" />
        </svg>
      )
    case 'netbanking':
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4" />
          <circle cx="12" cy="10.5" r="3" />
          <path d="M12 7.5v6M9.2 10.5h5.6" />
        </svg>
      )
    case 'qr':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <path d="M14 14h3v3h-3zM20 14v3M14 20h3M18 18h3v3" />
        </svg>
      )
    case 'fastag':
      return (
        <svg {...props}>
          <path d="M4 16h13l3-6H8l-4 6z" />
          <circle cx="7.5" cy="17.5" r="1.5" />
          <circle cx="15.5" cy="17.5" r="1.5" />
          <path d="M9 7h6M10 4h4" />
        </svg>
      )
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      )
  }
}

export function Stars({ count = 5 }) {
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from({ length: count }).map((_, index) => (
        <Icon key={index} name="star" className="h-3.5 w-3.5" />
      ))}
    </div>
  )
}
