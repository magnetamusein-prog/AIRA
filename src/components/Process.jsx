import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Process.css';

const steps = [
  { num: '01', title: 'Discovery & Analysis', desc: 'We deep-dive into your workflows, data architecture, and business objectives to identify high-impact automation opportunities.', icon: '🔍' },
  { num: '02', title: 'Architecture Design', desc: 'We design a scalable, secure AI system architecture tailored to your infrastructure, compliance needs, and growth trajectory.', icon: '📐' },
  { num: '03', title: 'Development & Integration', desc: 'Our engineers build and integrate AI agents, automation pipelines, and RAG systems with your existing tools and platforms.', icon: '⚙️' },
  { num: '04', title: 'Testing & Optimization', desc: 'Rigorous testing with real-world scenarios ensures reliability, accuracy, and performance before any production deployment.', icon: '🧪' },
  { num: '05', title: 'Deployment & Support', desc: 'We deploy to production with monitoring, provide ongoing optimization, and scale your AI systems as your business grows.', icon: '🚀' },
];

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="process" className="process-section" ref={ref}>
      <div className="process-container">
        <motion.div className="process-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}>
          <span className="section-label">HOW WE WORK</span>
          <h2 className="section-title">Our <span className="text-gradient">Process</span></h2>
          <p className="section-subtitle">
            A proven methodology that delivers results on time and at scale.
          </p>
        </motion.div>

        <div className="process-timeline">
          <motion.div className="timeline-line"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} />

          {steps.map((step, i) => (
            <motion.div key={i} className={`process-step ${i % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <div className="step-connector">
                <motion.div className="step-dot"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, type: 'spring', stiffness: 400 }} />
              </div>
              <motion.div className="step-card"
                whileHover={{ y: -5, borderColor: 'rgba(82,140,94,0.25)' }}
                data-cursor-pointer>
                <div className="step-header">
                  <span className="step-icon">{step.icon}</span>
                  <span className="step-num">{step.num}</span>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
