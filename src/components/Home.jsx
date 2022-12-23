import { h, Fragment } from 'preact'
import Splash from './Splash'
import Profile from './Profile'

export default function Home(props) {
  const { jwt, user, backendUrl, header } = props

  return (
    <Fragment>
      {!jwt && (
        <Fragment>
          {header}
          <Splash />
        </Fragment>
      )}
      {jwt && <Profile user={user} backendUrl={backendUrl} />}
    </Fragment>
  )
}
