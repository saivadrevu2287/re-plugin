import { h, Fragment } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { parseJwt } from '../subroutines/utils'
import ScheduleEmailForm from './ScheduleEmailForm'
import ScheduledEmails from './ScheduledEmails'
import TestSearch from './TestSearch'

const eliminateEvent = (callback) => (event) => callback(event.target.value)

export default function EmailerDashboard(props) {
  const { backendUrl, user } = props

  const [errorMessage, setErrorMessage] = useState('')
  const [successfulSubmition, setSuccessfulSubmition] = useState(null)

  const [minPrice, setMinPrice] = useState()
  const [maxPrice, setMaxPrice] = useState()
  const [searchParams, setSearchParams] = useState()
  const [numBedrooms, setNumBedrooms] = useState()
  const [numBathrooms, setNumBathrooms] = useState()

  return (
    <Fragment>
      <h2 className="border-bottom">Ostrich Dashboard</h2>
      <div className='personal-space-top'>
        <ScheduledEmails
          backendUrl={backendUrl}
          user={user}
          externalReload={successfulSubmition}
        />
      </div>
    {false && <div><div className="fourty-five break-to-full">
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
        setNumBathrooms={setNumBathrooms}
        numBathrooms={numBathrooms}
      />
    </div>

    <div className="two-fifths break-to-full">
      <TestSearch
        searchParams={searchParams}
        minPrice={minPrice}
        maxPrice={maxPrice}
        numBedrooms={numBedrooms}
        numBathrooms={numBathrooms}
        backendUrl={backendUrl}
      />
    </div></div>}
      <p className="error">{errorMessage}</p>
    </Fragment>
  )
}
