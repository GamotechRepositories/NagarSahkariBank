import { useEffect, useRef, useState } from 'react'
import { isOtpVerifyAccepted, otpFailureMessage } from '../utils/otpValidation'
import { API_BASE } from '../config/api'
import { normalizeMobile, saveOtpSession } from '../utils/otpSession'

const OTP_LENGTH = 6
const RESEND_SECONDS = 60

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
}) {
  const cleanedMobile = mobileNumber.replace(/\D/g, '').slice(0, 10)
  const showOtpEntry = applyPhase === 'otp'

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''))
  const [timer, setTimer] = useState(RESEND_SECONDS)
  const [resending, setResending] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [otpError, setOtpError] = useState('')
  const inputRefs = useRef([])

  useEffect(() => {
    if (!showOtpEntry || timer <= 0) return
    const id = setTimeout(() => setTimer((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [showOtpEntry, timer])

  useEffect(() => {
    if (showOtpEntry) {
      setTimer(RESEND_SECONDS)
      setDigits(Array(OTP_LENGTH).fill(''))
      setOtpError('')
      inputRefs.current[0]?.focus()
    }
  }, [showOtpEntry])

  async function handleVerifyWith(otp) {
    const cleaned = String(otp || '').replace(/\D/g, '')
    if (cleaned.length !== OTP_LENGTH || verifying || otpSending) return
    setVerifying(true)
    setOtpError('')
    try {
      const response = await fetch(`${API_BASE}/api/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: normalizeMobile(cleanedMobile), otp: cleaned }),
      })
      const data = await response.json()
      if (response.ok && isOtpVerifyAccepted(data)) {
        onOtpVerified?.()
      } else {
        setOtpError(otpFailureMessage(data))
        setDigits(Array(OTP_LENGTH).fill(''))
        inputRefs.current[0]?.focus()
      }
    } catch {
      setOtpError('Could not reach the server. Please try again.')
    } finally {
      setVerifying(false)
    }
  }

  function handleDigitChange(index, value) {
    const char = value.replace(/\D/g, '').slice(-1)
    const updated = [...digits]
    updated[index] = char
    setDigits(updated)
    setOtpError('')
    if (char && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index, event) {
    if (event.key === 'Enter' && digits.every((d) => d !== '')) {
      event.preventDefault()
      handleVerifyWith(digits.join(''))
      return
    }
    if (event.key === 'Backspace') {
      if (digits[index]) {
        const updated = [...digits]
        updated[index] = ''
        setDigits(updated)
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  function handlePaste(event) {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    const updated = Array(OTP_LENGTH).fill('')
    for (let i = 0; i < pasted.length; i++) updated[i] = pasted[i]
    setDigits(updated)
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1)
    inputRefs.current[focusIdx]?.focus()
  }

  async function handleResend() {
    if (timer > 0 || resending || loading || otpSending) return
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
        return
      }
      saveOtpSession(cleanedMobile)
      setTimer(RESEND_SECONDS)
      setDigits(Array(OTP_LENGTH).fill(''))
      inputRefs.current[0]?.focus()
    } catch {
      setOtpError('Failed to resend OTP. Please try again.')
    } finally {
      setResending(false)
    }
  }

  const otpComplete = digits.every((d) => d !== '')
  const displayOtpError = otpError || otpSendError

  return (
    <>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Apply Now</h1>
      <p className="mt-2 text-sm text-slate-600 sm:text-base">
        {showOtpEntry
          ? `Enter the 6-digit OTP sent to +91 ${cleanedMobile}`
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
        <div className="mt-6">
          <label className="block text-xs font-semibold tracking-wide text-slate-500">
            ENTER OTP
          </label>
          <div className="mt-3 flex justify-between gap-2 sm:gap-3" onPaste={handlePaste}>
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                type="tel"
                inputMode="numeric"
                autoComplete={index === 0 ? 'one-time-code' : 'off'}
                maxLength={1}
                value={digit}
                disabled={otpSending}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`h-12 w-full rounded-xl border-2 text-center text-lg font-semibold text-slate-900 outline-none transition-colors sm:h-14 sm:text-xl
                  ${digit ? 'border-[var(--brand)] bg-white' : 'border-slate-200 bg-slate-100'}
                  focus:border-[var(--brand)] focus:bg-white disabled:opacity-60`}
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}
          </div>

          {displayOtpError ? <p className="mt-3 text-sm text-red-500">{displayOtpError}</p> : null}

          <div className="mt-4 text-center">
            <p className="text-sm text-slate-500">Have not received your OTP?</p>
            {timer > 0 ? (
              <p className="mt-1 text-sm font-semibold text-green-600">Resend in {timer} seconds</p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resending || loading || otpSending}
                className="mt-1 text-sm font-semibold text-[var(--brand)] disabled:opacity-50"
              >
                {resending ? 'Resending...' : 'Resend OTP'}
              </button>
            )}
          </div>
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
          disabled={!otpComplete || verifying || otpSending}
          onClick={() => handleVerifyWith(digits.join(''))}
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
              disabled={!otpComplete || verifying || otpSending}
              onClick={() => handleVerifyWith(digits.join(''))}
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
