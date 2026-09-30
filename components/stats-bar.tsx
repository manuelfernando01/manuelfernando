"use client"

import { Rocket, Code2, Cloud } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  { value: "17", label: "Years Experience", icon: Rocket },
  { value: "40+", label: "Projects Delivered", icon: Code2 },
  { value: "92%", label: "Client Satisfaction", icon: Cloud },
]

export default function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="glass-panel w-full rounded-xl px-5 py-5 md:px-7 md:py-6"
    >
      <div className="grid grid-cols-1 gap-y-7 sm:grid-cols-3 md:gap-0">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className={`flex items-center gap-4 px-2 text-left md:justify-center md:px-5 ${
                index < stats.length - 1 ? "md:border-r md:border-white/10" : ""
              }`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#6c68cc]/15 bg-[#5660aa]/10 shadow-[0_0_24px_rgba(91,90,221,0.15)]">
                <Icon className="text-[#8d73ff]" size={22} strokeWidth={1.7} />
              </div>
              <div>
                <p className="font-display text-lg font-bold text-white md:text-xl">{stat.value}</p>
                <p className="mt-1 text-[11px] text-slate-400 md:text-[13px]">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
