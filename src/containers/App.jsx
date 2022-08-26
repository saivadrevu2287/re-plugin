import Router from 'preact-router'
import { h, Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { route } from 'preact-router'
import entry from '../build/entry'
import { parseQueryParams } from '../subroutines/utils'

import Login from '../components/Login'
import Signup from '../components/Signup'
import Confirm from '../components/Confirm'
import EmailerDashboard from '../components/EmailerDashboard'
import Home from '../components/Home'
import Logout from '../components/Logout'
import ForgotPassword from '../components/ForgotPassword'
import ConfirmForgotPassword from '../components/ConfirmForgotPassword'
import axios from 'axios'

const loginWithGoogleUrl =
  'https://ostrich.auth.us-east-2.amazoncognito.com/login?client_id=70apbavl1fsobed4jt7l7ml18h&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://ostr.ch'
const backendUrl = 'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1'

function App(props) {
  const [jwt, setJwt] = useState({
    access_token:
      'eyJraWQiOiJDMGc2RXJHRUdPVTgxd3BOV3VIMlRBTXFOQzFFWnN1SHRUMUFzclE5cm5nPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmZTRlYTgwNi0wYjdlLTQ3NzYtYTI1Mi0xNTBhZGJhYjgxMGIiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9ubmQzaDVaMVoiLCJjbGllbnRfaWQiOiI3MGFwYmF2bDFmc29iZWQ0anQ3bDdtbDE4aCIsIm9yaWdpbl9qdGkiOiJiNzg2YmEzZS1mZWE0LTRlYzktOTk0Mi05ODMxYmU5Y2QxZmEiLCJldmVudF9pZCI6IjAwNjRiZWFkLTVkYzMtNDBhYS1iMzNmLTg1NjZiMDA1NDc5OCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NjE1MTY3MjgsImV4cCI6MTY2MTUyMDMyOCwiaWF0IjoxNjYxNTE2NzI4LCJqdGkiOiJkOWUyMDZmOC00YTVmLTRlZjAtYTdiYi04NDAxZmE5NTQ3OTMiLCJ1c2VybmFtZSI6ImhnbWF4d2VsbGtpbmdAZ21haWwuY29tIn0.ge5PXtuJx8HTsfBFmti1Kfp5fYr2UQ2F9JGupEtHZfrsEs7HMCJ52pY0xy0JaUw5DRlOTJf642jpcoMFCijpF2JNE_JQCvlBkSPVzgbQChfYQln4vfAHtLtibhQwV4rQF0oqa6VA0DIv5xYLjycra36fTy56fLJ5RTVxQ5iUtLydAvyjTIWMhmR38S6T53gQ5xZe-roRtRYACV84T7FFPc-M5XOOQIOJXmbMhHryxVuOfMea1-cCG2ANmd-7WnbpuwlpXESyG2PIwMPdpGvDoXMKzWBQuh2b1H_lzTDczbEjGH7ZELOcGP4g3GzwcBZHHqpTYUn4cKGJxuTO1k_onA',
    expires_in: 3600,
    token_type: 'Bearer',
    refresh_token:
      'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.Fv5k9vsj8DoqZAkrqNBI_UPuJietQ5nW6bsaE9niTfVT2YSMLa1QouyS8s0wRrJIRQBmRV1K5q9PwRTAUhe0tOBw0ys0FvdG4r7GF_HKmi1bStKyAF2yF5YVaqt8ffI9Ud6GgMt9WzkPOqnI_q_gFurXvu8Xoefp68jmQLmkvOmX8q3V9EJmH9ik05W2o6w53ySj9fpfxRue6PKdSF-v1bBGKWiMV__el0qYk4uEJRJlsuvRJV1ZU0pZOE9yhQAoEmfPuLkKLJX6x6C7tQ7-gZiuGcdZNH51yyyp1Ue6ce2OopwkgkwK3PjVMXBmHslMToIF-l38lWZ4yoJsErJ_cg.WOGBjjdkCMKbkCnq.e6fMmjmbMR_VGklFg5BowTDnRFvrI7noAUGA-kKlJVlpSV3W48SSPDewauGzWSD-irbzYWbt_r1o2zPpWCyc_fmUd4jHTP5eSk_YymB5aScIjCdrYA9Ir4drrEI0PMxLFdwlpVofDccSrps3RBTEemrmV2n2j40qDeJ6V44GTdS5MnncbEI68_FOWaWooXiRjcEPbT_eJ9UpLs2oErxe6wBgf8ADFnbB3rxloHJFE8qC1_ug2p7Rp8fdgCo90MSyLmQ75_qe-MrY6FF7DSItDN0_V9kniyvS6M5PL5soUWCFt_mG3XKs4U2DEdxP6H-z-P5nbS1UJQa4cPf0w7SWhgIrur1CktzywbYFv7fu8MOXXrLCCIMCj3g-VYbh2za7zYOkSI17KDoOIF1bVrS6TgL3v8AVZlOhzvMpLZAUC2i10ylxZ5Iyr4xMIJGWJfX4090Y-Yhr6eo8iMiLi5Plx4yeRQsCICgGLY-jhnHqlSdrSsMSQNLezkvlOMY5su4IfXvImIJn5IESNEol83_y6W-MYqeP1rCePBoRjjutKjXS6LpTjmCnvmVpLDdxSjsuVsSjrC4WSXOW2dZ259qQIt85uKqwR3G8AepWAnmlVMuZ2IPbme69uxrTIQ291-FxI8NigjbLGEpO253bQB-iWjLVm3hfakrWaRgfgrVxc9ZAPzKaD8EpAQUSKxqONbJrbRifEGfrIyGOiEftNTBfYq-abq-K-PRjqlw5HcgxW6XgYGhoqVD8wUSml_10oL5nf0K_eZiKCz-Dry_qq7mDJeQp4wTAYCxJ94ZT361OtiHeExSpA90cdNivqutKNS27Xyq3RRztaWXG4m_4fgsqYZM_ZJw7ztJlStouy1YuVPs8xO5XCw2SM9PzjQZcqsG2Q_Jj_3h8G6vJw46lQmoha0nS6dhJcaqkiK2efeGkhkGpO0VrU5poxhopNI5qn6lS-qdGjr4PxK1KfF0CydAuFMbxN01LQGZec878c0WRvxO5jrs0yf7NZJ3wAJn4HlTxJf1dOdVd1Gnkt7XV8tl0Y-6-We9CbDWzwKQ0HdbN5KPs_RQidWhKcGVbqiZz-3gG6tx-0BgaHRgrL7iVTIHutcpqiOFOWdQh3gQxfOZp_TSHMkwCUudXZiuKErvEpCj1AQgXxDz5vd1z3iXDDktYZ1d4gAN95OfXo45PXmvs24E03oy1jUZr1d9b62H5GdLjHiJjhnbQ4PK63hN0Dq7Y-u5otZ9_UFshS34Unra-4PnYq78OqWPQhVOx-vb2PIEKXlZs0goIgZBbvhA7DzxgicRpdoklaFX_0gVucKo.f9veToCm3GvsY_3qeWEQuA',
    id_token:
      'eyJraWQiOiJzUWpVT3MwQnBLTEtWYTVzS1pcL3REM1Q2VFA3OHliSGxxbFhEejA0Nnh5VT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJmZTRlYTgwNi0wYjdlLTQ3NzYtYTI1Mi0xNTBhZGJhYjgxMGIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfbm5kM2g1WjFaIiwiY29nbml0bzp1c2VybmFtZSI6ImhnbWF4d2VsbGtpbmdAZ21haWwuY29tIiwib3JpZ2luX2p0aSI6ImI3ODZiYTNlLWZlYTQtNGVjOS05OTQyLTk4MzFiZTljZDFmYSIsImF1ZCI6IjcwYXBiYXZsMWZzb2JlZDRqdDdsN21sMThoIiwiZXZlbnRfaWQiOiIwMDY0YmVhZC01ZGMzLTQwYWEtYjMzZi04NTY2YjAwNTQ3OTgiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY2MTUxNjcyOCwiZXhwIjoxNjYxNTIwMzI4LCJpYXQiOjE2NjE1MTY3MjgsImp0aSI6ImRiZmJjMTNkLWM2NjMtNDJkNS1hNTk1LWExMWJkNWE3ZmE5MCIsImVtYWlsIjoiaGdtYXh3ZWxsa2luZ0BnbWFpbC5jb20ifQ.UK3EeQFrJjG6w6T590yvw6tCGD8eNR8Sj--H92fSeQyv8W73sd0jD_FoUeyGU9q6Lf6WVqMi4mRRJV6Dj5uN_0JYvQ1hLdwyFMdph_Nja_DD7DeyOrY8bkoqBkN8sRDJu550nNenmdTl7pc-RqTT03QKXT6FphM1oR4Y5mLtVk5rN0M1ujwLzAgJRfZknIeXGNUlaRDxY2FXVF7CchJ9uvhAf_xhCn9VZWVROoBkhHgoM0hi2HprBSrUBtP5EmwjHpVxhClcI4ElqOELFpl82ORbcbtFYhCs1FCyl3tF7ZafnEPkmPv8wF3iaM8OYr6Dm8kEaU4WJOtKwNdHoCMAJA',
  })
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (jwt) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt.id_token}`

      axios
        .get(`${backendUrl}/api/users`)
        .then((r) => {
          setUser(r.data)
        })
        .catch((e) => {
          setErrorMessage(e.response.data.message)
        })
    }
  }, [jwt])

  useEffect(() => {
    if (window.location.hash) {
      setJwt(parseQueryParams(window.location.hash))
    }
  }, [])

  const handleLoginResults = (email) => (r) => {
    setJwt(r.data)
    route('/', true)
  }
  const handleVerifyResults = (email) => (r) =>
    route(`/login?email=${email}`, true)
  const handleSignupResults = (email) => (r) =>
    route(`/confirm?email=${email}`, true)
  const handleForgotPasswordResults = (email) => (r) =>
    route(`/confirm-forgot-password?email=${email}`, true)
  const handleConfirmForgotPasswordResults = (email) => (r) =>
    route(`/login?email=${email}`, true)

  const toSignup = () => route('/signup')
  const toLogin = () => route('/login')
  const toEmailerDashboard = () => route('/dashboard')
  const toHome = () => route('/')
  const toForgotPassword = () => route('/forgot-password')
  const proceedWithGoogle = () => (window.location.href = loginWithGoogleUrl)

  const loginOrLogout = jwt ? (
    <Fragment>
      <a href="/">
        <button className="plain-button personal-space-right">
          Profile 👤
        </button>
      </a>
    </Fragment>
  ) : (
    <Fragment>
      <a href="/login" className="link-button">
        <button className="plain-button personal-space-right">Login</button>
      </a>
      <a href="/signup" className="link-button">
        <button className="ostrich-button personal-space-right">
          {' '}
          Sign Up
        </button>
      </a>
    </Fragment>
  )

  return (
    <div>
      <nav className="ostrich-container">
        <div className="flex centered-items">
          <img
            className="header-image link-button"
            src="/ostrich.new.png"
            alt="ostrich"
            onClick={toHome}
          />
          <span className="header-title personal-space-left">
            Ostrich Real Estate Tools
          </span>
        </div>
        <div className="flex justify-end centered-items wrap">
          {loginOrLogout}
        </div>
      </nav>
      <main className="personal-space-top">
        <Router>
          <Login
            path="/login"
            backendUrl={backendUrl}
            handleLoginResults={handleLoginResults}
            toSignup={toSignup}
            proceedWithGoogle={proceedWithGoogle}
            toForgotPassword={toForgotPassword}
          />
          <Signup
            path="/signup"
            backendUrl={backendUrl}
            handleSignupResults={handleSignupResults}
            toLogin={toLogin}
            proceedWithGoogle={proceedWithGoogle}
          />
          <Confirm
            path="/confirm"
            backendUrl={backendUrl}
            handleVerifyResults={handleVerifyResults}
          />
          <EmailerDashboard
            path="/dashboard"
            jwt={jwt}
            backendUrl={backendUrl}
            user={user}
          />
          <Logout path="/logout" backendUrl={backendUrl} />
          <ForgotPassword
            path="/forgot-password"
            backendUrl={backendUrl}
            handleForgotPasswordResults={handleForgotPasswordResults}
          />
          <ConfirmForgotPassword
            path="/confirm-forgot-password"
            backendUrl={backendUrl}
            handleConfirmForgotPasswordResults={
              handleConfirmForgotPasswordResults
            }
          />
          <Home
            path="/"
            backendUrl={backendUrl}
            jwt={jwt}
            user={user}
            toEmailerDashboard={toEmailerDashboard}
          />
        </Router>
      </main>
      <footer class="align-center">Ostrich Tools Ltd.</footer>
    </div>
  )
}

entry(<App />)
