// Hero section with name, profession, and call-to-action buttons
// Customize the name, title, and bio with your own information

import ElasticBoxPhysics from "@/elastic-box-physics"
import { useEffect, useState } from "react";

export function HeroSection() {
  const badgeConfig = {
    badgeId: "software engineer",
    profileImage: '/me.png',
    role: "SYAFARUDDIN",
  }

  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize('mobile');
      else if (width < 1024) setScreenSize('ipad');
      else if (width < 1440) setScreenSize('laptop');
      else setScreenSize('desktop');
    };

    window.addEventListener('resize', updateSize);
    updateSize(); // Inisialisasi awal
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Konfigurasi posisi per perangkat
  const getTransform = () => {
    switch (screenSize) {
      case 'mobile':  return "";
      case 'ipad':    return "";
      case 'laptop':  return "translateY(-20%) translateX(-50%)";
      default:        return "translateY(-25%) translateX(-40%)";
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 py-20 bg-background">
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left side - Text content */}
          <div className="animate-fade-in-up">
            <p className="text-[#F9F6C4] font-semibold mb-2">Hi, I'm Syafaruddin</p>
            <h1 className="text-5xl xl:text-5xl 2xl:text-6xl font-bold mb-6 text-balance">
              Software Engineer | UI/UX Designer
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-balance">
              I specialize in building high-quality mobile and web applications using modern technologies. From Flutter to Next.js, I bring ideas to life with clean code and intuitive design.
            </p>

            {/* Location and stats */}
            <div className="flex gap-6 mb-8 flex-wrap">
              <div>
                <p className="text-muted-foreground text-sm">Location</p>
                <p className="font-semibold">Samarinda, Indonesia</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Repositories</p>
                <p className="font-semibold">13 repositories</p>
              </div>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex gap-4 flex-wrap">
              <a
                href="#projects"
                className="px-8 py-3 bg-[#F9F6C4] text-black rounded-lg hover:bg-[#F9F6C4]/90 transition-colors font-semibold"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border border-border rounded-lg hover:border-[#F9F6C4] transition-colors font-semibold"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Right side - Profile image */}
          <div
            style={{
              position: "sticky",
              top: "50vh",
              transform: getTransform(),
              alignSelf: "flex-start",
              transition: "transform 0.3s ease", // Agar transisi saat resize mulus
            }}
          >
            <ElasticBoxPhysics config={badgeConfig} />
          </div>
        </div>
      </div>
    </section>
  )
}
