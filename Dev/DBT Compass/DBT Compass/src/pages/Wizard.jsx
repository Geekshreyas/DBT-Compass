import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import InputField from '../components/InputField';
import SelectDropdown from '../components/SelectDropdown';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import Tooltip from '../components/Tooltip';
import AlertCard from '../components/AlertCard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { wizardSchema } from '../utils/validationSchema';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const EASE = [0.22, 1, 0.36, 1];

const Wizard = ({ setAudioScript }) => {
  const navigate = useNavigate();
  const {
    currentStep, setCurrentStep,
    aadhaarNumber, setAadhaarNumber,
    selectedBank, setSelectedBank,
    lastTransaction, setLastTransaction,
    accountType, setAccountType,
    language,
    mockedStatus, setMockedStatus,
    setIsSpeaking, stopSpeech
  } = useContext(AppContext);

  const [showStepErrors, setShowStepErrors] = useState(false);
  const { register, getValues, trigger, reset, watch, formState: { errors } } = useForm({
    resolver: zodResolver(wizardSchema),
    mode: 'onChange',
    defaultValues: {
      aadhaarNumber: aadhaarNumber || "",
      selectedBank: selectedBank || "",
      lastTransaction: lastTransaction || "",
      accountType: accountType || ""
    }
  });
  const selectedAccountType = watch("accountType");

  useEffect(() => {
    if (mockedStatus !== null) {
      setAadhaarNumber(""); setSelectedBank(""); setLastTransaction(""); setAccountType("");
      setCurrentStep(1); setMockedStatus(null);
      reset({ aadhaarNumber: "", selectedBank: "", lastTransaction: "", accountType: "" });
      setShowStepErrors(false);
    }
  }, [mockedStatus, setAadhaarNumber, setSelectedBank, setLastTransaction, setAccountType, setCurrentStep, setMockedStatus, reset]);

  useEffect(() => {
    reset({ aadhaarNumber: aadhaarNumber || "", selectedBank: selectedBank || "", lastTransaction: lastTransaction || "", accountType: accountType || "" });
  }, [aadhaarNumber, selectedBank, lastTransaction, accountType, reset]);

  const banksData = [
    { en: "Airtel Payments Bank", hi: "एयरटेल पेमेंट्स बैंक" },
    { en: "Axis Bank", hi: "एक्सिस बैंक" },
    { en: "Bandhan Bank", hi: "बंधन बैंक" },
    { en: "Bank of Baroda", hi: "बैंक ऑफ बड़ौदा" },
    { en: "Bank of India", hi: "बैंक ऑफ इंडिया" },
    { en: "Bank of Maharashtra", hi: "बैंक ऑफ महाराष्ट्र" },
    { en: "Canara Bank", hi: "केनरा बैंक" },
    { en: "Central Bank of India", hi: "सेंट्रल बैंक ऑफ इंडिया" },
    { en: "Federal Bank", hi: "फेडरल बैंक" },
    { en: "HDFC Bank", hi: "एचडीएफसी बैंक" },
    { en: "ICICI Bank", hi: "आईसीआईसीआई बैंक" },
    { en: "IDBI Bank", hi: "आईडीबीआई बैंक" },
    { en: "IDFC FIRST Bank", hi: "आईडीएफसी फर्स्ट बैंक" },
    { en: "India Post Payments Bank", hi: "इंडिया पोस्ट पेमेंट्स बैंक" },
    { en: "Indian Bank", hi: "इंडियन बैंक" },
    { en: "Indian Overseas Bank", hi: "इंडियन ओवरसीज बैंक" },
    { en: "IndusInd Bank", hi: "इंडसइंड बैंक" },
    { en: "Kotak Mahindra Bank", hi: "कोटक महिंद्रा बैंक" },
    { en: "Paytm Payments Bank", hi: "पेटीएम पेमेंट्स बैंक" },
    { en: "Punjab & Sind Bank", hi: "पंजाब एंड सिंध बैंक" },
    { en: "Punjab National Bank", hi: "पंजाब नेशनल बैंक" },
    { en: "South Indian Bank", hi: "साउथ इंडियन बैंक" },
    { en: "State Bank of India", hi: "भारतीय स्टेट बैंक" },
    { en: "UCO Bank", hi: "यूको बैंक" },
    { en: "Union Bank of India", hi: "यूनियन बैंक ऑफ इंडिया" },
    { en: "Yes Bank", hi: "यस बैंक" }
  ];
  const transactionData = [
    { en: "Within the last 6 months", hi: "पिछले 6 महीनों के भीतर" },
    { en: "More than 6 months ago", hi: "6 महीने से अधिक समय पहले" },
    { en: "I don't remember", hi: "मुझे याद नहीं है" }
  ];
  const accountData = [
    { en: "Standard Savings Account", hi: "मानक बचत खाता" },
    { en: "Jan Dhan Yojana (PMJDY) / BSBDA", hi: "जन धन योजना (PMJDY) / BSBDA" },
    { en: "Student / Minor Account", hi: "छात्र / माइनर खाता" },
    { en: "Current Account (Business)", hi: "चालू खाता (व्यवसाय)" },
    { en: "NRI / NRO Account", hi: "NRI / NRO खाता" },
    { en: "Joint Account", hi: "संयुक्त खाता" }
  ];

  const getTranslatedOptions = (data) => data.map(item => ({
    value: item.en,
    label: language === 'en' ? item.en : item.hi
  }));
  const getDisplayValue = (englishValue, dataArray) => {
    const item = dataArray.find(d => d.en === englishValue);
    if (!item) return englishValue;
    return language === 'en' ? item.en : item.hi;
  };

  const text = {
    en: {
      eyebrow: "Diagnostic",
      eyebrowSteps: ["Let's Get Started", "Making Progress", "Halfway There", "Almost Done"],
      title: "Check your account seeding",
      step1Title: "Aadhaar Verification",
      step1Desc: "Enter your 12-digit Aadhaar number. Nothing is stored, nothing is sent.",
      step2Title: "Select Target Bank",
      step2Desc: "Choose the bank where you want to activate the",
      npciHover: "The central system that routes government subsidies to your single chosen bank account.",
      npci: "NPCI Mapper",
      step3Title: "Account Health",
      step3Desc: "Two questions so we can predict if the bank will bounce the transfer.",
      step3Label1: "When was your last deposit or withdrawal?",
      step3Hover1: "Banks classify accounts as 'inactive' after 12 months and 'dormant' after 24 months. Dormant accounts reject all incoming transfers including DBT.",
      step3Label2: "What type of account is this?",
      step3Hover2: "Different account types have different DBT eligibility rules. Business and NRI accounts cannot receive subsidies. Jan Dhan accounts have balance limits.",
      bankPlaceholder: "Please select a bank",
      selectPlaceholder: "Please select an option",
      helpStandard: "Highly recommended. No deposit limits, ideal for any Direct Benefit Transfer.",
      helpJanDhan: "Strict balance limits (typically ₹50k – ₹1L). Large subsidies may fail if exceeded.",
      helpMinor: "Transaction limits apply. Consider upgrading to a standard account for large subsidies.",
      helpCurrent: "Ineligible. Subsidies cannot be routed to business accounts.",
      helpNRI: "Ineligible. Subsidies are restricted to resident Indian accounts.",
      helpJoint: "Acceptable, but ONLY if you are the Primary Account Holder.",
      step4Title: "Confirm Your Details",
      step4Desc: "Review before we run the diagnostic.",
      step4Aadhaar: "Aadhaar Number",
      step4Bank: "Selected Bank",
      step4Account: "Account Type",
      step4Transaction: "Last Transaction",
      back: "Back", next: "Continue", submit: "Run Diagnostic",
      aadhaarError: "Aadhaar must be exactly 12 digits.",
      bankError: "Please select a bank.",
      diagnosticError: "This field is required.",
      testHint: "Demo: 111111111111 is seeded to State Bank of India. 222222222222 is unseeded.",
      stepLabel: `Step ${currentStep} of 4`,
      privacy: "Your Aadhaar is never stored or transmitted."
    },
    hi: {
      eyebrow: "निदान",
      eyebrowSteps: ["शुरुआत करें", "प्रगति पर", "आधा काम हो गया", "लगभग पूरा हो गया"],
      title: "अपने खाते की सीडिंग जांचें",
      step1Title: "आधार सत्यापन",
      step1Desc: "अपना 12 अंकों का आधार नंबर दर्ज करें। कुछ भी सहेजा नहीं जाता।",
      step2Title: "लक्षित बैंक चुनें",
      step2Desc: "वह बैंक चुनें जहां आप सक्रिय करना चाहते हैं",
      npciHover: "केंद्रीय प्रणाली जो सरकारी सब्सिडी को आपके चुने हुए एक बैंक खाते में भेजती है।",
      npci: "NPCI मैपर",
      step3Title: "खाता स्वास्थ्य",
      step3Desc: "दो सवाल ताकि हम बता सकें कि बैंक ट्रांसफर वापस तो नहीं करेगा।",
      step3Label1: "आपका अंतिम जमा या निकासी कब हुई थी?",
      step3Hover1: "12 महीने निष्क्रिय रहने पर 'inactive', 24 महीने पर 'dormant'। डॉर्मेंट खाते सभी ट्रांसफर अस्वीकार करते हैं।",
      step3Label2: "यह किस प्रकार का खाता है?",
      step3Hover2: "विभिन्न खाते अलग-अलग DBT नियम रखते हैं। व्यवसाय और NRI खाते सब्सिडी प्राप्त नहीं कर सकते।",
      bankPlaceholder: "कृपया एक बैंक चुनें",
      selectPlaceholder: "कृपया एक विकल्प चुनें",
      helpStandard: "अत्यधिक अनुशंसित। कोई जमा सीमा नहीं।",
      helpJanDhan: "सख्त बैलेंस सीमा (₹50k – ₹1 लाख)। बड़ी सब्सिडी विफल हो सकती है।",
      helpMinor: "लेन-देन की सीमाएं हैं। मानक खाते में अपग्रेड करें।",
      helpCurrent: "अयोग्य। सब्सिडी व्यावसायिक खातों में नहीं भेजी जा सकती।",
      helpNRI: "अयोग्य। केवल निवासी भारतीय खातों के लिए।",
      helpJoint: "स्वीकार्य, केवल तब जब आप प्राथमिक खाता धारक हों।",
      step4Title: "अपना विवरण जांचें",
      step4Desc: "डायग्नोस्टिक से पहले समीक्षा करें।",
      step4Aadhaar: "आधार संख्या",
      step4Bank: "चयनित बैंक",
      step4Account: "खाता प्रकार",
      step4Transaction: "अंतिम लेनदेन",
      back: "पीछे", next: "जारी रखें", submit: "स्थिति जांचें",
      aadhaarError: "आधार 12 अंकों का होना चाहिए।",
      bankError: "कृपया एक बैंक चुनें।",
      diagnosticError: "यह फ़ील्ड आवश्यक है।",
      testHint: "डेमो: 111111111111 SBI से सीड। 222222222222 असीडेड।",
      stepLabel: `चरण 4 में से ${currentStep}`,
      privacy: "आपका आधार कभी सहेजा या प्रसारित नहीं किया जाता।"
    }
  };
  const t = text[language];

  const getAccountHelpBanner = () => {
    if (!selectedAccountType) return null;
    switch (selectedAccountType) {
      case "Standard Savings Account": return { text: t.helpStandard, tone: "success" };
      case "Jan Dhan Yojana (PMJDY) / BSBDA": return { text: t.helpJanDhan, tone: "warn" };
      case "Student / Minor Account": return { text: t.helpMinor, tone: "warn" };
      case "Current Account (Business)": return { text: t.helpCurrent, tone: "danger" };
      case "NRI / NRO Account": return { text: t.helpNRI, tone: "danger" };
      case "Joint Account": return { text: t.helpJoint, tone: "info" };
      default: return null;
    }
  };
  const accountBanner = getAccountHelpBanner();

  useEffect(() => {
    const playWizardAudio = () => {
      const prefix = `${t.eyebrow}. ${t.eyebrowSteps[currentStep - 1]}.`;
      let textToSpeak = "";
      if (currentStep === 1) textToSpeak = `${prefix} ${t.step1Title}. ${t.step1Desc}. ${t.testHint}`;
      if (currentStep === 2) textToSpeak = `${prefix} ${t.step2Title}. ${t.step2Desc} ${t.npci}.`;
      if (currentStep === 3) {
        const bannerText = accountType ? getAccountHelpBanner()?.text : '';
        textToSpeak = `${prefix} ${t.step3Title}. ${t.step3Desc}. ${t.step3Label1}. ${t.step3Hover1}. ${t.step3Label2}. ${t.step3Hover2}. ${bannerText || ''}`;
      }
      if (currentStep === 4) {
        const masked = aadhaarNumber ? `XXXX XXXX ${aadhaarNumber.slice(-4)}` : '';
        textToSpeak = `${prefix} ${t.step4Title}. ${t.step4Desc}. ${t.step4Aadhaar}: ${masked}. ${t.step4Bank}: ${getDisplayValue(selectedBank, banksData)}. ${t.step4Account}: ${getDisplayValue(accountType, accountData)}. ${t.step4Transaction}: ${getDisplayValue(lastTransaction, transactionData)}.`;
      }
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      window._globalUtterance = utterance;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    };
    setAudioScript(() => playWizardAudio);
  }, [currentStep, language, t, setAudioScript, setIsSpeaking, aadhaarNumber, accountType, lastTransaction, selectedBank]);

  useEffect(() => () => { stopSpeech(); setAudioScript(null); }, []);

  useEffect(() => {
    document.title = language === 'hi' ? 'DBT कंपास — डायग्नोस्टिक' : 'DBT Compass — Diagnostic';
  }, [language]);

  const handleNext = async () => {
    setShowStepErrors(true);
    let fieldsToValidate = [];
    if (currentStep === 1) fieldsToValidate = ["aadhaarNumber"];
    if (currentStep === 2) fieldsToValidate = ["selectedBank"];
    if (currentStep === 3) fieldsToValidate = ["lastTransaction", "accountType"];
    const isStepValid = await trigger(fieldsToValidate);
    if (!isStepValid) return;
    if (currentStep === 1) setAadhaarNumber(getValues("aadhaarNumber"));
    if (currentStep === 2) setSelectedBank(getValues("selectedBank"));
    if (currentStep === 3) {
      setLastTransaction(getValues("lastTransaction"));
      setAccountType(getValues("accountType"));
    }
    setShowStepErrors(false);
    setCurrentStep(currentStep + 1);
  };
  const handleBack = () => { setShowStepErrors(false); setCurrentStep(currentStep - 1); };
  const handleSubmit = () => navigate('/checking-status');

  const toneStyles = {
    success: "border-rule/60 bg-bone text-ink",
    warn: "border-ember/30 bg-ember/5 text-ink",
    danger: "border-ember/60 bg-ember/10 text-ember",
    info: "border-rule/60 bg-bone text-ink/80"
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-bone pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] uppercase tracking-[0.32em] text-ink/50 font-mono mb-3">
              {t.eyebrow} · {t.eyebrowSteps[currentStep - 1]}
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-ink leading-[0.95] tracking-tight">
              {t.title}
            </h1>
          </div>

          <ProgressBar currentStep={currentStep} totalSteps={4} label={t.stepLabel} />

          <div className="mt-12 border-t border-rule pt-12 min-h-[20rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {currentStep === 1 && (
                  <div>
                    <h2 className="font-serif text-3xl text-ink mb-3">{t.step1Title}</h2>
                    <p className="text-ink/60 mb-8 max-w-md">{t.step1Desc}</p>
                    <InputField
                      isSecure={true}
                      label={language === 'en' ? "Aadhaar Number" : "आधार संख्या"}
                      placeholder="XXXX XXXX XXXX"
                      {...register("aadhaarNumber")}
                      error={showStepErrors && errors.aadhaarNumber ? t.aadhaarError : undefined}
                    />
                    <p className="flex items-center gap-2 text-xs text-ink/50 mt-3 font-mono uppercase tracking-wider">
                      <span className="w-1 h-1 rounded-full bg-ember" />
                      {t.privacy}
                    </p>
                    <div className="mt-6 border-l-2 border-ember pl-4 py-2 bg-ember/5">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-ember font-mono mb-1">Demo</p>
                      <p className="text-sm text-ink/80">{t.testHint}</p>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h2 className="font-serif text-3xl text-ink mb-3">{t.step2Title}</h2>
                    <p className="text-ink/60 mb-8">
                      {t.step2Desc}{' '}
                      <Tooltip text={t.npciHover}>
                        <span className="text-ink font-medium underline decoration-dotted decoration-ember/60 underline-offset-4 cursor-help">{t.npci}</span>
                      </Tooltip>
                    </p>
                    <SelectDropdown
                      {...register("selectedBank")}
                      options={getTranslatedOptions(banksData)}
                      placeholder={t.bankPlaceholder}
                      error={showStepErrors && errors.selectedBank ? t.bankError : undefined}
                    />
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <h2 className="font-serif text-3xl text-ink mb-3">{t.step3Title}</h2>
                    <p className="text-ink/60 mb-8">{t.step3Desc}</p>
                    <div className="space-y-6">
                      <SelectDropdown
                        label={<Tooltip text={t.step3Hover1}>{t.step3Label1}</Tooltip>}
                        placeholder={t.selectPlaceholder}
                        {...register("lastTransaction")}
                        options={getTranslatedOptions(transactionData)}
                        error={showStepErrors && errors.lastTransaction ? t.diagnosticError : undefined}
                      />
                      <div>
                        <SelectDropdown
                          label={<Tooltip text={t.step3Hover2}>{t.step3Label2}</Tooltip>}
                          placeholder={t.selectPlaceholder}
                          {...register("accountType")}
                          options={getTranslatedOptions(accountData)}
                          error={showStepErrors && errors.accountType ? t.diagnosticError : undefined}
                        />
                        <AnimatePresence>
                          {accountBanner && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.35, ease: EASE }}
                              className={`mt-3 px-4 py-3 text-sm border-l-2 ${toneStyles[accountBanner.tone]}`}
                            >
                              {accountBanner.text}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div>
                    <h2 className="font-serif text-3xl text-ink mb-3">{t.step4Title}</h2>
                    <p className="text-ink/60 mb-8">{t.step4Desc}</p>
                    <dl className="divide-y divide-rule border-y border-rule">
                      {[
                        [t.step4Aadhaar, <span className="font-mono tracking-widest">XXXX XXXX {aadhaarNumber.slice(-4)}</span>],
                        [t.step4Bank, getDisplayValue(selectedBank, banksData)],
                        [t.step4Account, getDisplayValue(accountType, accountData)],
                        [t.step4Transaction, getDisplayValue(lastTransaction, transactionData)]
                      ].map(([k, v], i) => (
                        <div key={i} className="grid grid-cols-[1fr_auto] gap-6 py-4">
                          <dt className="text-xs uppercase tracking-[0.22em] text-ink/50 font-mono self-center">{k}</dt>
                          <dd className="text-ink text-right">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-12 pt-8 border-t border-rule">
            {currentStep > 1 ? (
              <Button variant="ghost" onClick={handleBack} type="button">← {t.back}</Button>
            ) : <span />}
            {currentStep < 4 ? (
              <Button variant="primary" onClick={handleNext} type="button">{t.next} →</Button>
            ) : (
              <Button variant="ember" onClick={handleSubmit} type="button">{t.submit} →</Button>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
export default Wizard;
