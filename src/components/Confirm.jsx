import { h } from 'preact'
import { useState } from 'preact/hooks'
import axios from 'axios'

const eliminateEvent = (callback) => (event) => callback(event.target.value)
const verifyCodeUrl =
  'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1/auth/verify'
const resendCodeUrl =
  'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1/auth/resend-code'

export default function Confirm(props) {
  const { configurationFields, setConfigurationFields } = props
  const [code, setCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const verify = () => {
    axios
      .post(verifyCodeUrl, {
        username: configurationFields.email,
        code: code,
      })
      .then((r) => {
        console.log(r.data.message)
        const newConfigurationFields = JSON.parse(
          JSON.stringify(configurationFields)
        )
        newConfigurationFields.isLoggedIn = true
        newConfigurationFields.needsVerification = false
        setConfigurationFields(newConfigurationFields)
        chrome.storage.sync.set({ configurationFields: newConfigurationFields })
      })
      .catch((e) => {
        console.log(e)
        setErrorMessage(e.response.data.message)
      })
  }

  const resendCode = () => {
    axios
      .post(resendCodeUrl, {
        username: configurationFields.email,
      })
      .then((r) => {
        console.log(r.data.message)
        setErrorMessage(r.data.message)
      })
      .catch((e) => {
        console.log(e)
        setErrorMessage(e.response.data.message)
      })
  }

  return (
    <div id="verify-container">
      <h5>
        Please Enter the Verification Code sent to your Email (
        {configurationFields.email}).
      </h5>
      <label for="code">
        Code:
        <input
          id="code-input"
          name="code"
          value={code}
          onInput={eliminateEvent(setCode)}
        />
      </label>
      <button type="submit" id="submit-verify" onClick={verify}>
        Submit
      </button>
      <button id="resend-code" onClick={resendCode}>
        Resend Code
      </button>
      <p>{errorMessage}</p>
    </div>
  )
}
