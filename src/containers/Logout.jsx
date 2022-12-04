import { h, Fragment } from 'preact'
import { useEffect } from 'preact/hooks'
import entry from '../build/entry'

import Header from '../components/Header'

function Logout(props) {
  useEffect(() => {
    document.cookie = `token=`
  }, [])

  const loginSignup = (
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
      <Header children={loginSignup} />
      <h2>You are logged out!</h2>
      <h4>Click here to log back in.</h4>
    </Fragment>
  )
}

entry(<Logout />)