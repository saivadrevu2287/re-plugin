/**
 *
 * HERE BE GLOBALS
 *
 **/

const extpay = ExtPay('ostrich-plugin')

const enableGA = false;
const enablePay = false;
const enableLogging = false;

const log = (m) => enableLogging && console.log(m)

var _gaq = _gaq || [];
if ( enableGA )  {
  _gaq.push(['_setAccount', 'UA-208478356-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
}

function track(e) {
  enableGA && _gaq.push(['_trackEvent', e.target.id, 'clicked']);
};

const buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', track);
}

const inputs = document.querySelectorAll('input');
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('change', track);
}

const links = document.querySelectorAll('a');
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', track);
}

// buttons
const copyButton = document.getElementById("copy-button");
const profileButton = document.getElementById("profile-button");

// data fields
const estimatePriceElement = document.getElementById("estimate-price");
const daysOnMarketElement = document.getElementById("days-on-market");
const addressElement = document.getElementById("address");
const specsElement = document.getElementById("specs");
const cashOnCashElement = document.getElementById("cash-on-cash");

// links to other tabs
const redfinLinkElement = document.getElementById("redfin-link");
const realtorLinkElement = document.getElementById("realtor-link");

const rentInputElement = document.getElementById("rent-input");
const monthlyTaxesInputElement = document.getElementById("monthly-taxes-input");
const priceInputElement = document.getElementById("price-input");

const dataContainer = document.getElementById("data-container");
const formContainer = document.getElementById("form-container");
const formSubmitButton = document.getElementById("submit-form");
const emailInput = document.getElementById("email-input");

const messageElement = document.getElementById("message");

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

// global to hold our configs outside of the below callback
let configurationFields;


/**
 *
 * CONSTANTS
 *
 **/
const copiedMessage = "Copied to Clipboard!";
const copyMessage = "Copy Data Fields";
const csvSeparator = "\t";

// dynamically set the range of the sliders
// const offerPercentRange = 0.20;
// const rentPercentRange = 0.20;
//
// offerSliderMinElement.innerHTML = `-${100*offerPercentRange}%`;
// offerSliderMaxElement.innerHTML = `+${100*offerPercentRange}%`;
// rentSliderMinElement.innerHTML = `-${100*rentPercentRange}%`;
// rentSliderMaxElement.innerHTML = `+${100*rentPercentRange}%`;

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
  href,
});

/**
 *
 * HERE BE HTML EVENTS
 *
 **/

const handleExtpayUser = (user) => {
  console.log(user);
  if (user.trialStartedAt) {
    userPaid = true;
    profileButton.innerHTML = "See Profile";
    profileButton.className = "link-button";
    runCalculations();
  } else {
    extpay.openTrialPage();
  }
}

const runCalculations = () => {
  chrome.tabs.query({ active: true, currentWindow: true }).then((r) => {
    let [tab] = r;
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: scrapeZillowElements,
    }, handleZillowResults);

    copyButton.innerHTML = copyMessage;
  });
}

chrome.storage.sync.get("configurationFields", (data) => {
  configurationFields = data.configurationFields;
  if ( enablePay )  {
    extpay.getUser()
      .then(handleExtpayUser)
      .catch(err => {
         console.log("Error fetching data :( Check that your ExtensionPay id is correct and you're connected to the internet");
      });
  } else {
    if ( configurationFields.isLoggedIn ) {
      formContainer.className = "hidden";
      runCalculations();
    } else {
      dataContainer.className = "hidden";
      formSubmitButton.addEventListener("click", () => {
        if ( emailInput.value.match(/[^@]+@[^.]+\..+/) ) {
          messageElement.innerHTML = ""
          configurationFields.isLoggedIn = true;
          formContainer.className = "hidden";
          dataContainer.className = "";
          runCalculations();
          chrome.storage.sync.set({ configurationFields });
        } else {
          messageElement.innerHTML = "Invalid Email..."
        }
      });
    }
  }
})

copyButton.addEventListener("click", () => {
  handleCopy();
  copyButton.innerHTML = copiedMessage;
});

profileButton.addEventListener("click", () => {
  openPaymentPage();
});

rentInputElement.addEventListener("input", (e) => {
  monthlyRent = toInt(e.target.value);
  cashOnCash = doCOC(purchasePrice, monthlyTaxes, monthlyRent);
  cashOnCashElement.innerHTML = cashOnCash;
  copyButton.innerHTML = copyMessage;
});

monthlyTaxesInputElement.addEventListener("input", (e) => {
  monthlyTaxes = toInt(e.target.value);
  cashOnCash = doCOC(purchasePrice, monthlyTaxes, monthlyRent);
  cashOnCashElement.innerHTML = cashOnCash;
  copyButton.innerHTML = copyMessage;
});

priceInputElement.addEventListener("input", (e) => {
  purchasePrice = toInt(e.target.value);
  cashOnCash = doCOC(purchasePrice, monthlyTaxes, monthlyRent);
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

  log({
    m: "MonthlyExpenses",
    income,
    insurance,
    propertyManagement,
    capex,
    repairs,
    utilities,
  });

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
  const monthlyExpenses = MonthlyExpenses(taxes, monthlyGrossIncome) + configurationFields['additional-monthly-expenses'].value;
  const initialTotalInvestment = InitialTotalInvestment(purchasePrice);

  const monthlyCashFlow = MonthlyCashFlow(monthlyGrossIncome, monthlyExpenses, monthlyDebtService);
  const cashOnCash = CashOnCash(monthlyCashFlow, initialTotalInvestment);

  log({
    m: "calculateCOC",
    loan,
    monthlyDebtService,
    monthlyExpenses,
    initialTotalInvestment,
    monthlyCashFlow,
    cashOnCash,
  });

  return {cashOnCash, monthlyExpenses};
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
  log({
    m: "doCOC",
    purchasePrice,
    monthlyTaxes,
    monthlyRent
  });

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
    const {cashOnCash, monthlyExpenses} = calculateCOC(purchasePrice, monthlyTaxes, monthlyRent);
    const cocString = cashOnCash.toLocaleString() + "%";
    // monthlyExpensesElement.innerHTML = monthlyDollars(monthlyExpenses);
    setCocClass(cashOnCash);
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
      log({ m: "handleCopy", text, });
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
  log(results);
  console.log(results);
  // destructure the results
  address = results.address;
  estimatePrice = toInt(results.estimatePrice);
  bedsBath = results.bedsBath;
  daysOnMarket = results.daysOnMarket;
  href = results.href;
  purchasePrice = toInt(results.purchasePrice);
  monthlyTaxes = toInt(results.monthlyTaxes);
  monthlyRent = toInt(results.monthlyRent);

  // major calculation
  cashOnCash = doCOC(purchasePrice, monthlyTaxes, monthlyRent);

  let redfinSearch = googleSearchQuery(address + " redfin");
  let realtorSearch = googleSearchQuery(address + " realtor");

  // update the ui
  estimatePriceElement.innerHTML = dollars(estimatePrice);
  daysOnMarketElement.innerHTML = daysOnMarket;
  addressElement.innerHTML = address;
  specsElement.innerHTML = bedsBath;

  cashOnCashElement.innerHTML = cashOnCash;

  redfinLinkElement.href = redfinSearch;
  realtorLinkElement.href = realtorSearch;

  if ( isNaN(monthlyRent) )  {
    rentInputElement.value = "";
  } else {
    rentInputElement.value = monthlyRent;
  }

  if ( isNaN(monthlyTaxes) )  {
    monthlyTaxesInputElement.value = "";
  } else {
    monthlyTaxesInputElement.value = monthlyTaxes;
  }

  if ( isNaN(purchasePrice) )  {
    priceInputElement.value = "";
  } else {
    priceInputElement.value = purchasePrice;
  }
}

// The body of this function will be execuetd as a content script inside the
// current page
const scrapeZillowElements = () => {
  const purchasePriceSelectors = [
    "#details-page-container > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > div.ds-summary-row-container > div > div > span > span > span",
    "#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > div.ds-summary-row-container > div > div > span > span > span",
    "#ds-data-view > div.ds-chip-mobile.ds-chip-mobile-open > div.ds-home-details-chip > div.ds-summary-row-container > div > div > span > span > span",
    "#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.jRNYtf.ds-chip > div > div.Spacer-c11n-8-53-2__sc-17suqs2-0.ibzEYG > span.Text-c11n-8-53-2__sc-aiai24-0.iyRhoe",
  ];

  const monthlyTaxesSelectors = [
    "#label-property-tax > div > span",
    "#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > div.ds-mortgage-row > div > span:nth-child(2)",
    "#ds-data-view > ul > li:nth-child(8) > div.hdp__sc-1j01zad-0.cRaELx > div.hdp__sc-1j01zad-1.kuboKK > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2) > span",
  ];

  const monthlyRentSelectors = [
    "#ds-rental-home-values > div > div.ds-expandable-card-section-default-padding > div > div > div > span",
    "#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > p > span:nth-child(3) > span.Text-c11n-8-48-0__sc-aiai24-0.fGOvOB",
    "#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.ds-chip > div > div.hdp__sc-11h2l6b-2.kMgzZt.ds-chip-removable-content > p > span.hdp__sc-18p00c6-0.bNiRNy > span.Text-c11n-8-53-2__sc-aiai24-0.duChdW",
    "#ds-rental-home-values > div > div.hdp__sc-1j01zad-1.kuboKK > div > div > div > span",
  ]

  const addressSelectors = [
    "#ds-chip-property-address"
  ];

  const bedsBathSelectors = [
    "#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.FNtGJ.ds-chip > div > div.ds-summary-row-container > div > div > div > span",
    "#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.ds-chip > div > div.ds-summary-row-container > div > div > div > span"
  ]

  const estimatePriceSelectors = [
    "#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.FNtGJ.ds-chip > div > div.sc-pbvBv.hmDgXL.ds-chip-removable-content > p > span.sc-pRhbc.ePDsLp > span:nth-child(2) > span",
    "#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.FNtGJ.ds-chip > div > div.hdp__qf5kuj-12.ivFlOG.ds-chip-removable-content > p > span.hdp__qf5kuj-9.iuGlLh > span:nth-child(2) > span",
    "#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.FNtGJ.ds-chip > div > div.sc-prqHV.gZvZRy.ds-chip-removable-content > p > span.sc-oTzDS.fotNMM > span:nth-child(2) > span",
    "#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > p > span:nth-child(2) > span:nth-child(2) > span",
    "#ds-data-view > div.ds-chip-mobile.ds-chip-mobile-open > div.ds-home-details-chip > div.hdp__sc-11h2l6b-2.kMgzZt.ds-chip-removable-content > p > span.hdp__sc-18p00c6-0.bNiRNy > span.Text-c11n-8-53-2__sc-aiai24-0.duChdW",
    "#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.ds-chip > div > div.hdp__sc-11h2l6b-2.kMgzZt.ds-chip-removable-content > p > span.hdp__sc-18p00c6-0.bNiRNy > span:nth-child(2) > span",
  ]

  const daysOnMarketSelectors = [
    "#ds-data-view > ul > li:nth-child(3) > div > div > div.ds-expandable-card-section-default-padding > div.hdp__sc-1f3vlqq-0.jRmwCk > div:nth-child(1) > div.Text-c11n-8-48-0__sc-aiai24-0.fGOvOB",
    "#ds-data-view > ul > li:nth-child(3) > div > div > div.ds-expandable-card-section-default-padding > div.sc-ptScb.hfNvvF > div:nth-child(1) > div.Text-c11n-8-48-0__sc-aiai24-0.fGOvOB",
    "#ds-data-view > ul > li:nth-child(3) > div > div > div.ds-expandable-card-section-default-padding > div.sc-qWfkp.eXNcZI > div:nth-child(1) > div.Text-c11n-8-48-0__sc-aiai24-0.fGOvOB",
    "#ds-data-view > ul > li:nth-child(2) > div.ds-overview > div:nth-child(3) > div.hdp__sc-1j01zad-2.fAXLDd > div.hdp__sc-qe1dn6-0.jAEoY > div:nth-child(1) > div.Text-c11n-8-53-2__sc-aiai24-0.duChdW",
    "#ds-data-view > ul > li:nth-child(3) > div.ds-overview > div:nth-child(3) > div.hdp__sc-1j01zad-1.kuboKK > div.hdp__sc-qe1dn6-0.jAEoY > div:nth-child(1) > div.Text-c11n-8-53-2__sc-aiai24-0.duChdW",
    "#ds-data-view > ul > li:nth-child(3) > div:nth-child(2) > div > div:nth-child(3) > div.hdp__sc-1j01zad-1.kuboKK > div.hdp__sc-qe1dn6-0.jAEoY > div:nth-child(1) > div.Text-c11n-8-53-2__sc-aiai24-0.duChdW",
  ]

  const scrapeElement = (selectors, name) => {
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

    console.log({
      m: (`select ${name}`),
      element,
      selector: selectors[i]
    });

    return element;
  }

  const flattenHtml = (el) => {
    return el.replace(/<\/?[^>]*>/g, ' ').replace(/&[^;]*;/, ' ');
  }

  const host = window.location.host;
  const m = host == "www.zillow.com";

  if (m) {
    const purchasePrice = scrapeElement(purchasePriceSelectors, "purchasePrice");
    const monthlyTaxes = scrapeElement(monthlyTaxesSelectors, "monthlyTaxes");
    const monthlyRent = scrapeElement(monthlyRentSelectors, "monthlyRent");
    const address = flattenHtml(scrapeElement(addressSelectors, "address"));
    const estimatePrice = flattenHtml(scrapeElement(estimatePriceSelectors, "estimatePrice"));
    const bedsBath = flattenHtml(scrapeElement(bedsBathSelectors, "bedsBath"));
    const daysOnMarket = scrapeElement(daysOnMarketSelectors, "daysOnMarket");
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

    console.log({
      m: "scrapeElements",
      ...results
    });
    return results;

  } else {
    alert("Sorry, not on Zillow!");
  }
}
