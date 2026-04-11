import React, { useState, useEffect, useRef, type ReactNode } from 'react';
// @ts-expect-error - Bypassing missing types for vanilla JSX component
import ParticleTypography from './components/ParticleTypography';

// --- ADVANCED TECHNIQUE: Reusable Scroll Reveal Component ---
// Uses the Intersection Observer API to detect when an element enters the viewport
const ScrollReveal = ({ children, delay = 0 }: { children: ReactNode, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = domRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (currentRef) observer.unobserve(currentRef); 
          }
        });
      },
      { threshold: 0.1 } 
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
};

// --- NEW COMPONENT: Integrated Project Card ---
export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  title: string;
  description: string;
  link: string;
  linkText?: string;
  tag?: string; 
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ className = "", imgSrc, title, description, link, tag, linkText = "View Project", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/80 text-white shadow-sm transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:shadow-white/10 ${className}`}
        {...props}
      >
        {/* Card Image Section */}
        <div className="aspect-video overflow-hidden border-b border-white/5 bg-black/50">
          <img
            src={imgSrc}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
            loading="lazy"
          />
        </div>

        {/* Card Content Section */}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-blue-400">
              {title}
            </h3>
            {tag && (
              <span className="text-[10px] text-gray-400 font-mono font-bold tracking-wider uppercase px-2 py-1 bg-white/5 rounded-md">
                {tag}
              </span>
            )}
          </div>
          <p className="mt-3 flex-1 text-gray-400 leading-relaxed">{description}</p>
          
          {/* Card Link/CTA */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/button mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition-all duration-300 hover:underline"
            onClick={(e) => e.stopPropagation()} 
          >
            {linkText}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover/button:translate-x-1">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    );
  }
);
ProjectCard.displayName = "ProjectCard";

function App() {
  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowUI(true);
    }, 5500); 
    return () => clearTimeout(timer);
  }, []);

  // --- ADVANCED TECHNIQUE: Smooth Scrolling ---
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  return (
    <main className="w-full min-h-screen bg-black text-gray-100 font-sans selection:bg-gray-700 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[100dvh] flex flex-col items-center justify-end pb-12 border-b border-white/5 overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <ParticleTypography />
        </div>

        <div 
          className={`relative z-10 max-w-4xl mx-auto text-center px-6 pointer-events-none transition-all duration-1000 ease-out transform ${
            showUI ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* ADVANCED TECHNIQUE: clamp() for fluid typography */}
          <h2 className="font-bold tracking-tight mb-8 text-white text-[clamp(1.5rem,4vw,2.5rem)]">
            Machine Learning / Fullstack / Cybersecurity
          </h2>
        </div>

        <div 
          onClick={() => document.getElementById('about')?.scrollIntoView()}
          className={`relative z-10 cursor-pointer transition-all duration-1000 delay-300 ease-out transform hover:scale-110 ${
            showUI ? 'opacity-50 hover:opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-white">
            <path d="m7 10 5 5 5-5"/>
          </svg>
        </div>
      </section>

      {/* 2. ABOUT ME */}
      <section id="about" className="relative z-10 w-full py-32 px-6 sm:px-12 bg-black border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          
          <ScrollReveal>
            <h3 className="text-[clamp(1.25rem,3vw,1.5rem)] font-semibold mb-6 tracking-wide uppercase text-gray-500">About Me</h3>
            <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
              <p>
                Beyond the classroom, I am deeply involved in building scalable tools and exploring the intersection of web infrastructure and artificial intelligence.
              </p>
              <p>
                Whether I am configuring automated virtual machine environments for Cyber @ UCI, architecting asynchronous image services, or exploring the linear algebra behind complex ML models, I thrive on tearing down black boxes and understanding how systems operate under the hood.
              </p>
            </div>
            
            <div className="mt-10">
                <a 
                    href="https://drive.google.com/file/d/11QVNbfqb8bZIE82k_uv3pTFTpvM8yTqy/view?usp=sharing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                >
                    View Resume <span className="ml-2 font-bold">→</span>
                </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <h3 className="text-[clamp(1.25rem,3vw,1.5rem)] font-semibold mb-6 tracking-wide uppercase text-gray-500">My Skills</h3>
            <div className="flex flex-wrap gap-3">
              {['Python', 'React & Vite', 'TypeScript', 'FastAPI', 'Tailwind CSS', 'TensorFlow', 'SQL & Redis', 'C++', 'Linux/Infra'].map((skill) => (
                <span key={skill} className="px-5 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-md hover:bg-white text-gray-300 hover:text-black hover:scale-105 transition-all cursor-default shadow-sm duration-300">
                  {skill}
                </span>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* 3. FEATURED PROJECTS */}
      <section className="relative z-10 w-full py-32 px-6 sm:px-12 bg-black border-t border-white/5">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto">
            <h3 className="text-[clamp(1.25rem,3vw,1.5rem)] font-semibold mb-12 tracking-wide uppercase text-gray-500 text-center">Featured Projects</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  title: 'Plotwise', 
                  desc: 'A spatial intelligence engine built with React, FastAPI, and TypeScript.', 
                  tag: 'Full-Stack', 
                  imgSrc: '/plotwise.jpg', 
                  link: 'https://github.com/yourusername/plotwise' 
                },
                { 
                  title: 'ZotImage', 
                  desc: 'An asynchronous image service utilizing Python, FastAPI, Redis, and Celery for high-performance processing.', 
                  tag: 'Architecture', 
                  imgSrc: '/zotimage.jpg', 
                  link: 'https://github.com/yourusername/zotimage' 
                },
                { 
                  title: 'Easy VM', 
                  desc: 'Automated virtual machine management system developed for Cyber @ UCI infrastructure.', 
                  tag: 'Cyber/Infra', 
                  imgSrc: '/easyvm.jpg', 
                  link: 'https://github.com/yourusername/easyvm' 
                }
              ].map((project, i) => (
                <ProjectCard
                  key={i}
                  title={project.title}
                  description={project.desc}
                  tag={project.tag}
                  imgSrc={project.imgSrc}
                  link={project.link}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. CERTIFICATIONS */}
      <section className="relative z-10 w-full py-32 px-6 sm:px-12 bg-black border-t border-white/5">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto">
            <h3 className="text-[clamp(1.25rem,3vw,1.5rem)] font-semibold mb-12 tracking-wide uppercase text-gray-500 text-center">Certifications</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Cert Card 1 */}
              <div className="relative group">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-gray-600 to-gray-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative h-full p-8 bg-zinc-900/80 border border-white/5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-medium text-white pr-4">AWS Certified Cloud Practitioner</h4>
                      <svg className="w-6 h-6 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">Amazon Web Services (AWS)</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                    <span className="text-xs text-gray-500 font-mono">Issued: March 2026</span>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white font-mono font-bold uppercase tracking-wider transition-colors">
                      Verify ↗
                    </a>
                  </div>
                </div>
              </div>

              {/* Cert Card 2 */}
              <div className="relative group">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-gray-600 to-gray-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative h-full p-8 bg-zinc-900/80 border border-white/5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-medium text-white pr-4">CompTIA Security+</h4>
                      <svg className="w-6 h-6 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">CompTIA</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                    <span className="text-xs text-gray-500 font-mono">Issued: January 2026</span>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white font-mono font-bold uppercase tracking-wider transition-colors">
                      Verify ↗
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 5. GET IN TOUCH */}
      <section className="relative z-10 w-full py-40 px-6 sm:px-12 bg-black border-t border-white/5 flex flex-col items-center text-center">
        <ScrollReveal>
          <h3 className="text-[clamp(2rem,5vw,3rem)] font-bold mb-6 text-white tracking-tight">Let's Connect.</h3>
          <p className="text-gray-400 max-w-lg mb-10 text-lg leading-relaxed mx-auto">
            I'm currently looking for new opportunities and collaborations. Whether you have a question or just want to say hi, my inbox is always open.
          </p>
          <a 
            href="mailto:your.email@uci.edu" 
            className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1 inline-block"
          >
            Say Hello
          </a>
        </ScrollReveal>
      </section>

    </main>
  );
}

export default App;