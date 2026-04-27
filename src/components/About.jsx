import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './About.css';

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered', icon: '📦' },
  { value: 50, suffix: '+', label: 'Enterprise Clients', icon: '🏢' },
  { value: 10, suffix: 'M+', label: 'Hours Automated', icon: '⏱️' },
  { value: 99.9, suffix: '%', label: 'System Uptime', icon: '🟢' },
];

const AnimatedCounter = ({ value, suffix, inView }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const isDecimal = value % 1 !== 0;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = eased * end;
      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);
  return <span>{count}{suffix}</span>;
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="about-container">
        <div className="about-content">
          <motion.div className="about-text"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}>
            <span className="section-label">WHY AIRA AI</span>
            <h2 className="section-title">
              We Don't Just Build AI.<br />
              <span className="text-gradient">We Architect Intelligence.</span>
            </h2>
            <p className="about-description">
              AIRA AI is an elite AI agency specializing in enterprise-grade automation,
              autonomous agent systems, and production RAG architectures. We partner with
              forward-thinking companies to transform their operations through intelligent
              systems that learn, adapt, and scale.
            </p>
            <p className="about-description">
              Our team combines deep expertise in machine learning, software engineering,
              and business strategy to deliver solutions that create measurable ROI from day one.
            </p>
            <div className="about-badges">
              <div className="about-badge">
                <span className="badge-icon">🔒</span>
                <span>Enterprise Security</span>
              </div>
              <div className="about-badge">
                <span className="badge-icon">🚀</span>
                <span>Rapid Deployment</span>
              </div>
              <div className="about-badge">
                <span className="badge-icon">📊</span>
                <span>Data-Driven</span>
              </div>
            </div>
          </motion.div>

          <motion.div className="about-stats-grid"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}>
            {stats.map((stat, i) => (
              <motion.div key={i} className="stat-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, borderColor: 'rgba(82,140,94,0.3)' }}
                data-cursor-pointer>
                <span className="stat-icon">{stat.icon}</span>
                <span className="stat-value">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
                </span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
