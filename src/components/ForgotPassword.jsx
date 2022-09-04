import { h } from 'preact'
import { useState } from 'preact/hooks'
import axios from 'axios'

const eliminateEvent = (callback) => (event) => callback(event.target.value)

export default function ForgotPassword(props) {
  const { backendUrl, handleForgotPasswordResults } = props

  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const forgotPassword = () => {
    setErrorMessage('')
    axios
      .post(`${backendUrl}/auth/forgot-password`, {
        username: email,
      })
      .then(handleForgotPasswordResults(email))
      .catch((e) => {
        if (e.response.data) {
          setErrorMessage(e.response.data.message)
        } else {
          setErrorMessage(e.message)
        }
      })
  }

  return (
    <div className="flex around">
      <div className="align-center super-margin-top dashboard-container third break-to-full padded">
        <h4 className="personal-margin-bottom personal-margin-top">
          Forgot Password
        </h4>
        <div className="thin-container ostrich-container personal-space-bottom">
          <div>
            <input
              name="username"
              className="three-fourths personal-margin-bottom"
              value={email}
              placeholder="Email"
              onInput={eliminateEvent(setEmail)}
            />
          </div>
          <button
            className="ostrich-button four-fifths"
            type="submit"
            onClick={forgotPassword}
          >
            Submit
          </button>
          <p class="error">{errorMessage}</p>
        </div>
      </div>
    </div>
  )
}
