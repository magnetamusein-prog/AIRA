import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: '01',
    title: 'AI Automation',
    subtitle: 'End-to-End Workflow Intelligence',
    desc: 'We design and deploy intelligent automation pipelines that eliminate manual bottlenecks, reduce operational costs, and scale your business processes infinitely.',
    features: ['Cross-platform orchestration', 'Intelligent document processing', 'Automated decision engines', 'Real-time data sync'],
    type: 'automation'
  },
  {
    id: '02',
    title: 'Autonomous Agents',
    subtitle: 'Digital Workers that Think',
    desc: 'Custom-built autonomous agents that understand context, make decisions, and execute complex multi-step tasks across your entire digital ecosystem.',
    features: ['Multi-agent systems', 'Natural language task execution', 'Adaptive learning', 'API integration'],
    type: 'agents'
  },
  {
    id: '03',
    title: 'Enterprise RAG',
    subtitle: 'Knowledge-Augmented Intelligence',
    desc: 'Production-grade Retrieval Augmented Generation systems that give your AI secure access to your proprietary data with absolute accuracy.',
    features: ['Vector database architecture', 'Hybrid semantic search', 'Multi-modal ingestion', 'Zero-hallucination guardrails'],
    type: 'rag'
  }
];

const MotionGraphic = ({ type }) => {
  if (type === 'automation') {
    return (
      <div className="mg-container automation-mg">
        <div className="mg-node node-1"></div>
        <div className="mg-node node-2"></div>
        <div className="mg-node node-3"></div>
        <div className="mg-line line-1"></div>
        <div className="mg-line line-2"></div>
        <div className="mg-scanline"></div>
      </div>
    );
  } else if (type === 'agents') {
    return (
      <div className="mg-container agents-mg">
        <div className="agent-core"></div>
        <div className="agent-orbit orbit-1">
          <div className="agent-satellite"></div>
        </div>
        <div className="agent-orbit orbit-2">
          <div className="agent-satellite"></div>
        </div>
        <div className="agent-orbit orbit-3">
          <div className="agent-satellite"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mg-container rag-mg">
        <div className="rag-doc doc-1"></div>
        <div className="rag-doc doc-2"></div>
        <div className="rag-doc doc-3"></div>
        <div className="rag-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`rag-particle p-${i}`}></div>
          ))}
        </div>
      </div>
    );
  }
};

const Services = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.services-header > *',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: '.services-header', start: 'top 80%' }
        }
      );

      // Service rows animation
      const rows = gsap.utils.toArray('.service-row');
      rows.forEach((row, i) => {
        const isEven = i % 2 === 0;
        const visual = row.querySelector('.service-visual-container');
        const content = row.querySelector('.service-content');
        
        gsap.fromTo(visual,
          { x: isEven ? -50 : 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: 'power2.out',
            scrollTrigger: { trigger: row, start: 'top 75%' }
          }
        );

        gsap.fromTo(content,
          { x: isEven ? 50 : -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.2,
            scrollTrigger: { trigger: row, start: 'top 75%' }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="services-section" ref={containerRef}>
      <div className="services-container">
        
        <div className="services-header">
          <span className="section-label">WHAT WE BUILD</span>
          <h2 className="section-title">High-End <span className="text-gradient">AI Solutions</span></h2>
          <p className="section-subtitle">
            Leveraging cutting-edge architecture to solve complex enterprise challenges.
          </p>
        </div>

        <div className="services-list">
          {servicesData.map((service, i) => (
            <div key={i} className={`service-row ${i % 2 === 0 ? '' : 'reverse'}`}>
              
              <div className="service-visual-container">
                <div className="service-visual-glow"></div>
                <div className="service-visual-wrapper">
                  <MotionGraphic type={service.type} />
                </div>
              </div>

              <div className="service-content">
                <div className="service-num">{service.id}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-subtitle">{service.subtitle}</p>
                <p className="service-desc">{service.desc}</p>
                
                <ul className="service-features-list">
                  {service.features.map((f, idx) => (
                    <li key={idx}>
                      <span className="feature-icon"></span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button className="service-btn" data-cursor-pointer>
                  <span>Explore Module</span>
                  <div className="service-btn-arrow">↗</div>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
