import { useState } from 'react'
import { COMPANY } from '../websiteContent'
import { Icon } from '../Icons'
import { ContentSection, FaqList, PageHero } from '../WebsiteUi'

function ContactCard({ icon, title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-soft)] text-[var(--brand)]">
          <Icon name={icon} className="h-5 w-5" />
        </span>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-slate-600">{children}</div>
    </div>
  )
}

function ContactPage() {
  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    city: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We're Here to Help You"
        description="At Nagar Sahkari Bank Ltd. Etawah, we value every inquiry and are committed to providing prompt, professional, and reliable assistance. Whether you have questions about our financial services or need guidance with the application process, our dedicated team is here to support you."
      />

      <ContentSection>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <ContactCard icon="phone" title="Phone">
              {COMPANY.phone}
            </ContactCard>
            <ContactCard icon="mail" title="Email">
              {COMPANY.email}
            </ContactCard>
            <ContactCard icon="building" title="Corporate Office">
              {COMPANY.address}
            </ContactCard>
            <ContactCard icon="clock" title="Business Hours">
              <p>{COMPANY.hours}</p>
              <p className="mt-1">Sunday: Closed</p>
            </ContactCard>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-2xl font-semibold text-slate-900">Send Us a Message</h2>
            {submitted && (
              <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                Thank you for contacting us. Our team will respond within 24–48 business hours.
              </p>
            )}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ['fullName', 'Full Name', 'text'],
                ['mobile', 'Mobile Number', 'tel'],
                ['email', 'Email Address', 'email'],
                ['city', 'City', 'text'],
                ['subject', 'Subject', 'text'],
              ].map(([field, label, type]) => (
                <label key={field} className={field === 'subject' ? 'sm:col-span-2' : ''}>
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
                  <input
                    type={type}
                    value={form[field]}
                    onChange={handleChange(field)}
                    required={field !== 'city'}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[var(--brand)]"
                  />
                </label>
              ))}
              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Message</span>
                <textarea
                  value={form.message}
                  onChange={handleChange('message')}
                  rows={5}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[var(--brand)]"
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--brand-deep)]"
            >
              Send Message
              <Icon name="arrow" className="h-4 w-4" />
            </button>
          </form>
        </div>
      </ContentSection>

      <ContentSection title="Frequently Asked Contact Questions" className="bg-white">
        <FaqList
          items={[
            {
              q: 'How can I reach customer support?',
              a: 'You can contact us by phone, email, or by submitting the inquiry form available on this page.',
            },
            {
              q: 'Can I visit the office directly?',
              a: 'Yes, you are welcome to visit our office during business hours. Scheduling an appointment in advance is recommended for faster assistance.',
            },
            {
              q: 'How quickly will I receive a response?',
              a: 'Our team aims to respond to all inquiries within 24–48 business hours.',
            },
          ]}
        />
      </ContentSection>
    </>
  )
}

export default ContactPage
