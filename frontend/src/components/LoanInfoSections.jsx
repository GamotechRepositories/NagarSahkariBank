import { COMPANY } from '../website/websiteContent'

function LoanInfoSections() {
  return (
    <section className="space-y-6 px-4 py-6 pb-28 text-sm text-slate-700 lg:px-0 lg:pb-6 lg:text-base">
      <article>
        <h2 className="text-lg font-bold text-slate-900">Company Information</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>The Name of the Company is {COMPANY.legalName.toUpperCase()}.</li>
          <li>
            The Registered Office of the Company will be situated in the STATE OF UTTAR PRADESH.
          </li>
        </ol>
      </article>
    </section>
  )
}

export default LoanInfoSections
