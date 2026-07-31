import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

/// The raw SVG bodies from `frontend/src/website/Icons.jsx`, kept verbatim so
/// the rendered glyphs are identical to the web build.
const Map<String, String> _iconBodies = {
  'bolt': '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />',
  'wallet':
      '<path d="M3 7h15a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7z" />'
      '<path d="M3 7V6a3 3 0 0 1 3-3h11" />'
      '<circle cx="17" cy="13.5" r="1" fill="currentColor" stroke="none" />',
  'document':
      '<path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />'
      '<path d="M14 2v6h6" />'
      '<path d="M9 13h6M9 17h6" />',
  'shield':
      '<path d="M12 3 5 6v5c0 5 3.2 8.4 7 9.8 3.8-1.4 7-4.8 7-9.8V6l-7-3z" />'
      '<path d="m9 12 2 2 4-4" />',
  'users':
      '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />'
      '<circle cx="9" cy="7" r="3" />'
      '<path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a3 3 0 0 1 0 5.74" />',
  'map':
      '<path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z" />'
      '<path d="M9 3v15M15 6v15" />',
  'check':
      '<circle cx="12" cy="12" r="9" />'
      '<path d="m8.5 12.5 2.2 2.2 4.8-5" />',
  'arrow': '<path d="M5 12h14M13 6l6 6-6 6" />',
  'phone':
      '<path d="M7 3h4l1.5 4-2.5 1.5a12 12 0 0 0 5.5 5.5L17 11.5 21 13v4a2 2 0 0 1-2 2A16 16 0 0 1 5 5a2 2 0 0 1 2-2z" />',
  'mail':
      '<rect x="3" y="5" width="18" height="14" rx="2" />'
      '<path d="m4 7 8 6 8-6" />',
  'building':
      '<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M4 21h16M14 21V10h4a2 2 0 0 1 2 2v9" />'
      '<path d="M8 8h2M8 12h2M8 16h2" />',
  'clock':
      '<circle cx="12" cy="12" r="9" />'
      '<path d="M12 7v5l3 2" />',
  'heart':
      '<path d="M19.5 12.5 12 20l-7.5-7.5a4.5 4.5 0 1 1 7.5-5.1 4.5 4.5 0 1 1 7.5 5.1z" />',
  'briefcase':
      '<rect x="3" y="7" width="18" height="13" rx="2" />'
      '<path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />',
  'spark':
      '<path d="M12 3v4M12 17v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M3 12h4M17 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />',
  'menu': '<path d="M4 7h16M4 12h16M4 17h16" />',
  'close': '<path d="M6 6l12 12M18 6 6 18" />',
  'user':
      '<circle cx="12" cy="8" r="4" />'
      '<path d="M5 20a7 7 0 0 1 14 0" />',
  'bell':
      '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />'
      '<path d="M13.73 21a2 2 0 0 1-3.46 0" />',
};

/// The `star` glyph is the one filled icon in the set.
const String _starBody =
    '<path d="m12 2.5 2.7 5.5 6 .9-4.4 4.3 1 6-5.3-2.8L6.7 19.2l1-6L3.3 8.9l6-.9L12 2.5z" />';

const String _fallbackBody = '<circle cx="12" cy="12" r="9" />';

String _hex(Color color) =>
    '#${(color.toARGB32() & 0xFFFFFF).toRadixString(16).padLeft(6, '0')}';

/// Port of the React `<Icon name=... />` component. Stroke icons use the same
/// `strokeWidth: 1.8` with round caps and joins as the web version.
class BrandIcon extends StatelessWidget {
  const BrandIcon(this.name, {super.key, this.size = 20, this.color});

  final String name;
  final double size;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    final resolved =
        color ?? DefaultTextStyle.of(context).style.color ?? Colors.black;
    final hex = _hex(resolved);
    final filled = name == 'star';
    final body = filled
        ? _starBody
        : (_iconBodies[name] ?? _fallbackBody);

    // `currentColor` is not resolvable outside a browser, so it is substituted
    // before parsing.
    final paint = filled
        ? 'fill="$hex" stroke="none"'
        : 'fill="none" stroke="$hex" stroke-width="1.8" '
              'stroke-linecap="round" stroke-linejoin="round"';

    final svg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" $paint>'
        '${body.replaceAll('currentColor', hex)}'
        '</svg>';

    return SvgPicture.string(svg, width: size, height: size);
  }
}

/// Port of the React `<Stars count={5} />` row (amber-500, 14px glyphs).
class BrandStars extends StatelessWidget {
  const BrandStars({super.key, this.count = 5});

  final int count;

  static const Color amber500 = Color(0xFFF59E0B);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        for (var i = 0; i < count; i++)
          Padding(
            padding: EdgeInsets.only(right: i == count - 1 ? 0 : 4),
            child: const BrandIcon('star', size: 14, color: amber500),
          ),
      ],
    );
  }
}
