// Footer component with copyright and social links
// Customize with your name and social media links

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/20 py-8 px-4 bg-black/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-white/70 text-sm">© {currentYear} @syafar.dev. All rights reserved.</p>

          {/* Footer Links */}
          <div className="flex gap-6 text-sm">
            <a href="#about" className="text-white/70 hover:text-[#F9F6C4] transition-colors">
              About
            </a>
            <a href="#projects" className="text-white/70 hover:text-[#F9F6C4] transition-colors">
              Projects
            </a>
            <a href="#contact" className="text-white/70 hover:text-[#F9F6C4] transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
