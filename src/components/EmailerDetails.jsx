import { h, Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import axios from 'axios'

const eliminateEvent = (callback) => (event) => callback(event.target.value)

export default function EmailerDetails(props) {
  const {
    backendUrl,
    setSuccessfulSubmition,
    scheduledEmail,
    small,
    isAllowedToDuplicate,
  } = props

  const [errorMessage, setErrorMessage] = useState('')

  const [minPrice, setMinPrice] = useState(
    scheduledEmail ? scheduledEmail.min_price : null
  )
  const [maxPrice, setMaxPrice] = useState(
    scheduledEmail ? scheduledEmail.max_price : null
  )
  const [searchParams, setSearchParams] = useState(
    scheduledEmail ? scheduledEmail.search_param : null
  )
  const [numBedrooms, setNumBedrooms] = useState(
    scheduledEmail ? scheduledEmail.no_bedrooms : null
  )
  const [numBathrooms, setNumBathrooms] = useState(
    scheduledEmail ? scheduledEmail.no_bathrooms : null
  )
  const [notes, setNotes] = useState(
    scheduledEmail ? scheduledEmail.notes : null
  )
  const [insurance, setInsurance] = useState(
    scheduledEmail ? scheduledEmail.insurance : null
  )
  const [vacancy, setVacancy] = useState(
    scheduledEmail ? scheduledEmail.vacancy : null
  )
  const [propertyManagement, setPropertyManagement] = useState(
    scheduledEmail ? scheduledEmail.property_management : null
  )
  const [capex, setCapex] = useState(
    scheduledEmail ? scheduledEmail.capex : null
  )
  const [repairs, setRepairs] = useState(
    scheduledEmail ? scheduledEmail.repairs : null
  )
  const [utilities, setUtilities] = useState(
    scheduledEmail ? scheduledEmail.utilities : null
  )
  const [downPayment, setDownPayment] = useState(
    scheduledEmail ? scheduledEmail.down_payment : null
  )
  const [closingCosts, setClosingCosts] = useState(
    scheduledEmail ? scheduledEmail.closing_cost : null
  )
  const [loanInterest, setLoanInterest] = useState(
    scheduledEmail ? scheduledEmail.loan_interest : null
  )
  const [loanMonths, setLoanMonths] = useState(
    scheduledEmail ? scheduledEmail.loan_months : null
  )
  const [additionalMonthlyExpenses, setAdditionalMonthlyExpenses] = useState(
    scheduledEmail ? scheduledEmail.additional_monthly_expenses : null
  )

  useEffect(() => {
    setMinPrice(scheduledEmail ? scheduledEmail.min_price : null)
    setMaxPrice(scheduledEmail ? scheduledEmail.max_price : null)
    setSearchParams(scheduledEmail ? scheduledEmail.search_param : null)
    setNumBedrooms(scheduledEmail ? scheduledEmail.no_bedrooms : null)
    setNumBathrooms(scheduledEmail ? scheduledEmail.no_bathrooms : null)
    setNotes(scheduledEmail ? scheduledEmail.notes : null)
    setInsurance(scheduledEmail ? scheduledEmail.insurance : null)
    setVacancy(scheduledEmail ? scheduledEmail.vacancy : null)
    setPropertyManagement(
      scheduledEmail ? scheduledEmail.property_management : null
    )
    setCapex(scheduledEmail ? scheduledEmail.capex : null)
    setRepairs(scheduledEmail ? scheduledEmail.repairs : null)
    setUtilities(scheduledEmail ? scheduledEmail.utilities : null)
    setDownPayment(scheduledEmail ? scheduledEmail.down_payment : null)
    setClosingCosts(scheduledEmail ? scheduledEmail.closing_cost : null)
    setLoanInterest(scheduledEmail ? scheduledEmail.loan_interest : null)
    setLoanMonths(scheduledEmail ? scheduledEmail.loan_months : null)
    setAdditionalMonthlyExpenses(
      scheduledEmail ? scheduledEmail.additional_monthly_expenses : null
    )
  }, [scheduledEmail])

  if (!scheduledEmail) {
    return <h4>Loading Market Record...</h4>
  }

  const deleteEmail = () => {
    axios
      .delete(`${backendUrl}/api/emailers/${scheduledEmail.id}`)
      .then((r) => {
        setSuccessfulSubmition(Math.random())
        setErrorMessage('')
      })
      .catch((e) => {
        setErrorMessage(e.response.data.message)
      })
  }

  const duplicateEmail = () => {
    axios
      .post(`${backendUrl}/api/emailers`, {
        insurance: parseInt(insurance),
        vacancy: parseInt(vacancy),
        property_management: parseInt(propertyManagement),
        capex: parseInt(capex),
        repairs: parseInt(repairs),
        utilities: parseInt(utilities),
        down_payment: parseInt(downPayment),
        closing_cost: parseInt(closingCosts),
        loan_interest: parseInt(loanInterest),
        loan_months: parseInt(loanMonths),
        additional_monthly_expenses: parseInt(additionalMonthlyExpenses),
        min_price: parseInt(minPrice),
        max_price: parseInt(maxPrice),
        search_param: searchParams,
        no_bedrooms: parseInt(numBedrooms),
        no_bathrooms: parseInt(numBathrooms),
        notes: `${notes} Clone`,
        frequency: 'Daily',
      })
      .then((r) => {
        setSuccessfulSubmition(Math.random())
        setSuccessMessage('Market Duplicated.')
      })
      .catch((e) => {
        if (e.response.data) {
          setErrorMessage(e.response.data.message)
        } else {
          setErrorMessage(e.message)
        }
      })
  }

  return (
    <div className="padded">
      <h5>{scheduledEmail.notes}</h5>
      <div className="show-on-small">
        <p>
          ${scheduledEmail.min_price} - ${scheduledEmail.max_price}
        </p>
        <p>{scheduledEmail.search_param}</p>
      </div>
      <button onClick={deleteEmail} className="personal-margin-top">
        Delete
      </button>
      {isAllowedToDuplicate && (
        <button
          onClick={duplicateEmail}
          className="personal-margin-top personal-margin-left"
        >
          Duplicate
        </button>
      )}
    </div>
  )
}
