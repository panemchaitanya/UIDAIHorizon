export type Lang = 'hi' | 'en';
export type ViewTab = 'portal' | 'services' | 'centers' | 'ecosystem';
export type ServiceKey = 'address' | 'eaadhaar' | 'tracker' | 'vault';

export interface BilingualText {
  hi: string;
  en: string;
}

export const ASSETS = {
  askKiosk: '/src/assets/images/uidai_ask_kiosk_2036_1795169997748.jpg',
  mobilePasskey: '/src/assets/images/uidai_mobile_passkey_2036_1795169996542.jpg',
  bharatFamily: '/src/assets/images/uidai_bharat_inclusion_2036_1795169997692.jpg',
  dpiArchitecture: '/src/assets/images/uidai_dpi_architecture_2036_1795169997171.jpg',
  personaRajesh: '/src/assets/images/uidai_persona_rajesh_1795168939545.jpg',
} as const;

export interface DpiPillar {
  id: string;
  code: string;
  label: string;
  title: BilingualText;
  summary: BilingualText;
  standardMetric: string;
  capabilities: BilingualText[];
}

export const DPI_PILLARS: DpiPillar[] = [
  {
    id: 'dpi-bhashini',
    code: 'LAYER 01',
    label: 'Bhashini 22-Language Stack',
    title: {
      en: 'Voice & Script Parity Across 22 Scheduled Languages',
      hi: '22 अनुसूचित भाषाओं में वॉइस व लिपि समानता',
    },
    summary: {
      en: 'Every online service, error prompt, digital credential, and helpline interaction operates natively across all 22 Eighth Schedule Indian languages using Bhashini speech recognition and embedded UTF-8 Devanagari & regional fonts.',
      hi: 'प्रत्येक ऑनलाइन सेवा, निर्देश, डिजिटल क्रेडेंशियल और हेल्पलाइन भाषिणी वॉइस व एम्बेडेड यूनिकोड लिपि के माध्यम से सभी 22 भारतीय भाषाओं में उपलब्ध हैं।',
    },
    standardMetric: '22 Scheduled Languages · UTF-8 Native',
    capabilities: [
      { en: 'Unified single-domain experience with zero language reset', hi: 'बिना भाषा बदले एकल-डोमेन एकीकृत अनुभव' },
      { en: 'FIDO2 Device Passkey & Face Liveness authentication in 1.2s', hi: '1.2 सेकंड में डिवाइस पासकी व फेस लाइवनेस लॉगिन' },
      { en: 'Embedded Unicode digital cards readable on every phone & printer', hi: 'हर फोन व प्रिंटर पर पठनीय शुद्ध यूनिकोड डिजिटल कार्ड' },
    ],
  },
  {
    id: 'dpi-digilocker',
    code: 'LAYER 02',
    label: 'DigiLocker & Instant SLA',
    title: {
      en: 'Cryptographic Document Fetch & 72-Hour SLA Ledger',
      hi: 'डिजिलॉकर सत्यापित दस्तावेज़ व 72-घंटे SLA लेजर',
    },
    summary: {
      en: 'Direct federated connectors with state electricity discoms, municipal registries, and DigiLocker allow citizens to verify Proof of Address cryptographically at ₹0 fee, backed by live India Post AWB dispatch tracking.',
      hi: 'राज्य बिजली बोर्ड, नगर निगम और डिजिलॉकर से सीधे सत्यापित पता प्रमाण पत्र खींचकर ₹0 शुल्क पर त्वरित अद्यतन और इंडिया पोस्ट AWB लाइव ट्रैकिंग।',
    },
    standardMetric: '₹0 DigiLocker Auto-Verify · 72h Escalation',
    capabilities: [
      { en: 'One-click DigiLocker utility bill & domicile auto-verification', hi: 'एक-क्लिक डिजिलॉकर बिल व निवास प्रमाण सत्यापन' },
      { en: 'Real-time 5-point pre-submission OCR quality & date validation', hi: 'सबमिट से पहले 5-बिंदु रीयल-टाइम OCR गुणवत्ता जांच' },
      { en: 'Automatic 72-hour escalation to named Regional Nodal Officers', hi: '72 घंटे से अधिक विलंब पर नामित नोडल अधिकारी को स्वतः एस्केलेशन' },
    ],
  },
  {
    id: 'dpi-zkp',
    code: 'LAYER 03',
    label: 'Zero-Knowledge Privacy',
    title: {
      en: 'Selective Zero-Knowledge Proofs & Biometric Shield',
      hi: 'चयनात्मक शून्य-ज्ञान प्रमाण व बायोमेट्रिक सुरक्षा',
    },
    summary: {
      en: 'Citizens no longer need to share paper photocopies or full 12-digit numbers. Generate 15-minute cryptographic QR or NFC tokens proving only "Age 18+" or "PIN Code" while keeping biometrics locked by default.',
      hi: 'कागज़ की फोटोकॉपी या 12-अंकीय संख्या साझा करने की आवश्यकता नहीं। केवल "आयु 18+" या "पिनकोड" प्रमाणित करने हेतु 15-मिनट का ZKP QR टोकन बनाएं।',
    },
    standardMetric: 'Ed25519 Signed · 15-Min Selective TTL',
    capabilities: [
      { en: 'Selective Zero-Knowledge Proof (ZKP) QR & NFC wallet passes', hi: 'चयनात्मक ZKP QR और NFC डिजिटल पास' },
      { en: 'One-tap Fingerprint & Iris biometric lock with instant VID rotation', hi: 'एक-क्लिक फिंगरप्रिंट/आईरिस लॉक व तत्काल VID रोटेशन' },
      { en: 'Plain-language authentication ledger with one-click dispute filing', hi: 'सरल भाषा में प्रमाणीकरण इतिहास व एक-क्लिक शिकायत दर्ज' },
    ],
  },
];

export interface RegionalOffice {
  id: string;
  city: string;
  state: string;
  jurisdiction: string;
  address: string;
  waitMinutes: number;
  nextSlot: string;
  nodalOfficer: string;
  countersOpen: number;
  services: string[];
}

export const REGIONAL_OFFICES: RegionalOffice[] = [
  {
    id: 'ro-hyd',
    city: 'Hyderabad',
    state: 'Telangana',
    jurisdiction: 'Telangana, Andhra Pradesh, Odisha, Chhattisgarh, A&N Islands',
    address: '6th Floor, East Block, Swarna Jayanthi Complex, Ameerpet, Hyderabad - 500038',
    waitMinutes: 3,
    nextSlot: 'Today · 11:30 IST',
    nodalOfficer: 'Shri K. Venkata Rao, Dy. Director',
    countersOpen: 16,
    services: ['Biometric Update', 'Baal Aadhaar (Age 5/15)', 'Mobile Number Link', 'New Enrolment'],
  },
  {
    id: 'ro-del',
    city: 'New Delhi',
    state: 'Delhi NCR',
    jurisdiction: 'Delhi, Rajasthan, Uttarakhand, Madhya Pradesh',
    address: 'Ground Floor, Supreme Court Metro Station Complex, Pragati Maidan, New Delhi - 110001',
    waitMinutes: 4,
    nextSlot: 'Today · 12:00 IST',
    nodalOfficer: 'Smt. Kavita Rathore, Nodal Officer',
    countersOpen: 20,
    services: ['Biometric Update', 'Baal Aadhaar (Age 5/15)', 'Mobile Number Link', 'Senior Doorstep Desk'],
  },
  {
    id: 'ro-blr',
    city: 'Bengaluru',
    state: 'Karnataka',
    jurisdiction: 'Karnataka, Kerala, Tamil Nadu, Puducherry, Lakshadweep',
    address: 'Khanija Bhavan, No. 49, 3rd Floor, South Wing, Race Course Road, Bengaluru - 560001',
    waitMinutes: 2,
    nextSlot: 'Today · 11:15 IST',
    nodalOfficer: 'Shri R. Subramanian, Regional Lead',
    countersOpen: 18,
    services: ['Biometric Update', 'Baal Aadhaar (Age 5/15)', 'Mobile Number Link', 'NRI Enrolment'],
  },
  {
    id: 'ro-bom',
    city: 'Mumbai',
    state: 'Maharashtra',
    jurisdiction: 'Maharashtra, Gujarat, Goa, Dadra & Nagar Haveli, Daman & Diu',
    address: '7th Floor, MTNL Exchange, GD Somani Marg, Cuffe Parade, Mumbai - 400005',
    waitMinutes: 5,
    nextSlot: 'Today · 12:30 IST',
    nodalOfficer: 'Smt. Meenakshi Kulkarni, Regional Lead',
    countersOpen: 18,
    services: ['Biometric Update', 'Baal Aadhaar (Age 5/15)', 'Mobile Number Link', 'Senior Doorstep Desk'],
  },
  {
    id: 'ro-lko',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    jurisdiction: 'Uttar Pradesh',
    address: '3rd Floor, Uttar Pradesh Samaj Kalyan Nirman Nigam Bldg, Gomti Nagar, Lucknow - 226010',
    waitMinutes: 4,
    nextSlot: 'Today · 11:45 IST',
    nodalOfficer: 'Shri Anurag Tiwari, Nodal Officer',
    countersOpen: 14,
    services: ['Biometric Update', 'Baal Aadhaar (Age 5/15)', 'Mobile Number Link', 'New Enrolment'],
  },
  {
    id: 'ro-chd',
    city: 'Chandigarh',
    state: 'Chandigarh',
    jurisdiction: 'Punjab, Haryana, Himachal Pradesh, J&K, Ladakh, Chandigarh',
    address: 'SCO 139-141, 3rd & 4th Floor, Sector 17-C, Chandigarh - 160017',
    waitMinutes: 2,
    nextSlot: 'Today · 11:20 IST',
    nodalOfficer: 'Smt. Harpreet Kaur, Regional Lead',
    countersOpen: 12,
    services: ['Biometric Update', 'Baal Aadhaar (Age 5/15)', 'Mobile Number Link', 'New Enrolment'],
  },
  {
    id: 'ro-ghy',
    city: 'Guwahati',
    state: 'Assam',
    jurisdiction: 'Assam, Meghalaya, Manipur, Nagaland, Mizoram, Arunachal, Tripura, Sikkim',
    address: 'Block-V, 1st Floor, HOUSEFED Complex, Beltola-Basistha Road, Guwahati - 781006',
    waitMinutes: 3,
    nextSlot: 'Today · 12:15 IST',
    nodalOfficer: 'Shri Pranjal Borah, Dy. Director',
    countersOpen: 10,
    services: ['Biometric Update', 'Baal Aadhaar (Age 5/15)', 'Mobile Number Link', 'New Enrolment'],
  },
  {
    id: 'ro-rnc',
    city: 'Ranchi',
    state: 'Jharkhand',
    jurisdiction: 'Jharkhand, Bihar, West Bengal',
    address: '1st Floor, RIADA Central Office Building, Namkum Industrial Area, Ranchi - 834010',
    waitMinutes: 3,
    nextSlot: 'Today · 12:00 IST',
    nodalOfficer: 'Shri Sanjay Prasad, Nodal Officer',
    countersOpen: 12,
    services: ['Biometric Update', 'Baal Aadhaar (Age 5/15)', 'Mobile Number Link', 'Senior Doorstep Desk'],
  },
];

export interface SrnRecord {
  srn: string;
  type: BilingualText;
  submittedDate: string;
  slaDeadline: string;
  currentStageIndex: number;
  stages: {
    label: BilingualText;
    timestamp: string;
    detail: BilingualText;
  }[];
  awbNumber?: string;
  nodalOfficer: string;
  escalationEligible: boolean;
  escalationActive?: boolean;
}

export interface AuthLogEntry {
  id: string;
  timestamp: string;
  agency: BilingualText;
  modality: BilingualText;
  attributesShared: BilingualText;
  status: 'Verified' | 'Blocked' | 'Flagged';
}

export const INTENT_SHORTCUTS: {
  id: string;
  service: ServiceKey;
  prompt: BilingualText;
  sublabel: BilingualText;
}[] = [
  {
    id: 'intent-address',
    service: 'address',
    prompt: {
      hi: 'ऑनलाइन पता अद्यतन करें (डिजिलॉकर सत्यापित)',
      en: 'Update residential address via DigiLocker',
    },
    sublabel: {
      hi: '₹0 शुल्क · तत्काल पूर्व-सत्यापन · 90 सेकंड',
      en: '₹0 DigiLocker verify · Live pre-check · ~90 seconds',
    },
  },
  {
    id: 'intent-eaadhaar',
    service: 'eaadhaar',
    prompt: {
      hi: 'यूनिकोड ई-आधार डाउनलोड व ZKP QR साझा करें',
      en: 'Download Unicode e-Aadhaar or share Age 18+ ZKP',
    },
    sublabel: {
      hi: 'पासवर्ड-मुक्त · चयनात्मक गोपनीयता टोकन',
      en: 'Passwordless UTF-8 · 15-min selective disclosure QR',
    },
  },
  {
    id: 'intent-tracker',
    service: 'tracker',
    prompt: {
      hi: 'पीवीसी कार्ड डिस्पैच या अनुरोध (SRN) ट्रैक करें',
      en: 'Track Aadhaar PVC card or SRN status',
    },
    sublabel: {
      hi: 'इंडिया पोस्ट AWB · 72-घंटे स्वतः नोडल एस्केलेशन',
      en: 'Live India Post AWB · 72-hour automatic SLA escalation',
    },
  },
  {
    id: 'intent-vault',
    service: 'vault',
    prompt: {
      hi: 'बायोमेट्रिक लॉक करें और प्रमाणीकरण इतिहास देखें',
      en: 'Lock biometrics & inspect authentication ledger',
    },
    sublabel: {
      hi: 'तत्काल सुरक्षा लॉक · 16-अंकीय VID रोटेशन',
      en: 'Instant biometric shield · 16-digit Virtual ID rotation',
    },
  },
];

export const INITIAL_SRN_RECORDS: SrnRecord[] = [
  {
    srn: 'SRN-2036-PVC-19044',
    type: {
      hi: 'पीवीसी आधार कार्ड ऑर्डर (₹75)',
      en: 'Aadhaar PVC Card Order (₹75)',
    },
    submittedDate: '12 Nov 2036',
    slaDeadline: '17 Nov 2036 (SLA Breached · +76h)',
    currentStageIndex: 2,
    awbNumber: 'IP-RJ-88410293IN',
    nodalOfficer: 'Smt. Kavita Rathore · Regional Office, New Delhi / Jaipur',
    escalationEligible: true,
    escalationActive: false,
    stages: [
      {
        label: { hi: 'भुगतान व आदेश पुष्ट', en: 'Payment & Order Confirmed' },
        timestamp: '12 Nov · 10:14 IST',
        detail: {
          hi: 'यूपीआई संदर्भ #361112984 के माध्यम से ₹75 सत्यापित।',
          en: '₹75 verified via UPI ref #361112984.',
        },
      },
      {
        label: { hi: 'सुरक्षा मुद्रण पूर्ण', en: 'Secure Card Printed' },
        timestamp: '13 Nov · 16:40 IST',
        detail: {
          hi: 'यूनिकोड देवनागरी व होलोग्राम गुणवत्ता जांच उत्तीर्ण।',
          en: 'Embedded Devanagari Unicode & tactile hologram QC passed.',
        },
      },
      {
        label: { hi: 'डाक हैंडऑफ विलंबित', en: 'India Post Handoff Delayed' },
        timestamp: '14 Nov · 09:05 IST',
        detail: {
          hi: 'जयपुर जीपीओ सॉर्टिंग हब पर 76 घंटे से स्कैन प्रतीक्षित — स्वतः नोडल एस्केलेशन उपलब्ध।',
          en: 'Awaiting dispatch scan at Jaipur GPO Hub for 76h — automatic SLA escalation unlocked.',
        },
      },
      {
        label: { hi: 'स्पीड पोस्ट वितरण', en: 'Speed Post Delivery' },
        timestamp: 'Pending',
        detail: {
          hi: 'डिलीवरी पर ओटीपी-रहित क्यूआर पुष्टि।',
          en: 'Doorstep verification upon delivery.',
        },
      },
    ],
  },
  {
    srn: 'SRN-2036-BIO-44102',
    type: {
      hi: 'बायोमेट्रिक नवीनीकरण (15 वर्ष मील का पत्थर)',
      en: 'Mandatory Biometric Update (Age 15 Milestone)',
    },
    submittedDate: '18 Nov 2036',
    slaDeadline: '21 Nov 2036 (Completed)',
    currentStageIndex: 3,
    nodalOfficer: 'Shri Devendra Meena · Jaipur Seva Kendra',
    escalationEligible: false,
    stages: [
      {
        label: { hi: 'केंद्र पर कैप्चर', en: 'Seva Kendra Capture' },
        timestamp: '18 Nov · 11:20 IST',
        detail: {
          hi: 'आईरिस व फिंगरप्रिंट गुणवत्ता स्कोर 98/100।',
          en: 'Iris & fingerprint capture quality verified at 98/100.',
        },
      },
      {
        label: { hi: 'डी-डुप्लीकेशन जांच', en: 'Automated De-Duplication' },
        timestamp: '18 Nov · 11:24 IST',
        detail: {
          hi: 'केंद्रीय डेटाबेस मिलान 4 मिनट में पूर्ण।',
          en: 'CIDR biometric verification completed in 4 minutes.',
        },
      },
      {
        label: { hi: 'डिजिटल क्रेडेंशियल जारी', en: 'Digital Credential Issued' },
        timestamp: '18 Nov · 11:26 IST',
        detail: {
          hi: 'डिजिलॉकर व वॉलेट में नया यूनिकोड आधार अपडेट।',
          en: 'Updated Unicode credential synced to citizen wallet.',
        },
      },
      {
        label: { hi: 'पूर्ण (Complete)', en: 'Completed' },
        timestamp: '18 Nov · 11:26 IST',
        detail: {
          hi: 'कोई अतिरिक्त कार्रवाई आवश्यक नहीं।',
          en: 'No further citizen action required.',
        },
      },
    ],
  },
];

export const INITIAL_AUTH_LOGS: AuthLogEntry[] = [
  {
    id: 'AUTH-9041',
    timestamp: '20 Nov 2036 · 09:42 IST',
    agency: {
      hi: 'भारतीय स्टेट बैंक (SBI · जयपुर)',
      en: 'State Bank of India (SBI · Jaipur)',
    },
    modality: { hi: 'फेस लाइवनेस + ZKP', en: 'Face Liveness + ZKP' },
    attributesShared: {
      hi: 'केवल नाम व अंतिम 4 अंक',
      en: 'Name & Masked Last 4 Digits Only',
    },
    status: 'Verified',
  },
  {
    id: 'AUTH-9038',
    timestamp: '19 Nov 2036 · 18:15 IST',
    agency: {
      hi: 'होटल राजपूताना पैलेस चेक-इन',
      en: 'Hotel Rajputana Palace Check-In',
    },
    modality: { hi: 'चयनात्मक QR टोकन', en: 'Selective QR Token' },
    attributesShared: {
      hi: 'केवल आयु 18+ व पिनकोड (302017)',
      en: 'Age 18+ & PIN Code (302017) Only',
    },
    status: 'Verified',
  },
  {
    id: 'AUTH-9031',
    timestamp: '16 Nov 2036 · 22:08 IST',
    agency: {
      hi: 'अज्ञात टेलीकॉम केवाईसी टर्मिनल (नोएडा)',
      en: 'Unrecognized Telecom KYC Terminal (Noida)',
    },
    modality: { hi: 'फिंगरप्रिंट प्रयास', en: 'Fingerprint Attempt' },
    attributesShared: {
      hi: 'कुछ नहीं — बायोमेट्रिक लॉक द्वारा अवरुद्ध',
      en: 'None — Blocked by Biometric Lock',
    },
    status: 'Blocked',
  },
];

export interface CitizenCharterRow {
  service: BilingualText;
  channel: BilingualText;
  statutoryFee: string;
  guaranteedSla: BilingualText;
}

export const CITIZEN_CHARTER_ROWS: CitizenCharterRow[] = [
  {
    service: { en: 'New Aadhaar Enrolment (Resident / Baal Aadhaar)', hi: 'नया आधार नामांकन (निवासी / बाल आधार)' },
    channel: { en: 'Aadhaar Seva Kendra', hi: 'आधार सेवा केंद्र' },
    statutoryFee: '₹0 (Free)',
    guaranteedSla: { en: 'Within 72 Hours', hi: '72 घंटे के भीतर' },
  },
  {
    service: { en: 'Mandatory Biometric Update (Age 5 & Age 15)', hi: 'अनिवार्य बायोमेट्रिक अद्यतन (आयु 5 व 15 वर्ष)' },
    channel: { en: 'Aadhaar Seva Kendra', hi: 'आधार सेवा केंद्र' },
    statutoryFee: '₹0 (Free)',
    guaranteedSla: { en: 'Instant – 24 Hours', hi: 'तत्काल – 24 घंटे' },
  },
  {
    service: { en: 'Address Update via DigiLocker Auto-Fetch', hi: 'डिजिलॉकर द्वारा पता अद्यतन' },
    channel: { en: 'Online Portal (Passkey)', hi: 'ऑनलाइन पोर्टल (पासकी)' },
    statutoryFee: '₹0 (Free)',
    guaranteedSla: { en: 'Under 4 Hours', hi: '4 घंटे के भीतर' },
  },
  {
    service: { en: 'Address / Demographic Update (Manual Document)', hi: 'पता / जनसांख्यिकीय अद्यतन (मैनुअल दस्तावेज़)' },
    channel: { en: 'Online Portal / Seva Kendra', hi: 'ऑनलाइन पोर्टल / सेवा केंद्र' },
    statutoryFee: '₹50',
    guaranteedSla: { en: 'Within 72 Hours (Auto-Escalate)', hi: '72 घंटे के भीतर (स्वतः एस्केलेशन)' },
  },
  {
    service: { en: 'Aadhaar PVC Card (Tactile Hologram + Speed Post)', hi: 'आधार पीवीसी कार्ड (स्पीड पोस्ट सहित)' },
    channel: { en: 'Online Portal', hi: 'ऑनलाइन पोर्टल' },
    statutoryFee: '₹75',
    guaranteedSla: { en: '5 Working Days (Live AWB)', hi: '5 कार्य दिवस (लाइव AWB)' },
  },
  {
    service: { en: 'Senior Citizen / Divyangjan Doorstep Biometric Visit', hi: 'वरिष्ठ नागरिक / दिव्यांगजन डोरस्टेप सेवा' },
    channel: { en: 'India Post Payments Bank Postman', hi: 'इंडिया पोस्ट पेमेंट्स बैंक पोस्टमैन' },
    statutoryFee: '₹70',
    guaranteedSla: { en: '48 Hours Appointment Window', hi: '48 घंटे अपॉइंटमेंट विंडो' },
  },
];

export interface OfficialFaq {
  id: string;
  category: string;
  question: BilingualText;
  answer: BilingualText;
}

export const OFFICIAL_FAQS: OfficialFaq[] = [
  {
    id: 'faq-1',
    category: 'Digital Pass & ZKP',
    question: {
      en: 'How does Selective Zero-Knowledge Proof (ZKP) work at hotels or airports?',
      hi: 'होटल या हवाई अड्डों पर चयनात्मक शून्य-ज्ञान प्रमाण (ZKP) कैसे काम करता है?',
    },
    answer: {
      en: 'Open My Aadhaar → e-Aadhaar & ZKP, select only the fields required (such as Name and Age 18+ Proof), and display the 15-minute Ed25519 QR code. The verifier scans the QR offline or online without receiving your full 12-digit Aadhaar number, exact date of birth, or street address.',
      hi: 'मेरा आधार → ई-आधार व ZKP खोलें, केवल आवश्यक विवरण (जैसे नाम और आयु 18+) चुनें और 15-मिनट का Ed25519 QR दिखाएं। सत्यापनकर्ता बिना आपका 12-अंकीय नंबर या पूरा पता देखे तुरंत पुष्टि कर सकता है।',
    },
  },
  {
    id: 'faq-2',
    category: 'Address Update',
    question: {
      en: 'Why is DigiLocker Address Update free and approved within 4 hours?',
      hi: 'डिजिलॉकर द्वारा पता अद्यतन निःशुल्क और 4 घंटे में कैसे स्वीकृत होता है?',
    },
    answer: {
      en: 'Utility bills, LPG connections, and domicile certificates fetched directly from DigiLocker carry the issuing authority’s cryptographic signature. Because no manual back-office inspection is required, UIDAI processes these updates automatically at ₹0 citizen fee.',
      hi: 'डिजिलॉकर से सीधे प्राप्त बिजली बिल, एलपीजी व निवास प्रमाण पत्र जारीकर्ता विभाग द्वारा डिजिटल रूप से हस्ताक्षरित होते हैं। मैनुअल जांच की आवश्यकता न होने से UIDAI इन्हें ₹0 शुल्क पर स्वतः स्वीकृत करता है।',
    },
  },
  {
    id: 'faq-3',
    category: 'PVC & Grievance',
    question: {
      en: 'What happens if my PVC card or update request is delayed beyond 72 hours?',
      hi: 'यदि मेरा पीवीसी कार्ड या अद्यतन अनुरोध 72 घंटे से अधिक अटका रहे तो क्या होगा?',
    },
    answer: {
      en: 'Under the UIDAI Citizen SLA Mandate, any SRN stalled past 72 hours unlocks one-click escalation directly to the named Regional Nodal Officer. Escalated tickets are locked against automated closure and require your confirmation OTP before being marked resolved.',
      hi: 'UIDAI नागरिक SLA नियम के तहत 72 घंटे से अधिक लंबित किसी भी SRN पर सीधे नामित क्षेत्रीय नोडल अधिकारी को एस्केलेशन खुल जाता है। एस्केलेट किए गए टिकट आपकी पुष्टि के बिना बंद नहीं किए जा सकते।',
    },
  },
  {
    id: 'faq-4',
    category: 'Security & Biometrics',
    question: {
      en: 'If I lock my biometrics, can I still use Passkey login and ZKP e-Aadhaar?',
      hi: 'यदि मैं बायोमेट्रिक लॉक कर दूं, तो क्या पासकी लॉगिन और ZKP ई-आधार काम करेंगे?',
    },
    answer: {
      en: 'Yes. Locking your biometrics blocks external Fingerprint and Iris authentication requests (such as AePS or telecom PoS terminals) while allowing your FIDO2 Device Passkey, Face Liveness, Virtual ID (VID), and Selective ZKP QR passes to function seamlessly.',
      hi: 'हाँ। बायोमेट्रिक लॉक बाहरी फिंगरप्रिंट व आईरिस प्रयासों को रोकता है, जबकि आपका डिवाइस पासकी, वर्चुअल आईडी (VID) और चयनात्मक ZKP QR सामान्य रूप से काम करते रहते हैं।',
    },
  },
];
