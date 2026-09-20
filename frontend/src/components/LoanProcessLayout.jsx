import { COMPANY } from '../website/websiteContent'

const STEPS = [
  { number: 1, label: 'Enter\nBasic Details' },
  { number: 2, label: 'Approved\nOffer' },
  { number: 3, label: 'Complete\nKYC' },
  { number: 4, label: 'Disburse\nLoan' },
]

function Stepper({ activeStep }) {
  return (
    <>
      <div className="mb-5 lg:hidden">
        <div className="relative flex items-start justify-between px-1">
          <div className="absolute left-[14%] right-[14%] top-[18px] h-px bg-slate-300" />
          {STEPS.map((step) => {
            const isActive = step.number === activeStep
            const isDone = step.number < activeStep
            return (
              <div key={step.number} className="relative z-10 flex w-[22%] flex-col items-center text-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold sm:h-9 sm:w-9 sm:text-sm ${
                    isActive
                      ? 'border-[var(--brand)] bg-[var(--brand)] text-white'
                      : isDone
                        ? 'border-[var(--brand)] bg-white text-[var(--brand)]'
                        : 'border-slate-300 bg-white text-slate-400'
                  }`}
                >
                  {step.number}
                </div>
                <p
                  className={`mt-1.5 whitespace-pre-line text-[10px] leading-tight sm:text-xs ${
                    isActive ? 'font-medium text-slate-900' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="relative flex flex-col gap-6">
          <div className="absolute bottom-4 left-[18px] top-4 w-px bg-slate-300" />
          {STEPS.map((step) => {
            const isActive = step.number === activeStep
            const isDone = step.number < activeStep
            return (
              <div key={step.number} className="relative z-10 flex items-start gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                    isActive
                      ? 'border-[var(--brand)] bg-[var(--brand)] text-white'
                      : isDone
                        ? 'border-[var(--brand)] bg-white text-[var(--brand)]'
                        : 'border-slate-300 bg-white text-slate-400'
                  }`}
                >
                  {step.number}
                </div>
                <p
                  className={`whitespace-pre-line pt-1.5 text-sm leading-tight ${
                    isActive ? 'font-medium text-slate-900' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

function LoanProcessLayout({
  activeStep,
  children,
  onContinue,
  onBack,
  continueLabel = 'Continue',
  continueDisabled = false,
  continueLoading = false,
  continueClassName = '',
  secondaryLabel,
  onSecondary,
}) {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-800 lg:px-4 lg:py-6">
      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col border-slate-200 bg-white shadow-sm lg:min-h-0 lg:rounded-2xl lg:border">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-6">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <span className="text-lg leading-none">←</span>
              Back
            </button>
          ) : (
            <div className="w-16" />
          )}
          <img
            src={COMPANY.logo}
            alt={COMPANY.name}
            className="h-9 w-auto max-w-[10rem] object-contain sm:h-10 sm:max-w-[14rem]"
          />
          <select className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700">
            <option>English</option>
          </select>
        </div>

        {/* Body */}
        <section className="flex-1 px-4 py-4 pb-28 sm:px-6 sm:py-5 sm:pb-6 lg:px-8 lg:pb-5">
          <div className="lg:grid lg:grid-cols-[160px_1fr] lg:gap-8">
            <div className="lg:sticky lg:top-6 lg:self-start">
              <Stepper activeStep={activeStep} />
            </div>
            <div className="mt-4 space-y-4 sm:space-y-5 lg:mt-0">{children}</div>
          </div>
        </section>

        {/* Help */}
        <button
          type="button"
          className="absolute bottom-24 right-3 hidden h-9 w-9 items-center justify-center rounded-full bg-[var(--brand)] text-base text-white shadow-md sm:flex lg:bottom-24 lg:right-6"
          aria-label="Help"
        >
          ?
        </button>

        {/* Footer actions */}
        <div className="sticky bottom-0 z-10 border-t border-slate-200 bg-white/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur sm:px-6 lg:static lg:rounded-b-2xl lg:border-slate-100 lg:bg-white lg:pb-3 lg:backdrop-blur-none">
          <div
            className={`flex gap-3 ${
              secondaryLabel ? 'flex-col sm:flex-row' : ''
            } justify-stretch`}
          >
            <button
              type="button"
              onClick={onContinue}
              disabled={continueDisabled || continueLoading}
              className={`min-h-[48px] w-full rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-deep)] disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto sm:min-w-[160px] ${continueClassName}`}
            >
              {continueLoading ? 'Submitting...' : continueLabel}
            </button>
            {secondaryLabel && (
              <button
                type="button"
                onClick={onSecondary}
                className="min-h-[48px] w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:w-auto sm:min-w-[140px]"
              >
                {secondaryLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoanProcessLayout
