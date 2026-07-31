import 'package:flutter_test/flutter_test.dart';
import 'package:loan_app/main.dart';

void main() {
  testWidgets('App boots to website shell', (tester) async {
    await tester.pumpWidget(const LoanApp());
    await tester.pump();
    expect(find.textContaining('Loading'), findsOneWidget);
  });
}
