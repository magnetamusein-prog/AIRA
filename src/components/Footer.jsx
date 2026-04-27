import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  const footerLinks = {
    Services: ['AI Automation', 'AI Agents', 'Enterprise RAG', 'Custom Solutions'],
    Company: ['About Us', 'Process', 'Case Studies', 'Careers'],
    Resources: ['Blog', 'Documentation', 'API Reference', 'Community'],
  };

  return (
    <footer className="footer">
      <div className="footer-divider" />
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo-icon.png" alt="AIRA AI" className="footer-logo-img" />
              <span className="footer-logo-text">AIRA <span>AI</span></span>
            </div>
            <p className="footer-tagline">
              Architecting intelligent systems that transform how enterprises operate.
            </p>
            <div className="footer-socials">
              {['X', 'Li', 'GH', 'YT'].map((icon, i) => (
                <motion.a key={i} href="#" className="social-link"
                  whileHover={{ y: -3, borderColor: 'rgba(82,140,94,0.4)' }}
                  data-cursor-pointer>
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="footer-column">
              <h4 className="footer-column-title">{title}</h4>
              <ul>
                {links.map((link, i) => (
                  <li key={i}>
                    <motion.a href="#" whileHover={{ x: 4, color: '#8fd19d' }}
                      data-cursor-pointer>{link}</motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>© {year} AIRA AI. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#" data-cursor-pointer>Privacy Policy</a>
            <a href="#" data-cursor-pointer>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
