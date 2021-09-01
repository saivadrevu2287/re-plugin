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

  return taxes + insurance + vacancy + propertyManagement + capex + repairs + utilities;
}

// Monthly Debt Service = .61 % of Loan
const MonthlyDebtService = (loan) => (0.0061 * loan);

// Loan = 75% of Purchase Price(comes from Zillow)
const Loan = (purchasePrice) => (0.75 * purchasePrice);

const calculate = (purchasePrice, taxes, monthlyGrossIncome) => {
  const loan = Loan(purchasePrice);
  const monthlyDebtService = MonthlyDebtService(loan);
  const monthlyExpenses = MonthlyExpenses(taxes, monthlyGrossIncome);
  const initialTotalInvestment = InitialTotalInvestment(purchasePrice);

  const monthlyCashFlow = MonthlyCashFlow(monthlyGrossIncome, monthlyExpenses, monthlyDebtService);
  const cashOnCash = CashOnCash(monthlyCashFlow, initialTotalInvestment);

  return cashOnCash;
}

const toInt = (n) => parseInt(n.split("").filter(a => parseInt(a) >= 0).join(""));

const google_search_query = (s) => `https://www.google.com/search?q=${encodeURIComponent(s)}`;

// this will receive an object of the shape { cost, monthly, rental }
// it executes in the DOM of the popup
const handleResults = (r) => {
  const results = r[0].result;

  const cost = results.cost;
  const monthly = results.monthly;
  const rental = results.rental;
  const address = results.address;
  const estimate = results.estimate;
  const beds_bath = results.beds_bath;
  const days_on_market = results.days_on_market;

  const cost_num = toInt(cost);
  const monthly_num = toInt(monthly);
  const rental_num = toInt(rental);

  let cashOnCash = 'N/A';
  if (cost_num && monthly_num && rental_num) {
    cashOnCash = calculate(cost_num, monthly_num, rental_num).toLocaleString() + "%";
  }

  let redfin_search = google_search_query(address + " redfin");
  let realtor_search = google_search_query(address + " realtor");

  document.getElementById("cost").innerHTML = cost;
  document.getElementById("estimate").innerHTML = estimate;
  document.getElementById("monthly").innerHTML = monthly;
  document.getElementById("rental").innerHTML = rental;
  document.getElementById("days_on_market").innerHTML = days_on_market;
  document.getElementById("address").innerHTML = address;
  document.getElementById("specs").innerHTML = beds_bath;
  document.getElementById("coc").innerHTML = cashOnCash;
  document.getElementById("redfin").href = redfin_search;
  document.getElementById("realtor").href = realtor_search;

  if ( cashOnCash > 0 ) {
    document.getElementById("coc").className = "success";
  } else {
    document.getElementById("coc").className = "error";
  }
}

// The body of this function will be execuetd as a content script inside the
// current page
const getElements = () => {
  const cost_selectors = [
    "#details-page-container > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > div.ds-summary-row-container > div > div > span > span > span",
    "#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > div.ds-summary-row-container > div > div > span > span > span",
    "#ds-data-view > div.ds-chip-mobile.ds-chip-mobile-open > div.ds-home-details-chip > div.ds-summary-row-container > div > div > span > span > span"
  ];

  const monthly_selectors = [
    "#label-property-tax > div > span"
  ];

  const rental_selectors = [
    "#ds-rental-home-values > div > div.ds-expandable-card-section-default-padding > div > div > div > span",
  ]

  const address_selectors = [
    "#ds-chip-property-address"
  ];

  const beds_bath_selectors = [
    "#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.FNtGJ.ds-chip > div > div.ds-summary-row-container > div > div > div > span"
  ]

  const estimate_selectors = [
    "#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.FNtGJ.ds-chip > div > div.hdp__qf5kuj-12.ivFlOG.ds-chip-removable-content > p > span.hdp__qf5kuj-9.iuGlLh > span:nth-child(2) > span"
  ]

  const days_on_market_selectors = [
    "#ds-data-view > ul > li:nth-child(3) > div > div > div.ds-expandable-card-section-default-padding > div.hdp__sc-1f3vlqq-0.jRmwCk > div:nth-child(1) > div.Text-c11n-8-48-0__sc-aiai24-0.fGOvOB"
  ]

  const scrapeElement = (selectors) => {
    let nill = 'N/A';

    let element = nill;
    let i = 0;
    while ( element == nill && i < selectors.length ) {
      try {
        element = document.querySelector(selectors[i]).innerHTML;
      } catch (error) {
        element = nill;
      }
      i += 1;
    }

    return element;
  }

  const flatten_html = (el) => {
    return el.replace(/<\/?[^>]*>/g, ' ').replace(/&[^;]*;/, ' ');
  }

  const host = window.location.host;
  const m = host == "www.zillow.com";

  if (m) {
    const cost = scrapeElement(cost_selectors);
    const monthly = scrapeElement(monthly_selectors);
    const rental = scrapeElement(rental_selectors);
    const address = flatten_html(scrapeElement(address_selectors));
    const estimate = scrapeElement(estimate_selectors);
    const beds_bath = flatten_html(scrapeElement(beds_bath_selectors));
    const days_on_market = scrapeElement(days_on_market_selectors);

    return ({
      cost,
      monthly,
      rental,
      address,
      estimate,
      beds_bath,
      days_on_market,
    });

  } else {
    alert("Sorry, not on Zillow!");
  }
}
