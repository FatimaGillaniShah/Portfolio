'use client'

import { Project } from '@/lib/types'
import Image from 'next/image'
import { useState } from 'react'
import { Earning, GithubIcon, Likes, PreviewIcon, Star, Timer } from '../../utils/icons'

const IconText: React.FC<{ icon: string; text: string; delay?: number }> = ({
  icon,
  text,
  delay = 0,
}) => (
  <li
    className="animate-fade-in flex gap-2 opacity-0"
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}>
    <Image
      src={icon}
      alt={text}
      className="size-[18px] transition-transform duration-300 hover:scale-110 hover:rotate-12 md:size-5"
    />
    <span className="text-neutral hover:text-accent text-sm transition-colors duration-300">
      {text}
    </span>
  </li>
)

interface ProjectCardProps {
  data: Project
  index?: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false)
  const {
    title,
    shortDescription,
    visitors,
    earned,
    ratings,
    githubStars,
    numberOfSales,
    livePreview,
    githubLink,
    siteAge,
    type,
    cover,
  } = data

  return (
    <div
      className="group bg-secondary border-border animate-fade-in hover:border-accent/60 relative overflow-hidden rounded-[14px] border p-5 opacity-0 transition-all duration-500 ease-out hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
      style={{
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'forwards',
        transform: 'translateY(20px)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {/* Gradient Overlay Animation */}
      <div className="from-accent/5 to-secondary-content/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Floating particles effect */}
      <div className="bg-accent/20 absolute -top-2 -right-2 h-4 w-4 rounded-full opacity-0 transition-all duration-700 group-hover:animate-pulse group-hover:opacity-100" />
      <div
        className="bg-secondary-content/30 absolute top-4 -left-1 h-2 w-2 rounded-full opacity-0 transition-all duration-500 group-hover:animate-bounce group-hover:opacity-100"
        style={{ animationDelay: '200ms' }}
      />

      <div className="relative z-10 flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center">
            <h3
              className={`text-secondary-content text-lg font-medium transition-all duration-300 md:font-semibold ${isHovered ? 'text-accent scale-105' : ''}`}>
              {title}
            </h3>
            {type && (
              <span
                className={`h-7 w-fit rounded-md bg-[#FFFFFF1A] p-1 text-sm backdrop-blur-[80px] transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                  type === 'New 🔥'
                    ? 'animate-blink text-tag hover:animate-pulse'
                    : 'text-accent hover:bg-accent/20'
                }`}>
                {type}
              </span>
            )}
          </div>
          <ul className="mt-3 flex flex-col flex-wrap gap-2 sm:flex-row sm:gap-4">
            {(visitors || numberOfSales) && (
              <IconText
                text={(visitors || numberOfSales)?.toString() || ''}
                icon={Likes}
                delay={100}
              />
            )}
            {siteAge && <IconText text={siteAge} icon={Timer} delay={200} />}
            {earned && <IconText text={earned} icon={Earning} delay={300} />}
            {(ratings || githubStars) && (
              <IconText text={(ratings || githubStars)?.toString() || ''} icon={Star} delay={400} />
            )}
          </ul>
        </div>
        <figure className="relative flex justify-end overflow-hidden">
          <div
            className={`transition-all duration-500 ease-out ${isHovered ? 'scale-110 rotate-3 transform' : ''}`}>
            <div className="relative overflow-hidden rounded-md">
              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              <Image
                src={cover}
                width={150}
                height={80}
                alt="Project Cover"
                className="h-[80px] w-[150px] object-cover transition-all duration-500 ease-out group-hover:brightness-110"
              />
            </div>
          </div>
        </figure>
      </div>

      <div className="relative z-10">
        <div
          className={`bg-primary text-primary-content my-4 h-[100px] overflow-scroll rounded-2xl px-4 py-2 transition-all duration-500 ${isHovered ? 'border-accent/20 border shadow-inner' : ''}`}>
          <p className="text-[14px] leading-relaxed font-normal md:text-base">{shortDescription}</p>
        </div>

        <div className="flex gap-5">
          {livePreview && (
            <a
              href={livePreview}
              className="text-accent hover:text-accent/80 group/link flex gap-2 text-sm underline underline-offset-[3px] transition-all duration-300 ease-out hover:scale-110 hover:gap-3 md:text-base"
              target="_blank">
              <PreviewIcon className="h-auto w-[18px] transition-transform duration-300 group-hover/link:rotate-12 md:w-5" />
              <span className="relative">
                Live Preview
                <span className="bg-accent absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover/link:w-full" />
              </span>
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              className="text-accent hover:text-accent/80 group/link flex gap-2 text-sm underline underline-offset-[3px] transition-all duration-300 ease-out hover:scale-110 hover:gap-3 md:text-base"
              target="_blank">
              <GithubIcon className="w-[18px] transition-transform duration-300 group-hover/link:rotate-12 md:w-5" />
              <span className="relative">
                Github Link
                <span className="bg-accent absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover/link:w-full" />
              </span>
            </a>
          )}
        </div>
      </div>

      {/* Corner accent decoration */}
      <div className="border-t-accent/20 group-hover:border-t-accent/40 absolute top-0 right-0 h-0 w-0 border-t-[20px] border-l-[20px] border-l-transparent transition-all duration-500" />
    </div>
  )
}

export default ProjectCard
