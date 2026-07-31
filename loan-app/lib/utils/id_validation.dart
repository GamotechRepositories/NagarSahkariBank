import 'package:flutter/material.dart';

import '../config/theme.dart';

final _panRegex = RegExp(r'^[A-Z]{5}[0-9]{4}[A-Z]$');
final _aadhaarRegex = RegExp(r'^[0-9]{12}$');
final _emailRegex = RegExp(r'^[^\s@]+@[^\s@]+\.[^\s@]+$');
final _ifscRegex = RegExp(r'^[A-Z]{4}0[A-Z0-9]{6}$');

const _verhoeffD = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];

const _verhoeffP = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];

String sanitizePan(String? value) {
  final cleaned = (value ?? '').toUpperCase().replaceAll(RegExp(r'[^A-Z0-9]'), '');
  return cleaned.length <= 10 ? cleaned : cleaned.substring(0, 10);
}

String sanitizeAadhaar(String? value) {
  final digits = (value ?? '').replaceAll(RegExp(r'\D'), '');
  return digits.length <= 12 ? digits : digits.substring(0, 12);
}

bool isValidPanFormat(String? value) {
  final pan = sanitizePan(value);
  return pan.length == 10 && _panRegex.hasMatch(pan);
}

bool verhoeffCheck(String number) {
  if (!RegExp(r'^\d+$').hasMatch(number)) return false;
  var checksum = 0;
  final reversed = number.split('').reversed.map(int.parse).toList();
  for (var i = 0; i < reversed.length; i++) {
    checksum = _verhoeffD[checksum][_verhoeffP[i % 8][reversed[i]]];
  }
  return checksum == 0;
}

bool isValidAadhaarFormat(String? value) {
  final aadhaar = sanitizeAadhaar(value);
  if (aadhaar.length != 12 || !_aadhaarRegex.hasMatch(aadhaar)) return false;
  return verhoeffCheck(aadhaar);
}

String getPanError(String? value) {
  final pan = sanitizePan(value);
  if (pan.isEmpty) return 'PAN number is required.';
  if (pan.length != 10) return 'PAN must be exactly 10 characters.';
  if (!_panRegex.hasMatch(pan)) {
    return 'Invalid PAN format. Use 5 letters, 4 digits, then 1 letter (e.g. ABCDE1234F).';
  }
  return '';
}

String getAadhaarError(String? value) {
  final aadhaar = sanitizeAadhaar(value);
  if (aadhaar.isEmpty) return 'Aadhaar number is required.';
  if (aadhaar.length != 12) return 'Aadhaar must be exactly 12 digits.';
  if (!_aadhaarRegex.hasMatch(aadhaar)) return 'Aadhaar must contain only digits.';
  if (!verhoeffCheck(aadhaar)) {
    return 'Invalid Aadhaar number. Please check and try again.';
  }
  return '';
}

String getRequiredError(String? value, String label) {
  if ((value ?? '').trim().isEmpty) return '$label is required.';
  return '';
}

String getEmailError(String? value) {
  final email = (value ?? '').trim();
  if (email.isEmpty) return 'Valid email address is required.';
  if (!_emailRegex.hasMatch(email)) return 'Please enter a valid email address.';
  return '';
}

String getMobileError(String? value, {String label = 'Mobile number'}) {
  final digits = (value ?? '').replaceAll(RegExp(r'\D'), '');
  if (digits.isEmpty) return '$label is required.';
  if (digits.length != 10) return '$label must be 10 digits.';
  return '';
}

String getPinError(String? value) {
  final digits = (value ?? '').replaceAll(RegExp(r'\D'), '');
  if (digits.isEmpty) return 'PIN code is required.';
  if (digits.length != 6) return 'PIN code must be exactly 6 digits.';
  return '';
}

String getUsernameError(String? value) {
  final username = (value ?? '').trim();
  if (username.isEmpty) return 'Username is required.';
  if (username.length < 4) return 'Username must be at least 4 characters.';
  return '';
}

String getPasswordError(String? value) {
  final password = value ?? '';
  if (password.isEmpty) return 'Password is required.';
  if (password.length < 6) return 'Password must be at least 6 characters.';
  return '';
}

String getConfirmPasswordError(String? password, String? confirm) {
  final confirmValue = confirm ?? '';
  if (confirmValue.isEmpty) return 'Please confirm your password.';
  if (confirmValue != (password ?? '')) return 'Passwords do not match.';
  return '';
}

String getIfscError(String? value) {
  final ifsc = (value ?? '').trim().toUpperCase();
  if (ifsc.isEmpty) return 'IFSC code is required.';
  if (ifsc.length != 11 || !_ifscRegex.hasMatch(ifsc)) {
    return 'Invalid IFSC format (e.g. SBIN0001234).';
  }
  return '';
}

String getAccountError(String? value) {
  final digits = (value ?? '').replaceAll(RegExp(r'\D'), '');
  if (digits.isEmpty) return 'Account number is required.';
  if (digits.length < 9) return 'Account number looks too short.';
  return '';
}

String getLoanPurposeError(String? value) {
  if ((value ?? '').trim().isEmpty) return 'Please select a loan purpose.';
  return '';
}

String getGenderError(String? value) {
  if ((value ?? '').trim().isEmpty) return 'Gender is required.';
  return '';
}

String getDobError(DateTime? value) {
  if (value == null) return 'Date of birth is required.';
  return '';
}

/// Progressive validation: format errors show as soon as the user types;
/// empty/required errors show after the field has been touched (blur / tap).
String? liveError({
  required bool touched,
  required String value,
  required String Function(String value) validator,
}) {
  final error = validator(value);
  if (error.isEmpty) return null;
  if (touched || value.trim().isNotEmpty) return error;
  return null;
}

/// InputDecoration with a red border when [hasError] is true.
InputDecoration errorAwareDecoration({
  String? hintText,
  String counterText = '',
  bool hasError = false,
  bool filled = true,
  Color? fillColor,
}) {
  final borderColor = hasError ? AppColors.red600 : AppColors.line;
  final focusedColor = hasError ? AppColors.red600 : AppColors.brand;
  final radius = BorderRadius.circular(AppRadius.field);

  return InputDecoration(
    hintText: hintText,
    counterText: counterText,
    filled: filled,
    fillColor: fillColor ?? AppColors.surface,
    contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
    border: OutlineInputBorder(
      borderRadius: radius,
      borderSide: BorderSide(color: borderColor),
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: radius,
      borderSide: BorderSide(color: borderColor),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: radius,
      borderSide: BorderSide(color: focusedColor, width: 1.5),
    ),
    disabledBorder: OutlineInputBorder(
      borderRadius: radius,
      borderSide: BorderSide(color: hasError ? AppColors.red600 : AppColors.line),
    ),
    errorBorder: OutlineInputBorder(
      borderRadius: radius,
      borderSide: const BorderSide(color: AppColors.red600),
    ),
    focusedErrorBorder: OutlineInputBorder(
      borderRadius: radius,
      borderSide: const BorderSide(color: AppColors.red600, width: 1.5),
    ),
  );
}
