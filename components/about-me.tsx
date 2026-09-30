"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import {
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  CloudCog,
  Code2,
  Database,
  Network,
  PanelsTopLeft,
  ServerCog,
  Sparkles,
  Wrench,
} from "lucide-react"
import SectionHeader from "@/components/section-header"

const timelineData = [
  {
    id: 1,
    company: "Intellectsoft",
    role: "Senior Software Engineer | Full Stack & AI",
    period: "January 2024 - Present",
    logo: "/IntellectSoft.png",
    highlights: [
      "Led small engineering teams, reviewed code, mentored developers, and contributed to system design, sprint planning, and production releases.",
      "Integrated Demucs-based vocal separation into VocalRemover.org, improving audio processing speed and production stability.",
      "Productionized Quibaro's AI image-generation pipeline and reduced inference latency by approximately 25–30% through prompt batching and GPU optimization.",
      "Improved BidGarage, a real-time vehicle auction platform, using NestJS, PostgreSQL row-level locking, Redis, and WebSockets to prevent bid conflicts during concurrent traffic.",
      "Improved API performance through Redis caching, database indexing, query optimization, and backend refactoring.",
      "Worked directly with clients to understand requirements, provide progress updates, resolve technical issues, and deliver production features.",
    ],
  },
  {
    id: 2,
    company: "Solver",
    role: "Senior Software Engineer | Full Stack & AI",
    period: "March 2020 - January 2024",
    logo: "/Solver.png",
    highlights: [
      "Developed features for ADDX, a private-market investment platform, including KYC onboarding, transaction workflows, API integrations and portfolio dashboards.",
      "Developed and integrated full-stack and LLM-powered capabilities for CooWe, including frontend and backend features, APIs, cloud services, intelligent information retrieval, and AI-assisted meeting and collaboration workflows.",
      "Developed the Ewel e-commerce platform, including product pages, responsive layouts, backend services, and database-driven functionality.",
      "Developed a real-time music collaboration platform using WebSockets and event-driven architecture to support live communication between users.",
      "Built responsive web applications using React, Next.js, and TypeScript and worked closely with product managers, designers.",
      "Developed backend services and REST APIs using Node.js, Python, FastAPI, PostgreSQL, Redis, and AWS.",
    ],
  },
  {
    id: 3,
    company: "Asesoftware",
    role: "Full-Stack Developer",
    period: "September 2009 - March 2020",
    logo: "/Asesoftware.png",
    highlights: [
      "Developed web applications, e-commerce platforms, and internal business systems using Spring Cloud, ASP.NET, JavaScript, and relational databases.",
      "Developed core frontend and backend functionality for Inkarnate’s early browser-based map editor, including interactive map-building features, application workflows, and supporting backend services.",
      "Built backend services, REST APIs, authentication, database features, and business logic for client applications.",
      "Created responsive web pages using HTML, CSS, JavaScript, Bootstrap, and later React.",
      "Fixed application bugs, browser compatibility issues, performance problems, and production issues.",
      "Tested new features and completed updates based on client feedback and business requirements.",
    ],
  },
]

const skillsData = [
  {
    category: "Languages",
    icon: Code2,
    skills: ["JavaScript", "TypeScript", "Python", "C#", "Java"],
  },
  {
    category: "Frontend",
    icon: PanelsTopLeft,
    skills: ["React", "Next.js", "HTML", "CSS", "Bootstrap"],
  },
  {
    category: "Backend",
    icon: ServerCog,
    skills: ["Node.js", "NestJS", "Express.js", "FastAPI", "ASP.NET", "Spring Cloud"],
  },
  {
    category: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    category: "Architecture",
    icon: Network,
    skills: [
      "REST APIs",
      "WebSockets",
      "Microservices",
      "Distributed Systems",
      "Event-Driven Architecture",
    ],
  },
  {
    category: "AI & Machine Learning",
    icon: BrainCircuit,
    skills: [
      "Generative AI",
      "Large Language Models",
      "RAG",
      "Diffusion Models",
      "PyTorch",
      "Demucs",
      "GPU Optimization",
    ],
  },
  {
    category: "Cloud and DevOps",
    icon: CloudCog,
    skills: ["AWS", "Docker", "GitHub Actions", "Git", "CI/CD"],
  },
  {
    category: "Tools",
    icon: Wrench,
    skills: ["GitHub", "Jira", "Postman", "Cursor", "Claude Code"],
  },
]

export function AboutSection() {
  return (
    <div>
      <SectionHeader
        eyebrow="About Me"
        title="Engineering with"
        accent="purpose."
        subtitle="I turn complex product ideas into reliable, scalable software that creates measurable value."
        icon={Sparkles}
      />

      <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto w-full max-w-[460px]"
        >
          <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-brand/25 via-transparent to-brand-blue/10 blur-2xl" />
          <div className="glass-panel relative aspect-[5/4] overflow-hidden rounded-[2rem] border-brand/25 p-2">
            <div className="relative h-full overflow-hidden rounded-[1.55rem] bg-[#07101f]">
              <Image
                src="/Manuel Fernando Gamboa Rocha.png"
                alt="Manuel Fernando Gamboa Rocha logo"
                fill
                sizes="(max-width: 640px) calc(100vw - 3rem), 460px"
                className="object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07101f]/25 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel relative overflow-hidden rounded-[1.75rem] border-slate-500/15 p-6 sm:p-7 lg:p-8"
        >
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#7c6ee6]/80 to-transparent" />
          <p className="font-display text-2xl font-semibold tracking-[-0.02em] text-slate-50">
            Manuel Fernando Gamboa Rocha
          </p>
          <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#a9a2df]">
            Senior Software Engineer | Full Stack & AI
          </p>

          <div className="mt-6 space-y-4 text-[15px] leading-7 text-slate-300/90">
            <p>
              I am a senior software engineer with 17 years of experience delivering
              production web platforms, distributed services, and AI-enabled products.
            </p>
            <p>
              I work across architecture, backend, frontend, cloud, and machine-learning
              integration, translating complex product requirements into reliable systems that scale.
            </p>
            <p>
              My focus is disciplined engineering: clear technical decisions, maintainable code,
              measurable performance, and thoughtful collaboration from planning through production.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              ["17", "Years Building"],
              ["40+", "Products Shipped"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-xl border border-slate-400/10 bg-slate-300/[0.025] p-3.5"
              >
                <p className="font-display text-xl font-bold text-slate-50">{value}</p>
                <p className="mt-1 text-[13px] text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export function ExperienceSection() {
  return (
    <div>
      <SectionHeader
        eyebrow="Career Journey"
        title="Professional"
        accent="Experience"
        subtitle="Seventeen years of building production software, leading delivery, and improving systems at scale."
        icon={BriefcaseBusiness}
      />

      <div className="relative mx-auto max-w-6xl space-y-6">
        <div className="absolute bottom-10 left-5 top-10 w-px bg-gradient-to-b from-brand via-brand-blue/70 to-transparent md:left-8" />
        {timelineData.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true, amount: 0.12 }}
            className="relative pl-12 md:pl-20"
          >
            <div className="absolute left-[14px] top-10 z-10 h-3.5 w-3.5 rounded-full border-2 border-[#b58cff] bg-[#151338] shadow-[0_0_18px_rgba(137,92,255,0.95)] md:left-[26px]" />
            <div className="glass-panel group relative overflow-hidden rounded-[1.5rem] border-white/10 p-5 transition duration-300 hover:border-brand/40 sm:p-6 lg:p-7">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/80 to-transparent" />
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-[0_8px_28px_rgba(0,0,0,0.24)] sm:h-20 sm:w-20">
                    <Image
                      src={item.logo}
                      alt={`${item.company} logo`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                      {item.role}
                    </h3>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-soft">
                      {item.company}
                    </p>
                  </div>
                </div>
                <span className="meta-pill w-fit">
                  <CalendarDays className="h-4 w-4" />
                  {item.period}
                </span>
              </div>

              <ul className="mt-5 grid gap-3 text-[14px] leading-6 text-slate-300 sm:text-[15px] lg:grid-cols-2">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand shadow-[0_0_9px_rgba(123,97,255,0.9)]" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}

export function SkillsSection() {
  return (
    <div>
      <SectionHeader
        eyebrow="Technical Toolkit"
        title="Skills &"
        accent="Technologies"
        subtitle="A practical toolkit for building modern products across the interface, platform, cloud, and AI layers."
        icon={BrainCircuit}
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {skillsData.map((group, index) => {
          const Icon = group.icon
          return (
            <motion.article
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="glass-panel group rounded-[1.4rem] p-5 transition duration-300 hover:-translate-y-1 hover:border-brand/40 sm:p-6"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 shadow-[0_0_22px_rgba(123,97,255,0.16)]">
                  <Icon className="h-5 w-5 text-brand-soft" strokeWidth={1.7} />
                </div>
                <h3 className="font-display text-lg font-semibold leading-tight text-white">
                  {group.category}
                </h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[13px] font-medium text-slate-300 transition group-hover:border-brand/20 group-hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          )
        })}
      </div>
    </div>
  )
}

export default function AboutMe() {
  return (
    <div className="space-y-28">
      <AboutSection />
      <div id="experience">
        <ExperienceSection />
      </div>
      <div id="skills">
        <SkillsSection />
      </div>
    </div>
  )
}
