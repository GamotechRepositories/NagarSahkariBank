import 'package:flutter/material.dart';

import '../config/animations.dart';
import '../config/theme.dart';

/// Port of `frontend/src/components/CelebrationOverlay.jsx` together with the
/// `celebration-*` keyframes in `frontend/src/index.css`.
///
/// Show it with [show] via a `Stack` above the page content, the same way the
/// web overlay is a fixed layer at `z-index: 60`.
class CelebrationOverlay extends StatefulWidget {
  const CelebrationOverlay({
    super.key,
    required this.show,
    this.message = 'Loan amount applied!',
    this.amountLabel = '',
  });

  final bool show;
  final String message;
  final String amountLabel;

  /// 24 pieces cycling through four brand colours.
  static const int confettiCount = 24;
  static const List<Color> confettiColors = [
    Color(0xFF0B254A),
    Color(0xFFB5873E),
    Color(0xFF16A34A),
    Color(0xFFF59E0B),
  ];

  @override
  State<CelebrationOverlay> createState() => _CelebrationOverlayState();
}

class _CelebrationOverlayState extends State<CelebrationOverlay>
    with TickerProviderStateMixin {
  /// Drives `celebration-confetti-fall`. Its span covers the 1.8s fall plus the
  /// largest per-piece delay (`(24 - 1) % 8 * 0.06s` → 0.42s).
  late final AnimationController _confetti = AnimationController(
    vsync: this,
    duration: AppMotion.confettiFall + const Duration(milliseconds: 420),
  );

  /// Drives `celebration-pop` on the card and `celebration-ring-pulse`.
  late final AnimationController _card = AnimationController(
    vsync: this,
    duration: AppMotion.celebrationPop,
  );

  /// Drives `.celebration-backdrop` → `fade-up 0.2s`.
  late final AnimationController _backdrop = AnimationController(
    vsync: this,
    duration: AppMotion.backdrop,
  );

  @override
  void initState() {
    super.initState();
    if (widget.show) _start();
  }

  @override
  void didUpdateWidget(CelebrationOverlay oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.show && !oldWidget.show) {
      _start();
    } else if (!widget.show && oldWidget.show) {
      _confetti.reset();
      _card.reset();
      _backdrop.reset();
    }
  }

  void _start() {
    _confetti.forward(from: 0);
    _card.forward(from: 0);
    _backdrop.forward(from: 0);
  }

  @override
  void dispose() {
    _confetti.dispose();
    _card.dispose();
    _backdrop.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!widget.show) return const SizedBox.shrink();

    // `pointer-events: none` on the overlay.
    return IgnorePointer(
      child: Stack(
        fit: StackFit.expand,
        children: [
          FadeTransition(
            opacity: _backdrop,
            child: ColoredBox(
              // `rgba(11, 37, 74, 0.4)`
              color: AppColors.navy.withValues(alpha: 0.4),
            ),
          ),
          ClipRect(
            child: AnimatedBuilder(
              animation: _confetti,
              builder: (context, _) => CustomPaint(
                painter: _ConfettiPainter(progress: _confetti.value),
              ),
            ),
          ),
          Center(
            child: Padding(
              padding: EdgeInsets.only(
                left: 16,
                right: 16,
                top: 16,
                // `padding-bottom: max(1rem, env(safe-area-inset-bottom))`
                bottom: MediaQuery.paddingOf(context).bottom > 16
                    ? MediaQuery.paddingOf(context).bottom
                    : 16,
              ),
              child: _CelebrationCard(
                animation: _card,
                message: widget.message,
                amountLabel: widget.amountLabel,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// Paints the falling confetti. Each piece is 8×12 with a 2px radius, starting
/// at `-8vh` and travelling to `90vh` while rotating 540° and scaling to 0.8.
class _ConfettiPainter extends CustomPainter {
  _ConfettiPainter({required this.progress});

  final double progress;

  static const double _pieceWidth = 8;
  static const double _pieceHeight = 12;
  static const double _fallSeconds = 1.8;
  static const double _totalSeconds = 2.22; // 1.8s + max 0.42s delay

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..style = PaintingStyle.fill;

    for (var i = 0; i < CelebrationOverlay.confettiCount; i++) {
      // `animationDelay: ${(index % 8) * 0.06}s`
      final delay = (i % 8) * 0.06;
      final elapsed = progress * _totalSeconds - delay;
      if (elapsed <= 0 || elapsed >= _fallSeconds) continue;

      final t = elapsed / _fallSeconds;
      // `ease-in` → cubic-bezier(0.42, 0, 1, 1)
      final eased = Curves.easeIn.transform(t);

      // `left: ${(index * 17) % 100}%`
      final x = size.width * ((i * 17) % 100) / 100;
      final y = size.height * (-0.08 + eased * 0.98);

      final scale = 1 - 0.2 * eased;
      final rotation = eased * 540 * 3.1415926535 / 180;

      paint.color = CelebrationOverlay
          .confettiColors[i % CelebrationOverlay.confettiColors.length]
          .withValues(alpha: 1 - eased);

      canvas.save();
      canvas.translate(x + _pieceWidth / 2, y + _pieceHeight / 2);
      canvas.rotate(rotation);
      canvas.scale(scale);
      canvas.drawRRect(
        RRect.fromRectAndRadius(
          const Rect.fromLTWH(
            -_pieceWidth / 2,
            -_pieceHeight / 2,
            _pieceWidth,
            _pieceHeight,
          ),
          const Radius.circular(2),
        ),
        paint,
      );
      canvas.restore();
    }
  }

  @override
  bool shouldRepaint(_ConfettiPainter oldDelegate) =>
      oldDelegate.progress != progress;
}

class _CelebrationCard extends StatelessWidget {
  const _CelebrationCard({
    required this.animation,
    required this.message,
    required this.amountLabel,
  });

  final Animation<double> animation;
  final String message;
  final String amountLabel;

  @override
  Widget build(BuildContext context) {
    // `celebration-pop`: opacity 0→1, scale 0.88→1
    final pop = CurvedAnimation(parent: animation, curve: AppMotion.popCurve);
    // `celebration-ring-pulse`: scale 0.7 → 1.08 @70% → 1, opacity 0.4→1
    final ring = CurvedAnimation(parent: animation, curve: Curves.easeOut);

    return AnimatedBuilder(
      animation: animation,
      builder: (context, _) {
        return Opacity(
          opacity: pop.value,
          child: Transform.scale(
            scale: 0.88 + 0.12 * pop.value,
            child: Container(
              // `max-width: 300px`
              width: 300,
              padding: const EdgeInsets.symmetric(
                horizontal: 20,
                vertical: 24,
              ),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(
                    // `0 20px 50px rgba(15, 23, 42, 0.2)`
                    color: const Color(0xFF0F172A).withValues(alpha: 0.2),
                    blurRadius: 50,
                    offset: const Offset(0, 20),
                  ),
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Transform.scale(
                    scale: _ringScale(ring.value),
                    child: Opacity(
                      opacity: 0.4 + 0.6 * ring.value,
                      child: Container(
                        width: 64,
                        height: 64,
                        alignment: Alignment.center,
                        decoration: const BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: LinearGradient(
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                            colors: [
                              AppColors.green50,
                              AppColors.green100,
                            ],
                          ),
                        ),
                        child: Container(
                          width: 40,
                          height: 40,
                          alignment: Alignment.center,
                          decoration: const BoxDecoration(
                            shape: BoxShape.circle,
                            color: AppColors.green600,
                          ),
                          child: const Text(
                            '✓',
                            style: TextStyle(
                              fontSize: 20,
                              height: 1,
                              fontWeight: FontWeight.w700,
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 14),
                    child: Text(
                      message,
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w700,
                        color: AppColors.brand,
                      ),
                    ),
                  ),
                  if (amountLabel.isNotEmpty)
                    Padding(
                      padding: const EdgeInsets.only(top: 6),
                      child: Text(
                        amountLabel,
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.w800,
                          color: AppColors.gold,
                        ),
                      ),
                    ),
                  const Padding(
                    padding: EdgeInsets.only(top: 6),
                    child: Text(
                      'You can accept your offer now',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 14,
                        color: AppColors.muted,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  /// `celebration-ring-pulse` overshoots to 1.08 at 70% before settling at 1.
  double _ringScale(double t) {
    if (t <= 0.7) return 0.7 + (1.08 - 0.7) * (t / 0.7);
    return 1.08 - (1.08 - 1) * ((t - 0.7) / 0.3);
  }
}

/// Port of `.accept-offer-ready`: replays `celebration-pop` and adds the
/// `0 0 0 3px rgba(22, 163, 74, 0.25)` ring once the amount is applied.
class AcceptOfferReady extends StatefulWidget {
  const AcceptOfferReady({
    super.key,
    required this.ready,
    required this.child,
  });

  final bool ready;
  final Widget child;

  @override
  State<AcceptOfferReady> createState() => _AcceptOfferReadyState();
}

class _AcceptOfferReadyState extends State<AcceptOfferReady>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: AppMotion.celebrationPop,
  );

  @override
  void initState() {
    super.initState();
    if (widget.ready) _controller.forward();
  }

  @override
  void didUpdateWidget(AcceptOfferReady oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.ready && !oldWidget.ready) {
      _controller.forward(from: 0);
    } else if (!widget.ready && oldWidget.ready) {
      _controller.reset();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!widget.ready) return widget.child;

    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        // `celebration-pop 0.45s ease-out both`
        final t = Curves.easeOut.transform(_controller.value);
        return Opacity(
          opacity: t,
          child: Transform.scale(
            scale: 0.88 + 0.12 * t,
            child: DecoratedBox(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12),
                boxShadow: [
                  BoxShadow(
                    color: AppColors.green600.withValues(alpha: 0.25 * t),
                    spreadRadius: 3,
                    blurRadius: 0,
                  ),
                ],
              ),
              child: child,
            ),
          ),
        );
      },
      child: widget.child,
    );
  }
}
