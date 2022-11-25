import axios from 'axios'

export const login = (
  backendUrl,
  loginPayload,
  successCallback,
  errorCallback
) =>
  axios
    .post(`${backendUrl}/auth/login`, loginPayload)
    .then((response) => successCallback(response.data))
    .catch((err) => {
      console.log(err)
      if (err.response) {
        errorCallback(err.response.data.message)
      } else {
        errorCallback(err.message)
      }
    })

export const refreshToken = (
  backendUrl,
  refreshObject,
  successCallback,
  errorCallback
) =>
  axios
    .post(`${backendUrl}/auth/refresh`, refreshObject)
    .then((response) => successCallback(response.data))
    .catch((err) => {
      console.log(err)
      if (err.response) {
        errorCallback(err.response.data.message)
      } else {
        errorCallback(err.message)
      }
    })
