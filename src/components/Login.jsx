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
        console.log(e)
        setErrorMessage(e.response.data.message)
      })
  }

  return (
    <div className="align-center super-margin-top">
      <h4>Login</h4>
      <div className="thin-container ostrich-container personal-space-bottom align-center">
        <div>
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
        </div>
        <button className="ostrich-button" type="submit" onClick={login}>
          Login
        </button>
        <p class="error">{errorMessage}</p>
        <div>
          <button
            className="plain-button personal-space-bottom"
            onClick={toForgotPassword}
          >
            Forgot Password
          </button>
        </div>
        <button
          className="plain-button personal-space-bottom"
          onClick={proceedWithGoogle}
        >
          Continue With Google
        </button>
        <h6>Not Signed Up?</h6>
        <button className="plain-button" onClick={toSignup}>
          Sign up here!
        </button>
      </div>
    </div>
  )
}
