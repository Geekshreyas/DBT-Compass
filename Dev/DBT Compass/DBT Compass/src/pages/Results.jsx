import { useContext, useRef, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import html2pdf from 'html2pdf.js';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AlertCard from '../components/AlertCard';
import PageTransition from '../components/PageTransition';

const EASE = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }
};

const Results = ({ setAudioScript }) => {
  const {
    mockedStatus, language, selectedBank, aadhaarNumber,
    lastTransaction, accountType,
    setCurrentStep, setAadhaarNumber, setSelectedBank, setLastTransaction, setAccountType,
    setIsSpeaking, stopSpeech
  } = useContext(AppContext);

  const pdfRef = useRef();
  const navigate = useNavigate();

  const isSuccess = mockedStatus?.status === 'seeded' && mockedStatus?.bank === selectedBank;
  const isMismatch = mockedStatus?.status === 'seeded' && mockedStatus?.bank !== selectedBank;
  const isUnseeded = mockedStatus?.status === 'unseeded' || mockedStatus?.status === 'not_found';
  const isDormant = lastTransaction === "More than 6 months ago" || lastTransaction === "I don't remember";
  const isLimitedAccount = accountType === "Jan Dhan Yojana (PMJDY) / BSBDA" || accountType === "Student / Minor Account";
  const isJointAccount = accountType === "Joint Account";
  const isCurrentAccount = accountType === "Current Account (Business)";
  const isNRIAccount = accountType === "NRI / NRO Account";
  const isFatal = isCurrentAccount || isNRIAccount;
  const maskedAadhaar = aadhaarNumber ? `XXXX XXXX ${aadhaarNumber.slice(-4)}` : 'XXXX XXXX XXXX';

  useEffect(() => { if (!mockedStatus) navigate('/'); }, [mockedStatus, navigate]);

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
  const getBankDisplayValue = (englishValue) => {
    if (!englishValue) return "";
    const item = banksData.find(d => d.en === englishValue);
    if (!item) return englishValue;
    return language === 'en' ? item.en : item.hi;
  };

  const text = {
    en: {
      eyebrow: "Diagnostic Result",
      title: "Your routing verdict",
      sessionFor: "Session for Aadhaar",
      dormantHeader: "Critical: Account Likely Frozen",
      dormantHover: "RBI guidelines classify accounts inactive for 24+ months as 'Dormant'. Many banks act sooner.",
      dormantBody: "Because you haven't made a transaction recently, your account is likely 'Dormant'. Even if NPCI seeding is active, funds will bounce. Visit your branch, deposit Rs. 100, and update your KYC.",
      limitedHeader: "Warning: Deposit Limits Detected",
      limitedHover: "BSBDA accounts have strict maximum balance limits imposed by the central bank.",
      limitedBody: "You selected a Jan Dhan, BSBDA, or Minor account. These have strict balance limits (often ₹50,000 or ₹1 Lakh). A subsidy pushing you above will fail. Consider upgrading.",
      jointHeader: "Note: Joint Account Rules",
      jointBody: "DBT can be received in a Joint Account, but ONLY if the Aadhaar holder is the Primary Account Holder.",
      currentHeader: "Fatal: Business Account Detected",
      ineligibleHover: "Current accounts are strictly for businesses. DBT requires an individual savings account.",
      currentBody: "You selected a Current Account. NPCI does NOT route DBT to business accounts. Open a Standard Savings account instead.",
      nriHeader: "Fatal: Non-Resident Account Detected",
      nriBody: "You selected an NRI / NRO account. DBT is restricted to resident Indians with domestic savings accounts.",
      successHeader: "Account Seeded Successfully",
      successBody: `Your account is mapped to ${getBankDisplayValue(selectedBank)} on the APB. Ready to receive DBT.`,
      mismatchHeader: "Mapped to a Different Bank",
      mismatchBody: `Your Aadhaar is seeded, but mapped to ${getBankDisplayValue(mockedStatus?.bank)}. To re-route to ${getBankDisplayValue(selectedBank)}:`,
      mismatchStep1: `Visit your nearest ${getBankDisplayValue(selectedBank) || "bank"} branch.`,
      mismatchStep2: "Submit a fresh printed NPCI seeding request form.",
      mismatchStep3: "Ask the teller to OVERWRITE your existing NPCI mapping.",
      actionHeader: "Action Required: NPCI Seeding Incomplete",
      actionBody: "We could not confirm your Aadhaar mapping. Follow this 3-step action plan:",
      step1: `Visit your nearest ${getBankDisplayValue(selectedBank) || "bank"} branch.`,
      step2: "Submit the printed NPCI seeding request form.",
      step3: "Provide biometric thumbprint or OTP to finalize APB mapping.",
      downloadBtn: "Download Bank Form",
      bankFormTitle: "APPLICATION FOR LINKING/SEEDING AADHAAR NUMBER",
      bankFormBody: `To the Branch Manager, ${getBankDisplayValue(selectedBank) || "Bank"}. Please seed my Aadhaar Number (${aadhaarNumber || "XXXX-XXXX-XXXX"}) to my account for receiving Direct Benefit Transfers via the NPCI Mapper.`,
      startOver: "Start over",
      printBtn: "Print results",
      docsTitle: "What to Bring to the Bank",
      docsSubtitle: "Have these ready before you go.",
      doc1: "Original Aadhaar card or government-issued Aadhaar printout",
      doc2: "Bank passbook or any document showing your account number",
      doc3: "Downloaded NPCI Seeding Request form from this portal",
      doc4: "One passport-size photograph (required by some banks)",
      currentStep1: "Visit any bank branch where you hold or wish to open a savings account.",
      currentStep2: "Ask the teller to open a Standard Savings Account in your individual name using Aadhaar.",
      currentStep3: "Once active, return here and run the diagnostic again.",
      nriStep1: "Visit your bank and inform them you are now a resident Indian.",
      nriStep2: "Request conversion of NRI/NRO to a resident savings account, or open a new one.",
      nriStep3: "Once active, return here and complete NPCI seeding.",
      fatalDocsTitle: "Documents You Will Need",
      fatalDocsSubtitle: "Carry these when visiting the branch.",
      fatalDoc1: "Original Aadhaar card or government-issued Aadhaar printout",
      fatalDoc2: "Two recent passport-size photographs",
      fatalDoc3: "Existing account passbook or document showing your current account number",
      fatalDoc4: "For NRI conversion: passport with return or arrival stamp",
      timelineTitle: "What Happens Next",
      timelineSubtitle: "Expected timeline after you complete the steps above.",
      timelineStep1Title: "Visit the Bank", timelineStep1Desc: "Go to your nearest branch with all documents.", timelineStep1Time: "Day 1",
      timelineStep2Title: "Submit the Form", timelineStep2Desc: "Hand over the seeding form and provide biometric/OTP verification.", timelineStep2Time: "Day 1",
      timelineStep3Title: "Bank Processes Request", timelineStep3Desc: "Bank submits your seeding request to the NPCI APB.", timelineStep3Time: "1–3 Business Days",
      timelineStep4Title: "NPCI Mapper Updated", timelineStep4Desc: "Your Aadhaar gets mapped to your chosen account.", timelineStep4Time: "3–7 Business Days",
      timelineStep5Title: "DBT Funds Arrive", timelineStep5Desc: "Subsidies route directly to your mapped account.", timelineStep5Time: "Next Payment Cycle",
      fatalTimelineTitle: "What Happens Next",
      fatalTimelineSubtitle: "What to expect after you visit the bank.",
      fatalTimelineStep1Title: "Visit the Bank", fatalTimelineStep1Desc: "Go to the branch with all listed documents.", fatalTimelineStep1Time: "Day 1",
      fatalTimelineStep2Title: "Account Opening", fatalTimelineStep2Desc: "Bank opens a new savings account or converts your existing one.", fatalTimelineStep2Time: "1–3 Business Days",
      fatalTimelineStep3Title: "Return to This Portal", fatalTimelineStep3Desc: "Once active, run this diagnostic again.", fatalTimelineStep3Time: "After Account is Active"
    },
    hi: {
      eyebrow: "निदान परिणाम",
      title: "आपका रूटिंग निर्णय",
      sessionFor: "आधार सत्र",
      dormantHeader: "महत्वपूर्ण: खाता फ्रीज होने की संभावना",
      dormantHover: "RBI दिशा-निर्देशों के अनुसार 24+ महीनों तक निष्क्रिय खाते 'डॉर्मेंट' हो जाते हैं।",
      dormantBody: "हाल में कोई लेनदेन न होने से आपका खाता संभवतः निष्क्रिय है। शाखा जाएं, ₹100 जमा करें, KYC अपडेट करें।",
      limitedHeader: "चेतावनी: जमा सीमा का पता चला",
      limitedHover: "BSBDA खातों में सख्त अधिकतम बैलेंस सीमा होती है।",
      limitedBody: "जन धन/BSBDA/माइनर खातों में सख्त बैलेंस सीमा (₹50,000 या ₹1 लाख) होती है। मानक बचत खाते में अपग्रेड करें।",
      jointHeader: "नोट: संयुक्त खाता नियम",
      jointBody: "DBT संयुक्त खाते में प्राप्त किया जा सकता है, केवल तब जब आधार धारक प्राथमिक धारक हों।",
      currentHeader: "घातक: व्यावसायिक खाता",
      ineligibleHover: "चालू खाते केवल व्यवसायों के लिए हैं।",
      currentBody: "आपने चालू खाता चुना है। NPCI DBT को व्यावसायिक खातों में नहीं भेजता। एक मानक बचत खाता खोलें।",
      nriHeader: "घातक: NRI खाता",
      nriBody: "आपने NRI/NRO खाता चुना है। DBT केवल घरेलू बचत खातों वाले निवासी भारतीयों के लिए है।",
      successHeader: "खाता सफलतापूर्वक सीड",
      successBody: `आपका खाता APB पर ${getBankDisplayValue(selectedBank)} से मैप है। DBT के लिए तैयार।`,
      mismatchHeader: "दूसरे बैंक से मैप",
      mismatchBody: `आपका आधार ${getBankDisplayValue(mockedStatus?.bank)} से मैप है। ${getBankDisplayValue(selectedBank)} में स्थानांतरित करने के लिए:`,
      mismatchStep1: `निकटतम ${getBankDisplayValue(selectedBank) || "बैंक"} शाखा में जाएं।`,
      mismatchStep2: "नया मुद्रित NPCI सीडिंग फॉर्म जमा करें।",
      mismatchStep3: "टेलर से मौजूदा मैपिंग को ओवरराइट करने के लिए कहें।",
      actionHeader: "कार्रवाई आवश्यक: NPCI सीडिंग अधूरी",
      actionBody: "हम आपकी मैपिंग की पुष्टि नहीं कर सके। 3-चरणीय योजना:",
      step1: `निकटतम ${getBankDisplayValue(selectedBank) || "बैंक"} शाखा में जाएं।`,
      step2: "मुद्रित NPCI सीडिंग फॉर्म जमा करें।",
      step3: "APB मैपिंग के लिए बायोमेट्रिक या OTP प्रदान करें।",
      downloadBtn: "बैंक फॉर्म डाउनलोड",
      bankFormTitle: "आधार लिंक/सीड हेतु आवेदन",
      bankFormBody: `शाखा प्रबंधक, ${getBankDisplayValue(selectedBank) || "बैंक"} को। कृपया मेरा आधार (${aadhaarNumber || "XXXX-XXXX-XXXX"}) NPCI मैपर के माध्यम से मेरे खाते में सीड करें।`,
      startOver: "पुनः आरंभ",
      printBtn: "प्रिंट करें",
      docsTitle: "बैंक में क्या ले जाएं",
      docsSubtitle: "जाने से पहले तैयार रखें।",
      doc1: "मूल आधार कार्ड या प्रिंटआउट",
      doc2: "बैंक पासबुक या खाता नंबर वाला दस्तावेज़",
      doc3: "इस पोर्टल से डाउनलोड किया NPCI सीडिंग फॉर्म",
      doc4: "एक पासपोर्ट आकार की फोटो",
      currentStep1: "किसी भी बैंक शाखा में जाएं।",
      currentStep2: "टेलर से आधार से मानक बचत खाता खोलने को कहें।",
      currentStep3: "खाता सक्रिय होने पर पुनः डायग्नोस्टिक चलाएं।",
      nriStep1: "अपनी बैंक शाखा को बताएं कि आप अब निवासी भारतीय हैं।",
      nriStep2: "NRI/NRO को निवासी बचत खाते में बदलें।",
      nriStep3: "खाता सक्रिय होने पर पुनः चलाएं।",
      fatalDocsTitle: "आवश्यक दस्तावेज़",
      fatalDocsSubtitle: "शाखा जाते समय साथ ले जाएं।",
      fatalDoc1: "मूल आधार कार्ड", fatalDoc2: "दो हालिया पासपोर्ट फोटो",
      fatalDoc3: "मौजूदा खाते की पासबुक", fatalDoc4: "NRI के लिए: मुहर वाला पासपोर्ट",
      timelineTitle: "आगे क्या होगा", timelineSubtitle: "अपेक्षित समयसीमा।",
      timelineStep1Title: "बैंक जाएं", timelineStep1Desc: "दस्तावेजों के साथ शाखा जाएं।", timelineStep1Time: "दिन 1",
      timelineStep2Title: "फॉर्म जमा करें", timelineStep2Desc: "सीडिंग फॉर्म जमा करें।", timelineStep2Time: "दिन 1",
      timelineStep3Title: "बैंक प्रक्रिया", timelineStep3Desc: "NPCI APB को भेजा जाता है।", timelineStep3Time: "1–3 दिवस",
      timelineStep4Title: "NPCI अपडेट", timelineStep4Desc: "आधार मैप होता है।", timelineStep4Time: "3–7 दिवस",
      timelineStep5Title: "DBT प्राप्ति", timelineStep5Desc: "सब्सिडी आपके खाते में आती है।", timelineStep5Time: "अगला चक्र",
      fatalTimelineTitle: "आगे क्या होगा", fatalTimelineSubtitle: "बैंक जाने के बाद।",
      fatalTimelineStep1Title: "बैंक जाएं", fatalTimelineStep1Desc: "दस्तावेजों के साथ शाखा जाएं।", fatalTimelineStep1Time: "दिन 1",
      fatalTimelineStep2Title: "खाता खोलना", fatalTimelineStep2Desc: "नया खाता खोलें या परिवर्तित करें।", fatalTimelineStep2Time: "1–3 दिवस",
      fatalTimelineStep3Title: "पोर्टल पर लौटें", fatalTimelineStep3Desc: "खाता सक्रिय होने पर पुनः चलाएं।", fatalTimelineStep3Time: "खाता सक्रिय होने के बाद"
    }
  };
  const t = text[language];

  useEffect(() => {
    const play = () => {
      let s = `${t.title}. `;
      if (isCurrentAccount) s += `${t.currentHeader}. ${t.currentBody} ${t.currentStep1}. ${t.currentStep2}. ${t.currentStep3}. `;
      if (isNRIAccount) s += `${t.nriHeader}. ${t.nriBody} ${t.nriStep1}. ${t.nriStep2}. ${t.nriStep3}. `;
      if (!isFatal && isDormant) s += `${t.dormantHeader}. ${t.dormantBody} `;
      if (!isFatal && isLimitedAccount) s += `${t.limitedHeader}. ${t.limitedBody} `;
      if (!isFatal && isJointAccount) s += `${t.jointHeader}. ${t.jointBody} `;
      if (!isFatal) {
        if (isSuccess) s += `${t.successHeader}. ${t.successBody}. `;
        if (isMismatch) s += `${t.mismatchHeader}. ${t.mismatchBody}. ${t.mismatchStep1}. ${t.mismatchStep2}. ${t.mismatchStep3}. `;
        if (isUnseeded) s += `${t.actionHeader}. ${t.actionBody}. ${t.step1}. ${t.step2}. ${t.step3}. `;
      }
      const u = new SpeechSynthesisUtterance(s);
      u.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      window._globalUtterance = u;
      u.onend = () => setIsSpeaking(false);
      u.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(u);
      setIsSpeaking(true);
    };
    setAudioScript(() => play);
  }, [language, t, isSuccess, isMismatch, isUnseeded, isDormant, isLimitedAccount, isJointAccount, isCurrentAccount, isNRIAccount, isFatal, setAudioScript, setIsSpeaking]);

  useEffect(() => () => { stopSpeech(); setAudioScript(null); }, []);

  const handleDownloadPdf = () => html2pdf().from(pdfRef.current).save('NPCI_Seeding_Form.pdf');
  const handleStartOver = () => {
    setAadhaarNumber(""); setSelectedBank(""); setLastTransaction(""); setAccountType("");
    setCurrentStep(1); navigate('/diagnostics');
  };

  useEffect(() => {
    document.title = language === 'hi' ? 'DBT कंपास — परिणाम' : 'DBT Compass — Results';
  }, [language]);

  const verdict = isFatal
    ? { tone: 'ember', label: language === 'hi' ? 'खाता DBT के लिए अयोग्य' : 'Account ineligible for DBT' }
    : isSuccess
      ? { tone: 'ink', label: language === 'hi' ? 'सफलतापूर्वक सीड' : 'Successfully seeded' }
      : isMismatch
        ? { tone: 'ember', label: language === 'hi' ? 'दूसरे बैंक से मैप' : 'Mapped to another bank' }
        : { tone: 'ember', label: language === 'hi' ? 'कार्रवाई आवश्यक' : 'Action required' };

  const docsList = isFatal
    ? [t.fatalDoc1, t.fatalDoc2, t.fatalDoc3, ...(isNRIAccount ? [t.fatalDoc4] : [])]
    : [t.doc1, t.doc2, t.doc3, t.doc4];

  const timeline = isFatal
    ? [
        { title: t.fatalTimelineStep1Title, desc: t.fatalTimelineStep1Desc, time: t.fatalTimelineStep1Time },
        { title: t.fatalTimelineStep2Title, desc: t.fatalTimelineStep2Desc, time: t.fatalTimelineStep2Time },
        { title: t.fatalTimelineStep3Title, desc: t.fatalTimelineStep3Desc, time: t.fatalTimelineStep3Time }
      ]
    : [
        { title: t.timelineStep1Title, desc: t.timelineStep1Desc, time: t.timelineStep1Time },
        { title: t.timelineStep2Title, desc: t.timelineStep2Desc, time: t.timelineStep2Time },
        { title: t.timelineStep3Title, desc: t.timelineStep3Desc, time: t.timelineStep3Time },
        { title: t.timelineStep4Title, desc: t.timelineStep4Desc, time: t.timelineStep4Time },
        { title: t.timelineStep5Title, desc: t.timelineStep5Desc, time: t.timelineStep5Time }
      ];

  const showDocs = isFatal || (!isFatal && (isMismatch || isUnseeded || isDormant));
  const showTimeline = isFatal || (!isFatal && (isMismatch || isUnseeded || isDormant));

  return (
    <PageTransition>
      <div className="min-h-screen bg-bone pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.header variants={fadeUp} initial="hidden" animate="show" className="mb-14">
            <p className="text-[11px] uppercase tracking-[0.32em] text-ink/50 font-mono mb-3">
              {t.eyebrow}
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-ink leading-[0.95] tracking-tight mb-6">
              {t.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-rule">
              <span className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] ${verdict.tone === 'ember' ? 'text-ember' : 'text-ink'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${verdict.tone === 'ember' ? 'bg-ember' : 'bg-ink'}`} />
                {verdict.label}
              </span>
              <span className="text-ink/30">·</span>
              <span className="text-xs font-mono text-ink/50 tracking-wider">
                {t.sessionFor}: {maskedAadhaar}
              </span>
            </div>
          </motion.header>

          <motion.section variants={fadeUp} initial="hidden" animate="show" className="space-y-5">
            {!isFatal && isDormant && (
              <AlertCard variant="red" title={t.dormantHeader} tooltip={t.dormantHover} body={t.dormantBody} />
            )}
            {!isFatal && isLimitedAccount && (
              <AlertCard variant="purple" title={t.limitedHeader} tooltip={t.limitedHover} body={t.limitedBody} />
            )}
            {!isFatal && isJointAccount && (
              <AlertCard variant="blue" title={t.jointHeader} body={t.jointBody} />
            )}
            {isCurrentAccount && (
              <AlertCard variant="red" title={t.currentHeader} tooltip={t.ineligibleHover} body={t.currentBody}>
                <ol className="mt-6 divide-y divide-ember/20 border-y border-ember/20">
                  {[t.currentStep1, t.currentStep2, t.currentStep3].map((s, i) => (
                    <li key={i} className="py-3 flex gap-4 text-sm text-ink">
                      <span className="font-mono text-xs text-ember pt-0.5 tabular-nums">0{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </AlertCard>
            )}
            {isNRIAccount && (
              <AlertCard variant="red" title={t.nriHeader} tooltip={t.ineligibleHover} body={t.nriBody}>
                <ol className="mt-6 divide-y divide-ember/20 border-y border-ember/20">
                  {[t.nriStep1, t.nriStep2, t.nriStep3].map((s, i) => (
                    <li key={i} className="py-3 flex gap-4 text-sm text-ink">
                      <span className="font-mono text-xs text-ember pt-0.5 tabular-nums">0{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </AlertCard>
            )}
            {!isFatal && isSuccess && (
              <AlertCard variant="green" title={t.successHeader} body={t.successBody} />
            )}
            {!isFatal && isMismatch && (
              <AlertCard variant="orange" title={t.mismatchHeader} body={t.mismatchBody}>
                <ol className="mt-6 divide-y divide-ember/20 border-y border-ember/20">
                  {[t.mismatchStep1, t.mismatchStep2, t.mismatchStep3].map((s, i) => (
                    <li key={i} className="py-3 flex gap-4 text-sm text-ink">
                      <span className="font-mono text-xs text-ember pt-0.5 tabular-nums">0{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </AlertCard>
            )}
            {!isFatal && isUnseeded && (
              <AlertCard variant="yellow" title={t.actionHeader} body={t.actionBody}>
                <ol className="mt-6 divide-y divide-ember/20 border-y border-ember/20">
                  {[t.step1, t.step2, t.step3].map((s, i) => (
                    <li key={i} className="py-3 flex gap-4 text-sm text-ink">
                      <span className="font-mono text-xs text-ember pt-0.5 tabular-nums">0{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </AlertCard>
            )}
          </motion.section>

          {showDocs && (
            <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-20 pt-12 border-t border-rule">
              <p className="text-[11px] uppercase tracking-[0.32em] text-ink/50 font-mono mb-3">
                {language === 'hi' ? 'चेकलिस्ट' : 'Checklist'}
              </p>
              <h2 className="font-serif text-3xl text-ink mb-2">
                {isFatal ? t.fatalDocsTitle : t.docsTitle}
              </h2>
              <p className="text-ink/60 mb-8 max-w-lg">
                {isFatal ? t.fatalDocsSubtitle : t.docsSubtitle}
              </p>
              <ul className="divide-y divide-rule border-y border-rule">
                {docsList.map((doc, i) => (
                  <li key={i} className="flex items-baseline gap-5 py-4 text-ink">
                    <span className="font-mono text-xs text-ink/40 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm leading-relaxed">{doc}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {showTimeline && (
            <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-20 pt-12 border-t border-rule">
              <p className="text-[11px] uppercase tracking-[0.32em] text-ink/50 font-mono mb-3">
                {language === 'hi' ? 'समयरेखा' : 'Timeline'}
              </p>
              <h2 className="font-serif text-3xl text-ink mb-2">
                {isFatal ? t.fatalTimelineTitle : t.timelineTitle}
              </h2>
              <p className="text-ink/60 mb-10 max-w-lg">
                {isFatal ? t.fatalTimelineSubtitle : t.timelineSubtitle}
              </p>
              <ol className="relative border-l border-rule ml-2">
                {timeline.map((step, i) => (
                  <li key={i} className="pl-8 pb-10 last:pb-0 relative">
                    <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-bone border border-ember rounded-full" />
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ember mb-1">{step.time}</p>
                    <h3 className="font-serif text-xl text-ink mb-1">{step.title}</h3>
                    <p className="text-sm text-ink/60 max-w-md">{step.desc}</p>
                  </li>
                ))}
              </ol>
            </motion.section>
          )}

          <div className="mt-20 pt-12 border-t border-rule flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 no-print">
            <div className="flex flex-wrap items-center gap-3">
              {!isFatal && (isMismatch || isUnseeded) && (
                <button
                  onClick={handleDownloadPdf}
                  className="inline-flex items-center gap-3 bg-ink text-bone px-6 py-3 text-sm font-medium hover:bg-ember transition-colors duration-300"
                >
                  ↓ {t.downloadBtn}
                </button>
              )}
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-3 border border-rule text-ink px-6 py-3 text-sm font-medium hover:border-ink transition-colors duration-300"
              >
                ⎙ {t.printBtn}
              </button>
            </div>
            <button
              onClick={handleStartOver}
              className="text-sm font-mono uppercase tracking-[0.22em] text-ink/60 hover:text-ember transition-colors self-start sm:self-auto"
            >
              ↻ {t.startOver}
            </button>
          </div>

          {!isFatal && (
            <div className="absolute -left-[9999px] top-0">
              <div ref={pdfRef} className="w-[800px] p-10 bg-white text-black font-serif">
                <h1 className="text-2xl font-bold text-center underline mb-8">{t.bankFormTitle}</h1>
                <p className="text-lg leading-relaxed mb-10 mt-6">{t.bankFormBody}</p>
                <div className="mt-16 flex justify-between">
                  <div className="border-t border-black pt-2 w-48 text-center">Date</div>
                  <div className="border-t border-black pt-2 w-48 text-center">Signature / Thumbprint</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};
export default Results;
