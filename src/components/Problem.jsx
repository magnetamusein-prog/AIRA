import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Problem.css';

gsap.registerPlugin(ScrollTrigger);

const Problem = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.problem-text-reveal',
        { y: 100, opacity: 0, rotationX: -80 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.5, stagger: 0.2, ease: 'power4.out',
          scrollTrigger: {
            trigger: '.problem-container',
            start: 'top 70%'
          }
        }
      );

      gsap.to('.problem-glow', {
        scale: 1.5,
        opacity: 0.8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.problem-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="problem-section" ref={containerRef}>
      <div className="problem-glow"></div>
      <div className="problem-container">
        
        <div className="problem-content">
          <div className="problem-text-reveal-container">
            <h2 className="problem-title problem-text-reveal">What is your problem?</h2>
          </div>
          <div className="problem-text-reveal-container">
            <h2 className="problem-title-highlight problem-text-reveal text-gradient-alt">
              With that, we can build AI like that.
            </h2>
          </div>
          
          <div className="problem-text-reveal-container">
            <p className="problem-desc problem-text-reveal">
              Bring us your most complex bottlenecks, scaling issues, or operational nightmares. 
              Our engineers don't just apply generic AI tools — we architect bespoke, intelligent 
              systems that turn your biggest problems into your strongest competitive advantages.
            </p>
          </div>

          <div className="problem-text-reveal-container" style={{ marginTop: '40px' }}>
            <button className="problem-btn problem-text-reveal" data-cursor-pointer
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Let's Solve It Together <span className="arrow">→</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Problem;
