import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const sections = ['hero', 'services', 'tools', 'about', 'process', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const links = [
    { id: 'services', label: 'Services' },
    { id: 'tools', label: 'Tech Stack' },
    { id: 'about', label: 'About' },
    { id: 'process', label: 'Process' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.nav className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      <div className="navbar-inner">
        <motion.div className="navbar-logo" onClick={() => scrollTo('hero')}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} data-cursor-pointer>
          <img src="/logo-icon.png" alt="AIRA AI" className="navbar-logo-img" />
          <span className="navbar-logo-text">AIRA <span className="navbar-logo-ai">AI</span></span>
        </motion.div>

        <div className="navbar-links">
          {links.map(link => (
            <motion.button key={link.id}
              className={`navbar-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => scrollTo(link.id)}
              whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} data-cursor-pointer>
              {link.label}
              {activeSection === link.id && <motion.div className="navbar-link-indicator" layoutId="nav-indicator" />}
            </motion.button>
          ))}
        </div>

        <motion.button className="navbar-cta" onClick={() => scrollTo('contact')}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} data-cursor-pointer>
          Book a Call
        </motion.button>

        <button className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)} data-cursor-pointer>
          <span /><span /><span />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="navbar-mobile-menu"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
            {links.map((link, i) => (
              <motion.button key={link.id} className="navbar-mobile-link"
                onClick={() => scrollTo(link.id)}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }} data-cursor-pointer>
                {link.label}
              </motion.button>
            ))}
            <motion.button className="navbar-cta mobile" onClick={() => scrollTo('contact')}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              data-cursor-pointer>
              Book a Call
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
