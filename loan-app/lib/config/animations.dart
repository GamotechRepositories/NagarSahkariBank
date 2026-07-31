import 'package:flutter/material.dart';

/// Motion tokens mirrored from the `@keyframes` blocks in
/// `frontend/src/index.css` so the app animates identically to the web UI.
class AppMotion {
  const AppMotion._();

  /// `.animate-fade-up` → `fade-up 0.7s ease-out both`
  static const Duration fadeUp = Duration(milliseconds: 700);

  /// `.animate-fade-up-delay` → `fade-up 0.8s ease-out 0.15s both`
  static const Duration fadeUpSlow = Duration(milliseconds: 800);
  static const Duration fadeUpDelay = Duration(milliseconds: 150);

  /// `fade-up` translates from `translateY(18px)` to `0`.
  static const double fadeUpOffset = 18;

  /// `.animate-float` → `float-soft 5s ease-in-out infinite` (±8px).
  /// Held as a half cycle because the Flutter controller reverses.
  static const Duration floatHalfCycle = Duration(milliseconds: 2500);
  static const double floatOffset = 8;

  /// `.marquee-track` → `marquee 45s linear infinite` (translateX -50%).
  static const Duration marquee = Duration(seconds: 45);

  /// Mobile drawer → `transition-*  duration-300 ease-out`.
  static const Duration drawer = Duration(milliseconds: 300);

  /// `CardGrid` → `transition duration-300`.
  static const Duration card = Duration(milliseconds: 300);

  /// `celebration-pop 0.45s cubic-bezier(0.22, 1, 0.36, 1)`
  static const Duration celebrationPop = Duration(milliseconds: 450);
  static const Cubic popCurve = Cubic(0.22, 1, 0.36, 1);

  /// `celebration-ring-pulse 0.5s ease-out`
  static const Duration celebrationRing = Duration(milliseconds: 500);

  /// `celebration-confetti-fall 1.8s ease-in forwards`
  static const Duration confettiFall = Duration(milliseconds: 1800);

  /// `.celebration-backdrop` → `fade-up 0.2s ease-out`
  static const Duration backdrop = Duration(milliseconds: 200);
}

/// Port of `.animate-fade-up` / `.animate-fade-up-delay`: fades in while
/// sliding up 18px. Pass [delay] to stagger like the CSS `0.15s` variant.
class FadeUp extends StatefulWidget {
  const FadeUp({
    super.key,
    required this.child,
    this.duration = AppMotion.fadeUp,
    this.delay = Duration.zero,
  });

  /// Matches `.animate-fade-up-delay` (0.8s duration, 0.15s delay).
  const FadeUp.delayed({super.key, required this.child})
    : duration = AppMotion.fadeUpSlow,
      delay = AppMotion.fadeUpDelay;

  final Widget child;
  final Duration duration;
  final Duration delay;

  @override
  State<FadeUp> createState() => _FadeUpState();
}

class _FadeUpState extends State<FadeUp> with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: widget.duration,
  );
  late final Animation<double> _animation = CurvedAnimation(
    parent: _controller,
    curve: Curves.easeOut,
  );

  @override
  void initState() {
    super.initState();
    if (widget.delay == Duration.zero) {
      _controller.forward();
    } else {
      Future<void>.delayed(widget.delay, () {
        if (mounted) _controller.forward();
      });
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        final t = _animation.value;
        return Opacity(
          opacity: t,
          child: Transform.translate(
            offset: Offset(0, AppMotion.fadeUpOffset * (1 - t)),
            child: child,
          ),
        );
      },
      child: widget.child,
    );
  }
}

/// Port of `.animate-float`: drifts up and down 8px forever.
class FloatSoft extends StatefulWidget {
  const FloatSoft({super.key, required this.child});

  final Widget child;

  @override
  State<FloatSoft> createState() => _FloatSoftState();
}

class _FloatSoftState extends State<FloatSoft>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: AppMotion.floatHalfCycle,
  )..repeat(reverse: true);

  late final Animation<double> _animation = CurvedAnimation(
    parent: _controller,
    curve: Curves.easeInOut,
  );

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) => Transform.translate(
        offset: Offset(0, -AppMotion.floatOffset * _animation.value),
        child: child,
      ),
      child: widget.child,
    );
  }
}

/// Port of `.marquee-track`: an endless horizontal loop. The children are
/// rendered twice and shifted by exactly one set width, which is how the CSS
/// `translateX(-50%)` keyframe produces a seamless scroll.
///
/// [itemExtent] must be the fixed child width so the loop distance is exact.
class Marquee extends StatefulWidget {
  const Marquee({
    super.key,
    required this.children,
    required this.itemExtent,
    this.gap = 20,
    this.duration = AppMotion.marquee,
    this.padding = EdgeInsets.zero,
  });

  final List<Widget> children;
  final double itemExtent;
  final double gap;
  final Duration duration;
  final EdgeInsets padding;

  @override
  State<Marquee> createState() => _MarqueeState();
}

class _MarqueeState extends State<Marquee> with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: widget.duration,
  )..repeat();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // One set spans every card plus the gap that trails each of them.
    final setWidth =
        (widget.itemExtent + widget.gap) * widget.children.length;

    return ClipRect(
      child: Padding(
        padding: widget.padding,
        child: AnimatedBuilder(
          animation: _controller,
          builder: (context, child) => Transform.translate(
            offset: Offset(-setWidth * _controller.value, 0),
            child: child,
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              for (final child in [...widget.children, ...widget.children])
                Padding(
                  padding: EdgeInsets.only(right: widget.gap),
                  child: SizedBox(width: widget.itemExtent, child: child),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Touch equivalent of the `CardGrid` hover state
/// (`hover:-translate-y-1` plus a deeper shadow over 300ms). Pointer hover is
/// also handled so the behaviour matches on desktop builds.
class LiftOnInteract extends StatefulWidget {
  const LiftOnInteract({
    super.key,
    required this.builder,
    this.onTap,
    this.lift = 4,
  });

  final Widget Function(BuildContext context, bool active) builder;
  final VoidCallback? onTap;
  final double lift;

  @override
  State<LiftOnInteract> createState() => _LiftOnInteractState();
}

class _LiftOnInteractState extends State<LiftOnInteract> {
  bool _active = false;

  void _set(bool value) {
    if (_active != value) setState(() => _active = value);
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => _set(true),
      onExit: (_) => _set(false),
      child: GestureDetector(
        onTap: widget.onTap,
        onTapDown: (_) => _set(true),
        onTapUp: (_) => _set(false),
        onTapCancel: () => _set(false),
        child: AnimatedContainer(
          duration: AppMotion.card,
          curve: Curves.easeOut,
          transform: Matrix4.translationValues(
            0,
            _active ? -widget.lift : 0,
            0,
          ),
          child: widget.builder(context, _active),
        ),
      ),
    );
  }
}
