import { h } from 'preact'

export default function Splash(props) {
  return (
    <div className="flex around wrap">
      <div className="two-fifths personal-margin-top break-to-full">
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
      <div className="three-fifths break-to-full">
        <img src="/guy-with-charts.svg" className="full" />
      </div>
    </div>
  )
}
