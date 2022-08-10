import { h } from 'preact'
import { useState } from 'preact/hooks'
import axios from 'axios'
import { parseQueryParams } from '../subroutines/utils'

const eliminateEvent = (callback) => (event) => callback(event.target.value)

export default function Login(props) {
  const { backendUrl, handleLoginResults, proceedWithGoogle, toSignup } = props

  const emailFromQp = parseQueryParams(window.location.search).email

  const [email, setEmail] = useState(emailFromQp)
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const login = () => {
    axios
      .post(`${backendUrl}/auth/login`, {
        username: email,
        password: password,
      })
      .then(handleLoginResults(email))
      .catch((e) => {
        console.log(e)
        setErrorMessage(e.response.data.message)
      })
  }

  return (
    <div className="align-center super-margin-top">
      <h4>Login</h4>
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
        <p>{errorMessage}</p>
        <button
          className="ostrich-button"
          type="submit"
          id="submit-login"
          onClick={login}
        >
          Login
        </button>
      </div>
      <span onClick={proceedWithGoogle}>Continue With Google</span>
      <h6>Not Signed Up?</h6>
      <span onClick={toSignup}>Sign up here!</span>
    </div>
  )
}
