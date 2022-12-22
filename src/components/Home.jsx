import { h, Fragment } from 'preact'
import Splash from './Splash'
import Profile from './Profile'

export default function Home(props) {
  const { jwt, user, backendUrl } = props

  return (
    <Fragment>
      {!jwt && <Splash />}
      {jwt && (
        <Profile
          user={user}
          backendUrl={backendUrl}
        />
      )}
    </Fragment>
  )
}
