import { h } from 'preact'
import { useState } from 'preact/hooks'
import { route } from 'preact-router'
import axios from 'axios'

const eliminateEvent = (callback) => (event) => callback(event.target.value)

export default function Signup(props) {
  const { proceedWithGoogle, backendUrl, handleSignupResults, toLogin } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const signUp = () => {
    if (password != confirmPassword) {
      setErrorMessage('Passwords do not match!')
    } else {
      axios
        .post(`${backendUrl}/auth/sign-up`, {
          username: email,
          password: password,
        })
        .then(handleSignupResults(email))
        .catch((e) => {
          setErrorMessage(e.response.data.message)
        })
    }
  }

  return (
    <div className="align-center super-margin-top">
      <h4>Signup</h4>
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
            Password:
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
        <p>{errorMessage}</p>
        <button className="ostrich-button" type="submit" onClick={signUp}>
          Sign Up
        </button>
      </div>
      <button className="plain-button personal-space-bottom" onClick={proceedWithGoogle}>Continue With Google</button>
      <h6>Already Signed Up?</h6>
      <button className="plain-button" onClick={toLogin}>Log in here!</button>
    </div>
  )
}
