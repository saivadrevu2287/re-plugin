import { h } from 'preact'

export default function Splash(props) {
  return (
    <div className="flex around wrap super-margin-top">
      <div className="half break-to-full">
        <h3 className="special spacing-big">
          The fastest way ever to analyze rentals
        </h3>
        <br />
        <h6 className="special spacing-small">
          A daily email that delivers the cash flow analysis of the newest
          properties in your market.
        </h6>
        <div className="flex personal-margin-top-double">
          <a
            href="/login"
            className="link-button"
          >
            <button className="ostrich-button">Try Ostrich for Free</button>
          </a>
          <a
            href="https://ostrch.notion.site/Ostrich-Emailer-08759238028f4964805e86eb8dca5cbd"
            className="link-button personal-margin-left"
            target="_blank"
          >
            <button className="plain-button">How it Works</button>
          </a>
        </div>
      </div>
      <div className="two-fifths break-to-full">
        <img src="/guy-with-charts.svg" className="full" />
      </div>
    </div>
  )
}
