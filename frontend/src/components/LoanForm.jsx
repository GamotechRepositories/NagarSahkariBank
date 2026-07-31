function LoanForm({
  mobileNumber,
  setMobileNumber,
  consentOne,
  setConsentOne,
  consentTwo,
  setConsentTwo,
  consentThree,
  setConsentThree,
  isOtpEnabled,
  loading,
  status,
  setStatus,
  onSendOtp,
}) {
  return (
    <>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Apply Now</h1>
      <p className="mt-2 text-sm text-slate-600 sm:text-base">
        We will send you a one time password to verify your mobile number
      </p>

      <label className="mt-5 block text-xs font-semibold tracking-wide text-slate-500 sm:mt-6">
        ENTER MOBILE NUMBER
      </label>
      <div className="mt-3 flex overflow-hidden rounded-2xl border border-slate-300">
        <span className="flex items-center bg-slate-100 px-3 text-sm font-semibold text-slate-700 sm:px-4 sm:text-base">
          +91
        </span>
        <input
          type="tel"
          placeholder="Enter 10 Digit mobile number"
          className="w-full px-3 py-3 text-base outline-none placeholder:text-slate-400 sm:px-4"
          value={mobileNumber}
          onChange={(event) => {
            const digitsOnly = event.target.value.replace(/\D/g, '').slice(0, 10)
            setMobileNumber(digitsOnly)
            setStatus(null)
          }}
          maxLength={10}
        />
      </div>

      <div className="mt-5 space-y-3 text-xs leading-relaxed text-slate-700 sm:mt-6 lg:text-sm">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={consentOne}
            onChange={(event) => setConsentOne(event.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[var(--brand)]"
          />
          <span>
            By proceeding, you agree to our Terms & Conditions, Privacy Policy, and consent to us
            accessing your credit information from credit bureaus for processing your application.
          </span>
        </label>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={consentTwo}
            onChange={(event) => setConsentTwo(event.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[var(--brand)]"
          />
          <span>
            I consent to receive loan-related updates, alerts, and communications via WhatsApp,
            SMS, RCS and any other communication channel on my registered mobile number.
          </span>
        </label>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={consentThree}
            onChange={(event) => setConsentThree(event.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[var(--brand)]"
          />
          <span>
            I hereby provide my consent to fetch and verify my KYC details from the CKYC registry
            for the purpose of processing my application.
          </span>
        </label>
      </div>

      {status && (
        <p
          className={`mt-4 rounded-xl px-4 py-3 text-sm font-medium ${
            status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
          }`}
        >
          {status.message}
        </p>
      )}

      {/* Desktop Get OTP button */}
      <button
        type="button"
        disabled={!isOtpEnabled || loading}
        onClick={onSendOtp}
        className="mt-6 hidden w-full rounded-xl bg-[var(--brand)] py-3 text-base font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300 lg:block"
      >
        {loading ? 'Sending...' : 'Get OTP'}
      </button>
    </>
  )
}

export default LoanForm
