import { CSR_FOCUS } from '../websiteContent'
import { CardGrid, ContentSection, CtaBanner, PageHero } from '../WebsiteUi'

function CsrPage({ onApplyNow, onNavigate }) {
  return (
    <>
      <PageHero
        eyebrow="Corporate Social Responsibility"
        title="Creating Sustainable Impact Beyond Financial Services"
        description="The bank was founded to make banking easier for the poor and backward people of the region. Our community work continues that purpose through inclusion, education, and local development."
      />

      <ContentSection>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Our CSR Vision</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              To continue the founder’s purpose: easy, dignified banking for the people of Etawah, with special care
              for those who have historically had less access to formal finance.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Our CSR Mission</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              To support inclusive and sustainable development by implementing programs that empower individuals,
              encourage economic participation, and create equal opportunities for growth.
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Our Focus Areas" className="bg-white">
        <CardGrid items={CSR_FOCUS} />
      </ContentSection>

      <ContentSection title="Our Approach">
        <div className="max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-600 shadow-sm">
          <p>
            Every CSR initiative undertaken by Nagar Sahkari Bank Ltd. Etawah is guided by a simple philosophy—create sustainable
            impact through meaningful action. Our initiatives are designed after understanding the unique needs of
            communities and are implemented with measurable outcomes in mind.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Community participation</li>
            <li>Sustainable development</li>
            <li>Transparency and accountability</li>
            <li>Inclusive growth</li>
            <li>Ethical practices</li>
            <li>Long-term social impact</li>
          </ul>
        </div>
      </ContentSection>

      <ContentSection title="Partner With Us" className="bg-white">
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--brand-soft)] p-6">
          <p className="text-sm leading-relaxed text-slate-700">
            Nagar Sahkari Bank Ltd. Etawah welcomes partnerships with organizations, educational institutions, corporate entities,
            NGOs, volunteers, and community leaders who share our vision of creating sustainable social impact.
            Together, we can develop initiatives that empower individuals, strengthen communities, and contribute to a
            financially inclusive and socially responsible India.
          </p>
        </div>
      </ContentSection>

      <CtaBanner
        title="Together We Can Create Meaningful Change"
        subtitle="Let's work together to transform lives, inspire hope, and build stronger communities for future generations."
        onApply={onApplyNow}
        onContact={() => onNavigate('contact')}
      />
    </>
  )
}

export default CsrPage
