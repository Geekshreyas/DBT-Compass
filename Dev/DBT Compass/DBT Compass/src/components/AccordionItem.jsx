import { motion, AnimatePresence } from 'framer-motion';

const APPLE_EASE = [0.22, 1, 0.36, 1];

const AccordionItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border bg-paper/70 backdrop-blur-sm transition-all duration-500 ${
        isOpen
          ? 'border-ink/15 shadow-[var(--shadow-soft)]'
          : 'border-rule hover:border-ink/20'
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute left-0 top-0 bottom-0 w-[2px] origin-top transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] bg-ember ${
          isOpen ? 'scale-y-100' : 'scale-y-0'
        }`}
      />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex justify-between items-center gap-5 px-6 py-5 text-left transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
      >
        <span
          className="text-[0.95rem] md:text-[1.02rem] font-medium tracking-tight text-ink pr-2 leading-snug"
          style={{ fontFamily: 'var(--font-display)', fontVariationSettings: '"opsz" 36, "wght" 480, "SOFT" 50' }}
        >
          {question}
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.4, ease: APPLE_EASE }}
          className={`flex-shrink-0 grid place-items-center w-8 h-8 rounded-full border transition-colors duration-300 ${
            isOpen
              ? 'bg-ink text-bone border-ink'
              : 'bg-paper text-ink-soft border-rule group-hover:border-ink/30 group-hover:text-ink'
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.45, ease: APPLE_EASE },
              opacity: { duration: 0.35, ease: APPLE_EASE, delay: isOpen ? 0.08 : 0 },
            }}
            style={{ overflow: 'hidden', willChange: 'height, opacity' }}
          >
            <div className="px-6 pb-6 pt-1">
              <div className="h-px w-full bg-gradient-to-r from-rule via-rule/40 to-transparent mb-4" />
              <p className="text-[0.92rem] leading-relaxed text-ink-soft tracking-tight">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionItem;
