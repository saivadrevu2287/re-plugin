import { h, Fragment } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import axios from 'axios'
import entry from '../build/entry'

import { getUserData } from '../api/user'

import ListingData from '../components/ListingData'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Confirm from '../components/Confirm'
import ForgotPassword from '../components/ForgotPassword'
import ConfirmForgotPassword from '../components/ConfirmForgotPassword'

const backendUrl = 'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1'

export default function Popup(props) {
  const [configurationFields, setConfigurationFields] = useState(null)
  const [jwt, setJwt] = useState(null)
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState()

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
      />
    )
  } else {
    return (
      <Fragment>
        <h1>Login here!</h1>
      </Fragment>
    )
  }
}

entry(<Popup />)
