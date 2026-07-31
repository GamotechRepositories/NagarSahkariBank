import { useEffect, useState } from 'react'
import { WebsiteLayout } from './WebsiteLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import CsrPage from './pages/CsrPage'
import ContactPage from './pages/ContactPage'
import PrivacyPage from './pages/PrivacyPage'
import UserProfilePage from '../components/UserProfilePage'

function CompanyWebsite({
  userProfile,
  userToken,
  profileMode,
  onApplyNow,
  onViewProfile,
  onLeaveProfile,
  onSignIn,
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
      default:
        return <HomePage {...commonProps} />
    }
  }

  return (
    <WebsiteLayout
      currentPage={currentPage === 'profile' ? 'home' : currentPage}
      onNavigate={handleNavigate}
      onApplyNow={onApplyNow}
      onViewProfile={handleViewProfile}
      onSignIn={onSignIn}
      onLogout={onLogout}
      userProfile={userProfile}
    >
      {renderPage()}
    </WebsiteLayout>
  )
}

export default CompanyWebsite
