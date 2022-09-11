import { h, Fragment } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import ScheduleEmailForm from './ScheduleEmailForm'
import axios from 'axios'
import EmailerDetails from './EmailerDetails'
import EditEmailForm from './EditEmailForm'
import { nFormatter } from '../subroutines/math'

export default function EmailerDashboard(props) {
  const { backendUrl, user } = props

  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [scheduledEmails, setScheduledEmails] = useState([])
  const [selectedMarket, setSelectedMarket] = useState(-1)
  const [loadingState, setLoadingState] = useState(false)
  const [successfulSubmition, setSuccessfulSubmition] = useState(0)

  useEffect(() => {
    if (user) {
      axios
        .get(`${backendUrl}/api/emailers`)
        .then((r) => {
          setScheduledEmails(r.data)
          setLoadingState(false)
          // setSelectedMarket(-1)
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
          setSelectedMarket(i)
          setShowModal(true)
        }}
        key={i}
        className={`padded-double ${
          i == selectedMarket ? 'gray' : 'hover-item'
        } border-bottom border-right`}
      >
        <h6>{scheduledEmail.notes}</h6>
        <p>{scheduledEmail.search_param}</p>
        <p>
          ${nFormatter(scheduledEmail.min_price)}-$
          {nFormatter(scheduledEmail.max_price)}
        </p>
      </div>
    )
  })

  const emailerDetails =
    selectedMarket == -1 ? (
      <div className="padded">
        <h5>Schedule a New Email</h5>
        <p>
          Once you save your parameters below, you will get an email daily at
          around 3 pm ET with the newest properties and their expected cash
          flow.
        </p>
      </div>
    ) : (
      <EmailerDetails
        backendUrl={backendUrl}
        setSuccessfulSubmition={setSuccessfulSubmition}
        scheduledEmail={scheduledEmails[selectedMarket]}
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

  return (
    <Fragment>
      <h4 className="padded">Your Targeted Markets</h4>
      {showModal && (
        <div className="modal flex around wrap show-on-small full">
          <div className="padded">
            <button class="plain-button" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
          {loadingState ? <h4>Loading Data...</h4> : emailerDetails}
          {emailerForm}
        </div>
      )}
      {!showModal && (
        <div className="show-on-small">
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
          {scheduledEmailList}
        </div>
      )}
      <div className="hide-on-small">
        <div className="flex dashboard-container">
          <div className="fourth">
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
            {scheduledEmailList}
          </div>
          <div className="personal-space-top-double full">
            <div className="flex around wrap">
              <div className="two-fifths">
                {loadingState ? <h4>Loading Data...</h4> : emailerDetails}
              </div>
              <div className="two-fifths">{emailerForm}</div>
            </div>
          </div>
        </div>
      </div>
      <p className="error">{errorMessage}</p>
    </Fragment>
  )
}
