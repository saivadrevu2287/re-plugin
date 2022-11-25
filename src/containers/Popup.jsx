import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import axios from 'axios'
import entry from '../build/entry'

import { getUserData } from '../api/user'
import { refreshToken } from '../api/auth'

import ListingData from '../components/ListingData'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Confirm from '../components/Confirm'
import ForgotPassword from '../components/ForgotPassword'
import ConfirmForgotPassword from '../components/ConfirmForgotPassword'

const loginWithGoogleUrl =
  'https://ostrich.auth.us-east-2.amazoncognito.com/login?client_id=70apbavl1fsobed4jt7l7ml18h&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://ostr.ch'
const backendUrl = 'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1'

export default function Popup(props) {
  console.log('Rendering Popup')

  const [configurationFields, setConfigurationFields] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [showForgotPasswordCode, setShowForgotPasswordCode] = useState(false)
  const [changingPage, setChangingPage] = useState(0)
  const [user, setUser] = useState(null)

  useEffect(() => {
    chrome.storage.sync.get('configurationFields', (data) => {
      console.log(data.configurationFields)
      setConfigurationFields(data.configurationFields)

      if (data.configurationFields.jwt) {
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data.configurationFields.jwt.id_token}`

        getUserData(
          backendUrl,
          (r) => {
            setUser(r)
          },
          (e) => {
            console.log({m: "refreshing", username: data.configurationFields.email,
            refresh_token: data.configurationFields.jwt.refresh_token,})
            refreshToken(
              backendUrl,
              {
                username: data.configurationFields.email,
                refresh_token: data.configurationFields.jwt.refresh_token,
              },
              (r) => {
                console.log({r, m: "refreshing"})
                axios.defaults.headers.common[
                  'Authorization'
                ] = `Bearer ${r.id_token}`
                getUserData(
                  backendUrl,
                  (r) => {
                    setUser(r)
                  },
                  e => console.log(e)
                )

                const newConfigurationFields = JSON.parse(
                  JSON.stringify(configurationFields)
                )
                setShowLogin(true)
                newConfigurationFields.jwt.id_token = r.id_token
                setConfigurationFields(newConfigurationFields)
                chrome.storage.sync.set({ configurationFields: newConfigurationFields })
              },
              (e) => console.log(e)
            )
          }
        )
      }
    })
  }, [changingPage])

  const handleSignout = () => {
    const newConfigurationFields = JSON.parse(
      JSON.stringify(configurationFields)
    )
    setShowLogin(true)
    newConfigurationFields.isLoggedIn = false
    newConfigurationFields.email = ''
    newConfigurationFields.jwt = null
    setConfigurationFields(newConfigurationFields)
    chrome.storage.sync.set({ configurationFields: newConfigurationFields })
  }

  const handleLoginResults = (email) => (jwt) => {
    const newConfigurationFields = JSON.parse(
      JSON.stringify(configurationFields)
    )
    newConfigurationFields.isLoggedIn = true
    newConfigurationFields.jwt = jwt
    newConfigurationFields.email = email
    setConfigurationFields(newConfigurationFields)
    chrome.storage.sync.set({ configurationFields: newConfigurationFields })
    setChangingPage((x) => x + 1)
  }

  const handleSignupResults = (email) => (r) => {
    console.log(r.data.message)
    const newConfigurationFields = JSON.parse(
      JSON.stringify(configurationFields)
    )
    newConfigurationFields.email = email
    newConfigurationFields.needsVerification = true
    setConfigurationFields(newConfigurationFields)
    chrome.storage.sync.set({ configurationFields: newConfigurationFields })
    setChangingPage((x) => x + 1)
  }

  const handleVerifyResults = (email) => (r) => {
    console.log(r.data.message)
    const newConfigurationFields = JSON.parse(
      JSON.stringify(configurationFields)
    )
    newConfigurationFields.isLoggedIn = true
    newConfigurationFields.needsVerification = false
    setConfigurationFields(newConfigurationFields)
    chrome.storage.sync.set({ configurationFields: newConfigurationFields })
    setChangingPage((x) => x + 1)
  }

  const handleForgotPasswordResults = (email) => (r) => {
    setShowLogin(false)
    setShowForgotPassword(false)
    setShowForgotPasswordCode(true)
    const newConfigurationFields = JSON.parse(
      JSON.stringify(configurationFields)
    )
    newConfigurationFields.email = email
    setConfigurationFields(newConfigurationFields)
    chrome.storage.sync.set({ configurationFields: newConfigurationFields })
  }

  const handleConfirmForgotPasswordResults = (email) => (r) => {
    setShowLogin(true)
    setShowForgotPasswordCode(false)
    const newConfigurationFields = JSON.parse(
      JSON.stringify(configurationFields)
    )
    newConfigurationFields.email = email
    setConfigurationFields(newConfigurationFields)
    chrome.storage.sync.set({ configurationFields: newConfigurationFields })
  }

  const proceedWithGoogle = () =>
    chrome.tabs.create({ url: loginWithGoogleUrl })

  if (!configurationFields) {
    return <h5>Loading...</h5>
  }

  if (showForgotPassword) {
    return (
      <ForgotPassword
        backendUrl={backendUrl}
        handleForgotPasswordResults={handleForgotPasswordResults}
      />
    )
  }

  if (showForgotPasswordCode) {
    return (
      <ConfirmForgotPassword
        email={configurationFields.email}
        backendUrl={backendUrl}
        handleConfirmForgotPasswordResults={handleConfirmForgotPasswordResults}
      />
    )
  }

  if (configurationFields.isLoggedIn) {
    return (
      <ListingData
        configurationFields={configurationFields}
        backendUrl={backendUrl}
        user={user}
        handleSignout={handleSignout}
      />
    )
  }

  if (configurationFields.needsVerification) {
    return (
      <Confirm
        handleVerifyResults={handleVerifyResults}
        backendUrl={backendUrl}
        email={configurationFields.email}
      />
    )
  }

  if (showLogin) {
    return (
      <Login
        handleLoginResults={handleLoginResults}
        toSignup={() => setShowLogin(false)}
        toForgotPassword={() => setShowForgotPassword(true)}
        proceedWithGoogle={proceedWithGoogle}
        backendUrl={backendUrl}
      />
    )
  } else {
    return (
      <Signup
        handleSignupResults={handleSignupResults}
        toLogin={() => setShowLogin(true)}
        proceedWithGoogle={proceedWithGoogle}
        backendUrl={backendUrl}
      />
    )
  }
}

entry(<Popup />)
