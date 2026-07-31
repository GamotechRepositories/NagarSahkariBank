export const MAX_LOAN_AMOUNT = 200000
export const ANNUAL_INTEREST_RATE = 0.24
export const LOAN_TENURE_MONTHS = 12
export const PROCESSING_FEE_RATE = 0.02
export const OFFER_VALIDITY_DAYS = 7
export const LOAN_AMOUNT_STEP = 1000

export function formatCurrency(amount) {
  const value = Math.round(Number(amount) || 0)
  return `₹${value.toLocaleString('en-IN')}`
}

/** Snap entered amount to a clean ₹1,000 step used in real loan offers. */
export function normalizeLoanAmount(amount) {
  const value = Math.min(Math.max(Number(amount) || 0, 0), MAX_LOAN_AMOUNT)
  if (value <= 0) return 0
  if (value < LOAN_AMOUNT_STEP) return value

  const stepped = Math.round(value / LOAN_AMOUNT_STEP) * LOAN_AMOUNT_STEP
  return Math.min(stepped, MAX_LOAN_AMOUNT)
}

export function calculateEmi(principal, annualRate = ANNUAL_INTEREST_RATE, tenureMonths = LOAN_TENURE_MONTHS) {
  if (!principal || principal <= 0) return 0

  const monthlyRate = annualRate / 12
  const factor = (1 + monthlyRate) ** tenureMonths
  const emi = (principal * monthlyRate * factor) / (factor - 1)

  return Math.round(emi)
}

export function getOfferValidityLabel(validUntil = new Date()) {
  return validUntil.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function buildOfferValidity() {
  const validUntil = new Date()
  validUntil.setDate(validUntil.getDate() + OFFER_VALIDITY_DAYS)
  return {
    validUntil,
    offerValidityLabel: `Valid until ${getOfferValidityLabel(validUntil)}`,
    validUntilIso: validUntil.toISOString(),
  }
}

function computeLoanBreakdown(
  principal,
  months = LOAN_TENURE_MONTHS,
  annualRate = ANNUAL_INTEREST_RATE,
) {
  const amount = normalizeLoanAmount(principal)
  if (amount <= 0) {
    return null
  }

  const monthlyRate = annualRate / 12
  const emi = calculateEmi(amount, annualRate, months)
  const processingFee = Math.round(amount * PROCESSING_FEE_RATE)
  const netCreditedAmount = amount - processingFee
  const validity = buildOfferValidity()

  let balance = amount
  let totalInterest = 0
  const startDate = new Date()
  startDate.setMonth(startDate.getMonth() + 1)

  const schedule = []

  for (let index = 0; index < months; index += 1) {
    const interest = Math.round(balance * monthlyRate)
    const isLast = index === months - 1
    const principalPart = isLast ? balance : Math.min(emi - interest, balance)
    const installmentAmount = principalPart + interest

    balance = Math.max(balance - principalPart, 0)
    totalInterest += interest

    const dueDate = new Date(startDate)
    dueDate.setMonth(startDate.getMonth() + index)

    schedule.push({
      installment: index + 1,
      month: `Month ${index + 1}`,
      date: dueDate.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      emi: installmentAmount,
      emiLabel: formatCurrency(installmentAmount),
      principal: principalPart,
      principalLabel: formatCurrency(principalPart),
      interest,
      interestLabel: formatCurrency(interest),
      balance,
      balanceLabel: formatCurrency(balance),
    })
  }

  const totalPayable = schedule.reduce((sum, row) => sum + row.emi, 0)

  return {
    amount,
    emi,
    processingFee,
    netCreditedAmount,
    totalInterest,
    totalPayable,
    schedule,
    monthlyRate,
    validity,
  }
}

export function calculateLoanOffer(principal) {
  const breakdown = computeLoanBreakdown(principal)
  if (!breakdown) {
    return {
      loanAmount: 0,
      interestRateLabel: '24% p.a.',
      processingFee: 0,
      processingFeeLabel: formatCurrency(0),
      loanTenureLabel: `${LOAN_TENURE_MONTHS} Months`,
      emi: 0,
      emiLabel: `${formatCurrency(0)} / month`,
      totalPayable: 0,
      totalPayableLabel: formatCurrency(0),
      netCreditedAmount: 0,
      offerValidityLabel: buildOfferValidity().offerValidityLabel,
      validUntil: buildOfferValidity().validUntilIso,
    }
  }

  const {
    amount,
    emi,
    processingFee,
    netCreditedAmount,
    totalPayable,
    validity,
  } = breakdown

  return {
    loanAmount: amount,
    interestRateLabel: '24% p.a.',
    processingFee,
    processingFeeLabel: `${formatCurrency(processingFee)} (2%)`,
    loanTenureLabel: `${LOAN_TENURE_MONTHS} Months`,
    emi,
    emiLabel: `${formatCurrency(emi)} / month`,
    totalPayable,
    totalPayableLabel: formatCurrency(totalPayable),
    netCreditedAmount,
    offerValidityLabel: validity.offerValidityLabel,
    validUntil: validity.validUntilIso,
  }
}

export function buildRepaymentSchedule(principal, months = LOAN_TENURE_MONTHS, previewCount = 3) {
  const detailed = buildDetailedRepaymentSchedule(principal, months)
  return {
    schedule: detailed.schedule,
    preview: detailed.schedule.slice(0, previewCount),
  }
}

export function buildDetailedRepaymentSchedule(
  principal,
  months = LOAN_TENURE_MONTHS,
  annualRate = ANNUAL_INTEREST_RATE,
) {
  const breakdown = computeLoanBreakdown(principal, months, annualRate)
  if (!breakdown) {
    return {
      schedule: [],
      summary: null,
    }
  }

  const {
    amount,
    emi,
    processingFee,
    netCreditedAmount,
    totalInterest,
    totalPayable,
    schedule,
    monthlyRate,
    validity,
  } = breakdown

  return {
    schedule,
    summary: {
      loanAmount: amount,
      loanAmountLabel: formatCurrency(amount),
      interestRateLabel: '24% p.a.',
      monthlyInterestRateLabel: '2% per month',
      processingFee,
      processingFeeLabel: `${formatCurrency(processingFee)} (2%)`,
      loanTenureLabel: `${LOAN_TENURE_MONTHS} Months`,
      emi,
      emiLabel: `${formatCurrency(emi)} / month`,
      totalInterest,
      totalInterestLabel: formatCurrency(totalInterest),
      totalPayable,
      totalPayableLabel: formatCurrency(totalPayable),
      netCreditedAmount,
      netCreditedAmountLabel: formatCurrency(netCreditedAmount),
      offerValidityLabel: validity.offerValidityLabel,
    },
  }
}
