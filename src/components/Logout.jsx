import { h } from 'preact'

export default function Logout(props) {
  return (
    <header className="section_header1 bg-purple">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-small">
            <div className="w-layout-grid header1_component-copy">
              <div
                id="w-node-ceee6e35-be19-e9cc-f01f-a590743015ff-34c18b3d"
                className="header1_content-copy"
              >
                <h1>You are successfully Logged out!</h1>
                <div>
                  <div>
                    <a href="/" className="button_upgrade w-button">
                      Return Home
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
