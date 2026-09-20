import { useEffect, useRef, useState } from 'react'
import { isOtpVerifyAccepted, otpFailureMessage } from '../utils/otpValidation'
import { API_BASE } from '../config/api'
import { COMPANY } from '../website/websiteContent'
import { normalizeMobile, saveOtpSession } from '../utils/otpSession'

const OTP_LENGTH = 6
const RESEND_SECONDS = 60

function OtpVerificationStep({
  mobile,
  onBack,
  onVerified,
  sendError = '',
  sending = false,
}) {
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''))
  const [timer, setTimer] = useState(RESEND_SECONDS)
  const [resending, setResending] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState('')
  const inputRefs = useRef([])
  const normalizedMobile = normalizeMobile(mobile)

  useEffect(() => {
    if (timer <= 0) return
    const id = setTimeout(() => setTimer((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timer])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  async function handleVerifyWith(otp) {
    const cleaned = String(otp || '').replace(/\D/g, '')
    if (cleaned.length !== OTP_LENGTH || verifying || sending) return
    setVerifying(true)
    setError('')
    try {
      const response = await fetch(`${API_BASE}/api/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: normalizedMobile, otp: cleaned }),
      })
      const data = await response.json()
      if (response.ok && isOtpVerifyAccepted(data)) {
        onVerified?.()
      } else {
        setError(otpFailureMessage(data))
        setDigits(Array(OTP_LENGTH).fill(''))
        inputRefs.current[0]?.focus()
      }
    } catch {
      setError('Could not reach the server. Please try again.')
    } finally {
      setVerifying(false)
    }
  }

  function handleDigitChange(index, value) {
    const char = value.replace(/\D/g, '').slice(-1)
    const updated = [...digits]
    updated[index] = char
    setDigits(updated)
    setError('')
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
    if (timer > 0 || resending || sending) return
    setResending(true)
    setError('')
    try {
      const response = await fetch(`${API_BASE}/api/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: normalizedMobile }),
      })
      const data = await response.json()
      if (!response.ok || !data.success) {
        setError(data.message || 'Failed to resend OTP. Please try again.')
        return
      }
      saveOtpSession(normalizedMobile)
      setTimer(RESEND_SECONDS)
      setDigits(Array(OTP_LENGTH).fill(''))
      inputRefs.current[0]?.focus()
    } catch {
      setError('Failed to resend OTP. Please try again.')
    } finally {
      setResending(false)
    }
  }

  const otpComplete = digits.every((d) => d !== '')
  const displayError = error || sendError

  return (
    <main className="min-h-screen bg-slate-100 py-0 text-slate-800 lg:py-8">
      <div className="mx-auto w-full max-w-lg bg-white shadow-sm lg:rounded-2xl lg:shadow-xl">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-6">
          <img
            src={COMPANY.logo}
            alt={COMPANY.name}
            className="h-9 w-auto max-w-[13rem] object-contain object-left"
          />
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-semibold text-[var(--brand)] hover:underline"
          >
            ← Back
          </button>
        </div>

        <div className="px-4 py-8 sm:px-8 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
            Step 1 of 5
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">Enter OTP</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {sending
              ? `Sending OTP to +91 ${normalizedMobile}...`
              : `Enter the 6-digit OTP sent to +91 ${normalizedMobile}. Your verification session stays active for 10 minutes.`}
          </p>

          <div className="mt-8 flex justify-between gap-2 sm:gap-3" onPaste={handlePaste}>
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
                disabled={sending}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`h-12 w-full rounded-xl border-2 text-center text-lg font-semibold text-slate-900 outline-none transition-colors sm:h-14 sm:text-xl
                  ${digit ? 'border-[var(--brand)] bg-white' : 'border-slate-200 bg-slate-100'}
                  focus:border-[var(--brand)] focus:bg-white disabled:opacity-60`}
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}
          </div>

          {displayError ? <p className="mt-4 text-sm text-red-500">{displayError}</p> : null}

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">Have not received your OTP?</p>
            {timer > 0 ? (
              <p className="mt-1 text-sm font-semibold text-green-600">Resend in {timer} seconds</p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resending || sending}
                className="mt-1 text-sm font-semibold text-[var(--brand)] disabled:opacity-50"
              >
                {resending ? 'Resending...' : 'Resend OTP'}
              </button>
            )}
          </div>

          <button
            type="button"
            disabled={!otpComplete || verifying || sending}
            onClick={() => handleVerifyWith(digits.join(''))}
            className="mt-8 w-full rounded-2xl bg-[var(--brand)] py-3.5 text-base font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300 sm:py-4"
          >
            {verifying ? 'Verifying...' : sending ? 'Sending OTP...' : 'Verify OTP & Continue'}
          </button>
        </div>
      </div>
    </main>
  )
}

export default OtpVerificationStep
