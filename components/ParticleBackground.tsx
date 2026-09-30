"use client"

import { useCallback, useMemo } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import type { Engine } from "tsparticles-engine"

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fullScreen: {
        enable: false,
        zIndex: 0,
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: false,
          },
          onHover: {
            enable: false,
          },
          resize: true,
        },
      },
      particles: {
        color: {
          value: ["#ffffff", "#b9a7ff", "#8b7cff", "#67a3ff"],
        },
        links: {
          enable: false,
        },
        move: {
          direction: "bottom-right",
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: { min: 0.18, max: 0.72 },
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 1000,
          },
          value: 92,
        },
        opacity: {
          value: { min: 0.12, max: 0.72 },
          animation: {
            enable: true,
            speed: 0.45,
            minimumValue: 0.08,
            sync: false,
          },
        },
        shape: {
          type: ["circle", "triangle"],
        },
        size: {
          value: { min: 0.7, max: 2.7 },
        },
      },
      detectRetina: true,
    }),
    [],
  )

  return (
    <div className="space-background" aria-hidden="true">
      <Particles id="space-particles" init={particlesInit} options={options} className="absolute inset-0 h-full w-full" />
      <span className="shooting-star shooting-star-one" />
      <span className="shooting-star shooting-star-two" />
      <span className="shooting-star shooting-star-three" />
      <span className="star-fragment star-fragment-one" />
      <span className="star-fragment star-fragment-two" />
      <span className="star-fragment star-fragment-three" />
      <span className="star-fragment star-fragment-four" />
      <span className="star-fragment star-fragment-five" />
    </div>
  )
}

export default ParticleBackground

