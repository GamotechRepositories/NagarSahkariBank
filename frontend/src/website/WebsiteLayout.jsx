import { useEffect, useState } from 'react'
import { COMPANY, NAV_ITEMS } from './websiteContent'
import { Icon } from './Icons'
import { NotificationBell } from '../components/NotificationBell'

function getProfileInitials(name) {
  return (
    String(name || 'U')
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || '')
      .join('') || 'U'
  )
}

export function WebsiteLayout({
  currentPage,
  onNavigate,
  onApplyNow,
  onViewProfile,
  onSignIn,
  onSignUp,
  onLogout,
  userProfile,
  children,
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [currentPage])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const goTo = (page) => {
    setMenuOpen(false)
    onNavigate(page)
  }

  const openProfile = () => {
    setMenuOpen(false)
    onViewProfile()
  }

  return (
    <div className="min-h-screen bg-[var(--surface-muted)] text-black">
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <button type="button" onClick={() => goTo('home')} className="shrink-0 text-left">
            <img
              src={COMPANY.logo}
              alt={COMPANY.name}
              className="h-10 w-auto max-w-[11.5rem] object-contain object-left sm:h-12 sm:max-w-[16rem] lg:max-w-[18rem]"
            />
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  currentPage === item.id
                    ? 'bg-[var(--brand-soft)] text-[var(--navy)]'
                    : 'text-black/70 hover:bg-[var(--brand-deep)]/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {userProfile ? (
              <>
                <NotificationBell profile={userProfile} onViewProfile={onViewProfile} />
                <button
                  type="button"
                  onClick={onViewProfile}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--navy)] text-xs font-bold text-white transition hover:bg-[var(--brand-deep)] lg:hidden"
                  title="Open my profile"
                  aria-label="Open my profile"
                >
                  {getProfileInitials(userProfile.fullName)}
                </button>
                <button
                  type="button"
                  onClick={onViewProfile}
                  className="hidden max-w-[11rem] items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--brand-soft)] py-1.5 pl-1.5 pr-3 text-left transition hover:bg-[var(--brand-soft)] sm:max-w-none lg:inline-flex"
                  title="Open my profile"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--navy)] text-xs font-bold text-white">
                    {getProfileInitials(userProfile.fullName)}
                  </span>
                  <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-[var(--navy)]">
                    {userProfile.fullName || 'My Profile'}
                  </span>
                  <span className="hidden text-[11px] text-black/55 sm:block">
                    {userProfile.loanApproved ? (
                      <span className="font-semibold text-emerald-700">Loan approved</span>
                    ) : (
                      <>+91 {userProfile.mobile || '—'}</>
                    )}
                  </span>
                  </span>
                </button>
              </>
            ) : (
              <div className="hidden items-center gap-2 lg:flex">
                <button
                  type="button"
                  onClick={onSignIn}
                  className="rounded-lg border border-[var(--navy)] px-3 py-2 text-sm font-medium text-[var(--navy)] hover:bg-[var(--brand-soft)]"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={onSignUp}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--navy)] hover:bg-[var(--brand-soft)]"
                >
                  Sign Up
                </button>
              </div>
            )}

            {!userProfile && (
              <button
                type="button"
                onClick={onApplyNow}
                className="inline-flex items-center gap-1.5 rounded-2xl bg-[var(--brand)] px-3.5 py-2 text-sm font-semibold text-white hover:bg-[var(--brand-deep)] sm:gap-2 sm:px-4 sm:py-2.5"
              >
                Apply Now
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)] text-[var(--navy)] transition hover:bg-[var(--brand-soft)] lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — slides from right */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ease-out ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <aside
          className={`absolute right-0 top-0 flex h-full w-[min(20rem,88vw)] flex-col bg-white shadow-[-8px_0_30px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-4">
            <img
              src={COMPANY.logo}
              alt={COMPANY.name}
              className="h-9 w-auto max-w-[13rem] object-contain object-left"
            />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)] text-[var(--navy)] transition hover:bg-[var(--brand-soft)]"
              aria-label="Close menu"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          {userProfile ? (
            <div className="border-b border-[var(--line)] px-4 py-4">
              <button
                type="button"
                onClick={openProfile}
                className="flex w-full items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--brand-soft)] px-3 py-3 text-left transition hover:bg-[var(--brand-soft)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--navy)] text-sm font-bold text-white">
                  {getProfileInitials(userProfile.fullName)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-[var(--navy)]">
                    {userProfile.fullName || 'My Profile'}
                  </span>
                  <span className="block text-xs text-black/55">+91 {userProfile.mobile || '—'}</span>
                  {userProfile.loanApproved ? (
                    <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-800">
                      <Icon name="check" className="h-3 w-3" />
                      Loan approved
                    </span>
                  ) : null}
                </span>
                <Icon name="user" className="h-5 w-5 shrink-0 text-[var(--navy)]" />
              </button>

              {userProfile.notifications?.length ? (
                <div className="mt-3 space-y-2">
                  <p className="px-1 text-xs font-semibold uppercase tracking-[0.12em] text-black/45">
                    Notifications
                  </p>
                  {userProfile.notifications.slice(0, 3).map((notification) => (
                    <button
                      key={notification.id}
                      type="button"
                      onClick={openProfile}
                      className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm transition hover:bg-[var(--brand-soft)] ${
                        notification.type === 'loan_approved'
                          ? 'border-emerald-200 bg-emerald-50/60'
                          : 'border-[var(--line)] bg-white'
                      }`}
                    >
                      <p className="font-semibold text-[var(--navy)]">{notification.title}</p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-black/60">
                        {notification.message}
                      </p>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          <nav className="flex flex-1 flex-col overflow-y-auto px-3 py-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(item.id)}
                className={`rounded-xl px-4 py-3.5 text-left text-sm font-medium transition ${
                  currentPage === item.id
                    ? 'bg-[var(--brand-soft)] text-[var(--navy)]'
                    : 'text-black/80 hover:bg-[var(--brand-deep)]/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="border-t border-[var(--line)] px-4 py-4">
            {userProfile ? (
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  onLogout?.()
                }}
                className="w-full rounded-2xl border border-[var(--line)] px-4 py-3 text-sm font-semibold text-[var(--navy)] transition hover:bg-[var(--brand-soft)]"
              >
                Logout
              </button>
            ) : (
              <div className="space-y-2.5">
                <p className="px-0.5 text-xs font-medium uppercase tracking-[0.12em] text-black/45">
                  Account
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    onSignIn()
                  }}
                  className="w-full rounded-2xl border-2 border-[var(--navy)] px-4 py-3 text-sm font-semibold text-[var(--navy)] transition hover:bg-[var(--brand-soft)]"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    onSignUp?.()
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-deep)]"
                >
                  Sign Up
                  <Icon name="arrow" className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </aside>
      </div>

      <main>{children}</main>

      <footer className="border-t border-[var(--navy)] bg-[var(--navy)] px-4 py-12 text-white/80 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="inline-flex rounded-xl bg-white px-3 py-2">
              <img
                src={COMPANY.logo}
                alt={COMPANY.name}
                className="h-12 w-auto max-w-[16rem] object-contain object-left"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {COMPANY.tagline}. {COMPANY.dicgc}.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--gold)]">Contact</p>
            <div className="mt-4 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <Icon name="phone" className="h-4 w-4 text-[var(--gold)]" />
                {COMPANY.phone}
              </p>
              <p className="flex items-center gap-2">
                <Icon name="mail" className="h-4 w-4 text-[var(--gold)]" />
                {COMPANY.email}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--gold)]">Office</p>
            <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed">
              <Icon name="building" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
              {COMPANY.address}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--gold)]">Hours</p>
            <p className="mt-4 flex items-start gap-2 text-sm">
              <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
              <span>
                {COMPANY.hours}
                <br />
                Sunday: Closed
              </span>
            </p>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-center text-xs text-white/45">
          © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved. Registered with DICGC.
        </p>
      </footer>
    </div>
  )
}
