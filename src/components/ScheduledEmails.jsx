import { h, Fragment } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import axios from 'axios'

const formatNumber = (number) => (number ? `$${number.toLocaleString()}` : '$X')

export default function ScheduledEmails(props) {
  const { backendUrl, user, externalReload } = props

  const [errorMessage, setErrorMessage] = useState('')
  const [reloadSelf, setReloadSelf] = useState('')
  const [scheduledEmails, setScheduledEmails] = useState([])

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

  const scheduledEmailList = 
    scheduledEmails.map((scheduledEmail, i) => {
      const handleDeleteButton = () => {
        axios
          .delete(`${backendUrl}/api/emailers/${scheduledEmail.id}`)
          .then((r) => {
            setReloadSelf(Math.random())
          })
          .catch((e) => {
            setSearchResults([])
            setErrorMessage(e.response.data.message)
          })
      }

      return (
        <div key={i} className="scheduled-emailer-element">
          <p>
            {scheduledEmail.search_param},{' '}
            {formatNumber(scheduledEmail.min_price)}-
            {formatNumber(scheduledEmail.max_price)}
          </p>
          <button className="ostrich-button" onClick={handleDeleteButton}>
            Delete
          </button>
        </div>
      )
    })

  return (
    <Fragment>
      <h5>Your Scheduled Emails</h5>
      {!scheduledEmails ? <h6>Loading...</h6> : scheduledEmailList}
      <p className="error">{errorMessage}</p>
    </Fragment>
  )
}
