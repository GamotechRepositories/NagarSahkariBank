const READ_KEY_PREFIX = 'loan_read_notifications_'

export function getReadNotificationIds(mobile) {
  if (!mobile) return []
  try {
    const raw = localStorage.getItem(`${READ_KEY_PREFIX}${mobile}`)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function markNotificationRead(mobile, notificationId) {
  if (!mobile || !notificationId) return
  const existing = getReadNotificationIds(mobile)
  if (existing.includes(notificationId)) return
  localStorage.setItem(
    `${READ_KEY_PREFIX}${mobile}`,
    JSON.stringify([...existing, notificationId]),
  )
}

export function markAllNotificationsRead(mobile, notificationIds) {
  if (!mobile || !notificationIds?.length) return
  const existing = new Set(getReadNotificationIds(mobile))
  notificationIds.forEach((id) => existing.add(id))
  localStorage.setItem(`${READ_KEY_PREFIX}${mobile}`, JSON.stringify([...existing]))
}

export function isLoanFullyApproved(profile) {
  if (!profile) return false
  if (profile.loanApproved) return true
  const application = profile.application
  if (!application) return profile.applicationStatus === 'verified' || profile.kycStatus === 'verified'
  if (application.status === 'verified') return true
  const counts = application.counts || {}
  return counts.pending === 0 && counts.rejected === 0 && counts.accepted > 0
}

export function getUnreadCount(profile) {
  if (!profile?.notifications?.length) return 0
  const readIds = new Set(getReadNotificationIds(profile.mobile))
  return profile.notifications.filter((item) => !readIds.has(item.id)).length
}
