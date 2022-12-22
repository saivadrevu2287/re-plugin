import { Fragment, h } from 'preact'
import { useState } from 'preact/hooks'

const eliminateEvent = (callback) => (event) => callback(event.target.value)

export default function CalculationFields(props) {
  const { scheduledEmail, handleSave } = props

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
  const save = () => {
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
        'Loan Interest cannot be 0. If you are buying all cash, enter .0001'
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

    setErrorMessage('')

    handleSave({
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
  }

  return (
    <Fragment>
      <div className="modal_form-group">
        <div className="modal_group-header">
          <div className="modal_group-heading">Location Settings</div>
          <div className="modal_divider"></div>
        </div>
        <div className="modal_form-group-fields">
          <div className="form-field-wrapper">
            <label for="Location-Title" className="modal_input_label">
              Location Title
            </label>
            <input
              type="text"
              className="modal_form-input w-input"
              maxlength="256"
              name="Location-Title"
              data-name="Location Title"
              placeholder=" e.g - High Cash Flow Pittsburg"
              id="Location-Title"
              required=""
              value={notes}
              onInput={eliminateEvent(setNotes)}
            />
            <div className="modal_form-help-text">
              Give this location a title. eg - High Cash Flow Location.
            </div>
            <div className="modal_divider"></div>
          </div>
          <div className="form-field-wrapper">
            <label for="Location-County" className="modal_input_label">
              Location County
            </label>
            <input
              type="text"
              className="modal_form-input w-input"
              maxlength="256"
              name="Location-County"
              data-name="Location County"
              placeholder="eg - Rockdale County, GA"
              id="Location-County"
              required=""
              value={searchParams}
              onInput={eliminateEvent(setSearchParams)}
            />
            <div className="modal_form-help-text">
              We only accept county names. Enter the name of county followed by
              the state. eg - Rockdale County, GA
            </div>
            <div className="modal_form-help-text">
              This is the county where we will find the new listings to analyze
              and then send you an email with the analysis,
            </div>
            <div className="modal_divider"></div>
          </div>
        </div>
      </div>
      <div className="modal_form-group">
        <div className="modal_group-header">
          <div className="modal_group-heading">Asset Settings</div>
          <div className="modal_divider"></div>
        </div>
        <div className="modal_form-group-fields">
          <div className="form-field-wrapper">
            <label for="Minimum-Price" className="modal_input_label">
              Minimum Price (in dollars)
            </label>
            <input
              type="number"
              className="modal_form-input w-input"
              maxlength="256"
              name="Minimum-Price"
              data-name="Minimum Price"
              placeholder="eg - 120000"
              id="Minimum-Price"
              required=""
              value={minPrice}
              onInput={eliminateEvent(setMinPrice)}
            />
            <div className="modal_form-help-text">
              We will only send listings that are more than this price. This is
              helpful when you do not want to receive junk listings
            </div>
            <div className="modal_form-help-text">
              If you are not sure, enter a small number like 5000
            </div>
            <div className="modal_divider"></div>
          </div>
          <div className="form-field-wrapper">
            <label for="Maximum-Price" className="modal_input_label">
              Maximum Price (in dollars)
            </label>
            <input
              type="number"
              className="modal_form-input w-input"
              maxlength="256"
              name="Maximum-Price"
              data-name="Maximum Price"
              placeholder="eg - 190000"
              id="Maximum-Price"
              required=""
              value={maxPrice}
              onInput={eliminateEvent(setMaxPrice)}
            />
            <div className="modal_form-help-text">
              We will only send listings that are less than this price. This is
              helpful, if you know upfront, you only want to pay certain price.
            </div>
            <div className="modal_divider"></div>
          </div>
          <div className="form-field-wrapper">
            <label for="Minimum-Bedrooms" className="modal_input_label">
              Minimum Bedrooms
            </label>
            <input
              type="number"
              className="modal_form-input w-input"
              maxlength="256"
              name="Minimum-Bedrooms"
              data-name="Minimum Bedrooms"
              placeholder="eg - 2"
              id="Minimum-Bedrooms"
              required=""
              value={numBedrooms}
              onInput={eliminateEvent(setNumBedrooms)}
            />
            <div className="modal_form-help-text">
              For example, if you want to see homes with 2 bedrooms or more,
              enter 2 here.
            </div>
            <div className="modal_form-help-text">
              Some investors look for at least 2 bedrooms in a single family
              home with majority looking for at least 3 bedrooms
            </div>
            <div className="modal_divider"></div>
          </div>
          <div className="form-field-wrapper">
            <label for="Minimum-Bathrooms" className="modal_input_label">
              Minimum Bathrooms
            </label>
            <input
              type="number"
              className="modal_form-input w-input"
              maxlength="256"
              name="Minimum-Bathrooms"
              data-name="Minimum Bathrooms"
              placeholder="eg - 1"
              id="Minimum-Bathrooms"
              required=""
              value={numBathrooms}
              onInput={eliminateEvent(setNumBathrooms)}
            />
            <div className="modal_form-help-text">
              For example, if you want to see homes with 1 bathroom or more,
              enter 1 here.
            </div>
            <div className="modal_form-help-text">
              Most investors look for at least 1 bathroom in a single family
              home. Some markets will not even have 2 bathroom homes. So we
              recommend leaving this number as 1.
            </div>
            <div className="modal_divider"></div>
          </div>
        </div>
      </div>
      <div className="modal_form-group">
        <div className="modal_group-header">
          <div className="modal_group-heading">Financing Assumptions</div>
          <div className="modal_divider"></div>
        </div>
        <div className="modal_form-group-fields">
          <div className="form-field-wrapper">
            <label for="Loan-Downpayment" className="modal_input_label">
              Loan Downpayment
            </label>
            <div className="modal_input-with-symbol">
              <input
                type="number"
                className="modal_form-input w-input"
                maxlength="256"
                name="Loan-Downpayment"
                data-name="Loan Downpayment"
                placeholder="eg - 20"
                id="Loan-Downpayment"
                required=""
                value={downPayment}
                onInput={eliminateEvent(setDownPayment)}
              />
              <div className="modal_input-symbol">%</div>
            </div>
            <div className="modal_form-help-text">
              This is the downpayment % for the loan as required by your bank.
              Usually this is 20% but check with your lender once.
            </div>
            <div className="modal_form-help-text">
              This number cannot be 0. Enter .00001, if there is no downpayment.
              If you are buying all cash with no loan, enter 100.
            </div>
            <div className="modal_divider"></div>
          </div>
          <div className="form-field-wrapper">
            <label for="Loan-Downpayment-3" className="modal_input_label">
              Loan Interest
            </label>
            <div className="modal_input-with-symbol">
              <input
                type="number"
                className="modal_form-input w-input"
                maxlength="256"
                name="Loan-Interest"
                data-name="Loan Interest"
                placeholder="eg - 6"
                id="Loan-Interest"
                required=""
                value={loanInterest}
                onInput={eliminateEvent(setLoanInterest)}
              />
              <div className="modal_input-symbol">%</div>
            </div>
            <div className="modal_form-help-text">
              Enter the interest rate charged by your bank
            </div>
            <div className="modal_form-help-text">
              This number cannot be 0. If you are buying all cash, enter .00001
            </div>
            <div className="modal_divider"></div>
          </div>
          <div className="form-field-wrapper">
            <label for="Loan-Downpayment-2" className="modal_input_label">
              Loan Duration
            </label>
            <div className="modal_input-with-symbol">
              <input
                type="number"
                className="modal_form-input w-input"
                maxlength="256"
                name="Loan-Duration"
                data-name="Loan Duration"
                placeholder="eg - 240"
                id="Loan-Duration"
                required=""
                value={loanMonths}
                onInput={eliminateEvent(setLoanMonths)}
              />
              <div className="modal_input-symbol">months</div>
            </div>
            <div className="modal_form-help-text">
              Enter the number of months the loan is for. For example - if the
              loan is for 30 years, enter 360 months.
            </div>
            <div className="modal_form-help-text">
              This number cannot be 0. If you are buying all cash, enter .00001
            </div>
            <div className="modal_divider"></div>
          </div>
          <div className="form-field-wrapper">
            <label for="Loan-Downpayment-2" className="modal_input_label">
              Closing Cost
            </label>
            <div className="modal_input-with-symbol">
              <input
                type="number"
                className="modal_form-input w-input"
                maxlength="256"
                name="Closing-Cost"
                data-name="Closing Cost"
                placeholder="eg - 3"
                id="Closing-Cost"
                required=""
                value={closingCosts}
                onInput={eliminateEvent(setClosingCosts)}
              />
              <div className="modal_input-symbol">%</div>
            </div>
            <div className="modal_form-help-text">
              This is the one time cost to close the loan on the property. It
              includes any bank fees, lawyer fees, appraisal fees etc. Usually
              it is 3-5% and calculated on the offer price
            </div>
            <div className="modal_form-help-text">
              This number cannot be 0. If you are buying all cash, enter .00001
            </div>
            <div className="modal_divider"></div>
          </div>
        </div>
      </div>
      <div className="modal_form-group">
        <div className="modal_group-header">
          <div className="modal_group-heading">Fixed Monthly Expenses</div>
          <div className="modal_divider"></div>
        </div>
        <div className="modal_form-group-fields">
          <div className="form-field-wrapper">
            <label for="Monthly-Insurance" className="modal_input_label">
              Monthly Insurance (in dollars)
            </label>
            <input
              type="number"
              className="modal_form-input w-input"
              maxlength="256"
              name="Monthly-Insurance"
              data-name="Monthly Insurance"
              placeholder="eg - 60"
              id="Monthly-Insurance"
              required=""
              value={insurance}
              onInput={eliminateEvent(setInsurance)}
            />
            <div className="modal_form-help-text">
              Enter the per month number you will pay for insurance. Usually
              this is $60-$80 per month for a single family. Check with your
              insurance agent.
            </div>
            <div className="modal_divider"></div>
          </div>
          <div className="form-field-wrapper">
            <label for="Monthly-Utilities" className="modal_input_label">
              Monthly Utilities (in dollars)
            </label>
            <input
              type="number"
              className="modal_form-input w-input"
              maxlength="256"
              name="Monthly-Utilities"
              data-name="Monthly Utilities"
              placeholder="eg - 120"
              id="Monthly-Utilities"
              required=""
              value={utilities}
              onInput={eliminateEvent(setUtilities)}
            />
            <div className="modal_form-help-text">
              This is a monthly expense. For a single-family rental, the tenants
              pay for utilities usually, so put 0. But at times the landlord pay
              for it so check with the listing agent.
            </div>
            <div className="modal_divider"></div>
          </div>
          <div className="form-field-wrapper">
            <label for="Property-Management-Fee" className="modal_input_label">
              Property Management Fee
            </label>
            <div className="modal_input-with-symbol">
              <input
                type="number"
                className="modal_form-input w-input"
                maxlength="256"
                name="Property-Management-Fee"
                data-name="Property Management Fee"
                placeholder="eg - 7.5"
                id="Property-Management-Fee"
                required=""
                value={propertyManagement}
                onInput={eliminateEvent(setPropertyManagement)}
              />
              <div className="modal_input-symbol">%</div>
            </div>
            <div className="modal_form-help-text">
              This is a monthly expense. Enter as a percent of monthly gross
              income. Usually this is 8-12%. If you are self managing, put 0 to
              2 %
            </div>
            <div className="modal_divider"></div>
          </div>
        </div>
      </div>
      <div className="modal_form-group">
        <div className="modal_group-header">
          <div className="modal_group-heading">Variable Monthly Expense</div>
          <div className="modal_divider"></div>
        </div>
        <div className="modal_form-group-fields">
          <div className="form-field-wrapper">
            <label for="Loan-Downpayment-2" className="modal_input_label">
              Vacancy Costs
            </label>
            <div className="modal_input-with-symbol">
              <input
                type="number"
                className="modal_form-input w-input"
                maxlength="256"
                name="Vacancy-Costs"
                data-name="Vacancy Costs"
                placeholder="eg - 7"
                id="Vacancy-Costs"
                required=""
                value={vacancy}
                onInput={eliminateEvent(setVacancy)}
              />
              <div className="modal_input-symbol">%</div>
            </div>
            <div className="modal_form-help-text">
              Most investors put 7% here. This number cannot be 0
            </div>
            <div className="modal_divider"></div>
          </div>
          <div className="form-field-wrapper">
            <label for="Loan-Downpayment-2" className="modal_input_label">
              Capital Expenses
            </label>
            <div className="modal_input-with-symbol">
              <input
                type="number"
                className="modal_form-input w-input"
                maxlength="256"
                name="Capital-Expenses"
                data-name="Capital Expenses"
                placeholder="eg - 8"
                id="Capital-Expenses"
                required=""
                value={capex}
                onInput={eliminateEvent(setCapex)}
              />
              <div className="modal_input-symbol">%</div>
            </div>
            <div className="modal_form-help-text">
              This is a monthly expense. It accounts for heavy duty items like
              HVAC, Roof, Plumbing etc.
            </div>
            <div className="modal_form-help-text">
              Enter as a percent of monthly gross income. Usually this is 5-15%
              depending on the condition of the property. Eg - Put 5% if the
              condition is good.
            </div>
            <div className="modal_divider"></div>
          </div>
          <div className="form-field-wrapper">
            <label for="Loan-Downpayment-2" className="modal_input_label">
              Monthly Repairs
            </label>
            <div className="modal_input-with-symbol">
              <input
                type="number"
                className="modal_form-input w-input"
                maxlength="256"
                name="Capital-Expenses-Repairs"
                data-name="Capital Expenses (Repairs)"
                placeholder="eg - 8"
                id="Capital-Expenses-Repairs"
                required=""
                value={repairs}
                onInput={eliminateEvent(setRepairs)}
              />
              <div className="modal_input-symbol">%</div>
            </div>
            <div className="modal_form-help-text">
              This is a monthly expense. It accounts for small wear and tear
              like broken window, sink clog etc.
            </div>
            <div className="modal_form-help-text">
              Enter as a percent of monthly gross income. Usually this is 5-15%
              depending on the condition of the property. Eg - Put 5% if the
              condition is good.
            </div>
            <div className="modal_divider"></div>
          </div>
        </div>
      </div>
      <div className="modal_form-group">
        <div className="modal_group-header">
          <div className="modal_group-heading">Misc Expenses</div>
          <div className="modal_divider"></div>
        </div>
        <div className="modal_form-group-fields">
          <div className="form-field-wrapper">
            <label for="Miscellaneous-Expenses" className="modal_input_label">
              Miscellaneous Expenses (in dollars)
            </label>
            <input
              type="number"
              className="modal_form-input w-input"
              maxlength="256"
              name="Miscellaneous-Expenses"
              data-name="Miscellaneous Expenses"
              placeholder="eg - 200"
              id="Miscellaneous-Expenses"
              required=""
              value={additionalMonthlyExpenses}
              onInput={eliminateEvent(setAdditionalMonthlyExpenses)}
            />
            <div className="modal_form-help-text">
              This is a monthly expense. Think about any additional expenses
              like a additional debt interest or flood insurance or marketing
              expenses and add them here as a total number
            </div>
            <div className="modal_divider"></div>
            <p className="error">{errorMessage}</p>
            <button className="ostrich-button" onClick={save}>
              Save
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
