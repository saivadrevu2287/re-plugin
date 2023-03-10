// turn anything with numbers into just a regular integer
export const toInt = (n) =>
  parseInt(
    n
      .split('')
      .filter((a) => a.match(/[0-9.]/g))
      .join('')
  )

export const monthlyDollars = (n) =>
  isNaN(n) ? 'N/A' : `$${n.toLocaleString()}/mo`

export const dollars = (n) => (isNaN(n) ? 'N/A' : `$${n.toLocaleString()}`)

// COC = [(Monthly Cash flow (MCF) x 12) / Initial Total Investment (ITI)] x 100
const CashOnCash = (monthlyCashFlow, initialTotalInvestment) =>
  ((monthlyCashFlow * 12) / initialTotalInvestment) * 100

// ITI = 29% of Purchase Price(PP)(Which comes from Zillow)
const InitialTotalInvestment = (configurationFields, purchasePrice) =>
  (configurationFields['down-payment'].value +
    configurationFields['closing-cost'].value) *
  purchasePrice

// MCF = Monthly Gross Income(MGI)(comes from Zillow) - Monthly Expenses - Monthly Debt Service
const MonthlyCashFlow = (
  configurationFields,
  monthlyGrossIncome,
  monthlyExpenses,
  monthlyDebtService
) =>
  monthlyGrossIncome -
  monthlyGrossIncome * configurationFields.vacancy.value -
  monthlyExpenses -
  monthlyDebtService

// Monthly Expenses = Taxes(comes from Zillow) + Insurance($60) + Vacancy(5% of MGI) + Property Management(4% of MGI)+ Capex(5% of MGI) + Repairs(5% of MGI) + Utilities($0)
const MonthlyExpenses = (configurationFields, taxes, monthlyGrossIncome) => {
  const income =
    monthlyGrossIncome - configurationFields.vacancy.value * monthlyGrossIncome

  const insurance = configurationFields.insurance.value
  const propertyManagement = configurationFields.property.value * income
  const capex = configurationFields.capex.value * income
  const repairs = configurationFields.repairs.value * income
  const utilities = configurationFields.utilities.value

  return taxes + insurance + propertyManagement + capex + repairs + utilities
}

// Monthly Debt Service = .61 % of Loan
const MonthlyDebtService = (configurationFields, loan) => {
  // i
  const monthlyInterest = configurationFields['loan-interest'].value / 12
  // n
  const months = configurationFields['loan-months'].value
  // (1 + i)^-n
  const exponent = Math.pow(1 + monthlyInterest, -months)
  // 1 - (1 + i)^-n
  const denominator = 1 - exponent

  // p * (i / (1 - (1 + i)^-n))
  return loan * (monthlyInterest / denominator)
}

// Loan = 75% of Purchase Price(comes from Zillow)
const Loan = (configurationFields, purchasePrice) =>
  (1 - configurationFields['down-payment'].value) * purchasePrice

export const calculateCOC = (
  configurationFields,
  purchasePrice,
  taxes,
  monthlyGrossIncome
) => {
  const loan = Loan(configurationFields, purchasePrice)
  const monthlyDebtService = MonthlyDebtService(configurationFields, loan)
  const monthlyExpenses =
    MonthlyExpenses(configurationFields, taxes, monthlyGrossIncome) +
    configurationFields['additional-monthly-expenses'].value
  const initialTotalInvestment = InitialTotalInvestment(
    configurationFields,
    purchasePrice
  )

  const monthlyCashFlow = MonthlyCashFlow(
    configurationFields,
    monthlyGrossIncome,
    monthlyExpenses,
    monthlyDebtService
  )
  const cashOnCash = CashOnCash(monthlyCashFlow, initialTotalInvestment)

  return { cashOnCash, monthlyExpenses }
}

export const nFormatter = (num, digits) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0'
}
