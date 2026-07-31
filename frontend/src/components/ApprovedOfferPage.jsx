import { useEffect, useMemo, useRef, useState } from 'react'
import CelebrationOverlay from './CelebrationOverlay'
import LoanProcessLayout from './LoanProcessLayout'
import { SectionCard, SupportSection, InfoRow } from './ProcessUi'
import {
  MAX_LOAN_AMOUNT,
  buildDetailedRepaymentSchedule,
  calculateLoanOffer,
  formatCurrency,
  normalizeLoanAmount,
} from '../utils/loanCalculator'

const CELEBRATION_MS = 2000

function ApprovedOfferPage({ onContinue, onBack }) {
  const [loanAmountInput, setLoanAmountInput] = useState('')
  const [amountApplied, setAmountApplied] = useState(false)
  const [celebrating, setCelebrating] = useState(false)
  const [applyError, setApplyError] = useState('')
  const amountInputRef = useRef(null)
  const celebrationTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (celebrationTimerRef.current) {
        clearTimeout(celebrationTimerRef.current)
      }
    }
  }, [])

  const rawLoanAmount = Math.min(Number(loanAmountInput.replace(/\D/g, '')) || 0, MAX_LOAN_AMOUNT)
  const loanAmount = normalizeLoanAmount(rawLoanAmount)
  const amountWasAdjusted = rawLoanAmount > 0 && loanAmount !== rawLoanAmount
  const offer = useMemo(() => calculateLoanOffer(loanAmount), [loanAmount])
  const repaymentDetails = useMemo(() => buildDetailedRepaymentSchedule(loanAmount), [loanAmount])

  const canApply = loanAmount > 0 && !celebrating
  const canAccept = amountApplied && loanAmount > 0 && !celebrating

  function handleAmountChange(event) {
    const digits = event.target.value.replace(/\D/g, '').slice(0, String(MAX_LOAN_AMOUNT).length)
    setLoanAmountInput(digits)
    setAmountApplied(false)
    setApplyError('')
  }

  function handleApplyAmount() {
    if (celebrating) return

    if (loanAmount <= 0) {
      setApplyError('Please enter a valid loan amount first.')
      amountInputRef.current?.focus()
      return
    }

    if (amountWasAdjusted) {
      setLoanAmountInput(String(loanAmount))
    }

    setApplyError('')
    setAmountApplied(false)
    setCelebrating(true)

    if (celebrationTimerRef.current) {
      clearTimeout(celebrationTimerRef.current)
    }

    celebrationTimerRef.current = setTimeout(() => {
      setCelebrating(false)
      setAmountApplied(true)
      celebrationTimerRef.current = null
    }, CELEBRATION_MS)
  }

  function handleNext() {
    if (!canAccept) return
    onContinue({
      loanAmount: offer.loanAmount,
      processingFee: offer.processingFee,
      emi: offer.emi,
      totalPayable: offer.totalPayable,
      netCreditedAmount: offer.netCreditedAmount,
      offerValidUntil: offer.validUntil,
    })
  }

  return (
    <>
      <CelebrationOverlay
        show={celebrating}
        message="Amount applied successfully!"
        amountLabel={loanAmount > 0 ? formatCurrency(loanAmount) : ''}
      />

      <LoanProcessLayout
        activeStep={2}
        onContinue={handleNext}
        onBack={onBack}
        continueLabel="Next"
        continueDisabled={!canAccept}
        continueClassName={amountApplied ? 'accept-offer-ready' : ''}
      >
        <SectionCard title="Enter Loan Amount" className="overflow-hidden">
          <p className="mb-4 text-sm leading-relaxed text-slate-600">
            Enter the amount you want to apply for, up to {formatCurrency(MAX_LOAN_AMOUNT)}. Amounts
            are rounded to the nearest ₹1,000 for your offer.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <div className="relative min-w-0 flex-1">
              <label htmlFor="loan-amount-input" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Loan amount
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                  ₹
                </span>
                <input
                  id="loan-amount-input"
                  ref={amountInputRef}
                  type="text"
                  inputMode="numeric"
                  value={loanAmountInput}
                  onChange={handleAmountChange}
                  placeholder="Enter amount"
                  disabled={celebrating}
                  className="w-full rounded-xl border border-slate-300 py-3 pl-8 pr-3 text-base font-semibold text-slate-800 outline-none focus:border-[var(--brand)] disabled:bg-slate-100 sm:text-lg"
                />
              </div>
            </div>

            <div className="sm:flex sm:w-auto sm:shrink-0 sm:flex-col sm:justify-end">
              <span className="mb-1.5 hidden text-xs font-semibold uppercase tracking-wide text-transparent sm:block">
                Action
              </span>
              <button
                type="button"
                onClick={handleApplyAmount}
                disabled={!canApply}
                className="w-full min-h-[48px] rounded-xl bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-deep)] disabled:cursor-not-allowed disabled:bg-slate-300 sm:min-w-[148px] sm:whitespace-nowrap"
              >
                {celebrating ? 'Applying...' : 'Apply amount'}
              </button>
            </div>
          </div>

          {applyError && (
            <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{applyError}</p>
          )}

          {loanAmount > 0 && (
            <div
              className={`mt-3 rounded-xl border px-3 py-2.5 sm:px-4 sm:py-3 ${
                amountApplied
                  ? 'border-green-200 bg-green-50'
                  : 'border-[var(--brand-soft)] bg-[var(--brand-soft)]/40'
              }`}
            >
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Offer amount</p>
              <p className="mt-0.5 text-lg font-bold text-[var(--brand)] sm:text-xl">{formatCurrency(loanAmount)}</p>
              {amountWasAdjusted ? (
                <p className="mt-1 text-xs text-slate-500">
                  Adjusted from {formatCurrency(rawLoanAmount)} to the nearest ₹1,000.
                </p>
              ) : null}
            </div>
          )}

          {amountApplied && !celebrating && (
            <p className="mt-3 flex items-start gap-2 rounded-xl bg-green-50 px-3 py-2.5 text-sm font-medium text-green-700">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                ✓
              </span>
              <span>Great! Scroll down and tap Next to continue.</span>
            </p>
          )}
        </SectionCard>

        {loanAmount > 0 && repaymentDetails.summary ? (
          <>
            <SectionCard title="Offer Summary">
              <InfoRow label="Loan Amount" value={repaymentDetails.summary.loanAmountLabel} />
              <InfoRow label="Interest Rate" value={repaymentDetails.summary.interestRateLabel} />
              <InfoRow label="Monthly Interest" value={repaymentDetails.summary.monthlyInterestRateLabel} />
              <InfoRow label="Processing Fee" value={repaymentDetails.summary.processingFeeLabel} />
              <InfoRow label="Loan Tenure" value={repaymentDetails.summary.loanTenureLabel} />
              <InfoRow label="Monthly EMI" value={repaymentDetails.summary.emiLabel} />
              <InfoRow label="Total Interest" value={repaymentDetails.summary.totalInterestLabel} />
              <InfoRow label="Total Payable" value={repaymentDetails.summary.totalPayableLabel} />
              <InfoRow
                label="Net Credited Amount"
                value={repaymentDetails.summary.netCreditedAmountLabel}
                highlight
              />
              <InfoRow label="Offer Validity" value={repaymentDetails.summary.offerValidityLabel} />
            </SectionCard>

            <SectionCard title="EMI Repayment Schedule">
              <p className="mb-3 text-sm text-slate-600">
                Fixed monthly EMI of {repaymentDetails.summary.emiLabel} for 11 months. The final EMI
                may differ slightly due to rounding on the reducing balance.
              </p>
              <div className="-mx-1 overflow-x-auto px-1">
                <table className="min-w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="pb-2 pr-3 font-medium">EMI #</th>
                      <th className="pb-2 pr-3 font-medium">Due Date</th>
                      <th className="pb-2 pr-3 font-medium">EMI</th>
                      <th className="pb-2 pr-3 font-medium">Principal</th>
                      <th className="pb-2 pr-3 font-medium">Interest</th>
                      <th className="pb-2 font-medium">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {repaymentDetails.schedule.map((row) => (
                      <tr key={row.installment} className="border-b border-slate-100 last:border-0">
                        <td className="py-2.5 pr-3 font-medium text-slate-700">{row.installment}</td>
                        <td className="py-2.5 pr-3 text-slate-600">{row.date}</td>
                        <td className="py-2.5 pr-3 font-medium text-slate-900">{row.emiLabel}</td>
                        <td className="py-2.5 pr-3 text-slate-700">{row.principalLabel}</td>
                        <td className="py-2.5 pr-3 text-slate-700">{row.interestLabel}</td>
                        <td className="py-2.5 text-slate-600">{row.balanceLabel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          </>
        ) : null}

        <SectionCard title="Loan Terms & Conditions">
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600">
            <li>Interest is charged on reducing balance basis.</li>
            <li>Processing fee is deducted at the time of disbursement.</li>
            <li>Early repayment is allowed without foreclosure penalty.</li>
            <li>Late payment charges apply as per agreement.</li>
          </ul>
        </SectionCard>

        <SupportSection />
      </LoanProcessLayout>
    </>
  )
}

export default ApprovedOfferPage
