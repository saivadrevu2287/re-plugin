/**
 *
 * HERE BE GLOBALS
 *
 **/

const extpay = ExtPay('ostrich-plugin')

var _gaq = _gaq || [];
// _gaq.push(['_setAccount', 'UA-208478356-1']);
// _gaq.push(['_trackPageview']);

// (function() {
//   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//   ga.src = 'https://ssl.google-analytics.com/ga.js';
//   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
// })();

function track(e) {
  //_gaq.push(['_trackEvent', e.target.id, 'clicked']);
};

// not being used yet
function trackEmail(e) {
  //_gaq.push(['_trackEvent', 'email', 'clicked']);
}

var buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', track);
}

var inputs = document.querySelectorAll('input');
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('change', track);
}

var links = document.querySelectorAll('a');
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', track);
}

// buttons
const copyButton = document.getElementById("copy-button");
const profileButton = document.getElementById("profile-button");

// data fields
const purchasePriceElement = document.getElementById("purchase-price");
const estimatePriceElement = document.getElementById("estimate-price");
const monthlyTaxesElement = document.getElementById("monthly-taxes");
const monthlyRentElement = document.getElementById("monthly-rent");
const daysOnMarketElement = document.getElementById("days-on-market");
const addressElement = document.getElementById("address");
const specsElement = document.getElementById("specs");
const cashOnCashElement = document.getElementById("cash-on-cash");

// links to other tabs
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
const rentSliderContainerElement = document.getElementById("rent-slider-container");
const rentSliderMinElement = document.getElementById("rent-slider-min");
const rentSliderMaxElement = document.getElementById("rent-slider-max");

const rentInputElement = document.getElementById("rent-input");

// vars for the data that comes over
let purchasePrice;
let monthlyTaxes;
let monthlyRent;
let address;
let estimatePrice;
let bedsBath;
let daysOnMarket;
let cashOnCash;
let href;

// vars for the slider values
let offer;
let rent;

let rentError = false;

// global to hold our configs outside of the below callback
let configurationFields;
chrome.storage.sync.get("configurationFields", (data) => {
  configurationFields = data.configurationFields;
})

/**
 *
 * CONSTANTS
 *
 **/
const copiedMessage = "Coppied to Clipboard!"
const copyMessage = "Copy Data Fields"
const csvSeparator = "\n";
// dynamically set the range of the sliders
const offerPercentRange = 0.10;
const rentPercentRange = 0.10;

offerSliderMinElement.innerHTML = `-${100*offerPercentRange}%`;
offerSliderMaxElement.innerHTML = `+${100*offerPercentRange}%`;
rentSliderMinElement.innerHTML = `-${100*rentPercentRange}%`;
rentSliderMaxElement.innerHTML = `+${100*rentPercentRange}%`;

copyButton.innerHTML = copyMessage;

// serialize the data model
const getDataFields = () => ({
  purchasePrice: dollars(purchasePrice),
  monthlyTaxes: monthlyDollars(monthlyTaxes),
  monthlyRent: monthlyDollars(monthlyRent),
  address,
  estimatePrice: dollars(estimatePrice),
  bedsBath,
  daysOnMarket,
  cashOnCash,
  offer: dollars(offer),
  rent: monthlyDollars(rent),
  href,
});

/**
 *
 * HERE BE HTML EVENTS
 *
 **/

extpay.getUser().then(user => {
  console.log(user);
  if (user.trialStartedAt) {
    userPaid = true;
    profileButton.innerHTML = "See Profile";

    chrome.tabs.query({ active: true, currentWindow: true }).then((r) => {
      let [tab] = r;
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: scrapeZillowElements,
      }, handleZillowResults);

      copyButton.innerHTML = copyMessage;
    });
  } else {
    extpay.openTrialPage();
  }
}).catch(err => {
   console.log("Error fetching data :( Check that your ExtensionPay id is correct and you're connected to the internet");
});



copyButton.addEventListener("click", () => {
  handleCopy();
  copyButton.innerHTML = copiedMessage;
});

profileButton.addEventListener("click", () => {
  openPaymentPage();
});

// handle offer slider change
offerSliderElement.addEventListener("change", (e) => {
  offer = toInt(e.target.value);
  cashOnCash = doCOC(offer, monthlyTaxes, rent);
  cashOnCashElement.innerHTML = cashOnCash;
  const percentageDiff = percentageDifference(offer, purchasePrice);
  const offerString = dollars(offer);
  offerElement.innerHTML = `${offerString} (${percentageDiff}%)`;
  copyButton.innerHTML = copyMessage;
});

// handle rent slider change
rentSliderElement.addEventListener("change", (e) => {
  rent = toInt(e.target.value);
  cashOnCash = doCOC(offer, monthlyTaxes, rent);
  cashOnCashElement.innerHTML = cashOnCash;
  const percentageDiff = percentageDifference(rent, monthlyRent);
  rentElement.innerHTML = `${monthlyDollars(rent)} (${percentageDiff}%)`;
  copyButton.innerHTML = copyMessage;
});

rentInputElement.addEventListener("input", (e) => {
  rent = toInt(e.target.value);
  cashOnCash = doCOC(offer, monthlyTaxes, rent);
  cashOnCashElement.innerHTML = cashOnCash;
  copyButton.innerHTML = copyMessage;
});

const openPaymentPage = () => {
  extpay.openPaymentPage();
}

// turn anything with numbers into just a regular integer
const toInt = (n) => parseInt(n.split("").filter(a => a.match(/[0-9.]/g)).join(""));

const monthlyDollars = (n) => isNaN(n) ? 'N/A' : `$${n.toLocaleString()}/mo`;

const dollars = (n) => isNaN(n) ? 'N/A' : `$${n.toLocaleString()}`;

const percentageDifference = (x, y) => {
  const ratio = x / y;
  const percentage = Math.round(100 * ratio);
  const difference = percentage - 100;
  return difference <= 0 ? difference : `+${difference}`;
}

// generate a url that will send us to a google search
const googleSearchQuery = (s) => `https://www.google.com/search?q=${encodeURIComponent(s)}`;

/**
 *
 * HERE BE MATHS
 *
 **/

// COC = [(Monthly Cash flow (MCF) x 12) / Initial Total Investment (ITI)] x 100
const CashOnCash = (monthlyCashFlow, initialTotalInvestment) => (((monthlyCashFlow * 12) / initialTotalInvestment) * 100);

// ITI = 29% of Purchase Price(PP)(Which comes from Zillow)
const InitialTotalInvestment = (purchasePrice) => ((configurationFields['down-payment'].value + configurationFields["closing-cost"].value) * purchasePrice);

// MCF = Monthly Gross Income(MGI)(comes from Zillow) - Monthly Expenses - Monthly Debt Service
const MonthlyCashFlow = (monthlyGrossIncome, monthlyExpenses, monthlyDebtService) => (monthlyGrossIncome - (monthlyGrossIncome * configurationFields.vacancy.value) - monthlyExpenses - monthlyDebtService);

// Monthly Expenses = Taxes(comes from Zillow) + Insurance($60) + Vacancy(5% of MGI) + Property Management(4% of MGI)+ Capex(5% of MGI) + Repairs(5% of MGI) + Utilities($0)
const MonthlyExpenses = (taxes, monthlyGrossIncome) => {
  const income = monthlyGrossIncome  - (configurationFields.vacancy.value * monthlyGrossIncome);

  const insurance = configurationFields.insurance.value;
  const propertyManagement = configurationFields.property.value * income;
  const capex = configurationFields.capex.value * income;
  const repairs = configurationFields.repairs.value * income;
  const utilities = configurationFields.utilities.value;

  return taxes + insurance + propertyManagement + capex + repairs + utilities;
}

// Monthly Debt Service = .61 % of Loan
const MonthlyDebtService = (loan) => {
  // i
  const monthlyInterest = configurationFields["loan-interest"].value / 12;
  // n
  const months = configurationFields["loan-months"].value;
  // (1 + i)^-n
  const exponent = Math.pow(1 + monthlyInterest, -months);
  // 1 - (1 + i)^-n
  const denominator = 1 - exponent;
  // p * (i / (1 - (1 + i)^-n))
  return loan * (monthlyInterest / denominator);
}

// Loan = 75% of Purchase Price(comes from Zillow)
const Loan = (purchasePrice) => ((1 - configurationFields['down-payment'].value) * purchasePrice);

const calculateCOC = (purchasePrice, taxes, monthlyGrossIncome) => {
  const loan = Loan(purchasePrice);
  const monthlyDebtService = MonthlyDebtService(loan);
  const monthlyExpenses = MonthlyExpenses(taxes, monthlyGrossIncome);
  const initialTotalInvestment = InitialTotalInvestment(purchasePrice);

  const monthlyCashFlow = MonthlyCashFlow(monthlyGrossIncome, monthlyExpenses, monthlyDebtService);
  const cashOnCash = CashOnCash(monthlyCashFlow, initialTotalInvestment);

  return cashOnCash;
}

// change the color of the coc data field
const setCocClass = (cashOnCash) => {
  if ( cashOnCash > 0 ) {
    cashOnCashElement.className = "success";
  } else {
    cashOnCashElement.className = "error";
  }
}

// run calcualtion, set the COC color, return the value
const doCOC = (purchasePrice, monthlyTaxes, monthlyRent) => {
  const err = (m) => {
    setCocClass(-1);
    return `&uarr;Provide ${m}!`;
  };

  if ( isNaN(purchasePrice) ) {
    return err("price");
  } else if ( isNaN(monthlyTaxes) ) {
    return err("taxes");
  } else if ( isNaN(monthlyRent) ) {
    return err("rent");
  }

  if (purchasePrice && monthlyTaxes && monthlyRent) {
    const coc = calculateCOC(purchasePrice, monthlyTaxes, monthlyRent);
    const cocString = coc.toLocaleString() + "%";
    setCocClass(coc);
    return cocString;
  } else {
    return 'N/A';
  }
}

// copy all of the data fields to your clipboard
const handleCopy = () => {
  const calculations = getDataFields();
  const toCsv = (obj) => Object.keys(obj).reduce((acc, key) => `${acc}${obj[key]}${csvSeparator}`, "");
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

// this will receive an object
// it executes in the DOM of the popup
const handleZillowResults = (r) => {
  const results = r[0].result;

  // destructure the results
  purchasePrice = toInt(results.purchasePrice);
  monthlyTaxes = toInt(results.monthlyTaxes);
  monthlyRent = toInt(results.monthlyRent);
  address = results.address;
  estimatePrice = toInt(results.estimatePrice);
  bedsBath = results.bedsBath;
  daysOnMarket = results.daysOnMarket;
  href = results.href;

  // set these for working calculations
  offer = isNaN(purchasePrice) ? estimatePrice : purchasePrice;
  rent = monthlyRent;

  // major calculation
  cashOnCash = doCOC(offer, monthlyTaxes, rent);

  let redfinSearch = googleSearchQuery(address + " redfin");
  let realtorSearch = googleSearchQuery(address + " realtor");

  // update the ui
  purchasePriceElement.innerHTML = dollars(purchasePrice);
  estimatePriceElement.innerHTML = dollars(estimatePrice);
  monthlyTaxesElement.innerHTML = monthlyDollars(monthlyTaxes);
  monthlyRentElement.innerHTML = monthlyDollars(monthlyRent);
  daysOnMarketElement.innerHTML = daysOnMarket;
  addressElement.innerHTML = address;
  specsElement.innerHTML = bedsBath;

  cashOnCashElement.innerHTML = cashOnCash;

  redfinLinkElement.href = redfinSearch;
  realtorLinkElement.href = realtorSearch;

  offerElement.innerHTML = dollars(offer);
  offerSliderElement.min = offer * (1 - offerPercentRange);
  offerSliderElement.max = offer * (1 + offerPercentRange);
  offerSliderElement.value = offer;

  if ( isNaN(rent) )  {
    rentError = true;
    rentInputElement.className = "";
    rentElement.className = "hidden";
    rentSliderContainerElement.className = "hidden";
  } else {
    rentElement.innerHTML = monthlyDollars(rent);
    rentSliderElement.min = rent * (1 - rentPercentRange);
    rentSliderElement.max = rent * (1 + rentPercentRange);
    rentSliderElement.value = rent;
  }
}

// The body of this function will be execuetd as a content script inside the
// current page
const scrapeZillowElements = () => {
  const purchasePriceSelectors = [
    "#details-page-container > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > div.ds-summary-row-container > div > div > span > span > span",
    "#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > div.ds-summary-row-container > div > div > span > span > span",
    "#ds-data-view > div.ds-chip-mobile.ds-chip-mobile-open > div.ds-home-details-chip > div.ds-summary-row-container > div > div > span > span > span"

  ];

  const monthlyTaxesSelectors = [
    "#label-property-tax > div > span",
    "#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > div.ds-mortgage-row > div > span:nth-child(2)",
  ];

  const monthlyRentSelectors = [
    "#ds-rental-home-values > div > div.ds-expandable-card-section-default-padding > div > div > div > span",
    "#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > p > span:nth-child(3) > span.Text-c11n-8-48-0__sc-aiai24-0.fGOvOB",
  ]

  const addressSelectors = [
    "#ds-chip-property-address"
  ];

  const bedsBathSelectors = [
    "#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.FNtGJ.ds-chip > div > div.ds-summary-row-container > div > div > div > span"
  ]

  const estimatePriceSelectors = [
    "#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.FNtGJ.ds-chip > div > div.sc-pbvBv.hmDgXL.ds-chip-removable-content > p > span.sc-pRhbc.ePDsLp > span:nth-child(2) > span",
    "#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.FNtGJ.ds-chip > div > div.hdp__qf5kuj-12.ivFlOG.ds-chip-removable-content > p > span.hdp__qf5kuj-9.iuGlLh > span:nth-child(2) > span",
    "#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.FNtGJ.ds-chip > div > div.sc-prqHV.gZvZRy.ds-chip-removable-content > p > span.sc-oTzDS.fotNMM > span:nth-child(2) > span",
    "#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > p > span:nth-child(2) > span:nth-child(2) > span",
  ]

  const daysOnMarketSelectors = [
    "#ds-data-view > ul > li:nth-child(3) > div > div > div.ds-expandable-card-section-default-padding > div.hdp__sc-1f3vlqq-0.jRmwCk > div:nth-child(1) > div.Text-c11n-8-48-0__sc-aiai24-0.fGOvOB",
    "#ds-data-view > ul > li:nth-child(3) > div > div > div.ds-expandable-card-section-default-padding > div.sc-ptScb.hfNvvF > div:nth-child(1) > div.Text-c11n-8-48-0__sc-aiai24-0.fGOvOB",
    "#ds-data-view > ul > li:nth-child(3) > div > div > div.ds-expandable-card-section-default-padding > div.sc-qWfkp.eXNcZI > div:nth-child(1) > div.Text-c11n-8-48-0__sc-aiai24-0.fGOvOB",
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
    const href = document.location.href;

    const results = {
      purchasePrice,
      monthlyTaxes,
      monthlyRent,
      address,
      estimatePrice,
      bedsBath,
      daysOnMarket,
      href,
    }

    return (results);

  } else {
    alert("Sorry, not on Zillow!");
  }
}
