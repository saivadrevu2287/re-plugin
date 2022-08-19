import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { parseJwt } from '../subroutines/utils'
import ScheduleEmailForm from './ScheduleEmailForm'
import ScheduledEmails from './ScheduledEmails'
import TestSearch from './TestSearch'

const eliminateEvent = (callback) => (event) => callback(event.target.value)

export default function Profile(props) {
  const { jwt, backendUrl, user } = props

  const [errorMessage, setErrorMessage] = useState('')
  const [successfulSubmition, setSuccessfulSubmition] = useState(null)

  const [minPrice, setMinPrice] = useState()
  const [maxPrice, setMaxPrice] = useState()
  const [searchParams, setSearchParams] = useState()
  const [numBedrooms, setNumBedrooms] = useState()

  const email = parseJwt(jwt.id_token).email

  return (
    <div className="page">
      <div className="card">
        <h5>Welcome!</h5>
        <h5>{email}</h5>
      </div>
      <div className="profile-container align-center">
        <div className="fourty-five break-to-full">
          <ScheduleEmailForm
            backendUrl={backendUrl}
            setSuccessfulSubmition={setSuccessfulSubmition}
            setSearchParams={setSearchParams}
            searchParams={searchParams}
            setMinPrice={setMinPrice}
            minPrice={minPrice}
            setMaxPrice={setMaxPrice}
            maxPrice={maxPrice}
            setNumBedrooms={setNumBedrooms}
            numBedrooms={numBedrooms}
          />
        </div>
        <div className="two-fifths break-to-full">
          <ScheduledEmails
            backendUrl={backendUrl}
            user={user}
            externalReload={successfulSubmition}
          />
        </div>
        <div className="two-fifths break-to-full">
          <TestSearch 
            searchParams={searchParams}
            minPrice={minPrice}
            maxPrice={maxPrice}
            numBedrooms={numBedrooms}
            backendUrl={backendUrl}
          />
        </div>
      </div>
      <p className="error">{errorMessage}</p>
    </div>
  )
}
