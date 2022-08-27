import { h, Fragment } from 'preact'
import { useState } from 'preact/hooks'
import EmailerDashboard from './EmailerDashboard'

export default function Profile(props) {
  const { user, backendUrl } = props
  const [selectedTab, setSelectedTab] = useState('details')

  if (!user) {
    return <h4>Loading User Profile...</h4>
  }

  return (
    <Fragment>
      <h2 className="border-bottom">Profile</h2>
      <div className="personal-space-top-double">
        <button onClick={() => setSelectedTab('details')}>User 👤</button>
        {user.user_tier > 1 && (
          <button onClick={() => setSelectedTab('emailer')}>Emailer ✉️</button>
        )}
      </div>
      <div className="personal-space-top">
        {selectedTab == 'details' && (
          <Fragment>
            <h4>User Details</h4>
            <h5 className="personal-space-top">Signed in as: {user.email}</h5>
            <h6>User Tier: {user.user_tier == 1 ? 'Free' : 'Full Access'}</h6>
          </Fragment>
        )}
        {selectedTab == 'emailer' && (
          <Fragment>
            <h4>Emailer</h4>
            <a href="/dashboard">Visit the market dashboard</a>
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}
