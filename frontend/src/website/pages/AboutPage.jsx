import { COMPANY } from '../websiteContent'
import { CardGrid, ContentSection, CtaBanner, PageHero } from '../WebsiteUi'

const ABOUT_SECTIONS = [
  {
    title: 'Who We Are',
    text: 'Nagar Sahkari Bank Ltd. Etawah is a professionally managed organization dedicated to making financial services accessible to every deserving individual. We work with the vision of bridging the gap between traditional financial systems and underserved communities by creating opportunities that empower people to improve their quality of life.',
  },
  {
    title: 'Our Journey',
    text: 'Nagar Sahkari Bank Ltd. Etawah has continuously worked toward strengthening financial accessibility and supporting individuals who aspire to improve their financial well-being. Over the years, we have expanded our reach by adopting technology-driven processes and maintaining complete transparency in every interaction.',
  },
  {
    title: 'Our Purpose',
    text: 'Financial empowerment goes beyond providing access to financial services—it creates opportunities for education, entrepreneurship, employment, and long-term prosperity. At Nagar Sahkari Bank Ltd. Etawah, our purpose is to empower individuals by promoting financial inclusion and helping communities become economically self-reliant.',
  },
  {
    title: 'Corporate Governance',
    text: 'Strong governance is fundamental to the way Nagar Sahkari Bank Ltd. Etawah operates. We maintain robust internal processes, ethical business practices, and transparent decision-making to ensure accountability and responsible operations.',
  },
  {
    title: 'Technology & Innovation',
    text: 'Technology plays a vital role in making financial services more efficient and accessible. Our digital-first approach simplifies customer onboarding, document verification, communication, and service delivery while ensuring robust data security and privacy.',
  },
  {
    title: 'Our Promise',
    text: "At Nagar Sahkari Bank Ltd. Etawah, we don't simply provide financial solutions—we build trust, create opportunities, empower dreams, and strengthen communities.",
  },
]

function AboutPage({ onApplyNow, onNavigate }) {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Empowering Lives Through Financial Inclusion"
        description="At Nagar Sahkari Bank Ltd. Etawah, we believe that financial inclusion is one of the strongest pillars of sustainable social and economic development. As a co-operative bank, we were founded with the objective of promoting financial inclusion, encouraging self-reliance, and supporting the socio-economic development of underserved communities."
      />

      <ContentSection>
        <div className="max-w-4xl space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
          <p>
            Driven by integrity, innovation, and customer satisfaction, we continue to build long-term relationships
            that contribute to financial stability, entrepreneurship, and inclusive economic growth.
          </p>
          <p>
            As a co-operative bank, our primary objective is the promotion of financial inclusion, economic
            empowerment, and community development.
          </p>
        </div>
      </ContentSection>

      <ContentSection title="Learn More About Us" className="bg-white">
        <CardGrid
          items={ABOUT_SECTIONS.map((section) => ({ title: section.title, text: section.text }))}
          columns={2}
        />
      </ContentSection>

      <ContentSection title="Why Choose Nagar Sahkari Bank Ltd. Etawah">
        <CardGrid
          items={[
            { title: 'Trusted Organization', text: 'Operating with integrity, professionalism, and customer-focused values as a co-operative bank.' },
            { title: 'Transparent Processes', text: 'Clear communication with ethical and responsible financial practices.' },
            { title: 'Experienced Team', text: 'Dedicated professionals committed to delivering exceptional customer support.' },
            { title: 'Technology-Driven Services', text: 'Modern digital systems designed for speed, security, and convenience.' },
            { title: 'Customer-Centric Approach', text: 'Personalized guidance tailored to every customer\'s unique financial needs.' },
            { title: 'Long-Term Relationships', text: 'Building trust through transparency, reliability, and consistent service excellence.' },
          ]}
        />
      </ContentSection>

      <CtaBanner
        title={`Let's Build a Better Future Together`}
        subtitle={`${COMPANY.name} is committed to making financial opportunities accessible, responsible, and meaningful for every individual we serve.`}
        onApply={onApplyNow}
        onContact={() => onNavigate('contact')}
      />
    </>
  )
}

export default AboutPage
