import { h, Fragment } from 'preact'

export default function Splash(props) {
  return (
    <Fragment>
      <header class="section_header1">
        <div class="padding-global">
          <div class="container-large">
            <div class="padding-section-large">
              <div class="w-layout-grid header1_component">
                <div
                  id="w-node-_609eae99-230f-41f2-7495-de347fdf3a66-f8b0799e"
                  class="header1_content"
                >
                  <h1>The fastest way ever to analyze rentals</h1>
                  <p class="text-size-medium">
                    A daily email that delivers the cash flow analysis of the
                    newest properties in your market
                    <br />
                  </p>
                  <div class="button-group">
                    <a href="#" class="button w-button">
                      Try Ostrich for Free
                    </a>
                    <a href="#" class="button secondary w-button">
                      How it works
                    </a>
                  </div>
                </div>
                <div class="header1_image-wrapper">
                  <img src="/guy-with-charts.svg" loading="lazy" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section class="section_plugin">
        <div class="padding-global">
          <div class="container-large">
            <div class="padding-section-large">
              <div class="w-layout-grid layout1_component">
                <div
                  id="w-node-_6ea6296a-cb90-e88d-339b-0fc6f268787d-f8b0799e"
                  class="layout1_content"
                >
                  <h2>Ostrich Chrome Plugin</h2>
                  <p class="text-size-medium">
                    Speed up your workflow!
                    <br />
                    Get the cash flow analysis of a single family property while
                    you are checking out a Zillow listing
                  </p>
                  <div class="plugin_steps">
                    <div class="plugin_step-wrapper">
                      <img
                        src="/gis_step.png"
                        loading="lazy"
                        alt=""
                        class="step_icon"
                      />
                      <div>
                        After the extension is downloaded. Pin it to your Chrome
                        Toolbar so it&#x27;s visible at all times.
                      </div>
                    </div>
                    <div class="plugin_step-wrapper">
                      <img
                        src="/gis_step.png"
                        loading="lazy"
                        alt=""
                        class="step_icon"
                      />
                      <div>Sign up using Email or Gmail</div>
                    </div>
                    <div class="plugin_step-wrapper">
                      <img
                        src="/gis_step.png"
                        loading="lazy"
                        alt=""
                        class="step_icon"
                      />
                      <div>
                        After logging in, right-click on the extension Icon,
                        select options and enter your expense assumptions and
                        Save
                      </div>
                    </div>
                    <div class="plugin_step-wrapper">
                      <img
                        src="/gis_step.png"
                        loading="lazy"
                        alt=""
                        class="step_icon"
                      />
                      <div>
                        Head to Zillow and find a listing for sale you like
                      </div>
                    </div>
                    <div class="plugin_step-wrapper">
                      <img
                        src="/gis_step.png"
                        loading="lazy"
                        alt=""
                        class="step_icon"
                      />
                      <div>
                        Click on the extension icon to get the cash flow
                        projection for year 1
                      </div>
                    </div>
                  </div>
                  <a href="#" class="button secondary w-button">
                    Get Plugin
                  </a>
                </div>
                <div class="layout1_image-wrapper">
                  <img
                    src="/plugin_ss.jpg"
                    loading="lazy"
                    srcset="/plugin_ss-p-500.jpg 500w, /plugin_ss-p-800.jpg 800w, /plugin_ss-p-1080.jpg 1080w, /plugin_ss.jpg 1131w"
                    sizes="100vw"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section_emailer">
        <div class="padding-global">
          <div class="container-large">
            <div class="padding-section-large">
              <div class="process-container-2">
                <div class="process-title-wrap-2">
                  <h2>Premium Ostrich Emailer</h2>
                  <p class="text-size-medium">
                    Emailer is a premium feature of Ostrich, which sends
                    deals(only single family) in your market per your search
                    criteria. Just enter your location and financial assumptions
                    and the emailer will send you properties that showed up in
                    your market in the last 24 hours
                  </p>
                </div>
                <div class="w-layout-grid process-grid-2">
                  <div class="process-card-primary-2">
                    <div class="feature-icon-square-2">
                      <div>1</div>
                    </div>
                    <h3>Create Your Account</h3>
                    <p class="emailer_text">
                      Sign up for an account on our platform and get started
                    </p>
                    <img
                      src="https://uploads-ssl.webflow.com/6110b06f10260e518f5d3077/6110b1396056a5e6b0bd01f9_Dot%20Wave.svg"
                      loading="lazy"
                      alt=""
                      class="process-arrow-01"
                    />
                  </div>
                  <div class="process-card-primary-2">
                    <div class="feature-icon-square-2 feature-icon">
                      <div class="text-block">2</div>
                    </div>
                    <h3>Save Your Alert</h3>
                    <p class="emailer_text">
                      Enter your market and the financial assumptions (Loan,
                      expenses etc) and save the alert
                    </p>
                    <img
                      src="https://uploads-ssl.webflow.com/6110b06f10260e518f5d3077/6110b1396056a5e6b0bd01f9_Dot%20Wave.svg"
                      loading="lazy"
                      alt=""
                      class="process-arrow-01"
                    />
                  </div>
                  <div class="process-card-primary-2">
                    <div class="feature-icon-square-2">
                      <div>3</div>
                    </div>
                    <h3>Get Daily Emails</h3>
                    <p class="emailer_text">
                      Now you will get emails everyday around 3:30 pm ET with
                      any listings and their cash flow return analysis
                    </p>
                  </div>
                </div>
                <a href="#" class="button w-button">
                  Buy Emailer
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}
