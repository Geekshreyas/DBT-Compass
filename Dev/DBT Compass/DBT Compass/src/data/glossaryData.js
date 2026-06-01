
export const glossaryData = [
  {
    term: "DBT",
    fullForm: {
      en: "Direct Benefit Transfer",
      hi: "प्रत्यक्ष लाभ हस्तांतरण"
    },
    definition: {
      en: "India's government system that sends subsidies, scholarships, pensions, and welfare payments directly to citizens' bank accounts, eliminating middlemen.",
      hi: "भारत की सरकारी प्रणाली जो सब्सिडी, छात्रवृत्ति, पेंशन और कल्याण भुगतान सीधे नागरिकों के बैंक खातों में भेजती है, बिचौलियों को समाप्त करती है।"
    }
  },
  {
    term: "NPCI",
    fullForm: {
      en: "National Payments Corporation of India",
      hi: "भारतीय राष्ट्रीय भुगतान निगम"
    },
    definition: {
      en: "The central organisation that operates India's retail payment systems, including UPI, RuPay, and the Aadhaar Payment Bridge that routes all DBT funds.",
      hi: "वह केंद्रीय संगठन जो भारत की खुदरा भुगतान प्रणालियों को संचालित करता है, जिसमें UPI, RuPay और आधार पेमेंट ब्रिज शामिल हैं जो सभी DBT फंड रूट करता है।"
    }
  },
  {
    term: "APB",
    fullForm: {
      en: "Aadhaar Payment Bridge",
      hi: "आधार भुगतान ब्रिज"
    },
    definition: {
      en: "The NPCI-operated central mapper that links each Aadhaar number to exactly one bank account for government subsidy routing. This is the system your seeding activates.",
      hi: "NPCI द्वारा संचालित केंद्रीय मैपर जो प्रत्येक आधार नंबर को सरकारी सब्सिडी रूटिंग के लिए ठीक एक बैंक खाते से जोड़ता है। यही वह प्रणाली है जिसे आपकी सीडिंग सक्रिय करती है।"
    }
  },
  {
    term: "KYC",
    fullForm: {
      en: "Know Your Customer",
      hi: "अपने ग्राहक को जानें"
    },
    definition: {
      en: "A mandatory bank process to verify a customer's identity using Aadhaar or other documents. KYC linking does NOT enable government subsidies — it is only for identity verification.",
      hi: "आधार या अन्य दस्तावेजों का उपयोग करके ग्राहक की पहचान सत्यापित करने की एक अनिवार्य बैंक प्रक्रिया। KYC लिंकिंग सरकारी सब्सिडी को सक्षम नहीं करती — यह केवल पहचान सत्यापन के लिए है।"
    }
  },
  {
    term: "BSBDA",
    fullForm: {
      en: "Basic Savings Bank Deposit Account",
      hi: "मूल बचत बैंक जमा खाता"
    },
    definition: {
      en: "A zero-balance savings account with strict maximum balance limits, typically Rs. 50,000 to Rs. 1 Lakh. Jan Dhan accounts fall under this category. Large subsidies may fail if they exceed the limit.",
      hi: "एक शून्य-बैलेंस बचत खाता जिसमें सख्त अधिकतम बैलेंस सीमाएं होती हैं, आमतौर पर 50,000 से 1 लाख रुपये। जन धन खाते इस श्रेणी में आते हैं। यदि सीमा से अधिक हो तो बड़ी सब्सिडी विफल हो सकती है।"
    }
  },
  {
    term: "PMJDY",
    fullForm: {
      en: "Pradhan Mantri Jan Dhan Yojana",
      hi: "प्रधान मंत्री जन धन योजना"
    },
    definition: {
      en: "India's national financial inclusion scheme launched in 2014 to provide every household with a bank account. Jan Dhan accounts are BSBDA accounts and have balance limits for DBT purposes.",
      hi: "भारत की राष्ट्रीय वित्तीय समावेशन योजना 2014 में शुरू की गई थी जो प्रत्येक परिवार को बैंक खाता प्रदान करती है। जन धन खाते BSBDA खाते हैं और DBT उद्देश्यों के लिए बैलेंस सीमाएं रखते हैं।"
    }
  },
  {
    term: "Dormant",
    fullForm: {
      en: "Dormant / Inactive Account",
      hi: "निष्क्रिय खाता"
    },
    definition: {
      en: "An account with no customer-initiated transactions for an extended period. RBI guidelines classify accounts as inoperative after 12 months and dormant after 24 months. Dormant accounts reject all incoming government transfers.",
      hi: "एक खाता जिसमें लंबे समय से ग्राहक द्वारा शुरू किया गया कोई लेनदेन नहीं हुआ। RBI दिशानिर्देश खातों को 12 महीने के बाद अक्रियाशील और 24 महीने के बाद निष्क्रिय के रूप में वर्गीकृत करते हैं।"
    }
  },
  {
    term: "PFMS",
    fullForm: {
      en: "Public Financial Management System",
      hi: "सार्वजनिक वित्त प्रबंधन प्रणाली"
    },
    definition: {
      en: "The government's central payment processing platform that receives subsidy instructions from ministries and forwards them to the NPCI APB for routing to individual bank accounts.",
      hi: "सरकार का केंद्रीय भुगतान प्रसंस्करण प्लेटफॉर्म जो मंत्रालयों से सब्सिडी निर्देश प्राप्त करता है और उन्हें व्यक्तिगत बैंक खातों में रूटिंग के लिए NPCI APB को अग्रेषित करता है।"
    }
  }
];