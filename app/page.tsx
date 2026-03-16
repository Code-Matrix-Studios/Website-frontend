"use client";

import Navbar from "./components/navbar";
import { AnimatedSection } from "./hooks/use-scroll-animations";

export default function Home() {
  return (
    <div className="relative w-full bg-[#0a1525]">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Base dark navy background */}
        <div className="absolute inset-0 bg-[#0a1525]" />

        {/* Main deep blue gradient on left side */}
        <div className="absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-[#003366] via-[#001a33] to-transparent" />

        {/* Top-left vibrant blue glow */}
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-[#0077CC] opacity-40 blur-[150px] rounded-full animate-float-slow" />

        {/* Mid-left medium blue accent */}
        <div className="absolute top-1/4 left-[10%] w-[400px] h-[500px] bg-[#0066BB] opacity-30 blur-[120px] rounded-full animate-float-medium" />

        {/* Bottom-left bright blue glow */}
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[500px] bg-[#0077CC] opacity-50 blur-[130px] rounded-full animate-drift" />

        {/* Secondary blue glow blending toward center */}
        <div className="absolute bottom-0 left-[15%] w-[400px] h-[350px] bg-[#004488] opacity-45 blur-[100px] rounded-full animate-pulse-glow" />

        {/* Blue-gray transition on right side */}
        <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-[#1a2a3a] via-[#0d1a2a] to-transparent opacity-60" />

        {/* Subtle blue-gray accent */}
        <div className="absolute top-1/3 right-[10%] w-[300px] h-[400px] bg-[#6b7d8a] opacity-15 blur-[100px] rounded-full animate-float-fast" />

        {/* Navbar */}
        <Navbar />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white px-4">
          <AnimatedSection animation="fade-down" duration={1}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="block italic font-light text-[#9fb1c1]">Welcome to</span>
              <span className="block mt-2 text-white">CodeMatrix</span>
            </h1>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up" delay={0.2} duration={1}>
            <p className="text-lg md:text-xl mb-8 text-[#8899aa] max-w-md">
              Building modern digital experiences
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="zoom-in" delay={0.4} duration={0.8}>
            <button className="bg-[#0066BB] hover:bg-[#0077CC] text-white px-8 py-3.5 rounded-full font-medium flex items-center gap-2 transition-all duration-300 border border-[#0077CC]/30">
              Get Started
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-right" duration={0.9}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              About <span className="text-[#0077CC]">Us</span>
            </h2>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedSection animation="fade-right" delay={0.1} duration={0.9}>
              <div>
                <p className="text-[#8899aa] text-lg leading-relaxed mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-[#8899aa] text-lg leading-relaxed">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </AnimatedSection>
            
            <div className="space-y-6">
              <AnimatedSection animation="fade-left" delay={0.2} duration={0.9}>
                <div className="bg-[#0d1a2a] border border-[#1a2a3a] rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Our Mission</h3>
                  <p className="text-[#6b7d8a]">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-left" delay={0.3} duration={0.9}>
                <div className="bg-[#0d1a2a] border border-[#1a2a3a] rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Our Vision</h3>
                  <p className="text-[#6b7d8a]">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-32 px-6 bg-[#0d1a2a]/50">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-up" duration={0.9}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
              Our <span className="text-[#0077CC]">Services</span>
            </h2>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up" delay={0.1} duration={0.9}>
            <p className="text-[#8899aa] text-center mb-16 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Web Development", desc: "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam id dolor id nibh ultricies vehicula." },
              { title: "Mobile Apps", desc: "Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla." },
              { title: "Cloud Solutions", desc: "Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean lacinia bibendum nulla sed." },
              { title: "UI/UX Design", desc: "Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras justo odio dapibus ac facilisis." },
              { title: "Data Analytics", desc: "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh ut fermentum massa justo." },
              { title: "Consulting", desc: "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna." },
            ].map((service, i) => (
              <AnimatedSection 
                key={i} 
                animation="flip-up" 
                delay={0.1 * i} 
                duration={0.8}
              >
                <div className="bg-[#0a1525] border border-[#1a2a3a] rounded-2xl p-8 hover:border-[#0077CC]/50 transition-all duration-300 group h-full">
                  <div className="w-12 h-12 bg-[#0077CC]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0077CC]/20 transition-all">
                    <div className="w-6 h-6 bg-[#0077CC] rounded-md" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-[#6b7d8a] leading-relaxed">{service.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fade-right" duration={0.9}>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Why Choose <span className="text-[#0077CC]">CodeMatrix</span>
                </h2>
                <p className="text-[#8899aa] text-lg leading-relaxed mb-8">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <ul className="space-y-4">
                  {["Innovative Solutions", "Expert Team", "24/7 Support", "Competitive Pricing"].map((item, i) => (
                    <AnimatedSection key={i} animation="fade-right" delay={0.1 * i} duration={0.6}>
                      <li className="flex items-center gap-3 text-[#9fb1c1]">
                        <div className="w-2 h-2 bg-[#0077CC] rounded-full" />
                        {item}
                      </li>
                    </AnimatedSection>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-left" delay={0.2} duration={0.9}>
              <div className="bg-gradient-to-br from-[#0077CC]/20 to-[#003366]/20 rounded-3xl p-8 border border-[#1a2a3a]">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { num: "500+", label: "Projects Completed" },
                    { num: "150+", label: "Happy Clients" },
                    { num: "50+", label: "Team Members" },
                    { num: "10+", label: "Years Experience" },
                  ].map((stat, i) => (
                    <AnimatedSection key={i} animation="zoom-in" delay={0.1 * i} duration={0.6}>
                      <div className="text-center p-6">
                        <div className="text-4xl font-bold text-[#0077CC] mb-2">{stat.num}</div>
                        <div className="text-[#6b7d8a] text-sm">{stat.label}</div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 bg-gradient-to-r from-[#003366]/50 to-[#0077CC]/20">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection animation="fade-down" duration={0.9}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up" delay={0.1} duration={0.9}>
            <p className="text-[#8899aa] text-lg mb-10 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="zoom-in" delay={0.2} duration={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#0077CC] hover:bg-[#0088DD] text-white px-8 py-4 rounded-full font-medium transition-all duration-300">
                Start Your Project
              </button>
              <button className="border border-[#0077CC] text-[#0077CC] hover:bg-[#0077CC]/10 px-8 py-4 rounded-full font-medium transition-all duration-300">
                Contact Us
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-[#1a2a3a]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-up" duration={0.8}>
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
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up" delay={0.2} duration={0.8}>
            <div className="pt-8 border-t border-[#1a2a3a] text-center text-[#6b7d8a] text-sm">
              &copy; 2026 CodeMatrix. All rights reserved.
            </div>
          </AnimatedSection>
        </div>
      </footer>
    </div>
  );
}
