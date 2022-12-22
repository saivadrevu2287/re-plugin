import { Fragment, h } from 'preact'
import { useState } from 'preact/hooks'
import entry from '../build/entry'
import useLogin from '../hooks/useLogin'

import EmailerDashboard from '../components/EmailerDashboard'
import DashboardNav from '../components/DashboardNav'
import ExtensionDetails from '../components/ExtensionDetails'
import Payments from '../components/Payments'
import Settings from '../components/Settings'

const backendUrl = 'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1'

const toLogout = () => window.location.replace('/logout.html')
const toLogin = () => window.location.replace('/')
const toHome = () => (window.location.href = '/')

function Dashboard(props) {
  const [activeTab, setActiveTab] = useState('Plans')
  const [errorMessage, setErrorMessage] = useState()
  const { user, jwt, setJwt } = useLogin(backendUrl, setErrorMessage, toLogin)

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
            <Payments user={user} backendUrl={backendUrl} />
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

entry(<Dashboard />)
