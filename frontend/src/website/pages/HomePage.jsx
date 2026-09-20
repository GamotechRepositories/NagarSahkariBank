import {
  BANKING_SERVICES,
  COMPANY,
  CORE_VALUES,
  DEPOSIT_ACCOUNTS,
  DIFFERENTIATORS,
  HOME_FAQ,
  HOME_HERO,
  LOAN_PRODUCTS,
  NOTICE_BOARD,
  PROCESS_STEPS,
  SERVICES,
  TESTIMONIALS,
  WHY_CHOOSE,
} from '../websiteContent'
import { Icon } from '../Icons'
import {
  BankingServiceGrid,
  BulletGrid,
  CardGrid,
  ContentSection,
  CtaBanner,
  DicgcBanner,
  FaqList,
  NoticeBoard,
  ProcessGrid,
  TestimonialMarquee,
} from '../WebsiteUi'

function HomePage({ onApplyNow, onNavigate }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--line)] bg-white">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block">
          <img
            src="/Future-of-Digital-Banking-in-India.jpg"
            alt="Bank branch"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">
              Personal Loan
            </p>
            <span className="mt-3 block h-0.5 w-12 bg-[var(--gold)]" aria-hidden="true" />
            <h1 className="mt-5 max-w-xl text-3xl font-semibold leading-tight text-[var(--navy)] sm:text-4xl lg:text-[2.75rem]">
              {HOME_HERO.title}
            </h1>
            <p className="mt-4 max-w-xl text-base font-medium text-slate-700">
              {HOME_HERO.subtitle}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              {HOME_HERO.note}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onApplyNow}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-deep)]"
              >
                Apply Now
                <Icon name="arrow" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="rounded-lg border border-[var(--navy)] px-6 py-3 text-sm font-semibold text-[var(--navy)] transition hover:bg-[var(--brand-soft)]"
              >
                Know More
              </button>
            </div>
          </div>

          <div className="relative z-10">
            <div className="relative overflow-hidden rounded-xl p-5 sm:p-6 lg:bg-transparent lg:p-2">
              <div className="absolute inset-0 lg:hidden">
                <img
                  src="/Future-of-Digital-Banking-in-India.jpg"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="relative rounded-xl bg-white/95 p-6 text-[var(--ink)] shadow-xl backdrop-blur-sm lg:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
                  Loan facility
                </p>
                <p className="mt-3 text-sm text-slate-600">Get loans up to</p>
                <p className="mt-1 text-4xl font-semibold tracking-tight text-[var(--navy)] sm:text-5xl">
                  ₹2,00,000
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Disbursal to your bank account after successful verification.
                </p>
                <ul className="mt-6 space-y-3 border-t border-[var(--line)] pt-5">
                  {HOME_HERO.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-slate-700">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-soft)] text-[var(--brand)]">
                        <Icon name="check" className="h-3.5 w-3.5" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContentSection
        title="About Nagar Sahkari Bank Ltd."
        subtitle="We have been working very efficiently with loan and funding for 25 years."
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            <p>
              Nagar Sahkari Bank Ltd. Etawah was established on {COMPANY.established} under section 8 of the Uttar
              Pradesh Cooperative Act, 1965. The Reserve Bank of India issued a licence to the bank under subsection
              22(1), section 56(O) of the Banking Regulation Act, 1949.
            </p>
            <p>
              Founder chairman {COMPANY.founder} started banking services to facilitate an easy banking experience for
              the poor and backward people of the region. In FY 2021–22, approximately 30,000 customers deposited money
              with us. Deposits are protected like those of nationalised banks under DICGC, Mumbai, sponsored by the
              Reserve Bank of India.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                { label: 'Established', value: COMPANY.established },
                { label: 'Licence', value: 'RBI licensed' },
                { label: 'Deposit cover', value: 'DICGC registered' },
                { label: 'Branch', value: 'Etawah-206001' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-[var(--brand-soft)] px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--gold)]">{stat.label}</p>
                  <p className="mt-1 text-sm font-semibold text-black">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection
        title="Why Choose Nagar Sahkari Bank Ltd. Etawah"
        subtitle="Trusted Financial Solutions Designed Around You"
        className="bg-white"
      >
        <CardGrid items={WHY_CHOOSE} />
      </ContentSection>

      <ContentSection
        title="Our Deposits"
        subtitle="In FY 2021–22, about 30,000 customers deposited money with our bank. Funds are protected under DICGC, Mumbai."
      >
        <CardGrid items={DEPOSIT_ACCOUNTS} columns={4} />
      </ContentSection>

      <ContentSection
        title="Banking Services"
        subtitle="Everyday banking facilities for our customers"
      >
        <BankingServiceGrid items={BANKING_SERVICES} />
      </ContentSection>

      <ContentSection
        title="Our Loans"
        subtitle="Loans are disbursed on a priority basis as per Reserve Bank of India standards. We also lend against insurance policies, Kisan Vikas Patra, NSC, and fixed deposits."
        className="bg-white"
      >
        <CardGrid items={LOAN_PRODUCTS} />
      </ContentSection>

      <ContentSection title="Loan & Financial Support" subtitle="Apply online with a simple, transparent process">
        <CardGrid items={SERVICES} />
      </ContentSection>

      <ContentSection title="Our Process" subtitle="Four Simple Steps" className="bg-white">
        <ProcessGrid steps={PROCESS_STEPS} />
      </ContentSection>

      <ContentSection>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-7">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-soft)] text-[var(--brand)]">
              <Icon name="spark" className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Our Vision</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              To remain a trusted co-operative bank in Etawah, offering easy, efficient banking and responsible lending
              for individuals, families, and local businesses.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-7">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-soft)] text-[var(--brand)]">
              <Icon name="heart" className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              To facilitate easy banking for the people of the region through deposits, loans, digital services, and
              transparent customer support, as intended by our founder.
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Our Core Values" className="bg-white">
        <CardGrid
          items={CORE_VALUES.map((value) => ({
            ...value,
            icon: 'check',
          }))}
        />
      </ContentSection>

      <ContentSection title="What Makes Us Different">
        <BulletGrid items={DIFFERENTIATORS} />
      </ContentSection>

      <section className="overflow-hidden bg-white py-14">
        <div className="mx-auto mb-8 max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-black sm:text-4xl">
            Customer Testimonials
          </h2>
          <p className="mt-3 text-base text-slate-600">What Our Customers Say</p>
        </div>
        <TestimonialMarquee items={TESTIMONIALS} fadeFrom="white" />
      </section>

      <ContentSection
        title="Our Notice Board"
        subtitle="Latest announcements, interest rates, and downloadable forms from Nagar Sahkari Bank Ltd. Etawah"
        className="bg-white"
      >
        <NoticeBoard announcements={NOTICE_BOARD.announcements} forms={NOTICE_BOARD.forms} />
      </ContentSection>

      <ContentSection title="Frequently Asked Questions">
        <FaqList items={HOME_FAQ} />
      </ContentSection>

      <DicgcBanner />

      <CtaBanner
        title="Apply for a loan with Nagar Sahkari Bank Ltd. Etawah"
        subtitle="Start your digital loan application, or visit us at Raja Ganj-Tehsil Chauraha, Etawah for deposits, lockers, and other banking services."
        onApply={onApplyNow}
        onContact={() => onNavigate('contact')}
      />
    </>
  )
}

export default HomePage
