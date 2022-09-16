import { h, Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import axios from 'axios'

const eliminateEvent = (callback) => (event) => callback(event.target.value)

export default function EditEmailForm(props) {
  const { backendUrl, setSuccessfulSubmition, scheduledEmail, selectedMarket } =
    props

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

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
    setSuccessMessage('')
  }, [selectedMarket])

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
    return <div></div>
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
          setSuccessMessage('Market updated.')
        })
        .catch((e) => {
          if (e.response.data) {
            setErrorMessage(e.response.data.message)
          } else {
            setErrorMessage(e.message)
          }
        })
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const cocCalculationParams = (
    <Fragment>
      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="insurance-input">
          Insurance ($):
        </label>
        <input
          type="number"
          className="half"
          value={insurance}
          onInput={eliminateEvent(setInsurance)}
        />
      </div>
      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="vacancy-input">
          Vacancy (%):
        </label>
        <input
          type="number"
          className="half"
          value={vacancy}
          onInput={eliminateEvent(setVacancy)}
        />
      </div>
      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="property-input">
          Property Management (%):
        </label>
        <input
          type="number"
          className="half"
          value={propertyManagement}
          onInput={eliminateEvent(setPropertyManagement)}
        />
      </div>
      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="capex-input">
          Capex (%):
        </label>
        <input
          type="number"
          className="half"
          value={capex}
          onInput={eliminateEvent(setCapex)}
        />
      </div>
      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="repairs-input">
          Repairs (%):
        </label>
        <input
          type="number"
          className="half"
          value={repairs}
          onInput={eliminateEvent(setRepairs)}
        />
      </div>
      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="utilities-input">
          Utilities ($):
        </label>
        <input
          type="number"
          className="half"
          value={utilities}
          onInput={eliminateEvent(setUtilities)}
        />
      </div>
      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="down-payment-input">
          Down Payment (%):
        </label>
        <input
          type="number"
          className="half"
          value={downPayment}
          onInput={eliminateEvent(setDownPayment)}
        />
      </div>
      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="closing-cost-input">
          Closing Cost (%):
        </label>
        <input
          type="number"
          className="half"
          value={closingCosts}
          onInput={eliminateEvent(setClosingCosts)}
        />
      </div>
      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="loan-interest-input">
          Loan Interest (%):
        </label>
        <input
          type="number"
          className="half"
          value={loanInterest}
          onInput={eliminateEvent(setLoanInterest)}
        />
      </div>
      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="loan-months-input">
          Loan Months:
        </label>
        <input
          type="number"
          className="half"
          value={loanMonths}
          onInput={eliminateEvent(setLoanMonths)}
        />
      </div>
      <div className="flex wrap between centered-items personal-space-bottom">
        <label
          className="third align-left"
          htmlFor="additional-monthly-expenses-input"
        >
          Additional Monthly Expenses ($):
        </label>
        <input
          type="number"
          className="half"
          value={additionalMonthlyExpenses}
          onInput={eliminateEvent(setAdditionalMonthlyExpenses)}
        />
      </div>
    </Fragment>
  )

  return (
    <div className="padded">
      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="search-params-input">
          Title:
        </label>
        <input
          value={notes}
          className="half"
          onInput={eliminateEvent(setNotes)}
        />
      </div>
      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="search-params-input">
          Location:
        </label>
        <input
          value={searchParams}
          className="half"
          onInput={eliminateEvent(setSearchParams)}
        />
      </div>
      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="min-price-input">
          Minimum Price:
        </label>
        <input
          type="number"
          className="half"
          value={minPrice}
          onInput={eliminateEvent(setMinPrice)}
        />
      </div>
      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="max-price-input">
          Maximum Price:
        </label>
        <input
          type="number"
          className="half"
          value={maxPrice}
          onInput={eliminateEvent(setMaxPrice)}
        />
      </div>
      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="num-bedrooms-input">
          Num. Bedrooms (minimum):
        </label>
        <input
          type="number"
          className="half"
          value={numBedrooms}
          onInput={eliminateEvent(setNumBedrooms)}
        />
      </div>
      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="num-bedrooms-input">
          Num. Bathrooms (minimum):
        </label>
        <input
          type="number"
          className="half"
          value={numBathrooms}
          onInput={eliminateEvent(setNumBathrooms)}
        />
      </div>
      <div className="">{cocCalculationParams}</div>
      <p className="error">{errorMessage}</p>
      <p className="success">{successMessage}</p>
      <div className="flex around">
        <button className="ostrich-button" onClick={scheduleEmail}>
          Update
        </button>
      </div>
    </div>
  )
}
