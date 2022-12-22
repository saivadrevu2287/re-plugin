import axios from 'axios'

export const deleteEmailer = (backendUrl, id, successCallback, errorCallback) =>
  axios
    .delete(`${backendUrl}/api/emailers/${id}`)
    .then(successCallback)
    .catch(errorCallback)

export const saveEmailer = (
  backendUrl,
  emailer,
  successCallback,
  errorCallback
) =>
  axios
    .post(`${backendUrl}/api/emailers`, emailer)
    .then(successCallback)
    .catch((err) => {
      console.log(err)
      if (err.response) {
        errorCallback(err.response.data.message)
      } else {
        errorCallback(err.message)
      }
    })

export const updateEmailer = (
  backendUrl,
  id,
  emailer,
  successCallback,
  errorCallback
) =>
  axios
    .put(`${backendUrl}/api/emailers`, { ...emailer, id })
    .then(successCallback)
    .catch((err) => {
      console.log(err)
      if (err.response) {
        errorCallback(err.response.data.message)
      } else {
        errorCallback(err.message)
      }
    })
