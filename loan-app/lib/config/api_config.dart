/// Backend API used by the Flutter app.
///
/// Override at build/run time for local development:
/// `flutter run --dart-define=API_BASE_URL=http://192.168.1.10:5000`
class ApiConfig {
  static const String _fromEnv = String.fromEnvironment('API_BASE_URL');
  static const String _default = 'https://api.sakaarfoundation.org';

  static String get baseUrl {
    final raw = _fromEnv.isNotEmpty ? _fromEnv : _default;
    return raw.endsWith('/') ? raw.substring(0, raw.length - 1) : raw;
  }

  static const String userTokenKey = 'user_auth_token';
}
