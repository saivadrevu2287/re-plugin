import { h, Fragment } from 'preact'
import { useReducer } from 'preact/hooks'
import { parseJwt } from '../subroutines/utils'

export default function Home(props) {
  const { jwt, user } = props

  return (
    <Fragment>
      <div className="flex around super-margin-top wrap">
        <div className="fourty-five personal-margin-top break-to-full">
          <h3>The fastest way ever to analyze rentals</h3>
          <br />
          <h5>
            A daily email that delivers the cash flow analysis of the newest
            properties in your market.
          </h5>
          <div className="flex around personal-margin-top-double">
            <a
              href="https://chrome.google.com/webstore/detail/ostrich/aicgkflmidjkbcenllnnlbnfnmicpmgo"
              className="link-button"
            >
              <button className="ostrich-button">Try Ostrich for Free</button>
            </a>
            <a
              href="https://chrome.google.com/webstore/detail/ostrich/aicgkflmidjkbcenllnnlbnfnmicpmgo"
              className="link-button"
            >
              <button className="plain-button">How it Works</button>
            </a>
          </div>
        </div>
        <div className="fourty-five break-to-full">
          <img src="/guy-with-charts.svg" className="full" />
        </div>
      </div>

      <br />
      {jwt && (
        <div>
          You are currently logged in as {parseJwt(jwt.id_token).email}.
          <br />
          Features are locked at the time being, as they are in a trial stage.
        </div>
      )}
      {user && user.user_tier > 1 && (
        <div>
          <a href="/dashboard" className="link-button">
            <button className="ostrich-button personal-space-right">
              EmailerDashboard
            </button>
          </a>
        </div>
      )}
    </Fragment>
  )
}
