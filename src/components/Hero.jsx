import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to(bgRef.current, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Cinematic entrance
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(bgRef.current, 
        { scale: 1.1, opacity: 0, filter: 'blur(20px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 2.5 }
      )
      .fromTo(logoRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.5 },
        "-=1.5"
      )
      .fromTo('.hero-title-char',
        { y: 100, opacity: 0, rotationX: -90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1, stagger: 0.05 },
        "-=1"
      )
      .fromTo('.hero-tagline',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      )
      .fromTo('.hero-description',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      )
      .fromTo('.hero-ctas',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      )
      .fromTo('.hero-scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.5"
      );

      // Mouse parallax for floating elements
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to('.hero-shape', {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.1
        });
        
        gsap.to(logoRef.current, {
          x: xPos * 0.5,
          y: yPos * 0.5,
          rotationY: xPos * 0.5,
          rotationX: -yPos * 0.5,
          duration: 1,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const title = 'AIRA';

  return (
    <section id="hero" className="hero" ref={heroRef}>
      {/* Cinematic Background */}
      <div className="hero-bg" ref={bgRef} style={{ backgroundImage: 'url(/hero-bg.png)' }}></div>
      <div className="hero-overlay"></div>

      {/* Floating geometric shapes (VFX) */}
      <div className="hero-shape hex-1"></div>
      <div className="hero-shape hex-2"></div>
      <div className="hero-shape circle-1"></div>
      <div className="hero-shape line-1"></div>
      
      {/* Glowing orbs */}
      <div className="hero-orb hero-orb-cyan"></div>
      <div className="hero-orb hero-orb-purple"></div>

      <div className="hero-content">
        {/* Logo */}
        <div className="hero-logo-container" ref={logoRef}>
          <img src="/logo-icon.png" alt="AIRA Logo" className="hero-logo-img" />
          <div className="hero-logo-glow"></div>
        </div>

        {/* Title */}
        <div className="hero-title-wrapper">
          <div className="hero-title-line" ref={titleRef}>
            {title.split('').map((char, i) => (
              <span key={i} className="hero-title-char" style={{ display: 'inline-block' }}>
                {char}
              </span>
            ))}
            <span className="hero-title-char text-gradient" style={{ marginLeft: '16px' }}>AI</span>
          </div>
        </div>

        {/* Tagline */}
        <p className="hero-tagline">
          Intelligent Automation <span className="dot">•</span> Autonomous Agents <span className="dot">•</span> Enterprise RAG
        </p>

        <p className="hero-description">
          We don't just build software. We architect intelligent digital ecosystems 
          that redefine how your enterprise operates and scales.
        </p>

        {/* CTAs */}
        <div className="hero-ctas">
          <button className="hero-cta-primary" data-cursor-pointer
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
            <div className="cta-glow"></div>
            <span>Explore Solutions</span>
            <span className="cta-arrow">→</span>
          </button>
          <button className="hero-cta-secondary" data-cursor-pointer
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Book Strategy Call
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Discover</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
