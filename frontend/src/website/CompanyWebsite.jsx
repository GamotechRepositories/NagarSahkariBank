import { useEffect, useState } from 'react'
import { WebsiteLayout } from './WebsiteLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import CsrPage from './pages/CsrPage'
import ContactPage from './pages/ContactPage'
import PrivacyPage from './pages/PrivacyPage'
import SignUpPage from './pages/SignUpPage'
import UserProfilePage from '../components/UserProfilePage'

function CompanyWebsite({
  userProfile,
  userToken,
  profileMode,
  signupRequest = 0,
  onApplyNow,
  onViewProfile,
  onLeaveProfile,
  onSignIn,
  onRegistered,
  onLogout,
  onProfileRefresh,
}) {
  const [currentPage, setCurrentPage] = useState(profileMode ? 'profile' : 'home')

  useEffect(() => {
    if (profileMode) {
      setCurrentPage('profile')
    }
  }, [profileMode])

  useEffect(() => {
    if (signupRequest > 0) {
      setCurrentPage('signup')
    }
  }, [signupRequest])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  function handleNavigate(pageId) {
    setCurrentPage(pageId)
    if (pageId !== 'profile') {
      onLeaveProfile?.()
    }
  }

  function handleViewProfile() {
    setCurrentPage('profile')
    onViewProfile?.()
  }

  function renderPage() {
    if (currentPage === 'profile' && userProfile) {
      return (
        <UserProfilePage
          profile={userProfile}
          userToken={userToken}
          onLogout={onLogout}
          onBackHome={() => handleNavigate('home')}
          onProfileRefresh={onProfileRefresh}
        />
      )
    }

    const commonProps = {
      onApplyNow,
      onNavigate: handleNavigate,
    }

    switch (currentPage) {
      case 'about':
        return <AboutPage {...commonProps} />
      case 'services':
        return <ServicesPage {...commonProps} />
      case 'csr':
        return <CsrPage {...commonProps} />
      case 'contact':
        return <ContactPage />
      case 'privacy':
        return <PrivacyPage />
      case 'signup':
        return <SignUpPage onRegistered={onRegistered} onSignIn={onSignIn} />
      default:
        return <HomePage {...commonProps} />
    }
  }

  return (
    <WebsiteLayout
      currentPage={['profile', 'signup'].includes(currentPage) ? 'home' : currentPage}
      onNavigate={handleNavigate}
      onApplyNow={onApplyNow}
      onViewProfile={handleViewProfile}
      onSignIn={onSignIn}
      onSignUp={() => handleNavigate('signup')}
      onLogout={onLogout}
      userProfile={userProfile}
    >
      {renderPage()}
    </WebsiteLayout>
  )
}

export default CompanyWebsite
