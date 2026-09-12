import { LanguageOption, ShopProfile, RoadmapStep, VaultDocument, ChatMessage } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ4oCn7jk-72bdYYAv3slsV4Ymw6LXyuaMSUiOStNaeHg0xUaZZ93E6hs0NvfdgSstpkFhOJ6tWyuCm9NJmX-YMrbrf6L6p0NATPKpLIp0kBwiLMYtdj7h-L4fpTFhJ1x21p4MRKvutUo45HYDSN148u86d_qbeJWD-Khapg3f9JnWxJR0mnlxgwvsPLU8rUcCDtJE0C7K0ZTpvCLMNZY5S6-JQ2JD-Q0Z0vOtn0QrsYZXmV0HnIom',
  profile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABnOMr0aGuXiCK7cucbhMIsFrf2qB6G6iVdJZYtIdikOWQxs2SyVz0Wv018M4JHWik-tdqUlhWc0RtgyBGrN2gTA9PMHss4mpWOUK1tffu2FD9-UHQn5LOGCfk77q-ini7WMqy56lLVw-8aLx-8xJiuXDlUL-A2YCtjpcAXI5nibleyE4CRVngiv689ooPfne-ACnN7o9JrZKwVuIoOQ6591vjCuhZSdQpyPUu8pPKirTICR2nNXYD',
  shopkeeperInStore: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrABEsnH5AZBdVRP6oZ--FLCGsTJOqMkQLIUYsbqKfQhXrO-W2SsZoSydgnOx1t66Zta8SBcrnpfB8jymjZKACZee3WTmdxfKcudwdzQcfQLnHZ3UHYUhH2iQSdgGQi5tTn64WQoIjx3s4IAfNf7pwtMEd5obQ2PsgUI1QqWWdJSwmeXwvCDpUe5M7tDezgxAO-kEo7SrABcDTwn3bG6yvutmCkYX-qk0s5LFosScGQInNe7bR9KDT',
  mapPreview: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANOEFCcoB17yKBlxlIGK-h9t83kod-ZQfQfmz-tKFxVWTGIf-ivCxQGHaqgB7WbdVXeKvsRYnNBDQ-AL9SRdjIzaoVmcSfCFysumdTs6wLi5UNDAlCD7H500Uiw_CphGE8yuV8e53wlmJRpp_4ILGhhG8yGM7RAc7n8Xl_UhMJ01XIo1xGyLGyCbOHoPJCvXnVbKO7RWqCtORYItencvCun4Z_2wXOGLdxByh7_67T9HzDE4uuBIko',
  shopkeeperDesk: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpAkj26nG3BJUunzfpC6HSMAAsWWSyoUni9kEEAAOhW-TdWXg0KKf5fGEoj-Hr5iCwYyZUFJ_QJdKUZgAaYD7fXCFpdgCE0eJy8rITGj_4XuJZIfvyxNYB6pgJtyL58Z18g_ISLQhjXU7_MGhOAX-RLFNrAWIKwYyc3lJlah8z0b788S7XhwuER-TaCZwb2c52rwuS3Xtpvkf_VdCEcFFxlVFaCVaKqo47PU2nTHaFTFcYZ30bKOsj',
  rameshKumar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARWGhP_sz0RZxwS25S69590VkiMwVl31onamalYBBh4psnI53jOIou_trysaeDGkw4LHgfKGYvWG0wdwZjnbjT2QSCuIKxvcAuSMcyvbw-_Vlh7SLU8NcT1MlOcWnIDphoSvMoRbsDgBirMHBZELCVpqoastETeT4dVbmKVnvjvLJNS1VJgihteTIZQNzRFffL5Euvo4vV514ZTjd6eud4r9eFn_GwTRTQDtweqzQOoslhEHpjJN4x',
  poojaPatel: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMkg8KAlH1doR7TxRW3f7Rwzci1jnb9K3AVBTMHsOUMbg3CdjFMF8e7nvyX9ZCGyte9lUdWsumJ6RJSSRsp2RDlrfpe8e115ahXSQ-DcW4TAIJk096lCGJYVx7PXjX7uSJNootA8n8FnJE5SDYyfgx7utYgD3rsBZlVKCpxJkMmAvKbtLusqaCA7xtAA9jPYTezaKkM3WqLWATKK_7kRIfG-iIQr2HmL71IlqcbqRLrqKfRaCtYEYa',
  anandNadar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXi8lUVl2o3_IIJDi3YuGtfgOOAXYMQrw03qNbVgxmPKQPwgf_2Xb39ELr1frKApw7HUdHwbpd4AA705xSkpdkRK6jnXaBiEeN_YqBwOWeizn6jhafaWDW_44m0RBFcTh8cGzwnYp6-stbdNK3qGNeRH5R2qDjLQ7hx5u5Zk4f2NGm679gjXIx-Br2mLoG4G4n84Xu3XP38pUTRMawfRDb92FYovBZA8RZgSC4inPegRGHHxw8pVdq',
  vipinPathakAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWQhPc9fBSZ44eurLsMzsp1E5FJEDYsuT15_nJmXkkF3YjW7Yc2lL3S8vRZmM_Ylu2DBBFs05O56tnsb5XAg1qi7c4TuIXd_595DFQsZMxEdaIhsACtB1hMIa0_uaq_iA5UkuUcdoLDkBMZXKVZ_9Cwu3EIidoY3yzhTwm5TWGc7K6jKY8YBBp1WT9-NvnvSgiAiMjJR1Z3nqrhyBMTXsSXbBbXsl3gKIjifuKxQmpX_VS28idvnNm',
  amitVerma: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmmrDmhG5ggnVXG4MBrv9utsZJoQdRg0IRk5RVvLcL4k6rfWBzzTfp6WNAoALS80dDLB2ANbwMA9GWeYXH8aByWGeQ7zGqWdTnKfv9FWzir7Ln_s3I0iZ0eCXk7WcoK3n7OVPgITuvLVOddjTUzlG47mmAZ3Z5mvfT49_WlD6BIAIXr9C79Kg0hwLryYyTlvvYKRjwOjjQb7wfuPq9je0VqNIPBQG9YKLxuc23wlSrNaE-0JRfgKce',
  storefrontSample: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNCZEkRfS_mrcXTcTwutP7LTjidCa1N78UCBIVHAi7SBcqpAhTYqj9Ig_9lN8102-RTSAn4E5xTtdlg0nhwImWG_kPRdHhBVJk8TIShQMbVN7dpDSc6PRgc3bOr2blt9bR419wwi3Ru7g-Zh0QM_jN7xbuaUhR4Y5NLH_dlmK_8jrrrF5RRKpyVPX_7mmODEOp8yC3tZIRLsgH4eWyrm9fykTc5yC9oUemYU3DHyyAn13ZCmEj-EgA',
  electricityBillSample: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDVk19T6Lai5aJBS8Rnp84JgSJNxIGRqXMp_L_PDZWIwaPCGW6ZYenoT2S65oUxiFBG0-P4sSzJXb49gRHoBezAF2hJDK6gesfs_xGqTy69IEGysfTos6rZvlwtVphDWhxnfKso6a7LMXfNjOiemc68eB5V2pazoFYT8xKfWiG9x7M9PcD5BCC8_o996gwKpaxaygLPjij6lArZ-5V0nLnuJzlHe0_b_EtTfBXOyZFzMle1TODBllf',
  vipinWebcam: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqTTZsZgLUAqFNqaPV7F4792rM0jdTw4h0ZbsOhXCsIqCjW5B_QTSxcGSdJ7VNo_200_-5lFNxQoVH2kc7fR8nUGMsDpiQyfH9y360aMkFrtQMG8TKzZCfJVxBWW2gDzvVkDHdIVT86gKhR4E-IiLmDWCYTogyKW522pXFkaHd5GI-Ckq5X45m4T__1o7GT-CfDkCn5hsqb9-mPlz7TM1AgHLBeB2FKZfITUl4DDFiML-3fMtingMv'
};

export const LANGUAGES: LanguageOption[] = [
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    tagline: 'अपनी दुकान को आगे बढ़ाएं और कानूनी सुरक्षा पाएं',
    sampleAudioText: 'नमस्ते! फॉर्मलसाथी में आपका स्वागत है।'
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    tagline: 'Grow and protect your business with official registration',
    sampleAudioText: 'Welcome to FormalSaathi, your trusted formalization partner.'
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    tagline: 'तुमचा व्यवसाय मोठा करा आणि सरकारी योजनांचा लाभ घ्या',
    sampleAudioText: 'नमस्कार! फॉर्मलसाथी मध्ये आपले स्वागत आहे.'
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    tagline: 'உங்கள் வணிகத்தை வளர்த்து அரசு நலத்திட்டங்களைப் பெறுங்கள்',
    sampleAudioText: 'வணக்கம்! பார்மல்சாதிக்கு உங்களை வரவேற்கிறோம்.'
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    tagline: 'మీ వ్యాపారాన్ని విస్తరించి ప్రభుత్వ రక్షణ పొందండి',
    sampleAudioText: 'నమస్కారం! ఫార్మల్సాథీకి స్వాగతం.'
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    tagline: 'আপনার ব্যবসাকে এগিয়ে নিয়ে যান এবং সুরক্ষা পান',
    sampleAudioText: 'নমস্কার! ফরমালসাথিতে আপনাকে স্বাগত জানাই।'
  },
  {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    tagline: 'તમારા વેપારને સમૃદ્ધ બનાવો અને કાનૂની સહાય મેળવો',
    sampleAudioText: 'નમસ્તે! ફોર્મલસાથીમાં આપનું સ્વાગત છે.'
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    tagline: 'ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ಬೆಳೆಸಿ ಮತ್ತು ಸರ್ಕಾರದ ನೆರವು ಪಡೆಯಿರಿ',
    sampleAudioText: 'ನಮಸ್ಕಾರ! ಫಾರ್ಮಲ್ಸಾಥಿಗೆ ಸ್ವಾಗತ.'
  },
  {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    tagline: 'ਆਪਣੇ ਕਾਰੋਬਾਰ ਨੂੰ ਵਧਾਓ ਅਤੇ ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਦਾ ਲਾਹਾ ਲਵੋ',
    sampleAudioText: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਫਾਰਮਲਸਾਥੀ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ।'
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    tagline: 'നിങ്ങളുടെ ബിസിനസ് വളർത്തുക, നിയമപരമായ സുരക്ഷ നേടുക',
    sampleAudioText: 'നമസ്കാരം! ഫോർമൽസാഥിയിലേക്ക് സ്വാഗതം.'
  }
];

export const INITIAL_SHOP_PROFILE: ShopProfile = {
  name: 'Sharma Kirana Store',
  ownerName: 'Rajesh Sharma',
  category: 'kirana',
  categoryLabel: 'Grocery / किराना स्टोर',
  address: 'Shop 14, Main Market Road, Kankarbagh',
  ward: 'Ward 34',
  city: 'Patna',
  state: 'Bihar',
  pinCode: '800020',
  annualTurnoverRange: '₹10,00,000 - ₹20,00,000',
  hasAadhaar: true,
  hasPan: true,
  hasElectricityBill: true,
  hasRentalAgreement: false,
  hasFssai: false,
  status: 'in_progress'
};

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: 1,
    title: 'Register Business Name & Udyam Aadhaar',
    titleHi: 'व्यापार का नाम और उद्यम आधार पंजीकरण',
    department: 'Ministry of Micro, Small & Medium Enterprises',
    status: 'completed',
    estimatedTime: '15 Minutes',
    cost: '₹0 (Free / निःशुल्क)',
    description: 'Generates permanent sovereign 12-digit Udyam Registration Number, linking Aadhaar and PAN for official MSME entity status.',
    requirements: ['Aadhaar linked to mobile OTP', 'Personal PAN Card', 'Shop Address Details'],
    certificateName: 'Udyam Registration Certificate',
    certificateNumber: 'UDYAM-BR-01-0089241'
  },
  {
    id: 2,
    title: 'Open Dedicated Current Bank Account',
    titleHi: 'दुकान के नाम से बैंक करंट खाता खोलें',
    department: 'State Bank of India (Kankarbagh Branch)',
    status: 'completed',
    estimatedTime: '24 Hours',
    cost: '₹0 Initial Minimum Deposit',
    description: 'Segregates personal finances from business transactions, building direct banking vintage necessary for collateral-free credit.',
    requirements: ['Udyam Certificate', 'Shop Photo with Board', 'PAN Card'],
    certificateName: 'SBI Current Account Passbook',
    certificateNumber: 'CA-40982310941'
  },
  {
    id: 3,
    title: 'Trade License with Patna Municipal Corporation',
    titleHi: 'पटना नगर निगम ट्रेड लाइसेंस (फॉर्म 4B)',
    department: 'Urban Development & Housing Dept, Bihar',
    status: 'in_progress',
    estimatedTime: '3 - 5 Working Days',
    cost: '₹1,200 Statutory Fee (One-time annual)',
    description: 'Legitimizes commercial retail operation within PMC municipal boundaries. Prevents arbitrary municipal eviction or sealing notices.',
    requirements: [
      'Holding Tax receipt of commercial premises (Attached)',
      'Rental Agreement (Updated 2024 signed addendum needed)',
      'Frontage photo with GPS coordinates'
    ],
    actionLabel: 'Submit Rental Deed & Pay Fee'
  },
  {
    id: 4,
    title: 'GST Voluntary vs. Exemption Assessment',
    titleHi: 'जीएसटी छूट या स्वैच्छिक पंजीकरण आकलन',
    department: 'Goods & Services Tax Network (GSTN)',
    status: 'upcoming',
    estimatedTime: 'Immediate Advisory',
    cost: '₹0 Registration Fee',
    description: 'Since turnover is under ₹40 Lakh threshold, shop is legally exempt from GST. Choose voluntary registration only if supplying to B2B institutions.',
    requirements: ['Previous 12 months UPI transaction ledger', 'Bank Current Statement']
  },
  {
    id: 5,
    title: 'Enroll in PM SVANidhi / Mudra Loan Facility',
    titleHi: 'पीएम मुद्रा लोन (₹50,000 - ₹5,00,000) 8.5% पर',
    department: 'Credit Guarantee Fund for Micro Units',
    status: 'locked',
    estimatedTime: '48 Hours Post-Approval',
    cost: 'Interest 8.5% p.a. (No collateral required)',
    description: 'Unlocks subsidized institutional credit replacing 36% moneylender interest. Automatically pre-approved upon Trade License issuance.',
    requirements: ['Verified Trade License', 'Udyam Certificate', '6 Months Current Account Statement']
  }
];

export const VAULT_DOCUMENTS: VaultDocument[] = [
  {
    id: 'doc-1',
    name: 'Proprietor Aadhaar Card',
    nameHi: 'दुकानदार आधार कार्ड',
    type: 'Identity Proof',
    status: 'verified',
    uploadedDate: '12 Aug 2026',
    fileSize: '1.2 MB',
    notes: 'Verified via DigiLocker Sovereign OTP instantly. UIDAI hash confirmed.',
    verifiedBy: 'UIDAI API',
    requiredFor: 'Udyam & Current Account'
  },
  {
    id: 'doc-2',
    name: 'Proprietor PAN Card',
    nameHi: 'पैन कार्ड (व्यवसायी)',
    type: 'Tax Identification',
    status: 'verified',
    uploadedDate: '12 Aug 2026',
    fileSize: '840 KB',
    notes: 'PAN active with Income Tax Department. Matches Aadhaar biometric name.',
    verifiedBy: 'NSDL / ITD',
    requiredFor: 'Udyam, Bank CA & Municipal License'
  },
  {
    id: 'doc-3',
    name: 'Shop Frontage & Nameboard Photo',
    nameHi: 'दुकान का बोर्ड सहित फोटो',
    type: 'Physical Verification',
    status: 'verified',
    uploadedDate: '15 Aug 2026',
    fileSize: '2.8 MB',
    notes: 'GPS tagged: 25.5941° N, 85.1376° E. Name clearly visible in Hindi & English.',
    previewUrl: ASSETS.storefrontSample,
    verifiedBy: 'PMC Field Officer Geo-Audit',
    requiredFor: 'Patna Trade License Form 4B'
  },
  {
    id: 'doc-4',
    name: 'Commercial Electricity Bill',
    nameHi: 'दुकान का बिजली बिल (कमर्शियल टैरिफ)',
    type: 'Premises Proof',
    status: 'action_needed',
    uploadedDate: 'Pending 2026 Copy',
    fileSize: '--',
    notes: 'Latest bill copy required for commercial rebate subsidy of ₹1.5/unit.',
    previewUrl: ASSETS.electricityBillSample,
    requiredFor: 'Power Tariff Rebate & Trade License'
  },
  {
    id: 'doc-5',
    name: 'Rental Agreement / Holding Tax Receipt',
    nameHi: 'किरायानामा / मकान टैक्स रसीद',
    type: 'Legal Occupancy Proof',
    status: 'action_needed',
    uploadedDate: 'Old 2019 Deed on File',
    fileSize: '3.4 MB',
    notes: 'Lease expired December 2023. Needs updated ₹100 e-stamp agreement or landlord consent letter.',
    requiredFor: 'Trade License Approval'
  },
  {
    id: 'doc-6',
    name: 'FSSAI Basic Food Registration',
    nameHi: 'एफएसएसएआई खाद्य सुरक्षा लाइसेंस',
    type: 'Safety Compliance',
    status: 'in_review',
    uploadedDate: '20 Aug 2026',
    fileSize: '1.5 MB',
    notes: 'Applied under Petty Food Retailer category (Turnover < ₹12 Lakhs food goods).',
    verifiedBy: 'Food Safety and Standards Authority',
    requiredFor: 'Packaged & Dairy Goods Sale'
  }
];

export const SUCCESS_STORIES = [
  {
    name: 'Ramesh Kumar',
    shop: 'Ramesh General Store, Patna',
    image: ASSETS.rameshKumar,
    quote: 'FormalSaathi helped me get Udyam in 10 minutes. Within 3 weeks, SBI sanctioned my ₹2,00,000 Mudra loan at 8.5% instead of paying 3% per month to local moneylenders.',
    savings: 'Saved ₹55,000/yr in interest',
    rating: '5.0'
  },
  {
    name: 'Pooja Patel',
    shop: 'Patel Handloom & Sarees, Surat',
    image: ASSETS.poojaPatel,
    quote: 'I was afraid of paperwork and tax department visits. With the audio guide in Gujarati and WhatsApp scan bot, I got my trade permit without giving a single rupee bribe.',
    savings: 'Received 100% legal protection',
    rating: '5.0'
  },
  {
    name: 'Anand Nadar',
    shop: 'Nadar Electricals, Madurai',
    image: ASSETS.anandNadar,
    quote: 'The commercial electricity subsidy saved our shop ₹1,800 every month on air cooling and lighting. It pays for all my yearly license renewals alone!',
    savings: '₹21,600 annual electricity subsidy',
    rating: '5.0'
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'advisor',
    text: 'Namaste Rajesh ji! I am Vipin Pathak, Senior MSME Advisor with FormalSaathi. I have reviewed Sharma Kirana Store\'s progress in Patna Ward 34. You are already 40% formalized!',
    hindiText: 'नमस्ते राजेश जी! मैं विपिन पाठक हूँ, फॉर्मलसाथी का वरिष्ठ एमएसएमई सलाहकार। आपकी शर्मा किराना स्टोर का 40% कार्य पूरा हो चुका है।',
    timestamp: '10:14 AM',
    hasAudio: true,
    adviceCards: [
      {
        title: 'Municipal Trade License Update',
        description: 'Your PMC Form 4B needs the 2024 updated rental deed with landlord signature.',
        badge: 'Priority Action'
      },
      {
        title: '₹1,50,000 Mudra Credit Pending',
        description: 'Once trade license clears, your pre-approved SBI Mudra loan can be disbursed directly into your current account.',
        badge: '8.5% Interest'
      }
    ]
  },
  {
    id: 'msg-2',
    sender: 'user',
    text: 'Sir, I have the 2019 rental deed stamped, but landlord is out of town. Can I submit electricity bill and property tax receipt instead?',
    hindiText: 'सर, मेरे पास 2019 का स्टाम्प किरायानामा है, लेकिन मकान मालिक बाहर हैं। क्या मैं बिजली बिल और होल्डिंग टैक्स रसीद दे सकता हूँ?',
    timestamp: '10:16 AM'
  },
  {
    id: 'msg-3',
    sender: 'advisor',
    text: 'Yes Rajesh ji! Under Section 342 of Bihar Municipal Act, if lease renewal is delayed, PMC accepts an affidavit with the latest commercial electricity bill and landlord\'s Holding Tax receipt #PMC-2026-H49. Let us upload that!',
    hindiText: 'हाँ राजेश जी! बिहार नगर पालिका अधिनियम की धारा 342 के तहत, यदि नवीनीकरण लंबित है तो नवीनतम कमर्शियल बिजली बिल और होल्डिंग टैक्स रसीद मान्य है।',
    timestamp: '10:17 AM',
    hasAudio: true
  }
];
