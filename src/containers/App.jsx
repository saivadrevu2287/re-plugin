import Router from 'preact-router'
import { h, Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { route } from 'preact-router'
import entry from '../build/entry'
import { parseQueryParams } from '../subroutines/utils'

import Login from '../components/Login'
import Signup from '../components/Signup'
import Confirm from '../components/Confirm'
import EmailerDashboard from '../components/EmailerDashboard'
import Home from '../components/Home'
import Logout from '../components/Logout'
import ForgotPassword from '../components/ForgotPassword'
import ConfirmForgotPassword from '../components/ConfirmForgotPassword'
import axios from 'axios'

const loginWithGoogleUrl =
  'https://ostrich.auth.us-east-2.amazoncognito.com/login?client_id=70apbavl1fsobed4jt7l7ml18h&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://ostr.ch/email.html'
const backendUrl = 'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1'

function App(props) {
  const [jwt, setJwt] = useState(null)
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState()

  useEffect(() => {
    if (jwt) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt.id_token}`

      axios
        .get(`${backendUrl}/api/users`)
        .then((r) => {
          setUser(r.data)
        })
        .catch((e) => {
          setErrorMessage(e.response.data.message)
        })
    }
  }, [jwt])

  useEffect(() => {
    if (window.location.hash) {
      setJwt(parseQueryParams(window.location.hash))
      route('/email.html', true)
    }
  }, [])

  const handleLoginResults = (email) => (r) => {
    setJwt(r.data)
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
  const toHome = () => route('/email.html')
  const toForgotPassword = () => route('/forgot-password')
  const proceedWithGoogle = () => (window.location.href = loginWithGoogleUrl)

  const loginOrLogout = jwt ? (
    <Fragment>
      <a href="/">
        <button className="plain-button personal-margin-right">Profile</button>
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
      <footer class="align-center">Ostrich Tools Ltd.</footer>
    </Fragment>
  )
}

entry(<App />)
