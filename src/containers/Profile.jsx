import Router from 'preact-router'
import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import entry from '../build/entry'
import { parseQueryParams } from '../subroutines/utils'

import axios from 'axios'

const loginWithGoogleUrl =
  'https://ostrich.auth.us-east-2.amazoncognito.com/login?client_id=70apbavl1fsobed4jt7l7ml18h&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://ostr.ch'
const backendUrl = 'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1'

function App(props) {
  const [jwt, setJwt] = useState(null)
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState()

  useEffect(() => {
    if (window.location.hash) {
      const token = parseQueryParams(window.location.hash)
      setJwt(token)
      setCookie(token)
    } else if (document.cookie) {
      const cookies = parseCookies(document.cookie)

      if (cookies.token) {
        const token = JSON.parse(cookies.token)
        setJwt(token)
      }
    }
  }, [])

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

  return (
    <div>
      <nav>
        <div className="content flex between">
          <div className="flex centered-items">
            <img
              className="header-image link-button personal-space-left"
              src="/OstrichPurple.png"
              alt="ostrich"
            />
          </div>
          <div className="flex justify-end centered-items wrap"></div>
        </div>
      </nav>
      <main className="personal-space-top content">
      </main>
    </div>
  )
}

entry(<App />)