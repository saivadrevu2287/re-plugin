import { Fragment, h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { runScraper } from '../subroutines/scraper'
import { toInt, calculateCOC } from '../subroutines/math'
import { handleCopy, dollars, monthlyDollars } from '../subroutines/utils'

const eliminateEvent = (e) => e.target.value
const tabSeparator = '\t'
const freeUses = 10

export default function ListingData(props) {
  const { configurationFields, user, webappUrl } = props

  const [price, setPrice] = useState()
  const [priceEstimate, setPriceEstimate] = useState()
  const [taxes, setTaxes] = useState()
  const [rentEstimate, setRentEstimate] = useState()
  const [daysOnMarket, setDaysOnMarket] = useState()
  const [address, setAddress] = useState()
  const [specs, setSpecs] = useState()
  const [href, setHref] = useState()
  const [hasBeenCopied, setHasBeenCopied] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  useEffect(() => {
    console.log('Running scraper!')
    runScraper((res) => {
      if (!res) {
        setErrorMessage(
          'Cannot pull rental details from site. Use zillow.com for the extension to work.'
        )
        return
      }

      const results = res[0].result
      console.log(results)
      // destructure the results
      setAddress(results.address)
      setPriceEstimate(toInt(results.estimatePrice))
      setSpecs(results.bedsBath)
      setDaysOnMarket(results.daysOnMarket)
      setHref(results.href)
      setPrice(toInt(results.purchasePrice))
      setTaxes(toInt(results.monthlyTaxes))
      setRentEstimate(toInt(results.monthlyRent))

      if (
        !toInt(results.purchasePrice) &&
        !toInt(results.monthlyTaxes) &&
        !toInt(results.monthlyRent)
      ) {
        console.log({ price, taxes, rentEstimate })
        return
      }

      const usedAlready = configurationFields.uses.filter(
        (d) => d == results.href
      ).length
      if (!usedAlready) {
        configurationFields.uses.push(results.href)
        chrome.storage.sync.set({ configurationFields: configurationFields })
      }
    })
  }, [])

  if (!configurationFields) {
    return <p>Loading data</p>
  }

  const remainingUses = freeUses - configurationFields.uses.length

  const { cashOnCash } = calculateCOC(
    configurationFields,
    price,
    taxes,
    rentEstimate
  )
  console.log({ cashOnCash, price, taxes, rentEstimate, m: 'Calculating CoC' })

  const getDataFields = () => ({
    purchasePrice: dollars(price),
    monthlyTaxes: monthlyDollars(taxes),
    monthlyRent: monthlyDollars(rentEstimate),
    address,
    estimatePrice: dollars(priceEstimate),
    bedsBath: specs,
    daysOnMarket,
    cashOnCash,
    href,
  })

  const handleUpdate = (field) => {
    let stateFunction
    if (field == 'price') {
      stateFunction = setPrice
    } else if (field == 'taxes') {
      stateFunction = setTaxes
    } else if (field == 'rent') {
      stateFunction = setRentEstimate
    }

    return (e) => {
      setHasBeenCopied(false)
      stateFunction(toInt(eliminateEvent(e)))
    }
  }

  const handleCopyClick = () => {
    setHasBeenCopied(true)
    handleCopy(getDataFields(), tabSeparator)
  }

  const redfinLink = `https://www.google.com/search?q=${encodeURIComponent(
    address + ' redfin'
  )}`

  const realtorLink = `https://www.google.com/search?q=${encodeURIComponent(
    address + ' realtor'
  )}`

  const cocErrorState = !cashOnCash ? '' : cashOnCash > 0 ? 'success' : 'error'
  const cashOnCashClass = `cash-on-cash ${cocErrorState}`
  const cashOnCashValue = !cashOnCash ? 0 : cashOnCash
  const cashOnCashString = cashOnCashValue.toLocaleString() + '%'

  const infoLink =
    'https://rehacks.io/blog-new/a-chrome-extension-to-analyze-roi-of-a-rental-property-in-5-sec'
  const feedbackLink =
    'https://docs.google.com/forms/d/1E6h7AbJZxitYnMuT1J6eK-x9AA5CpYHE2Dd3qYghZUA/edit'

  const details = (
    <Fragment>
      <div className="thin-container ostrich-container">
        <div class="flex between centered-items personal-space-small-bottom">
          <label className="label align-right">Price:</label>
          <div className="input-container align-left">
            <input
              type="number"
              className="input"
              placeholder=""
              value={price}
              onInput={handleUpdate('price')}
            />
            $
          </div>
        </div>
        <div class="flex between centered-items personal-space-small-bottom">
          <label className="label align-right">Estimate:</label>
          <span className="input-container align-left">{priceEstimate}</span>
        </div>
        <div class="flex between centered-items personal-space-small-bottom">
          <label className="label align-right">Taxes:</label>
          <div className="input-container align-left">
            <input
              type="number"
              className="input"
              placeholder=""
              value={taxes}
              onInput={handleUpdate('taxes')}
            />
            $/mo
          </div>
        </div>
        <div class="flex between centered-items personal-space-small-bottom">
          <label className="label align-right">Rent Estimate:</label>
          <div className="input-container align-left">
            <input
              className="input"
              type="number"
              placeholder=""
              value={!rentEstimate ? 'N/A' : rentEstimate}
              onInput={handleUpdate('rent')}
            />
            $/mo
          </div>
        </div>
        <div class="flex between centered-items personal-space-small-bottom">
          <label className="label align-right">Days On Market:</label>
          <span className="input-container align-left">{daysOnMarket}</span>
        </div>
        <div class="flex between centered-items personal-space-small-bottom">
          <label className="label align-right">Address:</label>
          <span className="input-container align-left">{address}</span>
        </div>
        <div class="flex between centered-items personal-space-small-bottom">
          <label className="label align-right">Specs:</label>
          <span className="input-container align-left">{specs}</span>
        </div>
        <button
          className="link-button ostrich-button"
          onClick={handleCopyClick}
        >
          {hasBeenCopied ? 'Copied!' : 'Copy Data Fields'}
        </button>
      </div>
      <div className="bottom-half">
        <div className="flex centered-items between personal-space-bottom personal-space-top">
          <label className="label align-right">
            COC
            <a target="_blank" href={infoLink}>
              (?)
            </a>
            :
          </label>
          <span className={cashOnCashClass}>{cashOnCashString}</span>
        </div>
        <div className="flex around personal-space-bottom">
          <a target="_blank" className="link-button" href={redfinLink}>
            <button className="plain-button">To Redfin</button>
          </a>
          <a target="_blank" className="link-button" href={realtorLink}>
            <button className="plain-button">To Realtor</button>
          </a>
        </div>
      </div>
    </Fragment>
  )

  const jwtHash = configurationFields.jwt
    ? Object.keys(configurationFields.jwt)
        .map((key) => `${key}=${configurationFields.jwt[key]}`)
        .join('&')
    : ''

  let content

  if (!user) {
    content = (
      <p>
        Need to re-sync. Please log in to{' '}
        <a href="https://ostrich.so" target="_blank">
          Ostrich
        </a>
        .
      </p>
    )
  } else if (user.billing_id) {
    content = (
      <Fragment>
        {!errorMessage && details}
        {errorMessage}
        <p>
          {user.billing_id} Subscribed.{' '}
          <a target="_blank" href={`https://ostrich.so/payments.html`}>
            Change
          </a>
        </p>
      </Fragment>
    )
  } else if (remainingUses >= 0) {
    content = (
      <Fragment>
        <p>
          {remainingUses} of {freeUses} free uses remaining.
          <a target="_blank" href={webappUrl}>
            Upgrade
          </a>
        </p>
        {!errorMessage && details}
        {errorMessage}
      </Fragment>
    )
  } else {
    content = (
      <Fragment>
        <p>
          You are out of free uses. The free plan only allows for {freeUses}{' '}
          free uses a month
        </p>
        <a target="_blank" href={webappUrl}>
          Upgrade
        </a>
      </Fragment>
    )
  }

  return (
    <div className="align-center personal-space-top">
      <h6>COC Calculator</h6>
      {content}
      <div className="flex between full">
        <a className="value-large" target="_blank" href={feedbackLink}>
          <img alt="feeback" src="/feedback-8.png" style="width:20px" />
        </a>
        <a
          className="value-large"
          target="_blank"
          href="https://ostrch.notion.site/Ostrich-Extension-Tutorial-1c29f7df3db543c6b795c55f44ff9acb"
        >
          Tutorial
        </a>
      </div>
    </div>
  )
}
