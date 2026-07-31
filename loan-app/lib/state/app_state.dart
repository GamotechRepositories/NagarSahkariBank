import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../config/api_config.dart';
import '../models/models.dart';
import '../services/api_service.dart';

enum AppMode { landing, home, apply }

/// Bottom bar slots on the signed-in shell.
class HomeTab {
  const HomeTab._();

  static const int support = 0;
  static const int home = 1;
  static const int profile = 2;
}

class AppState extends ChangeNotifier {
  AppState({ApiService? api}) : _api = api ?? ApiService();

  final ApiService _api;

  AppMode appMode = AppMode.landing;
  int homeTab = HomeTab.home;
  int currentStep = 0;
  ApplicationData applicationData = const ApplicationData();

  String mobileNumber = '';
  bool consentOne = false;
  bool consentTwo = false;
  bool consentThree = false;
  bool loading = false;
  StatusMessage? status;
  bool showOtpSheet = false;

  String userToken = '';
  Map<String, dynamic>? userProfile;
  bool checkingSession = true;
  bool showSignIn = false;
  bool showWelcomePopup = false;

  String get cleanedMobile {
    final digits = mobileNumber.replaceAll(RegExp(r'\D'), '');
    return digits.length <= 10 ? digits : digits.substring(0, 10);
  }

  bool get isMobileValid => cleanedMobile.length == 10;

  bool get isOtpEnabled => isMobileValid && consentOne && consentTwo && consentThree;

  Future<void> bootstrap() async {
    final prefs = await SharedPreferences.getInstance();
    final existing = prefs.getString(ApiConfig.userTokenKey) ?? '';
    if (existing.isEmpty) {
      checkingSession = false;
      notifyListeners();
      return;
    }

    userToken = existing;
    try {
      final result = await _api.getProfile(existing);
      if (result.statusCode == 401 || result.statusCode == 403) {
        await clearUserSession();
      } else if (result.ok && result.data != null) {
        userProfile = result.data;
        appMode = AppMode.home;
        homeTab = HomeTab.home;
      }
    } catch (_) {
      // Fall back to the landing screen if the profile cannot be restored.
    } finally {
      checkingSession = false;
      notifyListeners();
    }
  }

  Future<void> clearUserSession() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(ApiConfig.userTokenKey);
    userToken = '';
    userProfile = null;
    showWelcomePopup = false;
    appMode = AppMode.landing;
    homeTab = HomeTab.home;
    notifyListeners();
  }

  void startApplication() {
    appMode = AppMode.apply;
    currentStep = 0;
    status = null;
    notifyListeners();
  }

  void goHome() {
    appMode = userProfile != null ? AppMode.home : AppMode.landing;
    homeTab = HomeTab.home;
    currentStep = 0;
    showOtpSheet = false;
    notifyListeners();
  }

  void setHomeTab(int index) {
    if (homeTab == index) return;
    homeTab = index;
    notifyListeners();
  }

  void setMobileNumber(String value) {
    mobileNumber = value.replaceAll(RegExp(r'\D'), '');
    if (mobileNumber.length > 10) mobileNumber = mobileNumber.substring(0, 10);
    status = null;
    notifyListeners();
  }

  void setConsent({bool? one, bool? two, bool? three}) {
    if (one != null) consentOne = one;
    if (two != null) consentTwo = two;
    if (three != null) consentThree = three;
    notifyListeners();
  }

  Future<void> sendOtp() async {
    if (!isOtpEnabled || loading) return;
    loading = true;
    status = null;
    notifyListeners();

    final result = await _api.sendOtp(mobileNumber);
    if (result.ok) {
      status = StatusMessage(type: 'success', message: result.message ?? 'OTP sent successfully!');
      showOtpSheet = true;
    } else {
      status = StatusMessage(type: 'error', message: result.message ?? 'Failed to send OTP.');
    }
    loading = false;
    notifyListeners();
  }

  void closeOtpSheet() {
    showOtpSheet = false;
    notifyListeners();
  }

  void onOtpVerified() {
    showOtpSheet = false;
    currentStep = 1;
    notifyListeners();
  }

  void setStep(int step) {
    currentStep = step;
    notifyListeners();
  }

  void mergeApplication(ApplicationData data) {
    applicationData = data;
    notifyListeners();
  }

  Future<void> saveSession(String token, Map<String, dynamic>? user) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(ApiConfig.userTokenKey, token);
    userToken = token;
    if (user != null) userProfile = user;
    notifyListeners();
  }

  void openSignIn() {
    showSignIn = true;
    notifyListeners();
  }

  void closeSignIn() {
    showSignIn = false;
    notifyListeners();
  }

  Future<void> onSignedIn({required String token, required Map<String, dynamic> user}) async {
    await saveSession(token, user);
    showSignIn = false;
    appMode = AppMode.home;
    homeTab = HomeTab.home;
    showWelcomePopup = true;
    final profile = await _api.getProfile(token);
    if (profile.ok && profile.data != null) {
      userProfile = profile.data;
    }
    notifyListeners();
  }

  void closeWelcome() {
    showWelcomePopup = false;
    notifyListeners();
  }

  void viewProfile() {
    showWelcomePopup = false;
    appMode = AppMode.home;
    homeTab = HomeTab.profile;
    notifyListeners();
  }

  void leaveProfile() {
    appMode = AppMode.home;
    homeTab = HomeTab.home;
    notifyListeners();
  }

  void setUserProfile(Map<String, dynamic>? profile) {
    userProfile = profile;
    notifyListeners();
  }

  void finishDisbursal(Map<String, dynamic>? updatedProfile) {
    if (updatedProfile != null) userProfile = updatedProfile;
    currentStep = 0;
    appMode = AppMode.home;
    homeTab = HomeTab.profile;
    showWelcomePopup = false;
    notifyListeners();
  }

  ApiService get api => _api;
}
