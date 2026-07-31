# Sakaar Loan App (Flutter)

Native Flutter client that mirrors the **frontend mobile UI** and talks to the same **`backend/`** API used by the React web app.

## Monorepo layout

```
loan-web/
  backend/     # Express API (port 5000) — shared
  frontend/    # React web
  loan-app/    # This Flutter app
  admin/       # Admin web
```

## Prerequisites

- Flutter 3.35+ (`flutter doctor`)
- Backend running: `cd backend && npm run dev`

## Run

```bash
# Terminal 1 — shared backend
cd backend
npm install
npm run dev

# Terminal 2 — Flutter
cd loan-app
flutter pub get
flutter run
```

### API base URL

Default API: `https://api.sakaarfoundation.org`

Override for local development:

```bash
flutter run --dart-define=API_BASE_URL=http://192.168.x.x:5000
```

OTP uses the shared backend MSG91 integration. Set `MSG91_DEBUG=false` in `backend/.env` for real SMS (and on the deployed API for release APKs).

```bash
# Release APK against production API (real OTP if server has MSG91_DEBUG=false)
flutter build apk --release

# Release APK against your LAN backend
flutter build apk --release --dart-define=API_BASE_URL=http://192.168.x.x:5000
```

## App flow (same as web mobile)

1. Website home → Apply Now  
2. Mobile + consents → Get OTP → OTP sheet  
3. Basic Details (PAN, PIN, purpose)  
4. Approved Offer (amount, EMI)  
5. Complete KYC (multipart submit)  
6. Disburse → Profile  

Brand colors: navy `#0B254A`, gold `#B5873E`, font DM Sans.
