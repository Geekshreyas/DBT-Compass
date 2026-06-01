import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Tooltip = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className="relative inline-flex items-center cursor-help outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setIsVisible(false);
          e.currentTarget.blur();
        }
      }}
      tabIndex="0"
      aria-label={text}
    >
      <span className="underline decoration-dotted decoration-ink-mute/60 underline-offset-[5px] decoration-[1.2px] transition-colors hover:decoration-brand">
        {children}
      </span>

      <AnimatePresence>
        {isVisible && (
          <motion.span
            role="tooltip"
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full mb-2.5 left-0 w-52 max-w-[80vw] p-3 text-[0.78rem] font-sans font-normal leading-relaxed text-bone bg-ink rounded-xl shadow-[var(--shadow-lift)] z-20 text-left pointer-events-none origin-bottom-left"
            style={{ willChange: 'transform, opacity' }}
          >
            {text}
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-4 w-2.5 h-2.5 rotate-45 bg-ink rounded-[2px]"
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

export default Tooltip;
