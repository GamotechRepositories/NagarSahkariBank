import { useState } from 'react'
import { COMPANY } from '../websiteContent'
import { Icon } from '../Icons'
import { ContentSection, FaqList, PageHero } from '../WebsiteUi'

import { API_BASE } from '../../config/api'

const EMPTY_FORM = {
  fullName: '',
  mobile: '',
  email: '',
  city: '',
  subject: '',
  message: '',
}

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
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(field) {
    return (event) => {
      const value =
        field === 'mobile' ? event.target.value.replace(/\D/g, '').slice(0, 10) : event.target.value
      setForm((prev) => ({ ...prev, [field]: value }))
      setError('')
      setSubmitted(false)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (loading) return

    setLoading(true)
    setError('')
    setSubmitted(false)

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          mobile: form.mobile,
          email: form.email.trim(),
          city: form.city.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      })
      const data = await response.json()

      if (response.ok && data.success) {
        setForm(EMPTY_FORM)
        setSubmitted(true)
      } else {
        setError(data.message || 'Could not send your message. Please try again.')
      }
    } catch {
      setError('Could not reach the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We're Here to Help You"
        description="Call our helpline, visit the branch at Raja Ganj-Tehsil Chauraha, Etawah, or write to us. We are here for deposits, loans, and everyday banking queries."
      />

      <ContentSection>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <ContactCard icon="phone" title="Helpline">
              {COMPANY.phone}
            </ContactCard>
            <ContactCard icon="mail" title="Email">
              {COMPANY.email}
            </ContactCard>
            <ContactCard icon="building" title="Branch Address">
              {COMPANY.address}
            </ContactCard>
            <ContactCard icon="clock" title="Business Hours">
              <p>{COMPANY.hours}</p>
              <p className="mt-1">Sunday: Closed</p>
            </ContactCard>
            <ContactCard icon="netbanking" title="Website">
              <a href={COMPANY.website} target="_blank" rel="noreferrer" className="text-[var(--brand)] hover:underline">
                {COMPANY.website}
              </a>
            </ContactCard>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-2xl font-semibold text-slate-900">Send Us a Message</h2>
            {submitted && (
              <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                Thank you for contacting us. Our team will respond within 24–48 business hours.
              </p>
            )}
            {error && (
              <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
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
              disabled={loading}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--brand-deep)] disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading ? 'Sending...' : 'Send Message'}
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
              a: `Call our helpline at ${COMPANY.phone} or email ${COMPANY.email}. You can also submit the inquiry form on this page.`,
            },
            {
              q: 'Can I visit the branch directly?',
              a: `Yes. Visit us at ${COMPANY.address} during business hours: ${COMPANY.hours}. Sunday is closed.`,
            },
            {
              q: 'Are deposits insured?',
              a: 'Yes. The bank is registered with DICGC, Mumbai (sponsored by the Reserve Bank of India). Details are available at www.dicgc.org.in.',
            },
          ]}
        />
      </ContentSection>
    </>
  )
}

export default ContactPage
