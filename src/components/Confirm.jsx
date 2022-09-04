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
        if (e.response.data) {
          setErrorMessage(e.response.data.message)
        } else {
          setErrorMessage(e.message)
        }
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
    <div className="flex around">
      <div className="align-center super-margin-top dashboard-container third break-to-full padded">
        <h4 className="personal-margin-bottom personal-margin-top">Verify</h4>
        <h6>
          Please Enter the Verification Code
          <br />
          sent to your Email ({email}).
        </h6>
        <div className="thin-container ostrich-container personal-space-bottom">
          <input
            name="username"
            className="three-fourths personal-margin-bottom"
            placeholder="Email"
            value={email}
            onInput={eliminateEvent(setEmail)}
          />
          <input
            name="code"
            className="three-fourths personal-margin-bottom"
            placeholder="Code"
            value={code}
            onInput={eliminateEvent(setCode)}
          />
          <button
            className="four-fifths ostrich-button"
            type="submit"
            onClick={verify}
          >
            Submit
          </button>
          <p class="error">{errorMessage}</p>
          <button className="four-fifths ostrich-button" onClick={resendCode}>
            Resend Code
          </button>
        </div>
      </div>
    </div>
  )
}
