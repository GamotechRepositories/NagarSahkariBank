import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../config/animations.dart';
import '../config/theme.dart';
import '../state/app_state.dart';
import '../utils/loan_calculator.dart';
import '../utils/user_notifications.dart';
import '../widgets/notification_bell.dart';
import '../widgets/ui_kit.dart';
import 'applications_screen.dart';
import 'support_screen.dart';

const List<AppNavDestination> _destinations = [
  AppNavDestination(Icons.headset_mic_outlined, 'Support'),
  AppNavDestination(Icons.home_rounded, 'Home'),
  AppNavDestination(Icons.person_outline_rounded, 'Profile'),
];

/// Signed-in shell: Support / Home / Profile behind a bottom bar.
class HomeShell extends StatelessWidget {
  const HomeShell({super.key});

  @override
  Widget build(BuildContext context) {
    final state = context.watch<AppState>();

    return Scaffold(
      backgroundColor: AppColors.surfaceMuted,
      body: SafeArea(
        bottom: false,
        child: IndexedStack(
          sizing: StackFit.expand,
          index: state.homeTab,
          children: const [
            SupportView(),
            HomeDashboard(),
            ProfileView(),
          ],
        ),
      ),
      bottomNavigationBar: AppBottomNav(
        destinations: _destinations,
        currentIndex: state.homeTab,
        onSelect: state.setHomeTab,
      ),
    );
  }
}

class HomeDashboard extends StatefulWidget {
  const HomeDashboard({super.key});

  @override
  State<HomeDashboard> createState() => _HomeDashboardState();
}

class _HomeDashboardState extends State<HomeDashboard> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _refresh());
  }

  Future<void> _refresh() async {
    final state = context.read<AppState>();
    if (state.userToken.isEmpty) return;
    final result = await state.api.getProfile(state.userToken);
    if (!mounted) return;
    if (result.statusCode == 401 || result.statusCode == 403) {
      await state.clearUserSession();
      return;
    }
    if (result.ok) state.setUserProfile(result.data);
  }

  @override
  Widget build(BuildContext context) {
    final state = context.watch<AppState>();
    final profile = state.userProfile ?? const <String, dynamic>{};

    final sanctioned = (profile['loanAmount'] as num?)?.toInt() ?? 0;
    final eligibleAmount = sanctioned > 0 ? sanctioned : maxLoanAmount;
    final offer = calculateLoanOffer(eligibleAmount);

    return RefreshIndicator(
      onRefresh: _refresh,
      child: ListView(
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
        children: [
          _Greeting(profile: profile),
          const SizedBox(height: 18),
          FadeUp(
            child: FeatureCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              sanctioned > 0 ? 'Your sanctioned amount' : 'You are eligible for',
                              style: const TextStyle(
                                fontSize: 12.5,
                                color: Color(0xE6FFFFFF),
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              formatCurrency(eligibleAmount),
                              style: const TextStyle(
                                fontSize: 29,
                                fontWeight: FontWeight.w800,
                                color: Colors.white,
                              ),
                            ),
                            const SizedBox(height: 2),
                            const Text(
                              'Personal Loan',
                              style: TextStyle(
                                fontSize: 12.5,
                                color: Color(0xCCFFFFFF),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 10),
                      const MoneyGlyph(size: 62),
                    ],
                  ),
                  const SizedBox(height: 18),
                  OnBrandButton(
                    label: sanctioned > 0 ? 'View Loan' : 'Apply Now',
                    onPressed: sanctioned > 0
                        ? () => state.setHomeTab(2)
                        : state.startApplication,
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 22),
          const SectionHeading('Your Application Status'),
          const SizedBox(height: 10),
          _ApplicationStatus(profile: profile),
          const SizedBox(height: 20),
          AppCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SectionHeading('Loan Details'),
                const SizedBox(height: 8),
                DetailRow(label: 'Loan Amount', value: formatCurrency(offer.loanAmount)),
                const Divider(height: 1),
                DetailRow(label: 'Tenure', value: offer.loanTenureLabel),
                const Divider(height: 1),
                DetailRow(label: 'Interest Rate', value: offer.interestRateLabel),
                const Divider(height: 1),
                DetailRow(
                  label: 'Monthly EMI (Approx.)',
                  value: formatCurrency(offer.emi),
                ),
              ],
            ),
          ),
          const SizedBox(height: 14),
          const Center(
            child: Text(
              '*Terms & Conditions Apply',
              style: TextStyle(fontSize: 11, color: AppColors.slate400),
            ),
          ),
        ],
      ),
    );
  }
}

class _Greeting extends StatelessWidget {
  const _Greeting({required this.profile});

  final Map<String, dynamic> profile;

  @override
  Widget build(BuildContext context) {
    final state = context.read<AppState>();
    final fullName = '${profile['fullName'] ?? ''}'.trim();
    final firstName = fullName.isEmpty ? 'there' : fullName.split(' ').first;

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Hello, $firstName 👋',
                style: const TextStyle(
                  fontSize: 21,
                  fontWeight: FontWeight.w800,
                  color: AppColors.slate900,
                ),
              ),
              const SizedBox(height: 3),
              const Text(
                "Here's your loan overview",
                style: TextStyle(fontSize: 12.5, color: AppColors.slate500),
              ),
            ],
          ),
        ),
        if (profile.isNotEmpty)
          NotificationBell(
            profile: profile,
            onViewProfile: () => state.setHomeTab(2),
          ),
      ],
    );
  }
}

class _ApplicationStatus extends StatelessWidget {
  const _ApplicationStatus({required this.profile});

  final Map<String, dynamic> profile;

  @override
  Widget build(BuildContext context) {
    final state = context.read<AppState>();

    if (isLoanFullyApproved(profile)) {
      return StatusBanner(
        tone: StatusTone.success,
        title: 'Application Approved',
        message: 'Congratulations! Your loan has been approved.',
        onTap: () => state.setHomeTab(2),
      );
    }

    final status = '${profile['applicationStatus'] ?? profile['kycStatus'] ?? ''}';
    if (status == 'rejected') {
      return StatusBanner(
        tone: StatusTone.rejected,
        title: 'Action Needed',
        message: 'Some documents were rejected. Please re-upload them to continue.',
        onTap: () => state.setHomeTab(2),
      );
    }

    final applications = profile['applications'];
    final hasApplication = applications is List && applications.isNotEmpty;
    if (hasApplication || status.isNotEmpty) {
      return StatusBanner(
        tone: StatusTone.pending,
        title: 'Application Under Review',
        message: 'We are verifying your details. This usually takes a few hours.',
        onTap: () => state.setHomeTab(2),
      );
    }

    return StatusBanner(
      tone: StatusTone.info,
      title: 'No Application Yet',
      message: 'Start your loan application and get approval in minutes.',
      onTap: state.startApplication,
    );
  }
}
