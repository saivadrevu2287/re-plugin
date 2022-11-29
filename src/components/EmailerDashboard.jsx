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
    ? 3
    : billing_id == 'Tier 3'
    ? 5
    : 0

export default function EmailerDashboard(props) {
  const { backendUrl, user, toPayments } = props

  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [scheduledEmails, setScheduledEmails] = useState([])
  const [selectedMarket, setSelectedMarket] = useState(-1)
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
          setScheduledEmails(r.data)
          setLoadingState(false)
          if (selectedMarket >= r.data.length) {
            setSelectedMarket(-1)
          }

          if (r.data.length >= maxSize) {
            setSelectedMarket(0)
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

  // if (loadingState) {
  //   return <h4>Loading Data...</h4>
  // }

  const scheduledEmailList = scheduledEmails.map((scheduledEmail, i) => {
    return (
      <div
        onClick={() => {
          setSelectedMarket(i)
          setShowModal(true)
        }}
        key={i}
        className={`padded-double ${
          i == selectedMarket ? 'gray' : 'hover-item'
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
    selectedMarket == -1 ? (
      <div className="padded">
        <h5>Schedule a New Email</h5>
        <p>
          Once you save your parameters below, you will get an email daily at
          around 10 am ET with the newest properties and their expected cash
          flow.
        </p>
      </div>
    ) : (
      <EmailerDetails
        backendUrl={backendUrl}
        setSuccessfulSubmition={setSuccessfulSubmition}
        scheduledEmail={scheduledEmails[selectedMarket]}
        isAllowedToDuplicate={scheduledEmails.length < maxSize}
      />
    )

  const emailerForm =
    selectedMarket == -1 ? (
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
        scheduledEmail={scheduledEmails[selectedMarket]}
      />
    )

  const tierMessage =
    user && user.billing_id ? (
      <h6>
        You are subscribed to {user.billing_id}: On this plan {maxSize} markets
        are allowed. View plans <a href="payments.html">here</a>.
      </h6>
    ) : (
      <h6>
        You are not subscribed! View plans <a href="payments.html">here</a>.
      </h6>
    )

  return (
    <Fragment>
      <h4 className="padded">Your Targeted Markets</h4>
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
                setSelectedMarket(-1)
                setShowModal(true)
              }}
              key="create"
              className={`padded-double border-right border-bottom border-top ${
                selectedMarket == -1 ? 'gray' : 'hover-item'
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
                  setSelectedMarket(-1)
                  setShowModal(true)
                }}
                key="create"
                className={`padded-double border-right border-bottom ${
                  selectedMarket == -1 ? 'gray' : 'hover-item'
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
