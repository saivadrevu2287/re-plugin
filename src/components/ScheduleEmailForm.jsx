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
        <label className="third align-left" htmlFor="insurance-input">
          Insurance ($):
        </label>
        <input
          type="number"
          class="half"
          value={insurance}
          onInput={eliminateEvent(setInsurance)}
        />
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="vacancy-input">
          Vacancy (%):
        </label>
        <input
          type="number"
          class="half"
          value={vacancy}
          onInput={eliminateEvent(setVacancy)}
        />
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="property-input">
          Property Management (%):
        </label>
        <input
          type="number"
          class="half"
          value={propertyManagement}
          onInput={eliminateEvent(setPropertyManagement)}
        />
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="capex-input">
          Capex (%):
        </label>
        <input
          type="number"
          class="half"
          value={capex}
          onInput={eliminateEvent(setCapex)}
        />
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="repairs-input">
          Repairs (%):
        </label>
        <input
          type="number"
          class="half"
          value={repairs}
          onInput={eliminateEvent(setRepairs)}
        />
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="utilities-input">
          Utilities ($):
        </label>
        <input
          type="number"
          class="half"
          value={utilities}
          onInput={eliminateEvent(setUtilities)}
        />
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="down-payment-input">
          Down Payment (%):
        </label>
        <input
          type="number"
          class="half"
          value={downPayment}
          onInput={eliminateEvent(setDownPayment)}
        />
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="closing-cost-input">
          Closing Cost (%):
        </label>
        <input
          type="number"
          class="half"
          value={closingCosts}
          onInput={eliminateEvent(setClosingCosts)}
        />
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="loan-interest-input">
          Loan Interest (%):
        </label>
        <input
          type="number"
          class="half"
          value={loanInterest}
          onInput={eliminateEvent(setLoanInterest)}
        />
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="loan-months-input">
          Loan Months:
        </label>
        <input
          type="number"
          class="half"
          value={loanMonths}
          onInput={eliminateEvent(setLoanMonths)}
        />
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label
          className="third align-left"
          htmlFor="additional-monthly-expenses-input"
        >
          Additional Monthly Expenses ($):
        </label>
        <input
          type="number"
          class="half"
          value={additionalMonthlyExpenses}
          onInput={eliminateEvent(setAdditionalMonthlyExpenses)}
        />
      </div>
    </Fragment>
  )

  return (
    <div className="padded">
      <div className="flex between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="search-params-input">
          Title:
        </label>
        <input value={notes} class="half" onInput={eliminateEvent(setNotes)} placeholder="Name your market"/>
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="search-params-input">
          Location:
        </label>
        <input
          value={searchParams}
          class="half"
          placeholder='Type in location exactly like Zillow'
          onInput={eliminateEvent(setSearchParams)}
        />
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="min-price-input">
          Minimum Price:
        </label>
        <input
          type="number"
          class="half"
          value={minPrice}
          placeholder='e.g. 100000'
          onInput={eliminateEvent(setMinPrice)}
        />
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="max-price-input">
          Maximum Price:
        </label>
        <input
          type="number"
          class="half"
          value={maxPrice}
          placeholder='e.g. 300000'
          onInput={eliminateEvent(setMaxPrice)}
        />
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="num-bedrooms-input">
          Num. Bedrooms (minimum):
        </label>
        <input
          type="number"
          class="half"
          value={numBedrooms}
          placeholder='e.g. 3'
          onInput={eliminateEvent(setNumBedrooms)}
        />
      </div>
      <div className="flex between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="num-bedrooms-input">
          Num. Bathrooms (minimum):
        </label>
        <input
          type="number"
          class="half"
          value={numBathrooms}
          placeholder='e.g. 2'
          onInput={eliminateEvent(setNumBathrooms)}
        />
      </div>
      {cocCalculationParams}
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
