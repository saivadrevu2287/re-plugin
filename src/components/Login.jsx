import { h, Fragment } from 'preact'
import { useState } from 'preact/hooks'

import { parseQueryParams } from '../subroutines/utils'
import { login } from '../api/auth'

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

  const loginAction = () => {
    setErrorMessage('')
    login(
      backendUrl,
      {
        username: email,
        password: password,
      },
      handleLoginResults(email),
      setErrorMessage
    )
  }

  return (
    <Fragment>
    <header class="section_login-form">
    <div class="padding-global">
      <div class="container-large">
        <div class="padding-section-large">
          <div class="form_component">
            <div class="form-main-wrapper">
              <h2>Login</h2>
              <div class="login_form-block">
                <form id="wf-form-Login-form" name="wf-form-Login-form" data-name="Login form" method="get" class="login_form">
                  <div class="form_field-wrapper"><label for="login-email" class="form_field-text">Email</label><input type="email" class="form_field w-input" maxlength="256" name="login-email" data-name="login-email" placeholder="" required="" /></div>
                  <div class="form_field-wrapper"><label for="login-password" class="form_field-text">Password</label><input type="password" class="form_field w-input" maxlength="256" name="login-password" data-name="login-password" placeholder="" required="" /></div>
                  <div class="form_forgot-wrapper">
                    <div class="text-size-small">Forgot password?</div>
                    <a href="#" class="form_reset-link">Reset</a>
                  </div><input type="submit" data-wait="Please wait..." value="Submit" class="button w-button" />
                </form>
              </div>
              <div class="form_divider-wrapper">
                <div class="form_divider"></div>
                <div>OR</div>
                <div class="form_divider"></div>
              </div>
              <a href="#" class="button-form w-inline-block"><img src="images/google.svg" loading="lazy" alt="" />
                <div>Continue with Google</div>
              </a>
              <div class="form_link-wrapper">
                <div class="a-paragraph-small">Dont have an account yet?</div>
                <a href="#" class="form_link">Sign up now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
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
            onClick={loginAction}
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
    </Fragment>
  )
}
