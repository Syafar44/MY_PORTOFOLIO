// Services/What I Do section showcasing main areas of expertise

import { Smartphone, Globe, Zap } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Building cross-platform mobile apps with Flutter",
    },
    {
      icon: Globe,
      title: "Web Development",
      description: "Creating modern web applications with Next.js, React, and TypeScript",
    },
    {
      icon: Zap,
      title: "Full-Stack Solutions",
      description: "End-to-end development from backend APIs to frontend interfaces",
    },
  ]

  return (
    <section className="py-16 px-4 bg-black/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center text-white">What I Do</h2>
        <p className="text-white/80 text-center mb-12 max-w-2xl mx-auto">
          I offer comprehensive development services across mobile and web platforms
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="p-8 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:border-[#F9F6C4] transition-colors animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Icon className="w-12 h-12 text-[#F9F6C4] mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-white/70">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
