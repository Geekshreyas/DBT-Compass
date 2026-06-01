
export const faqData = [
  {
    id: 1,
    question: {
      en: "Will my existing bank account transactions or savings be affected?",
      hi: "क्या मेरे मौजूदा बैंक खाते के लेनदेन या बचत प्रभावित होगी?"
    },
    answer: {
      en: "No. NPCI seeding only adds a government transfer routing path to your existing account. It does not change your account number, account balance, interest rates, existing standing instructions, or any auto-debits. Your normal banking continues completely unchanged.",
      hi: "नहीं। NPCI सीडिंग केवल आपके मौजूदा खाते में एक सरकारी ट्रांसफर रूटिंग पथ जोड़ती है। इससे आपका खाता नंबर, बैलेंस, ब्याज दर, स्थायी निर्देश या कोई भी ऑटो-डेबिट नहीं बदलता। आपकी सामान्य बैंकिंग पूरी तरह अपरिवर्तित रहती है।"
    }
  },
  {
    id: 2,
    question: {
      en: "Can I change which bank receives my government subsidies later?",
      hi: "क्या मैं बाद में बदल सकता/सकती हूं कि मेरी सरकारी सब्सिडी किस बैंक में जाए?"
    },
    answer: {
      en: "Yes. You can overwrite your NPCI mapping at any time. Visit any branch of your new chosen bank, submit a fresh NPCI Seeding Request form, and the old mapping will be replaced within 7 to 10 working days. You do not need to close your old bank account.",
      hi: "हां। आप किसी भी समय अपनी NPCI मैपिंग बदल सकते हैं। अपने नए चुने हुए बैंक की किसी भी शाखा में जाएं, एक नया NPCI सीडिंग अनुरोध फॉर्म जमा करें, और पुरानी मैपिंग 7 से 10 कार्य दिवसों के भीतर बदल दी जाएगी। आपको अपना पुराना खाता बंद करने की जरूरत नहीं है।"
    }
  },
  {
    id: 3,
    question: {
      en: "How long does NPCI seeding take to activate after I submit the form?",
      hi: "फॉर्म जमा करने के बाद NPCI सीडिंग सक्रिय होने में कितना समय लगता है?"
    },
    answer: {
      en: "After submitting the seeding request form at your bank branch, the NPCI mapper is typically updated within 7 to 10 working days. After that, any new government transfer will be routed to your newly seeded account. You will not automatically receive past failed transfers — only future ones.",
      hi: "बैंक शाखा में सीडिंग अनुरोध फॉर्म जमा करने के बाद, NPCI मैपर आमतौर पर 7 से 10 कार्य दिवसों के भीतर अपडेट हो जाता है। उसके बाद, कोई भी नया सरकारी ट्रांसफर आपके नए सीडेड खाते में रूट किया जाएगा। पिछले विफल ट्रांसफर स्वचालित रूप से नहीं मिलेंगे — केवल भविष्य के ट्रांसफर मिलेंगे।"
    }
  },
  {
    id: 4,
    question: {
      en: "What documents do I need to carry when I visit the bank?",
      hi: "बैंक जाते समय मुझे कौन से दस्तावेज़ साथ ले जाने होंगे?"
    },
    answer: {
      en: "Carry your original Aadhaar card (or a government-issued Aadhaar printout), your bank passbook (or any document showing your account number), and the completed NPCI Seeding Request form — which you can download from this portal. Some banks may also ask for a self-attested copy of your Aadhaar.",
      hi: "अपना मूल आधार कार्ड (या सरकार द्वारा जारी आधार प्रिंटआउट), अपनी बैंक पासबुक (या खाता नंबर दिखाने वाला कोई दस्तावेज़), और पूरा किया हुआ NPCI सीडिंग अनुरोध फॉर्म साथ ले जाएं — जिसे आप इस पोर्टल से डाउनलोड कर सकते हैं। कुछ बैंक आपके आधार की स्व-प्रमाणित प्रति भी मांग सकते हैं।"
    }
  },
  {
    id: 5,
    question: {
      en: "My DBT used to work before. Why did it suddenly stop?",
      hi: "मेरी DBT पहले काम करती थी। अचानक क्यों बंद हो गई?"
    },
    answer: {
      en: "The most common reason is account dormancy. If you made no deposits or withdrawals for an extended period, your bank may have marked the account as inactive or dormant, which blocks all incoming government transfers even if your NPCI seeding is still active. Visit your branch, deposit any amount (even Rs. 100), and re-activate your account. Also check if your mobile number linked to the account is still active.",
      hi: "सबसे सामान्य कारण खाते का निष्क्रिय हो जाना है। यदि आपने लंबे समय तक कोई जमा या निकासी नहीं की, तो आपका बैंक खाते को निष्क्रिय या डॉर्मेंट चिह्नित कर सकता है, जो सभी आने वाले सरकारी ट्रांसफर को ब्लॉक कर देता है, भले ही आपकी NPCI सीडिंग अभी भी सक्रिय हो। अपनी शाखा में जाएं, कोई भी राशि (100 रुपये भी) जमा करें, और खाते को फिर से सक्रिय करें।"
    }
  },
  {
    id: 6,
    question: {
      en: "What if I have bank accounts in multiple banks? Which one receives DBT?",
      hi: "यदि मेरे कई बैंकों में खाते हैं तो DBT किसमें आएगी?"
    },
    answer: {
      en: "Only one bank account can be seeded to the NPCI APB at any time. Whichever account is currently mapped in the NPCI central registry will receive all your government transfers — regardless of how many other bank accounts you have. This is why checking and confirming your current seeding is important.",
      hi: "किसी भी समय केवल एक बैंक खाता NPCI APB से सीड हो सकता है। NPCI केंद्रीय रजिस्ट्री में जो भी खाता वर्तमान में मैप किया गया है, उसे आपके सभी सरकारी ट्रांसफर मिलेंगे — चाहे आपके कितने भी अन्य बैंक खाते हों। इसीलिए अपनी वर्तमान सीडिंग की जांच और पुष्टि करना महत्वपूर्ण है।"
    }
  },
  {
    id: 7,
    question: {
      en: "Can I receive DBT in a Jan Dhan Yojana (PMJDY) account?",
      hi: "क्या मैं जन धन योजना (PMJDY) खाते में DBT प्राप्त कर सकता/सकती हूं?"
    },
    answer: {
      en: "Yes, but with important limitations. Jan Dhan and BSBDA accounts have strict maximum balance limits (typically Rs. 50,000 to Rs. 1 Lakh). If a government subsidy pushes your balance above this ceiling, the transaction will fail and bounce back. For large subsidies like PM-KISAN or scholarships, a Standard Savings account is more reliable.",
      hi: "हां, लेकिन महत्वपूर्ण सीमाओं के साथ। जन धन और BSBDA खातों में सख्त अधिकतम बैलेंस सीमाएं होती हैं (आमतौर पर 50,000 से 1 लाख रुपये)। यदि कोई सरकारी सब्सिडी आपका बैलेंस इस सीमा से अधिक कर देती है, तो लेनदेन विफल हो जाएगा। PM-KISAN या छात्रवृत्ति जैसी बड़ी सब्सिडी के लिए, एक मानक बचत खाता अधिक विश्वसनीय है।"
    }
  },
  {
    id: 8,
    question: {
      en: "Is it safe to enter my Aadhaar number on this portal?",
      hi: "क्या इस पोर्टल पर अपना आधार नंबर दर्ज करना सुरक्षित है?"
    },
    answer: {
      en: "Yes. This is a fully client-side application. Your Aadhaar number is never sent to any server, never stored in any database, and never shared with any third party. It exists only in your browser's temporary memory for the duration of your session and is discarded when you close the tab or click Start Over. This portal is for educational and diagnostic simulation purposes only.",
      hi: "हां। यह एक पूरी तरह क्लाइंट-साइड एप्लिकेशन है। आपका आधार नंबर किसी भी सर्वर पर नहीं भेजा जाता, किसी भी डेटाबेस में संग्रहीत नहीं किया जाता, और किसी तीसरे पक्ष के साथ साझा नहीं किया जाता। यह केवल आपके ब्राउज़र की अस्थायी मेमोरी में आपके सत्र की अवधि के लिए मौजूद रहता है।"
    }
  },
  {
    id: 9,
    question: {
      en: "What is the actual difference between Standard KYC linking and NPCI Seeding?",
      hi: "मानक KYC लिंकिंग और NPCI सीडिंग के बीच वास्तविक अंतर क्या है?"
    },
    answer: {
      en: "KYC linking connects your Aadhaar to a bank purely for identity verification. It can be done with multiple banks simultaneously and has no effect on government transfers. NPCI seeding is completely separate — it registers your Aadhaar with India's central payment bridge so government agencies can route subsidies directly to that one account. You can have KYC linking with five banks and still receive zero DBT if you have no NPCI seeding.",
      hi: "KYC लिंकिंग आपके आधार को केवल पहचान सत्यापन के लिए बैंक से जोड़ती है। यह एक साथ कई बैंकों के साथ की जा सकती है और सरकारी ट्रांसफर पर इसका कोई प्रभाव नहीं पड़ता। NPCI सीडिंग बिल्कुल अलग है — यह आपके आधार को भारत के केंद्रीय भुगतान ब्रिज के साथ पंजीकृत करती है ताकि सरकारी एजेंसियां सब्सिडी सीधे उस एक खाते में भेज सकें।"
    }
  }
];