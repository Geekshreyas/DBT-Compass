import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import Tooltip from '../components/Tooltip';
import PageTransition from '../components/PageTransition';

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, delay: i * 0.06, ease: EASE },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const Landing = ({ setAudioScript }) => {
  const navigate = useNavigate();
  const { language, setIsSpeaking, stopSpeech } = useContext(AppContext);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  const text = {
    en: {
      title: "Find Out Why Government Money Isn't Reaching Your Account",
      desc1: "Linking your Aadhaar to your bank for standard KYC does ",
      not: "not",
      desc2: " mean you will receive government subsidies. Discover if your account is properly seeded on the Aadhaar Payment Bridge.",
      kycTitle: "Standard KYC",
      kycHover: "Know Your Customer: A mandatory identity check by banks that does NOT enable government subsidies.",
      kycDesc: "Can be linked to multiple bank accounts simultaneously. This is used strictly for basic identity verification by your bank.",
      npciTitle: "NPCI Seeding (DBT)",
      npciHover: "National Payments Corporation of India: The central organization that routes all Direct Benefit Transfer (DBT) funds.",
      npciDesc: "Strictly limited to a single active bank account at any given time. Required to securely route and receive government funds.",
      cta: "Start Diagnostic Wizard",
      howTitle: "How the Diagnostic Works",
      howStep1Title: "Answer 4 questions",
      howStep1Desc: "Enter your Aadhaar, select your bank, and tell us about your account health. Takes under 2 minutes.",
      howStep2Title: "We simulate an NPCI check",
      howStep2Desc: "Our system runs your details against a mock NPCI registry to detect seeding gaps and account issues.",
      howStep3Title: "Get your action plan",
      howStep3Desc: "Receive a clear, step-by-step plan and a downloadable bank form if action is required.",
      whoTitle: "Who Should Use This Portal",
      whoFarmer: "Farmers",
      whoFarmerDesc: "Verify your PM-KISAN or agricultural subsidy seeding status.",
      whoPension: "Senior Citizens",
      whoPensionDesc: "Confirm your pension and welfare scheme transfers are routing correctly.",
      whoLPG: "LPG Users",
      whoLPGDesc: "Check if your LPG subsidy is reaching your account or getting rejected.",
      whoStudent: "Students",
      whoStudentDesc: "Ensure scholarship and fellowship funds can reach your bank account.",
      whoWorker: "MGNREGS Workers",
      whoWorkerDesc: "Verify your wage payment seeding before your next payment cycle.",
      statsTitle: "Why NPCI Seeding Matters",
      stat1Number: "1",
      stat1Label: "Bank account per Aadhaar for DBT",
      stat1Hover: "Unlike KYC linking (which works with multiple banks), NPCI seeding is exclusive. If you seed a new bank, the old mapping is automatically overwritten — not duplicated.",
      stat1Sub: "NPCI policy — you can only have one at a time",
      stat2Number: "26+",
      stat2Label: "Banks supported in this portal",
      stat2Sub: "Including public, private, and payments banks",
      stat3Number: "₹0",
      stat3Label: "Cost to check your seeding status",
      stat3Sub: "Fully free, no registration required",
      stat4Number: "300+",
      stat4Label: "Estimated active DBT schemes in India",
      stat4Sub: "Estimate — verify at dbtbharat.gov.in",
      eyebrow: "DBT Compass · Aadhaar Seeding Checker",
      eyebrowStats: "• Metrics",
      eyebrowProcess: "• Process",
      eyebrowWho: "• Beneficiaries",
    },
    hi: {
      title: "पता करें कि सरकारी पैसा आपके खाते तक क्यों नहीं पहुंच रहा",
      desc1: "केवल मानक KYC के लिए अपने आधार को बैंक से लिंक करने का मतलब यह ",
      not: "नहीं",
      desc2: " है कि आपको सरकारी सब्सिडी मिलेगी। पता करें कि क्या आपका खाता आधार पेमेंट ब्रिज पर सही ढंग से सीड किया गया है।",
      kycTitle: "मानक KYC",
      kycHover: "नो योर कस्टमर (KYC): बैंकों द्वारा एक अनिवार्य पहचान जांच जो सरकारी सब्सिडी को सक्षम नहीं करती है।",
      kycDesc: "एक साथ कई बैंक खातों से लिंक किया जा सकता है। इसका उपयोग केवल आपके बैंक द्वारा बुनियादी पहचान सत्यापन के लिए किया जाता है।",
      npciTitle: "NPCI सीडिंग (DBT)",
      npciHover: "भारतीय राष्ट्रीय भुगतान निगम (NPCI): वह केंद्रीय संगठन जो सभी प्रत्यक्ष लाभ हस्तांतरण (DBT) फंडों को रूट करता है।",
      npciDesc: "किसी भी समय केवल एक सक्रिय बैंक खाते तक सख्ती से सीमित। सरकारी धन को सुरक्षित रूप से प्राप्त करने के लिए आवश्यक है।",
      cta: "डायग्नोस्टिक विज़ार्ड शुरू करें",
      howTitle: "डायग्नोस्टिक कैसे काम करता है",
      howStep1Title: "4 सवालों के जवाब दें",
      howStep1Desc: "अपना आधार दर्ज करें, अपना बैंक चुनें, और अपने खाते की स्थिति के बारे में बताएं। 2 मिनट से भी कम समय लगता है।",
      howStep2Title: "हम NPCI जांच सिमुलेट करते हैं",
      howStep2Desc: "हमारा सिस्टम सीडिंग की कमियों और खाते की समस्याओं का पता लगाने के लिए आपके विवरण को एक मॉक NPCI रजिस्ट्री से मिलाता है।",
      howStep3Title: "अपनी कार्य योजना प्राप्त करें",
      howStep3Desc: "एक स्पष्ट, चरण-दर-चरण योजना और यदि कार्रवाई की आवश्यकता हो तो एक डाउनलोड करने योग्य बैंक फॉर्म प्राप्त करें।",
      whoTitle: "इस पोर्टल का उपयोग किसे करना चाहिए",
      whoFarmer: "किसान",
      whoFarmerDesc: "अपनी PM-KISAN या कृषि सब्सिडी सीडिंग स्थिति सत्यापित करें।",
      whoPension: "वरिष्ठ नागरिक",
      whoPensionDesc: "पुष्टि करें कि आपकी पेंशन और कल्याण योजना ट्रांसफर सही ढंग से रूट हो रहे हैं।",
      whoLPG: "LPG उपयोगकर्ता",
      whoLPGDesc: "जांचें कि क्या आपकी LPG सब्सिडी आपके खाते में पहुंच रही है या अस्वीकार हो रही है।",
      whoStudent: "छात्र",
      whoStudentDesc: "सुनिश्चित करें कि छात्रवृत्ति और फेलोशिप फंड आपके बैंक खाते तक पहुंच सकते हैं।",
      whoWorker: "MGNREGS कर्मचारी",
      whoWorkerDesc: "अपने अगले भुगतान चक्र से पहले अपनी मजदूरी भुगतान सीडिंग सत्यापित करें।",
      statsTitle: "NPCI सीडिंग क्यों ज़रूरी है",
      stat1Number: "1",
      stat1Label: "DBT के लिए प्रति आधार बैंक खाता",
      stat1Hover: "KYC लिंकिंग (जो कई बैंकों के साथ काम करता है) के विपरीत, NPCI सीडिंग अनन्य (एक्सक्लूसिव) है। यदि आप नया बैंक सीड करते हैं, तो पुरानी मैपिंग स्वचालित रूप से अधिलेखित (ओवरराइट) हो जाती है — डुप्लिकेट नहीं।",
      stat1Sub: "NPCI नीति — एक समय में केवल एक खाता हो सकता है",
      stat2Number: "26+",
      stat2Label: "इस पोर्टल में समर्थित बैंक",
      stat2Sub: "सार्वजनिक, निजी और भुगतान बैंक सहित",
      stat3Number: "₹0",
      stat3Label: "सीडिंग स्थिति जांचने की लागत",
      stat3Sub: "पूरी तरह मुफ़्त, कोई पंजीकरण आवश्यक नहीं",
      stat4Number: "300+",
      stat4Label: "भारत में अनुमानित सक्रिय DBT योजनाएं",
      stat4Sub: "अनुमान — dbtbharat.gov.in पर सत्यापित करें",
      eyebrow: "DBT कंपास · आधार सीडिंग चेकर",
      eyebrowStats: "• मेट्रिक्स",
      eyebrowProcess: "• प्रक्रिया",
      eyebrowWho: "• लाभार्थी",
    }
  };
  const t = text[language];

  useEffect(() => {
    const playLandingAudio = () => {
      const stripEmojis = (str) => str.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').replace(/\s{2,}/g, ' ');
      const textToSpeak = [
        `${t.eyebrow}. ${t.title}. ${t.desc1} ${t.not} ${t.desc2}`,
        `${t.kycTitle}: ${t.kycHover}. ${t.kycDesc}`,
        `${t.npciTitle}: ${t.npciHover}. ${t.npciDesc}`,
        `${t.eyebrowStats}. ${t.statsTitle}. ${t.stat1Number} ${t.stat1Label}. ${t.stat1Hover}. ${t.stat2Number} ${t.stat2Label}. ${t.stat3Number} ${t.stat3Label}. ${t.stat4Number} ${t.stat4Label}.`,
        `${t.eyebrowProcess}. ${t.howTitle}. ${t.howStep1Title}. ${t.howStep1Desc}. ${t.howStep2Title}. ${t.howStep2Desc}. ${t.howStep3Title}. ${t.howStep3Desc}.`,
        `${t.eyebrowWho}. ${t.whoTitle}. ${t.whoFarmer}. ${t.whoFarmerDesc}. ${t.whoPension}. ${t.whoPensionDesc}. ${t.whoLPG}. ${t.whoLPGDesc}. ${t.whoStudent}. ${t.whoStudentDesc}. ${t.whoWorker}. ${t.whoWorkerDesc}.`,
      ].join('. ');
      const utterance = new SpeechSynthesisUtterance(stripEmojis(textToSpeak));
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      window._globalUtterance = utterance;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    };
    setAudioScript(() => playLandingAudio);
  }, [language, t, setAudioScript, setIsSpeaking]);

  useEffect(() => {
    return () => {
      stopSpeech();
      setAudioScript(null);
    };
  }, []);

  useEffect(() => {
    document.title = language === 'hi'
      ? 'DBT कंपास — आधार NPCI सीडिंग पोर्टल'
      : 'DBT Compass — Aadhaar NPCI Seeding Portal';
  }, [language]);

  const stats = [
    { number: t.stat1Number, label: t.stat1Label, sub: t.stat1Sub, hover: t.stat1Hover, verified: true },
    { number: t.stat2Number, label: t.stat2Label, sub: t.stat2Sub, verified: true },
    { number: t.stat3Number, label: t.stat3Label, sub: t.stat3Sub, verified: true },
    { number: t.stat4Number, label: t.stat4Label, sub: t.stat4Sub, verified: false },
  ];

  const personas = [
    { icon: '🌾', label: t.whoFarmer, desc: t.whoFarmerDesc },
    { icon: '👴', label: t.whoPension, desc: t.whoPensionDesc },
    { icon: '🔥', label: t.whoLPG, desc: t.whoLPGDesc },
    { icon: '🎓', label: t.whoStudent, desc: t.whoStudentDesc },
    { icon: '👷', label: t.whoWorker, desc: t.whoWorkerDesc },
  ];

  const steps = [
    { n: '01', title: t.howStep1Title, desc: t.howStep1Desc, tone: 'brand' },
    { n: '02', title: t.howStep2Title, desc: t.howStep2Desc, tone: 'brand' },
    { n: '03', title: t.howStep3Title, desc: t.howStep3Desc, tone: 'ember' },
  ];

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-bone text-ink overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
             style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0E1116 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="pointer-events-none absolute -top-40 -right-40 -z-10 w-[40rem] h-[40rem] rounded-full bg-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -left-40 -z-10 w-[32rem] h-[32rem] rounded-full bg-ember/10 blur-3xl" />

        <section ref={heroRef} className="relative pt-32 pb-24 px-6">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 px-4 py-1.5 mb-8 rounded-full border border-rule bg-white/60 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-ink/70">{t.eyebrow}</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.03em] text-ink mb-8"
              style={{ fontFeatureSettings: '"ss01","ss02"' }}
            >
              {t.title}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-ink/65 max-w-2xl mx-auto leading-relaxed mb-12">
              {t.desc1}
              <span className="relative inline-block font-semibold text-ember">
                {t.not}
                <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-ember/40" />
              </span>
              {t.desc2}
            </motion.p>

            <motion.div variants={fadeUp}>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                onClick={() => navigate('/diagnostics')}
                className="group inline-flex items-center gap-3 bg-ink text-bone px-9 py-4 rounded-full text-base font-medium shadow-[var(--shadow-lift)] hover:bg-brand transition-colors duration-300"
              >
                {t.cta}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        <section className="px-6 pb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6"
          >
            <motion.div variants={fadeUp} className="group relative p-8 rounded-2xl bg-white border border-rule hover:border-ink/30 transition-colors duration-500">
              <div className="absolute top-6 right-6 text-[10px] font-bold tracking-[0.2em] text-ink/30 uppercase">01 / Identity</div>
              <h3 className="font-serif text-2xl text-ink mb-3 tracking-tight">
                <Tooltip text={t.kycHover}>{t.kycTitle}</Tooltip>
              </h3>
              <div className="w-10 h-px bg-ink/20 mb-4 group-hover:w-16 transition-all duration-500" />
              <p className="text-ink/60 text-sm leading-relaxed">{t.kycDesc}</p>
            </motion.div>

            <motion.div variants={fadeUp} className="group relative p-8 rounded-2xl bg-ink text-bone border border-ink hover:shadow-[var(--shadow-lift)] transition-shadow duration-500">
              <div className="absolute top-6 right-6 text-[10px] font-bold tracking-[0.2em] text-bone/40 uppercase">02 / Routing</div>
              <h3 className="font-serif text-2xl mb-3 tracking-tight" style={{ color: 'var(--color-bone)' }}>
                <Tooltip text={t.npciHover}>{t.npciTitle}</Tooltip>
              </h3>
              <div className="w-10 h-px bg-ember mb-4 group-hover:w-16 transition-all duration-500" />
              <p className="text-bone/70 text-sm leading-relaxed">{t.npciDesc}</p>
            </motion.div>
          </motion.div>
        </section>

        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex items-end justify-between mb-12 border-b border-rule pb-6"
            >
              <div>
                <div className="text-[11px] font-bold tracking-[0.2em] text-ink/40 uppercase mb-2">{t.eyebrowStats}</div>
                <h2 className="font-serif text-3xl md:text-4xl tracking-tight">{t.statsTitle}</h2>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
              className="grid grid-cols-2 md:grid-cols-4 gap-px bg-rule border-y border-rule"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="relative p-6 md:p-8 bg-bone group hover:bg-white/60 transition-colors duration-300"
                >
                  {!s.verified && (
                    <span className="absolute top-3 right-3 text-[9px] font-bold tracking-wider uppercase text-ember bg-ember/10 px-2 py-0.5 rounded-full">
                      {language === 'en' ? 'Est.' : 'अनुमान'}
                    </span>
                  )}
                  <div className="font-serif text-5xl md:text-6xl text-ink mb-3 tracking-tight leading-none">
                    {s.number}
                  </div>
                  <div className="text-xs font-semibold text-ink/80 mb-1 leading-snug">
                    {s.hover ? <Tooltip text={s.hover}>{s.label}</Tooltip> : s.label}
                  </div>
                  <div className="text-[11px] text-ink/40 leading-snug">{s.sub}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-center mb-16"
            >
              <div className="text-[11px] font-bold tracking-[0.2em] text-ink/40 uppercase mb-3">{t.eyebrowProcess}</div>
              <h2 className="font-serif text-3xl md:text-5xl tracking-tight">{t.howTitle}</h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="grid md:grid-cols-3 gap-px bg-rule rounded-2xl overflow-hidden border border-rule"
            >
              {steps.map((s, i) => (
                <motion.div
                  key={s.n}
                  variants={fadeUp}
                  custom={i}
                  className="relative bg-white p-8 md:p-10 group hover:bg-bone transition-colors duration-500"
                >
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className={`font-serif text-5xl tracking-tight ${s.tone === 'ember' ? 'text-ember' : 'text-ink'}`}>
                      {s.n}
                    </span>
                    <span className="flex-1 h-px bg-rule" />
                  </div>
                  <h3 className="font-serif text-xl text-ink mb-3 tracking-tight">{s.title}</h3>
                  <p className="text-sm text-ink/60 leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="px-6 pb-32">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-center mb-12"
            >
              <div className="text-[11px] font-bold tracking-[0.2em] text-ink/40 uppercase mb-3">{t.eyebrowWho}</div>
              <h2 className="font-serif text-3xl md:text-5xl tracking-tight">{t.whoTitle}</h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
              className="grid grid-cols-2 md:grid-cols-5 gap-3"
            >
              {personas.map((p, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative p-6 bg-white border border-rule rounded-xl text-center hover:border-ink/30 hover:shadow-[var(--shadow-soft)] transition-all duration-300"
                >
                  <div className="text-3xl mb-3 grayscale group-hover:grayscale-0">{p.icon}</div>
                  <p className="text-sm font-semibold text-ink mb-1">{p.label}</p>
                  <p className="text-[11px] text-ink/50 leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-20 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/diagnostics')}
                className="group inline-flex items-center gap-3 bg-ember text-bone px-10 py-5 rounded-full text-lg font-medium shadow-[var(--shadow-lift)] hover:bg-ink transition-colors duration-300"
              >
                {t.cta}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Landing;
