import { h } from 'preact'
import { useState } from 'preact/hooks'
import axios from 'axios'

const eliminateEvent = (callback) => (event) => callback(event.target.value)

export default function ForgotPassword(props) {
  const { backendUrl, handleForgotPasswordResults } = props

  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const forgotPassword = () => {
    axios
      .post(`${backendUrl}/auth/forgot-password`, {
        username: email,
      })
      .then(handleForgotPasswordResults(email))
      .catch((e) => {
        setErrorMessage(e.response.data.message)
      })
  }

  return (
    <div className="align-center super-margin-top">
      <h4>Forgot Password</h4>
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
        <button
          className="ostrich-button"
          type="submit"
          onClick={forgotPassword}
        >
          Submit
        </button>
        <p class="error">{errorMessage}</p>
      </div>
    </div>
  )
}
