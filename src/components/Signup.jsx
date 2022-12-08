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
      setErrorMessage('')
      axios
        .post(`${backendUrl}/auth/sign-up`, {
          username: email,
          password: password,
        })
        .then(handleSignupResults(email))
        .catch((e) => {
          if (e.response.data) {
            setErrorMessage(e.response.data.message)
          } else {
            setErrorMessage(e.message)
          }
        })
    }
  }

  return (
    <div className="flex around">
      <div className="align-center super-margin-top dashboard-container third break-to-full padded">
        <h4 className="personal-margin-bottom personal-margin-top">Sign Up</h4>
        <div className="thin-container ostrich-container personal-space-bottom">
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
          <input
            name="confirm-password"
            className="three-fourths personal-margin-bottom"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onInput={eliminateEvent(setConfirmPassword)}
          />
          <span class="text-size-small w-form-label" for="checkbox">
            By registering, you agree to the{' '}
            <a
              href="https://www.notion.so/ostrch/Terms-of-Use-035e32f803d542459ad3429e6b42eeee"
              target="_blank"
              class="form_text-bold"
            >
              Terms
            </a>{' '}
            and{' '}
            <a
              href="https://www.notion.so/ostrch/Privacy-Policy-acd58fee6ce447d885f0551edf014158"
              target="_blank"
              class="form_text-bold"
            >
              Privacy Policy
            </a>
          </span>
          <button
            className="four-fifths ostrich-button"
            type="submit"
            onClick={signUp}
          >
            Sign Up
          </button>
          <p class="error">{errorMessage}</p>
          <button
            className="plain-button four-fifths personal-margin-bottom"
            onClick={proceedWithGoogle}
          >
            Continue With Google
          </button>
          <button className="plain-button four-fifths" onClick={toLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
