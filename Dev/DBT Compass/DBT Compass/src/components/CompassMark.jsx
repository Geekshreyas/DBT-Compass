const CompassMark = ({ size = 28, className = '', spin = false }) => {
  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 32 32"
        width={size}
        height={size}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="cm-needle" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C2410C" />
            <stop offset="100%" stopColor="#7C2D12" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="14.2" fill="none" stroke="#0F4C3A" strokeWidth="1.2" />
        <circle cx="16" cy="16" r="10.6" fill="none" stroke="#0F4C3A" strokeOpacity="0.28" strokeWidth="0.9" strokeDasharray="1.4 2.2" />
        <g className={spin ? 'animate-needle' : ''} style={{ transformOrigin: '16px 16px' }}>
          <path d="M16 5.4 L18.6 16 L16 17.6 Z" fill="url(#cm-needle)" />
          <path d="M16 26.6 L13.4 16 L16 14.4 Z" fill="#0F4C3A" fillOpacity="0.85" />
        </g>
        <circle cx="16" cy="16" r="1.6" fill="#FAF8F3" stroke="#1A1F2C" strokeWidth="0.8" />
        <circle cx="26.4" cy="9.4" r="1.6" fill="#0F4C3A" />
        <line x1="22.4" y1="11.6" x2="25.2" y2="9.9" stroke="#0F4C3A" strokeOpacity="0.4" strokeWidth="0.7" />
      </svg>
    </span>
  );
};

export default CompassMark;
