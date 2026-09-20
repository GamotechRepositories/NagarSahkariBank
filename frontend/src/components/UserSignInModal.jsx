import { useRef, useState } from 'react'
import { isOtpVerifyAccepted, otpFailureMessage } from '../utils/otpValidation'
import { COMPANY } from '../website/websiteContent'
import OtpInputBlock from './OtpInputBlock'
import { API_BASE } from '../config/api'

function UserSignInModal({ onClose, onSignedIn, onSignUp }) {
  const [mode, setMode] = useState('password') // 'password' | 'otp'
  const [otpStep, setOtpStep] = useState('mobile') // 'mobile' | 'otp'
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [otpComplete, setOtpComplete] = useState(false)
  const [otpResetKey, setOtpResetKey] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const otpRef = useRef(null)

  const cleanedMobile = mobile.replace(/\D/g, '').slice(0, 10)
  const isMobileValid = cleanedMobile.length === 10
  const canSubmitPassword = isMobileValid && password.length >= 6

  function switchMode(nextMode) {
    setMode(nextMode)
    setError('')
    setOtpStep('mobile')
    setOtpResetKey((k) => k + 1)
    setPassword('')
  }

  async function loginWithPassword(event) {
    event.preventDefault()
    if (!canSubmitPassword || loading) return
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_BASE}/api/user/login/password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: cleanedMobile, password }),
      })
      const contentType = response.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        setError(
          response.status === 404
            ? 'Password sign-in is not available on the server yet. Deploy the latest backend, or sign in with OTP.'
            : 'Could not reach the login service. Please try again.',
        )
        return
      }
      const data = await response.json()
      if (response.ok && data.success && data.data?.token) {
        onSignedIn({ token: data.data.token, user: data.data.user })
      } else {
        setError(data.message || 'Invalid mobile number or password.')
      }
    } catch {
      setError('Could not reach the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function sendOtp() {
    if (!isMobileValid || loading) return false
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_BASE}/api/user/login/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: cleanedMobile }),
      })
      const data = await response.json()
      if (response.ok && data.success) {
        setOtpStep('otp')
        setOtpResetKey((k) => k + 1)
        return true
      }
      setError(data.message || 'Failed to send OTP.')
      return false
    } catch {
      setError('Could not reach the server. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }

  async function verifyOtp() {
    await verifyOtpWith(otpRef.current?.getOtp?.() || '')
  }

  async function verifyOtpWith(otp) {
    const cleaned = String(otp || '').replace(/\D/g, '')
    if (cleaned.length !== 6 || loading) return
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_BASE}/api/user/login/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: cleanedMobile, otp: cleaned }),
      })
      const data = await response.json()
      if (response.ok && isOtpVerifyAccepted(data) && data.data?.token) {
        onSignedIn({ token: data.data.token, user: data.data.user })
      } else {
        setError(otpFailureMessage(data))
        setOtpResetKey((k) => k + 1)
      }
    } catch {
      setError('Could not reach the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const subtitle =
    mode === 'password'
      ? 'Sign in with your registered mobile number and password.'
      : otpStep === 'mobile'
        ? 'Enter the mobile number used for your loan application.'
        : `Enter the 6-digit OTP sent to +91 ${cleanedMobile}`

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose} />
      <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white px-6 pb-10 pt-6 shadow-2xl sm:inset-y-auto sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-3xl">
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-slate-200 sm:hidden" />

        <div className="mb-1 flex items-start justify-between gap-3">
          <div>
            <img
              src={COMPANY.logo}
              alt={COMPANY.name}
              className="mb-3 h-10 w-auto max-w-[15rem] object-contain object-left"
            />
            <h2 className="text-2xl font-bold text-slate-900">Sign In</h2>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-600 hover:bg-slate-200"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
          <button
            type="button"
            className="rounded-xl bg-white py-2.5 text-sm font-semibold text-slate-900 shadow-sm"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={onSignUp}
            className="rounded-xl py-2.5 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-700"
          >
            Sign Up
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => switchMode('password')}
            className={`rounded-xl py-2.5 text-sm font-semibold transition-colors ${
              mode === 'password'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Phone & Password
          </button>
          <button
            type="button"
            onClick={() => switchMode('otp')}
            className={`rounded-xl py-2.5 text-sm font-semibold transition-colors ${
              mode === 'otp'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            OTP
          </button>
        </div>

        {mode === 'password' ? (
          <form className="mt-6" onSubmit={loginWithPassword}>
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
                  onChange={(e) => {
                    setMobile(e.target.value)
                    setError('')
                  }}
                  placeholder="10-digit mobile number"
                  className="w-full px-3 py-3 text-sm text-slate-900 outline-none"
                  autoComplete="tel"
                  required
                />
              </div>
            </label>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Password</span>
              <div className="flex overflow-hidden rounded-xl border border-slate-300 focus-within:border-[var(--brand)]">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  placeholder="Enter your password"
                  className="w-full px-3 py-3 text-sm text-slate-900 outline-none"
                  autoComplete="current-password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="px-3 text-sm font-medium text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>

            {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}

            <button
              type="submit"
              disabled={!canSubmitPassword || loading}
              className="mt-6 w-full rounded-2xl bg-[var(--brand)] py-3.5 text-base font-semibold text-white hover:bg-[var(--brand-deep)] disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        ) : otpStep === 'mobile' ? (
          <form
            className="mt-6"
            onSubmit={(event) => {
              event.preventDefault()
              sendOtp()
            }}
          >
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
                  onChange={(e) => {
                    setMobile(e.target.value)
                    setError('')
                  }}
                  placeholder="10-digit mobile number"
                  className="w-full px-3 py-3 text-sm text-slate-900 outline-none"
                  autoComplete="tel"
                  required
                />
              </div>
            </label>

            {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}

            <button
              type="submit"
              disabled={!isMobileValid || loading}
              className="mt-6 w-full rounded-2xl bg-[var(--brand)] py-3.5 text-base font-semibold text-white hover:bg-[var(--brand-deep)] disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <div className="mt-6">
            <button
              type="button"
              onClick={() => {
                setOtpStep('mobile')
                setError('')
                setOtpResetKey((k) => k + 1)
              }}
              className="mb-4 text-sm font-medium text-[var(--brand)] hover:underline"
            >
              ← Change mobile number
            </button>

            <OtpInputBlock
              ref={otpRef}
              mobile={cleanedMobile}
              onResend={sendOtp}
              resending={loading}
              error={error}
              resetKey={otpResetKey}
              onCompleteChange={setOtpComplete}
            />

            <button
              type="button"
              disabled={!otpComplete || loading}
              onClick={verifyOtp}
              className="mt-6 w-full rounded-2xl bg-[var(--brand)] py-3.5 text-base font-semibold text-white hover:bg-[var(--brand-deep)] disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        )}
            <p className="mt-4 text-center text-sm text-slate-500">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={onSignUp}
                className="font-semibold text-[var(--brand)] hover:underline"
              >
                Sign Up
              </button>
            </p>
      </div>
    </>
  )
}

export default UserSignInModal
