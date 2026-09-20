import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const otpChallengesFile = path.join(__dirname, '..', 'data', 'otp-challenges.json')

/** @type {Map<string, { requestId?: string|null, otpHash?: string|null, sentAt: number, attempts: number }>} */
const pendingOtpChallenges = new Map()

function writeOtpChallengesToDisk() {
  fs.mkdirSync(path.dirname(otpChallengesFile), { recursive: true })
  fs.writeFileSync(
    otpChallengesFile,
    JSON.stringify(Object.fromEntries(pendingOtpChallenges), null, 2),
  )
}

function readOtpChallengesFromDisk() {
  try {
    const raw = JSON.parse(fs.readFileSync(otpChallengesFile, 'utf8'))
    if (!raw || typeof raw !== 'object') return
    for (const [mobile, challenge] of Object.entries(raw)) {
      if (challenge && typeof challenge === 'object') {
        pendingOtpChallenges.set(mobile, challenge)
      }
    }
  } catch {
    // No saved OTP challenges yet.
  }
}

export function createOtpChallengeStore(expiryMinutes) {
  readOtpChallengesFromDisk()

  function pruneExpiredOtpChallenges() {
    const maxAgeMs = expiryMinutes * 60 * 1000
    let changed = false
    for (const [mobile, challenge] of pendingOtpChallenges.entries()) {
      if (!challenge?.sentAt || Date.now() - challenge.sentAt > maxAgeMs) {
        pendingOtpChallenges.delete(mobile)
        changed = true
      }
    }
    if (changed) writeOtpChallengesToDisk()
  }

  pruneExpiredOtpChallenges()

  function rememberOtpChallenge(mobile, { requestId = null, otpHash = null } = {}) {
    pendingOtpChallenges.set(mobile, {
      requestId,
      otpHash,
      sentAt: Date.now(),
      attempts: 0,
    })
    writeOtpChallengesToDisk()
  }

  function getActiveOtpChallenge(mobile) {
    pruneExpiredOtpChallenges()
    const challenge = pendingOtpChallenges.get(mobile)
    if (!challenge) return null
    const maxAgeMs = expiryMinutes * 60 * 1000
    if (Date.now() - challenge.sentAt > maxAgeMs) {
      pendingOtpChallenges.delete(mobile)
      writeOtpChallengesToDisk()
      return null
    }
    return challenge
  }

  function clearOtpChallenge(mobile) {
    pendingOtpChallenges.delete(mobile)
    writeOtpChallengesToDisk()
  }

  function updateOtpChallenge(mobile, challenge) {
    pendingOtpChallenges.set(mobile, challenge)
    writeOtpChallengesToDisk()
  }

  function backupOtpChallenge(mobile) {
    const challenge = getActiveOtpChallenge(mobile)
    return challenge ? { ...challenge } : null
  }

  function restoreOtpChallenge(mobile, backup) {
    if (backup) {
      updateOtpChallenge(mobile, backup)
    } else {
      clearOtpChallenge(mobile)
    }
  }

  return {
    rememberOtpChallenge,
    getActiveOtpChallenge,
    clearOtpChallenge,
    updateOtpChallenge,
    backupOtpChallenge,
    restoreOtpChallenge,
  }
}
