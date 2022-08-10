import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { route } from 'preact-router'
import axios from 'axios'
import { parseJwt } from '../subroutines/utils'

const eliminateEvent = (callback) => (event) => callback(event.target.value)

export default function Profile(props) {
  const { jwt, backendUrl } = props

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [scheduledEmails, setScheduledEmails] = useState(null)
  const [searchResults, setSearchResults] = useState(null)

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

  const [hideCocCalculations, setHideCocCalculations] = useState(true)
  const [minPrice, setMinPrice] = useState()
  const [maxPrice, setMaxPrice] = useState()
  const [searchParams, setSearchParams] = useState()
  const [numBedrooms, setNumBedrooms] = useState()

  const email = parseJwt(jwt.id_token).email

  const loadScheduledEmails = () => {
    axios
      .get(`${backendUrl}/api/emailers`)
      .then((r) => {
        setScheduledEmails(r.data)
      })
      .catch((e) => {
        setErrorMessage(e.response.data.message)
      })
  }

  const formatNumber = (number) =>
    number ? `$${number.toLocaleString()}` : 'x'

  const submitScheduledEmails = () => {
    try {
      axios
        .post(`${backendUrl}/emailers`, {
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
          setSuccessMessage(Math.random())
        })
        .catch((e) => {
          setSearchResults(null)
          setErrorMessage(e.response.data.message)
        })
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const testEmailerParams = () => {
    if (!searchParams) {
      setErrorMessage('Need to fill out Search Parameters')
    } else {
      axios
        .get(
          `${backendUrl}/emailers/test-search-param?search_param=${encodeURI(
            searchParams
          )}&min_price=${minPrice}&max_price=${maxPrice}&no_bedrooms=${numBedrooms}`
        )
        .then((r) => {
          setSearchResults(r.data)
          setErrorMessage('')
        })
        .catch((e) => {
          setSearchResults(null)
          setErrorMessage(e.response.data.message)
        })
    }
  }

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt.id_token}`
    loadScheduledEmails()
  }, [successMessage])

  const scheduledEmailList = !scheduledEmails ? (
    <h3>Loading...</h3>
  ) : (
    scheduledEmails.map((scheduledEmail, i) => {
      const handleDeleteButton = () => {
        axios
          .delete(`${backendUrl}/emailers/${scheduledEmail.id}`)
          .then((r) => {
            setSuccessMessage(Math.random())
          })
          .catch((e) => {
            setSearchResults(null)
            setErrorMessage(e.response.data.message)
          })
      }
      return (
        <div key={i} className="scheduled-emailer-element">
          <p>
            {scheduledEmail.search_param},{' '}
            {formatNumber(scheduledEmail.min_price)}-
            {formatNumber(scheduledEmail.max_price)}
          </p>
          <button className="ostrich-button" onClick={handleDeleteButton}>
            Delete
          </button>
        </div>
      )
    })
  )

  const flipHideCocCalculations = () =>
    setHideCocCalculations(!hideCocCalculations)

  const cocCalculationParams = !hideCocCalculations && (
    <div>
      <div id="insurance-container" className="form-input-container">
        <label htmlFor="insurance-input">Insurance:</label>
        <div>
          <input
            id="insurance-input"
            type="number"
            class="input"
            value={insurance}
            onInput={eliminateEvent(setInsurance)}
          />
          <b>$</b>
        </div>
      </div>
      <div id="vacancy-container" className="form-input-container">
        <label htmlFor="vacancy-input">Vacancy:</label>
        <div>
          <input
            id="vacancy-input"
            type="number"
            class="input"
            value={vacancy}
            onInput={eliminateEvent(setVacancy)}
          />
          <b>%</b>
        </div>
      </div>
      <div id="property-container" className="form-input-container">
        <label htmlFor="property-input">Property Management:</label>
        <div>
          <input
            id="property-input"
            type="number"
            class="input"
            value={propertyManagement}
            onInput={eliminateEvent(setPropertyManagement)}
          />
          <b>%</b>
        </div>
      </div>
      <div id="capex-container" className="form-input-container">
        <label htmlFor="capex-input">Capex:</label>
        <div>
          <input
            id="capex-input"
            type="number"
            class="input"
            value={capex}
            onInput={eliminateEvent(setCapex)}
          />
          <b>%</b>
        </div>
      </div>
      <div id="repairs-container" className="form-input-container">
        <label htmlFor="repairs-input">Repairs:</label>
        <div>
          <input
            id="repairs-input"
            type="number"
            class="input"
            value={repairs}
            onInput={eliminateEvent(setRepairs)}
          />
          <b>%</b>
        </div>
      </div>
      <div id="utilities-container" className="form-input-container">
        <label htmlFor="utilities-input">Utilities:</label>
        <div>
          <input
            id="utilities-input"
            type="number"
            class="input"
            value={utilities}
            onInput={eliminateEvent(setUtilities)}
          />
          <b>$</b>
        </div>
      </div>
      <div id="down-payment-container" className="form-input-container">
        <label htmlFor="down-payment-input">Down Payment:</label>
        <div>
          <input
            id="down-payment-input"
            type="number"
            class="input"
            value={downPayment}
            onInput={eliminateEvent(setDownPayment)}
          />
          <b>%</b>
        </div>
      </div>
      <div id="closing-cost-container" className="form-input-container">
        <label htmlFor="closing-cost-input">Closing Cost:</label>
        <div>
          <input
            id="closing-cost-input"
            type="number"
            class="input"
            value={closingCosts}
            onInput={eliminateEvent(setClosingCosts)}
          />
          <b>%</b>
        </div>
      </div>
      <div id="loan-interest-container" className="form-input-container">
        <label htmlFor="loan-interest-input">Loan Interest:</label>
        <div>
          <input
            id="loan-interest-input"
            type="number"
            class="input"
            value={loanInterest}
            onInput={eliminateEvent(setLoanInterest)}
          />
          <b>%</b>
        </div>
      </div>
      <div id="loan-months-container" className="form-input-container">
        <label htmlFor="loan-months-input">Loan Months:</label>
        <div>
          <input
            id="loan-months-input"
            type="number"
            class="input"
            value={loanMonths}
            onInput={eliminateEvent(setLoanMonths)}
          />
          <b>mos</b>
        </div>
      </div>
      <div
        id="additional-monthly-expenses-container"
        className="form-input-container"
      >
        <label htmlFor="additional-monthly-expenses-input">
          Additional Monthly Expenses:
        </label>
        <div>
          <input
            id="additional-monthly-expenses-input"
            type="number"
            class="input"
            value={additionalMonthlyExpenses}
            onInput={eliminateEvent(setAdditionalMonthlyExpenses)}
          />
          <b>$</b>
        </div>
      </div>
    </div>
  )

  const searchResultsElements = searchResults && (
    <div>
      <h5>Search Results</h5>
      <p>If you are okay with these results, press submit!</p>
      {searchResults.map((address, i) => {
        return (
          <div key={i} className="scheduled-emailer-element">
            {address}
          </div>
        )
      })}
    </div>
  )

  return (
    <div className="page">
      <div className="card">
        <h5>Welcome!</h5>
        <h5>{email}</h5>
      </div>
      <div className="profile-container align-center">
        <div className="fourty-five break-to-full">
          <h5>Schedule a New Email</h5>
          <div className="ostrich-container padded">
            <div id="search-params-container" className="form-input-container">
              <label htmlFor="search-params-input">Search Parameters:</label>
              <div>
                <input
                  id="search-params-input"
                  value={searchParams}
                  class="input"
                  onInput={eliminateEvent(setSearchParams)}
                />
              </div>
            </div>
            <div id="min-price-container" className="form-input-container">
              <label htmlFor="min-price-input">Minimum Price:</label>
              <div>
                <input
                  id="min-price-input"
                  type="number"
                  class="input"
                  value={minPrice}
                  onInput={eliminateEvent(setMinPrice)}
                />
                <b>$</b>
              </div>
            </div>
            <div id="max-price-container" className="form-input-container">
              <label htmlFor="max-price-input">Maximum Price:</label>
              <div>
                <input
                  id="max-price-input"
                  type="number"
                  class="input"
                  value={maxPrice}
                  onInput={eliminateEvent(setMaxPrice)}
                />
                <b>$</b>
              </div>
            </div>
            <div id="num-bedrooms-container" className="form-input-container">
              <label htmlFor="num-bedrooms-input">Num. Bedrooms:</label>
              <div>
                <input
                  id="num-bedrooms-input"
                  type="number"
                  class="input"
                  value={numBedrooms}
                  onInput={eliminateEvent(setNumBedrooms)}
                />
              </div>
            </div>
            <span
              onClick={flipHideCocCalculations}
              className="plain-button ostrich-button"
            >
              {hideCocCalculations ? 'Show' : 'Hide'} Calculation Params
            </span>
            <div className="personal-space-top">{cocCalculationParams}</div>
            <div className="buttons">
              <button
                className="ostrich-button"
                onClick={submitScheduledEmails}
              >
                Submit
              </button>
              <button className="ostrich-button" onClick={testEmailerParams}>
                Test these params!
              </button>
            </div>
          </div>
          <br />
          <h6>
            Hint: Test your search before submitting. This will help you dial in
            your parameters.
          </h6>
          <br />
          <br />
        </div>
        <div className="two-fifths break-to-full">
          <h5>Scheduled Emails ✉️</h5>
          {scheduledEmailList}
          {searchResultsElements}
        </div>
      </div>
      <p className="error">{errorMessage}</p>
    </div>
  )
}
