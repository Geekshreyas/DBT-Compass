import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import PageTransition from '../components/PageTransition';

const EASE = [0.22, 1, 0.36, 1];

const NotFound = ({ setAudioScript }) => {
  const navigate = useNavigate();
  const { language, setIsSpeaking, stopSpeech } = useContext(AppContext);

  const text = {
    en: { eyebrow: "Error 404", code: "404", title: "Off the map", desc: "The page you are looking for does not exist or has been moved. Let's get you back on route.", btn: "Return home" },
    hi: { eyebrow: "त्रुटि 404", code: "404", title: "मानचित्र से बाहर", desc: "आप जिस पृष्ठ को ढूंढ रहे हैं वह मौजूद नहीं है। आइए आपको मार्ग पर वापस लाएं।", btn: "होम पर जाएं" }
  };
  const t = text[language];

  useEffect(() => {
    document.title = language === 'hi' ? 'DBT कंपास — पृष्ठ नहीं मिला' : 'DBT Compass — Page Not Found';
  }, [language]);

  useEffect(() => {
    const play = () => {
      const u = new SpeechSynthesisUtterance(`${t.code}. ${t.title}. ${t.desc}`);
      u.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      window._globalUtterance = u;
      u.onend = () => setIsSpeaking(false);
      u.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(u);
      setIsSpeaking(true);
    };
    if (setAudioScript) setAudioScript(() => play);
  }, [language, t, setAudioScript, setIsSpeaking]);

  useEffect(() => () => { if (stopSpeech) stopSpeech(); if (setAudioScript) setAudioScript(null); }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-bone flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center max-w-lg"
        >
          <p className="text-[11px] uppercase tracking-[0.32em] text-ember font-mono mb-8">
            {t.eyebrow}
          </p>
          <p className="font-serif text-[10rem] md:text-[14rem] text-ink leading-none tracking-tighter mb-2">
            {t.code}
          </p>
          <div className="w-12 h-px bg-ember mx-auto mb-8" />
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-5 leading-tight">
            {t.title}
          </h1>
          <p className="text-ink/60 mb-10 leading-relaxed max-w-md mx-auto">
            {t.desc}
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-3 bg-ink text-bone px-8 py-4 text-sm font-medium tracking-wide hover:bg-ember transition-colors duration-300"
          >
            ← {t.btn}
          </button>
        </motion.div>
      </div>
    </PageTransition>
  );
};
export default NotFound;
