import type { IconName } from "@/lib/catalog";

type P = { className?: string; filled?: boolean };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export const SearchIcon = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);
export const BagIcon = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M6 7h12l1 13H5L6 7Z" />
    <path d="M9 7a3 3 0 0 1 6 0" />
  </svg>
);
export const HeartIcon = ({ className = "size-5", filled }: P) => (
  <svg {...base} className={className} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
  </svg>
);
export const StarIcon = ({ className = "size-3.5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z" />
  </svg>
);
export const StarOutline = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}>
    <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
  </svg>
);
export const ArrowRight = ({ className = "size-4" }: P) => (
  <svg {...base} className={className} strokeWidth={1.6}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);
export const ArrowLeft = ({ className = "size-4" }: P) => (
  <svg {...base} className={className} strokeWidth={1.6}>
    <path d="M20 12H4M10 6l-6 6 6 6" />
  </svg>
);
export const ChevronDown = ({ className = "size-3" }: P) => (
  <svg {...base} className={className} strokeWidth={2}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const PlayIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </svg>
);
export const CloseIcon = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const MenuIcon = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);
export const TruckIcon = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}>
    <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
);
export const ShieldIcon = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}>
    <path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
export const LockIcon = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}>
    <rect x="5" y="10" width="14" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);
export const CalendarIcon = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2" />
  </svg>
);
export const PinIcon = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
export const TagIcon = ({ className = "size-4" }: P) => (
  <svg {...base} className={className}>
    <path d="M3 12V4h8l10 10-8 8L3 12Z" />
    <circle cx="7.5" cy="8.5" r="1.3" />
  </svg>
);
export const FilterIcon = ({ className = "size-4" }: P) => (
  <svg {...base} className={className}>
    <path d="M4 6h16M7 12h10M10 18h4" />
  </svg>
);
export const GlobeIcon = ({ className = "size-7" }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
  </svg>
);
export const PeopleIcon = ({ className = "size-7" }: P) => (
  <svg {...base} className={className}>
    <circle cx="9" cy="8" r="3" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M3 19c.6-3.4 3-5 6-5s5.4 1.6 6 5M14.5 14.3c.8-.3 1.6-.4 2.5-.4 2.4 0 4 1.3 4.5 4" />
  </svg>
);
export const DiamondIcon = ({ className = "size-7" }: P) => (
  <svg {...base} className={className}>
    <path d="M6 4h12l3 5-9 11L3 9l3-5Z" />
    <path d="M3 9h18M9 4l3 16 3-16M7.5 9 9 4M16.5 9 15 4" />
  </svg>
);
export const HandshakeIcon = ({ className = "size-7" }: P) => (
  <svg {...base} className={className}>
    <path d="m2 11 4-4 4 1 3-2 3 1 6 4-3 3" />
    <path d="M2 11l3 3M10 8l-3 3c-.6.6-.6 1.4 0 2s1.4.6 2 0l2-2M11 11l3 3c.6.6 1.4.6 2 0s.6-1.4 0-2M13 13l2 2c.6.6.6 1.4 0 2s-1.4.6-2 0l-2-2M9.5 16.5l1 1c.6.6 1.4.6 2 0" />
  </svg>
);
export const BulbIcon = ({ className = "size-7" }: P) => (
  <svg {...base} className={className}>
    <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3Z" />
  </svg>
);
export const FlaskIcon = ({ className = "size-7" }: P) => (
  <svg {...base} className={className}>
    <path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3" />
    <path d="M7 15h10" />
  </svg>
);
export const RecycleIcon = ({ className = "size-7" }: P) => (
  <svg {...base} className={className}>
    <path d="M7 19H4.5a1.5 1.5 0 0 1-1.3-2.3L5.5 13M10 5.5l1.2-2a1.5 1.5 0 0 1 2.6 0L16 7.5M17 19h2.5a1.5 1.5 0 0 0 1.3-2.3L19 13.5" />
    <path d="m9 19 3 2v-4l-3 2ZM4 10l1.5 3 3-1.5M14 7.5l2 .2.5-3" />
  </svg>
);

/* ─── vertical icons ─── */
export const BottleIcon = ({ className = "size-7" }: P) => (
  <svg {...base} className={className}>
    <path d="M10 3h4v3h-4zM9 6h6l1 3H8l1-3Z" />
    <rect x="6" y="9" width="12" height="12" rx="2.5" />
    <rect x="9" y="13" width="6" height="4" rx="0.5" />
  </svg>
);
export const DropIcon = ({ className = "size-7" }: P) => (
  <svg {...base} className={className}>
    <path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11Z" />
    <path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5" />
  </svg>
);
export const HangerIcon = ({ className = "size-7" }: P) => (
  <svg {...base} className={className}>
    <path d="M10 6.5a2 2 0 1 1 2.8 1.8c-.5.3-.8.7-.8 1.2V11" />
    <path d="M12 11 3 17.5c-.6.4-.3 1.5.5 1.5h17c.8 0 1.1-1.1.5-1.5L12 11Z" />
  </svg>
);
export const FlowerIcon = ({ className = "size-7" }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="2.2" />
    <path d="M12 9.8C10 7.5 10.5 4 12 3c1.5 1 2 4.5 0 6.8ZM12 14.2c2 2.3 1.5 5.8 0 6.8-1.5-1-2-4.5 0-6.8ZM9.8 12C7.5 14 4 13.5 3 12c1-1.5 4.5-2 6.8 0ZM14.2 12c2.3-2 5.8-1.5 6.8 0-1 1.5-4.5 2-6.8 0Z" />
  </svg>
);
export const LeafIcon = ({ className = "size-7" }: P) => (
  <svg {...base} className={className}>
    <path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15Z" />
    <path d="M5 19 13 11" />
  </svg>
);

export function VerticalIcon({ name, className }: { name: IconName; className?: string }) {
  const map = { bottle: BottleIcon, drop: DropIcon, hanger: HangerIcon, flower: FlowerIcon, leaf: LeafIcon, calendar: CalendarIcon };
  const I = map[name];
  return <I className={className} />;
}

/** Lotus mark + serif wordmark */
export const Logo = ({ className = "", light = false }: { className?: string; light?: boolean }) => (
  <span className={`inline-flex items-center gap-2.5 ${light ? "text-white" : "text-ink"} ${className}`}>
    <svg viewBox="0 0 40 32" className="h-7 w-9 sm:h-8 sm:w-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden>
      <path d="M20 28C14 23 13 13 20 4c7 9 6 19 0 24Z" />
      <path d="M20 28c-4-5-11-7-17-6 2 5 9 7 17 6Z" />
      <path d="M20 28c4-5 11-7 17-6-2 5-9 7-17 6Z" />
      <path d="M17.5 26C12 22 7.5 15 9 8c4 2.5 7 6.5 8.5 11" />
      <path d="M22.5 26C28 22 32.5 15 31 8c-4 2.5-7 6.5-8.5 11" />
    </svg>
    <span className="font-display text-[1.35rem] sm:text-[1.7rem] font-medium tracking-[0.1em] sm:tracking-[0.12em] leading-none">HELOVES</span>
  </span>
);
