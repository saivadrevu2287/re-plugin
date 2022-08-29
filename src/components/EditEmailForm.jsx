import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import axios from 'axios'

const eliminateEvent = (callback) => (event) => callback(event.target.value)

export default function EditEmailForm(props) {
  const { backendUrl, setSuccessfulSubmition, scheduledEmail } = props

  const [errorMessage, setErrorMessage] = useState('')

  const [hideCocCalculations, setHideCocCalculations] = useState(true)

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

  const flipHideCocCalculations = () =>
    setHideCocCalculations(!hideCocCalculations)

  const scheduleEmail = () => {
    if (!notes) {
      setErrorMessage('Missing Title!')
      return
    }

    if (!searchParams) {
      setErrorMessage('Missing Location!')
      return
    }

    try {
      axios
        .put(`${backendUrl}/api/emailers`, {
          id: scheduledEmail.id,
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
          notes: notes,
          frequency: 'Daily',
        })
        .then((r) => {
          setSuccessfulSubmition(Math.random())
        })
        .catch((e) => {
          setErrorMessage(e.response.data.message)
        })
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const cocCalculationParams = (
    <div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="fourth align-right" htmlFor="insurance-input">
          Insurance:
        </label>
        <div>
          <input
            type="number"
            class="three-fourths"
            value={insurance}
            onInput={eliminateEvent(setInsurance)}
          />
          <b>$</b>
        </div>
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="fourth align-right" htmlFor="vacancy-input">
          Vacancy:
        </label>
        <div>
          <input
            type="number"
            class="three-fourths"
            value={vacancy}
            onInput={eliminateEvent(setVacancy)}
          />
          <b>%</b>
        </div>
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="fourth align-right" htmlFor="property-input">
          Property Management:
        </label>
        <div>
          <input
            type="number"
            class="three-fourths"
            value={propertyManagement}
            onInput={eliminateEvent(setPropertyManagement)}
          />
          <b>%</b>
        </div>
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="fourth align-right" htmlFor="capex-input">
          Capex:
        </label>
        <div>
          <input
            type="number"
            class="three-fourths"
            value={capex}
            onInput={eliminateEvent(setCapex)}
          />
          <b>%</b>
        </div>
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="fourth align-right" htmlFor="repairs-input">
          Repairs:
        </label>
        <div>
          <input
            type="number"
            class="three-fourths"
            value={repairs}
            onInput={eliminateEvent(setRepairs)}
          />
          <b>%</b>
        </div>
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="fourth align-right" htmlFor="utilities-input">
          Utilities:
        </label>
        <div>
          <input
            type="number"
            class="three-fourths"
            value={utilities}
            onInput={eliminateEvent(setUtilities)}
          />
          <b>$</b>
        </div>
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="fourth align-right" htmlFor="down-payment-input">
          Down Payment:
        </label>
        <div>
          <input
            type="number"
            class="three-fourths"
            value={downPayment}
            onInput={eliminateEvent(setDownPayment)}
          />
          <b>%</b>
        </div>
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="fourth align-right" htmlFor="closing-cost-input">
          Closing Cost:
        </label>
        <div>
          <input
            type="number"
            class="three-fourths"
            value={closingCosts}
            onInput={eliminateEvent(setClosingCosts)}
          />
          <b>%</b>
        </div>
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="fourth align-right" htmlFor="loan-interest-input">
          Loan Interest:
        </label>
        <div>
          <input
            type="number"
            class="three-fourths"
            value={loanInterest}
            onInput={eliminateEvent(setLoanInterest)}
          />
          <b>%</b>
        </div>
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="fourth align-right" htmlFor="loan-months-input">
          Loan Months:
        </label>
        <div>
          <input
            type="number"
            class="three-fourths"
            value={loanMonths}
            onInput={eliminateEvent(setLoanMonths)}
          />
          <b>mos</b>
        </div>
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label
          className="fourth align-right"
          htmlFor="additional-monthly-expenses-input"
        >
          Additional Monthly Expenses:
        </label>
        <div>
          <input
            type="number"
            class="three-fourths"
            value={additionalMonthlyExpenses}
            onInput={eliminateEvent(setAdditionalMonthlyExpenses)}
          />
          <b>$</b>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex wrap-reverse">
      <div className="">
        <div className="flex between centered-items personal-space-bottom">
          <label className="fourth align-right" htmlFor="search-params-input">
            Title:
          </label>
          <div>
            <input
              value={notes}
              class="three-fourths"
              onInput={eliminateEvent(setNotes)}
            />
          </div>
        </div>
        <div className="flex between centered-items personal-space-bottom">
          <label className="fourth align-right" htmlFor="search-params-input">
            Location:
          </label>
          <div>
            <input
              value={searchParams}
              class="three-fourths"
              onInput={eliminateEvent(setSearchParams)}
            />
          </div>
        </div>
        <div className="flex between centered-items personal-space-bottom">
          <label className="fourth align-right" htmlFor="min-price-input">
            Minimum Price:
          </label>
          <div>
            <input
              type="number"
              class="three-fourths"
              value={minPrice}
              onInput={eliminateEvent(setMinPrice)}
            />
            <b>$</b>
          </div>
        </div>
        <div className="flex between centered-items personal-space-bottom">
          <label className="fourth align-right" htmlFor="max-price-input">
            Maximum Price:
          </label>
          <div>
            <input
              type="number"
              class="three-fourths"
              value={maxPrice}
              onInput={eliminateEvent(setMaxPrice)}
            />
            <b>$</b>
          </div>
        </div>
        <div className="flex between centered-items personal-space-bottom">
          <label className="fourth align-right" htmlFor="num-bedrooms-input">
            Num. Bedrooms:
          </label>
          <div>
            <input
              type="number"
              class="three-fourths"
              value={numBedrooms}
              onInput={eliminateEvent(setNumBedrooms)}
            />
          </div>
        </div>
        <div className="flex between centered-items personal-space-bottom">
          <label className="fourth align-right" htmlFor="num-bedrooms-input">
            Num. Bathrooms:
          </label>
          <div>
            <input
              type="number"
              class="three-fourths"
              value={numBathrooms}
              onInput={eliminateEvent(setNumBathrooms)}
            />
          </div>
        </div>
        <button
          onClick={flipHideCocCalculations}
          className="plain-button personal-space-small-top"
        >
          {hideCocCalculations ? 'Show' : 'Hide'} Calculation Params
        </button>
        <div className="personal-space-top">
          {!hideCocCalculations && cocCalculationParams}
        </div>
        <p className="error">{errorMessage}</p>
        <div className="flex around">
          <button className="ostrich-button" onClick={scheduleEmail}>
            Update
          </button>
        </div>
      </div>
      <div className="personal-space-left">
        <h5>{scheduledEmail.notes}</h5>
        <button onClick={deleteEmail} className="personal-margin-top">
          Delete
        </button>
      </div>
    </div>
  )
}
