import Router from 'preact-router'
import { h, Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { route } from 'preact-router'
import entry from '../build/entry'
import { parseQueryParams } from '../subroutines/utils'

import Login from '../components/Login'
import Signup from '../components/Signup'
import Confirm from '../components/Confirm'
import Profile from '../components/Profile'
import Home from '../components/Home'
import Logout from '../components/Logout'

const loginWithGoogleUrl =
  'https://ostrich.auth.us-east-2.amazoncognito.com/login?client_id=70apbavl1fsobed4jt7l7ml18h&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://ostr.ch'
const backendUrl = 'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1'

function App(props) {
  const [jwt, setJwt] = useState(null)
  useEffect(() => {}, [jwt])

  useEffect(() => {
    if (window.location.hash) {
      setJwt(parseQueryParams(window.location.hash))
    }
  }, [])

  const handleLoginResults = (email) => (r) => {
    console.log(r)
    setJwt(r.data)
    // route('/profile', true)
  }

  const handleVerifyResults = (email) => (r) => {
    route(`/login?email=${email}`, true)
  }

  const handleSignupResults = (email) => (r) => {
    route(`/confirm?email=${email}`, true)
  }

  const toSignup = () => {
    route('/signup')
  }

  const toLogin = () => {
    route('/login')
  }

  const toProfile = () => {
    route('/profile')
  }

  const toHome = () => {
    route('/')
  }

  const proceedWithGoogle = () => window.open(loginWithGoogleUrl, '_blank')

  const loginOrLogout = jwt ? (
    <Fragment>
      <a href="/profile" className="link-button">
        <button className="ostrich-button personal-space-right">Profile</button>
      </a>
    </Fragment>
  ) : (
    <Fragment>
      <a href="/" className="link-button">
        <button className="ostrich-button personal-space-right"> Home</button>
      </a>
      <a href="/login" className="link-button">
        <button className="ostrich-button personal-space-right">Login</button>
      </a>
    </Fragment>
  )

  return (
    <div>
      <nav className="ostrich-container">
        <div className="flex centered-items">
          <img
            className="header-image link-button"
            src="/ostrich.new.png"
            alt="ostrich"
            onClick={toHome}
          />
          <span className="header-title personal-space-left">
            Ostrich Real Estate Tools
          </span>
        </div>
        <div className="flex justify-end centered-items wrap">
          {loginOrLogout}
        </div>
      </nav>
      <main className="personal-space-top">
        <Router>
          <Login
            path="/login"
            backendUrl={backendUrl}
            handleLoginResults={handleLoginResults}
            toSignup={toSignup}
            proceedWithGoogle={proceedWithGoogle}
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
          <Profile path="/profile" jwt={jwt} backendUrl={backendUrl} />
          <Logout path="/logout" backendUrl={backendUrl} />
          <Home
            path="/"
            backendUrl={backendUrl}
            jwt={jwt}
            toProfile={toProfile}
          />
        </Router>
      </main>
      <footer class="align-center">Ostrich Tools Ltd.</footer>
    </div>
  )
}

entry(<App />)
