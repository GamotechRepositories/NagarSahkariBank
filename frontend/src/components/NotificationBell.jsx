import { useEffect, useRef, useState } from 'react'
import { Icon } from '../website/Icons'
import {
  getReadNotificationIds,
  getUnreadCount,
  markAllNotificationsRead,
  markNotificationRead,
} from '../utils/userNotifications'

function formatNotificationDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getNotificationIcon(type) {
  if (type === 'loan_approved') return 'check'
  if (type === 'action_required') return 'document'
  return 'clock'
}

export function NotificationBell({ profile, onViewProfile }) {
  const [open, setOpen] = useState(false)
  const [readIds, setReadIds] = useState(() => getReadNotificationIds(profile?.mobile))
  const panelRef = useRef(null)

  const notifications = profile?.notifications || []
  const unreadCount = notifications.filter((item) => !readIds.includes(item.id)).length

  useEffect(() => {
    setReadIds(getReadNotificationIds(profile?.mobile))
  }, [profile?.mobile, profile?.notifications])

  useEffect(() => {
    if (!open) return undefined

    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  if (!profile) return null

  function handleNotificationClick(notification) {
    markNotificationRead(profile.mobile, notification.id)
    setReadIds(getReadNotificationIds(profile.mobile))
    setOpen(false)
    onViewProfile?.()
  }

  function handleMarkAllRead() {
    markAllNotificationsRead(
      profile.mobile,
      notifications.map((item) => item.id),
    )
    setReadIds(getReadNotificationIds(profile.mobile))
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--navy)] transition hover:bg-[var(--brand-soft)]"
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
        aria-expanded={open}
      >
        <Icon name="bell" className="h-5 w-5" />
        {unreadCount > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3">
            <p className="text-sm font-semibold text-[var(--navy)]">Notifications</p>
            {unreadCount > 0 ? (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-xs font-medium text-[var(--gold)] hover:underline"
              >
                Mark all read
              </button>
            ) : null}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-black/50">No notifications yet.</p>
            ) : (
              notifications.map((notification) => {
                const isRead = readIds.includes(notification.id)
                const isApproved = notification.type === 'loan_approved'
                return (
                  <button
                    key={notification.id}
                    type="button"
                    onClick={() => handleNotificationClick(notification)}
                    className={`flex w-full gap-3 border-b border-[var(--line)] px-4 py-3 text-left transition last:border-b-0 hover:bg-[var(--brand-soft)] ${
                      isRead ? 'bg-white' : 'bg-emerald-50/40'
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        isApproved
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon name={getNotificationIcon(notification.type)} className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-start justify-between gap-2">
                        <span className="text-sm font-semibold text-[var(--navy)]">
                          {notification.title}
                        </span>
                        {!isRead ? (
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                        ) : null}
                      </span>
                      <span className="mt-1 block text-sm text-black/65">
                        {notification.message}
                      </span>
                      <span className="mt-1 block text-xs text-black/40">
                        {formatNotificationDate(notification.createdAt)}
                      </span>
                    </span>
                  </button>
                )
              })
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function getProfileUnreadCount(profile) {
  return getUnreadCount(profile)
}
