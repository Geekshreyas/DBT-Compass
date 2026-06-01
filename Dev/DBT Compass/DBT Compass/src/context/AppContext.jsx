import { createContext, useState } from 'react';
export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [lastTransaction, setLastTransaction] = useState('');
  const [accountType, setAccountType] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [mockedStatus, setMockedStatus] = useState(null);
  const [language, setLanguage] = useState('en'); 
  const [isSpeaking, setIsSpeaking] = useState(false);
  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };
  const value = {
    aadhaarNumber, setAadhaarNumber,
    selectedBank, setSelectedBank,
    lastTransaction, setLastTransaction,
    accountType, setAccountType,
    currentStep, setCurrentStep,
    mockedStatus, setMockedStatus,
    language, setLanguage,
    isSpeaking, setIsSpeaking,
    stopSpeech
  };
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};