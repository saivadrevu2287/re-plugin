// Initialize butotn with users's prefered color
const actionButton = document.getElementById("action-button");

const purchasePriceElement = document.getElementById("purchase-price");
const estimatePriceElement = document.getElementById("estimate-price");

const monthlyTaxesElement = document.getElementById("monthly-taxes");
const monthlyRentElement = document.getElementById("monthly-rent");

const daysOnMarketElement = document.getElementById("days-on-market");
const addressElement = document.getElementById("address");
const specsElement = document.getElementById("specs");
const cashOnCashElement = document.getElementById("cash-on-cash");

const redfinLinkElement = document.getElementById("redfin-link");
const realtorLinkElement = document.getElementById("realtor-link");

// for the offer slider and the value it holds
const offerElement = document.getElementById("offer");
const offerSliderElement = document.getElementById("offer-slider");
const offerSliderMinElement = document.getElementById("offer-slider-min");
const offerSliderMaxElement = document.getElementById("offer-slider-max");

// for the rent slider and the value it holds
const rentElement = document.getElementById("rent");
const rentSliderElement = document.getElementById("rent-slider");
const rentSliderMinElement = document.getElementById("rent-slider-min");
const rentSliderMaxElement = document.getElementById("rent-slider-max");

const offerPercentRange = 0.10
offerSliderMinElement.innerHTML = `-${100*offerPercentRange}%`;
offerSliderMaxElement.innerHTML = `+${100*offerPercentRange}%`;

const rentPercentRange = 0.20
rentSliderMinElement.innerHTML = `-${100*rentPercentRange}%`;
rentSliderMaxElement.innerHTML = `+${100*rentPercentRange}%`;

// vars for the data that comes over
let purchasePrice;
let monthlyTaxes;
let monthlyRent;
let address;
let estimate;
let bedsBath;
let daysOnMarket;
let cashOnCash;

// vars for the slider values
let offer;
let rent;

// When the button is clicked, inject doCalc into current page
actionButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getElements,
  }, handleResults);
});

offerSliderElement.addEventListener("change", (e) => {
  offer = `$${e.target.value.toLocaleString()}`;
  cashOnCashElement.innerHTML = doCOC(offer, monthlyTaxes, rent);
  offerElement.innerHTML = offer;
});

rentSliderElement.addEventListener("change", (e) => {
  rent = `$${e.target.value.toLocaleString()}/mo`;
  cashOnCashElement.innerHTML = doCOC(offer, monthlyTaxes, rent);
  rentElement.innerHTML = rent;
});

// turn anything with numbers into just a regular integer
const toInt = (n) => parseInt(n.split("").filter(a => a.match(/[0-9.]/g)).join(""));

// generate a url that will send us to a google link
const googleSearchQuery = (s) => `https://www.google.com/search?q=${encodeURIComponent(s)}&btnI`;

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

const calculateCOC = (purchasePrice, taxes, monthlyGrossIncome) => {
  const loan = Loan(purchasePrice);
  const monthlyDebtService = MonthlyDebtService(loan);
  const monthlyExpenses = MonthlyExpenses(taxes, monthlyGrossIncome);
  const initialTotalInvestment = InitialTotalInvestment(purchasePrice);

  const monthlyCashFlow = MonthlyCashFlow(monthlyGrossIncome, monthlyExpenses, monthlyDebtService);
  const cashOnCash = CashOnCash(monthlyCashFlow, initialTotalInvestment);

  return cashOnCash;
}

const setCocClass = (cashOnCash) => {
  if ( cashOnCash > 0 ) {
    cashOnCashElement.className = "success";
  } else {
    cashOnCashElement.className = "error";
  }
}

const doCOC = (purchasePrice, monthlyTaxes, monthlyRent) => {
  const purchasePriceNum = toInt(purchasePrice);
  const monthlyTaxesNum = toInt(monthlyTaxes);
  const monthlyRentNum = toInt(monthlyRent);

  if (purchasePriceNum && monthlyTaxesNum && monthlyRentNum) {
    const coc = calculateCOC(purchasePriceNum, monthlyTaxesNum, monthlyRentNum);
    const cocString = coc.toLocaleString() + "%";
    setCocClass(coc);
    return cocString;
  } else {
    return 'N/A';
  }
}

// this will receive an object of the shape { cost, monthly, rental }
// it executes in the DOM of the popup
const handleResults = (r) => {
  const results = r[0].result;

  // destructure the results
  purchasePrice = results.purchasePrice;
  monthlyTaxes = results.monthlyTaxes;
  monthlyRent = results.monthlyRent;
  address = results.address;
  estimatePrice = results.estimatePrice;
  bedsBath = results.bedsBath;
  daysOnMarket = results.daysOnMarket;

  // set these for working calculations
  offer = purchasePrice;
  rent = monthlyRent;

  // major calculation
  cashOnCash = doCOC(offer, monthlyTaxes, rent);

  const calculations = {
    purchasePrice,
    monthlyTaxes,
    monthlyRent,
    address,
    estimatePrice,
    bedsBath,
    daysOnMarket,
    cashOnCash,
  }

  let redfinSearch = googleSearchQuery(address + " redfin");
  let realtorSearch = googleSearchQuery(address + " realtor");

  // update the ui
  purchasePriceElement.innerHTML = purchasePrice;
  estimatePriceElement.innerHTML = estimatePrice;
  monthlyTaxesElement.innerHTML = monthlyTaxes;
  monthlyRentElement.innerHTML = monthlyRent;
  daysOnMarketElement.innerHTML = daysOnMarket;
  addressElement.innerHTML = address;
  specsElement.innerHTML = bedsBath;

  cashOnCashElement.innerHTML = cashOnCash;

  redfinLinkElement.href = redfinSearch;
  realtorLinkElement.href = realtorSearch;

  offerElement.innerHTML = offer;
  offerSliderElement.min = toInt(offer) * (1 - offerPercentRange);
  offerSliderElement.max = toInt(offer) * (1 + offerPercentRange);
  offerSliderElement.value = toInt(offer);

  rentElement.innerHTML = rent;
  rentSliderElement.min = toInt(rent) * (1 - rentPercentRange);
  rentSliderElement.max = toInt(rent) * (1 + rentPercentRange);
  rentSliderElement.value = toInt(rent);

  actionButton.innerHTML = "Coppied to Clipboard!"

  const separator = "\n";
  const toCsv = (obj) => Object.keys(obj).reduce((acc, key) => `${acc}${obj[key]}${separator}`, "");
  const copy = function (e) {
      e.preventDefault();
      const text = toCsv(calculations);
      if (e.clipboardData) {
          e.clipboardData.setData('text/plain', text);
      } else if (window.clipboardData) {
          window.clipboardData.setData('Text', text);
      }
  }

  window.addEventListener('copy', copy);
  document.execCommand('copy');
  window.removeEventListener('copy', copy);
}

// The body of this function will be execuetd as a content script inside the
// current page
const getElements = () => {
  const separator = "\n";
  const toCsv = (obj) => Object.keys(obj).reduce((acc, key) => `${acc}${obj[key]}${separator}`, "");

  const purchasePriceSelectors = [
    "#details-page-container > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > div.ds-summary-row-container > div > div > span > span > span",
    "#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > div.ds-summary-row-container > div > div > span > span > span",
    "#ds-data-view > div.ds-chip-mobile.ds-chip-mobile-open > div.ds-home-details-chip > div.ds-summary-row-container > div > div > span > span > span"
  ];

  const monthlyTaxesSelectors = [
    "#label-property-tax > div > span"
  ];

  const monthlyRentSelectors = [
    "#ds-rental-home-values > div > div.ds-expandable-card-section-default-padding > div > div > div > span",
  ]

  const addressSelectors = [
    "#ds-chip-property-address"
  ];

  const bedsBathSelectors = [
    "#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.FNtGJ.ds-chip > div > div.ds-summary-row-container > div > div > div > span"
  ]

  const estimatePriceSelectors = [
    "#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.FNtGJ.ds-chip > div > div.sc-pbvBv.hmDgXL.ds-chip-removable-content > p > span.sc-pRhbc.ePDsLp > span:nth-child(2) > span",
    "#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.FNtGJ.ds-chip > div > div.hdp__qf5kuj-12.ivFlOG.ds-chip-removable-content > p > span.hdp__qf5kuj-9.iuGlLh > span:nth-child(2) > span"
  ]

  const daysOnMarketSelectors = [
    "#ds-data-view > ul > li:nth-child(3) > div > div > div.ds-expandable-card-section-default-padding > div.hdp__sc-1f3vlqq-0.jRmwCk > div:nth-child(1) > div.Text-c11n-8-48-0__sc-aiai24-0.fGOvOB",
    "#ds-data-view > ul > li:nth-child(3) > div > div > div.ds-expandable-card-section-default-padding > div.sc-ptScb.hfNvvF > div:nth-child(1) > div.Text-c11n-8-48-0__sc-aiai24-0.fGOvOB",
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

  const flattenHtml = (el) => {
    return el.replace(/<\/?[^>]*>/g, ' ').replace(/&[^;]*;/, ' ');
  }

  const host = window.location.host;
  const m = host == "www.zillow.com";

  if (m) {
    const purchasePrice = scrapeElement(purchasePriceSelectors);
    const monthlyTaxes = scrapeElement(monthlyTaxesSelectors);
    const monthlyRent = scrapeElement(monthlyRentSelectors);
    const address = flattenHtml(scrapeElement(addressSelectors));
    const estimatePrice = scrapeElement(estimatePriceSelectors);
    const bedsBath = flattenHtml(scrapeElement(bedsBathSelectors));
    const daysOnMarket = scrapeElement(daysOnMarketSelectors);

    const results = {
      purchasePrice,
      monthlyTaxes,
      monthlyRent,
      address,
      estimatePrice,
      bedsBath,
      daysOnMarket,
    }

    return (results);

  } else {
    alert("Sorry, not on Zillow!");
  }
}
