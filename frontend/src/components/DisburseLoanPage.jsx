import { useState } from 'react'
import LoanProcessLayout from './LoanProcessLayout'
import { SectionCard, InfoRow, StatusBadge, DownloadLink, SupportSection } from './ProcessUi'
import { formatCurrency } from '../utils/loanCalculator'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

function maskAccount(value) {
  const digits = String(value || '')
  if (digits.length < 4) return digits || '—'
  return `${'X'.repeat(Math.max(digits.length - 4, 4))}${digits.slice(-4)}`
}

function getFirstEmiDate() {
  const date = new Date()
  date.setMonth(date.getMonth() + 1)
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function DisburseLoanPage({ user, userToken, onContinue, onBack }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loanAmount = user?.loanAmount || 0
  const processingFee = user?.processingFee || 0
  const netCreditedAmount = user?.netCreditedAmount || Math.max(loanAmount - processingFee, 0)
  const emi = user?.emi || 0
  const firstEmiDate = getFirstEmiDate()

  async function handleGoToProfile() {
    if (loading) return
    setLoading(true)
    setError('')

    try {
      if (userToken) {
        const response = await fetch(`${API_BASE}/api/user/loan/complete`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${userToken}` },
        })
        const data = await response.json()
        if (!response.ok || !data.success) {
          setError(data.message || 'Could not finalize your account. Please try again.')
          setLoading(false)
          return
        }
        onContinue(data.data)
        return
      }

      onContinue(user)
    } catch {
      setError('Could not reach the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoanProcessLayout
      activeStep={4}
      onContinue={handleGoToProfile}
      onBack={onBack}
      continueLabel={loading ? 'Opening Profile...' : 'Go to My Profile'}
      continueDisabled={loading}
      continueLoading={loading}
    >
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      <SectionCard>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">Congratulations!</p>
          <p className="mt-2 text-sm text-slate-600">
            Your loan has been successfully disbursed
            {user?.fullName ? ` to ${user.fullName}` : ''}.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Continue to your SAKAAR MICROCREDIT FOUNDATION account to view your full profile.
          </p>
        </div>
      </SectionCard>

      <SectionCard title="Loan Disbursement Status">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Status</span>
          <StatusBadge status="success" />
        </div>
      </SectionCard>

      <SectionCard title="Amount Details">
        <InfoRow label="Approved Amount" value={formatCurrency(loanAmount)} />
        <InfoRow label="Disbursed Amount" value={formatCurrency(loanAmount)} />
        <InfoRow label="Processing Fee Deduction" value={formatCurrency(processingFee)} />
        <InfoRow label="Net Credited Amount" value={formatCurrency(netCreditedAmount)} highlight />
      </SectionCard>

      <SectionCard title="Bank Account Details">
        <InfoRow label="Account Number" value={maskAccount(user?.accountNumber)} />
        <InfoRow label="IFSC Code" value={user?.ifsc || '—'} />
        <InfoRow label="Account Holder" value={user?.fullName || '—'} />
      </SectionCard>

      <SectionCard title="Transaction Details">
        <InfoRow label="UTR / Reference Number" value="UTR982736451029" />
        <InfoRow
          label="Date & Time of Transfer"
          value={new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        />
        <InfoRow label="Expected Credit Status" value="Credited" highlight />
      </SectionCard>

      <SectionCard title="Repayment Details">
        <InfoRow label="EMI Start Date" value={firstEmiDate} />
        <InfoRow label="First EMI Date" value={firstEmiDate} />
        <InfoRow label="Monthly EMI" value={formatCurrency(emi)} />
        <InfoRow label="Total Tenure" value="12 Months" />
      </SectionCard>

      <SectionCard title="Download Documents">
        <div className="space-y-2">
          <DownloadLink label="Download Loan Agreement" />
          <DownloadLink label="Download Repayment Schedule" />
          <DownloadLink label="Download Payment Receipt" />
        </div>
      </SectionCard>

      <SupportSection />
    </LoanProcessLayout>
  )
}

export default DisburseLoanPage
