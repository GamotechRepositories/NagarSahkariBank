import { COMPANY, PRIVACY_SECTIONS } from '../websiteContent'
import { ContentSection, FaqList, PageHero } from '../WebsiteUi'

function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Welcome to ${COMPANY.legalName}. We value your trust and are committed to protecting your privacy and ensuring that your personal information is handled responsibly, securely, and transparently.`}
      />

      <ContentSection>
        <p className="mb-6 text-sm text-slate-500">Effective Date: To be updated</p>
        <FaqList items={PRIVACY_SECTIONS.map((section) => ({ q: section.title, a: section.content }))} />
      </ContentSection>

      <ContentSection title="Contact for Privacy Concerns" className="bg-white">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm leading-relaxed text-slate-600">
            If you have any questions, concerns, requests, or complaints regarding this Privacy Policy or the
            processing of your Personal Data, please contact us:
          </p>
          <div className="mt-4 space-y-1 text-sm text-slate-700">
            <p>{COMPANY.legalName}</p>
            <p>Website: {COMPANY.website}</p>
            <p>Email: {COMPANY.email}</p>
            <p>Phone: {COMPANY.phone}</p>
            <p className="pt-2">{COMPANY.address}</p>
          </div>
        </div>
      </ContentSection>
    </>
  )
}

export default PrivacyPage
