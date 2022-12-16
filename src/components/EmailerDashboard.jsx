import { h, Fragment } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import ScheduleEmailForm from './ScheduleEmailForm'
import axios from 'axios'
import EmailerDetails from './EmailerDetails'
import EditEmailForm from './EditEmailForm'
import { nFormatter } from '../subroutines/math'

const allowedMarkets = (billing_id) =>
  billing_id == 'Tier 1'
    ? 1
    : billing_id == 'Tier 2'
    ? 1
    : billing_id == 'Tier 3'
    ? 3
    : 0

const scheduleNewMarketKey = 'new'

export default function EmailerDashboard(props) {
  const { backendUrl, user, toPayments } = props

  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [scheduledEmails, setScheduledEmails] = useState([])
  const [selectedMarket, setSelectedMarket] = useState(scheduleNewMarketKey)
  const [loadingState, setLoadingState] = useState(false)
  const [successfulSubmition, setSuccessfulSubmition] = useState(0)
  const [maxSize, setMaxSize] = useState(0)

  useEffect(() => {
    if (user) {
      const newMaxSize = allowedMarkets(user.billing_id)
      setMaxSize(newMaxSize)

      axios
        .get(`${backendUrl}/api/emailers`)
        .then((r) => {
          r.data.sort((a,b) => b.id - a.id)
          setScheduledEmails(r.data)
          setLoadingState(false)

          if (r.data.length > 0 && r.data.length >= newMaxSize) {
            setSelectedMarket(r.data[0].notes)
          }

          if (r.data.length == 0) {
            setSelectedMarket(scheduleNewMarketKey)
          }
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
  }, [user, successfulSubmition])

  const scheduledEmailList = scheduledEmails.map((scheduledEmail, i) => {
    return (
      <div
        onClick={() => {
          setSelectedMarket(scheduledEmail.notes)
          setShowModal(true)
        }}
        key={i}
        className={`padded-double ${
          scheduledEmails[i].notes == selectedMarket ? 'gray' : 'hover-item'
        } border-bottom border-right
        ${i + 1 > maxSize ? 'error' : ''}`}
      >
        <h6>{scheduledEmail.notes}</h6>
        <p>{scheduledEmail.search_param}</p>
        <p>
          ${nFormatter(scheduledEmail.min_price)}-$
          {nFormatter(scheduledEmail.max_price)}
        </p>
        {i + 1 > maxSize && (
          <p>Exceeded Max count per plan; Market Disabled.</p>
        )}
      </div>
    )
  })

  const emailerDetails =
    selectedMarket == scheduleNewMarketKey ? (
      <div className="padded">
        <h5>Schedule a New Email</h5>
        <p>
          Once you save your parameters below, you will get an email daily at
          around 10am ET with the newest properties and their expected cash
          flow.
        </p>
      </div>
    ) : (
      <EmailerDetails
        backendUrl={backendUrl}
        setSuccessfulSubmition={setSuccessfulSubmition}
        scheduledEmail={scheduledEmails.find(
          (emailer) => emailer.notes == selectedMarket
        )}
        isAllowedToDuplicate={scheduledEmails.length < maxSize}
      />
    )

  const emailerForm =
    selectedMarket == scheduleNewMarketKey ? (
      <ScheduleEmailForm
        backendUrl={backendUrl}
        selectedMarket={selectedMarket}
        setSuccessfulSubmition={setSuccessfulSubmition}
      />
    ) : (
      <EditEmailForm
        backendUrl={backendUrl}
        selectedMarket={selectedMarket}
        setSuccessfulSubmition={setSuccessfulSubmition}
        scheduledEmail={scheduledEmails.find(
          (emailer) => emailer.notes == selectedMarket
        )}
      />
    )

  const tierMessage =
    user && user.billing_id ? (
      <Fragment>
        <p>
          You are subscribed to {user.billing_id}: On this plan{' '}
          {maxSize == 1 ? '1 market is' : `${maxSize} markets are`} allowed.{' '}
          <a href="/payments.html">Change plan here</a>.
        </p>
        <h6>
          A market can mean anything like a zipcode, county, city, borough etc.
          For simplicity we consider a county as a market{' '}
        </h6>
      </Fragment>
    ) : (
      <h6>
        You are not subscribed! <a href="/payments.html">Change plan here</a>.
      </h6>
    )

  return (
    <Fragment>
      <h4 className="padded">Targeted Markets</h4>
      {tierMessage}
      {showModal && (
        <div className="modal flex around wrap show-on-small full">
          <div className="padded">
            <button class="plain-button" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
          {emailerDetails}
          {emailerForm}
        </div>
      )}
      {!showModal && (
        <div className="show-on-small">
          {scheduledEmails.length < maxSize && !loadingState && (
            <div
              onClick={() => {
                setSelectedMarket(scheduleNewMarketKey)
                setShowModal(true)
              }}
              key="create"
              className={`padded-double border-right border-bottom border-top ${
                selectedMarket == scheduleNewMarketKey ? 'gray' : 'hover-item'
              }`}
            >
              <h5>+</h5>
              <p>Schedule notifications for a market</p>
            </div>
          )}
          {scheduledEmailList}
        </div>
      )}
      <div className="hide-on-small">
        <div className="flex dashboard-container">
          <div className="fourth">
            {scheduledEmails.length < maxSize && !loadingState && (
              <div
                onClick={() => {
                  setSelectedMarket(scheduleNewMarketKey)
                  setShowModal(true)
                }}
                key="create"
                className={`padded-double border-right border-bottom ${
                  selectedMarket == scheduleNewMarketKey ? 'gray' : 'hover-item'
                }`}
              >
                <h5>+</h5>
                <p>Schedule notifications for a market</p>
              </div>
            )}
            {scheduledEmailList}
          </div>
          {!loadingState && maxSize != 0 && (
            <div className="personal-space-top-double full flex around">
              <div className="three-fourths">
                {emailerDetails}
                {emailerForm}
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="error">{errorMessage}</p>
    </Fragment>
  )
}
