import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { checkDBTStatus } from '../utils/mockDatabase';
import PageTransition from '../components/PageTransition';

const Processing = ({ setAudioScript }) => {
  const navigate = useNavigate();
  const { aadhaarNumber, setMockedStatus, language, setIsSpeaking, stopSpeech } = useContext(AppContext);

  const spinnerMessage = language === 'hi'
    ? "NPCI मैपर स्थिति जांची जा रही है…"
    : "Checking NPCI Mapper Status…";

  const subText = language === 'hi'
    ? "केंद्रीय ब्रिज से कनेक्ट कर रहे हैं"
    : "Connecting to the central bridge";

  useEffect(() => {
    if (!aadhaarNumber) { navigate('/'); return; }
    const fetchStatus = async () => {
      try {
        const result = await checkDBTStatus(aadhaarNumber);
        setMockedStatus(result);
      } catch {
        setMockedStatus({ status: "not_found", bank: null });
      } finally {
        navigate('/results');
      }
    };
    fetchStatus();
  }, [aadhaarNumber, navigate, setMockedStatus]);

  useEffect(() => {
    const playProcessingAudio = () => {
      const utterance = new SpeechSynthesisUtterance(spinnerMessage);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      window._globalUtterance = utterance;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    };
    if (setAudioScript) setAudioScript(() => playProcessingAudio);
  }, [language, spinnerMessage, setAudioScript, setIsSpeaking]);

  useEffect(() => () => { if (stopSpeech) stopSpeech(); if (setAudioScript) setAudioScript(null); }, []);

  useEffect(() => {
    document.title = language === 'hi' ? 'DBT कंपास — जांच जारी…' : 'DBT Compass — Checking…';
  }, [language]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-bone flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <motion.div
            className="mx-auto mb-12 relative w-24 h-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute inset-0 border border-rule rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-3 border-t-2 border-ember rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-ember rounded-full" />
            </div>
          </motion.div>

          <p className="text-[11px] uppercase tracking-[0.32em] text-ink/50 font-mono mb-4">
            {language === 'hi' ? 'प्रसंस्करण' : 'Processing'}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-ink mb-3 leading-tight">
            {spinnerMessage}
          </h1>
          <p className="text-ink/60 text-sm">{subText}</p>
        </div>
      </div>
    </PageTransition>
  );
};
export default Processing;
