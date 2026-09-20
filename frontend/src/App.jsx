import { useCallback, useEffect, useState } from 'react'
import HeroSection from './components/HeroSection'
import LoanForm from './components/LoanForm'
import LoanInfoSections from './components/LoanInfoSections'
import BasicDetailsPage from './components/BasicDetailsPage'
import ApprovedOfferPage from './components/ApprovedOfferPage'
import CompleteKycPage from './components/CompleteKycPage'
import DisburseLoanPage from './components/DisburseLoanPage'
import UserSignInModal from './components/UserSignInModal'
import WelcomeProfilePopup from './components/WelcomeProfilePopup'
import CompanyWebsite from './website/CompanyWebsite'
import { COMPANY } from './website/websiteContent'
import { API_BASE } from './config/api'
import {
  clearOtpSession,
  getOtpSession,
  saveOtpSession,
} from './utils/otpSession'
const USER_TOKEN_KEY = 'user_auth_token'

function App() {
  const [mobileNumber, setMobileNumber] = useState('')
  const [consentOne, setConsentOne] = useState(false)
  const [consentTwo, setConsentTwo] = useState(false)
  const [consentThree, setConsentThree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [applyPhase, setApplyPhase] = useState('mobile')
  const [otpSendError, setOtpSendError] = useState('')
  const [otpSending, setOtpSending] = useState(false)
  const [otpVerifiedMobile, setOtpVerifiedMobile] = useState('')
  const [appMode, setAppMode] = useState('website')
  const [currentStep, setCurrentStep] = useState(0)
  const [applicationData, setApplicationData] = useState({
    pan: '',
    pinCode: '',
    loanPurpose: '',
    loanAmount: 0,
    processingFee: 0,
    emi: 0,
    totalPayable: 0,
    netCreditedAmount: 0,
    offerValidUntil: '',
  })
  const [userToken, setUserToken] = useState(() => localStorage.getItem(USER_TOKEN_KEY) || '')
  const [userProfile, setUserProfile] = useState(null)
  const [checkingSession, setCheckingSession] = useState(Boolean(localStorage.getItem(USER_TOKEN_KEY)))
  const [showSignIn, setShowSignIn] = useState(false)
  const [showWelcomePopup, setShowWelcomePopup] = useState(false)
  const [signupRequest, setSignupRequest] = useState(0)

  const cleanedMobile = mobileNumber.replace(/\D/g, '').slice(0, 10)
  const isMobileValid = cleanedMobile.length === 10
  const isOtpEnabled = isMobileValid && consentOne && consentTwo && consentThree
  const isCurrentMobileVerified = otpVerifiedMobile === cleanedMobile && cleanedMobile.length === 10

  useEffect(() => {
    if (otpVerifiedMobile && otpVerifiedMobile !== cleanedMobile) {
      setOtpVerifiedMobile('')
      setCurrentStep(0)
    }
  }, [cleanedMobile, otpVerifiedMobile])

  useEffect(() => {
    if (currentStep > 0 && !isCurrentMobileVerified) {
      setCurrentStep(0)
      setApplyPhase('otp')
    }
  }, [currentStep, isCurrentMobileVerified])

  const clearUserSession = useCallback(() => {
    localStorage.removeItem(USER_TOKEN_KEY)
    setUserToken('')
    setUserProfile(null)
    setShowWelcomePopup(false)
    setAppMode('website')
  }, [])

  const loadUserProfile = useCallback(
    async (token) => {
      const response = await fetch(`${API_BASE}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()

      if (response.status === 401 || response.status === 403) {
        clearUserSession()
        return null
      }

      if (response.ok && data.success) {
        setUserProfile(data.data)
        return data.data
      }

      return null
    },
    [clearUserSession],
  )

  useEffect(() => {
    const existingToken = localStorage.getItem(USER_TOKEN_KEY)
    if (!existingToken) {
      setCheckingSession(false)
      return
    }

    let cancelled = false

    async function restoreSession() {
      try {
        const profile = await loadUserProfile(existingToken)
        if (!cancelled && profile) {
          setUserToken(existingToken)
          setAppMode('website')
        }
      } catch {
        // Keep website if profile cannot be restored
      } finally {
        if (!cancelled) setCheckingSession(false)
      }
    }

    restoreSession()
    return () => {
      cancelled = true
    }
  }, [loadUserProfile])

  useEffect(() => {
    if (!userToken || appMode !== 'website') return undefined

    const intervalId = setInterval(() => {
      loadUserProfile(userToken)
    }, 15000)

    return () => clearInterval(intervalId)
  }, [userToken, appMode, loadUserProfile])

  function startApplication() {
    setAppMode('apply')
    setCurrentStep(0)
    setOtpSendError('')
    setStatus(null)

    const pendingSession = getOtpSession()
    if (pendingSession) {
      setMobileNumber(pendingSession.mobile)
      setApplyPhase('otp')
      return
    }

    setApplyPhase('mobile')
  }

  function openSignUp() {
    setShowSignIn(false)
    setAppMode('website')
    setSignupRequest((count) => count + 1)
  }

  async function completeUserSession({ token, user }) {
    localStorage.setItem(USER_TOKEN_KEY, token)
    setUserToken(token)
    setUserProfile(user)
    setShowSignIn(false)
    setShowWelcomePopup(false)
    if (user?.mobile) {
      setMobileNumber(String(user.mobile).replace(/\D/g, '').slice(0, 10))
    }
    setAppMode('apply')
    setCurrentStep(0)
    setApplyPhase('mobile')
    setOtpVerifiedMobile('')
    setOtpSendError('')
    setStatus(null)
    try {
      await loadUserProfile(token)
    } catch {
      // Keep signed-in user from auth response
    }
  }

  function handleChangeMobile() {
    setApplyPhase('mobile')
    setOtpSendError('')
  }

  async function handleSendOtp() {
    if (!isOtpEnabled || loading || otpSending) return
    setLoading(true)
    setOtpSending(true)
    setOtpSendError('')
    setStatus(null)
    setOtpVerifiedMobile('')
    try {
      const response = await fetch(`${API_BASE}/api/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: cleanedMobile }),
      })
      const data = await response.json()
      if (response.ok && data.success) {
        saveOtpSession(cleanedMobile)
        setOtpSendError('')
        setApplyPhase('otp')
      } else {
        setApplyPhase('mobile')
        setStatus({ type: 'error', message: data.message || 'Failed to send OTP.' })
        setOtpSendError(data.message || 'Failed to send OTP.')
      }
    } catch {
      setApplyPhase('mobile')
      setStatus({ type: 'error', message: 'Could not reach the server. Please try again.' })
      setOtpSendError('Could not reach the server. Please try again.')
    } finally {
      setLoading(false)
      setOtpSending(false)
    }
  }

  function handleOtpVerified() {
    clearOtpSession()
    setOtpVerifiedMobile(cleanedMobile)
    setApplyPhase('mobile')
    setOtpSendError('')
    setCurrentStep(1)
  }

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-sm text-slate-500">Loading your account...</p>
      </main>
    )
  }

  if (appMode === 'website' || (appMode === 'profile' && userProfile)) {
    return (
      <>
        <CompanyWebsite
          userProfile={userProfile}
          userToken={userToken}
          profileMode={appMode === 'profile'}
          signupRequest={signupRequest}
          onApplyNow={startApplication}
          onViewProfile={() => setAppMode('profile')}
          onLeaveProfile={() => setAppMode('website')}
          onSignIn={startApplication}
          onRegistered={completeUserSession}
          onLogout={clearUserSession}
          onProfileRefresh={setUserProfile}
        />
        {showSignIn && !userProfile ? (
          <UserSignInModal
            onClose={() => setShowSignIn(false)}
            onSignUp={openSignUp}
            onSignedIn={completeUserSession}
          />
        ) : null}
        {showWelcomePopup && userProfile ? (
          <WelcomeProfilePopup
            profile={userProfile}
            onClose={() => setShowWelcomePopup(false)}
            onViewProfile={() => {
              setShowWelcomePopup(false)
              setAppMode('profile')
            }}
          />
        ) : null}
      </>
    )
  }

  if (currentStep === 1 && isCurrentMobileVerified) {
    return (
      <BasicDetailsPage
        onContinue={(details) => {
          setApplicationData((prev) => ({ ...prev, ...details }))
          setCurrentStep(2)
        }}
        onBack={() => setCurrentStep(0)}
      />
    )
  }

  if (currentStep === 2) {
    return (
      <ApprovedOfferPage
        onContinue={(offerDetails) => {
          setApplicationData((prev) => ({ ...prev, ...offerDetails }))
          setCurrentStep(3)
        }}
        onBack={() => setCurrentStep(1)}
      />
    )
  }

  if (currentStep === 3) {
    return (
      <CompleteKycPage
        mobileNumber={cleanedMobile}
        initialPan={applicationData.pan}
        pinCode={applicationData.pinCode}
        loanPurpose={applicationData.loanPurpose}
        loanAmount={applicationData.loanAmount}
        processingFee={applicationData.processingFee}
        emi={applicationData.emi}
        totalPayable={applicationData.totalPayable}
        netCreditedAmount={applicationData.netCreditedAmount}
        offerValidUntil={applicationData.offerValidUntil}
        onContinue={({ token, user }) => {
          if (token) {
            localStorage.setItem(USER_TOKEN_KEY, token)
            setUserToken(token)
          }
          if (user) setUserProfile(user)
          setCurrentStep(4)
        }}
        onBack={() => setCurrentStep(2)}
      />
    )
  }

  if (currentStep === 4) {
    return (
      <DisburseLoanPage
        user={userProfile}
        userToken={userToken}
        onContinue={(updatedProfile) => {
          if (updatedProfile) setUserProfile(updatedProfile)
          setCurrentStep(0)
          setAppMode('website')
          setShowWelcomePopup(true)
        }}
        onBack={() => setCurrentStep(3)}
      />
    )
  }

  return (
    <main className="min-h-screen bg-slate-100 py-0 text-slate-800 lg:py-8">
      <div className="mx-auto w-full max-w-6xl bg-white shadow-sm lg:rounded-2xl lg:shadow-xl">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-6">
          <img
            src={COMPANY.logo}
            alt={COMPANY.name}
            className="h-9 w-auto max-w-[13rem] object-contain object-left sm:h-10 sm:max-w-[16rem]"
          />
          <div className="flex items-center gap-2">
            <p className="hidden text-sm font-medium text-slate-500 sm:block">Loan Application</p>
            <button
              type="button"
              onClick={() => {
                setAppMode('website')
                setCurrentStep(0)
                setApplyPhase('mobile')
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              ← Home
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-5 lg:gap-8 lg:px-8 lg:py-8">
          <div className="order-1 lg:hidden">
            <HeroSection />
          </div>

          <section className="order-2 px-4 py-6 pb-28 lg:order-2 lg:col-span-2 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:self-start lg:overflow-y-auto lg:rounded-2xl lg:border lg:border-slate-200 lg:bg-white lg:px-6 lg:py-6 lg:pb-6 lg:shadow-sm">
            <LoanForm
              mobileNumber={mobileNumber}
              setMobileNumber={setMobileNumber}
              consentOne={consentOne}
              setConsentOne={setConsentOne}
              consentTwo={consentTwo}
              setConsentTwo={setConsentTwo}
              consentThree={consentThree}
              setConsentThree={setConsentThree}
              isOtpEnabled={isOtpEnabled}
              loading={loading}
              status={status}
              setStatus={setStatus}
              onSendOtp={handleSendOtp}
              applyPhase={applyPhase}
              otpSendError={otpSendError}
              otpSending={otpSending}
              onOtpVerified={handleOtpVerified}
              onChangeMobile={handleChangeMobile}
            />
          </section>

          <div className="order-3 lg:order-1 lg:col-span-3">
            <div className="hidden lg:block">
              <HeroSection />
            </div>
            <LoanInfoSections />
          </div>
        </div>

      </div>

    </main>
  )
}

export default App
