import Router from 'preact-router'
import { h, Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { route } from 'preact-router'
import entry from '../build/entry'
import axios from 'axios'

import { parseQueryParams, parseCookies, setCookie } from '../subroutines/utils'
import { getUserData } from '../api/user'

import Login from '../components/Login'
import Signup from '../components/Signup'
import Confirm from '../components/Confirm'
import EmailerDashboard from '../components/EmailerDashboard'
import Home from '../components/Home'
import Logout from '../components/Logout'
import ForgotPassword from '../components/ForgotPassword'
import ConfirmForgotPassword from '../components/ConfirmForgotPassword'

const loginWithGoogleUrl =
  'https://ostrich.auth.us-east-2.amazoncognito.com/login?client_id=70apbavl1fsobed4jt7l7ml18h&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://ostr.ch/email.html'
const backendUrl = 'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1'

function App(props) {
  const [jwt, setJwt] = useState(null)
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState()

  useEffect(() => {
    if (!jwt) {
      return
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt.id_token}`
    getUserData(
      backendUrl,
      (data) => {
        setUser(data)
      },
      (e) => {
        setErrorMessage(e.response.data.message)
      }
    )
  }, [jwt])

  useEffect(() => {
    // login when there is login with google
    if (window.location.hash) {
      const token = parseQueryParams(window.location.hash)
      setJwt(token)
      setCookie(token)
    }
    // login when there is a cookie
    else if (document.cookie) {
      const cookies = parseCookies(document.cookie)
      if (cookies.token) {
        const token = JSON.parse(cookies.token)
        setJwt(token)
      }
    }
  }, [])

  const handleLoginResults = (_) => (r) => {
    setJwt(r)
    setCookie(r)
    route('/email.html', true)
  }

  const handleVerifyResults = (email) => (r) =>
    route(`/login?email=${email}`, true)
  const handleSignupResults = (email) => (r) =>
    route(`/confirm?email=${email}`, true)
  const handleForgotPasswordResults = (email) => (r) =>
    route(`/confirm-forgot-password?email=${email}`, true)
  const handleConfirmForgotPasswordResults = (email) => (r) =>
    route(`/login?email=${email}`, true)

  const toSignup = () => route('/signup')
  const toLogin = () => route('/login')
  const toEmailerDashboard = () => route('/dashboard')
  const toHome = () => route('/')
  const toForgotPassword = () => route('/forgot-password')
  const proceedWithGoogle = () => (window.location.href = loginWithGoogleUrl)
  const logout = () => {
    document.cookie = `token=`
    setJwt(null)
  }

  const loginOrLogout = jwt ? (
    <Fragment>
      <button className="plain-button personal-margin-right" onClick={logout}>
        Logout
      </button>
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
      <nav>
        <div className="content flex between">
          <div className="flex centered-items">
            <img
              className="header-image link-button personal-space-left"
              src="/OstrichPurple.png"
              alt="ostrich"
              onClick={toHome}
            />
          </div>
          <div className="flex justify-end centered-items wrap">
            {loginOrLogout}
          </div>
        </div>
      </nav>
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
            path="/email.html"
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
