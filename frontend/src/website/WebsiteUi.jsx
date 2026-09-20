import { Icon, Stars } from './Icons'

export function PageHero({ eyebrow, title, description, children }) {
  return (
    <section className="border-b border-[var(--line)] bg-[var(--navy)] px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
            {eyebrow}
          </p>
        )}
        <span className="mt-3 block h-0.5 w-12 bg-[var(--gold)]" aria-hidden="true" />
        <h1 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base">{description}</p>
        )}
        {children}
      </div>
    </section>
  )
}

export function ContentSection({ title, subtitle, children, className = '' }) {
  return (
    <section className={`px-4 py-14 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-6xl">
        {title && (
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold text-black sm:text-4xl">{title}</h2>
            {subtitle && <p className="mt-3 text-base text-slate-600">{subtitle}</p>}
          </div>
        )}
        <div className={title ? 'mt-8' : ''}>{children}</div>
      </div>
    </section>
  )
}

export function CardGrid({ items, columns = 3 }) {
  const gridClass =
    columns === 2
      ? 'grid gap-5 sm:grid-cols-2'
      : columns === 4
        ? 'grid gap-5 sm:grid-cols-2 xl:grid-cols-4'
        : 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div className={gridClass}>
      {items.map((item) => (
        <article
          key={item.title}
          className="group rounded-xl border border-[var(--line)] bg-white p-6 shadow-sm transition hover:border-[var(--brand)]/30 hover:shadow-md"
        >
          {item.icon && (
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-soft)] text-[var(--brand)]">
              <Icon name={item.icon} className="h-5 w-5" />
            </div>
          )}
          <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
          {item.items && (
            <ul className="mt-4 space-y-2">
              {item.items.map((entry) => (
                <li key={entry} className="flex items-start gap-2 text-sm text-slate-600">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" />
                  <span>{entry}</span>
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  )
}

export function BankingServiceGrid({ items }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.title}
          className="flex gap-4 rounded-xl border border-[var(--line)] bg-white p-5 shadow-sm transition hover:border-[var(--brand)]/30"
        >
          <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-soft)] text-[var(--brand)]">
            <Icon name={item.icon} className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.text}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

export function ProcessGrid({ steps }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {steps.map((step, index) => (
        <article
          key={step.title}
          className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="absolute -right-3 -top-3 text-6xl font-bold text-slate-100">{index + 1}</div>
          <p className="relative text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand)]">
            {step.step}
          </p>
          <h3 className="relative mt-3 text-lg font-semibold text-slate-900">{step.title}</h3>
          <p className="relative mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
        </article>
      ))}
    </div>
  )
}

export function FaqList({ items }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.q}
          className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm open:border-sky-200"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-semibold text-slate-900 marker:content-none">
            <span>{item.q}</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-open:rotate-45 group-open:bg-[var(--brand-soft)] group-open:text-[var(--brand)]">
              +
            </span>
          </summary>
          <p className="border-t border-slate-100 px-5 py-4 text-sm leading-relaxed text-slate-600">{item.a}</p>
        </details>
      ))}
    </div>
  )
}

function TestimonialCard({ item }) {
  return (
    <blockquote className="w-[320px] shrink-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(16,35,58,0.06)] sm:w-[360px]">
      <Stars />
      <p className="mt-4 text-sm leading-relaxed text-slate-600">"{item.quote}"</p>
      <footer className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-soft)] text-sm font-bold text-[var(--brand)]">
          {item.name
            .split(' ')
            .slice(0, 2)
            .map((part) => part[0])
            .join('')}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{item.name}</p>
          <p className="text-xs text-slate-500">{item.role}</p>
        </div>
      </footer>
    </blockquote>
  )
}

export function TestimonialMarquee({ items, fadeFrom = 'surface' }) {
  const loopItems = [...items, ...items]
  const fadeColor = fadeFrom === 'white' ? '#ffffff' : 'var(--surface-muted)'

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-20"
        style={{ background: `linear-gradient(to right, ${fadeColor}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-20"
        style={{ background: `linear-gradient(to left, ${fadeColor}, transparent)` }}
      />
      <div className="marquee-track gap-5 py-2">
        {loopItems.map((item, index) => (
          <TestimonialCard key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
    </div>
  )
}

export function BulletGrid({ items }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item}
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand-soft)] text-[var(--brand)]">
            <Icon name="check" className="h-4 w-4" />
          </span>
          {item}
        </div>
      ))}
    </div>
  )
}

export function NoticeBoard({ announcements, forms }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-[var(--line)] bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Latest Announcements</h3>
        <ol className="mt-4 space-y-2">
          {announcements.map((item, index) => (
            <li key={item.title}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[var(--brand)] underline-offset-2 hover:underline"
              >
                {index + 1}) {item.title} — Download
              </a>
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-xl border border-[var(--line)] bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Forms & Interest Rates</h3>
        <ol className="mt-4 space-y-2">
          {forms.map((item, index) => (
            <li key={item.title}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[var(--brand)] underline-offset-2 hover:underline"
              >
                {index + 1}) {item.title} — Download
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export function DicgcBanner() {
  return (
    <section className="border-y border-[var(--line)] bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-slate-800">
          Nagar Sahkari Bank Ltd. is registered with DICGC
        </p>
        <a
          href="https://www.dicgc.org.in"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-[var(--brand)] underline-offset-2 hover:underline"
        >
          www.dicgc.org.in
        </a>
      </div>
    </section>
  )
}

export function CtaBanner({ title, subtitle, onApply, onContact }) {
  return (
    <section className="brand-hero-bg px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/95 sm:text-base">{subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onApply}
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[var(--navy)] hover:bg-[var(--brand-soft)]"
          >
            Apply Now
            <Icon name="arrow" className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onContact}
            className="rounded-2xl border-2 border-white px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Contact Us Today
          </button>
        </div>
      </div>
    </section>
  )
}
