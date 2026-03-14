// Technologies section showcasing tech stack

export function TechnologiesSection() {
  const technologies = [
    "Flutter",
    "Next.js",
    "React",
    "TypeScript",
    "Dart",
    "Node.js",
    "Firebase",
    "MongoDB",
    "Express.js",
    "Tailwind CSS",
  ]

  return (
    <section className="py-20 px-4 bg-black/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center text-white">Technologies I Work With</h2>
        <p className="text-white/80 text-center mb-12 max-w-2xl mx-auto">
          A diverse toolkit for building scalable and modern applications
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white hover:border-[#F9F6C4] transition-colors animate-scale-in"
              style={{ animationDelay: `${(index % 4) * 0.1}s` }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
