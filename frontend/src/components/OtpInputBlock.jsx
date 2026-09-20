import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

const OTP_LENGTH = 6
const RESEND_SECONDS = 60

const OtpInputBlock = forwardRef(function OtpInputBlock(
  {
    mobile = '',
    onResend,
    resending = false,
    sending = false,
    error = '',
    disabled = false,
    autoFocus = true,
    resetKey = 0,
    onCompleteChange,
  },
  ref,
) {
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''))
  const [timer, setTimer] = useState(RESEND_SECONDS)
  const inputRefs = useRef([])

  const cleanedMobile = String(mobile).replace(/\D/g, '').slice(0, 10)
  const otpComplete = digits.every((d) => d !== '')

  useEffect(() => {
    onCompleteChange?.(otpComplete)
  }, [otpComplete, onCompleteChange])

  useImperativeHandle(ref, () => ({
    getOtp: () => digits.join(''),
    otpComplete,
    reset: () => {
      setDigits(Array(OTP_LENGTH).fill(''))
      inputRefs.current[0]?.focus()
    },
  }))

  useEffect(() => {
    if (timer <= 0) return
    const id = setTimeout(() => setTimer((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timer])

  useEffect(() => {
    setTimer(RESEND_SECONDS)
    setDigits(Array(OTP_LENGTH).fill(''))
    if (autoFocus) {
      inputRefs.current[0]?.focus()
    }
  }, [cleanedMobile, resetKey, autoFocus])

  function handleDigitChange(index, value) {
    const char = value.replace(/\D/g, '').slice(-1)
    const updated = [...digits]
    updated[index] = char
    setDigits(updated)
    if (char && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index, event) {
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

  async function handleResendClick() {
    if (timer > 0 || resending || sending || disabled) return
    const ok = await onResend?.()
    if (ok !== false) {
      setTimer(RESEND_SECONDS)
      setDigits(Array(OTP_LENGTH).fill(''))
      inputRefs.current[0]?.focus()
    }
  }

  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
        Enter OTP
      </label>
      {cleanedMobile ? (
        <p className="mt-1 text-sm text-slate-600">
          Enter the 6-digit OTP sent to +91 {cleanedMobile}
        </p>
      ) : null}

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
            disabled={disabled || sending}
            onChange={(e) => handleDigitChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`h-12 w-full rounded-xl border-2 text-center text-lg font-semibold text-slate-900 outline-none transition-colors sm:h-14 sm:text-xl
              ${digit ? 'border-[var(--brand)] bg-white' : 'border-slate-200 bg-slate-100'}
              focus:border-[var(--brand)] focus:bg-white disabled:opacity-60`}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>

      {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}

      <div className="mt-4 text-center">
        <p className="text-sm text-slate-500">Have not received your OTP?</p>
        {timer > 0 ? (
          <p className="mt-1 text-sm font-semibold text-green-600">Resend in {timer} seconds</p>
        ) : (
          <button
            type="button"
            onClick={handleResendClick}
            disabled={resending || sending || disabled}
            className="mt-1 text-sm font-semibold text-[var(--brand)] disabled:opacity-50"
          >
            {resending ? 'Resending...' : 'Resend OTP'}
          </button>
        )}
      </div>
    </div>
  )
})

export default OtpInputBlock
