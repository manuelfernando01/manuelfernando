"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

export default function Loading() {
  const [progress, setProgress] = useState(0)
  const controls = useAnimation()

  useEffect(() => {
    const duration = 1.4
    const interval = 40

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 100 / ((duration * 1000) / interval)
        if (next >= 100) {
          clearInterval(timer)
          return 100
        }
        return next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    controls.start({ width: `${progress}%` })
  }, [progress, controls])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070a]">
      <p className="mb-6 font-display text-2xl font-bold text-white">
        Manuel Fernando Gamboa Rocha<span className="text-brand">.</span>
      </p>
      <div className="relative w-64">
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand to-brand-blue"
            initial={{ width: "0%" }}
            animate={controls}
          />
        </div>
        <p className="mt-3 text-center text-xs tracking-[0.25em] text-slate-500">LOADING</p>
      </div>
    </div>
  )
}
