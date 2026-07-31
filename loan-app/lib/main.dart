import 'dart:async';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'config/theme.dart';
import 'screens/apply_step0_screen.dart';
import 'screens/approved_offer_screen.dart';
import 'screens/basic_details_screen.dart';
import 'screens/complete_kyc_screen.dart';
import 'screens/disburse_loan_screen.dart';
import 'screens/home_screen.dart';
import 'screens/landing_screen.dart';
import 'screens/welcome_dialog.dart';
import 'screens/welcome_screen.dart';
import 'state/app_state.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const LoanApp());
}

class LoanApp extends StatelessWidget {
  const LoanApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => AppState()..bootstrap(),
      child: MaterialApp(
        title: 'Sakaar Loan',
        debugShowCheckedModeBanner: false,
        theme: buildAppTheme(),
        home: const RootShell(),
      ),
    );
  }
}

/// Minimum time the launch screen stays up, so the brand mark does not flash.
const Duration _splashDuration = Duration(milliseconds: 2000);

class RootShell extends StatefulWidget {
  const RootShell({super.key});

  @override
  State<RootShell> createState() => _RootShellState();
}

class _RootShellState extends State<RootShell> {
  bool _welcomeShown = false;
  bool _splashDone = false;
  Timer? _splashTimer;

  @override
  void initState() {
    super.initState();
    _splashTimer = Timer(_splashDuration, () {
      if (mounted) setState(() => _splashDone = true);
    });
  }

  @override
  void dispose() {
    _splashTimer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final state = context.watch<AppState>();

    if (!_splashDone || state.checkingSession) {
      return const WelcomeScreen();
    }

    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      if (state.showWelcomePopup && state.userProfile != null && !_welcomeShown) {
        _welcomeShown = true;
        WelcomeProfileDialog.show(
          context,
          profile: state.userProfile!,
          onClose: () {
            state.closeWelcome();
            _welcomeShown = false;
          },
          onViewProfile: () {
            state.viewProfile();
            _welcomeShown = false;
          },
        );
      }
      if (!state.showWelcomePopup) _welcomeShown = false;
    });

    if (state.appMode == AppMode.apply) {
      switch (state.currentStep) {
        case 1:
          return const BasicDetailsScreen();
        case 2:
          return const ApprovedOfferScreen();
        case 3:
          return const CompleteKycScreen();
        case 4:
          return const DisburseLoanScreen();
        default:
          return const ApplyStep0Screen();
      }
    }

    if (state.appMode == AppMode.home && state.userProfile != null) {
      return const HomeShell();
    }

    return const LandingScreen();
  }
}
