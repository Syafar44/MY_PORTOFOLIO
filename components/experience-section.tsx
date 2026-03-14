'use client'

import { useScrollAnimation } from '@/hooks/use-scroll-animation'

export function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation()
  const experience = [
  {
    id: 1,
    role: "Pos Panglima | Panglima Roqiiqu Group",
    company: "Mobile App",
    period: "2025 – Present",
    description: "Developed a Point of Sale (POS) mobile application using Flutter for Panglima Roqiiqu Group to streamline daily operations and transaction management.",
  },
  {
    id: 2,
    role: "LMS Panglima | Panglima Roqiiqu Group",
    company: "Web",
    period: "2025",
    description: "Developed a comprehensive Learning Management System (LMS) web application using Next.js, Tailwind CSS, and MongoDB to facilitate internal training, manage educational resources, and track progress effectively.",
  },
  {
    id: 3,
    role: "Company Profile | Panglima Roqiiqu Group",
    company: "Web",
    period: "2025",
    description: "Built a responsive and modern company profile landing page using Next.js and Tailwind CSS to enhance digital presence and meet the company's business needs.",
  },
  {
    id: 4,
    role: "Capstone Project | Cari Bareng",
    company: "Web",
    period: "2024",
    description: "Developed 'Cari Bareng', a community-driven web application built with Next.js, Tailwind CSS, and Supabase. This platform is designed to help people find and report lost belongings within the local community.",
  }
]

  return (
    <section id="experience" className="py-20 px-4 backdrop-blur-sm" ref={ref}>
      <div className={`max-w-4xl mx-auto scroll-fade-in-up ${isVisible ? 'visible' : ''}`}>
        <h2 className="text-4xl font-bold mb-12">Experience & Projects</h2>

        {/* Timeline */}
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div key={exp.id} className="relative">
              {/* Timeline Line */}
              {index !== experience.length - 1 && (
                <div className="absolute left-0 top-12 bottom-0 w-0.5 bg-linear-to-b from-[#F9F6C4] to-[#F9F6C4]/20" />
              )}

              {/* Timeline Item */}
              <div className="border-l-2 border-[#F9F6C4] pl-8 pb-8">
                {/* Timeline Dot */}
                <div className="absolute -left-3 top-2 w-5 h-5 bg-[#F9F6C4] rounded-full border-4 border-background" />

                {/* Content */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-2xl font-semibold">{exp.role}</h3>
                    <p className="text-[#F9F6C4] font-medium">{exp.company}</p>
                  </div>
                  <span className="text-muted-foreground text-sm whitespace-nowrap ml-4">{exp.period}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
