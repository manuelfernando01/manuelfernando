import type React from "react"
import Link from "next/link"
import type { ReactNode } from "react"

interface SocialIconProps {
  icon: ReactNode
  href: string
  label: string
  className?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export default function SocialIcon({ icon, href, label, className = "", onClick }: SocialIconProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`w-10 h-10 flex items-center justify-center rounded-full border border-brand/30 bg-brand/15 hover:bg-brand hover:shadow-glow-sm transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      <span className="text-white">{icon}</span>
      <span className="sr-only">{label}</span>
    </Link>
  )
}

