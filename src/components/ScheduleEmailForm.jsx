import { h, Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import axios from 'axios'

const eliminateEvent = (callback) => (event) => callback(event.target.value)

export default function ScheduleEmailForm(props) {
  const {
    backendUrl,
    setSuccessfulSubmition,
    searchParams,
    setSearchParams,
    setNumBedrooms,
    numBedrooms,
    setMaxPrice,
    maxPrice,
    setMinPrice,
    minPrice,
  } = props

  const [errorMessage, setErrorMessage] = useState('')

  const [hideCocCalculations, setHideCocCalculations] = useState(true)

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

  const flipHideCocCalculations = () =>
    setHideCocCalculations(!hideCocCalculations)

  const scheduledEmail = () => {
    if (!searchParams) {
      setErrorMessage('Missing Search Param!')
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
            class="nintey"
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
            class="nintey"
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
            class="nintey"
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
            class="nintey"
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
            class="nintey"
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
            class="nintey"
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
            class="nintey"
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
            class="nintey"
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
            class="nintey"
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
            class="nintey"
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
            class="nintey"
            value={additionalMonthlyExpenses}
            onInput={eliminateEvent(setAdditionalMonthlyExpenses)}
          />
          <b>$</b>
        </div>
      </div>
    </div>
  )

  return (
    <Fragment>
      <h5>Schedule a New Email</h5>
      <div className="ostrich-container padded">
        <div className="flex between centered-items personal-space-bottom">
          <label className="fourth align-right" htmlFor="search-params-input">
            Search Parameters:
          </label>
          <div>
            <input
              value={searchParams}
              class="nintey"
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
              class="nintey"
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
              class="nintey"
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
              class="nintey"
              value={numBedrooms}
              onInput={eliminateEvent(setNumBedrooms)}
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
          <button className="ostrich-button" onClick={scheduledEmail}>
            Submit
          </button>
        </div>
      </div>
    </Fragment>
  )
}