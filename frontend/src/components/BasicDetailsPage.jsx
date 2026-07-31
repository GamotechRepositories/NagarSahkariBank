import { useState } from 'react'
import LoanProcessLayout from './LoanProcessLayout'
import { getPanError, isValidPanFormat, sanitizePan } from '../utils/idValidation'

function BasicDetailsPage({ onContinue, onBack }) {
  const [pan, setPan] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [loanPurpose, setLoanPurpose] = useState('')
  const [panTouched, setPanTouched] = useState(false)

  const panError = panTouched ? getPanError(pan) : ''
  const canContinue = isValidPanFormat(pan) && pinCode.length === 6 && loanPurpose

  function handleContinue() {
    setPanTouched(true)
    if (!canContinue) return
    onContinue({ pan: sanitizePan(pan), pinCode, loanPurpose })
  }

  return (
    <LoanProcessLayout
      activeStep={1}
      onContinue={handleContinue}
      onBack={onBack}
      continueDisabled={!canContinue}
    >
      <div className="space-y-6 sm:space-y-7 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-7 lg:space-y-0">
        <div className="relative pt-3">
          <label className="pointer-events-none absolute left-3 top-0 z-10 bg-white px-1 text-xs font-semibold text-slate-600 sm:text-sm">
            PAN Number
          </label>
          <input
            value={pan}
            onChange={(event) => setPan(sanitizePan(event.target.value))}
            onBlur={() => setPanTouched(true)}
            placeholder="Enter Your PAN"
            maxLength={10}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-600 outline-none placeholder:text-slate-400 focus:border-blue-400"
          />
          {panError && <p className="mt-1.5 text-xs text-red-600">{panError}</p>}
        </div>

        <div className="relative pt-3">
          <label className="pointer-events-none absolute left-3 top-0 z-10 bg-white px-1 text-xs font-semibold text-slate-600 sm:text-sm">
            PIN Code
          </label>
          <input
            value={pinCode}
            onChange={(event) => setPinCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="Enter PIN Code"
            maxLength={6}
            inputMode="numeric"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-600 outline-none placeholder:text-slate-400 focus:border-blue-400"
          />
        </div>

        <div className="relative pt-3 lg:col-span-2">
          <label className="pointer-events-none absolute left-3 top-0 z-10 bg-white px-1 text-xs font-semibold text-slate-600 sm:text-sm">
            Loan Purpose
          </label>
          <div className="relative">
            <select
              value={loanPurpose}
              onChange={(event) => setLoanPurpose(event.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-500 outline-none focus:border-blue-400"
            >
              <option value="">Select Loan Purpose</option>
              <option value="medical">Medical Emergency</option>
              <option value="education">Education</option>
              <option value="home">Home Expenses</option>
              <option value="travel">Travel</option>
              <option value="business">Business</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-base text-slate-400">
              ˅
            </span>
          </div>
        </div>
      </div>
    </LoanProcessLayout>
  )
}

export default BasicDetailsPage
