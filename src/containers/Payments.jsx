import { h, Fragment } from 'preact'
import { useState } from 'preact/hooks'
import entry from '../build/entry'
import useLogin from '../hooks/useLogin'

import Payments from '../components/Payments'
import Header from '../components/Header'

const loginWithGoogleUrl =
  'https://ostrich.auth.us-east-2.amazoncognito.com/login?client_id=70apbavl1fsobed4jt7l7ml18h&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://ostr.ch'
const backendUrl = 'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1'
const logout = '/logout.html'

const toLogin = () => {}
const toHome = () => (window.location.href = '/')

function App(props) {
  const [errorMessage, setErrorMessage] = useState()
  const { user, jwt, setJwt } = useLogin(backendUrl, setErrorMessage, toLogin)

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

  return (
    <div>
      <Header children={loginOrLogout} toHome={toHome} />
      <div className="personal-space-top content">
        <h4 className="padded">Payments</h4>
        {errorMessage}
        <Payments user={user} isPayments={true} />
      </div>
    </div>
  )
}

entry(<App />)
