import { h, Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import axios from 'axios'

const eliminateEvent = (callback) => (event) => callback(event.target.value)

export default function ScheduleEmailForm(props) {
  const { backendUrl, setSuccessfulSubmition, selectedMarket } = props

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [hideCocCalculations, setHideCocCalculations] = useState(true)

  const [minPrice, setMinPrice] = useState()
  const [maxPrice, setMaxPrice] = useState()
  const [searchParams, setSearchParams] = useState()
  const [numBedrooms, setNumBedrooms] = useState()
  const [numBathrooms, setNumBathrooms] = useState()
  const [notes, setNotes] = useState('')
  const [insurance, setInsurance] = useState(60)
  const [vacancy, setVacancy] = useState(5)
  const [propertyManagement, setPropertyManagement] = useState(4)
  const [capex, setCapex] = useState(5)
  const [repairs, setRepairs] = useState(5)
  const [utilities, setUtilities] = useState(0)
  const [downPayment, setDownPayment] = useState(25)
  const [closingCosts, setClosingCosts] = useState(4)
  const [loanInterest, setLoanInterest] = useState(4)
  const [loanMonths, setLoanMonths] = useState(240)
  const [additionalMonthlyExpenses, setAdditionalMonthlyExpenses] = useState(0)

  useEffect(() => {
    setSuccessMessage('')
  }, [selectedMarket])

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
          notes: notes,
          frequency: 'Daily',
        })
        .then((r) => {
          setSuccessfulSubmition(Math.random())
          setSuccessMessage('Market Submitted. Expect a daily email at 3pm ET.')
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
    </Fragment>
  )

  return (
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
        </div>
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="fourth align-right" htmlFor="num-bedrooms-input">
          Num. Bedrooms (minimum):
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
          Num. Bathrooms (minimum):
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
      <div className="personal-space-top ">{cocCalculationParams}</div>
      <p className="error">{errorMessage}</p>
      <p className="success">{successMessage}</p>
      <div className="flex around">
        <button className="ostrich-button" onClick={scheduleEmail}>
          Submit
        </button>
      </div>
    </div>
  )
}
