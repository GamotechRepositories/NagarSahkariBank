import 'package:flutter/material.dart';

import '../config/company_content.dart';
import '../config/theme.dart';

/// Sets the default [SectionCard.boxed] for everything below it, so a whole
/// page can opt into bordered surfaces without repeating the flag.
class SectionCardStyle extends InheritedWidget {
  const SectionCardStyle({super.key, required this.boxed, required super.child});

  final bool boxed;

  static bool of(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<SectionCardStyle>()?.boxed ??
      false;

  @override
  bool updateShouldNotify(SectionCardStyle oldWidget) =>
      oldWidget.boxed != boxed;
}

/// A titled block of content. Flat by default so the short form steps read as
/// one clean sheet; boxed where a bordered surface separates long summaries.
class SectionCard extends StatelessWidget {
  const SectionCard({
    super.key,
    this.title,
    required this.child,
    this.boxed,
  });

  final String? title;
  final Widget child;
  final bool? boxed;

  @override
  Widget build(BuildContext context) {
    final isBoxed = boxed ?? SectionCardStyle.of(context);
    final content = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (title != null) ...[
          Text(
            title!,
            style: const TextStyle(
              fontSize: 15.5,
              fontWeight: FontWeight.w700,
              color: AppColors.slate900,
            ),
          ),
          const SizedBox(height: 14),
        ],
        child,
      ],
    );

    if (!isBoxed) return SizedBox(width: double.infinity, child: content);

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(AppRadius.card),
        border: Border.all(color: AppColors.line),
      ),
      child: content,
    );
  }
}

class InfoRow extends StatelessWidget {
  const InfoRow({super.key, required this.label, required this.value, this.highlight = false});

  final String label;
  final String value;
  final bool highlight;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Text(label, style: const TextStyle(fontSize: 13, color: AppColors.slate500)),
          ),
          const SizedBox(width: 16),
          Flexible(
            child: Text(
              value,
              textAlign: TextAlign.right,
              style: TextStyle(
                fontSize: 13.5,
                fontWeight: FontWeight.w700,
                color: highlight ? AppColors.green700 : AppColors.slate900,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class FloatingLabelField extends StatelessWidget {
  const FloatingLabelField({
    super.key,
    required this.label,
    required this.child,
    this.errorText,
  });

  final String label;
  final Widget child;
  final String? errorText;

  bool get _hasError => errorText != null && errorText!.isNotEmpty;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 6, left: 2),
          child: Text(
            label,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              color: _hasError ? AppColors.red600 : AppColors.slate600,
            ),
          ),
        ),
        child,
        if (_hasError)
          Padding(
            padding: const EdgeInsets.only(top: 6),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Icon(Icons.error_outline, size: 14, color: AppColors.red600),
                const SizedBox(width: 4),
                Expanded(
                  child: Text(
                    errorText!,
                    style: const TextStyle(
                      fontSize: 12,
                      height: 1.35,
                      fontWeight: FontWeight.w500,
                      color: AppColors.red600,
                    ),
                  ),
                ),
              ],
            ),
          ),
      ],
    );
  }
}

class StatusBadge extends StatelessWidget {
  const StatusBadge({super.key, this.status = 'pending'});

  final String status;

  @override
  Widget build(BuildContext context) {
    final styles = switch (status) {
      'approved' || 'success' => (const Color(0xFFF0FDF4), const Color(0xFF15803D), 'Success'),
      'verified' => (AppColors.brandSoft, AppColors.brand, 'Verified'),
      _ => (const Color(0xFFFFFBEB), const Color(0xFFB45309), 'Pending'),
    };
    final label = switch (status) {
      'approved' => 'Approved',
      'success' => 'Success',
      'verified' => 'Verified',
      _ => status,
    };
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      decoration: BoxDecoration(
        color: styles.$1,
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        label,
        style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: styles.$2),
      ),
    );
  }
}

class DownloadLinkButton extends StatelessWidget {
  const DownloadLinkButton({super.key, required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: AppColors.slate100,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.slate200),
      ),
      child: Row(
        children: [
          Expanded(
            child: Text(
              label,
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: AppColors.brand),
            ),
          ),
          const Icon(Icons.download, size: 18, color: AppColors.slate400),
        ],
      ),
    );
  }
}

class SupportSection extends StatelessWidget {
  const SupportSection({super.key});

  @override
  Widget build(BuildContext context) {
    return const SectionCard(
      title: 'Customer Support',
      boxed: true,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Need help? Reach out to our support team.',
            style: TextStyle(fontSize: 13, color: AppColors.slate600),
          ),
          SizedBox(height: 10),
          Text('Phone: ${Company.phone}', style: TextStyle(fontSize: 13, color: AppColors.slate700)),
          Text('Email: ${Company.email}', style: TextStyle(fontSize: 13, color: AppColors.slate700)),
        ],
      ),
    );
  }
}

class BrandPrimaryButton extends StatelessWidget {
  const BrandPrimaryButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.loading = false,
  });

  final String label;
  final VoidCallback? onPressed;
  final bool loading;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 50,
      child: ElevatedButton(
        onPressed: loading ? null : onPressed,
        child: loading
            ? const SizedBox(
                width: 20,
                height: 20,
                child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
              )
            : Text(label),
      ),
    );
  }
}

class UploadBox extends StatelessWidget {
  const UploadBox({
    super.key,
    required this.label,
    required this.onTap,
    this.fileName,
    this.hint = 'Click to upload',
    this.errorText,
  });

  final String label;
  final String hint;
  final String? fileName;
  final String? errorText;
  final VoidCallback onTap;

  bool get _hasError => errorText != null && errorText!.isNotEmpty;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 16),
          decoration: BoxDecoration(
            color: _hasError ? AppColors.red50 : AppColors.surfaceMuted,
            borderRadius: BorderRadius.circular(AppRadius.field),
            border: Border.all(
              color: _hasError ? AppColors.red600 : AppColors.line,
            ),
          ),
          child: Column(
            children: [
              Text(
                label,
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                  color: _hasError ? AppColors.red600 : AppColors.slate700,
                ),
              ),
              const SizedBox(height: 2),
              Text(hint, style: const TextStyle(fontSize: 11, color: AppColors.slate500)),
              const SizedBox(height: 8),
              OutlinedButton(
                onPressed: onTap,
                style: OutlinedButton.styleFrom(
                  foregroundColor: _hasError ? AppColors.red600 : AppColors.brand,
                  side: BorderSide(
                    color: _hasError ? AppColors.red600 : AppColors.brand,
                  ),
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  visualDensity: VisualDensity.compact,
                ),
                child: Text(
                  fileName != null ? 'Change file' : 'Upload',
                  style: const TextStyle(fontSize: 12),
                ),
              ),
              if (fileName != null) ...[
                const SizedBox(height: 8),
                Text(
                  fileName!,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w500,
                    color: Color(0xFF15803D),
                  ),
                ),
              ],
            ],
          ),
        ),
        if (_hasError)
          Padding(
            padding: const EdgeInsets.only(top: 6),
            child: Row(
              children: [
                const Icon(Icons.error_outline, size: 14, color: AppColors.red600),
                const SizedBox(width: 4),
                Expanded(
                  child: Text(
                    errorText!,
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                      color: AppColors.red600,
                    ),
                  ),
                ),
              ],
            ),
          ),
      ],
    );
  }
}

/// Live amber checklist of missing items (mirrors the web KYC banner).
class ValidationChecklist extends StatelessWidget {
  const ValidationChecklist({super.key, required this.errors});

  final List<String> errors;

  @override
  Widget build(BuildContext context) {
    if (errors.isEmpty) return const SizedBox.shrink();
    final visible = errors.take(5).toList();
    final remaining = errors.length - visible.length;

    return Container(
      width: double.infinity,
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.amber50,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: AppColors.amber200),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Complete these items to submit:',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: AppColors.amber900,
            ),
          ),
          const SizedBox(height: 8),
          for (final item in visible)
            Padding(
              padding: const EdgeInsets.only(bottom: 4, left: 4),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('• ', style: TextStyle(color: AppColors.amber900)),
                  Expanded(
                    child: Text(
                      item,
                      style: const TextStyle(
                        fontSize: 13,
                        height: 1.35,
                        color: AppColors.amber900,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          if (remaining > 0)
            Padding(
              padding: const EdgeInsets.only(left: 4, top: 2),
              child: Text(
                'and $remaining more...',
                style: const TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w500,
                  color: AppColors.amber900,
                ),
              ),
            ),
        ],
      ),
    );
  }
}
