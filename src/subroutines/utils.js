export const handleCopy = (calculations, csvSeparator) => {
  const toCsv = (obj) =>
    Object.keys(obj).reduce(
      (acc, key) => `${acc}${obj[key]}${csvSeparator}`,
      ''
    )
  const copy = function (e) {
    e.preventDefault()
    const text = toCsv(calculations)
    console.log({ m: 'handleCopy', text })
    if (e.clipboardData) {
      e.clipboardData.setData('text/plain', text)
    } else if (window.clipboardData) {
      window.clipboardData.setData('Text', text)
    }
  }

  window.addEventListener('copy', copy)
  document.execCommand('copy')
  window.removeEventListener('copy', copy)
}

export const monthlyDollars = (n) =>
  isNaN(n) ? 'N/A' : `$${n.toLocaleString()}/mo`

export const dollars = (n) => (isNaN(n) ? 'N/A' : `$${n.toLocaleString()}`)

export const parseJwt = (token) => {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}

export const parseQueryParams = (search) =>
  search
    .slice(1)
    .split('&')
    .map((e) => e.split('='))
    .reduce((acc, pair) => {
      acc[pair[0]] = pair[1]
      return acc
    }, {})

export const parseCookies = (cookies) =>
  cookies
    .split('; ')
    .map((e) => e.split('='))
    .reduce((acc, pair) => {
      acc[pair[0]] = pair[1]
      return acc
    }, {})

export const setCookie = (token) => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const strigifiedToken = JSON.stringify(token)
  const expireDate = tomorrow.toUTCString()

  document.cookie = `token=${strigifiedToken};expires=${expireDate}`
}
