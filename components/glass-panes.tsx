"use client"

import { motion } from "framer-motion"

const panes = [
  { x: 62, y: -60, width: 178, height: 252, rotate: -16, opacity: 0.48, z: 1 },
  { x: 15, y: -28, width: 190, height: 255, rotate: -14, opacity: 0.78, z: 2 },
  { x: -55, y: 10, width: 184, height: 240, rotate: -13, opacity: 1, z: 4 },
  { x: 2, y: 82, width: 150, height: 132, rotate: -13, opacity: 0.7, z: 5 },
]

export default function GlassPanes() {
  return (
    <div className="relative mx-auto flex h-[310px] w-full max-w-[390px] items-center justify-center lg:h-[370px]">
      <motion.div
        className="absolute h-[92%] w-[92%] rounded-full bg-[radial-gradient(circle,rgba(92,63,230,0.38),transparent_69%)] blur-3xl"
        animate={{ opacity: [0.4, 0.82, 0.4], scale: [1, 1.06, 1] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-[44%] w-[44%] rounded-full bg-[radial-gradient(circle,rgba(121,143,255,0.3),transparent_70%)] blur-2xl"
        animate={{ opacity: [0.3, 0.65, 0.3] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative h-full w-full" style={{ perspective: "1400px" }}>
        {panes.map((pane, index) => (
          <motion.div
            key={`${pane.x}-${pane.y}`}
            className="absolute left-1/2 top-1/2 origin-center"
            style={{
              width: pane.width,
              height: pane.height,
              marginLeft: -pane.width / 2,
              marginTop: -pane.height / 2,
              zIndex: pane.z,
            }}
            initial={{ opacity: 0, scale: 0.82, x: pane.x, y: pane.y + 15, rotate: pane.rotate }}
            animate={{
              opacity: pane.opacity,
              scale: 1,
              x: pane.x,
              y: [pane.y, pane.y - 8, pane.y],
              rotate: pane.rotate,
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.12 + index * 0.08 },
              scale: { duration: 0.8, delay: 0.12 + index * 0.08 },
              x: { duration: 0.8, delay: 0.12 + index * 0.08 },
              rotate: { duration: 0.8, delay: 0.12 + index * 0.08 },
              y: {
                duration: 5 + index * 0.35,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.35 + index * 0.12,
              },
            }}
          >
            <div
              className="relative h-full w-full overflow-hidden rounded-[4px]"
              style={{
                background:
                  "linear-gradient(145deg, rgba(170,164,255,0.26) 0%, rgba(91,71,208,0.29) 35%, rgba(49,61,148,0.18) 70%, rgba(16,27,61,0.12) 100%)",
                border: "1px solid rgba(171, 187, 255, 0.68)",
                boxShadow:
                  "0 24px 55px rgba(69,43,190,0.28), 0 0 32px rgba(97,111,255,0.12), inset 0 1px 0 rgba(255,255,255,0.2)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <div className="absolute inset-[14%] bg-[linear-gradient(145deg,rgba(198,195,255,0.09),rgba(77,88,207,0.17))] blur-[2px]" />
              <div className="absolute -left-4 top-[42%] h-16 w-[120%] rotate-[-8deg] bg-gradient-to-r from-transparent via-[#8d80ee]/20 to-transparent blur-md" />
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(164,186,255,0.12)]" />
            </div>
          </motion.div>
        ))}

        <span className="absolute left-[7%] top-[20%] h-1.5 w-1.5 rounded-full bg-[#b5a1ff] shadow-[0_0_12px_#8d71ff]" />
        <span className="absolute bottom-[18%] right-[3%] h-1 w-1 rounded-full bg-[#6955ff] shadow-[0_0_10px_#6955ff]" />
      </div>
    </div>
  )
}
