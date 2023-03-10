import { h, Fragment } from 'preact'
import { useState } from 'preact/hooks'
import Router, { route, getCurrentUrl } from 'preact-router'
import entry from '../build/entry'

import { setCookie } from '../subroutines/utils'
import useLogin from '../hooks/useLogin'

import Login from '../components/Login'
import Signup from '../components/Signup'
import Confirm from '../components/Confirm'
import Home from '../components/Home'
import Logout from '../components/Logout'
import ForgotPassword from '../components/ForgotPassword'
import ConfirmForgotPassword from '../components/ConfirmForgotPassword'
import Header from '../components/Header'

import config from '../config'

const loginWithGoogleUrl = config.loginWithGoogleUrl
const backendUrl = config.backendUrl
const emailerLink =
  'https://ostrch.notion.site/Ostrich-Emailer-08759238028f4964805e86eb8dca5cbd'
function App(props) {
  const [errorMessage, setErrorMessage] = useState()
  const { user, jwt, setJwt } = useLogin(backendUrl, setErrorMessage, () => {})

  const url = getCurrentUrl()
  console.log({ url })

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
  const dashboardLink = '/dashboard.html'
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
          Signup
        </button>
      </a>
    </Fragment>
  )

  const header = <Header children={loginOrLogout} toHome={toHome} />

  return (
    <Fragment>
      <Router>
        <main className="personal-space-top content" path="/login">
          {header}
          <Login
            backendUrl={backendUrl}
            handleLoginResults={handleLoginResults}
            toSignup={toSignup}
            proceedWithGoogle={proceedWithGoogle}
            toForgotPassword={toForgotPassword}
          />
        </main>
        <main className="personal-space-top content" path="/signup">
          {header}
          <Signup
            backendUrl={backendUrl}
            handleSignupResults={handleSignupResults}
            toLogin={toLogin}
            proceedWithGoogle={proceedWithGoogle}
          />
        </main>
        <main className="personal-space-top content" path="/confirm">
          {header}
          <Confirm
            backendUrl={backendUrl}
            handleVerifyResults={handleVerifyResults}
          />
        </main>
        <main className="personal-space-top content" path="/logout">
          {header}
          <Logout backendUrl={backendUrl} />
        </main>
        <main className="personal-space-top content" path="/forgot-password">
          {header}
          <ForgotPassword
            backendUrl={backendUrl}
            handleForgotPasswordResults={handleForgotPasswordResults}
          />
        </main>
        <main
          className="personal-space-top content"
          path="/confirm-forgot-password"
        >
          {header}
          <ConfirmForgotPassword
            backendUrl={backendUrl}
            handleConfirmForgotPasswordResults={
              handleConfirmForgotPasswordResults
            }
          />
        </main>
        <main className="personal-space-top" path="/">
          <Home
            backendUrl={backendUrl}
            jwt={jwt}
            user={user}
            dashboardLink={dashboardLink}
            header={header}
          />
        </main>
      </Router>
    </Fragment>
  )
}

entry(<App />)
