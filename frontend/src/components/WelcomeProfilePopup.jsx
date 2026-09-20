import { COMPANY } from '../website/websiteContent'

function WelcomeProfilePopup({ profile, onViewProfile, onClose }) {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              {COMPANY.name}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[var(--navy)]">Welcome back</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-600 hover:bg-slate-200"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          Hi <span className="font-semibold text-slate-900">{profile?.fullName || 'there'}</span>.
          Your application profile is ready. You can review your loan application and verification
          status anytime.
        </p>

        <div className="mt-4 rounded-2xl bg-[var(--brand-soft)] px-4 py-3 text-sm text-[var(--navy)]">
          <p className="font-medium">+91 {profile?.mobile || '—'}</p>
          <p className="mt-1 capitalize">
            Status: {(profile?.applicationStatus || profile?.kycStatus || 'submitted').replace(
              /_/g,
              ' ',
            )}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onViewProfile}
            className="flex-1 rounded-2xl bg-[var(--navy)] px-4 py-3 text-sm font-semibold text-white hover:bg-black"
          >
            View My Profile
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Continue browsing
          </button>
        </div>
      </div>
    </>
  )
}

export default WelcomeProfilePopup
