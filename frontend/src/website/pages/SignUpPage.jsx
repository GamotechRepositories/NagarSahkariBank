import { useState } from 'react'
import { COMPANY } from '../websiteContent'
import { ContentSection, PageHero } from '../WebsiteUi'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

function SignUpPage({ onRegistered, onSignIn }) {
  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const cleanedMobile = form.mobile.replace(/\D/g, '').slice(0, 10)
  const canSubmit =
    form.fullName.trim().length >= 2 &&
    cleanedMobile.length === 10 &&
    form.email.includes('@') &&
    form.password.length >= 6 &&
    form.password === form.confirmPassword

  function handleChange(field) {
    return (event) => {
      const value = field === 'mobile' ? event.target.value.replace(/\D/g, '').slice(0, 10) : event.target.value
      setForm((prev) => ({ ...prev, [field]: value }))
      setError('')
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (!canSubmit || loading) return

    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_BASE}/api/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          mobile: cleanedMobile,
          email: form.email.trim(),
          password: form.password,
        }),
      })
      const data = await response.json()
      if (response.ok && data.success && data.data?.token) {
        onRegistered({ token: data.data.token, user: data.data.user })
      } else {
        setError(data.message || 'Could not create your account. Please try again.')
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
        eyebrow="Create Account"
        title="Sign Up"
        description={`Create your ${COMPANY.name} account to apply for a loan, track your application, and manage your profile.`}
      />

      <ContentSection>
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <img
            src={COMPANY.logo}
            alt={COMPANY.name}
            className="mb-4 h-12 w-auto max-w-[16rem] object-contain object-left"
          />
          <h2 className="text-2xl font-bold text-slate-900">Create your account</h2>
          <p className="mt-1 text-sm text-slate-500">
            Enter your details below. You can sign in later with your mobile number and password.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Full name</span>
              <input
                type="text"
                value={form.fullName}
                onChange={handleChange('fullName')}
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm text-slate-900 outline-none focus:border-[var(--brand)]"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Mobile number</span>
              <div className="flex overflow-hidden rounded-xl border border-slate-300 focus-within:border-[var(--brand)]">
                <span className="flex items-center bg-slate-50 px-3 text-sm font-medium text-slate-600">
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={cleanedMobile}
                  onChange={handleChange('mobile')}
                  placeholder="10-digit mobile number"
                  autoComplete="tel"
                  required
                  className="w-full px-3 py-3 text-sm text-slate-900 outline-none"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Email address</span>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm text-slate-900 outline-none focus:border-[var(--brand)]"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Password</span>
              <div className="flex overflow-hidden rounded-xl border border-slate-300 focus-within:border-[var(--brand)]">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange('password')}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  className="w-full px-3 py-3 text-sm text-slate-900 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="px-3 text-sm font-medium text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Confirm password</span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={handleChange('confirmPassword')}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                required
                minLength={6}
                className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm text-slate-900 outline-none focus:border-[var(--brand)]"
              />
            </label>

            {error ? <p className="text-sm text-red-500">{error}</p> : null}

            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="w-full rounded-2xl bg-[var(--brand)] py-3.5 text-base font-semibold text-white hover:bg-[var(--brand-deep)] disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSignIn}
              className="font-semibold text-[var(--brand)] hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </ContentSection>
    </>
  )
}

export default SignUpPage
