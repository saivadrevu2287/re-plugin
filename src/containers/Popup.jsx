import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import ListingData from '../components/ListingData'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Confirm from '../components/Confirm'

const loginWithGoogleUrl =
  'https://ostrich.auth.us-east-2.amazoncognito.com/login?client_id=70apbavl1fsobed4jt7l7ml18h&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://rehacks.io/ostrich-token'

export default function Popup(props) {
  console.log('Rendering Popup')
  const [configurationFields, setConfigurationFields] = useState(null)
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    chrome.storage.sync.get('configurationFields', (data) => {
      console.log(data.configurationFields)
      setConfigurationFields(data.configurationFields)
    })
  }, [])

  const proceedWithGoogle = () =>
    chrome.tabs.create({ url: loginWithGoogleUrl })

  if (!configurationFields) {
    return <h1>Loading...</h1>
  }

  if (configurationFields.isLoggedIn) {
    return <ListingData configurationFields={configurationFields} />
  }

  if (configurationFields.needsVerification) {
    return (
      <Confirm
        configurationFields={configurationFields}
        setConfigurationFields={setConfigurationFields}
      />
    )
  }

  if (showLogin) {
    return (
      <Login
        configurationFields={configurationFields}
        toSignup={() => setShowLogin(false)}
        setConfigurationFields={setConfigurationFields}
        proceedWithGoogle={proceedWithGoogle}
      />
    )
  } else {
    return (
      <Signup
        configurationFields={configurationFields}
        toLogin={() => setShowLogin(true)}
        setConfigurationFields={setConfigurationFields}
        proceedWithGoogle={proceedWithGoogle}
      />
    )
  }
}
