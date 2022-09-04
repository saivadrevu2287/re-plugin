import { h, Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import entry from '../build/entry'

const badProperties = ['idToken', 'email', 'needsVerification', 'isLoggedIn']
const includedProperties = [
  //     insurance: { value: 60, type: 'dollars' },
  // vacancy: { value: 0.05, type: 'percent' },
  // property: { value: 0.04, type: 'percent' },
  // capex: { value: 0.05, type: 'percent' },
  // repairs: { value: 0.05, type: 'percent' },
  // utilities: { value: 0, type: 'dollars' },
  // 'down-payment': { value: 0.25, type: 'percent' },
  // 'closing-cost': { value: 0.04, type: 'percent' },
  // 'loan-interest': { value: 0.041, type: 'percent' },
  // 'loan-months': { value: 240, type: 'months' },
  // 'additional-monthly-expenses': { value: 0, type: 'dollars' },
]
const eliminateEvent = (callback) => (event) => callback(event.target.value)

const handleNumberForField = (type, number) => {
  console.log({ type, number })
  const value = parseFloat(number)
  return type === 'percent' ? value / 100 : value
}

function Options(props) {
  const [configurationFields, setConfigurationFields] = useState(null)

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
    configurationFields['additional-monthly-expenses'].value = handleNumberForField(
      configurationFields['additional-monthly-expenses'].type,
      additionalMonthlyExpenses
    )

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
        <div className="align-center third break-to-full padded">
          <h4 className="personal-margin-bottom personal-margin-top">
            Edit your parameters!
          </h4>
          <div className="thin-container ostrich-container personal-space-bottom align-center">
            <div className="flex between centered-items personal-space-bottom">
              <label className="fourth align-right" htmlFor="insurance-input">
                Insurance:
              </label>
              <div>
                <input
                  type="number"
                  class="fourth"
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
                  class="fourth"
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
                  class="fourth"
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
                  class="fourth"
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
                  class="fourth"
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
                  class="fourth"
                  value={utilities}
                  onInput={eliminateEvent(setUtilities)}
                />
                <b>$</b>
              </div>
            </div>
            <div className="flex between centered-items personal-space-bottom">
              <label
                className="fourth align-right"
                htmlFor="down-payment-input"
              >
                Down Payment:
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
                Closing Cost:
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
                Loan Interest:
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
                Loan Months:
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
                Additional Monthly Expenses:
              </label>
              <div>
                <input
                  type="number"
                  class="fourth"
                  value={additionalMonthlyExpenses}
                  onInput={eliminateEvent(setAdditionalMonthlyExpenses)}
                />
                <b>$</b>
              </div>
            </div>
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
