import {
  CORE_VALUES,
  DIFFERENTIATORS,
  HOME_FAQ,
  HOME_HERO,
  PROCESS_STEPS,
  SERVICES,
  TESTIMONIALS,
  WHY_CHOOSE,
} from '../websiteContent'
import { Icon } from '../Icons'
import {
  BulletGrid,
  CardGrid,
  ContentSection,
  CtaBanner,
  FaqList,
  ProcessGrid,
  TestimonialMarquee,
} from '../WebsiteUi'

function HomePage({ onApplyNow, onNavigate }) {
  return (
    <>
      <section className="brand-hero-bg relative overflow-hidden text-white">
        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <h1 className="animate-fade-up max-w-2xl text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
                {HOME_HERO.title}
              </h1>
              <p className="animate-fade-up-delay mt-5 max-w-xl text-base font-medium text-white sm:text-lg">
                {HOME_HERO.subtitle}
              </p>
              <p className="animate-fade-up-delay mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
                {HOME_HERO.note}
              </p>

              <div className="animate-fade-up-delay mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onApplyNow}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[var(--gold)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#9a7234]"
                >
                  Apply Now
                  <Icon name="arrow" className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="rounded-2xl border-2 border-white px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Know More
                </button>
              </div>
            </div>

            <div className="animate-fade-up-delay relative mx-auto hidden max-w-md lg:block">
              <div
                className="pointer-events-none absolute left-1/2 top-8 h-56 w-56 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(181,135,62,0.35)_0%,transparent_70%)]"
                aria-hidden="true"
              />
              <img
                src="/girlsImage.png"
                alt="Loan approved on mobile"
                className="hero-girl-image relative z-20 mx-auto -mb-16 block h-auto w-[92%] object-contain object-bottom"
              />
              <div className="relative z-10 overflow-hidden rounded-[1.5rem] brand-chip px-6 pb-6 pt-20">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[rgba(11,37,74,0.35)] to-transparent"
                  aria-hidden="true"
                />
                <p className="relative text-sm font-semibold">Get Loans up to</p>
                <p className="relative mt-1 text-4xl font-extrabold tracking-tight">₹2,00,000</p>
                <p className="relative mt-2 text-sm text-white/95">
                  Get cash in your account in just 5 minutes.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile: compact accent list */}
          <ul className="animate-fade-up-delay mt-6 space-y-2 border-y border-[var(--gold)]/35 py-3 sm:hidden">
            {HOME_HERO.highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-[13px] font-medium leading-none text-white"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>

          {/* Desktop / tablet: feature chips */}
          <div className="animate-fade-up-delay mt-10 hidden gap-3 sm:grid sm:grid-cols-3">
            {HOME_HERO.highlights.map((item) => (
              <div
                key={item}
                className="brand-chip flex items-center justify-center gap-2 rounded-2xl px-4 py-4 text-center text-sm font-semibold"
              >
                <Icon name="check" className="h-4 w-4 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContentSection
        title="About Nagar Sahkari Bank Ltd. Etawah"
        subtitle="Building Financial Independence for Every Individual"
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            <p>
              Nagar Sahkari Bank Ltd. Etawah is a professionally managed co-operative bank dedicated to promoting
              financial inclusion and socio-economic development. Our objective is to empower individuals and small
              entrepreneurs by providing responsible financial services that improve livelihoods and encourage
              self-reliance.
            </p>
            <p>
              Guided by our commitment to integrity, transparency, and customer satisfaction, we strive to bridge the
              gap between underserved communities and accessible financial services. As a co-operative bank, our focus
              remains on creating sustainable economic opportunities while supporting socially and economically
              marginalized communities, especially women and families in rural and semi-urban areas.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                { label: 'Location', value: 'Etawah' },
                { label: 'Organization Type', value: 'Co-operative Bank' },
                { label: 'Focus', value: 'Financial Inclusion' },
                { label: 'Approach', value: 'Transparent & Digital' },
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

      <ContentSection title="Our Services" subtitle="Financial Solutions That Empower Growth">
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
              To become one of India's most trusted organizations in financial inclusion by empowering individuals,
              encouraging entrepreneurship, and contributing to sustainable economic development.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-7">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-soft)] text-[var(--brand)]">
              <Icon name="heart" className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              To provide transparent, accessible, and responsible financial solutions that improve lives, promote
              self-reliance, and strengthen communities through ethical business practices and customer-focused services.
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

      <ContentSection title="Frequently Asked Questions" className="bg-white">
        <FaqList items={HOME_FAQ} />
      </ContentSection>

      <CtaBanner
        title="Your Financial Growth Begins Here"
        subtitle="Whether you're planning your future, expanding your business, or seeking reliable financial support, Nagar Sahkari Bank Ltd. Etawah is committed to helping you achieve your goals through responsible financial inclusion."
        onApply={onApplyNow}
        onContact={() => onNavigate('contact')}
      />
    </>
  )
}

export default HomePage
