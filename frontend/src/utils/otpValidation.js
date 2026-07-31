/**
 * Strict OTP verify success check.
 * Production historically returned HTTP 200 + success:true even when MSG91
 * said type:"error" (e.g. "OTP not match"). Clients must reject those.
 */
export function isOtpVerifyAccepted(payload) {
  if (!payload || typeof payload !== 'object') return false
  if (payload.success !== true) return false

  const nested = payload.data
  if (nested && typeof nested === 'object') {
    const nestedType = String(nested.type || '').toLowerCase()
    if (nestedType === 'error' || nestedType === 'failed' || nestedType === 'failure') {
      return false
    }
    if (nested.debug === true) return false
  }

  const message = String(payload.message || nested?.message || '').toLowerCase()
  if (
    message.includes('not match') ||
    message.includes('invalid') ||
    message.includes('expired') ||
    message.includes('already verified') ||
    message.includes('no otp') ||
    message.includes('failed') ||
    message.includes('debug mode')
  ) {
    return false
  }

  return true
}

export function otpFailureMessage(payload) {
  return (
    payload?.message ||
    payload?.data?.message ||
    'Invalid OTP. Please try again.'
  )
}
