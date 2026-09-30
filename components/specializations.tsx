"use client"

import { Code2, Brain, Cloud, Box } from "lucide-react"
import { motion } from "framer-motion"

const items = [
  {
    title: "Full-Stack Engineering",
    description: "End-to-end development with modern technologies",
    icon: Code2,
  },
  {
    title: "AI & ML Integration",
    description: "LLMs, Computer Vision, and Generative AI",
    icon: Brain,
  },
  {
    title: "Scalable Architectures",
    description: "High-performance systems built for scale",
    icon: Cloud,
  },
  {
    title: "Cloud Native",
    description: "AWS, Docker, CI/CD, and serverless solutions",
    icon: Box,
  },
]

export default function Specializations() {
  return (
    <div className="relative">
      <div
        className="absolute left-[21px] top-7 bottom-7 w-px"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(167,139,250,0.5) 0 4px, transparent 4px 10px)",
        }}
      />

      <div className="relative flex flex-col gap-6">
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative flex items-start gap-4"
            >
              <div
                className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#a78bfa]/70 bg-[rgba(123,97,255,0.12)]"
                style={{
                  boxShadow:
                    "0 0 16px rgba(123, 97, 255, 0.55), 0 0 32px rgba(123, 97, 255, 0.2), inset 0 0 10px rgba(167, 139, 250, 0.12)",
                }}
              >
                <Icon className="h-[18px] w-[18px] text-[#c4b5fd]" strokeWidth={1.75} />
              </div>

              <div className="pt-0.5">
                <h3 className="text-[15px] font-semibold leading-tight text-white md:text-base">
                  {item.title}
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-400">{item.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
