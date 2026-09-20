import { BANKING_SERVICES, DEPOSIT_ACCOUNTS, LOAN_PRODUCTS, NOTICE_BOARD, PROCESS_STEPS, SERVICES } from '../websiteContent'
import { BankingServiceGrid, CardGrid, ContentSection, CtaBanner, DicgcBanner, NoticeBoard, PageHero, ProcessGrid } from '../WebsiteUi'

const DETAILED_SERVICES = [
  {
    title: 'Personal Financial Assistance',
    text: 'Financial requirements can arise at any stage of life. Nagar Sahkari Bank Ltd. Etawah provides responsible financial assistance to help individuals manage important personal needs with confidence and peace of mind.',
    items: ['Simple eligibility process', 'Minimal documentation', 'Quick application processing', 'Transparent communication'],
  },
  {
    title: 'Microfinance Solutions',
    text: 'Microfinance plays a vital role in improving livelihoods and encouraging self-reliance. We extend financial opportunities to individuals who may have limited access to traditional financial services.',
    items: ['Financial accessibility', 'Community development', 'Economic empowerment', 'Responsible lending practices'],
  },
  {
    title: 'Business Financial Support',
    text: 'Small businesses are the backbone of India\'s economy. We provide financial solutions that help entrepreneurs strengthen their businesses, improve operations, and pursue sustainable growth.',
    items: ['Small business owners', 'Entrepreneurs', 'Self-employed professionals', 'Retail businesses'],
  },
  {
    title: 'MSME Financial Solutions',
    text: 'Our financial solutions are designed to support business expansion, improve operational efficiency, and encourage long-term sustainability for growing enterprises.',
    items: ['Business development support', 'Growth-oriented assistance', 'Simplified procedures', 'Professional guidance'],
  },
  {
    title: 'Women Empowerment Initiatives',
    text: 'We encourage women to pursue entrepreneurship by improving access to responsible financial services and promoting financial independence.',
    items: ['Women-owned businesses', 'Self-employment', 'Financial independence', 'Entrepreneurial development'],
  },
  {
    title: 'Digital Financial Services',
    text: 'Our digital-first approach simplifies applications, document verification, communication, and customer support while maintaining the highest standards of security.',
    items: ['Online application', 'Secure verification', 'Digital documentation', 'Faster processing'],
  },
]

function ServicesPage({ onApplyNow, onNavigate }) {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Deposits, Loans and Everyday Banking"
        description="Nagar Sahkari Bank Ltd. Etawah offers deposit accounts, loans as per RBI priority norms, and core banking services including RTGS/NEFT, SMS, lockers, debit cards, net banking, POS (QR), FASTag, and mobile banking."
      />

      <ContentSection
        title="Banking Services"
        subtitle="Core facilities available to account holders"
      >
        <BankingServiceGrid items={BANKING_SERVICES} />
      </ContentSection>

      <ContentSection title="Our Deposits" subtitle="Saving, current, fixed deposit, and RD accounts" className="bg-white">
        <CardGrid items={DEPOSIT_ACCOUNTS} columns={4} />
      </ContentSection>

      <ContentSection
        title="Our Loans"
        subtitle="Disbursed on a priority basis as per Reserve Bank of India standards. We also lend against insurance policies, KVP, NSC, and fixed deposits."
      >
        <CardGrid items={LOAN_PRODUCTS} />
      </ContentSection>

      <ContentSection title="Loan & Financial Support" className="bg-white">
        <CardGrid items={SERVICES} />
      </ContentSection>

      <ContentSection title="Detailed Service Offerings">
        <CardGrid items={DETAILED_SERVICES} columns={2} />
      </ContentSection>

      <ContentSection title="Our Service Process">
        <ProcessGrid steps={PROCESS_STEPS} />
      </ContentSection>

      <ContentSection title="Customer Support Services" className="bg-white">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm leading-relaxed text-slate-600">
            Our commitment doesn't end after an application is submitted. Our experienced support team is always
            available to answer questions, provide guidance, and ensure a smooth customer experience through
            professional guidance, prompt assistance, and transparent communication.
          </p>
        </div>
      </ContentSection>

      <ContentSection
        title="Our Notice Board"
        subtitle="Download announcements, interest rates, and forms directly from Nagar Sahkari Bank Ltd. Etawah."
      >
        <NoticeBoard announcements={NOTICE_BOARD.announcements} forms={NOTICE_BOARD.forms} />
      </ContentSection>

      <DicgcBanner />

      <CtaBanner
        title="Let's Build a Better Financial Future Together"
        subtitle="Whether you're seeking personal financial support, planning to grow your business, or looking for a trusted organization that values transparency and integrity, Nagar Sahkari Bank Ltd. Etawah is here to help."
        onApply={onApplyNow}
        onContact={() => onNavigate('contact')}
      />
    </>
  )
}

export default ServicesPage
