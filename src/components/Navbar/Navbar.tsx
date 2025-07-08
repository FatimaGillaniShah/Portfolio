'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BurgerIcon, CloseIcon } from '../../utils/icons'
import Logo from './Logo'

const navItems = [
  {
    label: '_home',
    href: '/',
  },
  {
    label: '_projects',
    href: '/#projects',
  },
  {
    label: '_services',
    href: '/#services',
  },
  {
    label: '_contact-me',
    href: '/#contact',
  },
]

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsVisible(!isVisible)
  }

  const closeMenu = () => {
    setIsVisible(false)
  }

  return (
    <>
      {/* Backdrop overlay for mobile menu */}
      {isVisible && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"
          onClick={closeMenu}
        />
      )}

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled 
          ? 'bg-primary/95 backdrop-blur-lg shadow-lg shadow-primary/10 border-border/50' 
          : 'bg-primary/80 backdrop-blur-sm border-transparent'
      } border-b h-16 overflow-visible`}>
        <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-between px-4 py-1">
          {/* Logo section with enhanced animation */}
          {isVisible ? (
            <div className="text-primary-content md:hidden font-mono text-lg animate-in slide-in-from-left duration-300">
              _menu
            </div>
          ) : (
            <Link href="/" onClick={closeMenu}>
              <div className="group relative flex items-center gap-3 transition-all duration-500 hover:scale-105">
                <div className="transform transition-transform duration-300 group-hover:rotate-12">
                  <Logo />
                </div>
                <span className="text-primary-content font-mono text-lg relative overflow-hidden">
                  syeda_fatima
                  <span className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-500 ease-out"></span>
                </span>
              </div>
            </Link>
          )}

          {/* Mobile menu toggle with enhanced animation */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="relative p-2 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-lg"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <div className={`absolute inset-0 transition-all duration-300 ${isVisible ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}>
                  <BurgerIcon className="text-primary-content w-6 h-6" />
                </div>
                <div className={`absolute inset-0 transition-all duration-300 ${isVisible ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'}`}>
                  <CloseIcon className="text-primary-content w-6 h-6" />
                </div>
              </div>
            </button>
          </div>

          {/* Navigation menu with staggered animations */}
          <ul className={`${
            isVisible ? 'flex animate-in slide-in-from-top duration-300' : 'hidden'
          } bg-primary/95 backdrop-blur-lg absolute top-16 left-0 z-50 h-[calc(100vh-4rem)] w-full flex-col shadow-2xl md:static md:top-0 md:flex md:h-full md:w-[72%] md:flex-row md:bg-transparent md:backdrop-blur-none md:shadow-none lg:w-[70%]`}>
            
            {navItems.map(({ label, href }, index) => {
              const isActive = pathname === href
              return (
                <li
                  key={href}
                  onClick={closeMenu}
                  className={`group border-border flex items-center border-b px-4 text-2xl transition-all duration-300 hover:bg-accent/10 md:border-y-0 md:border-e md:text-base md:first:border-s md:last:ml-auto md:last:border-none md:last:px-0 md:hover:bg-transparent lg:px-8 ${
                    isVisible ? `animate-in slide-in-from-left duration-300` : ''
                  }`}
                  style={{
                    animationDelay: isVisible ? `${index * 100}ms` : '0ms'
                  }}
                >
                  <Link
                    href={href}
                    className={`relative w-full py-7 transition-all duration-300 md:py-4 font-mono overflow-hidden ${
                      isActive 
                        ? 'text-accent cursor-default' 
                        : 'text-primary-content hover:text-accent group-hover:translate-x-2 md:group-hover:translate-x-0 md:group-hover:translate-y-0'
                    }`}
                  >
                    <span className="relative z-10">
                      {label}
                    </span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full animate-pulse md:hidden"></span>
                    )}
                    
                    {/* Hover effect line */}
                    <span className={`absolute bottom-2 left-0 h-0.5 bg-accent transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    } md:bottom-1`}></span>
                    
                    {/* Glowing effect on hover */}
                    <span className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:hidden"></span>
                  </Link>
                </li>
              )
            })}
            
            {/* Mobile menu footer with social links or additional info */}
            <li className="mt-auto p-4 border-t border-border/30 md:hidden">
              <div className="text-primary-content/60 text-sm font-mono animate-in fade-in duration-500 delay-500">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Available for opportunities</span>
                </div>
                <div className="text-xs opacity-70">
                  Full Stack Developer • React • Node.js
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Animated bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
      </nav>

      {/* Spacer to prevent content jump */}
      <div className="h-16"></div>

      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-left {
          animation: slideInFromLeft 0.3s ease-out forwards;
        }

        /* Custom scrollbar for mobile menu */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(var(--accent), 0.5);
          border-radius: 2px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(var(--accent), 0.7);
        }
      `}</style>
    </>
  )
}

export default Navbar