/**
 * Fast2SMS OTP configuration.
 *
 * Modes (auto-selected):
 * - local → no OTP ID needed; server generates OTP and sends via bulk SMS (route q)
 * - smart → uses POST /dev/otp/send (needs FAST2SMS_OTP_ID from Smart OTP panel)
 *
 * Get API key: Fast2SMS → Dev API
 * Get otp_id:   Fast2SMS → Smart OTP → Add OTP (for production DLT)
 */

export const FAST2SMS_DEFAULTS = {
  baseUrl: 'https://www.fast2sms.com',
  smartSendPath: '/dev/otp/send',
  smartVerifyPath: '/dev/otp/verify',
  bulkPath: '/dev/bulkV2',

  /** Smart OTP template ID — leave empty to use local mode */
  otpId: '',

  /** local = bulk SMS without OTP ID | smart = /dev/otp/send + /dev/otp/verify */
  mode: 'local',

  /** Fast2SMS route for local mode: q = quick/test SMS (no DLT OTP ID needed) */
  localRoute: 'q',

  /** ##OTP## is replaced with the generated code */
  localMessage:
    'Your OTP for Nagar Sahkari Bank Ltd. Etawah is ##OTP##. Valid for 10 minutes. Do not share.',

  otpLength: 6,
  otpExpiryMinutes: 10,
  variablesValues: '',
}

function readEnv(name, fallback) {
  const value = process.env[name]
  if (value === undefined || value === '') return fallback
  return value
}

export function loadFast2SmsConfig() {
  const otpId = readEnv('FAST2SMS_OTP_ID', FAST2SMS_DEFAULTS.otpId)
  const explicitMode = String(readEnv('FAST2SMS_MODE', '') || '').toLowerCase()
  const mode = explicitMode || (otpId ? 'smart' : 'local')

  return {
    apiKey: process.env.FAST2SMS_API_KEY || '',
    baseUrl: readEnv('FAST2SMS_BASE_URL', FAST2SMS_DEFAULTS.baseUrl),
    mode,
    otpId,
    smartSendPath: readEnv('FAST2SMS_SEND_PATH', FAST2SMS_DEFAULTS.smartSendPath),
    smartVerifyPath: readEnv('FAST2SMS_VERIFY_PATH', FAST2SMS_DEFAULTS.smartVerifyPath),
    bulkPath: readEnv('FAST2SMS_BULK_PATH', FAST2SMS_DEFAULTS.bulkPath),
    localRoute: readEnv('FAST2SMS_LOCAL_ROUTE', FAST2SMS_DEFAULTS.localRoute),
    localMessage: readEnv('FAST2SMS_LOCAL_MESSAGE', FAST2SMS_DEFAULTS.localMessage),
    otpLength: Number(readEnv('FAST2SMS_OTP_LENGTH', FAST2SMS_DEFAULTS.otpLength)) || FAST2SMS_DEFAULTS.otpLength,
    otpExpiryMinutes:
      Number(readEnv('FAST2SMS_OTP_EXPIRY_MINUTES', FAST2SMS_DEFAULTS.otpExpiryMinutes)) ||
      FAST2SMS_DEFAULTS.otpExpiryMinutes,
    variablesValues: readEnv('FAST2SMS_VARIABLES_VALUES', FAST2SMS_DEFAULTS.variablesValues),
  }
}

export function validateFast2SmsConfig(config) {
  if (!config.apiKey) {
    return 'Missing FAST2SMS_API_KEY in environment.'
  }
  if (config.mode === 'smart' && !config.otpId) {
    return 'Missing FAST2SMS_OTP_ID for smart mode. Create one in Fast2SMS → Smart OTP, or leave OTP ID empty for local mode.'
  }
  if (config.mode === 'local' && !config.localMessage.includes('##OTP##')) {
    return 'FAST2SMS_LOCAL_MESSAGE must contain ##OTP## placeholder.'
  }
  return null
}

export function isFast2SmsSuccess(data) {
  if (!data || typeof data !== 'object') return false
  if (data.return !== true) return false
  // Local bulk route (route q) returns { return: true, request_id } without status_code.
  if (data.status_code == null) return true
  return Number(data.status_code) === 200
}

export function fast2SmsMessage(data) {
  const raw = data?.message
  if (Array.isArray(raw)) return raw.join(' ')
  if (typeof raw === 'string') return raw
  return ''
}

export function describeFast2SmsMode(config) {
  if (config.mode === 'smart') {
    return `Fast2SMS Smart OTP — ${config.otpLength}-digit via /dev/otp/send (${config.otpId})`
  }
  return `Fast2SMS local — ${config.otpLength}-digit via bulk route "${config.localRoute}" (no OTP ID needed)`
}

export const FAST2SMS_SMART_OTP_SETUP = [
  '1. Login to https://www.fast2sms.com',
  '2. Open Smart OTP → Add OTP',
  '3. Choose SMS channel and your DLT-approved template',
  '4. Copy the OTP ID shown in OTP Template List',
  '5. Add to .env: FAST2SMS_OTP_ID=your_otp_id',
  '6. Restart backend — mode switches to smart automatically',
]
