/// Strict OTP verify success check.
/// Production historically returned HTTP 200 + success:true even when MSG91
/// said type:"error" (e.g. "OTP not match"). Clients must reject those.
bool isOtpVerifyAccepted(Map<String, dynamic>? body) {
  if (body == null) return false;
  if (body['success'] != true) return false;

  final nested = body['data'];
  if (nested is Map) {
    final nestedType = nested['type']?.toString().toLowerCase() ?? '';
    if (nestedType == 'error' || nestedType == 'failed' || nestedType == 'failure') {
      return false;
    }
    if (nested['debug'] == true) return false;
  }

  final nestedMessage = nested is Map ? nested['message']?.toString() ?? '' : '';
  final message = '${body['message'] ?? ''} $nestedMessage'.toLowerCase();
  if (message.contains('not match') ||
      message.contains('invalid') ||
      message.contains('expired') ||
      message.contains('already verified') ||
      message.contains('no otp') ||
      message.contains('failed') ||
      message.contains('debug mode')) {
    return false;
  }

  return true;
}

String otpFailureMessage(Map<String, dynamic>? body) {
  if (body == null) return 'Invalid OTP. Please try again.';
  final nested = body['data'];
  final nestedMessage = nested is Map ? nested['message']?.toString() : null;
  return body['message']?.toString() ?? nestedMessage ?? 'Invalid OTP. Please try again.';
}
