// Initialize butotn with users's prefered color
let actionButton = document.getElementById("actionButton");

// When the button is clicked, inject doCalc into current page
actionButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getElements,
  }, handleResults);
});

// The body of this function will be execuetd as a content script inside the
// current page
const getElements = () => {
  const cost_selectors = [
    "#details-page-container > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > div.ds-summary-row-container > div > div > span > span > span",
    "#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > div.ds-summary-row-container > div > div > span > span > span",
    "#ds-data-view > div.ds-chip-mobile.ds-chip-mobile-open > div.ds-home-details-chip > div.ds-summary-row-container > div > div > span > span > span"
  ];

  const monthly_selectors = [
    "#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > div.ds-mortgage-row > div > span:nth-child(2)",
    "#details-page-container > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > div.ds-mortgage-row > div > span:nth-child(2)",
    "#ds-data-view > div.ds-chip-mobile.ds-chip-mobile-open > div.ds-home-details-chip > div.ds-mortgage-row > div > span:nth-child(2)"
  ];

  const rental_selectors = [
    "#ds-rental-home-values > div > div.ds-expandable-card-section-default-padding > div > div > div > span",
  ]

  const scrapeElement = (selectors) => {
    let element = null;
    let i = 0;
    while ( element == null && i < selectors.length ) {
      element = document.querySelector(selectors[i]);
      i += 1;
    }
    return element.innerHTML;
  }

  let host = window.location.host;
  let m = host == "www.zillow.com";

  if (m) {
    let cost = scrapeElement(cost_selectors);
    let monthly = scrapeElement(monthly_selectors);
    let rental = scrapeElement(rental_selectors);

    return ({ cost, monthly, rental });
  } else {
    alert("Sorry, not on Zillow!");
  }
}

const calculate = (purchasePrice, taxes, monthlyGrossIncome) => {

  console.log({purchasePrice, taxes, monthlyGrossIncome});

  // COC = [(Monthly Cash flow (MCF) x 12) / Initial Total Investment (ITI)] x 100
  const CashOnCash = (monthlyCashFlow, initialTotalInvestment) => (((monthlyCashFlow * 12) / initialTotalInvestment) * 100);

  // ITI = 29% of Purchase Price(PP)(Which comes from Zillow)
  const InitialTotalInvestment = (purchasePrice) => (0.29 * purchasePrice);

  // MCF = Monthly Gross Income(MGI)(comes from Zillow) - Monthly Expenses - Monthly Debt Service
  const MonthlyCashFlow = (monthlyGrossIncome, monthlyExpenses, monthlyDebtService) => (monthlyGrossIncome - monthlyExpenses - monthlyDebtService);

  // Monthly Expenses = Taxes(comes from Zillow) + Insurance($60) + Vacancy(5% of MGI) + Property Management(4% of MGI)+ Capex(5% of MGI) + Repairs(5% of MGI) + Utilities($0)
  const MonthlyExpenses = (taxes, monthlyGrossIncome) => {
    const insurance = 60;
    const vacancy = 0.05 * monthlyGrossIncome;
    const propertyManagement = 0.04 * monthlyGrossIncome;
    const capex = 0.05 * monthlyGrossIncome;
    const repairs = 0.05 * monthlyGrossIncome;
    const utilities = 0;

    return insurance + vacancy + propertyManagement + capex + repairs + utilities;
  }

  // Monthly Debt Service = .61 % of Loan
  const MonthlyDebtService = (loan) => (0.0061 * loan);

  // Loan = 75% of Purchase Price(comes from Zillow)
  const Loan = (purchasePrice) => (0.75 * purchasePrice);

  const loan = Loan(purchasePrice);
  console.log({loan});
  const monthlyDebtService = MonthlyDebtService(loan);
  console.log({monthlyDebtService});
  const monthlyExpenses = MonthlyExpenses(taxes, monthlyGrossIncome);
  console.log({monthlyExpenses});
  const initialTotalInvestment = InitialTotalInvestment(purchasePrice);
  console.log({initialTotalInvestment});

  const monthlyCashFlow = MonthlyCashFlow(monthlyGrossIncome, monthlyExpenses, monthlyDebtService);

  const cashOnCash = CashOnCash(monthlyCashFlow, initialTotalInvestment);

  return cashOnCash;
}

const toInt = (n) => parseInt(n.split("").filter(a => parseInt(a)).join(""));

const handleResults = (r) => {
  const results = r[0].result;

  const cost = results.cost;
  const monthly = results.monthly;
  const rental = results.rental;

  let cashOnCash = calculate(toInt(cost), toInt(monthly), toInt(rental));
  document.getElementById("cost").innerHTML = cost;
  document.getElementById("monthly").innerHTML = monthly;
  document.getElementById("rental").innerHTML = rental;
  document.getElementById("coc").innerHTML = "$" + cashOnCash.toLocaleString() + " (" + (100*(cashOnCash/price)) + "%)";

  if ( cashOnCash > 0 ) {
    document.getElementById("coc").className = "success";
  } else {
    document.getElementById("coc").className = "error";
  }
}
