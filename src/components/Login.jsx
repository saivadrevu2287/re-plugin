import { h } from 'preact'
import { useState } from 'preact/hooks'
import axios from 'axios'
import { parseQueryParams } from '../subroutines/utils'

const eliminateEvent = (callback) => (event) => callback(event.target.value)

export default function Login(props) {
  const {
    backendUrl,
    handleLoginResults,
    proceedWithGoogle,
    toSignup,
    toForgotPassword,
  } = props

  const emailFromQp = parseQueryParams(window.location.search).email

  const [email, setEmail] = useState(emailFromQp)
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const login = () => {
    setErrorMessage('')
    axios
      .post(`${backendUrl}/auth/login`, {
        username: email,
        password: password,
      })
      .then(handleLoginResults(email))
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
        <h4 className="personal-margin-bottom personal-margin-top">Login</h4>
        <div className="thin-container ostrich-container personal-space-bottom align-center">
          <input
            name="username"
            className="three-fourths personal-margin-bottom"
            placeholder="Email"
            value={email}
            onInput={eliminateEvent(setEmail)}
          />
          <input
            name="password"
            type="password"
            className="three-fourths personal-margin-bottom"
            placeholder="Password"
            value={password}
            onInput={eliminateEvent(setPassword)}
          />
          <button
            className="ostrich-button four-fifths personal-margin-top"
            type="submit"
            onClick={login}
          >
            Login
          </button>
          <p class="error">{errorMessage}</p>
          <div className="personal-margin-bottom">
            <span onClick={toForgotPassword} className="blue-text">
              Forgot Password
            </span>
          </div>
          <button
            className="plain-button four-fifths personal-margin-bottom"
            onClick={proceedWithGoogle}
          >
            Continue With Google
          </button>
          <button className="plain-button four-fifths" onClick={toSignup}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}
