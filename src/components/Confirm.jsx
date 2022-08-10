import { h } from 'preact'
import { useState } from 'preact/hooks'
import axios from 'axios'
import { route } from 'preact-router'
import { parseQueryParams } from '../subroutines/utils'

const eliminateEvent = (callback) => (event) => callback(event.target.value)

export default function Confirm(props) {
  const { backendUrl, handleVerifyResults } = props
  const email = parseQueryParams(window.location.search).email || props.email

  const [code, setCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const verify = () => {
    axios
      .post(`${backendUrl}/auth/verify`, {
        username: email,
        code: code,
      })
      .then(handleVerifyResults(email))
      .catch((e) => {
        setErrorMessage(e.response.data.message)
      })
  }

  const resendCode = () => {
    axios
      .post(`${backendUrl}/auth/resend-code`, {
        username: email,
      })
      .then((r) => {
        setErrorMessage(r.data.message)
      })
      .catch((e) => {
        setErrorMessage(e.response.data.message)
      })
  }

  return (
    <div className="align-center super-margin-top">
      <h4>Verify</h4>
      <h6>
        Please Enter the Verification Code
        <br />
        sent to your Email ({email}).
      </h6>
      <div className="thin-container ostrich-container">
        <div id="login-email-container" class="form-input-container">
          <label htmlFor="code">Code:</label>
          <input
            id="code-input"
            name="code"
            class="input"
            value={code}
            onInput={eliminateEvent(setCode)}
          />
        </div>
        <button
          className="ostrich-button"
          type="submit"
          id="submit-verify"
          onClick={verify}
        >
          Submit
        </button>
        <p class="error">{errorMessage}</p>
      </div>
      <button className="ostrich-button" id="resend-code" onClick={resendCode}>
        Resend Code
      </button>
    </div>
  )
}
