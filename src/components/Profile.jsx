import { h, Fragment } from 'preact'
import { useState } from 'preact/hooks'
import EmailerDashboard from './EmailerDashboard'

export default function Profile(props) {
  const { user } = props

  if (!user) {
    return <div></div>
  }

  return (
    <Fragment>
      <div className="personal-space-top-double">
        <h4>User Details</h4>
        <h5 className="personal-space-top">Signed in as: {user.email}</h5>
      </div>
    </Fragment>
  )
}
