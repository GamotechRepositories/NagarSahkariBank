import { BANKING_SERVICES, COMPANY, DEPOSIT_ACCOUNTS, LOAN_PRODUCTS } from '../websiteContent'
import { BankingServiceGrid, CardGrid, ContentSection, CtaBanner, DicgcBanner, PageHero } from '../WebsiteUi'

const ABOUT_SECTIONS = [
  {
    icon: 'building',
    title: 'Who We Are',
    text: 'Nagar Sahkari Bank Ltd. Etawah is a co-operative bank established on 18 October 1997 under section 8 of the Uttar Pradesh Cooperative Act, 1965, and licensed by the Reserve Bank of India under the Banking Regulation Act, 1949.',
  },
  {
    icon: 'users',
    title: 'Our Founder',
    text: 'Founder chairman Shri Dayaram Prajapati (Ex. Cabinet Minister, Uttar Pradesh Government) started banking services so that the poor and backward people of the region could have an easy banking experience.',
  },
  {
    icon: 'map',
    title: 'Our Presence',
    text: 'We serve customers from Raja Ganj-Tehsil Chauraha, Etawah-206001, with branch banking as well as digital channels such as net banking, debit cards, SMS alerts, POS/QR payments, FASTag, and the mobile app.',
  },
  {
    icon: 'shield',
    title: 'Deposit Protection',
    text: 'Deposits with the bank are protected like those of nationalised banks under the Deposit Insurance and Credit Guarantee Corporation (DICGC), Mumbai, sponsored by the Reserve Bank of India.',
  },
  {
    icon: 'netbanking',
    title: 'Technology & Digital Banking',
    text: 'Customers can use net banking, SMS facility, debit cards, RTGS/NEFT, QR-based POS payments, FASTag, and the mobile app for faster, more convenient banking.',
  },
  {
    icon: 'heart',
    title: 'Our Promise',
    text: 'We promise reliable service—from savings and lockers to loans and digital payments—for every customer who banks with us in Etawah.',
  },
]

const WHY_CHOOSE_ABOUT = [
  {
    icon: 'transfer',
    title: 'Complete Branch Banking',
    text: 'RTGS/NEFT, debit cards, lockers, SMS alerts, net banking, POS/QR, and FASTag under one trusted co-operative bank.',
  },
  {
    icon: 'building',
    title: 'Local Presence in Etawah',
    text: `Visit us at ${COMPANY.address} for account services, locker facility, and personal assistance.`,
  },
  {
    icon: 'shield',
    title: 'Secure Digital Channels',
    text: 'Net banking, SMS notifications, and QR payments are designed for convenience with careful attention to safety.',
  },
  {
    icon: 'wallet',
    title: 'Loans & Financial Support',
    text: 'Alongside core banking, we offer personal, business, and MSME financial assistance with a transparent process.',
  },
  {
    icon: 'users',
    title: 'Customer-First Service',
    text: 'Our team provides branch-level support and guidance so every service—from transfers to loan applications—is easy to understand.',
  },
  {
    icon: 'phone',
    title: 'Easy to Reach',
    text: `Call ${COMPANY.phone} or write to ${COMPANY.email} for complaints, queries, and service support.`,
  },
]

function AboutPage({ onApplyNow, onNavigate }) {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A Co-operative Bank Serving Etawah Since 1997"
        description={`${COMPANY.name} was established on ${COMPANY.established} and is licensed by the Reserve Bank of India. We have been working efficiently with loans and funding for 25 years.`}
      />

      <ContentSection>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            <p>
              {COMPANY.cooperativeAct}. {COMPANY.rbiLicense}. We serve customers from our office at {COMPANY.address}.
            </p>
            <p>
              Founder chairman {COMPANY.founder} started the bank to make banking easier for the people of the region.{' '}
              {COMPANY.dicgc}. In FY 2021–22, approximately 30,000 customers deposited money with us.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--line)] bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Branch snapshot</p>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                { label: 'Bank', value: COMPANY.name },
                { label: 'Established', value: COMPANY.established },
                { label: 'Type', value: 'Co-operative Bank (RBI licensed)' },
                { label: 'Founder chairman', value: 'Shri Dayaram Prajapati' },
                { label: 'Address', value: COMPANY.address },
                { label: 'Helpline', value: COMPANY.phone },
                { label: 'Email', value: COMPANY.email },
                { label: 'Hours', value: COMPANY.hours },
              ].map((row) => (
                <div key={row.label} className="border-b border-[var(--line)] pb-3 last:border-0 last:pb-0">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--gold)]">{row.label}</dt>
                  <dd className="mt-1 font-medium text-slate-800">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Learn More About Us" className="bg-white">
        <CardGrid items={ABOUT_SECTIONS} columns={2} />
      </ContentSection>

      <ContentSection title="Our Deposits" subtitle="Saving, current, fixed deposit, and RD accounts" className="bg-white">
        <CardGrid items={DEPOSIT_ACCOUNTS} columns={4} />
      </ContentSection>

      <ContentSection title="Our Loans" subtitle="Disbursed on a priority basis as per RBI standards">
        <CardGrid items={LOAN_PRODUCTS} />
      </ContentSection>

      <ContentSection
        title="Banking Facilities We Offer"
        subtitle="The same core services available on our Services page, designed for everyday banking"
        className="bg-white"
      >
        <BankingServiceGrid items={BANKING_SERVICES} />
      </ContentSection>

      <ContentSection title="Why Choose Nagar Sahkari Bank Ltd. Etawah" className="bg-white">
        <CardGrid items={WHY_CHOOSE_ABOUT} />
      </ContentSection>

      <DicgcBanner />

      <CtaBanner
        title="Let's Build a Better Financial Future Together"
        subtitle={`${COMPANY.name} is here for branch banking, digital payments, and responsible financial support. Visit us in Etawah or get in touch with our team.`}
        onApply={onApplyNow}
        onContact={() => onNavigate('contact')}
      />
    </>
  )
}

export default AboutPage
