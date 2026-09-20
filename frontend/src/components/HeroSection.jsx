const highlights = ['100% Online', 'Instant Disbursal', 'Flexible Repayments']

function HeroSection() {
  return (
    <section className="border-b border-[var(--line)] bg-[var(--brand-soft)] px-4 py-5 sm:px-6 lg:rounded-xl lg:border lg:px-8 lg:py-7">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
        Personal Loan
      </p>
      <p className="mt-3 text-sm text-slate-600">Get loans up to</p>
      <p className="mt-1 text-4xl font-semibold tracking-tight text-[var(--navy)] lg:text-5xl">
        ₹2,00,000
      </p>
      <p className="mt-2 text-sm text-slate-600 lg:text-base">
        Disbursal to your bank account after successful verification.
      </p>
      <ul className="mt-5 space-y-2.5 border-t border-[var(--line)] pt-4">
        {highlights.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default HeroSection
