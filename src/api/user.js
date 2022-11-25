import axios from 'axios'

export const getUserData = (backendUrl, successCallback, errorCallback) =>
  axios
    .get(`${backendUrl}/api/users`)
    .then((response) => successCallback(response.data))
    .catch((err) => {
      console.log(err)
      errorCallback(err.message)
    })
