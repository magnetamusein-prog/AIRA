import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [focused, setFocused] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="contact-glow-1" />
      <div className="contact-glow-2" />
      <div className="contact-container">
        <motion.div className="contact-info"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}>
          <span className="section-label">GET IN TOUCH</span>
          <h2 className="section-title">Let's Build <span className="text-gradient">Together</span></h2>
          <p className="contact-description">
            Ready to transform your business with AI? Let's discuss your vision
            and craft the perfect automation strategy.
          </p>
          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-item-icon">📧</span>
              <div>
                <span className="contact-item-label">Email</span>
                <span className="contact-item-value">hello@aira-ai.com</span>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-item-icon">📍</span>
              <div>
                <span className="contact-item-label">Location</span>
                <span className="contact-item-value">Global — Remote First</span>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-item-icon">⚡</span>
              <div>
                <span className="contact-item-label">Response Time</span>
                <span className="contact-item-value">Within 24 hours</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form className="contact-form" onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}>
          {['name', 'email', 'company'].map((field) => (
            <div key={field} className={`form-group ${focused === field || formData[field] ? 'focused' : ''}`}>
              <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input id={field} type={field === 'email' ? 'email' : 'text'}
                value={formData[field]}
                onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
                onFocus={() => setFocused(field)} onBlur={() => setFocused('')}
                required={field !== 'company'} />
              <div className="form-line" />
            </div>
          ))}
          <div className={`form-group ${focused === 'message' || formData.message ? 'focused' : ''}`}>
            <label htmlFor="message">Message</label>
            <textarea id="message" rows={4} value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
              required />
            <div className="form-line" />
          </div>
          <motion.button type="submit" className={`form-submit ${submitted ? 'submitted' : ''}`}
            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(82,140,94,0.3)' }}
            whileTap={{ scale: 0.98 }} data-cursor-pointer>
            {submitted ? '✓ Message Sent!' : 'Send Message'}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
