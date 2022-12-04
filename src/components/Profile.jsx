import { Fragment, h } from 'preact';

export default function Profile(props) {
    return <Fragment>
        <header class="section_header1 bg-purple">
      <div class="padding-global">
        <div class="container-large">
          <div class="padding-section-small">
            <div class="w-layout-grid header1_component-copy">
              <div
                id="w-node-ceee6e35-be19-e9cc-f01f-a590743015ff-34c18b3d"
                class="header1_content-copy"
              >
                <h1>You are successfully Logged in!</h1>
                <div>
                  <div class="heading-style-h6 text-color-black">
                    Your Current Tier
                  </div>
                  <div class="current-text">Free Tier</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section class="section_pricing">
      <div class="padding-global">
        <div class="container-large">
          <div class="padding-section-large">
            <div class="w-layout-grid current-plan_component">
              <div class="pricing18_plan-_current">
                <div class="pricing18_content">
                  <div class="pricing18_content-top">
                    <div class="text-align-center">
                      <div class="heading-style-h6">Free Tier</div>
                      <div class="heading-style-h1">
                        $0<span class="heading-style-h4">/mo</span>
                      </div>
                    </div>
                    <div class="pricing18_feature-list">
                      <div
                        id="w-node-c6127a99-2c7d-7493-6196-05c1a292bcf7-34c18b3d"
                        class="pricing_feature-heading"
                      >
                        Plugin
                      </div>
                      <div
                        id="w-node-c6127a99-2c7d-7493-6196-05c1a292bcf9-34c18b3d"
                        class="pricing18_feature"
                      >
                        <div class="pricing18_icon-wrapper">
                          <img
                            src="https://uploads-ssl.webflow.com/624380709031623bfe4aee60/6243807090316232dc4aee70_icon_check.svg"
                            loading="lazy"
                            alt=""
                            class="icon-1x1-xsmall"
                          />
                        </div>
                        <div>10 Searches/month</div>
                      </div>
                      <div
                        id="w-node-c6127a99-2c7d-7493-6196-05c1a292bcfe-34c18b3d"
                        class="pricing_feature-heading"
                      >
                        Emailer
                      </div>
                      <div
                        id="w-node-c6127a99-2c7d-7493-6196-05c1a292bd00-34c18b3d"
                        class="pricing18_feature"
                      >
                        <div>This plan does not includes Emailer</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="current_tier">
                  <div class="current_tier-text">Your Tier</div>
                </div>
              </div>
              <div
                id="w-node-_6abca0f8-2ab1-4eba-cf07-0e4bb4136682-34c18b3d"
                class="upgrade-plan_container"
              >
                <div class="current_tier-header">
                  <h2>Upgrade Tier to Get More</h2>
                  <div class="text-size-medium">
                    Get unlimited searches on our plugin and much more...
                  </div>
                </div>
                <a href="#" class="button_upgrade w-button">Upgrade Tier</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </Fragment>
}