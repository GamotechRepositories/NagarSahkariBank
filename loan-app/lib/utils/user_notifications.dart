import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

/// Port of `frontend/src/utils/userNotifications.js`. The web app keeps read
/// ids in `localStorage`; this uses `SharedPreferences` with the same key
/// shape so behaviour matches per mobile number.
const String _readKeyPrefix = 'loan_read_notifications_';

class UserNotification {
  const UserNotification({
    required this.id,
    required this.title,
    required this.message,
    this.type,
    this.createdAt,
  });

  factory UserNotification.fromJson(Map<String, dynamic> json) {
    return UserNotification(
      id: '${json['id'] ?? ''}',
      title: '${json['title'] ?? ''}',
      message: '${json['message'] ?? ''}',
      type: json['type'] as String?,
      createdAt: json['createdAt'] as String?,
    );
  }

  final String id;
  final String title;
  final String message;
  final String? type;
  final String? createdAt;

  bool get isApproved => type == 'loan_approved';
}

List<UserNotification> notificationsFromProfile(Map<String, dynamic>? profile) {
  final raw = profile?['notifications'];
  if (raw is! List) return const [];
  return raw
      .whereType<Map>()
      .map((item) => UserNotification.fromJson(Map<String, dynamic>.from(item)))
      .toList();
}

Future<List<String>> getReadNotificationIds(String? mobile) async {
  if (mobile == null || mobile.isEmpty) return const [];
  final prefs = await SharedPreferences.getInstance();
  final raw = prefs.getString('$_readKeyPrefix$mobile');
  if (raw == null || raw.isEmpty) return const [];
  try {
    final decoded = jsonDecode(raw);
    if (decoded is List) return decoded.map((e) => '$e').toList();
  } catch (_) {
    // Corrupt payload behaves like an empty list, matching the JS try/catch.
  }
  return const [];
}

Future<void> markNotificationRead(String? mobile, String notificationId) async {
  if (mobile == null || mobile.isEmpty || notificationId.isEmpty) return;
  final existing = await getReadNotificationIds(mobile);
  if (existing.contains(notificationId)) return;
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString(
    '$_readKeyPrefix$mobile',
    jsonEncode([...existing, notificationId]),
  );
}

Future<void> markAllNotificationsRead(
  String? mobile,
  List<String> notificationIds,
) async {
  if (mobile == null || mobile.isEmpty || notificationIds.isEmpty) return;
  final merged = {...await getReadNotificationIds(mobile), ...notificationIds};
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString('$_readKeyPrefix$mobile', jsonEncode(merged.toList()));
}

/// Port of `isLoanFullyApproved`.
bool isLoanFullyApproved(Map<String, dynamic>? profile) {
  if (profile == null) return false;
  if (profile['loanApproved'] == true) return true;

  final application = profile['application'];
  if (application is! Map<String, dynamic>) {
    return profile['applicationStatus'] == 'verified' ||
        profile['kycStatus'] == 'verified';
  }
  if (application['status'] == 'verified') return true;

  final counts = application['counts'];
  if (counts is! Map<String, dynamic>) return false;
  final pending = (counts['pending'] as num?)?.toInt() ?? 0;
  final rejected = (counts['rejected'] as num?)?.toInt() ?? 0;
  final accepted = (counts['accepted'] as num?)?.toInt() ?? 0;
  return pending == 0 && rejected == 0 && accepted > 0;
}
