import Router from 'preact-router'
import { h, Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { route } from 'preact-router'

import Login from '../components/Login'
import Signup from '../components/Signup'
import Confirm from '../components/Confirm'
import Profile from '../components/Profile'
import Home from '../components/Home'
import Logout from '../components/Logout'

const backendUrl = 'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1'

export default function App(props) {
  const [jwt, setJwt] = useState(null)
  useEffect(() => {}, [jwt])

  const handleLoginResults = (email) => (r) => {
    console.log(r)
    setJwt(r.data)
    route('/profile', true)
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

  const loginOrLogout = jwt ? (
    <Fragment>
      <a href="/profile">
        <div className="nav-link-button ostrich-button">Profile</div>
      </a>
      <a href="/logout">
        <div className="nav-link-button ostrich-button">Logout</div>
      </a>
    </Fragment>
  ) : (
    <Fragment>
      <a href="/">
        <div className="nav-link-button ostrich-button"> Home</div>
      </a>
      <a href="/login">
        <div className="nav-link-button ostrich-button">Login</div>
      </a>
    </Fragment>
  )

  return (
    <div>
      <nav className="ostrich-container">
        <div className="logo-container">
          <img src="/images/ostrich.new.png" alt="ostrich" height="68px" />
          <span>Ostrich Real Estate Tools</span>
        </div>
        <div className="nav-link-buttons">{loginOrLogout}</div>
      </nav>
      <main>
        <Router>
          <Login
            path="/login"
            backendUrl={backendUrl}
            handleLoginResults={handleLoginResults}
            toSignup={toSignup}
          />
          <Signup
            path="/signup"
            backendUrl={backendUrl}
            handleSignupResults={handleSignupResults}
            toLogin={toLogin}
          />
          <Confirm
            path="/confirm"
            backendUrl={backendUrl}
            handleVerifyResults={handleVerifyResults}
          />
          <Profile path="/profile" jwt={jwt} backendUrl={backendUrl} />
          <Logout path="/logout" backendUrl={backendUrl} />
          <Home path="/" backendUrl={backendUrl} />
        </Router>
        <footer class="align-center ostrich-container">
          Ostrich Tools Ltd.
        </footer>
      </main>
    </div>
  )
}
