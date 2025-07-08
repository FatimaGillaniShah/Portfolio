'use client'

import useRoleSwitcher from '@/hooks/useRoleSwitcher'
import { useEffect, useRef, useState } from 'react'

type Particle = {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = []
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 5,
        })
      }
      setParticles(newParticles)
    }

    generateParticles()
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="bg-accent/30 animate-float absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

const TypingEffect = ({ text, speed = 100 }: { text: string; speed?: number }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  // Reset when `text` changes
  useEffect(() => {
    setDisplayText('')
    setCurrentIndex(0)
  }, [text])

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <span className="relative">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement | null>(null)

  const role = useRoleSwitcher({
    roles: ['FULLSTACK DEVELOPER', 'SOFTWARE ENGINEER', 'MERN DEVELOPER'],
    typingSpeed: 100, // slow it down
    pauseBetweenRoles: 3000, // wait before switching
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
      return () => heroElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="bg-primary bg-small-glow bg-small-glow-position md:bg-large-glow-position lg:bg-large-glow relative min-h-[calc(100vh-4rem)] overflow-hidden bg-no-repeat">
      <div
        className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(var(--accent-rgb, 99, 102, 241), 0.15), transparent 40%)`,
        }}
      />

      <FloatingParticles />

      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-8 px-4 pt-20 pb-2 md:grid-cols-2 lg:p-8">
        <div
          className={`flex min-h-48 flex-col justify-between transition-all duration-1000 lg:min-h-56 lg:max-w-[33.75rem] ${
            isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
          <div className="bg-accent/10 border-accent/20 text-accent mb-6 inline-flex w-fit animate-pulse items-center gap-2 rounded-full border px-3 py-1 font-mono text-sm">
            <div className="h-2 w-2 animate-ping rounded-full bg-green-400"></div>
            <span>Let’s Build Your Next Web App</span>
          </div>

          <div className="space-y-4">
            <h1 className="space-y-2">
              <span className="block font-mono text-lg tracking-wide text-[var(--tc)]">
                👋 Hello, I'm
              </span>
              <span className="mb-2 block text-4xl leading-tight font-bold text-[var(--n)] md:text-5xl lg:text-6xl">
                <span className="from-neutral via-accent to-neutral animate-gradient-x bg-gradient-to-r bg-clip-text text-transparent">
                  Syeda Fatima
                </span>
              </span>

              <div className="text-accent block flex min-h-[3rem] items-center font-mono text-2xl font-bold md:text-3xl">
                <TypingEffect text={role} speed={150} />
              </div>
            </h1>

            <div
              className={`space-y-3 transition-all delay-300 duration-1000 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}>
              <h2 className="text-neutral/90 text-lg leading-relaxed md:text-xl">
                Crafting <span className="text-accent font-semibold">innovative solutions</span> to
                solve <span className="text-accent font-semibold">real-world problems</span>
              </h2>

              <p className="text-neutral/70 text-sm md:text-base">
                Passionate about creating seamless user experiences with modern web technologies.
                Let's build something amazing together! 🚀
              </p>
            </div>
          </div>

          <div
            className={`my-8 grid grid-cols-3 gap-4 transition-all delay-500 duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}>
            {[
              { number: '15+', label: 'Projects' },
              { number: '5+', label: 'Years Exp.' },
              { number: '100%', label: 'Satisfaction' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-neutral/5 border-neutral/10 hover:border-accent/30 group rounded-lg border p-3 text-center transition-all duration-300">
                <div className="text-accent text-xl font-bold transition-transform duration-300 group-hover:scale-110">
                  {stat.number}
                </div>
                <div className="text-neutral/60 font-mono text-xs">{stat.label}</div>
              </div>
            ))}
          </div>

          <div
            className={`flex flex-wrap gap-4 transition-all delay-700 duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}>
            <button className="group bg-accent hover:bg-accent/90 hover:shadow-accent/25 relative min-w-36 cursor-pointer rounded-xl px-6 py-3 text-center text-sm font-semibold text-[#00071E] transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <span className="relative z-10 flex items-center gap-2">💼 Hire Me</span>
              <div className="from-accent to-accent/80 absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </button>

            <button className="group text-neutral border-neutral/20 hover:border-accent hover:bg-accent/5 relative cursor-pointer rounded-xl border-2 bg-transparent px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105">
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                LinkedIn
              </span>
            </button>
          </div>
        </div>

        {/* Code Block */}
        <div
          className={`flex min-h-[18.75rem] items-center justify-center transition-all delay-200 duration-1000 lg:min-h-[35rem] ${
            isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
          <div className="relative w-full max-w-md rounded-lg border border-neutral-800 bg-[#0e0e11] shadow-xl ring-1 ring-neutral-700 backdrop-blur-sm">
            <div className="rounded-t-lg border-b border-neutral-800 bg-[#1f1f22] px-4 py-2 font-mono text-sm text-orange-400">
              // portfolio-banner.js
            </div>
            <pre className="overflow-x-auto px-4 py-4 font-mono text-sm leading-relaxed text-neutral-200">
              <span className="text-orange-400">// My Portfolio Banner</span>
              {'\n'}
              function buildCareer() {'{'}
              {'\n  '}const skills = ['React', 'Next.js', 'TypeScript', 'Node.js'];
              {'\n  '}const passion = true;
              {'\n\n  '}if (passion && skills.length {'>'} 0) {'{'}
              {'\n    '}return "Let's build something amazing together! 🚀";
              {'\n  }'}
              {'\n}'}
            </pre>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(5deg);
          }
          66% {
            transform: translateY(5px) rotate(-5deg);
          }
        }

        @keyframes gradient-x {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        .animate-float {
          animation: float 15s ease-in-out infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 8s ease infinite;
          background-size: 200% 200%;
        }

        .animate-bounce {
          animation: bounce 3s ease-in-out infinite;
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </section>
  )
}

export default Hero
