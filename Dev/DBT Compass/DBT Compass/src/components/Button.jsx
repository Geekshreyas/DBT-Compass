import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

const variantMap = {
  primary:
    'bg-ink text-bone hover:bg-brand shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)]',
  ember:
    'bg-ember text-bone hover:bg-[#9A340A] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)]',
  ghost:
    'bg-transparent text-ink border border-rule hover:border-ink/40 hover:bg-paper/60',
  soft:
    'bg-brand-soft text-brand hover:bg-[color-mix(in_oklab,_var(--color-brand)_18%,_transparent)]',
};

export default function Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  className = '',
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 360, damping: 22 }}
      className={twMerge(
        'inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-[0.92rem] font-medium tracking-tight transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-bone disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0',
        variantMap[variant] || variantMap.primary,
        className
      )}
    >
      {children}
    </motion.button>
  );
}
