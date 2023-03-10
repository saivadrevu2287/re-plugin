import { h, Fragment } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import axios from 'axios'
import entry from '../build/entry'

import { getUserData } from '../api/user'

import ListingData from '../components/ListingData'
import PluginLoginButton from '../components/PluginLoginButton'

const backendUrl = 'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1'
const webappUrl = 'https://ostrich.so/login.html'

export default function Popup(props) {
  const [configurationFields, setConfigurationFields] = useState(null)
  const [jwt, setJwt] = useState(null)
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState()
  console.log({configurationFields})
  useEffect(() => {
    if (!jwt) {
      return
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt.id_token}`
    getUserData(
      backendUrl,
      (data) => {
        setUser(data)
      },
      (e) => {
        setErrorMessage(e.response.data.message)
      }
    )
  }, [jwt])

  useEffect(() => {
    chrome.storage.sync.get('configurationFields', (data) => {
      console.log(data.configurationFields)
      setConfigurationFields(data.configurationFields)

      if (data.configurationFields.jwt) {
        setJwt(data.configurationFields.jwt)
      } else {
      }
    })
  }, [])

  if (!configurationFields) {
    return (
      <div className="align-center personal-space-top">
        <h6>Loading...</h6>
      </div>
    )
  }

  if (configurationFields.jwt) {
    return (
      <ListingData
        configurationFields={configurationFields}
        backendUrl={backendUrl}
        user={user}
        webappUrl={webappUrl}
      />
    )
  } else {
    return <PluginLoginButton webappUrl={webappUrl} />
  }
}

entry(<Popup />)
