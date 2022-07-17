import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { runScraper } from '../subroutines/scraper'
import { toInt, calculateCOC } from '../subroutines/math'
import { handleCopy, dollars, monthlyDollars } from '../subroutines/utils'

const eliminateEvent = (e) => e.target.value
const tabSeparator = '\t'

export default function ListingData(props) {
  const { configurationFields } = props
  const [price, setPrice] = useState()
  const [priceEstimate, setPriceEstimate] = useState()
  const [taxes, setTaxes] = useState()
  const [rentEstimate, setRentEstimate] = useState()
  const [daysOnMarket, setDaysOnMarket] = useState()
  const [address, setAddress] = useState()
  const [specs, setSpecs] = useState()
  const [href, setHref] = useState()
  const [hasBeenCopied, setHasBeenCopied] = useState(false)

  useEffect(() => {
    console.log('Running scraper!')
    runScraper((res) => {
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
    })
  }, [])

  console.log({price,
    taxes,
    rentEstimate})

  const { cashOnCash } = calculateCOC(
    configurationFields,
    price,
    taxes,
    rentEstimate
  )

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
    let stateFunction;
    if ( field == 'price' ) {
      stateFunction = setPrice
    } else if ( field == 'taxes' ) {
      stateFunction = setTaxes
    } else if ( field ==  'rent' ) {
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

  return (
    <div id="data-container">
      <div class="top-half">
        <div class="link-container">
          <button id="profile-button" class="link-button hidden"></button>
        </div>
        <div class="data-field small-label">
          <label class="label-small">Price:</label>
          <div class="value-small">
            $
            <input
              class="input"
              type="number"
              id="price-input"
              placeholder="Provide Offer Price"
              value={price}
              onInput={handleUpdate('price')}
            />
          </div>
        </div>
        <div class="data-field small-label">
          <label class="label-small">Estimate:</label>
          <span class="value-small" id="estimate-price">
            {priceEstimate}
          </span>
        </div>
        <div class="data-field small-label">
          <label class="label-small">Taxes ($/mo):</label>
          <div class="value-small">
            $
            <input
              class="input"
              type="number"
              id="monthly-taxes-input"
              placeholder="Provide Monthly Taxes"
              value={taxes}
              onInput={handleUpdate('taxes')}
            />
          </div>
        </div>
        <div class="data-field small-label">
          <label class="label-small">Rent Estimate ($/mo):</label>
          <div class="value-small">
            $
            <input
              class="input"
              type="number"
              id="rent-input"
              placeholder="Provide Rent"
              value={rentEstimate}
              onInput={handleUpdate('rent')}
            />
          </div>
        </div>
        <div class="data-field small-label">
          <label class="label-small">Days On Market:</label>
          <span class="value-small" id="days-on-market">
            {daysOnMarket}
          </span>
        </div>
        <div class="data-field small-label">
          <label class="label-small">Address:</label>
          <span class="value-small" id="address">
            {address}
          </span>
        </div>
        <div class="data-field small-label">
          <label class="label-small">Specs:</label>
          <span class="value-small" id="specs">
            {specs}
          </span>
        </div>
      </div>
      <div class="bottom-half">
        <div class="data-field large-label">
          <label class="label-small">
            Cash On Cash
            <a
              target="_blank"
              href="https://rehacks.io/blog-new/a-chrome-extension-to-analyze-roi-of-a-rental-property-in-5-sec"
            >
              (?)
            </a>
            :
          </label>
          <span
            class={`value-small ${cashOnCash > 0 ? 'success' : 'error'}`}
            id="cash-on-cash"
          >
            {cashOnCash.toLocaleString() + '%'}
          </span>
        </div>
        <div class="action-row data-field">
          <span class="label-large big-finger">&#x261E;</span>
          <a
            target="_blank"
            id="redfin-link"
            class="value-large"
            href={`https://www.google.com/search?q=${encodeURIComponent(
              address + ' redfin'
            )}`}
          >
            To Redfin
          </a>
        </div>
        <div class="action-row data-field">
          <span class="label-large big-finger">&#x261E;</span>
          <a
            target="_blank"
            id="realtor-link"
            class="value-large"
            href={`https://www.google.com/search?q=${encodeURIComponent(
              address + ' realtor'
            )}`}
          >
            To Realtor
          </a>
        </div>
        <div class="action-row data-field">
          <span class="label-large big-finger">&#x261E;</span>
          <button id="copy-button" class="link-button value-large" onClick={handleCopyClick}>
            {hasBeenCopied ? "Copied!" : "Copy Data Fields"}
          </button>
        </div>
        <div class="action-row data-field">
          <span class="label-large big-finger">&#x261E;</span>
          <a
            class="value-large"
            target="_blank"
            href="https://docs.google.com/forms/d/1E6h7AbJZxitYnMuT1J6eK-x9AA5CpYHE2Dd3qYghZUA/edit"
          >
            Provide Feedback!
          </a>
        </div>
      </div>
    </div>
  )
}
