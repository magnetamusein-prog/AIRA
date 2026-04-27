import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './FloatingTools.css';

const tools = [
  { name: 'Claude AI', category: 'LLM', color: '#D4A574', letter: 'C' },
  { name: 'Antigravity AI', category: 'Agent IDE', color: '#8fd19d', letter: 'AG' },
  { name: 'ChatGPT', category: 'LLM', color: '#74AA9C', letter: 'G' },
  { name: 'OpenAI', category: 'AI Platform', color: '#ffffff', letter: 'OA' },
  { name: 'Make', category: 'Automation', color: '#6D3BF5', letter: 'M' },
  { name: 'n8n', category: 'Workflow', color: '#EA4B71', letter: 'n8n' },
  { name: 'Zapier', category: 'Automation', color: '#FF4F00', letter: 'Z' },
  { name: 'HubSpot', category: 'CRM', color: '#FF7A59', letter: 'H' },
  { name: 'LangChain', category: 'Framework', color: '#1C3C3C', letter: 'LC' },
  { name: 'Pinecone', category: 'Vector DB', color: '#000000', letter: 'PC' },
  { name: 'Vercel', category: 'Deployment', color: '#ffffff', letter: 'V' },
  { name: 'Supabase', category: 'Backend', color: '#3ECF8E', letter: 'SB' },
  { name: 'GitHub', category: 'Version Control', color: '#ffffff', letter: 'GH' },
  { name: 'Anthropic', category: 'AI Research', color: '#D4A574', letter: 'A' },
  { name: 'Perplexity', category: 'AI Search', color: '#20B2AA', letter: 'P' },
  { name: 'Mistral', category: 'LLM', color: '#F7D046', letter: 'Mi' },
];

const FloatingTools = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="tools" className="tools-section" ref={ref}>
      <div className="tools-container">
        <motion.div className="tools-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}>
          <span className="section-label">OUR TECH STACK</span>
          <h2 className="section-title">Powered by the <span className="text-gradient">Best in AI</span></h2>
          <p className="section-subtitle">
            We leverage cutting-edge AI platforms, automation tools, and infrastructure to deliver world-class solutions.
          </p>
        </motion.div>

        <div className="tools-orbit-wrapper">
          <div className="tools-center-glow" />

          {/* Top row - scrolling left */}
          <div className="tools-marquee-row">
            <div className="tools-marquee-track left">
              {[...tools.slice(0, 8), ...tools.slice(0, 8)].map((tool, i) => (
                <motion.div key={i} className="tool-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: (i % 8) * 0.05, duration: 0.5 }}
                  whileHover={{ scale: 1.08, y: -5 }} data-cursor-pointer>
                  <div className="tool-icon" style={{
                    background: `linear-gradient(135deg, ${tool.color}15, ${tool.color}08)`,
                    border: `1px solid ${tool.color}25`,
                  }}>
                    <span style={{ color: tool.color, fontSize: tool.letter.length > 2 ? '0.65rem' : '0.85rem' }}>
                      {tool.letter}
                    </span>
                  </div>
                  <div className="tool-info">
                    <span className="tool-name">{tool.name}</span>
                    <span className="tool-category">{tool.category}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom row - scrolling right */}
          <div className="tools-marquee-row">
            <div className="tools-marquee-track right">
              {[...tools.slice(8), ...tools.slice(8)].map((tool, i) => (
                <motion.div key={i} className="tool-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: (i % 8) * 0.05 + 0.3, duration: 0.5 }}
                  whileHover={{ scale: 1.08, y: -5 }} data-cursor-pointer>
                  <div className="tool-icon" style={{
                    background: `linear-gradient(135deg, ${tool.color}15, ${tool.color}08)`,
                    border: `1px solid ${tool.color}25`,
                  }}>
                    <span style={{ color: tool.color, fontSize: tool.letter.length > 2 ? '0.65rem' : '0.85rem' }}>
                      {tool.letter}
                    </span>
                  </div>
                  <div className="tool-info">
                    <span className="tool-name">{tool.name}</span>
                    <span className="tool-category">{tool.category}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FloatingTools;
