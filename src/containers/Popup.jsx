import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import entry from '../build/entry'

import ListingData from '../components/ListingData'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Confirm from '../components/Confirm'

const loginWithGoogleUrl =
  'https://ostrich.auth.us-east-2.amazoncognito.com/login?client_id=70apbavl1fsobed4jt7l7ml18h&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://ostr.ch'
const backendUrl = 'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1'

export default function Popup(props) {
  console.log('Rendering Popup')
  const [configurationFields, setConfigurationFields] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [changingPage, setChangingPage] = useState(0)

  useEffect(() => {
    chrome.storage.sync.get('configurationFields', (data) => {
      console.log(data.configurationFields)
      setConfigurationFields(data.configurationFields)
    })
  }, [changingPage])

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

  const proceedWithGoogle = () =>
    chrome.tabs.create({ url: loginWithGoogleUrl })

  if (!configurationFields) {
    return <h5>Loading...</h5>
  }

  if (configurationFields.isLoggedIn) {
    return <ListingData configurationFields={configurationFields} />
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
