import { h } from 'preact'
import { parseJwt } from '../subroutines/utils'

export default function Home(props) {
  const { jwt, toProfile } = props

  return (
    <div>
      <h4>Automate your Real Estate Workflow with Ostrich Tool Suite!</h4>
      <br />
      <p>
        Our site is currently under construction; more exciting features are
        soon to come.
      </p>
      <h6>Current Tool Offerings</h6>
      <p>
        Sign up here and explore our Property Notifier. Get emails directly to
        your inbox when properties in your areas of interest go onto the market.
        Get advanced investment analysis and calculations immediately.
      </p>
      <p>
        Our{' '}
        <a href="https://chrome.google.com/webstore/detail/ostrich/aicgkflmidjkbcenllnnlbnfnmicpmgo">
          Chrome Extension
        </a>{' '}
        helps you quickly run Cash On Cash calculations for listings.
      </p>
      <br />
      {jwt && (
        <div>
          You are currently logged in as {parseJwt(jwt.id_token).email}.
          <br />
          Features are locked at the time being, as they are in a trial stage.
        </div>
      )}
    </div>
  )
}
