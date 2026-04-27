import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [clicks, setClicks] = useState([]);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const handleMouseDown = (e) => {
      setIsClicking(true);
      setClicks(prev => [...prev, { id: Date.now(), x: e.clientX, y: e.clientY }]);
    };
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const addListeners = () => {
      const els = document.querySelectorAll('a, button, input, textarea, [data-cursor-pointer]');
      const enter = () => setIsPointer(true);
      const leave = () => setIsPointer(false);
      els.forEach(el => {
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
      });
      return () => els.forEach(el => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
    const cleanup = addListeners();
    const observer = new MutationObserver(() => { cleanup(); addListeners(); });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => { cleanup(); observer.disconnect(); };
  }, []);

  const removeClick = useCallback((id) => {
    setClicks(prev => prev.filter(c => c.id !== id));
  }, []);

  return (
    <>
      <motion.div className={`cursor-dot ${isPointer ? 'pointer' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{ x: cursorX, y: cursorY }} />
      <motion.div className={`cursor-ring ${isPointer ? 'pointer' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{ x: cursorXSpring, y: cursorYSpring }} />
      {clicks.map(click => (
        <motion.div key={click.id} className="cursor-ripple"
          style={{ left: click.x, top: click.y }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          onAnimationComplete={() => removeClick(click.id)} />
      ))}
    </>
  );
};

export default CustomCursor;
