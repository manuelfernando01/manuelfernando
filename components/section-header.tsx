import type { ElementType } from "react"

type SectionHeaderProps = {
  eyebrow: string
  title: string
  accent?: string
  subtitle: string
  icon: ElementType
}

export default function SectionHeader({
  eyebrow,
  title,
  accent,
  subtitle,
  icon: Icon,
}: SectionHeaderProps) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
      <div className="section-badge">
        <Icon className="h-4 w-4" strokeWidth={1.8} />
        <span>{eyebrow}</span>
      </div>
      <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.15rem] lg:text-4xl">
        {title}
        {accent ? <span className="text-gradient"> {accent}</span> : null}
      </h2>
      <div className="section-divider" />
      <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-6 text-slate-400 sm:text-[15px] lg:text-base">
        {subtitle}
      </p>
    </div>
  )
}
