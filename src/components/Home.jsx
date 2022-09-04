import { h, Fragment } from 'preact'
import Splash from './Splash'
import EmailerDashboard from './EmailerDashboard'

export default function Home(props) {
  const { jwt, user, backendUrl } = props

  return (
    <Fragment>
      {!jwt && <Splash />}
      {jwt && <EmailerDashboard user={user} backendUrl={backendUrl} />}
    </Fragment>
  )
}
