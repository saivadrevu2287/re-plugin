import Router from 'preact-router'
import { h, Fragment } from 'preact'
import { useState } from 'preact/hooks'
import { route } from 'preact-router'
import entry from '../build/entry'

import { setCookie } from '../subroutines/utils'
import useLogin from '../hooks/useLogin'

import Login from '../components/Login'
import Signup from '../components/Signup'
import Confirm from '../components/Confirm'
import EmailerDashboard from '../components/EmailerDashboard'
import Home from '../components/Home'
import Logout from '../components/Logout'
import ForgotPassword from '../components/ForgotPassword'
import ConfirmForgotPassword from '../components/ConfirmForgotPassword'
import Header from '../components/Header'

const loginWithGoogleUrl =
  'https://ostrich.auth.us-east-2.amazoncognito.com/login?client_id=70apbavl1fsobed4jt7l7ml18h&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://ostr.ch/email.html'
const backendUrl = 'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1'
const emailerLink =
  'https://ostrch.notion.site/Ostrich-Emailer-08759238028f4964805e86eb8dca5cbd'
function App(props) {
  const [errorMessage, setErrorMessage] = useState()
  const { user, jwt, setJwt } = useLogin(backendUrl, setErrorMessage, () => {})

  const handleLoginResults = (_) => (r) => {
    setJwt(r)
    setCookie(r)
    const jwtHash = r
      ? Object.keys(r)
          .map((key) => `${key}=${r[key]}`)
          .join('&')
      : ''

    window.location.replace(`/#${jwtHash}`)
  }

  const toSignup = () => route('/signup')
  const toLogin = () => route('/login')
  const toEmailerDashboard = () => route('/dashboard')
  const toHome = () => route('/')
  const toForgotPassword = () => route('/forgot-password')
  const proceedWithGoogle = () => (window.location.href = loginWithGoogleUrl)
  const logout = '/logout.html'

  const handleVerifyResults = (email) => (r) =>
    route(`/login?email=${email}`, true)
  const handleSignupResults = (email) => (r) =>
    route(`/confirm?email=${email}`, true)
  const handleForgotPasswordResults = (email) => (r) =>
    route(`/confirm-forgot-password?email=${email}`, true)
  const handleConfirmForgotPasswordResults = (email) => (r) =>
    route(`/login?email=${email}`, true)

  const loginOrLogout = jwt ? (
    <Fragment>
      <a href={logout} className="link-button">
        <button className="ostrich-button personal-margin-right">Logout</button>
      </a>
    </Fragment>
  ) : (
    <Fragment>
      <a href="/login" className="link-button">
        <button className="plain-button personal-margin-right">Login</button>
      </a>
      <a href="/signup" className="link-button">
        <button className="ostrich-button personal-margin-right">
          {' '}
          Sign Up
        </button>
      </a>
    </Fragment>
  )

  return (
    <Fragment>
      <Header children={loginOrLogout} toHome={toHome} />
      <main className="personal-space-top content">
        <Router>
          <Login
            path="/login"
            backendUrl={backendUrl}
            handleLoginResults={handleLoginResults}
            toSignup={toSignup}
            proceedWithGoogle={proceedWithGoogle}
            toForgotPassword={toForgotPassword}
          />
          <Signup
            path="/signup"
            backendUrl={backendUrl}
            handleSignupResults={handleSignupResults}
            toLogin={toLogin}
            proceedWithGoogle={proceedWithGoogle}
          />
          <Confirm
            path="/confirm"
            backendUrl={backendUrl}
            handleVerifyResults={handleVerifyResults}
          />
          <EmailerDashboard
            path="/dashboard"
            jwt={jwt}
            backendUrl={backendUrl}
            user={user}
          />
          <Logout path="/logout" backendUrl={backendUrl} />
          <ForgotPassword
            path="/forgot-password"
            backendUrl={backendUrl}
            handleForgotPasswordResults={handleForgotPasswordResults}
          />
          <ConfirmForgotPassword
            path="/confirm-forgot-password"
            backendUrl={backendUrl}
            handleConfirmForgotPasswordResults={
              handleConfirmForgotPasswordResults
            }
          />
          <Home
            path="/"
            backendUrl={backendUrl}
            jwt={jwt}
            user={user}
            toEmailerDashboard={toEmailerDashboard}
          />
        </Router>
      </main>
    </Fragment>
  )
}

entry(<App />)
