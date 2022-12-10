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
  const [insurance, setInsurance] = useState()
  const [vacancy, setVacancy] = useState()
  const [propertyManagement, setPropertyManagement] = useState()
  const [capex, setCapex] = useState()
  const [repairs, setRepairs] = useState()
  const [utilities, setUtilities] = useState()
  const [downPayment, setDownPayment] = useState()
  const [closingCosts, setClosingCosts] = useState()
  const [loanInterest, setLoanInterest] = useState()
  const [loanMonths, setLoanMonths] = useState()
  const [additionalMonthlyExpenses, setAdditionalMonthlyExpenses] = useState()

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

    if (!searchParams.match(/\w County, [A-Z]{2}/)) {
      setErrorMessage('Location must exactly match "___ County, [State Code]"!')
      return
    }

    if (!insurance && 0 != insurance) {
      setErrorMessage('Missing insurance!')
      return
    }

    if (!vacancy && 0 != vacancy) {
      setErrorMessage('Missing vacancy!')
      return
    }

    if (!propertyManagement && 0 != propertyManagement) {
      setErrorMessage('Missing propertyManagement!')
      return
    }

    if (!repairs && 0 != repairs) {
      setErrorMessage('Missing repairs!')
      return
    }

    if (!capex && 0 != capex) {
      setErrorMessage('Missing capex!')
      return
    }

    if (!utilities && 0 != utilities) {
      setErrorMessage('Missing utilities!')
      return
    }

    if (!parseFloat(downPayment)) {
      setErrorMessage(
        'Down Payment cannot be 0. Use a small number instead, like 0.0001'
      )
      return
    }

    if (!parseFloat(closingCosts)) {
      setErrorMessage(
        'Closing Cost cannot be 0. Use a small number instead, like 0.0001'
      )
      return
    }

    if (!parseFloat(loanInterest)) {
      setErrorMessage(
        'Loan Interest cannot be 0. If you are buying all cash, enter .001'
      )
      return
    }

    if (!parseFloat(loanMonths)) {
      setErrorMessage(
        'Loan Months cannot be 0. Use a small number instead, like 0.0001'
      )
      return
    }

    if (!additionalMonthlyExpenses && 0 != additionalMonthlyExpenses) {
      setErrorMessage('Missing additionalMonthlyExpenses!')
      return
    }

    try {
      axios
        .post(`${backendUrl}/api/emailers`, {
          insurance: parseFloat(insurance),
          vacancy: parseFloat(vacancy),
          property_management: parseFloat(propertyManagement),
          capex: parseFloat(capex),
          repairs: parseFloat(repairs),
          utilities: parseFloat(utilities),
          down_payment: parseFloat(downPayment),
          closing_cost: parseFloat(closingCosts),
          loan_interest: parseFloat(loanInterest),
          loan_months: parseFloat(loanMonths),
          additional_monthly_expenses: parseFloat(additionalMonthlyExpenses),
          min_price: parseFloat(minPrice),
          max_price: parseFloat(maxPrice),
          search_param: searchParams,
          no_bedrooms: parseFloat(numBedrooms),
          no_bathrooms: parseFloat(numBathrooms),
          notes: notes,
          frequency: 'Daily',
        })
        .then((r) => {
          setSuccessfulSubmition(Math.random())
          setSuccessMessage(
            'Market Submitted. Expect a daily email at 10AM ET.'
          )
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
          Insurance{' '}
          <span title="Enter the per month number you will pay for insurance. Usually this is $60-$80 per month for a single family.">
            (i)
          </span>
          :
        </label>

        <input
          type="number"
          class="half"
          value={insurance}
          onInput={eliminateEvent(setInsurance)}
        />
        <b>$/mo</b>
      </div>

      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="vacancy-input">
          Vacancy{' '}
          <span title="This is a monthly expense. Enter as a percent of monthly gross income. Usually this is 6-8%">
            (i)
          </span>
          :
        </label>

        <input
          type="number"
          class="half"
          value={vacancy}
          onInput={eliminateEvent(setVacancy)}
        />
        <b>%/mo</b>
      </div>

      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="property-input">
          Property Management{' '}
          <span title="This is a monthly expense. Enter as a percent of monthly gross income. Usually this is 8-12%">
            (i)
          </span>
          :
        </label>

        <input
          type="number"
          class="half"
          value={propertyManagement}
          onInput={eliminateEvent(setPropertyManagement)}
        />
        <b>%/mo</b>
      </div>

      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="capex-input">
          Capex{' '}
          <span title="This is a monthly expense. Enter as a percent of monthly gross income. Usually this is 5-15% depending on the condition of the property">
            (i)
          </span>
          :
        </label>

        <input
          type="number"
          class="half"
          value={capex}
          onInput={eliminateEvent(setCapex)}
        />
        <b>%/mo</b>
      </div>

      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="repairs-input">
          Repairs{' '}
          <span title="This is a monthly expense. Enter as a percent of monthly gross income. Usually this is 5-10% depending on the condition of the property">
            (i)
          </span>
          :
        </label>

        <input
          type="number"
          class="half"
          value={repairs}
          onInput={eliminateEvent(setRepairs)}
        />
        <b>%/mo</b>
      </div>

      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="utilities-input">
          Utilities{' '}
          <span title="This is a monthly expense. For a single-family rental, the tenants pay for utilities usually, so put 0. Double check with your broker once">
            (i)
          </span>
          :
        </label>

        <input
          type="number"
          class="half"
          value={utilities}
          onInput={eliminateEvent(setUtilities)}
        />
        <b>$/mo</b>
      </div>

      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="down-payment-input">
          Down Payment{' '}
          <span title="This is the downpayment % for the loan as required by your bank. Usually this is 20% but check with your lender once">
            (i)
          </span>
          :
        </label>

        <input
          type="number"
          class="half"
          value={downPayment}
          onInput={eliminateEvent(setDownPayment)}
        />
        <b>%</b>
      </div>

      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="closing-cost-input">
          Closing Cost{' '}
          <span title="This is the one time cost to close the loan on the property. It includes any bank fees, lawyer fees, appraisal fees etc. Usually it is 3-5% and calculated on the offer price">
            (i)
          </span>
          :
        </label>

        <input
          type="number"
          class="half"
          value={closingCosts}
          onInput={eliminateEvent(setClosingCosts)}
        />
        <b>%</b>
      </div>

      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="loan-interest-input">
          Loan Interest{' '}
          <span title="Enter the interest rate charged by your bank">(i)</span>:
        </label>

        <input
          type="number"
          class="half"
          value={loanInterest}
          onInput={eliminateEvent(setLoanInterest)}
        />
        <b>%</b>
      </div>

      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="loan-months-input">
          Loan Months{' '}
          <span title="Enter the number of months the loan is for. For example - if the loan is for 30 years, enter 360 months">
            (i)
          </span>
          :
        </label>

        <input
          type="number"
          class="half"
          value={loanMonths}
          onInput={eliminateEvent(setLoanMonths)}
        />
        <b>mos</b>
      </div>

      <div className="flex wrap between centered-items personal-space-bottom">
        <label
          className="third align-left"
          htmlFor="additional-monthly-expenses-input"
        >
          Additional Monthly Expenses{' '}
          <span title="Enter any additional expenses per month">(i)</span>:
        </label>

        <input
          type="number"
          class="half"
          value={additionalMonthlyExpenses}
          onInput={eliminateEvent(setAdditionalMonthlyExpenses)}
        />
        <b>$/mo</b>
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
          class="half"
          onInput={eliminateEvent(setNotes)}
          placeholder="e.g. High Cash Market"
        />
      </div>
      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="search-params-input">
          County:
        </label>
        <input
          value={searchParams}
          class="half"
          placeholder="e.g. Essex County, NJ"
          onInput={eliminateEvent(setSearchParams)}
        />
      </div>
      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="min-price-input">
          Minimum Price:
        </label>
        <input
          type="number"
          class="half"
          value={minPrice}
          placeholder="e.g. 100000"
          onInput={eliminateEvent(setMinPrice)}
        />
      </div>
      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="max-price-input">
          Maximum Price:
        </label>
        <input
          type="number"
          class="half"
          value={maxPrice}
          placeholder="e.g. 300000"
          onInput={eliminateEvent(setMaxPrice)}
        />
      </div>
      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="num-bedrooms-input">
          Num. Bedrooms (minimum):
        </label>
        <input
          type="number"
          class="half"
          value={numBedrooms}
          placeholder="e.g. 3"
          onInput={eliminateEvent(setNumBedrooms)}
        />
      </div>
      <div className="flex wrap between centered-items personal-space-bottom">
        <label className="third align-left" htmlFor="num-bedrooms-input">
          Num. Bathrooms (minimum):
        </label>
        <input
          type="number"
          class="half"
          value={numBathrooms}
          placeholder="e.g. 2"
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
