class ApplicationData {
  const ApplicationData({
    this.pan = '',
    this.pinCode = '',
    this.loanPurpose = '',
    this.loanAmount = 0,
    this.processingFee = 0,
    this.emi = 0,
    this.totalPayable = 0,
    this.netCreditedAmount = 0,
    this.offerValidUntil = '',
  });

  final String pan;
  final String pinCode;
  final String loanPurpose;
  final int loanAmount;
  final int processingFee;
  final int emi;
  final int totalPayable;
  final int netCreditedAmount;
  final String offerValidUntil;

  ApplicationData copyWith({
    String? pan,
    String? pinCode,
    String? loanPurpose,
    int? loanAmount,
    int? processingFee,
    int? emi,
    int? totalPayable,
    int? netCreditedAmount,
    String? offerValidUntil,
  }) {
    return ApplicationData(
      pan: pan ?? this.pan,
      pinCode: pinCode ?? this.pinCode,
      loanPurpose: loanPurpose ?? this.loanPurpose,
      loanAmount: loanAmount ?? this.loanAmount,
      processingFee: processingFee ?? this.processingFee,
      emi: emi ?? this.emi,
      totalPayable: totalPayable ?? this.totalPayable,
      netCreditedAmount: netCreditedAmount ?? this.netCreditedAmount,
      offerValidUntil: offerValidUntil ?? this.offerValidUntil,
    );
  }
}

class StatusMessage {
  const StatusMessage({required this.type, required this.message});
  final String type; // success | error
  final String message;
}

class PickedUpload {
  const PickedUpload({required this.path, required this.name, this.bytes});
  final String path;
  final String name;
  final List<int>? bytes;
}
