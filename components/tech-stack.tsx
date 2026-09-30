"use client"

import { motion } from "framer-motion"

const techStack = [
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "FFFFFF" },
  { name: "Node.js", slug: "nodedotjs", color: "339933" },
  { name: "NestJS", slug: "nestjs", color: "E0234E" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "Redis", slug: "redis", color: "DC382D" },
  { name: "AWS", slug: "amazonaws", color: "FF9900" },
  { name: "Docker", slug: "docker", color: "2496ED" },
]

export default function TechStack() {
  return (
    <section className="pb-14 pt-5 md:pb-16 md:pt-7">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="site-shell tech-frame px-5 py-6 md:px-10 md:py-7"
      >
        <h2 className="text-center font-display text-xl font-semibold text-white">Tech Stack</h2>
        <div className="mx-auto mt-1 h-0.5 w-5 bg-brand" />
        <p className="mt-1 text-center text-xs text-slate-400 md:text-sm">
          Technologies I work with to build robust and scalable solutions.
        </p>

        <div className="mt-8 grid grid-cols-3 gap-x-4 gap-y-7 sm:grid-cols-5 lg:grid-cols-10 lg:gap-4">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-3"
            >
              {tech.slug === "amazonaws" ? (
                <div className="relative flex h-10 w-12 items-center justify-center font-sans text-[20px] font-semibold tracking-tight text-white md:h-11">
                  aws
                  <span className="absolute bottom-0 h-1 w-8 rotate-[-5deg] rounded-[50%] border-b-2 border-[#ff9900]" />
                </div>
              ) : (
                <img
                  src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
                  alt={tech.name}
                  width={42}
                  height={42}
                  className="h-10 w-10 drop-shadow-[0_0_12px_rgba(123,97,255,0.2)] md:h-11 md:w-11"
                  loading="lazy"
                />
              )}
              <span className="text-center text-[11px] leading-tight text-slate-300 md:text-xs">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
