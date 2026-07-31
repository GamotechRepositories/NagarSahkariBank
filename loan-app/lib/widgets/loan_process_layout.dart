import 'package:flutter/material.dart';

import '../config/theme.dart';
import 'process_ui.dart';
import 'ui_kit.dart';

const List<String> _stepLabels = [
  'Basic\nDetails',
  'Approved\nOffer',
  'Complete\nKYC',
  'Disburse\nLoan',
];

class LoanProcessLayout extends StatelessWidget {
  const LoanProcessLayout({
    super.key,
    required this.activeStep,
    required this.child,
    this.title = 'Apply for Loan',
    this.subtitle = 'Please fill in your details to continue',
    this.onContinue,
    this.onBack,
    this.continueLabel = 'Continue',
    this.continueDisabled = false,
    this.continueLoading = false,
    this.secondaryLabel,
    this.onSecondary,
    this.continueWrapper,
    this.secureNote = 'Your information is secure with us',
    this.background = AppColors.surface,
  });

  final int activeStep;
  final Widget child;
  final String title;
  final String subtitle;
  final VoidCallback? onContinue;
  final VoidCallback? onBack;
  final String continueLabel;
  final bool continueDisabled;
  final bool continueLoading;
  final String? secondaryLabel;
  final VoidCallback? onSecondary;
  final String? secureNote;

  /// Grey for the long summary steps so the section cards separate cleanly.
  final Color background;

  /// Lets a step decorate the primary button, e.g. the offer page attaching its
  /// celebration trigger.
  final Widget Function(Widget child)? continueWrapper;

  @override
  Widget build(BuildContext context) {
    final bottomInset = MediaQuery.paddingOf(context).bottom;
    final keyboardOpen = MediaQuery.viewInsetsOf(context).bottom > 0;

    return Scaffold(
      backgroundColor: background,
      // The action bar is part of the body rather than `bottomNavigationBar`,
      // because Scaffold pins that slot to the bottom of the window and the
      // keyboard would sit on top of the primary button.
      body: SafeArea(
        bottom: false,
        child: Column(
          children: [
            Container(
              decoration: BoxDecoration(
                color: AppColors.surface,
                border: background == AppColors.surface
                    ? null
                    : const Border(bottom: BorderSide(color: AppColors.line)),
              ),
              padding: const EdgeInsets.only(bottom: 18),
              child: Column(
                children: [
                  AppScreenHeader(
                    title: title,
                    subtitle: subtitle,
                    onBack: onBack,
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    child: StepProgress(
                      steps: _stepLabels,
                      activeStep: activeStep,
                    ),
                  ),
                ],
              ),
            ),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.fromLTRB(20, 22, 20, 24),
                keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
                children: [child],
              ),
            ),
            Container(
              padding: EdgeInsets.fromLTRB(20, 12, 20, 12 + bottomInset),
              decoration: const BoxDecoration(
                color: AppColors.surface,
                border: Border(top: BorderSide(color: AppColors.line)),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Dropped while typing so the shrunken form keeps more room.
                  if (secureNote != null && !keyboardOpen) ...[
                    SecureNote(text: secureNote!, icon: Icons.lock_outline_rounded),
                    const SizedBox(height: 10),
                  ],
                  Builder(
                    builder: (context) {
                      final button = BrandPrimaryButton(
                        label: continueLabel,
                        loading: continueLoading,
                        onPressed: continueDisabled ? null : onContinue,
                      );
                      return continueWrapper?.call(button) ?? button;
                    },
                  ),
                  if (secondaryLabel != null && onSecondary != null) ...[
                    const SizedBox(height: 10),
                    SizedBox(
                      width: double.infinity,
                      height: 46,
                      child: OutlinedButton(
                        onPressed: onSecondary,
                        child: Text(secondaryLabel!),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
