import { h } from 'preact'
import { useState } from 'preact/hooks'
import axios from 'axios'

const eliminateEvent = (callback) => (event) => callback(event.target.value)
const loginUrl =
  'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1/auth/login'

export default function Login(props) {
  const {
    configurationFields,
    toSignup,
    proceedWithGoogle,
    setConfigurationFields,
  } = props

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const login = () => {
    axios
      .post(loginUrl, {
        username: email,
        password: password,
      })
      .then((r) => {
        console.log(r.data.message)
        const newConfigurationFields = JSON.parse(
          JSON.stringify(configurationFields)
        )
        newConfigurationFields.isLoggedIn = true
        newConfigurationFields.email = email
        setConfigurationFields(newConfigurationFields)
        chrome.storage.sync.set({ configurationFields: newConfigurationFields })
      })
      .catch((e) => {
        console.log(e)
        setErrorMessage(e.response.data.message)
      })
  }

  return (
    <div id="login-container">
      <h5>Please Login With Email to use Plugin.</h5>
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
      <button type="submit" id="submit-login" onClick={login}>
        Login
      </button>
      <button id="login-with-google" onClick={proceedWithGoogle}>
        Log In With Google
      </button>
      <h5>
        Not Signed Up?{' '}
        <span id="signup-link" class="link" onClick={toSignup}>
          Sign Up Here!
        </span>
      </h5>
      <p>{errorMessage}</p>
    </div>
  )
}
