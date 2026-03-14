'use client'

import { useScrollAnimation } from '@/hooks/use-scroll-animation'

// About section with bio and skills display
// Update the bio text and skills list with your own information

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation()
  const skills = [
    {
      category: "Frontend",
      items: [
        { name: "React.js", year: 2 },
        { name: "TypeScript", year: 1 },
        { name: "Tailwind CSS", year: 2 },
        { name: "Next.js", year: 2 },
      ],
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", year: 2 },
        { name: "MongoDB", year: 1 },
        { name: "API Design", year: 1 },
      ],
    },
    {
      category: "Mobile & Tools",
      items: [
        { name: "Android Development", year: 1 },
        { name: "Git", year: 2 },
        { name: "Problem Solving", year: 2 },
        { name: "UI/UX Design", year: 2 },
      ],
    },
  ]

  return (
    <section id="about" className="py-20 px-4 backdrop-blur-sm" ref={ref}>
      <div className={`max-w-4xl mx-auto scroll-fade-in-up ${isVisible ? 'visible' : ''}`}>
        <h2 className="text-4xl font-bold mb-12">About Me</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Bio Section */}
          <div>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I am an enthusiastic individual from Indonesia with an interest in developing web and mobile applications
              that solve real-world problems. My experience includes full-stack development, including
              React.js, Node.js, MongoDB, and Android development.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I enjoy creating clean, efficient, and scalable code, and I'm constantly learning new technologies to
              improve my skills. I'm particularly interested in product design, user experience, and building digital
              solutions that bring people together.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not programming, I like exploring innovative tech ideas, improving my productivity, and
              experimenting with small projects that generate real value.
            </p>
          </div>

          {/* Skills Section with Progress Bars */}
          <div>
            <h3 className="text-2xl font-semibold mb-8">Skills & Expertise</h3>
            <div className="space-y-8">
              {skills.map((skillGroup) => (
                <div className="space-y-4">
                  {skillGroup.items.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-4 group">
                      <div className="h-2 w-2 rounded-full bg-[#F9F6C4] group-hover:scale-150 transition-transform" />
                      <div className="flex-1 border-b border-dashed border-border pb-1 flex justify-between items-end">
                        <span className="text-md font-medium">{skill.name}</span>
                        <span className="text-sm font-mono text-[#F9F6C4] bg-[#F9F6C4]/10 px-2 py-0.5 rounded">
                          {skill.year} years
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
