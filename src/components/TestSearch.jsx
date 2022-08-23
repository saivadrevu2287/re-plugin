import { h, Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import axios from 'axios'

export default function TestSearch(props) {
  const { backendUrl, searchParams, numBedrooms, maxPrice, minPrice } = props

  const [testResults, setTestResults] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const testEmailerParams = () => {
    if (!searchParams) {
      setErrorMessage('Need to fill out Search Parameters')
    } else {
      let testerUrl = `${backendUrl}/api/emailers/test-search-param?search_param=${encodeURI(
        searchParams
      )}`

      if (minPrice) {
        testerUrl = `${testerUrl}&min_price=${minPrice}`
      }

      if (maxPrice) {
        testerUrl = `${testerUrl}&max_price=${maxPrice}`
      }

      if (numBedrooms) {
        testerUrl = `${testerUrl}&no_bedrooms=${numBedrooms}`
      }

      axios
        .get(testerUrl)
        .then((r) => {
          setTestResults(r.data)
          setErrorMessage('')
        })
        .catch((e) => {
          setTestResults([])
          setErrorMessage(e.response.data.message)
        })
    }
  }

  return (
    <Fragment>
      <h5>Search Results</h5>
      <h6>
        Hint: Test your search before submitting. This will help you dial in
        your parameters.
      </h6>
      <p className="error">{errorMessage}</p>
      <button className="ostrich-button" onClick={testEmailerParams}>
        Test these params!
      </button>
      {testResults.map((address, i) => {
        return (
          <div key={i} className="scheduled-emailer-element">
            {address}
          </div>
        )
      })}
    </Fragment>
  )
}
