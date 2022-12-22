import { Fragment, h } from 'preact'

export default function Profile(props) {
  const { user, dashboardLink } = props

  if (!user) {
    return (
      <Fragment>
        <h3>Loading...</h3>
      </Fragment>
    )
  }

  const price = !user.billing_id
    ? 0
    : user.billing_id == 'Tier 1'
    ? 8.99
    : user.billing_id == 'Tier 2'
    ? 14.99
    : user.billing_id == 'Tier 3'
    ? 19.99
    : 0

  const emailerInfo = !user.billing_id
    ? 'No Access on Free Tier'
    : user.billing_id == 'Tier 1'
    ? '1 Location, 8 listings everyday'
    : user.billing_id == 'Tier 2'
    ? '1 Locations, 20 listings  per location per day max'
    : user.billing_id == 'Tier 3'
    ? '3 locations, 20 listings  per location per day max'
    : ''

  const pluginInfo = !user.billing_id ? '10 free uses' : 'Unlimited Searches'

  const upgradeOrChange = !user.billing_id ? 'Upgrade' : 'Change'

  const emailerButton = !user.billing_id ? (
    ''
  ) : (
    <a href={dashboardLink} className="button_upgrade w-button">
      Add a Market
    </a>
  )

  const detailsMessage = !user.billing_id ? (
    <Fragment>
      <p>
        You are currently subscribed to Tier 0. Meaning you have 10 free uses
        per month of the Chrome plugin. Please upgrade below for unlimited
        plugin use and access to the emailer feature.
      </p>
      <p>
        Make sure you are using the same email on the upgrade screen that you
        signed up with.
      </p>
    </Fragment>
  ) : (
    <Fragment>
      <p>
        In this Tier, you get unlimited usage of the Chrome Extension and also
        the emailer feature. Add a market below.
      </p>
    </Fragment>
  )

  const paymentLink = '/payments.html'

  const billingTier = user.billing_id ? user.billing_id : 'Free Tier'

  return (
    <Fragment>
      <header className="section_header1 bg-purple">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-small">
              <div className="w-layout-grid header1_component-copy">
                <div
                  id="w-node-ceee6e35-be19-e9cc-f01f-a590743015ff-34c18b3d"
                  className="header1_content-copy"
                >
                  <h1>You are successfully Logged in!</h1>
                  <div>
                    <div className="heading-style-h6 text-color-black">
                      Your Current Tier
                    </div>
                    <div className="current-text">{billingTier}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="section_pricing">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="w-layout-grid current-plan_component">
                <div className="pricing18_plan-_current">
                  <div className="pricing18_content">
                    <div className="pricing18_content-top">
                      <div className="text-align-center">
                        <div className="heading-style-h6">{billingTier}</div>
                        <div className="heading-style-h1">
                          ${price}
                          <span className="heading-style-h4">/mo</span>
                        </div>
                      </div>
                      <div className="pricing18_feature-list">
                        <div
                          id="w-node-c6127a99-2c7d-7493-6196-05c1a292bcf7-34c18b3d"
                          className="pricing_feature-heading"
                        >
                          Plugin
                        </div>
                        <div
                          id="w-node-c6127a99-2c7d-7493-6196-05c1a292bcf9-34c18b3d"
                          className="pricing18_feature"
                        >
                          <div className="pricing18_icon-wrapper">
                            <img
                              src="https://uploads-ssl.webflow.com/624380709031623bfe4aee60/6243807090316232dc4aee70_icon_check.svg"
                              loading="lazy"
                              alt=""
                              className="icon-1x1-xsmall"
                            />
                          </div>
                          <div>{pluginInfo}</div>
                        </div>
                        <div
                          id="w-node-c6127a99-2c7d-7493-6196-05c1a292bcfe-34c18b3d"
                          className="pricing_feature-heading"
                        >
                          Emailer
                        </div>
                        <div
                          id="w-node-c6127a99-2c7d-7493-6196-05c1a292bd00-34c18b3d"
                          className="pricing18_feature"
                        >
                          <div>{emailerInfo}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="current_tier">
                    <div className="current_tier-text">Your Tier</div>
                  </div>
                </div>
                <div
                  id="w-node-_6abca0f8-2ab1-4eba-cf07-0e4bb4136682-34c18b3d"
                  className="upgrade-plan_container"
                >
                  <div className="current_tier-header">
                    <h2>{upgradeOrChange} Tier to Get More</h2>
                    <div className="text-size-medium">
                      <p>You are logged in as {user.email}</p>
                      <br />
                      {detailsMessage}
                    </div>
                  </div>
                  <a href={paymentLink}>{upgradeOrChange} Plan</a>
                  {emailerButton}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}
