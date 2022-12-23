import { h, Fragment } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import axios from 'axios'
import LocationCard from './LocationCard'
import Modal from './Modal'
import CalculationFields from './CalculationFields'

import { updateEmailer, saveEmailer } from '../api/emailer'
import config from '../config'

const allowedMarkets = (billing_id) =>
  config.plans[billing_id ? billing_id : 'Tier 0'].locations

export default function EmailerDashboard(props) {
  const { backendUrl, user } = props

  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [scheduledEmails, setScheduledEmails] = useState([])
  const [selectedMarket, setSelectedMarket] = useState()
  const [loadingState, setLoadingState] = useState(false)
  const [maxSize, setMaxSize] = useState(0)

  useEffect(() => {
    if (user) {
      const newMaxSize = allowedMarkets(user.billing_id)
      setMaxSize(newMaxSize)

      axios
        .get(`${backendUrl}/api/emailers`)
        .then((r) => {
          r.data.sort((a, b) => b.id - a.id)
          setScheduledEmails(r.data)
          setLoadingState(false)
        })
        .catch((e) => {
          setLoadingState(false)
          if (e.response.data) {
            setErrorMessage(e.response.data.message)
          } else {
            setErrorMessage(e.message)
          }
        })
    }

    setLoadingState(true)
  }, [user, successMessage])

  const saveMessage =
    maxSize >= scheduledEmails.length
      ? 'Your current tier does not allow anymore locations: Please upgrade to receive emails as no emails will be sent for this location if you still add it.'
      : ''

  const formModal = (
    <Modal close={() => setShowModal(false)}>
      <CalculationFields
        scheduledEmail={scheduledEmails[selectedMarket]}
        saveMessage={saveMessage}
        handleSave={(emailer) =>
          selectedMarket == -1
            ? saveEmailer(
                backendUrl,
                emailer,
                (_) => {
                  setSuccessMessage('Saved Market, expect an email at 10am ET!')
                  setShowModal(false)
                },
                setErrorMessage
              )
            : updateEmailer(
                backendUrl,
                scheduledEmails[selectedMarket]
                  ? scheduledEmails[selectedMarket].id
                  : 0,
                emailer,
                (_) => {
                  setSuccessMessage('Updated Market!')
                  setShowModal(false)
                },
                setErrorMessage
              )
        }
      />
    </Modal>
  )

  const tierMessage =
    user && user.billing_id ? (
      <p>
        You are subscribed to {user.billing_id}: On this plan{' '}
        {maxSize == 1 ? '1 market is' : `${maxSize} markets are`} allowed.{' '}
        <a href={config.pricingPage}>Change plan here</a>.
      </p>
    ) : (
      <p>
        You are not subscribed!{' '}
        <a href={config.pricingPage}>Change plan here</a>.
      </p>
    )

  const locationCards = scheduledEmails.map((scheduledEmail, i) => (
    <LocationCard
      backendUrl={backendUrl}
      emailer={scheduledEmail}
      disabled={i + 1 > maxSize}
      setErrorMessage={setErrorMessage}
      setSuccessMessage={setSuccessMessage}
      handleEdit={() => {
        setShowModal(true)
        setSelectedMarket(i)
      }}
      canCopy={true}
      handleCopy={() => {
        saveEmailer(
          backendUrl,
          {
            ...scheduledEmail,
            notes: `${scheduledEmail.notes} Clone`,
          },
          (_) =>
            setSuccessMessage('Duplicated Market, expect an email at 10am ET!'),
          setErrorMessage
        )
      }}
    />
  ))

  const addLocationButton = (
    <a
      data-w-id="8d20c62d-64a4-1e1c-1d25-9dfdcfb4650c"
      onClick={() => {
        setShowModal(true)
        setSelectedMarket(-1)
      }}
      className="button add-location w-button"
    >
      Add Location
    </a>
  )

  return (
    <div className="padding-section-dashboard">
      <div className="note_wrapper">
        <div className="note_text align-left">Note</div>
        <ul role="list" className="note_list-ul">
          <li className="note_list-li">{tierMessage}</li>
          <li className="note_list-li">
            A market can mean anything like a zipcode, county, city, borough
            etc. For simplicity we consider a county as a market
          </li>
        </ul>
      </div>
      <div className="emailer_header-wrapper">
        <h4>Your Locations</h4>
        {addLocationButton}
      </div>
      {showModal && formModal}
      <p className="error">{errorMessage}</p>
      <p className="success">{successMessage}</p>
      <div className="location_cards-wrapper">{locationCards}</div>
    </div>
  )
}
