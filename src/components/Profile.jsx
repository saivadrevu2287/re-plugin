import { Fragment, h } from 'preact'
import { useState } from 'preact/hooks'

import EmailerDashboard from '../components/EmailerDashboard'
import DashboardNav from '../components/DashboardNav'
import ExtensionDetails from '../components/ExtensionDetails'
import Payments from '../components/Payments'
import Settings from '../components/Settings'

const toLogout = () => window.location.replace('/logout.html')
const toLogin = () => window.location.replace('/')
const toHome = () => (window.location.href = '/')

export default function Profile(props) {
  const { user, backendUrl } = props
  const [activeTab, setActiveTab] = useState('Plans')

  const actions = [
    { tab: 'Plans', selector: () => setActiveTab('Plans') },
    { tab: 'Extension', selector: () => setActiveTab('Extension') },
    { tab: 'Emailer', selector: () => setActiveTab('Emailer') },
    { tab: 'Settings', selector: () => setActiveTab('Settings') },
  ]

  return (
    <Fragment>
      <DashboardNav
        actions={actions}
        activeTab={activeTab}
        toHome={toHome}
        toLogout={toLogout}
      />
      <div class="content-wrapper">
        <div class="content-container">
          {activeTab == 'Plans' && (
            <Payments user={user} />
          )}
          {activeTab == 'Extension' && (
            <ExtensionDetails user={user} backendUrl={backendUrl} />
          )}
          {activeTab == 'Emailer' && (
            <EmailerDashboard user={user} backendUrl={backendUrl} />
          )}
          {activeTab == 'Settings' && (
            <Settings user={user} backendUrl={backendUrl} />
          )}
        </div>
      </div>
    </Fragment>
  )
}
