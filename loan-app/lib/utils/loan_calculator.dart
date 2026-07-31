import 'dart:math' as math;

import 'package:intl/intl.dart';

/// Port of `frontend/src/utils/loanCalculator.js`. Rounding follows the JS
/// version step for step so displayed amounts match the web app exactly.
const int maxLoanAmount = 200000;
const double annualInterestRate = 0.24;
const int loanTenureMonths = 12;
const double processingFeeRate = 0.02;
const int offerValidityDays = 7;
const int loanAmountStep = 1000;

final NumberFormat _inr = NumberFormat.decimalPattern('en_IN');

String formatCurrency(num amount) => '₹${_inr.format(amount.round())}';

/// Snap entered amount to a clean ₹1,000 step used in real loan offers.
int normalizeLoanAmount(num amount) {
  final value = amount.clamp(0, maxLoanAmount);
  if (value <= 0) return 0;
  if (value < loanAmountStep) return value.round();

  final stepped = (value / loanAmountStep).round() * loanAmountStep;
  return math.min(stepped, maxLoanAmount);
}

int calculateEmi(
  num principal, {
  double annualRate = annualInterestRate,
  int tenureMonths = loanTenureMonths,
}) {
  if (principal <= 0) return 0;
  final monthlyRate = annualRate / 12;
  final factor = math.pow(1 + monthlyRate, tenureMonths);
  final emi = (principal * monthlyRate * factor) / (factor - 1);
  return emi.round();
}

/// `toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })`
String getOfferValidityLabel([DateTime? validUntil]) =>
    DateFormat('dd MMM yyyy').format(validUntil ?? DateTime.now());

/// `setMonth(month + n)` in JS overflows into the next year and clamps day
/// overflow by rolling forward, which `DateTime` reproduces natively.
DateTime _addMonths(DateTime date, int months) =>
    DateTime(date.year, date.month + months, date.day);

class _OfferValidity {
  const _OfferValidity(this.validUntil, this.label, this.iso);

  final DateTime validUntil;
  final String label;
  final String iso;
}

_OfferValidity _buildOfferValidity() {
  final validUntil = DateTime.now().add(const Duration(days: offerValidityDays));
  return _OfferValidity(
    validUntil,
    'Valid until ${getOfferValidityLabel(validUntil)}',
    validUntil.toUtc().toIso8601String(),
  );
}

class RepaymentRow {
  const RepaymentRow({
    required this.installment,
    required this.month,
    required this.date,
    required this.emi,
    required this.emiLabel,
    required this.principal,
    required this.principalLabel,
    required this.interest,
    required this.interestLabel,
    required this.balance,
    required this.balanceLabel,
  });

  final int installment;
  final String month;
  final String date;
  final int emi;
  final String emiLabel;
  final int principal;
  final String principalLabel;
  final int interest;
  final String interestLabel;
  final int balance;
  final String balanceLabel;
}

class _LoanBreakdown {
  const _LoanBreakdown({
    required this.amount,
    required this.emi,
    required this.processingFee,
    required this.netCreditedAmount,
    required this.totalInterest,
    required this.totalPayable,
    required this.schedule,
    required this.validity,
  });

  final int amount;
  final int emi;
  final int processingFee;
  final int netCreditedAmount;
  final int totalInterest;
  final int totalPayable;
  final List<RepaymentRow> schedule;
  final _OfferValidity validity;
}

_LoanBreakdown? _computeLoanBreakdown(
  num principal, {
  int months = loanTenureMonths,
  double annualRate = annualInterestRate,
}) {
  final amount = normalizeLoanAmount(principal);
  if (amount <= 0) return null;

  final monthlyRate = annualRate / 12;
  final emi = calculateEmi(amount, annualRate: annualRate, tenureMonths: months);
  final processingFee = (amount * processingFeeRate).round();
  final netCreditedAmount = amount - processingFee;
  final validity = _buildOfferValidity();

  var balance = amount;
  var totalInterest = 0;
  final startDate = _addMonths(DateTime.now(), 1);
  final schedule = <RepaymentRow>[];

  for (var index = 0; index < months; index++) {
    final interest = (balance * monthlyRate).round();
    final isLast = index == months - 1;
    final principalPart = isLast
        ? balance
        : math.min(emi - interest, balance);
    final installmentAmount = principalPart + interest;

    balance = math.max(balance - principalPart, 0);
    totalInterest += interest;

    final dueDate = _addMonths(startDate, index);

    schedule.add(
      RepaymentRow(
        installment: index + 1,
        month: 'Month ${index + 1}',
        date: DateFormat('dd MMM yyyy').format(dueDate),
        emi: installmentAmount,
        emiLabel: formatCurrency(installmentAmount),
        principal: principalPart,
        principalLabel: formatCurrency(principalPart),
        interest: interest,
        interestLabel: formatCurrency(interest),
        balance: balance,
        balanceLabel: formatCurrency(balance),
      ),
    );
  }

  final totalPayable = schedule.fold<int>(0, (sum, row) => sum + row.emi);

  return _LoanBreakdown(
    amount: amount,
    emi: emi,
    processingFee: processingFee,
    netCreditedAmount: netCreditedAmount,
    totalInterest: totalInterest,
    totalPayable: totalPayable,
    schedule: schedule,
    validity: validity,
  );
}

class LoanOffer {
  const LoanOffer({
    required this.loanAmount,
    required this.interestRateLabel,
    required this.processingFee,
    required this.processingFeeLabel,
    required this.loanTenureLabel,
    required this.emi,
    required this.emiLabel,
    required this.totalPayable,
    required this.totalPayableLabel,
    required this.netCreditedAmount,
    required this.offerValidityLabel,
    required this.validUntil,
  });

  final int loanAmount;
  final String interestRateLabel;
  final int processingFee;
  final String processingFeeLabel;
  final String loanTenureLabel;
  final int emi;
  final String emiLabel;
  final int totalPayable;
  final String totalPayableLabel;
  final int netCreditedAmount;
  final String offerValidityLabel;
  final String validUntil;
}

LoanOffer calculateLoanOffer(num principal) {
  final breakdown = _computeLoanBreakdown(principal);

  if (breakdown == null) {
    final validity = _buildOfferValidity();
    return LoanOffer(
      loanAmount: 0,
      interestRateLabel: '24% p.a.',
      processingFee: 0,
      processingFeeLabel: formatCurrency(0),
      loanTenureLabel: '$loanTenureMonths Months',
      emi: 0,
      emiLabel: '${formatCurrency(0)} / month',
      totalPayable: 0,
      totalPayableLabel: formatCurrency(0),
      netCreditedAmount: 0,
      offerValidityLabel: validity.label,
      validUntil: validity.iso,
    );
  }

  return LoanOffer(
    loanAmount: breakdown.amount,
    interestRateLabel: '24% p.a.',
    processingFee: breakdown.processingFee,
    processingFeeLabel: '${formatCurrency(breakdown.processingFee)} (2%)',
    loanTenureLabel: '$loanTenureMonths Months',
    emi: breakdown.emi,
    emiLabel: '${formatCurrency(breakdown.emi)} / month',
    totalPayable: breakdown.totalPayable,
    totalPayableLabel: formatCurrency(breakdown.totalPayable),
    netCreditedAmount: breakdown.netCreditedAmount,
    offerValidityLabel: breakdown.validity.label,
    validUntil: breakdown.validity.iso,
  );
}

class RepaymentSummary {
  const RepaymentSummary({
    required this.loanAmount,
    required this.loanAmountLabel,
    required this.interestRateLabel,
    required this.monthlyInterestRateLabel,
    required this.processingFee,
    required this.processingFeeLabel,
    required this.loanTenureLabel,
    required this.emi,
    required this.emiLabel,
    required this.totalInterest,
    required this.totalInterestLabel,
    required this.totalPayable,
    required this.totalPayableLabel,
    required this.netCreditedAmount,
    required this.netCreditedAmountLabel,
    required this.offerValidityLabel,
  });

  final int loanAmount;
  final String loanAmountLabel;
  final String interestRateLabel;
  final String monthlyInterestRateLabel;
  final int processingFee;
  final String processingFeeLabel;
  final String loanTenureLabel;
  final int emi;
  final String emiLabel;
  final int totalInterest;
  final String totalInterestLabel;
  final int totalPayable;
  final String totalPayableLabel;
  final int netCreditedAmount;
  final String netCreditedAmountLabel;
  final String offerValidityLabel;
}

class DetailedRepayment {
  const DetailedRepayment({required this.schedule, required this.summary});

  final List<RepaymentRow> schedule;
  final RepaymentSummary? summary;
}

DetailedRepayment buildDetailedRepaymentSchedule(
  num principal, {
  int months = loanTenureMonths,
  double annualRate = annualInterestRate,
}) {
  final breakdown = _computeLoanBreakdown(
    principal,
    months: months,
    annualRate: annualRate,
  );
  if (breakdown == null) {
    return const DetailedRepayment(schedule: [], summary: null);
  }

  return DetailedRepayment(
    schedule: breakdown.schedule,
    summary: RepaymentSummary(
      loanAmount: breakdown.amount,
      loanAmountLabel: formatCurrency(breakdown.amount),
      interestRateLabel: '24% p.a.',
      monthlyInterestRateLabel: '2% per month',
      processingFee: breakdown.processingFee,
      processingFeeLabel: '${formatCurrency(breakdown.processingFee)} (2%)',
      loanTenureLabel: '$loanTenureMonths Months',
      emi: breakdown.emi,
      emiLabel: '${formatCurrency(breakdown.emi)} / month',
      totalInterest: breakdown.totalInterest,
      totalInterestLabel: formatCurrency(breakdown.totalInterest),
      totalPayable: breakdown.totalPayable,
      totalPayableLabel: formatCurrency(breakdown.totalPayable),
      netCreditedAmount: breakdown.netCreditedAmount,
      netCreditedAmountLabel: formatCurrency(breakdown.netCreditedAmount),
      offerValidityLabel: breakdown.validity.label,
    ),
  );
}

/// Kept for the disbursal screen, which only shows the first few installments.
List<RepaymentRow> buildRepaymentPreview(num principal, {int previewCount = 3}) {
  final detailed = buildDetailedRepaymentSchedule(principal);
  return detailed.schedule.take(previewCount).toList();
}
