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
      setErrorMessage('')
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
    setErrorMessage('')
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
        <div>
          <input
            name="username"
            className="three-fourths personal-margin-bottom"
            value={email}
            placeholder="Email"
            onInput={eliminateEvent(setEmail)}
          />
          <input
            name="password"
            type="password"
            placeholder='Password'
            className="three-fourths personal-margin-bottom"
            value={password}
            onInput={eliminateEvent(setPassword)}
          />
          <input
            name="confirm-password"
            className="three-fourths personal-margin-bottom"
            type="password"
            placeholder='Confirm Password'
            value={confirmPassword}
            onInput={eliminateEvent(setConfirmPassword)}
          />
          <input
            name="code"
            className="three-fourths personal-margin-bottom"
            value={code}
            placeholder='Code'
            onInput={eliminateEvent(setCode)}
          />
        </div>
        <button
          className="ostrich-button"
          type="submit"
          onClick={confirmForgotPassword}
        >
          Submit
        </button>
        <p class="error">{errorMessage}</p>
        <button className="ostrich-button personal-margin-bottom" onClick={resendCode}>
          Resend Code
        </button>
      </div>
    </div>
  )
}
