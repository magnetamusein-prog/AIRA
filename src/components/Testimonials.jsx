import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "AIRA AI didn't just automate our workflows; they fundamentally re-architected how our data moves. The multi-agent system they built replaced three entire departments of manual data entry while reducing errors to zero.",
    author: "Sarah Jenkins",
    role: "CTO, TechVision Global",
    color: "var(--primary)"
  },
  {
    quote: "The Enterprise RAG solution provided by AIRA is mind-blowing. Our legal team can now query millions of documents securely and get perfect, hallucination-free answers in seconds. It's a game-changer.",
    author: "David Chen",
    role: "Managing Partner, Elevate Law",
    color: "var(--tertiary)"
  },
  {
    quote: "We brought them a logistical nightmare involving five different legacy systems. Within weeks, AIRA's automation pipeline had them communicating flawlessly. Their engineers are top-tier.",
    author: "Michael Ross",
    role: "VP Operations, Nexus Logistics",
    color: "var(--secondary)"
  }
];

const Testimonials = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.test-header > *',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1,
          scrollTrigger: { trigger: '.test-header', start: 'top 80%' }
        }
      );

      const cards = gsap.utils.toArray('.testimonial-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 100, opacity: 0, rotationY: -20 },
          { y: 0, opacity: 1, rotationY: 0, duration: 1, delay: i * 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: '.testimonials-grid', start: 'top 75%' }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, target) => {
    const rect = target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    gsap.to(target, { rotationY: x, rotationX: y, duration: 0.5, ease: 'power1.out' });
  };

  return (
    <section id="testimonials" className="testimonials-section" ref={containerRef}>
      <div className="testimonials-container">
        
        <div className="test-header">
          <span className="section-label">CLIENT SUCCESS</span>
          <h2 className="section-title">Trusted by <span className="text-gradient">Industry Leaders</span></h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((test, i) => (
            <div key={i} className="testimonial-card"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { rotationY: 0, rotationX: 0, duration: 0.5 })}
              style={{ '--card-color': test.color }} data-cursor-pointer>
              
              <div className="quote-mark">"</div>
              <p className="testimonial-quote">{test.quote}</p>
              
              <div className="testimonial-author-area">
                <div className="author-avatar" style={{ background: test.color }}>
                  {test.author.charAt(0)}
                </div>
                <div className="author-info">
                  <h4 className="author-name">{test.author}</h4>
                  <p className="author-role">{test.role}</p>
                </div>
              </div>
              <div className="testimonial-glow"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
