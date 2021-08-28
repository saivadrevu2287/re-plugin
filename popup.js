// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");

// When the button is clicked, inject doCalc into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: doCalc,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function doCalc() {
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

    alert("cost: "+ cost + "; monthly" + monthly + "; rental" + rental);
  } else {
    alert("Sorry, not on Zillow!");
  }
}
