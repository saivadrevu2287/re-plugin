import { h, Fragment } from 'preact'
import { useEffect } from 'preact/hooks'
import entry from '../build/entry'

import Header from '../components/Header'

function Logout(props) {
  useEffect(() => {
    document.cookie = `token=`
  }, [])

  return (
    <Fragment>
      <Header />
      <div className='padding'>
        <h2>You are logged out!</h2>
        <a href='/'>Click here to go back home.</a>
      </div>
    </Fragment>
  )
}

entry(<Logout />)
