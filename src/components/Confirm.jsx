import { h } from 'preact'
import { useState } from 'preact/hooks'
import axios from 'axios'
import { parseQueryParams } from '../subroutines/utils'

const eliminateEvent = (callback) => (event) => callback(event.target.value)

export default function Confirm(props) {
  const { backendUrl, handleVerifyResults } = props
  const handoverEmail =
    parseQueryParams(window.location.search).email || props.email

  const [code, setCode] = useState('')
  const [email, setEmail] = useState(handoverEmail)
  const [errorMessage, setErrorMessage] = useState('')

  const verify = () => {
    setErrorMessage('')
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
      <div className="thin-container ostrich-container personal-space-bottom">
        <div class="flex between centered-items personal-space-bottom">
          <label className="fourth align-right" htmlFor="username">
            Email:
          </label>
          <div className="two-thirds align-left">
            <input
              name="username"
              className="ninety"
              value={email}
              onInput={eliminateEvent(setEmail)}
            />
          </div>
        </div>
        <div class="flex between centered-items personal-space-bottom">
          <label className="fourth align-right" htmlFor="code">
            Code:
          </label>
          <div className="two-thirds align-left">
            <input
              name="code"
              className="ninety"
              value={code}
              onInput={eliminateEvent(setCode)}
            />
          </div>
        </div>
        <button className="ostrich-button" type="submit" onClick={verify}>
          Submit
        </button>
        <p class="error">{errorMessage}</p>
      </div>
      <button className="ostrich-button" onClick={resendCode}>
        Resend Code
      </button>
    </div>
  )
}
