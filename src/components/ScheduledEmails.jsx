import { h, Fragment } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import axios from 'axios'

const formatNumber = (number) => (number ? `$${number.toLocaleString()}` : '$X')

export default function ScheduledEmails(props) {
  const { backendUrl, user, externalReload } = props

  const [errorMessage, setErrorMessage] = useState('')
  const [reloadSelf, setReloadSelf] = useState('')
  const [scheduledEmails, setScheduledEmails] = useState([])
  const [selectedMarket, setSelectedMarket] = useState(0)

  useEffect(() => {
    if (user) {
      axios
        .get(`${backendUrl}/api/emailers`)
        .then((r) => {
          setScheduledEmails(r.data)
        })
        .catch((e) => {
          setErrorMessage(e.response.data.message)
        })
    }
  }, [user, reloadSelf, externalReload])

  const scheduledEmailList = scheduledEmails.map((scheduledEmail, i) => {
    return (
      <div
        onClick={() => setSelectedMarket(i)}
        key={i}
        className="personal-margin-bottom padded gray"
      >
        <h5>{scheduledEmail.notes}</h5>
        <h6>{scheduledEmail.search_param}</h6>
      </div>
    )
  })

  const selectedMarketHtml = scheduledEmails.length ? (
    <div className="personal-margin-left">
      <p>Location: {scheduledEmails[selectedMarket].search_param}</p>
      <p>
        Price Range: {formatNumber(scheduledEmails[selectedMarket].min_price)}-
        {formatNumber(scheduledEmails[selectedMarket].max_price)}
      </p>
      <p>
        Specs: {scheduledEmails[selectedMarket].no_bedrooms} Beds |{' '}
        {scheduledEmails[selectedMarket].no_bathrooms} Baths
      </p>
      <p>Email Notifications: Enabled</p>
      <button
        className="ostrich-button"
        onClick={() => {
          axios
            .delete(
              `${backendUrl}/api/emailers/${scheduledEmails[selectedMarket].id}`
            )
            .then((r) => {
              setReloadSelf(Math.random())
            })
            .catch((e) => {
              setSearchResults([])
              setErrorMessage(e.response.data.message)
            })
        }}
      >
        Delete
      </button>
    </div>
  ) : (
    <h4>Loading Markets...</h4>
  )

  return (
    <Fragment>
      <h5>Your Target Markets</h5>
      <div className="flex personal-space-top-double">
        <div className='personal-space-right'>{scheduledEmailList}</div>
        {selectedMarketHtml}
      </div>
      <p className="error">{errorMessage}</p>
    </Fragment>
  )
}
