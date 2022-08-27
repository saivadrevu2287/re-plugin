import { h, Fragment } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { parseJwt } from '../subroutines/utils'
import ScheduleEmailForm from './ScheduleEmailForm'
import ScheduledEmails from './ScheduledEmails'
import TestSearch from './TestSearch'
import axios from 'axios'
import EditEmailForm from './EditEmailForm'

const eliminateEvent = (callback) => (event) => callback(event.target.value)

export default function EmailerDashboard(props) {
  const { backendUrl, user } = props

  const [errorMessage, setErrorMessage] = useState('')
  const [scheduledEmails, setScheduledEmails] = useState([])
  const [selectedMarket, setSelectedMarket] = useState(0)
  const [successfulSubmition, setSuccessfulSubmition] = useState(0)

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
    setSelectedMarket(0)
  }, [user, successfulSubmition])

  const scheduledEmailList = scheduledEmails.map((scheduledEmail, i) => {
    return (
      <div
        style="max-width: 200px;"
        onClick={() => setSelectedMarket(i)}
        key={i}
        className="personal-margin-bottom padded gray"
      >
        <h5>{scheduledEmail.notes}</h5>
        <h6>{scheduledEmail.search_param}</h6>
      </div>
    )
  })

  console.log({
    scheduledEmails,
    selectedMarket,
  })

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
      <h2 className="border-bottom">Ostrich Dashboard</h2>
      <div className="personal-space-top">
        <h5>Your Target Markets</h5>
        <div className="flex personal-space-top-double">
          <div className="personal-space-right fourth">
            <div
              style="max-width: 200px;"
              onClick={() => setSelectedMarket(-1)}
              key="create"
              className="personal-margin-bottom padded green"
            >
              <h5>Create New Market</h5>
              <h6>Schedule notifications for a market</h6>
            </div>
            {scheduledEmailList}
          </div>
          {emailerForm}
        </div>
      </div>
      <p className="error">{errorMessage}</p>
    </Fragment>
  )
}
