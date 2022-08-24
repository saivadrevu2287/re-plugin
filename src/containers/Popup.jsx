import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import entry from '../build/entry'

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

  useEffect(() => {
    chrome.storage.sync.get('configurationFields', (data) => {
      console.log(data.configurationFields)
      setConfigurationFields(data.configurationFields)
    })
  }, [changingPage])

  const handleSignout = () => {
    const newConfigurationFields = JSON.parse(
      JSON.stringify(configurationFields)
    )
    setShowLogin(true)
    newConfigurationFields.isLoggedIn = false
    newConfigurationFields.email = ''
    setConfigurationFields(newConfigurationFields)
    chrome.storage.sync.set({ configurationFields: newConfigurationFields })
  }

  const handleLoginResults = (email) => (r) => {
    console.log(r.data.message)
    const newConfigurationFields = JSON.parse(
      JSON.stringify(configurationFields)
    )
    newConfigurationFields.isLoggedIn = true
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
    return <ListingData configurationFields={configurationFields} handleSignout={handleSignout} />
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
