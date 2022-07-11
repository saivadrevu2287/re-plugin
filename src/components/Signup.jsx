import { h } from 'preact'
import { useState } from 'preact/hooks'
import axios from 'axios'

const eliminateEvent = (callback) => (event) => callback(event.target.value)
const signupUrl =
  'https://i7cryfp1gf.execute-api.us-east-2.amazonaws.com/v1/auth/sign-up'

export default function Signup(props) {
  const {
    configurationFields,
    toLogin,
    proceedWithGoogle,
    setConfigurationFields,
  } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const signUp = () => {
    axios
      .post(signupUrl, {
        username: email,
        password: password,
      })
      .then((r) => {
        console.log(r.data.message)
        const newConfigurationFields = JSON.parse(
          JSON.stringify(configurationFields)
        )
        newConfigurationFields.email = email
        newConfigurationFields.needsVerification = true
        setConfigurationFields(newConfigurationFields)
        chrome.storage.sync.set({ configurationFields: newConfigurationFields })
      })
      .catch((e) => {
        console.log(e)
        setErrorMessage(e.response.data.message)
      })
  }

  return (
    <div id="signup-container">
      <h5>Please Signup With Email to use Plugin.</h5>
      <label for="username">
        Email:
        <input
          id="email-input"
          name="username"
          value={email}
          onInput={eliminateEvent(setEmail)}
        />
      </label>
      <label for="password">
        Password:
        <input
          id="password-input"
          name="password"
          type="password"
          value={password}
          onInput={eliminateEvent(setPassword)}
        />
      </label>
      <label for="confirm-password">
        Confirm Password:
        <input
          id="confirm-password-input"
          name="confirm-password"
          type="password"
          value={confirmPassword}
          onInput={eliminateEvent(setConfirmPassword)}
        />
      </label>
      <button type="submit" id="submit-signup" onClick={signUp}>
        Sign Up
      </button>
      <button id="signup-with-google" onClick={proceedWithGoogle}>
        Sign Up With Google
      </button>
      <h5>
        Already Signed Up?{' '}
        <span id="login-link" class="link" onClick={toLogin}>
          Login Here!
        </span>
      </h5>
      <p>{errorMessage}</p>
    </div>
  )
}
