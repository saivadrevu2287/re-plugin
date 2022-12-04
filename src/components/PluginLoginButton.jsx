import { h } from 'preact'

export default function PluginLoginButton(props) {
  const { webappUrl } = props

  return (
    <div className="personal-space">
      <p>To use the plugin, you must log in or create a new account.</p>
      <div className="flex around">
        <a href={webappUrl} target="_blank" className="link-button">
          <button className="ostrich-button">Log in</button>
        </a>
      </div>
    </div>
  )
}
