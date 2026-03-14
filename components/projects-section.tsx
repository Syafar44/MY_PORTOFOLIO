// Projects section showcasing your work
// Update project titles, descriptions, tags, and links with your own projects

"use client"

import { Github } from "lucide-react"
import GitHubProjects from "./github-projects"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="projects" className="py-20 px-4 bg-black/20" ref={ref}>
      <div className={`max-w-6xl mx-auto scroll-fade-in-up ${isVisible ? 'visible' : ''}`}>
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg">Explore my latest work and contributions on GitHub</p>
        </div>

        <GitHubProjects />

        {/* View All Projects Link */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/Syafar44"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F9F6C4] hover:bg-[#F9F6C4]/90 text-black rounded-lg transition-all hover:gap-3 font-medium"
          >
            <Github size={20} />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
