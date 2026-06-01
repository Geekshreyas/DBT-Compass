import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const SelectDropdown = forwardRef(
  ({ label, options, error, placeholder = 'Please select an option', className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col mb-5">
        {label && (
          <label className="mb-2 text-[0.78rem] uppercase tracking-[0.14em] text-ink-mute font-medium">
            {label}
          </label>
        )}

        <div className="relative group">
          <select
            ref={ref}
            {...props}
            className={twMerge(
              'w-full appearance-none pl-4 pr-11 py-3.5 rounded-xl bg-paper text-ink text-[0.95rem] tracking-tight border transition-all duration-300 outline-none cursor-pointer shadow-[var(--shadow-whisper)] hover:border-ink/25 focus-visible:border-brand focus-visible:ring-4 focus-visible:ring-[color-mix(in_oklab,_var(--color-brand)_14%,_transparent)]',
              error ? 'border-danger/60' : 'border-rule',
              className
            )}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option, index) => {
              const isObject = typeof option === 'object' && option !== null;
              const val = isObject ? option.value : option;
              const displayLabel = isObject ? option.label : option;
              return (
                <option key={index} value={val}>
                  {displayLabel}
                </option>
              );
            })}
          </select>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-mute transition-transform duration-300 group-focus-within:text-brand group-focus-within:translate-y-[-40%]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 5.5L7 9.5l4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {error && (
          <span role="alert" className="mt-2 inline-flex items-center gap-1.5 text-danger text-[0.82rem] tracking-tight">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M7 4.5v3M7 9.4v.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            {error}
          </span>
        )}
      </div>
    );
  }
);

SelectDropdown.displayName = 'SelectDropdown';
export default SelectDropdown;
