"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("Home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)

      const sections = navLinks.map((l) => l.href.replace("#", ""))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(navLinks[i].name)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const elem = document.getElementById(targetId)
    elem?.scrollIntoView({ behavior: "smooth" })
    setActive(name)
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-[#293858]/70 bg-[#060b18]/92 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl"
          : "border-[#1a263e] bg-[#060b18]/76 py-[1.125rem] backdrop-blur-md"
      }`}
    >
      <div className="site-shell flex items-center justify-between gap-4">
        <Link
          href="#home"
          className="shrink-0 font-display text-xl font-bold tracking-[-0.02em] text-white md:text-2xl"
          onClick={(e) => scrollToSection(e, "#home", "Home")}
        >
          <span className="sm:hidden">Manuel Gamboa</span>
          <span className="hidden sm:inline">Manuel Fernando Gamboa Rocha</span>
          <span className="text-[#ff3b3b]">.</span>
        </Link>

        <div className="hidden items-center gap-1.5 2xl:flex 2xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative rounded-lg border px-3 py-2 text-[14px] font-medium tracking-[0.01em] transition-all duration-300 2xl:px-3.5 2xl:text-[15px] ${
                active === link.name
                  ? "border-brand/20 bg-brand/10 text-white shadow-[inset_0_0_16px_rgba(123,97,255,0.08)]"
                  : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.045] hover:text-white"
              }`}
              onClick={(e) => scrollToSection(e, link.href, link.name)}
            >
              {link.name}
              {active === link.name && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-[15px] h-0.5 rounded-full bg-gradient-to-r from-[#ad56ff] to-[#5b6cff] shadow-[0_0_10px_rgba(139,92,246,0.9)]"
                />
              )}
            </a>
          ))}
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 focus:outline-none 2xl:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-b border-white/5 bg-[#05070a]/95 backdrop-blur-xl 2xl:hidden"
          >
            <div className="site-shell flex flex-col gap-1.5 py-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`rounded-xl border px-4 py-3.5 text-base font-medium transition ${
                    active === link.name
                      ? "border-brand/25 bg-brand/10 text-white"
                      : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
                  }`}
                  onClick={(e) => scrollToSection(e, link.href, link.name)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
