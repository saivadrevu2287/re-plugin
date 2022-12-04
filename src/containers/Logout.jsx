import { h, Fragment } from 'preact'
import { useEffect } from 'preact/hooks'
import entry from '../build/entry'

import Header from '../components/Header'

function Logout(props) {
  useEffect(() => {
    document.cookie = `token=`
    window.location.href = '/'
  }, [])

  return (
    <Fragment>
      <Header />
      <h2>Loading!</h2>
    </Fragment>
  )
}

entry(<Logout />)
