import { h } from 'preact'
import { useState } from 'preact/hooks'
import entry from '../build/entry'
import useLogin from '../hooks/useLogin'

import Payments from '../components/Payments'
import Header from '../components/Header'

const loginWithGoogleUrl =
  'https://ostrich.auth.us-east-2.amazoncognito.com/login?client_id=70apbavl1fsobed4jt7l7ml18h&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://ostr.ch'
const backendUrl = 'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1'
const logout = '/logout.html'

const toLogin = () => window.location.replace('/')

function App(props) {
  const [errorMessage, setErrorMessage] = useState()
  const { user, jwt, setJwt } = useLogin(backendUrl, setErrorMessage, toLogin)
  const logout = () => {
    document.cookie = `token=`
    setJwt(null)
  }

  const toHome = () => window.location.href = '/'

  return (
    <div>
      <Header
        children={
          <a href={logout} className="link-button">
            <button className="ostrich-button personal-margin-right">Logout</button>
          </a>
        }
        toHome={toHome}
      />
      <div className="personal-space-top content">
        <h4 className="padded">Payments</h4>
        {errorMessage}
        {!user ? 'Loading!' : <Payments user={user} />}
      </div>
    </div>
  )
}

entry(<App />)
