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

  const logout = () => {}

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

  console.log({ price, taxes, rentEstimate })

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

  const cashOnCashClass = `cash-on-cash ${cashOnCash > 0 ? 'success' : 'error'}`

  const cashOnCashString = cashOnCash.toLocaleString() + '%'

  const infoLink =
    'https://rehacks.io/blog-new/a-chrome-extension-to-analyze-roi-of-a-rental-property-in-5-sec'
  const feedbackLink =
    'https://docs.google.com/forms/d/1E6h7AbJZxitYnMuT1J6eK-x9AA5CpYHE2Dd3qYghZUA/edit'

  return (
    <div className="align-center personal-space-top">
      <h5>COC Calculator</h5>
      <div className="thin-container ostrich-container">
        <div class="flex between centered-items personal-space-small-bottom">
          <label className="label align-right">Price:</label>
          <div className="input-container align-left">
            <input
              type="number"
              className="input"
              placeholder="Provide Price"
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
              placeholder="Provide Taxes"
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
              placeholder="Provide Rent"
              value={rentEstimate}
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
        <button className="link-button plain-button" onClick={handleCopyClick}>
          {hasBeenCopied ? 'Copied!' : 'Copy Data Fields'}
        </button>
      </div>
      <div className="bottom-half">
        <div className="flex centered-items between personal-space-bottom personal-space-top">
          <label className="label align-right">
            Cash On Cash
            <a target="_blank" href={infoLink}>
              (?)
            </a>
            :
          </label>
          <span className={cashOnCashClass}>{cashOnCashString}</span>
        </div>
        <div className="flex around personal-space-bottom">
          <a target="_blank" className="link-button" href={redfinLink}>
            <button className="ostrich-button">
              To Redfin
            </button>
          </a>
          <a target="_blank" className="link-button" href={realtorLink}>
          <button className="ostrich-button">
            To Realtor
          </button>
        </a>
        </div>
          <a className="value-large" target="_blank" href={feedbackLink}>
            Provide Feedback!
          </a>
      </div>
    </div>
  )
}
