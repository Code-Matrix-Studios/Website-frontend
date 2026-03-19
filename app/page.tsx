"use client";

import Navbar from "./components/navbar";
import { 
  useScrollProgress, 
  useLenisParallax, 
  useVelocitySkew,
  useHorizontalScroll,
  useScrollScale,
  useScrollRotate,
  useElementScrollProgress
} from "./hooks/use-scroll-animations";

// Coding icons components
function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function BracketsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" />
      <path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
    </svg>
  );
}

// Parallax section component
function ParallaxSection({ children, speed = 0.3, className = "" }: { children: React.ReactNode; speed?: number; className?: string }) {
  const { ref, transform } = useLenisParallax(speed);
  return (
    <div ref={ref} className={className} style={{ transform: `translateY(${transform}px)` }}>
      {children}
    </div>
  );
}

// Scale on scroll component
function ScaleSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, scale } = useScrollScale(0.85, 1);
  return (
    <div ref={ref} className={className} style={{ transform: `scale(${scale})`, transition: "transform 0.1s ease-out" }}>
      {children}
    </div>
  );
}

// Rotate on scroll component  
function RotateSection({ children, className = "", maxRotation = 5 }: { children: React.ReactNode; className?: string; maxRotation?: number }) {
  const { ref, rotation } = useScrollRotate(maxRotation);
  return (
    <div ref={ref} className={className} style={{ transform: `rotate(${rotation}deg)`, transition: "transform 0.1s ease-out" }}>
      {children}
    </div>
  );
}

// Progress-based reveal component
function ProgressReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, progress } = useElementScrollProgress();
  return (
    <div 
      ref={ref} 
      className={className} 
      style={{ 
        opacity: Math.min(1, progress * 2),
        transform: `translateY(${(1 - Math.min(1, progress * 2)) * 60}px)`,
        transition: "opacity 0.1s ease-out, transform 0.1s ease-out"
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const { progress, velocity, direction } = useScrollProgress();
  const skew = useVelocitySkew(3);
  const { containerRef, scrollRef, translateX } = useHorizontalScroll();

  return (
    <div className="relative w-full bg-[#0a1525]">
      {/* Progress indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-[#0077CC] z-50 origin-left"
        style={{ transform: `scaleX(${progress})` }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[#0a1525]" />
        <div className="absolute inset-y-0 left-0 w-[65%] bg-linear-to-r from-[#003366] via-[#001a33] to-transparent" />

        {/* Animated glows with parallax */}
        <ParallaxSection children speed={-0.2} className="absolute -top-20 -left-20 w-150 h-150 bg-[#0077CC] opacity-40 blur-[150px] rounded-full" />
        <ParallaxSection children speed={0.15} className="absolute top-1/4 left-[10%] w-100 h-125 bg-[#0066BB] opacity-30 blur-[120px] rounded-full" />
        <ParallaxSection children speed={-0.1} className="absolute -bottom-32 -left-32 w-150 h-125 bg-[#0077CC] opacity-50 blur-[130px] rounded-full" />
        <ParallaxSection children speed={0.2} className="absolute bottom-0 left-[15%] w-100 h-87.5 bg-[#004488] opacity-45 blur-[100px] rounded-full" />
        <div className="absolute top-0 right-0 w-[40%] h-full bg-linear-to-l from-[#1a2a3a] via-[#0d1a2a] to-transparent opacity-60" />
        <ParallaxSection children speed={0.1} className="absolute top-1/3 right-[10%] w-75 h-100 bg-[#6b7d8a] opacity-15 blur-[100px] rounded-full" />

        <Navbar />

        {/* Hero Content with velocity skew */}
        <div 
          className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white px-4"
          style={{ transform: `skewY(${skew}deg)` }}
        >
          <ParallaxSection speed={-0.15}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="block italic font-light text-[#9fb1c1]">Welcome to</span>
              <span className="block mt-2 text-white">CodeMatrix</span>
            </h1>
          </ParallaxSection>
          
          <ParallaxSection speed={-0.1}>
            <p className="text-lg md:text-xl mb-8 text-[#8899aa] max-w-md">
              Building modern digital experiences
            </p>
          </ParallaxSection>
          
          <ParallaxSection speed={-0.05}>
            <button className="bg-[#0066BB] hover:bg-[#0077CC] text-white px-8 py-3.5 rounded-full font-medium flex items-center gap-2 transition-all duration-300 border border-[#0077CC]/30">
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </ParallaxSection>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[#6b7d8a] text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 border-2 border-[#6b7d8a]/50 rounded-full flex justify-center pt-2">
              <div 
                className="w-1.5 h-1.5 bg-[#0077CC] rounded-full"
                style={{ 
                  animation: "bounce 1.5s infinite",
                  transform: `translateY(${Math.sin(Date.now() / 300) * 8}px)` 
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section with circles */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <ProgressReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              About <span className="text-[#0077CC]">Us</span>
            </h2>
          </ProgressReveal>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ProgressReveal>
              <div>
                <p className="text-[#8899aa] text-lg leading-relaxed mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-[#8899aa] text-lg leading-relaxed">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </ProgressReveal>
            
            {/* 3 Circles with coding icons */}
            <div className="relative h-100 flex items-center justify-center">
              {/* Large circle */}
              <RotateSection maxRotation={8} className="absolute">
                <div className="w-64 h-64 rounded-full border border-[#0077CC]/30 flex items-center justify-center bg-[#0a1525]/50 backdrop-blur-sm">
                  <div className="w-16 h-16 text-[#0077CC]">
                    <CodeIcon />
                  </div>
                </div>
              </RotateSection>

              {/* Medium circle */}
              <ScaleSection className="absolute -top-4 -right-4 md:top-8 md:right-8">
                <div className="w-40 h-40 rounded-full border border-[#0066BB]/40 flex items-center justify-center bg-[#0d1a2a]/80 backdrop-blur-sm">
                  <div className="w-10 h-10 text-[#0066BB]">
                    <TerminalIcon />
                  </div>
                </div>
              </ScaleSection>

              {/* Small circle */}
              <ParallaxSection speed={0.3} className="absolute -bottom-2 -left-2 md:bottom-12 md:left-4">
                <div className="w-24 h-24 rounded-full border border-[#004488]/50 flex items-center justify-center bg-[#001a33]/80 backdrop-blur-sm">
                  <div className="w-6 h-6 text-[#4499DD]">
                    <BracketsIcon />
                  </div>
                </div>
              </ParallaxSection>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Services Section */}
      <section ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <div className="absolute top-20 left-6 md:left-12 z-10">
            <ProgressReveal>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Our <span className="text-[#0077CC]">Services</span>
              </h2>
              <p className="text-[#6b7d8a]">Scroll to explore</p>
            </ProgressReveal>
          </div>
          
          <div 
            ref={scrollRef}
            className="flex gap-8 pl-6 md:pl-12 pt-32"
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {[
              { title: "Web Development", desc: "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam id dolor id nibh ultricies vehicula.", icon: <CodeIcon /> },
              { title: "Mobile Apps", desc: "Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla.", icon: <TerminalIcon /> },
              { title: "Cloud Solutions", desc: "Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean lacinia bibendum nulla sed.", icon: <BracketsIcon /> },
              { title: "UI/UX Design", desc: "Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras justo odio dapibus ac facilisis.", icon: <CodeIcon /> },
              { title: "Data Analytics", desc: "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh ut fermentum massa justo.", icon: <TerminalIcon /> },
              { title: "Consulting", desc: "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna.", icon: <BracketsIcon /> },
            ].map((service, i) => (
              <div 
                key={i} 
                className="shrink-0 w-87.5 md:w-100 bg-[#0d1a2a] border border-[#1a2a3a] rounded-3xl p-8 hover:border-[#0077CC]/50 transition-all duration-500 group"
                style={{ 
                  transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 2}deg)`,
                }}
              >
                <div className="w-14 h-14 bg-[#0077CC]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0077CC]/20 group-hover:scale-110 transition-all duration-300">
                  <div className="w-7 h-7 text-[#0077CC]">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-[#6b7d8a] leading-relaxed">{service.desc}</p>
              </div>
            ))}
            <div className="shrink-0 w-25" /> {/* Spacer */}
          </div>
        </div>
      </section>

      {/* Features Section with scale animations */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ProgressReveal>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Why Choose <span className="text-[#0077CC]">CodeMatrix</span>
                </h2>
                <p className="text-[#8899aa] text-lg leading-relaxed mb-8">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                </p>
                <ul className="space-y-4">
                  {["Innovative Solutions", "Expert Team", "24/7 Support", "Competitive Pricing"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#9fb1c1]">
                      <div className="w-2 h-2 bg-[#0077CC] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ProgressReveal>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { num: "500+", label: "Projects Completed" },
                { num: "150+", label: "Happy Clients" },
                { num: "50+", label: "Team Members" },
                { num: "10+", label: "Years Experience" },
              ].map((stat, i) => (
                <ScaleSection key={i}>
                  <div className="bg-linear-to-br from-[#0077CC]/10 to-[#003366]/10 rounded-2xl p-8 border border-[#1a2a3a] text-center hover:border-[#0077CC]/30 transition-all duration-300">
                    <div className="text-4xl md:text-5xl font-bold text-[#0077CC] mb-2">{stat.num}</div>
                    <div className="text-[#6b7d8a] text-sm">{stat.label}</div>
                  </div>
                </ScaleSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 bg-linear-to-r from-[#003366]/50 to-[#0077CC]/20">
        <ParallaxSection speed={0.1} className="max-w-4xl mx-auto text-center">
          <ProgressReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-[#8899aa] text-lg mb-10 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#0077CC] hover:bg-[#0088DD] text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105">
                Start Your Project
              </button>
              <button className="border border-[#0077CC] text-[#0077CC] hover:bg-[#0077CC]/10 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105">
                Contact Us
              </button>
            </div>
          </ProgressReveal>
        </ParallaxSection>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-[#1a2a3a]">
        <div className="max-w-6xl mx-auto">
          <ProgressReveal>
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">CodeMatrix</h3>
                <p className="text-[#6b7d8a] text-sm leading-relaxed">
                  Building modern digital experiences for businesses worldwide.
                </p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Company</h4>
                <ul className="space-y-2 text-[#6b7d8a] text-sm">
                  <li className="hover:text-[#0077CC] cursor-pointer transition-colors">About</li>
                  <li className="hover:text-[#0077CC] cursor-pointer transition-colors">Careers</li>
                  <li className="hover:text-[#0077CC] cursor-pointer transition-colors">Blog</li>
                  <li className="hover:text-[#0077CC] cursor-pointer transition-colors">Press</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Services</h4>
                <ul className="space-y-2 text-[#6b7d8a] text-sm">
                  <li className="hover:text-[#0077CC] cursor-pointer transition-colors">Web Development</li>
                  <li className="hover:text-[#0077CC] cursor-pointer transition-colors">Mobile Apps</li>
                  <li className="hover:text-[#0077CC] cursor-pointer transition-colors">Cloud Solutions</li>
                  <li className="hover:text-[#0077CC] cursor-pointer transition-colors">Consulting</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Contact</h4>
                <ul className="space-y-2 text-[#6b7d8a] text-sm">
                  <li>hello@codematrix.com</li>
                  <li>+1 (555) 123-4567</li>
                  <li>San Francisco, CA</li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-[#1a2a3a] text-center text-[#6b7d8a] text-sm">
              &copy; 2026 CodeMatrix. All rights reserved.
            </div>
          </ProgressReveal>
        </div>
      </footer>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(12px); }
        }
      `}</style>
    </div>
  );
}
