import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import Tooltip from './Tooltip';

const variantStyles = {
  red: {
    card: 'bg-[color-mix(in_oklab,_var(--color-danger)_6%,_var(--color-paper))] border-[color-mix(in_oklab,_var(--color-danger)_30%,_transparent)]',
    rail: 'bg-danger',
    heading: 'text-danger',
    body: 'text-ink',
    pill: 'bg-[color-mix(in_oklab,_var(--color-danger)_14%,_transparent)] text-danger',
    label: 'Alert',
  },
  purple: {
    card: 'bg-[color-mix(in_oklab,_#6B21A8_6%,_var(--color-paper))] border-[color-mix(in_oklab,_#6B21A8_28%,_transparent)]',
    rail: 'bg-[#6B21A8]',
    heading: 'text-[#6B21A8]',
    body: 'text-ink',
    pill: 'bg-[color-mix(in_oklab,_#6B21A8_12%,_transparent)] text-[#6B21A8]',
    label: 'Note',
  },
  blue: {
    card: 'bg-[color-mix(in_oklab,_var(--color-brand)_5%,_var(--color-paper))] border-[color-mix(in_oklab,_var(--color-brand)_24%,_transparent)]',
    rail: 'bg-brand',
    heading: 'text-brand',
    body: 'text-ink',
    pill: 'bg-brand-soft text-brand',
    label: 'Info',
  },
  green: {
    card: 'bg-[color-mix(in_oklab,_var(--color-success)_6%,_var(--color-paper))] border-[color-mix(in_oklab,_var(--color-success)_26%,_transparent)]',
    rail: 'bg-success',
    heading: 'text-success',
    body: 'text-ink',
    pill: 'bg-[color-mix(in_oklab,_var(--color-success)_14%,_transparent)] text-success',
    label: 'Success',
  },
  orange: {
    card: 'bg-[color-mix(in_oklab,_var(--color-ember)_6%,_var(--color-paper))] border-[color-mix(in_oklab,_var(--color-ember)_28%,_transparent)]',
    rail: 'bg-ember',
    heading: 'text-ember',
    body: 'text-ink',
    pill: 'bg-ember-soft text-ember',
    label: 'Action',
  },
  yellow: {
    card: 'bg-[color-mix(in_oklab,_var(--color-warn)_7%,_var(--color-paper))] border-[color-mix(in_oklab,_var(--color-warn)_28%,_transparent)]',
    rail: 'bg-warn',
    heading: 'text-warn',
    body: 'text-ink',
    pill: 'bg-[color-mix(in_oklab,_var(--color-warn)_14%,_transparent)] text-warn',
    label: 'Warning',
  },
};

const AlertCard = ({ variant = 'blue', title, tooltip, body, className, children }) => {
  const styles = variantStyles[variant] || variantStyles.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={twMerge(
        `relative overflow-hidden border rounded-[14px] p-5 sm:p-7 backdrop-blur-sm shadow-[var(--shadow-soft)] ${styles.card}`,
        className
      )}
      style={{ willChange: 'transform, opacity' }}
    >
      <span aria-hidden="true" className={`absolute left-0 top-0 bottom-0 w-[3px] ${styles.rail}`} />

      <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[0.65rem] uppercase tracking-[0.16em] font-medium mb-4 ${styles.pill}`}>
        <span className="w-1 h-1 rounded-full bg-current" />
        {styles.label}
      </span>

      <h3
        className={`text-[1.15rem] sm:text-[1.35rem] font-medium mb-3 tracking-tight leading-snug ${styles.heading}`}
        style={{ fontFamily: 'var(--font-display)', fontVariationSettings: '"opsz" 48, "wght" 500, "SOFT" 40' }}
      >
        {tooltip ? <Tooltip text={tooltip}>{title}</Tooltip> : title}
      </h3>

      {body && (
        <p className={`leading-relaxed text-[0.92rem] sm:text-[0.98rem] tracking-tight ${styles.body}`}>
          {body}
        </p>
      )}

      {children && <div className={body ? 'mt-4' : ''}>{children}</div>}
    </motion.div>
  );
};

export default AlertCard;
