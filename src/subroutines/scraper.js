export const runScraper = (resultsHandler) => {
  console.log('getting tab!', scrapeZillowElements)
  chrome.tabs.query({ active: true, currentWindow: true }).then((r) => {
    let [tab] = r
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: scrapeZillowElements,
      },
      resultsHandler
    )
  })
}

const scrapeZillowElements = () => {
  console.log('runnin!')
  const purchasePriceSelectors = [
    '#details-page-container > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > div.ds-summary-row-container > div > div > span > span > span',
    '#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > div.ds-summary-row-container > div > div > span > span > span',
    '#ds-data-view > div.ds-chip-mobile.ds-chip-mobile-open > div.ds-home-details-chip > div.ds-summary-row-container > div > div > span > span > span',
    '#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.jRNYtf.ds-chip > div > div.Spacer-c11n-8-53-2__sc-17suqs2-0.ibzEYG > span.Text-c11n-8-53-2__sc-aiai24-0.iyRhoe',
    '#details-page-container > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div:nth-child(1) > div > div > div.hdp__sc-1s2b8ok-0.bhouud > div > span > span',
    '#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div:nth-child(1) > div > div > div.hdp__sc-1s2b8ok-0.bhouud > div > span > span',
  ]

  const monthlyTaxesSelectors = [
    '#label-property-tax > div > span',
    '#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > div.ds-mortgage-row > div > span:nth-child(2)',
    '#ds-data-view > ul > li:nth-child(8) > div.hdp__sc-1j01zad-0.cRaELx > div.hdp__sc-1j01zad-1.kuboKK > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2) > span',
    '#details-page-container > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.data-view-container > div > div > div > ul > li:nth-child(16) > div > div:nth-child(2) > div > div > div.hdp__sc-1j01zad-1.hmkpQE > div > div.sc-kLwhqv.hfyMFa > span.Text-c11n-8-65-2__sc-aiai24-0.eUxMDw',
  ]

  const monthlyRentSelectors = [
    '#ds-rental-home-values > div > div.ds-expandable-card-section-default-padding > div > div > div > span',
    '#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > p > span:nth-child(3) > span.Text-c11n-8-48-0__sc-aiai24-0.fGOvOB',
    '#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.ds-chip > div > div.hdp__sc-11h2l6b-2.kMgzZt.ds-chip-removable-content > p > span.hdp__sc-18p00c6-0.bNiRNy > span.Text-c11n-8-53-2__sc-aiai24-0.duChdW',
    '#ds-rental-home-values > div > div.hdp__sc-1j01zad-1.kuboKK > div > div > div > span',
    '#ds-rental-home-values > div > div.hdp__sc-1j01zad-1.hmkpQE > div > div > div > span',
  ]

  const addressSelectors = [
    '#ds-chip-property-address',
    '#details-page-container > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div:nth-child(1) > div > div > div.hdp__sc-riwk6j-0.tLBoE > h1',
    '#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div:nth-child(1) > div > div > div.hdp__sc-riwk6j-0.tLBoE > h1',
  ]

  const bedsBathSelectors = [
    '#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.FNtGJ.ds-chip > div > div.ds-summary-row-container > div > div > div > span',
    '#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.ds-chip > div > div.ds-summary-row-container > div > div > div > span',
    '#details-page-container > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div:nth-child(1) > div > div > div.hdp__sc-1s2b8ok-0.bhouud > div > div > span',
    '#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div:nth-child(1) > div > div > div.hdp__sc-1s2b8ok-0.bhouud > div > div > span',
  ]

  const estimatePriceSelectors = [
    '#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.FNtGJ.ds-chip > div > div.sc-pbvBv.hmDgXL.ds-chip-removable-content > p > span.sc-pRhbc.ePDsLp > span:nth-child(2) > span',
    '#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.FNtGJ.ds-chip > div > div.hdp__qf5kuj-12.ivFlOG.ds-chip-removable-content > p > span.hdp__qf5kuj-9.iuGlLh > span:nth-child(2) > span',
    '#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.FNtGJ.ds-chip > div > div.sc-prqHV.gZvZRy.ds-chip-removable-content > p > span.sc-oTzDS.fotNMM > span:nth-child(2) > span',
    '#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > p > span:nth-child(2) > span:nth-child(2) > span',
    '#ds-data-view > div.ds-chip-mobile.ds-chip-mobile-open > div.ds-home-details-chip > div.hdp__sc-11h2l6b-2.kMgzZt.ds-chip-removable-content > p > span.hdp__sc-18p00c6-0.bNiRNy > span.Text-c11n-8-53-2__sc-aiai24-0.duChdW',
    '#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.ds-chip > div > div.hdp__sc-11h2l6b-2.kMgzZt.ds-chip-removable-content > p > span.hdp__sc-18p00c6-0.bNiRNy > span:nth-child(2) > span',
    '#details-page-container > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div:nth-child(1) > div > div > div.hdp__sc-13r9t6h-0.ds-chip-removable-content > span > div.hdp__sc-j76ge-1.buRXbo > span > span > span',
  ]

  const daysOnMarketSelectors = [
    '#ds-data-view > ul > li:nth-child(3) > div > div > div.ds-expandable-card-section-default-padding > div.hdp__sc-1f3vlqq-0.jRmwCk > div:nth-child(1) > div.Text-c11n-8-48-0__sc-aiai24-0.fGOvOB',
    '#ds-data-view > ul > li:nth-child(3) > div > div > div.ds-expandable-card-section-default-padding > div.sc-ptScb.hfNvvF > div:nth-child(1) > div.Text-c11n-8-48-0__sc-aiai24-0.fGOvOB',
    '#ds-data-view > ul > li:nth-child(3) > div > div > div.ds-expandable-card-section-default-padding > div.sc-qWfkp.eXNcZI > div:nth-child(1) > div.Text-c11n-8-48-0__sc-aiai24-0.fGOvOB',
    '#ds-data-view > ul > li:nth-child(2) > div.ds-overview > div:nth-child(3) > div.hdp__sc-1j01zad-2.fAXLDd > div.hdp__sc-qe1dn6-0.jAEoY > div:nth-child(1) > div.Text-c11n-8-53-2__sc-aiai24-0.duChdW',
    '#ds-data-view > ul > li:nth-child(3) > div.ds-overview > div:nth-child(3) > div.hdp__sc-1j01zad-1.kuboKK > div.hdp__sc-qe1dn6-0.jAEoY > div:nth-child(1) > div.Text-c11n-8-53-2__sc-aiai24-0.duChdW',
    '#ds-data-view > ul > li:nth-child(3) > div:nth-child(2) > div > div:nth-child(3) > div.hdp__sc-1j01zad-1.kuboKK > div.hdp__sc-qe1dn6-0.jAEoY > div:nth-child(1) > div.Text-c11n-8-53-2__sc-aiai24-0.duChdW',
    '#ds-data-view > ul > li:nth-child(3) > div:nth-child(2) > div > div:nth-child(3) > div.hdp__sc-1j01zad-1.hmkpQE > div.hdp__sc-qe1dn6-0.kvrIiO > div:nth-child(1) > div.Text-c11n-8-62-5__sc-aiai24-0.eqgHgX',
    '#details-page-container > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.data-view-container > div > div > div > ul > li:nth-child(3) > div > div:nth-child(2) > div > div > div.hdp__sc-1j01zad-1.hmkpQE > div.Spacer-c11n-8-65-2__sc-17suqs2-0.gWKNeX > dl > dd:nth-child(2)',
  ]

  const scrapeElement = (selectors, name) => {
    let nill = 'N/A'

    let element = nill
    let i = 0
    while (element == nill && i < selectors.length) {
      try {
        element = document.querySelector(selectors[i]).innerHTML
      } catch (error) {
        element = nill
      }
      i += 1
    }

    console.log({
      m: `select ${name}`,
      element,
      selector: selectors[i],
    })

    return element
  }

  const flattenHtml = (el) => {
    return el.replace(/<\/?[^>]*>/g, ' ').replace(/&[^;]*;/, ' ')
  }

  const host = window.location.host

  const purchasePrice = flattenHtml(
    scrapeElement(purchasePriceSelectors, 'purchasePrice')
  )
  const monthlyTaxes = flattenHtml(
    scrapeElement(monthlyTaxesSelectors, 'monthlyTaxes')
  )
  const monthlyRent = flattenHtml(
    scrapeElement(monthlyRentSelectors, 'monthlyRent')
  )
  const address = flattenHtml(scrapeElement(addressSelectors, 'address'))
  const estimatePrice = flattenHtml(
    scrapeElement(estimatePriceSelectors, 'estimatePrice')
  )
  const bedsBath = flattenHtml(scrapeElement(bedsBathSelectors, 'bedsBath'))
  const daysOnMarket = flattenHtml(
    scrapeElement(daysOnMarketSelectors, 'daysOnMarket')
  )
  const href = document.location.href

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

  return results
}
