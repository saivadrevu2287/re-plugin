import { h } from 'preact'
import { useState } from 'preact/hooks'
import axios from 'axios'
import { parseQueryParams } from '../subroutines/utils'

const eliminateEvent = (callback) => (event) => callback(event.target.value)

export default function Confirm(props) {
  const { backendUrl, handleConfirmForgotPasswordResults } = props
  const handoverEmail =
    parseQueryParams(window.location.search).email || props.email

  const [code, setCode] = useState('')
  const [email, setEmail] = useState(handoverEmail)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const confirmForgotPassword = () => {
    if (password != confirmPassword) {
      setErrorMessage('Passwords do not match!')
    } else {
      axios
        .post(`${backendUrl}/auth/confirm-forgot-password`, {
          username: email,
          password: password,
          code: code,
        })
        .then(handleConfirmForgotPasswordResults(email))
        .catch((e) => {
          setErrorMessage(e.response.data.message)
        })
    }
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
      <h4>Confirm Password</h4>
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
          <label className="fourth align-right" htmlFor="password">
            New Password:
          </label>
          <div className="two-thirds align-left">
            <input
              name="password"
              type="password"
              className="ninety"
              value={password}
              onInput={eliminateEvent(setPassword)}
            />
          </div>
        </div>
        <div class="flex between centered-items personal-space-bottom">
          <label className="fourth align-right" htmlFor="confirm-password">
            Confirm Password:
          </label>
          <div className="two-thirds align-left">
            <input
              name="confirm-password"
              className="ninety"
              type="password"
              value={confirmPassword}
              onInput={eliminateEvent(setConfirmPassword)}
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
        <button
          className="ostrich-button"
          type="submit"
          onClick={confirmForgotPassword}
        >
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
