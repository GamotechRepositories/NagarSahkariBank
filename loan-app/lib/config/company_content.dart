/// Company details and copy shared across the app screens.
library;

class Company {
  const Company._();

  static const String name = 'Sakaar Foundation';
  static const String legalName = 'Sakaar Microcredit Foundation';
  static const String tagline = 'Transforming Lives Through Financial Inclusion';
  static const String phone = '+91 81691 82144';
  static const String email = 'banking@nsbletawah.com';
  static const String website = 'https://www.nsbletawah.com';
  static const String address =
      'Office No. 123, Topiwala Center, Off S. V. Road, Near BMC Market, Goregaon (West), Mumbai – 400104, Maharashtra, India';
  static const String hours = 'Monday – Saturday, 09:30 AM – 06:30 PM';
}

/// The pages reachable from the website navigation.
enum WebsitePage { home, about, services, csr, contact, privacy, profile }

class NavItem {
  const NavItem(this.page, this.label);

  final WebsitePage page;
  final String label;
}

const List<NavItem> navItems = [
  NavItem(WebsitePage.home, 'Home'),
  NavItem(WebsitePage.about, 'About'),
  NavItem(WebsitePage.services, 'Services'),
  NavItem(WebsitePage.csr, 'CSR'),
  NavItem(WebsitePage.contact, 'Contact'),
  NavItem(WebsitePage.privacy, 'Privacy Policy'),
];

class HomeHero {
  const HomeHero._();

  static const String title = 'Transforming Lives Through Financial Inclusion';
  static const String subtitle =
      'Empowering Individuals. Supporting Entrepreneurs. Strengthening Communities.';
  static const String description =
      'At Sakaar Foundation, we believe financial inclusion is the key to creating a stronger and more prosperous society. Since our inception, we have been committed to empowering individuals, supporting entrepreneurs, and uplifting underserved communities through responsible microfinance and transparent financial solutions.';
  static const String note =
      'Our customer-first approach, simplified processes, and technology-driven services make financial assistance more accessible, secure, and reliable for everyone.';
  static const List<String> highlights = [
    'Quick Processing',
    'Transparent Services',
    'Secure Digital Platform',
  ];
}

/// A card entry for `CardGrid`. [items] renders the optional check list.
class ContentCard {
  const ContentCard({
    required this.title,
    required this.text,
    this.icon,
    this.items,
  });

  final String title;
  final String text;
  final String? icon;
  final List<String>? items;
}

const List<ContentCard> whyChoose = [
  ContentCard(
    icon: 'bolt',
    title: 'Fast Processing & Timely Assistance',
    text:
        'Our streamlined application and verification process helps reduce unnecessary delays, ensuring customers receive professional guidance and efficient service at every stage.',
  ),
  ContentCard(
    icon: 'wallet',
    title: 'Flexible Repayment Options',
    text:
        'We understand that every financial journey is different. Our repayment options are designed to offer convenience, flexibility, and financial comfort.',
  ),
  ContentCard(
    icon: 'document',
    title: 'Paperless & Digital Process',
    text:
        'Experience a simplified digital application process with minimal paperwork, secure documentation, and faster processing.',
  ),
  ContentCard(
    icon: 'shield',
    title: 'Safe, Secure & Transparent',
    text:
        'Your trust matters. We maintain complete transparency while protecting customer information through modern digital security standards.',
  ),
  ContentCard(
    icon: 'users',
    title: 'Customer-Centric Approach',
    text:
        'Every customer receives personalized support from our experienced team, ensuring clarity, confidence, and professional assistance throughout the journey.',
  ),
  ContentCard(
    icon: 'map',
    title: 'Expanding Financial Inclusion Across India',
    text:
        'We are committed to reaching individuals, entrepreneurs, and communities across India through responsible financial services and technology-driven accessibility.',
  ),
];

const List<ContentCard> services = [
  ContentCard(
    icon: 'wallet',
    title: 'Personal Financial Assistance',
    text:
        'Helping individuals manage essential financial requirements through transparent and customer-friendly financial support.',
  ),
  ContentCard(
    icon: 'briefcase',
    title: 'Business Growth Support',
    text:
        'Empowering entrepreneurs and small business owners with financial solutions that encourage expansion and long-term success.',
  ),
  ContentCard(
    icon: 'heart',
    title: 'Women Empowerment',
    text:
        'Supporting women entrepreneurs by improving access to financial opportunities and encouraging economic independence.',
  ),
  ContentCard(
    icon: 'building',
    title: 'MSME Development',
    text:
        'Helping Micro, Small, and Medium Enterprises strengthen their businesses through responsible financial assistance.',
  ),
  ContentCard(
    icon: 'users',
    title: 'Financial Inclusion Programs',
    text:
        'Creating opportunities for underserved communities by improving access to quality financial services.',
  ),
  ContentCard(
    icon: 'spark',
    title: 'Digital Financial Services',
    text:
        'Simplifying financial services through secure, technology-driven digital platforms and efficient customer support.',
  ),
];

class ProcessStep {
  const ProcessStep({
    required this.step,
    required this.title,
    required this.text,
  });

  final String step;
  final String title;
  final String text;
}

const List<ProcessStep> processSteps = [
  ProcessStep(
    step: 'Step 1',
    title: 'Submit Your Application',
    text:
        'Complete a simple application by providing your basic information and required documents.',
  ),
  ProcessStep(
    step: 'Step 2',
    title: 'Document Verification',
    text:
        'Our experienced team reviews your information through a transparent verification process.',
  ),
  ProcessStep(
    step: 'Step 3',
    title: 'Eligibility Assessment',
    text:
        'Applications are evaluated according to applicable guidelines and internal assessment procedures.',
  ),
  ProcessStep(
    step: 'Step 4',
    title: 'Approval & Assistance',
    text:
        'After successful verification, our team proceeds with the approval process and continues supporting you throughout your financial journey.',
  ),
];

const List<ContentCard> coreValues = [
  ContentCard(
    title: 'Integrity',
    text:
        'Maintaining honesty, transparency, and accountability in every customer interaction.',
  ),
  ContentCard(
    title: 'Customer First',
    text: 'Putting customer satisfaction at the heart of every decision.',
  ),
  ContentCard(
    title: 'Financial Inclusion',
    text:
        'Making financial services accessible to deserving individuals and underserved communities.',
  ),
  ContentCard(
    title: 'Innovation',
    text:
        'Leveraging technology to improve efficiency, security, and customer experience.',
  ),
  ContentCard(
    title: 'Responsibility',
    text:
        'Operating with ethical practices while maintaining regulatory compliance.',
  ),
  ContentCard(
    title: 'Excellence',
    text:
        'Continuously improving our services to deliver exceptional value and trust.',
  ),
];

class Testimonial {
  const Testimonial({
    required this.name,
    required this.role,
    required this.quote,
  });

  final String name;
  final String role;
  final String quote;

  /// Initials of the first two words, as the web card does.
  String get initials => name
      .split(' ')
      .take(2)
      .where((part) => part.isNotEmpty)
      .map((part) => part[0])
      .join();
}

const List<Testimonial> testimonials = [
  Testimonial(
    name: 'Rajesh Sharma',
    role: 'Small Business Owner',
    quote:
        'The entire process was smooth and transparent. The team explained every step clearly and provided excellent support throughout my journey.',
  ),
  Testimonial(
    name: 'Sunita Verma',
    role: 'Entrepreneur',
    quote:
        'I truly appreciate the professionalism and customer-first approach. Their guidance helped me move forward with confidence.',
  ),
  Testimonial(
    name: 'Amit Patel',
    role: 'Retail Business',
    quote:
        'Quick response, transparent communication, and a very professional experience. I highly recommend Sakaar Foundation.',
  ),
  Testimonial(
    name: 'Pooja Singh',
    role: 'Self-Employed Professional',
    quote:
        'The digital process was simple and convenient. The team was always available whenever I needed assistance.',
  ),
  Testimonial(
    name: 'Rahul Yadav',
    role: 'Entrepreneur',
    quote:
        'Excellent customer service and a hassle-free experience from application to completion.',
  ),
  Testimonial(
    name: 'Neha Gupta',
    role: 'Small Business Owner',
    quote:
        'Their transparent approach gave me complete confidence. Every step was clearly communicated.',
  ),
];

class FaqItem {
  const FaqItem(this.question, this.answer);

  final String question;
  final String answer;
}

const List<FaqItem> homeFaq = [
  FaqItem(
    'What is Sakaar Foundation?',
    'Sakaar Foundation is a Section 8 organization dedicated to promoting financial inclusion by supporting individuals, entrepreneurs, and underserved communities through responsible financial solutions.',
  ),
  FaqItem(
    'Who can apply?',
    'Eligible individuals, entrepreneurs, self-employed professionals, and small businesses meeting the required criteria can apply.',
  ),
  FaqItem(
    'Is the application process completely digital?',
    'Yes. Our technology-driven process simplifies applications with secure digital documentation and verification.',
  ),
  FaqItem(
    'Is my personal information secure?',
    'Absolutely. We follow modern security standards and privacy practices to ensure customer information remains protected.',
  ),
  FaqItem(
    'How can I contact Sakaar Foundation?',
    'You can contact us by phone at ${Company.phone}, by email at ${Company.email}, or by visiting our office during business hours.',
  ),
];

const List<String> differentiators = [
  'Transparent Process',
  'Professional Support',
  'Responsible Financial Practices',
  'Digital Convenience',
  'Trusted Organization',
  'Customer Satisfaction',
];

const List<ContentCard> csrFocus = [
  ContentCard(
    title: 'Financial Inclusion',
    text:
        'Increasing financial awareness and encouraging responsible financial participation among underserved communities.',
  ),
  ContentCard(
    title: 'Women Empowerment',
    text:
        'Creating opportunities that encourage financial independence, entrepreneurship, and leadership among women.',
  ),
  ContentCard(
    title: 'Entrepreneurship Development',
    text:
        'Supporting aspiring entrepreneurs by promoting business awareness, financial education, and sustainable enterprise development.',
  ),
  ContentCard(
    title: 'Education & Skill Development',
    text:
        'Encouraging learning initiatives that improve employability, financial awareness, and professional growth.',
  ),
  ContentCard(
    title: 'Community Development',
    text:
        'Supporting initiatives that improve quality of life and encourage social development.',
  ),
  ContentCard(
    title: 'Digital Inclusion',
    text:
        'Encouraging digital awareness and responsible technology adoption in communities.',
  ),
];

const List<FaqItem> privacySections = [
  FaqItem(
    '1. Definitions',
    'This Privacy Policy applies to Sakaar Microcredit Foundation. Personal Data includes information relating to an identified or identifiable natural person. Sensitive Personal Information includes financial information, KYC documents, and authentication credentials protected under applicable regulations.',
  ),
  FaqItem(
    '2. General',
    'Sakaar Microcredit Foundation is committed to maintaining the highest standards of privacy, transparency, and information security. We collect only information reasonably necessary for legitimate business purposes, regulatory compliance, fraud prevention, and service delivery.',
  ),
  FaqItem(
    '3. Scope and Acceptance',
    'This Privacy Policy applies to every visitor, registered user, borrower, applicant, customer, partner, and individual who accesses our website, mobile applications, online portals, or financial inclusion services. By using our services, you consent to the collection and processing of your information in accordance with this policy.',
  ),
  FaqItem(
    '4. Data Collected by Us',
    'We may collect personal details, KYC information, financial information, device information, location information (with consent), and information from authorized third-party sources such as credit information companies and KYC verification agencies.',
  ),
  FaqItem(
    '5. Sharing of Personal Information',
    'We do not sell, rent, or trade your Personal Data. Information may be shared with service providers, banking and financial partners, and regulatory authorities where necessary for service delivery, compliance, or lawful directions.',
  ),
  FaqItem(
    '6. Use of Personal Information',
    'Personal information is used for customer services, financial services, compliance, communication, website improvement, research, analytics, and consent-based processing as permitted by law.',
  ),
  FaqItem(
    '7. Security',
    'We implement SSL encryption, secure infrastructure, firewalls, access controls, and regular security audits. Users are responsible for maintaining confidentiality of their login credentials and OTPs.',
  ),
  FaqItem(
    '8. Third-Party Links',
    'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of external platforms.',
  ),
  FaqItem(
    '9. Grievance Redressal',
    'For privacy-related concerns, contact our Data Protection Officer at ${Company.email}. We will acknowledge and respond to complaints within applicable timelines.',
  ),
  FaqItem(
    '10. Data Retention',
    'Personal Data is retained only as long as necessary to provide services, comply with laws, resolve disputes, prevent fraud, and meet regulatory record-keeping requirements.',
  ),
  FaqItem(
    '11. Your Rights',
    'Subject to applicable law, you may request access, correction, erasure, consent withdrawal, grievance redressal, and nomination rights regarding your Personal Data.',
  ),
  FaqItem(
    '12. Applicable Laws',
    'This Privacy Policy is governed by the laws of India, including the Digital Personal Data Protection Act, 2023, Information Technology Act, 2000, and applicable RBI guidelines.',
  ),
];
