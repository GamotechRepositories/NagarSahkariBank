const OTP_SESSION_KEY = 'loan_otp_pending_session'
const OTP_SESSION_TTL_MS = 10 * 60 * 1000

export function normalizeMobile(value) {
  const digits = String(value || '').replace(/\D/g, '')
  if (digits.length === 10) return digits
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2)
  return digits.slice(-10)
}

export function saveOtpSession(mobile) {
  const normalized = normalizeMobile(mobile)
  if (normalized.length !== 10) return
  sessionStorage.setItem(
    OTP_SESSION_KEY,
    JSON.stringify({
      mobile: normalized,
      sentAt: Date.now(),
    }),
  )
}

export function getOtpSession() {
  try {
    const raw = sessionStorage.getItem(OTP_SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    const mobile = normalizeMobile(parsed?.mobile)
    const sentAt = Number(parsed?.sentAt)
    if (mobile.length !== 10 || !sentAt) {
      clearOtpSession()
      return null
    }
    if (Date.now() - sentAt > OTP_SESSION_TTL_MS) {
      clearOtpSession()
      return null
    }
    return { mobile, sentAt }
  } catch {
    clearOtpSession()
    return null
  }
}

export function clearOtpSession() {
  sessionStorage.removeItem(OTP_SESSION_KEY)
}

export function hasPendingOtpSession(mobile) {
  const session = getOtpSession()
  if (!session) return false
  return session.mobile === normalizeMobile(mobile)
}
