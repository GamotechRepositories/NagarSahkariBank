const highlights = ['100% Online', 'Instant Disbursal', 'Flexible Repayments']

function HeroSection() {
  return (
    <section className="brand-hero-bg px-4 pb-5 pt-3 text-white lg:rounded-[1.25rem] lg:px-8 lg:pb-8 lg:pt-4">
      <div className="mb-4 lg:mb-6">
        <p className="mb-1 text-lg font-semibold lg:text-xl">Get Loans up to</p>
        <p className="text-4xl font-extrabold tracking-tight lg:text-5xl">₹2,00,000</p>
        <p className="mt-2 text-base lg:text-lg">Get cash in your account in just 5 minutes.</p>
      </div>

      {/* Mobile: compact accent list */}
      <ul className="space-y-2 border-y border-[var(--gold)]/35 py-3 lg:hidden">
        {highlights.map((item) => (
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

      {/* Desktop: chips */}
      <div className="hidden grid-cols-3 gap-4 lg:grid">
        {highlights.map((item) => (
          <div
            key={item}
            className="brand-chip rounded-2xl px-4 py-4 text-center text-base font-medium"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}

export default HeroSection
