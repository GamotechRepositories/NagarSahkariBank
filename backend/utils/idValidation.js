const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/
const AADHAAR_REGEX = /^[0-9]{12}$/

const VERHOEFF_D = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
]

const VERHOEFF_P = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
]

export function sanitizePan(value) {
  return String(value || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 10)
}

export function sanitizeAadhaar(value) {
  return String(value || '')
    .replace(/\D/g, '')
    .slice(0, 12)
}

export function isValidPanFormat(value) {
  const pan = sanitizePan(value)
  return pan.length === 10 && PAN_REGEX.test(pan)
}

export function verhoeffCheck(number) {
  const digits = String(number || '')
  if (!/^\d+$/.test(digits)) return false

  let checksum = 0
  const reversed = digits.split('').reverse().map(Number)

  for (let i = 0; i < reversed.length; i += 1) {
    checksum = VERHOEFF_D[checksum][VERHOEFF_P[i % 8][reversed[i]]]
  }

  return checksum === 0
}

export function isValidAadhaarFormat(value) {
  const aadhaar = sanitizeAadhaar(value)
  if (aadhaar.length !== 12 || !AADHAAR_REGEX.test(aadhaar)) return false
  if (isDebugMode()) return true
  return verhoeffCheck(aadhaar)
}

function isDebugMode() {
  return ['true', '1', 'yes'].includes(String(process.env.MSG91_DEBUG || '').toLowerCase())
}

export function getPanError(value) {
  const pan = sanitizePan(value)
  if (!pan) return 'PAN number is required.'
  if (pan.length !== 10) return 'PAN must be exactly 10 characters.'
  if (!PAN_REGEX.test(pan)) {
    return 'Invalid PAN format. Use 5 letters, 4 digits, then 1 letter (e.g. ABCDE1234F).'
  }
  return ''
}

export function getAadhaarError(value) {
  const aadhaar = sanitizeAadhaar(value)
  if (!aadhaar) return 'Aadhaar number is required.'
  if (aadhaar.length !== 12) return 'Aadhaar must be exactly 12 digits.'
  if (!AADHAAR_REGEX.test(aadhaar)) return 'Aadhaar must contain only digits.'
  if (!isDebugMode() && !verhoeffCheck(aadhaar)) {
    return 'Invalid Aadhaar number. Please check and try again.'
  }
  return ''
}
