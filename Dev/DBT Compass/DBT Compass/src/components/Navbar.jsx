import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import CompassMark from './CompassMark';

const Navbar = ({ onListen }) => {
  const {
    language,
    setLanguage,
    setAadhaarNumber,
    setSelectedBank,
    setLastTransaction,
    setAccountType,
    setCurrentStep,
    isSpeaking,
    stopSpeech,
  } = useContext(AppContext);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const text = {
    en: {
      brand: 'DBT Compass',
      tagline: 'Subsidy Diagnostic',
      learn: 'Learn',
      checkStatus: 'Check My Status',
      toggle: 'हिंदी',
      listenBtn: 'Listen',
      stopBtn: 'Stop',
      menu: 'Menu',
    },
    hi: {
      brand: 'DBT कंपास',
      tagline: 'सब्सिडी निदान',
      learn: 'जानें',
      checkStatus: 'स्थिति जांचें',
      toggle: 'English',
      listenBtn: 'सुनें',
      stopBtn: 'रोकें',
      menu: 'मेनू',
    },
  };
  const t = text[language];

  const handleNavReset = () => {
    setAadhaarNumber('');
    setSelectedBank('');
    setLastTransaction('');
    setAccountType('');
    setCurrentStep(1);
    stopSpeech();
  };

  const linkBase =
    'relative text-[0.92rem] font-medium tracking-tight transition-colors duration-300 outline-none rounded focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-bone';
  const linkClass = (active) =>
    `${linkBase} ${active ? 'text-ink' : 'text-ink-soft hover:text-ink'}`;

  const navLinks = [
    { to: '/learn', label: t.learn, onClick: stopSpeech },
    { to: '/diagnostics', label: t.checkStatus, onClick: handleNavReset, primary: true },
  ];

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 no-print transition-all duration-500 ${
        scrolled
          ? 'bg-[color-mix(in_oklab,_var(--color-bone)_82%,_transparent)] backdrop-blur-xl border-b border-rule'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-[72px]">
          <Link
            to="/"
            onClick={stopSpeech}
            className="group flex items-center gap-3 outline-none rounded-lg focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-bone"
          >
            <motion.span
              whileHover={{ rotate: 12 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14 }}
              className="grid place-items-center"
            >
              <CompassMark size={32} />
            </motion.span>
            <span className="flex flex-col leading-none">
              <span
                className="text-[1.05rem] text-ink tracking-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontVariationSettings: '"opsz" 36, "wght" 500, "SOFT" 50',
                }}
              >
                {t.brand}
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.18em] text-ink-mute mt-1 hidden sm:inline">
                {t.tagline}
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              if (link.primary) {
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={link.onClick}
                    className="group relative inline-flex items-center gap-2 pl-5 pr-2 py-2 rounded-full bg-ink text-bone text-[0.88rem] font-medium tracking-tight transition-all duration-400 hover:bg-brand hover:-translate-y-px hover:shadow-[var(--shadow-lift)] outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-bone"
                  >
                    {link.label}
                    <span className="grid place-items-center w-7 h-7 rounded-full bg-ember text-bone transition-transform duration-400 group-hover:translate-x-0.5 group-hover:rotate-45">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                );
              }
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={link.onClick}
                  className={linkClass(active)}
                >
                  {link.label}
                  <motion.span
                    initial={false}
                    animate={{ scaleX: active ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] bg-ember origin-left"
                  />
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <AnimatePresence>
              {onListen && (
                <motion.button
                  key="listen"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  onClick={isSpeaking ? stopSpeech : onListen}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[0.8rem] font-medium tracking-tight transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-bone ${
                    isSpeaking
                      ? 'bg-[color-mix(in_oklab,_var(--color-danger)_12%,_transparent)] text-danger hover:bg-[color-mix(in_oklab,_var(--color-danger)_18%,_transparent)]'
                      : 'bg-brand-soft text-brand hover:bg-[color-mix(in_oklab,_var(--color-brand)_15%,_transparent)]'
                  }`}
                >
                  {isSpeaking ? (
                    <>
                      <span className="relative flex w-2 h-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-danger opacity-60 animate-ping" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-danger" />
                      </span>
                      {t.stopBtn}
                    </>
                  ) : (
                    <>
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2.5v11M5 5v6M11 5v6M2.5 7v2M13.5 7v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                      {t.listenBtn}
                    </>
                  )}
                </motion.button>
              )}
            </AnimatePresence>

            <button
              onClick={() => {
                stopSpeech();
                setLanguage(language === 'en' ? 'hi' : 'en');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-rule bg-paper/60 text-ink-soft hover:text-ink hover:border-ink/30 text-[0.8rem] font-medium tracking-tight transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-bone"
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M1.5 4.5h9M5 1.5v3M3 11.5l2.5-6 2.5 6M3.5 9.5h4M14.5 14.5l-4-8-4 8M8 12.5h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t.toggle}
            </button>
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={t.menu}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-rule bg-paper/70 text-ink outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-bone transition-all"
          >
            <span className="relative w-4 h-3 flex flex-col justify-between">
              <span
                className={`block h-[1.5px] bg-current rounded transition-transform duration-300 ${
                  mobileOpen ? 'translate-y-[5.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-[1.5px] bg-current rounded transition-opacity duration-300 ${
                  mobileOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block h-[1.5px] bg-current rounded transition-transform duration-300 ${
                  mobileOpen ? '-translate-y-[5.5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-rule bg-bone/95 backdrop-blur-xl"
          >
            <div className="px-5 py-5 flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={link.onClick}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-[0.95rem] font-medium tracking-tight transition-all ${
                      active
                        ? 'bg-ink text-bone'
                        : 'text-ink-soft hover:bg-paper/70 hover:text-ink'
                    }`}
                  >
                    <span>{link.label}</span>
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                      <path d="M3 2.5L7 6l-4 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                );
              })}

              <div className="h-px bg-rule my-3" />

              <div className="flex items-center gap-2">
                {onListen && (
                  <button
                    onClick={isSpeaking ? stopSpeech : onListen}
                    className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isSpeaking
                        ? 'bg-[color-mix(in_oklab,_var(--color-danger)_12%,_transparent)] text-danger'
                        : 'bg-brand-soft text-brand'
                    }`}
                  >
                    {isSpeaking ? t.stopBtn : t.listenBtn}
                  </button>
                )}
                <button
                  onClick={() => {
                    stopSpeech();
                    setLanguage(language === 'en' ? 'hi' : 'en');
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-rule bg-paper/70 text-ink-soft text-sm font-medium transition-all"
                >
                  {t.toggle}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
