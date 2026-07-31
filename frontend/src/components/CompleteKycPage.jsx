import { useState } from 'react'
import LoanProcessLayout from './LoanProcessLayout'
import {
  SectionCard,
  FieldBox,
  TextInput,
  TextArea,
  TextSelect,
  UploadBox,
  SupportSection,
} from './ProcessUi'
import {
  getAadhaarError,
  getPanError,
  sanitizeAadhaar,
  sanitizePan,
} from '../utils/idValidation'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const initialPrefs = {
  sms: true,
  email: true,
  phone: false,
  whatsapp: false,
}

function CompleteKycPage({
  mobileNumber,
  initialPan = '',
  pinCode = '',
  loanPurpose = '',
  loanAmount = 0,
  processingFee = 0,
  emi = 0,
  totalPayable = 0,
  netCreditedAmount = 0,
  offerValidUntil = '',
  onContinue,
  onBack,
}) {
  const [fullName, setFullName] = useState('')
  const [parentName, setParentName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState('')
  const [residentialAddress, setResidentialAddress] = useState('')
  const [permanentAddress, setPermanentAddress] = useState('')
  const [sameAsResidential, setSameAsResidential] = useState(false)
  const [occupation, setOccupation] = useState('')
  const [employerDetails, setEmployerDetails] = useState('')
  const [incomeDetails, setIncomeDetails] = useState('')
  const [educationalInfo, setEducationalInfo] = useState('')
  const [nomineeName, setNomineeName] = useState('')
  const [nomineeRelation, setNomineeRelation] = useState('')
  const [nomineeMobile, setNomineeMobile] = useState('')
  const [emergencyContactName, setEmergencyContactName] = useState('')
  const [emergencyContactRelation, setEmergencyContactRelation] = useState('')
  const [emergencyContactMobile, setEmergencyContactMobile] = useState('')
  const [reference1Name, setReference1Name] = useState('')
  const [reference1Mobile, setReference1Mobile] = useState('')
  const [reference2Name, setReference2Name] = useState('')
  const [reference2Mobile, setReference2Mobile] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [customerFeedback, setCustomerFeedback] = useState('')
  const [communicationPreferences, setCommunicationPreferences] = useState(initialPrefs)
  const [aadhaar, setAadhaar] = useState('')
  const [pan, setPan] = useState(initialPan || '')
  const [accountNumber, setAccountNumber] = useState('')
  const [ifsc, setIfsc] = useState('')
  const [eSignConsent, setESignConsent] = useState(false)
  const [files, setFiles] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [touched, setTouched] = useState({ pan: false, aadhaar: false })

  function handleFileChange(field) {
    return (event) => {
      const file = event.target.files?.[0] || null
      setFiles((prev) => ({ ...prev, [field]: file }))
    }
  }

  function handleSameAddress(checked) {
    setSameAsResidential(checked)
    if (checked) setPermanentAddress(residentialAddress)
  }

  const panError = touched.pan ? getPanError(pan) : ''
  const aadhaarError = touched.aadhaar ? getAadhaarError(aadhaar) : ''
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const passwordValid = password.length >= 6 && password === confirmPassword

  function collectValidationErrors() {
    const errors = []

    if (!String(mobileNumber || '').replace(/\D/g, '').match(/^\d{10}$/)) {
      errors.push('Valid 10-digit mobile number is required. Go back and complete OTP verification.')
    }
    if (!loanAmount || Number(loanAmount) <= 0) {
      errors.push('Loan amount is missing. Go back to the Approved Offer step and apply an amount.')
    }
    if (!fullName.trim()) errors.push('Full name is required.')
    if (!parentName.trim()) errors.push("Parent's name is required.")
    if (!dateOfBirth) errors.push('Date of birth is required.')
    if (!gender) errors.push('Gender is required.')
    if (!emailValid) errors.push('Valid email address is required.')
    if (!residentialAddress.trim()) errors.push('Residential address is required.')
    if (!permanentAddress.trim()) errors.push('Permanent address is required.')
    if (!occupation.trim()) errors.push('Occupation is required.')
    if (!employerDetails.trim()) errors.push('Employer details are required.')
    if (!incomeDetails.trim()) errors.push('Income details are required.')
    if (!educationalInfo.trim()) errors.push('Educational information is required.')
    if (!nomineeName.trim()) errors.push('Nominee name is required.')
    if (!nomineeRelation.trim()) errors.push('Nominee relation is required.')
    if (nomineeMobile.replace(/\D/g, '').length !== 10) errors.push('Nominee mobile must be 10 digits.')
    if (!emergencyContactName.trim()) errors.push('Emergency contact name is required.')
    if (!emergencyContactRelation.trim()) errors.push('Emergency contact relation is required.')
    if (emergencyContactMobile.replace(/\D/g, '').length !== 10) {
      errors.push('Emergency contact mobile must be 10 digits.')
    }
    if (!reference1Name.trim()) errors.push('Reference 1 name is required.')
    if (reference1Mobile.replace(/\D/g, '').length !== 10) errors.push('Reference 1 mobile must be 10 digits.')
    if (!reference2Name.trim()) errors.push('Reference 2 name is required.')
    if (reference2Mobile.replace(/\D/g, '').length !== 10) errors.push('Reference 2 mobile must be 10 digits.')
    if (username.trim().length < 4) errors.push('Username must be at least 4 characters.')
    if (!passwordValid) errors.push('Password must be at least 6 characters and match confirmation.')
    if (!files.photograph) errors.push('Profile photograph is required.')
    if (!files.signature) errors.push('Signature upload is required.')

    const nextPanError = getPanError(pan)
    if (nextPanError) errors.push(nextPanError)

    const nextAadhaarError = getAadhaarError(aadhaar)
    if (nextAadhaarError) errors.push(nextAadhaarError)

    if (!accountNumber.trim()) errors.push('Account number is required.')
    if (!ifsc.trim()) errors.push('IFSC code is required.')
    if (!eSignConsent) errors.push('Please accept the eSign consent to submit.')

    return errors
  }

  const validationErrors = collectValidationErrors()
  const canSubmit = validationErrors.length === 0 && !submitting

  async function handleSubmit() {
    setTouched({ pan: true, aadhaar: true })

    const errors = collectValidationErrors()
    if (errors.length > 0) {
      setError(errors[0])
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setSubmitting(true)
    setError('')

    const formData = new FormData()
    formData.append('mobile', mobileNumber)
    formData.append('fullName', fullName.trim())
    formData.append('parentName', parentName.trim())
    formData.append('dateOfBirth', dateOfBirth)
    formData.append('gender', gender)
    formData.append('email', email.trim().toLowerCase())
    formData.append('residentialAddress', residentialAddress.trim())
    formData.append('permanentAddress', permanentAddress.trim())
    formData.append('address', residentialAddress.trim())
    formData.append('occupation', occupation.trim())
    formData.append('employerDetails', employerDetails.trim())
    formData.append('employment', occupation.trim())
    formData.append('incomeDetails', incomeDetails.trim())
    formData.append('income', incomeDetails.replace(/\D/g, '') || incomeDetails.trim())
    formData.append('educationalInfo', educationalInfo.trim())
    formData.append('nomineeName', nomineeName.trim())
    formData.append('nomineeRelation', nomineeRelation.trim())
    formData.append('nomineeMobile', nomineeMobile.replace(/\D/g, '').slice(0, 10))
    formData.append('emergencyContactName', emergencyContactName.trim())
    formData.append('emergencyContactRelation', emergencyContactRelation.trim())
    formData.append(
      'emergencyContactMobile',
      emergencyContactMobile.replace(/\D/g, '').slice(0, 10),
    )
    formData.append('reference1Name', reference1Name.trim())
    formData.append('reference1Mobile', reference1Mobile.replace(/\D/g, '').slice(0, 10))
    formData.append('reference2Name', reference2Name.trim())
    formData.append('reference2Mobile', reference2Mobile.replace(/\D/g, '').slice(0, 10))
    formData.append('username', username.trim())
    formData.append('password', password)
    formData.append('customerFeedback', customerFeedback.trim())
    formData.append('communicationPreferences', JSON.stringify(communicationPreferences))
    formData.append('aadhaar', sanitizeAadhaar(aadhaar))
    formData.append('pan', sanitizePan(pan))
    formData.append('accountNumber', accountNumber.trim())
    formData.append('ifsc', ifsc.trim())
    formData.append('pinCode', pinCode)
    formData.append('loanPurpose', loanPurpose)
    formData.append('loanAmount', String(loanAmount))
    formData.append('processingFee', String(processingFee))
    formData.append('emi', String(emi))
    formData.append('totalPayable', String(totalPayable))
    formData.append('netCreditedAmount', String(netCreditedAmount))
    formData.append('offerValidUntil', offerValidUntil)
    formData.append('eSignConsent', String(eSignConsent))

    for (const [field, file] of Object.entries(files)) {
      if (file) formData.append(field, file)
    }

    try {
      const response = await fetch(`${API_BASE}/api/kyc/submit`, {
        method: 'POST',
        body: formData,
      })

      let data = {}
      try {
        data = await response.json()
      } catch {
        setError('Server returned an unexpected response. Please try again.')
        return
      }

      if (response.ok && data.success) {
        onContinue({
          token: data.data?.token,
          user: data.data?.user,
          submission: data.data?.submission,
        })
      } else {
        setError(data.message || 'Failed to submit KYC. Please try again.')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch {
      setError('Could not reach the server. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <LoanProcessLayout
      activeStep={3}
      onContinue={handleSubmit}
      onBack={onBack}
      continueLabel="Submit Application"
      continueDisabled={submitting}
      continueLoading={submitting}
    >
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      {!canSubmit && validationErrors.length > 0 && !error ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <p className="font-medium">Complete these items to submit:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {validationErrors.slice(0, 5).map((item) => (
              <li key={item}>{item}</li>
            ))}
            {validationErrors.length > 5 ? (
              <li>and {validationErrors.length - 5} more...</li>
            ) : null}
          </ul>
        </div>
      ) : null}

      <SectionCard title="Personal Details">
        <div className="grid gap-5 lg:grid-cols-2">
          <FieldBox label="Full Name *">
            <TextInput
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name"
            />
          </FieldBox>
          <FieldBox label="Father's or Mother's Name *">
            <TextInput
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              placeholder="Enter parent name"
            />
          </FieldBox>
          <FieldBox label="Date of Birth *">
            <TextInput
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </FieldBox>
          <FieldBox label="Gender *">
            <TextSelect value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </TextSelect>
          </FieldBox>
          <FieldBox label="Mobile Number *">
            <TextInput value={mobileNumber} disabled placeholder="Mobile number" />
          </FieldBox>
          <FieldBox label="Email Address *">
            <TextInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              autoComplete="email"
            />
          </FieldBox>
        </div>
      </SectionCard>

      <SectionCard title="Address Details">
        <div className="grid gap-5">
          <FieldBox label="Residential Address *">
            <TextArea
              value={residentialAddress}
              onChange={(e) => {
                setResidentialAddress(e.target.value)
                if (sameAsResidential) setPermanentAddress(e.target.value)
              }}
              placeholder="House / street / city / state / PIN"
            />
          </FieldBox>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={sameAsResidential}
              onChange={(e) => handleSameAddress(e.target.checked)}
              className="h-4 w-4 accent-[var(--brand)]"
            />
            Permanent address same as residential
          </label>
          <FieldBox label="Permanent Address *">
            <TextArea
              value={permanentAddress}
              onChange={(e) => setPermanentAddress(e.target.value)}
              placeholder="Permanent address"
              disabled={sameAsResidential}
            />
          </FieldBox>
        </div>
      </SectionCard>

      <SectionCard title="Occupation & Income">
        <div className="grid gap-5 lg:grid-cols-2">
          <FieldBox label="Occupation *">
            <TextInput
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              placeholder="e.g. Salaried / Self-employed"
            />
          </FieldBox>
          <FieldBox label="Income Details *">
            <TextInput
              value={incomeDetails}
              onChange={(e) => setIncomeDetails(e.target.value)}
              placeholder="Monthly / annual income details"
            />
          </FieldBox>
          <FieldBox label="Employer Details *" className="lg:col-span-2">
            <TextArea
              value={employerDetails}
              onChange={(e) => setEmployerDetails(e.target.value)}
              placeholder="Employer name, address, and contact"
            />
          </FieldBox>
          <FieldBox label="Educational Information *" className="lg:col-span-2">
            <TextArea
              value={educationalInfo}
              onChange={(e) => setEducationalInfo(e.target.value)}
              placeholder="Highest qualification, institution, year"
            />
          </FieldBox>
        </div>
      </SectionCard>

      <SectionCard title="Nominee Information">
        <div className="grid gap-5 lg:grid-cols-3">
          <FieldBox label="Nominee Name *">
            <TextInput
              value={nomineeName}
              onChange={(e) => setNomineeName(e.target.value)}
              placeholder="Nominee full name"
            />
          </FieldBox>
          <FieldBox label="Relation *">
            <TextInput
              value={nomineeRelation}
              onChange={(e) => setNomineeRelation(e.target.value)}
              placeholder="e.g. Spouse / Parent"
            />
          </FieldBox>
          <FieldBox label="Nominee Mobile *">
            <TextInput
              value={nomineeMobile}
              onChange={(e) => setNomineeMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit mobile"
              inputMode="numeric"
              maxLength={10}
            />
          </FieldBox>
        </div>
      </SectionCard>

      <SectionCard title="Emergency Contact Details">
        <div className="grid gap-5 lg:grid-cols-3">
          <FieldBox label="Contact Name *">
            <TextInput
              value={emergencyContactName}
              onChange={(e) => setEmergencyContactName(e.target.value)}
              placeholder="Emergency contact name"
            />
          </FieldBox>
          <FieldBox label="Relation *">
            <TextInput
              value={emergencyContactRelation}
              onChange={(e) => setEmergencyContactRelation(e.target.value)}
              placeholder="Relation"
            />
          </FieldBox>
          <FieldBox label="Mobile *">
            <TextInput
              value={emergencyContactMobile}
              onChange={(e) =>
                setEmergencyContactMobile(e.target.value.replace(/\D/g, '').slice(0, 10))
              }
              placeholder="10-digit mobile"
              inputMode="numeric"
              maxLength={10}
            />
          </FieldBox>
        </div>
      </SectionCard>

      <SectionCard title="Customer References">
        <div className="grid gap-5 lg:grid-cols-2">
          <FieldBox label="Reference 1 Name *">
            <TextInput
              value={reference1Name}
              onChange={(e) => setReference1Name(e.target.value)}
              placeholder="First reference name"
            />
          </FieldBox>
          <FieldBox label="Reference 1 Mobile *">
            <TextInput
              value={reference1Mobile}
              onChange={(e) => setReference1Mobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit mobile"
              inputMode="numeric"
              maxLength={10}
            />
          </FieldBox>
          <FieldBox label="Reference 2 Name *">
            <TextInput
              value={reference2Name}
              onChange={(e) => setReference2Name(e.target.value)}
              placeholder="Second reference name"
            />
          </FieldBox>
          <FieldBox label="Reference 2 Mobile *">
            <TextInput
              value={reference2Mobile}
              onChange={(e) => setReference2Mobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit mobile"
              inputMode="numeric"
              maxLength={10}
            />
          </FieldBox>
        </div>
      </SectionCard>

      <SectionCard title="Identity Documents">
        <div className="grid gap-5 lg:grid-cols-2">
          <FieldBox label="Aadhaar Number *">
            <TextInput
              value={aadhaar}
              onChange={(e) => setAadhaar(sanitizeAadhaar(e.target.value))}
              onBlur={() => setTouched((prev) => ({ ...prev, aadhaar: true }))}
              placeholder="12-digit Aadhaar"
              maxLength={12}
              inputMode="numeric"
            />
          </FieldBox>
          <FieldBox label="PAN Number *">
            <TextInput
              value={pan}
              onChange={(e) => setPan(sanitizePan(e.target.value))}
              onBlur={() => setTouched((prev) => ({ ...prev, pan: true }))}
              placeholder="PAN number"
              maxLength={10}
            />
          </FieldBox>
        </div>
        {aadhaarError && <p className="mt-1.5 text-xs text-red-600">{aadhaarError}</p>}
        {panError && <p className="mt-1.5 text-xs text-red-600">{panError}</p>}
      </SectionCard>

      <SectionCard title="Bank Account Details">
        <div className="grid gap-5 lg:grid-cols-2">
          <FieldBox label="Account Number *">
            <TextInput
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="Account number"
            />
          </FieldBox>
          <FieldBox label="IFSC Code *">
            <TextInput
              value={ifsc}
              onChange={(e) => setIfsc(e.target.value.toUpperCase())}
              placeholder="IFSC code"
            />
          </FieldBox>
        </div>
      </SectionCard>

      <SectionCard title="Profile Photograph & Signature">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <UploadBox
            name="photograph"
            label="Profile Photograph *"
            hint="Clear passport-style photo"
            file={files.photograph}
            onChange={handleFileChange('photograph')}
            accept="image/*"
          />
          <UploadBox
            name="signature"
            label="Signature *"
            hint="Upload signature image"
            file={files.signature}
            onChange={handleFileChange('signature')}
            accept="image/*"
          />
          <UploadBox
            name="selfie"
            label="Selfie"
            hint="Optional live selfie"
            file={files.selfie}
            onChange={handleFileChange('selfie')}
            accept="image/*"
          />
        </div>
      </SectionCard>

      <SectionCard title="Supporting Documents">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <UploadBox
            name="aadhaarDoc"
            label="Aadhaar"
            file={files.aadhaarDoc}
            onChange={handleFileChange('aadhaarDoc')}
            accept="image/*,.pdf"
          />
          <UploadBox
            name="panDoc"
            label="PAN"
            file={files.panDoc}
            onChange={handleFileChange('panDoc')}
            accept="image/*,.pdf"
          />
          <UploadBox
            name="salarySlips"
            label="Salary Slips"
            file={files.salarySlips}
            onChange={handleFileChange('salarySlips')}
            accept="image/*,.pdf"
          />
          <UploadBox
            name="bankStatements"
            label="Bank Statements"
            file={files.bankStatements}
            onChange={handleFileChange('bankStatements')}
            accept="image/*,.pdf"
          />
        </div>
      </SectionCard>

      <SectionCard title="Username and Password">
        <div className="grid gap-5 lg:grid-cols-3">
          <FieldBox label="Username *">
            <TextInput
              value={username}
              onChange={(e) => setUsername(e.target.value.trimStart())}
              placeholder="Choose a username"
              autoComplete="username"
            />
          </FieldBox>
          <FieldBox label="Password *">
            <TextInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              autoComplete="new-password"
            />
          </FieldBox>
          <FieldBox label="Confirm Password *">
            <TextInput
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              autoComplete="new-password"
            />
          </FieldBox>
        </div>
      </SectionCard>

      <SectionCard title="Customer Feedback">
        <FieldBox label="Feedback / Comments">
          <TextArea
            value={customerFeedback}
            onChange={(e) => setCustomerFeedback(e.target.value)}
            placeholder="Share any feedback or additional information"
            rows={4}
          />
        </FieldBox>
      </SectionCard>

      <SectionCard title="Communication Preferences">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { key: 'sms', label: 'SMS updates' },
            { key: 'email', label: 'Email updates' },
            { key: 'phone', label: 'Phone calls' },
            { key: 'whatsapp', label: 'WhatsApp updates' },
          ].map((pref) => (
            <label key={pref.key} className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={Boolean(communicationPreferences[pref.key])}
                onChange={(e) =>
                  setCommunicationPreferences((prev) => ({
                    ...prev,
                    [pref.key]: e.target.checked,
                  }))
                }
                className="h-4 w-4 accent-[var(--brand)]"
              />
              {pref.label}
            </label>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="eSign Consent">
        <label className="flex items-start gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={eSignConsent}
            onChange={(e) => setESignConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[var(--brand)]"
          />
          <span>
            I confirm the information is accurate and consent to eSign the loan agreement and
            submit my KYC documents.
          </span>
        </label>
      </SectionCard>

      <SupportSection />
    </LoanProcessLayout>
  )
}

export default CompleteKycPage
