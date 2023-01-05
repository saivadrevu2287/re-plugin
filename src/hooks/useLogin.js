import { useState, useEffect } from 'preact/hooks'
import axios from 'axios'

import { parseQueryParams, parseCookies, setCookie } from '../subroutines/utils'
import { getUserData } from '../api/user'

const useLogin = (backendUrl, setErrorMessage, toLogin) => {
  const [jwt, setJwt] = useState(null)
  const [user, setUser] = useState(null)

  // when we get a jwt, get your user information
  useEffect(() => {
    if (!jwt) {
      return
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt.id_token}`
    getUserData(
      backendUrl,
      (data) => setUser(data),
      (error) => {
        if (error.code == "ERR_NETWORK") {
          setJwt(null)
          setCookie('')
          toLogin()
        } else {
          console.log({...error})
        }
      }
    )
  }, [jwt])

  useEffect(() => {
    // login when there is login with google
    if (window.location.hash) {
      console.log('login from hash')
      const token = parseQueryParams(window.location.hash)
      console.log(token)
      if (token.id_token) {
        setJwt(token)
        setCookie(token)
      }
    }
    // login when there is a cookie
    else if (document.cookie) {
      console.log('login from cookie')
      const cookies = parseCookies(document.cookie)
      if (cookies.token) {
        const token = JSON.parse(cookies.token)
        setJwt(token)
      } else {
        toLogin()
      }
    }
  }, [])

  return {
    user,
    jwt,
    setJwt,
  }
}

export default useLogin
