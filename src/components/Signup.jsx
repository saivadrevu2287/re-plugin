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
          setErrorMessage(e.response.data.message)
        })
    }
  }

  return (
    <div className="align-center super-margin-top">
      <h4>Signup</h4>
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
        <button className="ostrich-button" type="submit" onClick={signUp}>
          Sign Up
        </button>
        <p class="error">{errorMessage}</p>
        <button
          className="plain-button personal-margin-bottom"
          onClick={proceedWithGoogle}
        >
          Continue With Google
        </button>
        <h6>Already Signed Up?</h6>
        <button className="plain-button" onClick={toLogin}>
          Log in here!
        </button>
      </div>
    </div>
  )
}
