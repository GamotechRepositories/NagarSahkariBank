import deafCurrentAccountPdf from '../assets/Deaf Current Account.pdf'
import deafSavingDepositorsPdf from '../assets/Deaf Saving Depositors.pdf'
import latestRateOfInterestPdf from '../assets/latest rate of interest wef 01-02-2025.pdf'
import savingFormPdf from '../assets/SAVING FORM.pdf'
import neftRtgsFormPdf from '../assets/NEFT RTGS FORM.pdf'
import nominationFormPdf from '../assets/NOMINATION FORM.pdf'
import aadhaarLinkingFormPdf from '../assets/NPCI AADHAR LINKING FORM.pdf'
import charges2024Pdf from '../assets/charges.pdf'
import charges2025Pdf from '../assets/CHARGES updation 01-02-2025.pdf'

export const COMPANY = {
  name: 'Nagar Sahkari Bank Ltd. Etawah',
  legalName: 'Nagar Sahkari Bank Ltd. Etawah',
  logo: '/image.png',
  tagline: 'Easy banking for the people of Etawah since 1997',
  phone: '+91-9569639502',
  email: 'banking@nsbletawah.com',
  website: 'https://www.nsbletawah.com',
  address: 'Raja Ganj-Tehsil Chauraha, Etawah-206001',
  hours: 'Monday – Saturday, 09:30 AM – 06:30 PM',
  established: '18 October 1997',
  founder: 'Shri Dayaram Prajapati (Ex. Cabinet Minister, Uttar Pradesh Government)',
  rbiLicense:
    'Licensed by the Reserve Bank of India under subsection 22(1), section 56(O) of the Banking Regulation Act, 1949',
  cooperativeAct: 'Established under section 8 of the Uttar Pradesh Cooperative Act, 1965',
  dicgc: 'Registered with DICGC, Mumbai (sponsored by the Reserve Bank of India)',
  dicgcUrl: 'https://www.dicgc.org.in',
}

export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'csr', label: 'CSR' },
  { id: 'contact', label: 'Contact' },
  { id: 'privacy', label: 'Privacy Policy' },
]

export const HOME_HERO = {
  title: 'We have been working efficiently with loans and funding for 25 years.',
  subtitle: 'Easy banking for the people of Etawah since 18 October 1997.',
  description:
    'Nagar Sahkari Bank Ltd. Etawah is a co-operative bank licensed by the Reserve Bank of India, serving customers from Raja Ganj-Tehsil Chauraha, Etawah.',
  note: 'Founded to make banking easier for the people of the region, we offer deposits, loans, and everyday banking services with the protection of DICGC deposit insurance.',
  highlights: ['Quick Processing', 'Transparent Services', 'Secure Digital Platform'],
}

export const WHY_CHOOSE = [
  {
    icon: 'bolt',
    title: 'Fast Processing & Timely Assistance',
    text: 'Our streamlined application and verification process helps reduce unnecessary delays, ensuring customers receive professional guidance and efficient service at every stage.',
  },
  {
    icon: 'wallet',
    title: 'Flexible Repayment Options',
    text: 'We understand that every financial journey is different. Our repayment options are designed to offer convenience, flexibility, and financial comfort.',
  },
  {
    icon: 'document',
    title: 'Paperless & Digital Process',
    text: 'Experience a simplified digital application process with minimal paperwork, secure documentation, and faster processing.',
  },
  {
    icon: 'shield',
    title: 'Safe, Secure & Transparent',
    text: 'Your trust matters. We maintain complete transparency while protecting customer information through modern digital security standards.',
  },
  {
    icon: 'users',
    title: 'Customer-Centric Approach',
    text: 'Every customer receives personalized support from our experienced team, ensuring clarity, confidence, and professional assistance throughout the journey.',
  },
  {
    icon: 'map',
    title: 'Local Banking in Etawah',
    text: 'We serve individuals, families, and businesses in Etawah with branch banking, digital services, and responsible lending.',
  },
]

export const SERVICES = [
  {
    icon: 'wallet',
    title: 'Personal Financial Assistance',
    text: 'Helping individuals manage essential financial requirements through transparent and customer-friendly financial support.',
  },
  {
    icon: 'briefcase',
    title: 'Business Growth Support',
    text: 'Empowering entrepreneurs and small business owners with financial solutions that encourage expansion and long-term success.',
  },
  {
    icon: 'heart',
    title: 'Women Empowerment',
    text: 'Supporting women entrepreneurs by improving access to financial opportunities and encouraging economic independence.',
  },
  {
    icon: 'building',
    title: 'MSME Development',
    text: 'Helping Micro, Small, and Medium Enterprises strengthen their businesses through responsible financial assistance.',
  },
  {
    icon: 'users',
    title: 'Financial Inclusion Programs',
    text: 'Creating opportunities for underserved communities by improving access to quality financial services.',
  },
  {
    icon: 'spark',
    title: 'Digital Financial Services',
    text: 'Simplifying financial services through secure, technology-driven digital platforms and efficient customer support.',
  },
]

export const BANKING_SERVICES = [
  {
    icon: 'transfer',
    title: 'RTGS / NEFT',
    text: 'Transfer funds securely across banks through RTGS and NEFT from your account.',
  },
  {
    icon: 'sms',
    title: 'SMS Facility',
    text: 'Receive account alerts, transaction updates, and important bank notifications on your registered mobile.',
  },
  {
    icon: 'locker',
    title: 'Locker Facility',
    text: 'Keep valuables and important documents safe with our safe-deposit locker facility.',
  },
  {
    icon: 'card',
    title: 'Debit Card',
    text: 'Withdraw cash, shop at merchant outlets, and make everyday payments with your debit card.',
  },
  {
    icon: 'netbanking',
    title: 'Net Banking',
    text: 'Access your account online to view statements, transfer funds, and manage banking services.',
  },
  {
    icon: 'qr',
    title: 'POS (QR Code)',
    text: 'Accept and make digital payments quickly using POS and QR-code facilities.',
  },
  {
    icon: 'fastag',
    title: 'FASTag',
    text: 'Pay highway tolls seamlessly with FASTag linked to your bank account.',
  },
  {
    icon: 'phone',
    title: 'Mobile App',
    text: 'Manage selected banking services on the go through our mobile application.',
  },
]

export const DEPOSIT_ACCOUNTS = [
  {
    icon: 'wallet',
    title: 'Saving Account',
    text: 'A convenient savings account to keep your money safe and accessible for everyday needs.',
  },
  {
    icon: 'briefcase',
    title: 'Current Account',
    text: 'Current accounts for traders, professionals, and businesses that need frequent transactions.',
  },
  {
    icon: 'locker',
    title: 'Fixed Deposits',
    text: 'Park surplus funds in fixed deposits and earn interest as per the bank’s published rates.',
  },
  {
    icon: 'clock',
    title: 'RD Account',
    text: 'Build savings over time with a recurring deposit account suited to regular monthly deposits.',
  },
]

export const LOAN_PRODUCTS = [
  { icon: 'building', title: 'Home Loan', text: 'Finance the purchase or construction of a home as per bank norms.' },
  { icon: 'fastag', title: 'Car Loan', text: 'Vehicle finance to help you buy a car with a structured repayment plan.' },
  { icon: 'user', title: 'Personal Loan', text: 'Personal funding for essential needs, processed as per bank policy.' },
  { icon: 'star', title: 'Gold Loan', text: 'Loans against gold ornaments for short-term liquidity.' },
  { icon: 'briefcase', title: 'Business Loan', text: 'Credit support for traders and local businesses to meet working-capital needs.' },
  { icon: 'card', title: 'Cash Credit Limit', text: 'Cash credit facilities to manage day-to-day business cash flow.' },
  { icon: 'building', title: 'Loan Against Property', text: 'Loans against immovable property, subject to eligibility and documentation.' },
  { icon: 'document', title: 'Loan Against NSC/KVP/LIC/FD', text: 'Loans against insurance policies, Kisan Vikas Patra, NSC, and fixed deposits.' },
]

export const NOTICE_BOARD = {
  announcements: [
    {
      title: 'DEAF Current Account',
      href: deafCurrentAccountPdf,
      filename: 'DEAF Current Account.pdf',
    },
    {
      title: 'DEAF Saving Account',
      href: deafSavingDepositorsPdf,
      filename: 'DEAF Saving Depositors.pdf',
    },
  ],
  forms: [
    {
      title: 'Latest Rate of Interests',
      href: latestRateOfInterestPdf,
      filename: 'Latest Rate of Interest W.E.F. 01-02-2025.pdf',
    },
    {
      title: 'Saving A/C Opening Form',
      href: savingFormPdf,
      filename: 'Saving A-C Opening Form.pdf',
    },
    {
      title: 'NEFT / RTGS Form',
      href: neftRtgsFormPdf,
      filename: 'NEFT RTGS Form.pdf',
    },
    {
      title: 'Nomination Form',
      href: nominationFormPdf,
      filename: 'Nomination Form.pdf',
    },
    {
      title: 'Aadhaar Linking Form',
      href: aadhaarLinkingFormPdf,
      filename: 'Aadhaar Linking Form.pdf',
    },
    {
      title: 'List of Charges W.E.F. 01-01-2024',
      href: charges2024Pdf,
      filename: 'List of Charges W.E.F. 01-01-2024.pdf',
    },
    {
      title: 'List of Charges W.E.F. 01-02-2025',
      href: charges2025Pdf,
      filename: 'List of Charges W.E.F. 01-02-2025.pdf',
    },
  ],
}

export const PROCESS_STEPS = [
  {
    step: 'Step 1',
    title: 'Submit Your Application',
    text: 'Complete a simple application by providing your basic information and required documents.',
  },
  {
    step: 'Step 2',
    title: 'Document Verification',
    text: 'Our experienced team reviews your information through a transparent verification process.',
  },
  {
    step: 'Step 3',
    title: 'Eligibility Assessment',
    text: 'Applications are evaluated according to applicable guidelines and internal assessment procedures.',
  },
  {
    step: 'Step 4',
    title: 'Approval & Assistance',
    text: 'After successful verification, our team proceeds with the approval process and continues supporting you throughout your financial journey.',
  },
]

export const CORE_VALUES = [
  { title: 'Integrity', text: 'Maintaining honesty, transparency, and accountability in every customer interaction.' },
  { title: 'Customer First', text: 'Putting customer satisfaction at the heart of every decision.' },
  { title: 'Financial Inclusion', text: 'Making financial services accessible to deserving individuals and underserved communities.' },
  { title: 'Innovation', text: 'Leveraging technology to improve efficiency, security, and customer experience.' },
  { title: 'Responsibility', text: 'Operating with ethical practices while maintaining regulatory compliance.' },
  { title: 'Excellence', text: 'Continuously improving our services to deliver exceptional value and trust.' },
]

export const TESTIMONIALS = [
  { name: 'Rajesh Sharma', role: 'Small Business Owner', quote: 'The entire process was smooth and transparent. The team explained every step clearly and provided excellent support throughout my journey.' },
  { name: 'Sunita Verma', role: 'Entrepreneur', quote: 'I truly appreciate the professionalism and customer-first approach. Their guidance helped me move forward with confidence.' },
  { name: 'Amit Patel', role: 'Retail Business', quote: 'Quick response, transparent communication, and a very professional experience. I highly recommend Nagar Sahkari Bank Ltd. Etawah.' },
  { name: 'Pooja Singh', role: 'Self-Employed Professional', quote: 'The digital process was simple and convenient. The team was always available whenever I needed assistance.' },
  { name: 'Rahul Yadav', role: 'Entrepreneur', quote: 'Excellent customer service and a hassle-free experience from application to completion.' },
  { name: 'Neha Gupta', role: 'Small Business Owner', quote: 'Their transparent approach gave me complete confidence. Every step was clearly communicated.' },
]

export const HOME_FAQ = [
  {
    q: 'What is Nagar Sahkari Bank Ltd. Etawah?',
    a: 'Nagar Sahkari Bank Ltd. Etawah is a co-operative bank established on 18 October 1997 under section 8 of the Uttar Pradesh Cooperative Act, 1965, and licensed by the Reserve Bank of India under the Banking Regulation Act, 1949.',
  },
  {
    q: 'Are deposits in the bank safe?',
    a: 'Deposits are protected like those in nationalised banks under the Deposit Insurance and Credit Guarantee Corporation (DICGC), Mumbai, sponsored by the Reserve Bank of India. Learn more at dicgc.org.in.',
  },
  {
    q: 'What deposit accounts are available?',
    a: 'We offer Saving Accounts, Current Accounts, Fixed Deposits, and Recurring Deposit (RD) accounts.',
  },
  {
    q: 'What loans does the bank offer?',
    a: 'Loans are disbursed on a priority basis as per RBI standards, including home, car, personal, gold, business, cash credit, loan against property, and loans against NSC, KVP, LIC, and fixed deposits. You can also apply online through our loan application flow.',
  },
  {
    q: 'How can I contact Nagar Sahkari Bank Ltd. Etawah?',
    a: `Visit us at ${COMPANY.address}, call our helpline at ${COMPANY.phone}, or email ${COMPANY.email}.`,
  },
]

export const DIFFERENTIATORS = [
  'RBI licensed co-operative bank',
  'DICGC deposit insurance',
  'Branch in Etawah',
  'RTGS / NEFT and net banking',
  'Locker, debit card and FASTag',
  'Loans as per RBI priority norms',
]

export const CSR_FOCUS = [
  { title: 'Financial Inclusion', text: 'Increasing financial awareness and encouraging responsible financial participation among underserved communities.' },
  { title: 'Women Empowerment', text: 'Creating opportunities that encourage financial independence, entrepreneurship, and leadership among women.' },
  { title: 'Entrepreneurship Development', text: 'Supporting aspiring entrepreneurs by promoting business awareness, financial education, and sustainable enterprise development.' },
  { title: 'Education & Skill Development', text: 'Encouraging learning initiatives that improve employability, financial awareness, and professional growth.' },
  { title: 'Community Development', text: 'Supporting initiatives that improve quality of life and encourage social development.' },
  { title: 'Digital Inclusion', text: 'Encouraging digital awareness and responsible technology adoption in communities.' },
]

export const PRIVACY_SECTIONS = [
  {
    title: '1. Definitions',
    content:
      'This Privacy Policy applies to Nagar Sahkari Bank Ltd. Etawah. Personal Data includes information relating to an identified or identifiable natural person. Sensitive Personal Information includes financial information, KYC documents, and authentication credentials protected under applicable regulations.',
  },
  {
    title: '2. General',
    content:
      'Nagar Sahkari Bank Ltd. Etawah is committed to maintaining the highest standards of privacy, transparency, and information security. We collect only information reasonably necessary for legitimate business purposes, regulatory compliance, fraud prevention, and service delivery.',
  },
  {
    title: '3. Scope and Acceptance',
    content:
      'This Privacy Policy applies to every visitor, registered user, borrower, applicant, customer, partner, and individual who accesses our website, mobile applications, online portals, or financial inclusion services. By using our services, you consent to the collection and processing of your information in accordance with this policy.',
  },
  {
    title: '4. Data Collected by Us',
    content:
      'We may collect personal details, KYC information, financial information, device information, location information (with consent), and information from authorized third-party sources such as credit information companies and KYC verification agencies.',
  },
  {
    title: '5. Sharing of Personal Information',
    content:
      'We do not sell, rent, or trade your Personal Data. Information may be shared with service providers, banking and financial partners, and regulatory authorities where necessary for service delivery, compliance, or lawful directions.',
  },
  {
    title: '6. Use of Personal Information',
    content:
      'Personal information is used for customer services, financial services, compliance, communication, website improvement, research, analytics, and consent-based processing as permitted by law.',
  },
  {
    title: '7. Security',
    content:
      'We implement SSL encryption, secure infrastructure, firewalls, access controls, and regular security audits. Users are responsible for maintaining confidentiality of their login credentials and OTPs.',
  },
  {
    title: '8. Third-Party Links',
    content:
      'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of external platforms.',
  },
  {
    title: '9. Grievance Redressal',
    content:
      `For privacy-related concerns, contact our Data Protection Officer at ${COMPANY.email}. We will acknowledge and respond to complaints within applicable timelines.`,
  },
  {
    title: '10. Data Retention',
    content:
      'Personal Data is retained only as long as necessary to provide services, comply with laws, resolve disputes, prevent fraud, and meet regulatory record-keeping requirements.',
  },
  {
    title: '11. Your Rights',
    content:
      'Subject to applicable law, you may request access, correction, erasure, consent withdrawal, grievance redressal, and nomination rights regarding your Personal Data.',
  },
  {
    title: '12. Applicable Laws',
    content:
      'This Privacy Policy is governed by the laws of India, including the Digital Personal Data Protection Act, 2023, Information Technology Act, 2000, and applicable RBI guidelines.',
  },
]
