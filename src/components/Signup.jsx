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
      <h4>Sign Up</h4>
      <div className="thin-container ostrich-container">
        <div id="login-email-container" class="form-input-container">
          <label htmlFor="username">Email:</label>
          <div>
            <input
              id="email-input"
              name="username"
              class="input"
              value={email}
              onInput={eliminateEvent(setEmail)}
            />
          </div>
        </div>
        <div id="login-email-container" class="form-input-container">
          <label htmlFor="password">Password:</label>
          <div>
            <input
              id="password-input"
              name="password"
              type="password"
              class="input"
              value={password}
              onInput={eliminateEvent(setPassword)}
            />
          </div>
        </div>
        <div id="login-email-container" class="form-input-container">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <div>
            <input
              id="password-input"
              name="confirm-password"
              type="password"
              value={confirmPassword}
              onInput={eliminateEvent(setConfirmPassword)}
            />
          </div>
        </div>
        <p>{errorMessage}</p>
        <button
          className="ostrich-button"
          type="submit"
          id="submit-signup"
          onClick={signUp}
        >
          Sign Up
        </button>
      </div>
      <span onClick={proceedWithGoogle}>Continue With Google</span>
      <h6>Already Signed Up?</h6>
      <span onClick={toLogin}>Log in here!</span>
    </div>
  )
}
