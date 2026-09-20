import { useEffect, useRef, useState } from 'react'
import { isOtpVerifyAccepted, otpFailureMessage } from '../utils/otpValidation'
import { API_BASE } from '../config/api'
import { normalizeMobile, saveOtpSession } from '../utils/otpSession'
import OtpInputBlock from './OtpInputBlock'

function LoanForm({
  mobileNumber,
  setMobileNumber,
  consentOne,
  setConsentOne,
  consentTwo,
  setConsentTwo,
  consentThree,
  setConsentThree,
  isOtpEnabled,
  loading,
  status,
  setStatus,
  onSendOtp,
  applyPhase = 'mobile',
  otpSendError = '',
  otpSending = false,
  onOtpVerified,
  onChangeMobile,
}) {
  const cleanedMobile = mobileNumber.replace(/\D/g, '').slice(0, 10)
  const showOtpEntry = applyPhase === 'otp'

  const [verifying, setVerifying] = useState(false)
  const [resending, setResending] = useState(false)
  const [otpError, setOtpError] = useState('')
  const [otpResetKey, setOtpResetKey] = useState(0)
  const [otpComplete, setOtpComplete] = useState(false)
  const otpRef = useRef(null)
  const otpSectionRef = useRef(null)

  useEffect(() => {
    if (showOtpEntry) {
      setOtpError('')
      otpSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [showOtpEntry])

  async function handleVerify() {
    const otp = otpRef.current?.getOtp?.() || ''
    if (otp.length !== 6 || verifying || otpSending) return
    setVerifying(true)
    setOtpError('')
    try {
      const response = await fetch(`${API_BASE}/api/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: normalizeMobile(cleanedMobile), otp }),
      })
      const data = await response.json()
      if (response.ok && isOtpVerifyAccepted(data)) {
        onOtpVerified?.()
      } else {
        setOtpError(otpFailureMessage(data))
        setOtpResetKey((k) => k + 1)
      }
    } catch {
      setOtpError('Could not reach the server. Please try again.')
    } finally {
      setVerifying(false)
    }
  }

  async function handleResend() {
    if (resending || loading || otpSending) return false
    setResending(true)
    setOtpError('')
    try {
      const response = await fetch(`${API_BASE}/api/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: cleanedMobile }),
      })
      const data = await response.json()
      if (!response.ok || !data.success) {
        setOtpError(data.message || 'Failed to resend OTP. Please try again.')
        return false
      }
      saveOtpSession(cleanedMobile)
      return true
    } catch {
      setOtpError('Failed to resend OTP. Please try again.')
      return false
    } finally {
      setResending(false)
    }
  }

  const displayOtpError = otpError || otpSendError
  const canVerify = showOtpEntry && otpComplete && !verifying && !otpSending

  return (
    <>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Apply Now</h1>
      <p className="mt-2 text-sm text-slate-600 sm:text-base">
        {showOtpEntry
          ? 'Verify your mobile number to continue your loan application.'
          : 'We will send you a one time password to verify your mobile number'}
      </p>

      <label className="mt-5 block text-xs font-semibold tracking-wide text-slate-500 sm:mt-6">
        ENTER MOBILE NUMBER
      </label>
      <div className="mt-3 flex overflow-hidden rounded-2xl border border-slate-300">
        <span className="flex items-center bg-slate-100 px-3 text-sm font-semibold text-slate-700 sm:px-4 sm:text-base">
          +91
        </span>
        <input
          type="tel"
          placeholder="Enter 10 Digit mobile number"
          className="w-full px-3 py-3 text-base outline-none placeholder:text-slate-400 sm:px-4 disabled:bg-slate-50 disabled:text-slate-500"
          value={mobileNumber}
          disabled={showOtpEntry}
          onChange={(event) => {
            const digitsOnly = event.target.value.replace(/\D/g, '').slice(0, 10)
            setMobileNumber(digitsOnly)
            setStatus(null)
          }}
          maxLength={10}
        />
      </div>

      {showOtpEntry ? (
        <button
          type="button"
          onClick={onChangeMobile}
          className="mt-3 text-sm font-semibold text-[var(--brand)] hover:underline"
        >
          ← Change mobile number
        </button>
      ) : null}

      {!showOtpEntry ? (
        <div className="mt-5 space-y-3 text-xs leading-relaxed text-slate-700 sm:mt-6 lg:text-sm">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={consentOne}
              onChange={(event) => setConsentOne(event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[var(--brand)]"
            />
            <span>
              By proceeding, you agree to our Terms & Conditions, Privacy Policy, and consent to us
              accessing your credit information from credit bureaus for processing your application.
            </span>
          </label>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={consentTwo}
              onChange={(event) => setConsentTwo(event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[var(--brand)]"
            />
            <span>
              I consent to receive loan-related updates, alerts, and communications via WhatsApp,
              SMS, RCS and any other communication channel on my registered mobile number.
            </span>
          </label>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={consentThree}
              onChange={(event) => setConsentThree(event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[var(--brand)]"
            />
            <span>
              I hereby provide my consent to fetch and verify my KYC details from the CKYC registry
              for the purpose of processing my application.
            </span>
          </label>
        </div>
      ) : null}

      {showOtpEntry ? (
        <div
          ref={otpSectionRef}
          className="mt-6 rounded-2xl border-2 border-[var(--brand)]/20 bg-[var(--brand)]/5 p-4 sm:p-5"
        >
          <OtpInputBlock
            ref={otpRef}
            mobile={cleanedMobile}
            onResend={handleResend}
            resending={resending}
            sending={otpSending}
            error={displayOtpError}
            resetKey={otpResetKey}
            onCompleteChange={setOtpComplete}
          />
        </div>
      ) : null}

      {status && !showOtpEntry ? (
        <p
          className={`mt-4 rounded-xl px-4 py-3 text-sm font-medium ${
            status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
          }`}
        >
          {status.message}
        </p>
      ) : null}

      {/* Desktop buttons */}
      {showOtpEntry ? (
        <button
          type="button"
          disabled={!canVerify}
          onClick={handleVerify}
          className="mt-6 hidden w-full rounded-xl bg-[var(--brand)] py-3 text-base font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300 lg:block"
        >
          {verifying ? 'Verifying...' : otpSending ? 'Sending OTP...' : 'Verify OTP & Continue'}
        </button>
      ) : (
        <button
          type="button"
          disabled={!isOtpEnabled || loading}
          onClick={onSendOtp}
          className="mt-6 hidden w-full rounded-xl bg-[var(--brand)] py-3 text-base font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300 lg:block"
        >
          {loading ? 'Sending...' : 'Get OTP'}
        </button>
      )}

      {/* Mobile sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur lg:hidden">
        <div className="mx-auto w-full max-w-md">
          {status && !showOtpEntry ? (
            <p
              className={`mb-2 rounded-xl px-4 py-2 text-sm font-medium ${
                status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
              }`}
            >
              {status.message}
            </p>
          ) : null}
          {displayOtpError && showOtpEntry ? (
            <p className="mb-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
              {displayOtpError}
            </p>
          ) : null}
          {showOtpEntry ? (
            <button
              type="button"
              disabled={!canVerify}
              onClick={handleVerify}
              className="w-full rounded-xl bg-[var(--brand)] py-3 text-base font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {verifying ? 'Verifying...' : otpSending ? 'Sending OTP...' : 'Verify OTP & Continue'}
            </button>
          ) : (
            <button
              type="button"
              disabled={!isOtpEnabled || loading}
              onClick={onSendOtp}
              className="w-full rounded-xl bg-[var(--brand)] py-3 text-base font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading ? 'Sending...' : 'Get OTP'}
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default LoanForm
