import { h, Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import entry from '../build/entry'

const handleNumberForField = (type, number) => {
  console.log({ type, number })
  const value = parseFloat(number)
  return type === 'percent' ? value / 100 : value
}

function Options(props) {
  const [configurationFields, setConfigurationFields] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

  const eliminateEvent = (callback) => (event) => {
    setErrorMessage('')
    callback(event.target.value)
  }

  useEffect(() => {
    chrome.storage.sync.get('configurationFields', (data) => {
      console.log(data.configurationFields)
      setConfigurationFields(data.configurationFields)

      setInsurance(data.configurationFields.insurance.value)
      setVacancy(data.configurationFields.vacancy.value * 100)
      setPropertyManagement(data.configurationFields.property.value * 100)
      setCapex(data.configurationFields.capex.value * 100)
      setRepairs(data.configurationFields.repairs.value * 100)
      setUtilities(data.configurationFields.utilities.value)
      setDownPayment(data.configurationFields['down-payment'].value * 100)
      setClosingCosts(data.configurationFields['closing-cost'].value * 100)
      setLoanInterest(data.configurationFields['loan-interest'].value * 100)
      setLoanMonths(data.configurationFields['loan-months'].value)
      setAdditionalMonthlyExpenses(
        data.configurationFields['additional-monthly-expenses'].value
      )
    })
  }, [])

  const handleSave = () => {
    if (!configurationFields) return

    if ( !parseFloat(downPayment) ) {
      setErrorMessage("Down Payment cannot be 0")
      return
    }

    if ( !parseFloat(closingCosts) ) {
      setErrorMessage("Closing Cost cannot be 0")
      return
    }

    if ( !parseFloat(loanInterest) ) {
      setErrorMessage("Loan Interest cannot be 0. If you are buying all cash, enter .001")
      return
    }

    if ( !parseFloat(loanMonths) ) {
      setErrorMessage("Loan Months cannot be 0")
      return
    }

    configurationFields.insurance.value = handleNumberForField(
      configurationFields.insurance.type,
      insurance
    )
    configurationFields.vacancy.value = handleNumberForField(
      configurationFields.vacancy.type,
      vacancy
    )
    configurationFields.property.value = handleNumberForField(
      configurationFields.property.type,
      propertyManagement
    )
    configurationFields.capex.value = handleNumberForField(
      configurationFields.capex.type,
      capex
    )
    configurationFields.repairs.value = handleNumberForField(
      configurationFields.repairs.type,
      repairs
    )
    configurationFields.utilities.value = handleNumberForField(
      configurationFields.utilities.type,
      utilities
    )
    configurationFields['down-payment'].value = handleNumberForField(
      configurationFields['down-payment'].type,
      downPayment
    )
    configurationFields['closing-cost'].value = handleNumberForField(
      configurationFields['closing-cost'].type,
      closingCosts
    )
    configurationFields['loan-interest'].value = handleNumberForField(
      configurationFields['loan-interest'].type,
      loanInterest
    )
    configurationFields['loan-months'].value = handleNumberForField(
      configurationFields['loan-months'].type,
      loanMonths
    )
    configurationFields['additional-monthly-expenses'].value =
      handleNumberForField(
        configurationFields['additional-monthly-expenses'].type,
        additionalMonthlyExpenses
      )

    setErrorMessage('Saved parameters.')

    chrome.storage.sync.set({ configurationFields: configurationFields })
  }

  if (!configurationFields) {
    return <h4>Loading...</h4>
  }

  return (
    <Fragment>
      <nav>
        <div className="content flex between">
          <div className="flex centered-items">
            <img
              className="header-image link-button personal-space-left"
              src="/OstrichPurple.png"
              alt="ostrich"
            />
          </div>
          <div className="flex justify-end centered-items wrap"></div>
        </div>
      </nav>
      <main className="personal-space-top flex around">
        <div className="align-center half break-to-full padded">
          <h4 className="personal-margin-bottom personal-margin-top">
            Edit your parameters!
          </h4>
          <h6>Hint: Hover on the (i) to see field details.</h6>
          <div className="thin-container ostrich-container personal-space-bottom align-center">
            <div className="flex between centered-items personal-space-bottom">
              <label className="fourth align-right" htmlFor="insurance-input">
                Insurance{' '}
                <span title="Enter the per month number you will pay for insurance. Usually this is $60-$80 per month for a single family.">
                  (i)
                </span>
                :
              </label>
              <div>
                <input
                  type="number"
                  class="fourth"
                  value={insurance}
                  onInput={eliminateEvent(setInsurance)}
                />
                <b>$/mo</b>
              </div>
            </div>
            <div className="flex between centered-items personal-space-bottom">
              <label className="fourth align-right" htmlFor="vacancy-input">
                Vacancy{' '}
                <span title="This is a monthly expense. Enter as a percent of monthly gross income. Usually this is 6-8%">
                  (i)
                </span>
                :
              </label>
              <div>
                <input
                  type="number"
                  class="fourth"
                  value={vacancy}
                  onInput={eliminateEvent(setVacancy)}
                />
                <b>%/mo</b>
              </div>
            </div>
            <div className="flex between centered-items personal-space-bottom">
              <label className="fourth align-right" htmlFor="property-input">
                Property Management{' '}
                <span title="This is a monthly expense. Enter as a percent of monthly gross income. Usually this is 8-12%">
                  (i)
                </span>
                :
              </label>
              <div>
                <input
                  type="number"
                  class="fourth"
                  value={propertyManagement}
                  onInput={eliminateEvent(setPropertyManagement)}
                />
                <b>%/mo</b>
              </div>
            </div>
            <div className="flex between centered-items personal-space-bottom">
              <label className="fourth align-right" htmlFor="capex-input">
                Capex{' '}
                <span title="This is a monthly expense. Enter as a percent of monthly gross income. Usually this is 5-15% depending on the condition of the property">
                  (i)
                </span>
                :
              </label>
              <div>
                <input
                  type="number"
                  class="fourth"
                  value={capex}
                  onInput={eliminateEvent(setCapex)}
                />
                <b>%/mo</b>
              </div>
            </div>
            <div className="flex between centered-items personal-space-bottom">
              <label className="fourth align-right" htmlFor="repairs-input">
                Repairs{' '}
                <span title="This is a monthly expense. Enter as a percent of monthly gross income. Usually this is 5-10% depending on the condition of the property">
                  (i)
                </span>
                :
              </label>
              <div>
                <input
                  type="number"
                  class="fourth"
                  value={repairs}
                  onInput={eliminateEvent(setRepairs)}
                />
                <b>%/mo</b>
              </div>
            </div>
            <div className="flex between centered-items personal-space-bottom">
              <label className="fourth align-right" htmlFor="utilities-input">
                Utilities{' '}
                <span title="This is a monthly expense. For a single-family rental, the tenants pay for utilities usually, so put 0. Double check with your broker once">
                  (i)
                </span>
                :
              </label>
              <div>
                <input
                  type="number"
                  class="fourth"
                  value={utilities}
                  onInput={eliminateEvent(setUtilities)}
                />
                <b>$/mo</b>
              </div>
            </div>
            <div className="flex between centered-items personal-space-bottom">
              <label
                className="fourth align-right"
                htmlFor="down-payment-input"
              >
                Down Payment{' '}
                <span title="This is the downpayment % for the loan as required by your bank. Usually this is 20% but check with your lender once">
                  (i)
                </span>
                :
              </label>
              <div>
                <input
                  type="number"
                  class="fourth"
                  value={downPayment}
                  onInput={eliminateEvent(setDownPayment)}
                />
                <b>%</b>
              </div>
            </div>
            <div className="flex between centered-items personal-space-bottom">
              <label
                className="fourth align-right"
                htmlFor="closing-cost-input"
              >
                Closing Cost{' '}
                <span title="This is the one time cost to close the loan on the property. It includes any bank fees, lawyer fees, appraisal fees etc. Usually it is 3-5% and calculated on the offer price">
                  (i)
                </span>
                :
              </label>
              <div>
                <input
                  type="number"
                  class="fourth"
                  value={closingCosts}
                  onInput={eliminateEvent(setClosingCosts)}
                />
                <b>%</b>
              </div>
            </div>
            <div className="flex between centered-items personal-space-bottom">
              <label
                className="fourth align-right"
                htmlFor="loan-interest-input"
              >
                Loan Interest{' '}
                <span title="Enter the interest rate charged by your bank">
                  (i)
                </span>
                :
              </label>
              <div>
                <input
                  type="number"
                  class="fourth"
                  value={loanInterest}
                  onInput={eliminateEvent(setLoanInterest)}
                />
                <b>%</b>
              </div>
            </div>
            <div className="flex between centered-items personal-space-bottom">
              <label className="fourth align-right" htmlFor="loan-months-input">
                Loan Months{' '}
                <span title="Enter the number of months the loan is for. For example - if the loan is for 30 years, enter 360 months">
                  (i)
                </span>
                :
              </label>
              <div>
                <input
                  type="number"
                  class="fourth"
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
                Additional Monthly Expenses{' '}
                <span title="Enter any additional expenses per month">(i)</span>
                :
              </label>
              <div>
                <input
                  type="number"
                  class="fourth"
                  value={additionalMonthlyExpenses}
                  onInput={eliminateEvent(setAdditionalMonthlyExpenses)}
                />
                <b>$/mo</b>
              </div>
            </div>
            <p>{errorMessage}</p>
            <button
              className="ostrich-button four-fifths personal-margin-top"
              type="submit"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </main>
    </Fragment>
  )
}

entry(<Options />)
