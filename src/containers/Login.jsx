import { h, Fragment } from 'preact'
import { useEffect } from 'preact/hooks'
import entry from '../build/entry'
import { parseCookies } from '../subroutines/utils'

import Header from '../components/Header'

function Login(props) {
  useEffect(() => {
    if (document.cookie) {
      console.log('cookie')
      const cookies = parseCookies(document.cookie)
      if (cookies.token) {
        const token = JSON.parse(cookies.token)
        const jwtHash = token
          ? Object.keys(token)
              .map((key) => `${key}=${token[key]}`)
              .join('&')
          : ''
        window.location.href = `/#${jwtHash}`
      } else {
        window.location.href = `/`
      }
    }
  }, [])

  return (
    <Fragment>
      <Header />
      <h2>Loading!</h2>
    </Fragment>
  )
}

entry(<Login />)
