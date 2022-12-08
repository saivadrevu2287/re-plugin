import { h, Fragment } from 'preact'
import { useEffect } from 'preact/hooks'
import entry from '../build/entry'

import Header from '../components/Header'
import LogoutComp from '../components/Logout'

function Logout(props) {
  useEffect(() => {
    document.cookie = `token=`
  }, [])

  return (
    <Fragment>
      <Header />
      <LogoutComp />
    </Fragment>
  )
}

entry(<Logout />)
