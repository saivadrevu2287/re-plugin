import { h, Fragment } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import ScheduleEmailForm from './ScheduleEmailForm'
import axios from 'axios'
import EmailerDetails from './EmailerDetails'
import EditEmailForm from './EditEmailForm'

export default function EmailerDashboard(props) {
  const { backendUrl, user } = props

  const [errorMessage, setErrorMessage] = useState('')
  const [scheduledEmails, setScheduledEmails] = useState([])
  const [selectedMarket, setSelectedMarket] = useState(0)
  const [loadingState, setLoadingState] = useState(false)
  const [successfulSubmition, setSuccessfulSubmition] = useState(0)

  useEffect(() => {
    if (user) {
      axios
        .get(`${backendUrl}/api/emailers`)
        .then((r) => {
          setScheduledEmails(r.data)

          setLoadingState(false)

          if (!scheduledEmails.length) {
            setSelectedMarket(-1)
          } else {
            setSelectedMarket(0)
          }
        })
        .catch((e) => {
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
        onClick={() => setSelectedMarket(i)}
        key={i}
        className={`padded-double ${
          i == selectedMarket ? 'gray' : 'hover-item'
        } border-top border-right`}
      >
        <h6>{scheduledEmail.notes}</h6>
        <p>{scheduledEmail.search_param}</p>
      </div>
    )
  })

  const emailerDetails =
    selectedMarket == -1 ? (
      <div className="padded">
        <h5>Schedule a New Email</h5>
        <p>
          Once you save your parameters below, you will get an email daily at
          3:42 pm ET with the newest properties and their expected cash flow.
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
        setSuccessfulSubmition={setSuccessfulSubmition}
      />
    ) : (
      <EditEmailForm
        backendUrl={backendUrl}
        setSuccessfulSubmition={setSuccessfulSubmition}
        scheduledEmail={scheduledEmails[selectedMarket]}
      />
    )

  return (
    <Fragment>
      <h4 className="padded">Your Targeted Markets</h4>
      <div className="flex dashboard-container">
        <div className="break-to-full fourth">
          <div
            onClick={() => setSelectedMarket(-1)}
            key="create"
            className={`padded-double border-right ${
              selectedMarket == -1 ? 'gray' : ''
            }`}
          >
            <h5>+</h5>
            <p>Schedule notifications for a market</p>
          </div>
          {scheduledEmailList}
        </div>
        <div className="personal-space-top-double hide-on-small">
          {loadingState ? <h4>Loading Data...</h4> : emailerDetails}
        </div>
      </div>
      <div className="flex around">
        <div className="half break-to-full personal-margin-top-double">
          {emailerForm}
        </div>
      </div>
      <p className="error">{errorMessage}</p>
    </Fragment>
  )
}
