import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import AccordionItem from '../components/AccordionItem';
import Tooltip from '../components/Tooltip';
import { faqData } from '../data/faqData';
import { glossaryData } from '../data/glossaryData';
import PageTransition from '../components/PageTransition';

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const Learn = ({ setAudioScript }) => {
  const navigate = useNavigate();
  const { language, stopSpeech, setIsSpeaking } = useContext(AppContext);
  const [openFaqId, setOpenFaqId] = useState(null);
  const handleToggle = (id) => setOpenFaqId(prev => prev === id ? null : id);

  useEffect(() => {
    return () => {
      stopSpeech();
      if (setAudioScript) setAudioScript(null);
    };
  }, []);

  const text = {
    en: {
      pageTitle: "Learn: How DBT Works",
      pageSubtitle: "Everything you need to understand before checking your status.",
      flowTitle: "How Government Money Reaches Your Account",
      flowSteps: [
        { number: "01", icon: "🏛️", label: "Government Ministry", desc: "A ministry (Agriculture, Education, etc.) approves a subsidy payment for eligible citizens." },
        { number: "02", icon: "💻", label: "PFMS", hover: "Public Financial Management System — the central government platform that processes ₹6+ lakh crore in annual payments and routes them to NPCI for final delivery.", desc: "The Public Financial Management System receives the payment order and processes it for transfer." },
        { number: "03", icon: "🔗", label: "NPCI Aadhaar Payment Bridge", hover: "The APB is a centralized database maintained by NPCI that maps each Aadhaar number to exactly one bank account. It is the single point of routing for all government subsidies.", desc: "The APB looks up your Aadhaar number and identifies exactly which bank account it is seeded to." },
        { number: "04", icon: "🏦", label: "Your Bank", desc: "Your bank receives the transfer instruction and checks if your account is active and eligible." },
        { number: "05", icon: "✅", label: "Your Account", desc: "The subsidy is credited to your account. You receive an SMS confirmation." }
      ],
      flowSubtitle: "Five steps happen every time a subsidy is sent. If any step breaks, your money doesn't arrive.",
      faqTitle: "Frequently Asked Questions",
      faqSubtitle: "Quick answers to help you navigate the system.",
      glossaryTitle: "Key Terms Explained",
      glossarySubtitle: "These words appear in bank offices and government forms. Know what they mean.",
      ctaTitle: "Ready to check your account?",
      ctaSubtitle: "Run the diagnostic and get a personalised action plan in under 3 minutes.",
      ctaBtn: "Start Diagnostic Wizard",
      eyebrow: "Field Guide",
      warnTitle: "Where things go wrong most often",
      warn1Label: "Step 3 — No NPCI seeding: ",
      warn1: "If your Aadhaar is not mapped to any bank on the APB, the payment has nowhere to go. It is returned to the government, and you receive nothing.",
      warn2Label: "Step 4 — Bank rejects the credit: ",
      warn2: "Even if your seeding is correct, your bank can reject the transfer if your account is dormant/inactive, KYC is incomplete or expired, or a BSBDA/Jan Dhan balance limit is exceeded. The money is sent back to the issuing ministry. You must fix the account issue and wait for the next payment cycle.",
      eyebrowFlow: "• Flow",
      eyebrowSupport: "• Support",
      eyebrowLexicon: "• Lexicon",
      eyebrowBegin: "→ Begin"
    },
    hi: {
      pageTitle: "जानें: DBT कैसे काम करता है",
      pageSubtitle: "अपनी स्थिति जांचने से पहले आपको जो कुछ समझना चाहिए।",
      flowTitle: "सरकारी पैसा आपके खाते तक कैसे पहुंचता है",
      flowSubtitle: "हर बार जब कोई सब्सिडी भेजी जाती है तो पांच चरण होते हैं। यदि कोई भी चरण टूट जाता है, तो आपका पैसा नहीं आता।",
      flowSteps: [
        { number: "01", icon: "🏛️", label: "सरकारी मंत्रालय", desc: "एक मंत्रालय (कृषि, शिक्षा आदि) पात्र नागरिकों के लिए सब्सिडी भुगतान को मंज़ूरी देता है।" },
        { number: "02", icon: "💻", label: "PFMS", hover: "सार्वजनिक वित्तीय प्रबंधन प्रणाली (PFMS) — केंद्र सरकार का प्लेटफॉर्म जो वार्षिक भुगतानों में ₹6+ लाख करोड़ की प्रक्रिया करता है और उन्हें अंतिम वितरण के लिए NPCI को निर्देशित करता है।", desc: "सार्वजनिक वित्त प्रबंधन प्रणाली भुगतान आदेश प्राप्त करती है और ट्रांसफर के लिए इसे प्रोसेस करती है।" },
        { number: "03", icon: "🔗", label: "NPCI आधार पेमेंट ब्रिज", hover: "APB, NPCI द्वारा बनाए रखा गया एक केंद्रीकृत डेटाबेस है जो प्रत्येक आधार संख्या को ठीक एक बैंक खाते से मैप करता है। यह सभी सरकारी सब्सिडी के लिए रूटिंग का एकल बिंदु है।", desc: "APB आपका आधार नंबर देखता है और पहचानता है कि वह किस बैंक खाते से सीड किया गया है।" },
        { number: "04", icon: "🏦", label: "आपका बैंक", desc: "आपका बैंक ट्रांसफर निर्देश प्राप्त करता है और जांचता है कि आपका खाता सक्रिय और पात्र है या नहीं।" },
        { number: "05", icon: "✅", label: "आपका खाता", desc: "सब्सिडी आपके खाते में जमा हो जाती है। आपको SMS पुष्टि मिलती है।" }
      ],
      faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
      faqSubtitle: "सिस्टम को नेविगेट करने में आपकी सहायता के लिए त्वरित उत्तर।",
      glossaryTitle: "प्रमुख शब्द समझाए गए",
      glossarySubtitle: "ये शब्द बैंक कार्यालयों और सरकारी फॉर्म में आते हैं। इनका अर्थ जानें।",
      ctaTitle: "अपने खाते की जांच करने के लिए तैयार हैं?",
      ctaSubtitle: "डायग्नोस्टिक चलाएं और 3 मिनट में व्यक्तिगत कार्य योजना प्राप्त करें।",
      ctaBtn: "डायग्नोस्टिक विज़ार्ड शुरू करें",
      eyebrow: "क्षेत्र मार्गदर्शिका",
      warnTitle: "सबसे अधिक गड़बड़ी कहाँ होती है",
      warn1Label: "चरण 3 — NPCI सीडिंग नहीं है: ",
      warn1: "यदि आपका आधार APB पर किसी बैंक से मैप नहीं है, तो भुगतान को कहीं भेजा नहीं जा सकता। यह सरकार को वापस कर दिया जाता है, और आपको कुछ नहीं मिलता।",
      warn2Label: "चरण 4 — बैंक क्रेडिट अस्वीकार करता है: ",
      warn2: "भले ही आपकी सीडिंग सही हो, बैंक ट्रांसफर अस्वीकार कर सकता है यदि आपका खाता निष्क्रिय/डॉर्मेंट है, KYC अधूरा या समाप्त है, या BSBDA/जन धन बैलेंस सीमा पार हो गई है। पैसा जारीकर्ता मंत्रालय को वापस भेज दिया जाता है। आपको खाते की समस्या ठीक करनी होगी और अगले भुगतान चक्र की प्रतीक्षा करनी होगी।",
      eyebrowFlow: "• प्रवाह",
      eyebrowSupport: "• सहायता",
      eyebrowLexicon: "• शब्दावली",
      eyebrowBegin: "→ शुरू करें"
    }
  };
  const t = text[language];

  useEffect(() => {
    const playLearnAudio = () => {
      if (!('speechSynthesis' in window)) return;
      const stripEmojis = (str) => str.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').replace(/\s{2,}/g, ' ');
      const flowText = t.flowSteps.map(step => `${step.label}. ${step.hover ? step.hover + '. ' : ''}${step.desc}`).join('. ');
      const faqText = faqData.map(item => `${item.question[language]} ${item.answer[language]}`).join('. ');
      const glossaryText = glossaryData.map(item => `${item.term}. ${item.fullForm[language]}. ${item.definition[language]}`).join('. ');
      const warningText = `${t.warnTitle}. ${t.warn1Label}. ${t.warn1}. ${t.warn2Label}. ${t.warn2}`;
      const textToSpeak = [t.pageTitle, t.pageSubtitle, t.eyebrowFlow, t.flowTitle, t.flowSubtitle, flowText, warningText, t.eyebrowSupport, t.faqTitle, t.faqSubtitle, faqText, t.eyebrowLexicon, t.glossaryTitle, t.glossarySubtitle, glossaryText, t.eyebrowBegin, t.ctaTitle, t.ctaSubtitle].join('. ');
      const utterance = new SpeechSynthesisUtterance(stripEmojis(textToSpeak));
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      window._globalUtterance = utterance;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    };
    setAudioScript(() => playLearnAudio);
  }, [language, t, setAudioScript, setIsSpeaking]);

  useEffect(() => {
    document.title = language === 'hi'
      ? 'DBT कंपास — DBT और NPCI के बारे में जानें'
      : 'DBT Compass — Learn About DBT & NPCI';
  }, [language]);

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-bone text-ink overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
             style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0E1116 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        <section className="pt-32 pb-20 px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-rule bg-white/60">
              <span className="w-1 h-1 rounded-full bg-ember" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-ink/60">{t.eyebrow}</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl tracking-normal leading-[0.95] mb-6">
              {t.pageTitle}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-ink/60 max-w-2xl mx-auto leading-relaxed">
              {t.pageSubtitle}
            </motion.p>
          </motion.div>
        </section>

        <section className="px-6 pb-24" id="how-it-works">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-16 border-b border-rule pb-8"
            >
              <div className="text-[11px] font-bold tracking-[0.2em] text-ink/40 uppercase mb-3">{t.eyebrowFlow}</div>
              <h2 className="font-serif text-3xl md:text-5xl tracking-tight mb-3">{t.flowTitle}</h2>
              <p className="text-ink/60 max-w-2xl leading-relaxed">{t.flowSubtitle}</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="relative"
            >
              {t.flowSteps.map((step, index) => {
                const isLast = index === t.flowSteps.length - 1;
                return (
                  <motion.div
                    key={step.number}
                    variants={fadeUp}
                    className="relative flex gap-6 md:gap-8 pb-10 group"
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-2xl border bg-ink text-bone border-ink">
                        {step.icon}
                      </div>
                      {!isLast && (
                        <div className="w-px flex-1 bg-gradient-to-b from-rule via-rule to-transparent mt-2" />
                      )}
                    </div>
                    <div className="pb-4 pt-1 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-bold text-ink/30 tracking-[0.25em]">{step.number}</span>
                        <span className="h-px w-8 bg-rule" />
                      </div>
                      <h3 className={`font-serif text-xl md:text-2xl mb-2 tracking-tight ${isLast ? 'text-ember' : 'text-ink'}`}>
                        {step.hover ? <Tooltip text={step.hover}>{step.label}</Tooltip> : step.label}
                      </h3>
                      <p className="text-sm md:text-base text-ink/60 leading-relaxed max-w-xl">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-8 p-8 bg-ember/[0.06] border border-ember/30 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-ember" />
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-ember">{t.warnTitle}</p>
              </div>
              <div className="space-y-4 text-sm md:text-base text-ink/75 leading-relaxed">
                <p><span className="font-semibold text-ink">{t.warn1Label}</span>{t.warn1}</p>
                <p><span className="font-semibold text-ink">{t.warn2Label}</span>{t.warn2}</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 pb-24" id="faq">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-12 border-b border-rule pb-8"
            >
              <div className="text-[11px] font-bold tracking-[0.2em] text-ink/40 uppercase mb-3">{t.eyebrowSupport}</div>
              <h2 className="font-serif text-3xl md:text-5xl tracking-tight mb-3">{t.faqTitle}</h2>
              <p className="text-ink/60">{t.faqSubtitle}</p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
              className="space-y-2"
            >
              {faqData.map((item) => (
                <motion.div key={item.id} variants={fadeUp}>
                  <AccordionItem
                    question={item.question[language]}
                    answer={item.answer[language]}
                    isOpen={openFaqId === item.id}
                    onToggle={() => handleToggle(item.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="px-6 pb-24" id="glossary">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-12 border-b border-rule pb-8"
            >
              <div className="text-[11px] font-bold tracking-[0.2em] text-ink/40 uppercase mb-3">{t.eyebrowLexicon}</div>
              <h2 className="font-serif text-3xl md:text-5xl tracking-tight mb-3">{t.glossaryTitle}</h2>
              <p className="text-ink/60 max-w-2xl">{t.glossarySubtitle}</p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-rule border border-rule rounded-2xl overflow-hidden"
            >
              {glossaryData.map((item) => (
                <motion.div
                  key={item.term}
                  variants={fadeUp}
                  className="bg-white p-6 md:p-8 hover:bg-bone transition-colors duration-300 group"
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="font-serif text-2xl text-ink tracking-tight">{item.term}</span>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-ink/30 uppercase">def.</span>
                  </div>
                  <div className="w-8 h-px bg-ink/20 mb-3 group-hover:w-14 transition-all duration-500" />
                  <p className="text-sm font-semibold text-ink/80 mb-2">{item.fullForm[language]}</p>
                  <p className="text-sm text-ink/55 leading-relaxed">{item.definition[language]}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="cta" className="px-6 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl bg-ink text-bone p-12 md:p-20 text-center"
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
                 style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #FAF7F2 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-ember/20 blur-3xl" />

            <div className="relative">
              <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-ember mb-4">{t.eyebrowBegin}</div>
              <h2 className="font-serif text-3xl md:text-5xl tracking-tight mb-5">{t.ctaTitle}</h2>
              <p className="text-bone/70 mb-10 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">{t.ctaSubtitle}</p>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                onClick={() => navigate('/diagnostics')}
                className="group inline-flex items-center gap-3 bg-ember text-bone px-10 py-5 rounded-full text-base font-medium shadow-[var(--shadow-lift)] hover:bg-bone hover:text-ink transition-colors duration-300"
              >
                {t.ctaBtn}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </motion.button>
            </div>
          </motion.div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Learn;
