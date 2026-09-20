import { COMPANY } from '../website/websiteContent'

export function SectionCard({ title, children, className = '' }) {
  return (
    <section className={`rounded-xl border border-slate-200 bg-white p-4 ${className}`}>
      {title && <h3 className="mb-2.5 text-sm font-semibold text-slate-800">{title}</h3>}
      {children}
    </section>
  )
}

export function InfoRow({ label, value, highlight = false }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-2.5 last:border-0 last:pb-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className={`text-right text-sm font-medium ${highlight ? 'text-green-600' : 'text-slate-900'}`}>
        {value}
      </span>
    </div>
  )
}

export function FieldBox({ label, children, className = '' }) {
  return (
    <div className={`relative pt-3 ${className}`}>
      <label className="pointer-events-none absolute left-3 top-0 z-10 bg-white px-1 text-xs font-semibold text-slate-600 sm:text-sm">
        {label}
      </label>
      {children}
    </div>
  )
}

export function TextInput({
  value,
  onChange,
  onBlur,
  placeholder,
  type = 'text',
  maxLength,
  inputMode,
  disabled = false,
  autoComplete,
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      maxLength={maxLength}
      inputMode={inputMode}
      disabled={disabled}
      autoComplete={autoComplete}
      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-600 outline-none placeholder:text-slate-400 focus:border-[var(--brand)] disabled:bg-slate-100"
    />
  )
}

export function TextArea({ value, onChange, placeholder, rows = 3, disabled = false }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-600 outline-none placeholder:text-slate-400 focus:border-[var(--brand)] disabled:bg-slate-100"
    />
  )
}

export function TextSelect({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-[var(--brand)]"
    >
      {children}
    </select>
  )
}

export function UploadBox({ label, hint = 'Click to upload', name, file, onChange, accept }) {
  const inputId = `upload-${name || label.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-4 text-center">
      <p className="text-xs font-medium text-slate-700">{label}</p>
      <p className="mt-0.5 text-[11px] text-slate-500">{hint}</p>
      <input
        id={inputId}
        type="file"
        name={name}
        accept={accept}
        className="hidden"
        onChange={onChange}
      />
      <label
        htmlFor={inputId}
        className="mt-2 inline-block cursor-pointer rounded-md border border-[var(--brand)] px-3 py-1 text-xs font-medium text-[var(--brand)] hover:bg-[var(--brand-soft)]"
      >
        {file ? 'Change file' : 'Upload'}
      </label>
      {file && (
        <p className="mt-2 truncate text-[11px] font-medium text-green-700" title={file.name}>
          {file.name}
        </p>
      )}
    </div>
  )
}

export function StatusBadge({ status = 'pending' }) {
  const styles = {
    approved: 'bg-green-50 text-green-700',
    pending: 'bg-amber-50 text-amber-700',
    verified: 'bg-[var(--brand-soft)] text-[var(--brand)]',
    success: 'bg-green-50 text-green-700',
  }
  const labels = {
    approved: 'Approved',
    pending: 'Pending',
    verified: 'Verified',
    success: 'Success',
  }
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${styles[status] || styles.pending}`}>
      {labels[status] || status}
    </span>
  )
}

export function DownloadLink({ label }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-[var(--brand)] hover:bg-[var(--brand-soft)]"
    >
      {label}
      <span className="text-slate-400">↓</span>
    </button>
  )
}

export function SupportSection() {
  return (
    <SectionCard title="Customer Support">
      <p className="text-sm text-slate-600">Need help? Reach out to our support team.</p>
      <div className="mt-3 space-y-1 text-sm text-slate-700">
        <p>Phone: <span className="font-medium">{COMPANY.phone}</span></p>
        <p>Email: <span className="font-medium">{COMPANY.email}</span></p>
      </div>
    </SectionCard>
  )
}
