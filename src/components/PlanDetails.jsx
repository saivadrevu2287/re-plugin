import { h } from 'preact'

export default function PlanDetails(props) {
  const { user, paymentsPageLink } = props

  const getStartedLink = paymentsPageLink

  const currentTierButton = (
    <div className="button current">
      <div>Current Tier</div>
    </div>
  )

  const getStartedButton = (
    <a href={getStartedLink} className="button pricing w-button">
      Get started
    </a>
  )

  const freeButton = getStartedButton

  const tier1Button =
    user && user.billing_id == 'Tier 1' ? currentTierButton : getStartedButton
  const tier2Button =
    user && user.billing_id == 'Tier 2' ? currentTierButton : getStartedButton
  const tier3Button =
    user && user.billing_id == 'Tier 3' ? currentTierButton : getStartedButton

  return (
    <section className="section_pricing">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="w-layout-grid pricing18_components">
              <div className="pricing18_plan">
                <div className="pricing18_content">
                  <div className="pricing18_content-top">
                    <div className="text-align-center">
                      <div className="heading-style-h6">Free Tier</div>
                      <div className="heading-style-h1">
                        $0<span className="heading-style-h4">/mo</span>
                      </div>
                    </div>
                    <div className="pricing18_feature-list">
                      <div
                        id="w-node-_039659d2-35ec-3feb-a76e-20d23bec24db-044b8525"
                        className="pricing_feature-heading"
                      >
                        Plugin
                      </div>
                      <div
                        id="w-node-_90f9c6e3-252d-5c8b-8a16-a22c21cff8c7-044b8525"
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
                        <div>10 Searches/month</div>
                      </div>
                      <div
                        id="w-node-e87b2a05-27f2-bc4f-0230-4fb5ecf6d1f6-044b8525"
                        className="pricing_feature-heading"
                      >
                        Emailer
                      </div>
                      <div
                        id="w-node-_90f9c6e3-252d-5c8b-8a16-a22c21cff8d6-044b8525"
                        className="pricing18_feature"
                      >
                        <div>This plan does not includes Emailer</div>
                      </div>
                    </div>
                  </div>
                  {freeButton}
                </div>
              </div>
              <div className="pricing18_plan">
                <div className="pricing18_content">
                  <div className="pricing18_content-top">
                    <div className="text-align-center">
                      <div className="heading-style-h6">Tier 1</div>
                      <div className="heading-style-h1">
                        $8.99<span className="heading-style-h4">/mo</span>
                      </div>
                    </div>
                    <div className="pricing18_feature-list">
                      <div
                        id="w-node-ed121502-afd0-d7f4-47be-5dad38123e3d-044b8525"
                        className="pricing_feature-heading"
                      >
                        Plugin
                      </div>
                      <div
                        id="w-node-ed121502-afd0-d7f4-47be-5dad38123e3f-044b8525"
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
                        <div>Unlimited Searches</div>
                      </div>
                      <div
                        id="w-node-ed121502-afd0-d7f4-47be-5dad38123e44-044b8525"
                        className="pricing_feature-heading"
                      >
                        Emailer
                      </div>
                      <div
                        id="w-node-fe7d86ca-d698-152c-8005-8b7c67f45c68-044b8525"
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
                        <div>1 Location</div>
                      </div>
                      <div
                        id="w-node-dd34ba97-87d1-8029-5291-ca8a896a8612-044b8525"
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
                        <div>Upto 8 Listings Everyday</div>
                      </div>
                    </div>
                  </div>
                  {tier1Button}
                </div>
              </div>
              <div className="pricing18_plan">
                <div className="pricing18_content">
                  <div className="pricing18_content-top">
                    <div className="text-align-center">
                      <div className="heading-style-h6">Tier 2</div>
                      <div className="heading-style-h1">
                        $14.99<span className="heading-style-h4">/mo</span>
                      </div>
                    </div>
                    <div className="pricing18_feature-list">
                      <div
                        id="w-node-_2eb43afc-6058-f7a0-94a9-1a322e5f1b83-044b8525"
                        className="pricing_feature-heading"
                      >
                        Plugin
                      </div>
                      <div
                        id="w-node-_2eb43afc-6058-f7a0-94a9-1a322e5f1b85-044b8525"
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
                        <div>Unlimited Searches</div>
                      </div>
                      <div
                        id="w-node-_2eb43afc-6058-f7a0-94a9-1a322e5f1b8a-044b8525"
                        className="pricing_feature-heading"
                      >
                        Emailer
                      </div>
                      <div
                        id="w-node-_4241f7ae-65e5-cf23-ec0a-cd43cab63a6c-044b8525"
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
                        <div>1 Location</div>
                      </div>
                      <div
                        id="w-node-_6238a784-17cf-328b-bead-6b305f1e5a29-044b8525"
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
                        <div>Up to 20 Listings Everyday</div>
                      </div>
                    </div>
                  </div>
                  {tier2Button}
                </div>
              </div>
              <div className="pricing18_plan">
                <div className="pricing18_content">
                  <div className="pricing18_content-top">
                    <div className="text-align-center">
                      <div className="heading-style-h6">Tier 3</div>
                      <div className="heading-style-h1">
                        $19.99<span className="heading-style-h4">/mo</span>
                      </div>
                    </div>
                    <div className="pricing18_feature-list">
                      <div
                        id="w-node-_2febbb44-2b03-668e-f727-595b6275e588-044b8525"
                        className="pricing_feature-heading"
                      >
                        Plugin
                      </div>
                      <div
                        id="w-node-_2febbb44-2b03-668e-f727-595b6275e58a-044b8525"
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
                        <div>Unlimited Searches</div>
                      </div>
                      <div
                        id="w-node-_2febbb44-2b03-668e-f727-595b6275e58f-044b8525"
                        className="pricing_feature-heading"
                      >
                        Emailer
                      </div>
                      <div
                        id="w-node-_7c7dbd83-93e7-22ba-e7ef-961533e8fe7b-044b8525"
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
                        <div>3 Locations</div>
                      </div>
                      <div
                        id="w-node-_2782fe1a-7738-a68e-c595-3328410b2b09-044b8525"
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
                        <div>Up to 20 Listings per Location Everyday</div>
                      </div>
                    </div>
                  </div>
                  {tier3Button}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
