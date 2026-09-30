"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  CalendarDays,
  FolderKanban,
  GraduationCap,
  Linkedin,
  Mail,
  MessageSquare,
  Send,
  University,
  UserRound,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Loading from "@/components/loading"
import StatsBar from "@/components/stats-bar"
import TechStack from "@/components/tech-stack"
import GlassPanes from "@/components/glass-panes"
import Specializations from "@/components/specializations"
import { AboutSection, ExperienceSection, SkillsSection } from "@/components/about-me"
import SectionHeader from "@/components/section-header"
import ParticleBackground from "@/components/ParticleBackground"

const CONTACT_EMAIL = "manugamboa677@gmail.com"
const LINKEDIN_URL = "https://www.linkedin.com/in/manuel-fernando-gamboa-rocha-codelover/"
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}`

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setLoading(false), 1600)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null
  if (loading) return <Loading />

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, email, message } = formData
    const params = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: CONTACT_EMAIL,
      su: `Portfolio Inquiry from ${name}`,
      body: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })
    window.open(`https://mail.google.com/mail/?${params.toString()}`, "_blank", "noopener,noreferrer")
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const cardsData = [
    {
      id: 1,
      title: "eWel",
      description:
        "Developed and maintained eWel.ca, an e-commerce website, including product pages, responsive layouts, navigation, and database-driven features.",
      image: "/Ewel.png",
      site: "https://ewel.ca/",
      highlights: [
        "Built and maintained responsive product pages and e-commerce storefront layouts.",
        "Implemented clear navigation and reusable frontend components.",
        "Developed database-driven product and content features.",
        "Resolved cross-device usability, performance, and production issues.",
      ],
      tags: ["React", "Next.js", "JavaScript", "PHP", "MySQL", "Bootstrap"],
    },
    {
      id: 2,
      title: "Inkarnate",
      description: "Interactive map editing platform built for fast, collaborative world-building and asset management.",
      image: "/Incarnate.png",
      site: "https://inkarnate.com/",
      highlights: [
        "Developed and enhanced interactive map editing features to improve the user experience.",
        "Optimized asset management and image loading for faster performance.",
        "Implemented responsive user interfaces compatible with desktop and mobile devices.",
        "Improved map export and project management functionality.",
      ],
      tags: ["Next.js", "TypeScript", "JavaScript", "Node.js", "Express.js", "JWT", "AWS", "Docker"],
    },
    {
      id: 3,
      title: "VocalRemover.org",
      description: "AI audio-processing platform focused on fast, high-quality stem separation and scalable inference.",
      image: "/vocalRemover.png",
      site: "https://vocalremover.org/",
      highlights: [
        "Developed intuitive user interfaces for audio upload and processing.",
        "Implemented progress tracking and download functionality for processed audio files.",
        "Optimized audio playback and media management features.",
        "Improved responsive design and overall application performance.",
      ],
      tags: ["Next.js", "TypeScript", "Node.js", "Python", "FastAPI", "Demucs", "PostgreSQL", "Redis", "AWS", "Docker"],
    },
    {
      id: 4,
      title: "Quibaro",
      description: "AI-powered image generation and workflow automation for domain-specific creative production.",
      image: "/AI image generation.png",
      site: "https://quibaro.com/",
      highlights: [
        "Developed responsive interfaces for AI-powered image generation.",
        "Implemented prompt management and image gallery functionality.",
        "Built user history and download management features.",
        "Optimized frontend performance and enhanced the overall user experience.",
      ],
      tags: ["React.js", "Node.js", "Python", "FastAPI", "PyTorch", "Generative AI", "PostgreSQL", "Redis", "AWS"],
    },
    {
      id: 5,
      title: "Bidgarage",
      description: "Real-time auction system supporting concurrent bidding with strong consistency control and low-latency event propagation.",
      image: "/Bidgarage.png",
      site: "https://bidgarage.com/",
      highlights: [
        "Developed vehicle listing and auction management interfaces.",
        "Implemented real-time bidding functionality to enhance the auction experience.",
        "Built advanced search and filtering features for vehicle listings.",
        "Improved seller dashboard and overall platform usability.",
      ],
      tags: ["Next.js", "Tailwind CSS", "Node.js", "Express.js"],
    },
    {
      id: 6,
      title: "SoundsUnite",
      description: "Real-time music collaboration platform using event-driven architecture and WebSocket-based synchronization.",
      image: "/soundsunite.png",
      site: "https://soundsunite.com/",
      highlights: [
        "Developed responsive interfaces for music sharing and user profile management.",
        "Implemented audio upload and media management functionality.",
        "Improved messaging and community interaction features.",
        "Optimized application performance and cross-device compatibility.",
      ],
      tags: ["Next.js", "Spring Cloud", "Node.js", "Express.js"],
    },
    {
      id: 7,
      title: "Coowe",
      description: "Full-stack collaboration platform with AI-assisted meetings, LLM-powered workflows, and cloud-based services.",
      image: "/Coowe.png",
      site: "https://coowe.com/",
      highlights: [
        "Developed responsive interfaces for meeting scheduling and collaboration features.",
        "Developed AI-assisted meeting and collaboration workflows, including contextual summaries and action-item support.",
        "Integrated LLM-powered information-retrieval flows across frontend features, backend APIs, and cloud services.",
        "Implemented user invitation and notification functionality.",
        "Improved dashboard usability and overall user experience.",
        "Collaborated on feature enhancements to increase platform performance and reliability.",
      ],
      tags: ["React.js", "TypeScript", "Node.js", "Python", "FastAPI"],
    },
    {
      id: 8,
      title: "ADDX",
      description: "Secure investment and portfolio management platform with authentication, transaction processing, and analytics dashboards.",
      image: "/Addx.png",
      site: "https://addx.co/en/",
      highlights: [
        "Developed responsive user interfaces for the investor dashboard and portfolio management modules.",
        "Implemented secure user authentication and KYC verification workflows.",
        "Enhanced transaction history and investment tracking features.",
        "Collaborated with the development team to improve application performance and usability.",
      ],
      tags: ["React.js", "Node.js", "Express.js", "Python", "FastAPI"],
    },
  ]

  const projectOrder = [5, 2, 3, 4, 1, 6, 7, 8]
  const orderedCardsData = [...cardsData].sort(
    (first, second) => projectOrder.indexOf(first.id) - projectOrder.indexOf(second.id),
  )

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden text-white">
      <ParticleBackground />
      <Navbar />

      {/* Hero — left intro / center glass panes / right specializations */}
      <section id="home" className="relative overflow-hidden pb-8 pt-28 md:pb-10 md:pt-36">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="hero-network absolute inset-0 opacity-45" />
          <div className="absolute left-[4%] top-[16%] h-72 w-72 rounded-full bg-[#274071]/10 blur-[120px]" />
          <div className="absolute right-[12%] top-[22%] h-80 w-80 rounded-full bg-[#4123bd]/15 blur-[120px]" />
          <span className="absolute left-[50%] top-[28%] h-1.5 w-1.5 rounded-full bg-[#c7b7ff] shadow-[0_0_10px_#7963ff]" />
          <span className="absolute left-[49.7%] top-[65%] h-1.5 w-1.5 rounded-full bg-[#6284ff] shadow-[0_0_10px_#5577ff]" />
          <span className="absolute right-[28%] top-[68%] h-1.5 w-1.5 rounded-full bg-[#795cff] shadow-[0_0_12px_#6b4cff]" />
        </div>

        <div className="site-shell relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1.12fr_0.88fr] xl:grid-cols-[1.35fr_0.85fr_0.72fr] xl:gap-7">
            {/* Left: introduction */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-[700px]"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#38445b]/50 bg-[#152038]/50 px-3 py-1.5 text-xs text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                Senior Software Engineer | Full Stack & AI
              </div>

              <h1 className="font-display text-3xl font-bold leading-[1.12] tracking-tight sm:text-[2.5rem] xl:text-[2.8rem] 2xl:text-5xl">
                Hi, I&apos;m <span className="text-gradient">Manuel Fernando Gamboa Rocha.</span>
              </h1>

              <p className="mt-5 max-w-[580px] text-[15px] leading-7 text-slate-300 md:text-base xl:text-lg">
                I build scalable web applications and AI-powered solutions that solve real-world problems.
              </p>
              <p className="mt-3 max-w-[600px] text-sm leading-6 text-slate-400 md:text-[15px] xl:text-base">
                Seventeen years of experience designing, developing, and delivering production-grade SaaS platforms and AI
                systems.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <button
                  onClick={() => scrollTo("projects")}
                  className="inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-[#b34cff] to-[#403dff] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_26px_rgba(117,72,255,0.36)] transition hover:brightness-110 md:px-7"
                >
                  View My Work
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="inline-flex items-center gap-3 rounded-lg border border-[#39445a] bg-[#08101e]/30 px-6 py-3.5 text-sm font-medium text-slate-300 transition hover:border-brand hover:bg-brand/10 hover:text-white md:px-7"
                >
                  Let&apos;s Connect
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>

            {/* Center: glass panes visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.1 }}
              className="flex items-center justify-center"
            >
              <GlassPanes />
            </motion.div>

            {/* Right: specializations */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="lg:col-span-2 lg:mx-auto lg:w-full lg:max-w-xl xl:col-span-1 xl:mx-0 xl:max-w-none xl:pl-2"
            >
              <Specializations />
            </motion.div>
          </div>

          <div className="mt-12 md:mt-14">
            <StatsBar />
          </div>
        </div>
      </section>

      <TechStack />

      <section id="about" className="content-section py-20 md:py-24">
        <div className="site-shell">
          <AboutSection />
        </div>
      </section>

      <section id="experience" className="content-section border-y border-white/[0.035] py-20 md:py-24">
        <div className="site-shell">
          <ExperienceSection />
        </div>
      </section>

      <section id="projects" className="content-section py-20 md:py-24">
        <div className="site-shell">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionHeader
              eyebrow="Selected Work"
              title="Production"
              accent="Projects"
              subtitle="Real products designed, engineered, and delivered for demanding users and business-critical workflows."
              icon={FolderKanban}
            />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {orderedCardsData.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="content-section border-y border-white/[0.035] py-20 md:py-24">
        <div className="site-shell">
          <SkillsSection />
        </div>
      </section>

      <section id="education" className="content-section py-20 md:py-24">
        <div className="site-shell">
          <SectionHeader
            eyebrow="Education"
            title="My"
            accent="Education"
            subtitle="A computer science foundation from the University of Nebraska Omaha."
            icon={GraduationCap}
          />
          <div className="mx-auto flex max-w-5xl flex-col gap-5">
            {[
              {
                level: "Bachelor's Degree",
                degree: "B.S. in Computer Science",
                school: "University of Nebraska Omaha • Omaha, Nebraska, USA",
                period: "May 2009",
              },
            ].map((education, index) => (
              <motion.article
                key={education.level}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-panel relative overflow-hidden rounded-[1.5rem] border-brand/25 p-5 sm:p-6 lg:p-7"
              >
                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-brand via-[#c05cff] to-transparent" />
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.15rem] border border-brand/35 bg-brand/10 shadow-[0_0_30px_rgba(123,97,255,0.23)]">
                    <GraduationCap className="h-9 w-9 text-brand-soft" strokeWidth={1.6} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full border border-brand/30 bg-brand/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-soft">
                        {education.level}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-brand" />
                        Full-time
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-semibold text-white sm:text-2xl">
                      {education.degree}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium uppercase tracking-[0.06em] text-slate-400">
                      <span className="flex items-center gap-2">
                        <University className="h-5 w-5 text-brand-soft" />
                        {education.school}
                      </span>
                      <span className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5" />
                        {education.period}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="content-section border-t border-white/[0.035] py-20 md:py-24">
        <div className="site-shell">
          <SectionHeader
            eyebrow="Get In Touch"
            title="Contact"
            accent="Me"
            subtitle="Have a project in mind or want to collaborate? I'd love to hear from you."
            icon={Mail}
          />
          <div className="contact-stage mx-auto max-w-2xl">
            <div className="glass-panel rounded-[1.6rem] border-brand/30 p-5 shadow-[0_0_55px_rgba(108,60,255,0.16)] sm:p-7">
              <div className="mb-3 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand-soft">
                  <Mail className="h-6 w-6" strokeWidth={1.7} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-soft">Email</p>
                  <a
                    href={GMAIL_COMPOSE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block break-all text-[15px] font-semibold text-white transition hover:text-brand-soft sm:text-base"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
              <div className="mb-4 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand-soft">
                  <Linkedin className="h-6 w-6" strokeWidth={1.7} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-soft">LinkedIn</p>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block break-all text-[15px] font-semibold text-white transition hover:text-brand-soft sm:text-base"
                  >
                    linkedin.com/in/manuel-fernando-gamboa-rocha-codelover
                  </a>
                </div>
              </div>
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 transition focus-within:border-brand/55 focus-within:bg-brand/[0.055] sm:px-5">
                  <UserRound className="h-6 w-6 shrink-0 text-brand-soft" strokeWidth={1.6} />
                  <div className="min-w-0 flex-1">
                    <label htmlFor="name" className="block text-[11px] font-bold uppercase tracking-[0.16em] text-brand-soft">
                      Name
                    </label>
                    <input
                      placeholder="Please enter your name"
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full bg-transparent text-[15px] text-white outline-none placeholder:text-slate-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 transition focus-within:border-brand/55 focus-within:bg-brand/[0.055] sm:px-5">
                  <Mail className="h-6 w-6 shrink-0 text-brand-soft" strokeWidth={1.6} />
                  <div className="min-w-0 flex-1">
                    <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-[0.16em] text-brand-soft">
                      Email
                    </label>
                    <input
                      placeholder="Enter your email"
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full bg-transparent text-[15px] text-white outline-none placeholder:text-slate-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 transition focus-within:border-brand/55 focus-within:bg-brand/[0.055] sm:px-5">
                  <MessageSquare className="mt-1 h-6 w-6 shrink-0 text-brand-soft" strokeWidth={1.6} />
                  <div className="min-w-0 flex-1">
                    <label htmlFor="message" className="block text-[11px] font-bold uppercase tracking-[0.16em] text-brand-soft">
                      Message
                    </label>
                    <textarea
                      placeholder="Enter your message here"
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-1 block w-full resize-y bg-transparent text-[15px] text-white outline-none placeholder:text-slate-500"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#5935ff] via-[#922fff] to-[#db3f91] py-3.5 text-[15px] font-semibold text-white shadow-[0_0_30px_rgba(129,55,255,0.25)] transition hover:brightness-110"
                >
                  Send Message
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-12">
        <div className="site-shell">
          <div className="text-center text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Manuel Fernando Gamboa Rocha. All rights reserved.</p>
            <a href={GMAIL_COMPOSE_URL} target="_blank" rel="noopener noreferrer" className="mt-2 block text-brand-soft hover:text-white">
              {CONTACT_EMAIL}
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-brand-soft hover:text-white">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProjectCard({
  title,
  description,
  image,
  site,
  highlights,
}: {
  title: string
  description: string
  tags: string[]
  image: string
  site?: string
  highlights?: string[]
}) {
  return (
    <article className="glass-panel group rounded-[1.5rem] p-5 transition duration-300 hover:-translate-y-1 hover:border-brand/40 md:p-6">
      {site ? (
        <a href={site} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl border border-white/10 bg-black/40">
          <img src={image} alt={title} className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        </a>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
          <img src={image} alt={title} className="h-48 w-full object-cover" />
        </div>
      )}
      <div className="mt-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-brand-soft/80">Key Project</p>
          <h3 className="mt-1 font-display text-xl font-semibold text-white sm:text-2xl">{title}</h3>
        </div>
        <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-brand-soft">
          Featured
        </span>
      </div>
      <p className="mt-3 text-[15px] leading-6 text-slate-300 sm:text-base">{description}</p>
      {highlights && highlights.length > 0 && (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[14px] leading-6 text-slate-300 sm:text-[15px]">
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {site && (
        <div className="mt-6 border-t border-white/10 pt-4">
          <a
            href={site}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-brand to-brand-blue px-4 py-2 text-sm font-semibold text-white shadow-glow-sm transition hover:brightness-110"
          >
            Open Project
          </a>
        </div>
      )}
    </article>
  )
}
