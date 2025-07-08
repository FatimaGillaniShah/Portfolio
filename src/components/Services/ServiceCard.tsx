'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ServiceCardTypes {
  icon: string
  title: string
  shortDescription: string
}

const ServiceCard: React.FC<ServiceCardTypes> = ({ title, shortDescription, icon }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group bg-secondary border-border hover:shadow-primary/20 relative flex cursor-pointer flex-col items-center overflow-hidden rounded-[14px] border p-5 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {/* Animated background gradient */}
      <div className="from-primary/5 to-accent/5 absolute inset-0 bg-gradient-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Floating particles effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="bg-primary/30 absolute h-2 w-2 animate-bounce rounded-full"
          style={{
            top: '20%',
            left: '10%',
            animationDelay: '0s',
            animationDuration: '3s',
          }}
        />
        <div
          className="bg-accent/40 absolute h-1 w-1 animate-bounce rounded-full"
          style={{
            top: '60%',
            right: '15%',
            animationDelay: '1s',
            animationDuration: '2.5s',
          }}
        />
        <div
          className="bg-primary/20 absolute h-1.5 w-1.5 animate-bounce rounded-full"
          style={{
            bottom: '30%',
            left: '20%',
            animationDelay: '2s',
            animationDuration: '4s',
          }}
        />
      </div>

      {/* Icon with enhanced animations */}
      <div className="relative z-10 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
        <div className="bg-primary/10 absolute inset-0 scale-150 rounded-full opacity-0 blur-md transition-all duration-500 group-hover:opacity-100" />
        <Image
          src={icon}
          alt={title}
          className={`relative z-10 my-1 size-14 transition-all duration-500 ${
            isHovered ? 'drop-shadow-lg' : ''
          }`}
        />
      </div>

      {/* Title with staggered animation */}
      <h5 className="text-accent relative z-10 mt-2 mb-5 transform text-center text-base font-semibold transition-all duration-500 group-hover:text-white">
        {title.split('').map((char, index) => (
          <span
            key={index}
            className="inline-block transition-all duration-300 group-hover:animate-pulse"
            style={{
              animationDelay: `${index * 50}ms`,
              transitionDelay: `${index * 30}ms`,
            }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h5>

      {/* Description card with slide-up animation */}
      <div
        className={`bg-primary relative z-10 w-full transform rounded-2xl p-4 transition-all duration-500 ${
          isHovered ? 'shadow-primary/20 translate-y-0 shadow-lg' : 'translate-y-1'
        }`}>
        {/* Animated border */}
        <div className="from-primary via-accent to-primary animate-gradient-x absolute inset-0 rounded-2xl bg-gradient-to-r bg-[length:200%_100%] opacity-20" />

        <p className="text-primary-content relative z-10 text-center text-sm font-normal transition-all duration-300 group-hover:font-medium">
          {shortDescription}
        </p>
      </div>

      {/* Bottom shine effect */}
      <div className="via-primary/50 absolute right-0 bottom-0 left-0 h-px scale-x-0 transform bg-gradient-to-r from-transparent to-transparent transition-transform duration-500 group-hover:scale-x-100" />
    </div>
  )
}

export default ServiceCard
