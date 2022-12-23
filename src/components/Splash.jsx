import { h, Fragment } from 'preact'
import config from '../config'

export default function Splash(props) {
  return (
    <Fragment>
      <header className="section_header1">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="w-layout-grid header1_component">
                <div
                  id="w-node-_609eae99-230f-41f2-7495-de347fdf3a66-f8b0799e"
                  className="header1_content"
                >
                  <h1>
                    The fastest way ever <br />
                    to analyze rentals
                  </h1>
                  <p className="text-size-medium">
                    A Chrome extension and a daily email that delivers <br />
                    the cash flow analysis of the newest properties in your
                    market
                    <br />
                  </p>
                  <div className="button-group">
                    <a href="/signup" className="button w-button">
                      Try Ostrich
                    </a>
                    <a
                      target="_blank"
                      href={config.pluginSetupPage}
                      className="button secondary w-button"
                    >
                      How it works
                    </a>
                  </div>
                </div>
                <div className="header1_image-wrapper">
                  <img src="/guy-with-charts.svg" loading="lazy" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="section_emailer">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="process-container-2">
                <div className="process-title-wrap-2">
                  <h2>How it works</h2>
                  <p className="text-size-medium">
                    Ostrich is a freemium product with a Chrome Extension as a
                    free feature and Emailer as a paid feature(Sorry, we use
                    expensive APIs)
                  </p>
                </div>
                <div className="w-layout-grid process-grid-2">
                  <div className="process-card-primary-2">
                    <div className="icon-embed-xxsmall-2 w-embed">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        className="iconify iconify--carbon"
                        width="100%"
                        height="100%"
                        preserveaspectratio="xMidYMid meet"
                        viewbox="0 0 32 32"
                      >
                        <path
                          fill="currentColor"
                          d="M20 19h-2v-2h-4v2h-2v-2a2.002 2.002 0 0 1 2-2h4a2.002 2.002 0 0 1 2 2zm-4-5a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3zm0-4a1 1 0 1 0 1 1a1.001 1.001 0 0 0-1-1z"
                        ></path>
                        <path
                          fill="currentColor"
                          d="m16 30l-8.436-9.949a35.076 35.076 0 0 1-.348-.451A10.889 10.889 0 0 1 5 13a11 11 0 0 1 22 0a10.884 10.884 0 0 1-2.215 6.597l-.001.003s-.3.394-.345.447ZM8.812 18.395c.002 0 .234.308.287.374L16 26.908l6.91-8.15c.044-.055.278-.365.279-.366A8.901 8.901 0 0 0 25 13a9 9 0 0 0-18 0a8.905 8.905 0 0 0 1.813 5.395Z"
                        ></path>
                      </svg>
                    </div>
                    <h3>Sign up for free</h3>
                    <p className="emailer_text">
                      When you sign up you get 10
                      <br />
                      free uses per month of the Chrome Extension. Use it find
                      cash flowing markets or analyze single family rentals.
                    </p>
                    <img
                      src="https://uploads-ssl.webflow.com/6110b06f10260e518f5d3077/6110b1396056a5e6b0bd01f9_Dot%20Wave.svg"
                      loading="lazy"
                      alt=""
                      className="process-arrow-01"
                    />
                  </div>
                  <div className="process-card-primary-2">
                    <div className="icon-embed-xxsmall w-embed">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        className="iconify iconify--carbon"
                        width="100%"
                        height="100%"
                        preserveaspectratio="xMidYMid meet"
                        viewbox="0 0 32 32"
                      >
                        <path
                          fill="currentColor"
                          d="M24 18h-7v-4h3a2.002 2.002 0 0 0 2-2V8a2.002 2.002 0 0 0-2-2h-3V2h-2v4h-3a2.002 2.002 0 0 0-2 2v4a2.002 2.002 0 0 0 2 2h3v4H8a2.002 2.002 0 0 0-2 2v4a2.002 2.002 0 0 0 2 2h7v4h2v-4h7a2.002 2.002 0 0 0 2-2v-4a2.002 2.002 0 0 0-2-2ZM12 8h8v4h-8Zm12 16H8v-4h16Z"
                        ></path>
                      </svg>
                    </div>
                    <h3>Upgrade for Emailer</h3>
                    <p className="emailer_text">
                      If you upgrade, you get unlimited
                      <br />
                      use of the Extension and depending
                      <br />
                      on your Tier, you also get access to
                      <br />
                      the Emailer
                    </p>
                    <img
                      src="https://uploads-ssl.webflow.com/6110b06f10260e518f5d3077/6110b1396056a5e6b0bd01f9_Dot%20Wave.svg"
                      loading="lazy"
                      alt=""
                      className="process-arrow-01"
                    />
                  </div>
                  <div className="process-card-primary-2">
                    <div className="icon-embed-xxsmall-3 w-embed">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        className="iconify iconify--carbon"
                        width="100%"
                        height="100%"
                        preserveaspectratio="xMidYMid meet"
                        viewbox="0 0 32 32"
                      >
                        <path
                          fill="currentColor"
                          d="M19 24H4L3.997 8.906l11.434 7.916a1 1 0 0 0 1.138 0L28 8.91V18h2V8a2.003 2.003 0 0 0-2-2H4a2.002 2.002 0 0 0-2 2v16a2.003 2.003 0 0 0 2 2h15Zm6.799-16L16 14.784L6.201 8Z"
                        ></path>
                        <circle
                          cx="26"
                          cy="24"
                          r="4"
                          fill="currentColor"
                        ></circle>
                      </svg>
                    </div>
                    <h3>Get Daily Leads</h3>
                    <p className="emailer_text">
                      Add your markets, and we will send
                      <br />
                      you leads every morning with their <br />
                      cash flow analysis.
                    </p>
                  </div>
                </div>
                <a href="/signup" className="button w-button">
                  Sign up for free
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section_plugin">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="w-layout-grid layout1_component">
                <div
                  id="w-node-_6ea6296a-cb90-e88d-339b-0fc6f268787d-f8b0799e"
                  className="layout1_content"
                >
                  <h2>Chrome Extension</h2>
                  <p className="text-size-medium">
                    Use it to find cash flowing markets or simply the cash on
                    cash return <br />
                    of a listing on Zillow.
                  </p>
                  <div className="plugin_steps">
                    <div className="plugin_step-wrapper">
                      <img
                        src="/gis_step.png"
                        loading="lazy"
                        alt=""
                        className="step_icon"
                      />
                      <div>
                        No more copying and pasting numbers into an excel
                      </div>
                    </div>
                    <div className="plugin_step-wrapper">
                      <img
                        src="/gis_step.png"
                        loading="lazy"
                        alt=""
                        className="step_icon"
                      />
                      <div>Save hours every week</div>
                    </div>
                    <div className="plugin_step-wrapper">
                      <img
                        src="/gis_step.png"
                        loading="lazy"
                        alt=""
                        className="step_icon"
                      />
                      <div>Free for up to 10 listings</div>
                    </div>
                  </div>
                  <a
                    href="https://chrome.google.com/webstore/detail/ostrich/aicgkflmidjkbcenllnnlbnfnmicpmgo"
                    target="_blank"
                    className="button secondary w-button"
                  >
                    Get Extension For Free
                  </a>
                </div>
                <div className="layout1_image-wrapper">
                  <img
                    src="/plugin_ss.jpg"
                    loading="lazy"
                    sizes="(max-width: 479px) 100vw, (max-width: 767px) 90vw, (max-width: 991px) 43vw, 34vw"
                    srcset="
                    /plugin_ss-p-500.jpg   500w,
                    /plugin_ss-p-800.jpg   800w,
                    /plugin_ss-p-1080.jpg 1080w,
                    /plugin_ss.jpg        1131w
                  "
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section_testimonial17">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="margin-bottom margin-xxlarge">
                <div className="text-align-center">
                  <div className="max-width-large align-center">
                    <div className="margin-bottom margin-small">
                      <h2>What happy people have to say</h2>
                    </div>
                    <p className="text-size-medium">
                      Investors and Brokers alike love Ostrich
                    </p>
                  </div>
                </div>
              </div>
              <div className="testimonial17_component">
                <div className="testimonial17_content">
                  <div className="margin-bottom margin-small">
                    <div className="testimonial17_rating-wrapper">
                      <div className="testimonial17_rating-icon w-embed">
                        <svg
                          width="100%"
                          viewbox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.16379 0.551109C8.47316 -0.183704 9.52684 -0.183703 9.83621 0.551111L11.6621 4.88811C11.7926 5.19789 12.0875 5.40955 12.426 5.43636L17.1654 5.81173C17.9684 5.87533 18.294 6.86532 17.6822 7.38306L14.0713 10.4388C13.8134 10.6571 13.7007 10.9996 13.7795 11.3259L14.8827 15.8949C15.0696 16.669 14.2172 17.2809 13.5297 16.8661L9.47208 14.4176C9.18225 14.2427 8.81775 14.2427 8.52793 14.4176L4.47029 16.8661C3.7828 17.2809 2.93036 16.669 3.11727 15.8949L4.22048 11.3259C4.29928 10.9996 4.18664 10.6571 3.92873 10.4388L0.317756 7.38306C-0.294046 6.86532 0.0315611 5.87533 0.834562 5.81173L5.57402 5.43636C5.91255 5.40955 6.20744 5.19789 6.33786 4.88811L8.16379 0.551109Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="testimonial17_rating-icon w-embed">
                        <svg
                          width="100%"
                          viewbox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.16379 0.551109C8.47316 -0.183704 9.52684 -0.183703 9.83621 0.551111L11.6621 4.88811C11.7926 5.19789 12.0875 5.40955 12.426 5.43636L17.1654 5.81173C17.9684 5.87533 18.294 6.86532 17.6822 7.38306L14.0713 10.4388C13.8134 10.6571 13.7007 10.9996 13.7795 11.3259L14.8827 15.8949C15.0696 16.669 14.2172 17.2809 13.5297 16.8661L9.47208 14.4176C9.18225 14.2427 8.81775 14.2427 8.52793 14.4176L4.47029 16.8661C3.7828 17.2809 2.93036 16.669 3.11727 15.8949L4.22048 11.3259C4.29928 10.9996 4.18664 10.6571 3.92873 10.4388L0.317756 7.38306C-0.294046 6.86532 0.0315611 5.87533 0.834562 5.81173L5.57402 5.43636C5.91255 5.40955 6.20744 5.19789 6.33786 4.88811L8.16379 0.551109Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="testimonial17_rating-icon w-embed">
                        <svg
                          width="100%"
                          viewbox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.16379 0.551109C8.47316 -0.183704 9.52684 -0.183703 9.83621 0.551111L11.6621 4.88811C11.7926 5.19789 12.0875 5.40955 12.426 5.43636L17.1654 5.81173C17.9684 5.87533 18.294 6.86532 17.6822 7.38306L14.0713 10.4388C13.8134 10.6571 13.7007 10.9996 13.7795 11.3259L14.8827 15.8949C15.0696 16.669 14.2172 17.2809 13.5297 16.8661L9.47208 14.4176C9.18225 14.2427 8.81775 14.2427 8.52793 14.4176L4.47029 16.8661C3.7828 17.2809 2.93036 16.669 3.11727 15.8949L4.22048 11.3259C4.29928 10.9996 4.18664 10.6571 3.92873 10.4388L0.317756 7.38306C-0.294046 6.86532 0.0315611 5.87533 0.834562 5.81173L5.57402 5.43636C5.91255 5.40955 6.20744 5.19789 6.33786 4.88811L8.16379 0.551109Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="testimonial17_rating-icon w-embed">
                        <svg
                          width="100%"
                          viewbox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.16379 0.551109C8.47316 -0.183704 9.52684 -0.183703 9.83621 0.551111L11.6621 4.88811C11.7926 5.19789 12.0875 5.40955 12.426 5.43636L17.1654 5.81173C17.9684 5.87533 18.294 6.86532 17.6822 7.38306L14.0713 10.4388C13.8134 10.6571 13.7007 10.9996 13.7795 11.3259L14.8827 15.8949C15.0696 16.669 14.2172 17.2809 13.5297 16.8661L9.47208 14.4176C9.18225 14.2427 8.81775 14.2427 8.52793 14.4176L4.47029 16.8661C3.7828 17.2809 2.93036 16.669 3.11727 15.8949L4.22048 11.3259C4.29928 10.9996 4.18664 10.6571 3.92873 10.4388L0.317756 7.38306C-0.294046 6.86532 0.0315611 5.87533 0.834562 5.81173L5.57402 5.43636C5.91255 5.40955 6.20744 5.19789 6.33786 4.88811L8.16379 0.551109Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="testimonial17_rating-icon w-embed">
                        <svg
                          width="100%"
                          viewbox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.16379 0.551109C8.47316 -0.183704 9.52684 -0.183703 9.83621 0.551111L11.6621 4.88811C11.7926 5.19789 12.0875 5.40955 12.426 5.43636L17.1654 5.81173C17.9684 5.87533 18.294 6.86532 17.6822 7.38306L14.0713 10.4388C13.8134 10.6571 13.7007 10.9996 13.7795 11.3259L14.8827 15.8949C15.0696 16.669 14.2172 17.2809 13.5297 16.8661L9.47208 14.4176C9.18225 14.2427 8.81775 14.2427 8.52793 14.4176L4.47029 16.8661C3.7828 17.2809 2.93036 16.669 3.11727 15.8949L4.22048 11.3259C4.29928 10.9996 4.18664 10.6571 3.92873 10.4388L0.317756 7.38306C-0.294046 6.86532 0.0315611 5.87533 0.834562 5.81173L5.57402 5.43636C5.91255 5.40955 6.20744 5.19789 6.33786 4.88811L8.16379 0.551109Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="text-size-medium">
                      &quot;Perfect example of a product that delivers the 80/20
                      rule. No fluff and simple. You give me the top 20% of what
                      I need that gets 80% done.&quot;
                    </div>
                  </div>
                  <div className="testimonial17_client">
                    <div className="testimonial17_client-image-wrapper">
                      <img
                        src="https://uploads-ssl.webflow.com/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg"
                        loading="lazy"
                        alt=""
                        className="testimonial17_customer-image"
                      />
                    </div>
                    <div className="testimonial17_client-info">
                      <p className="text-weight-semibold">Jax Acosta-Rubio</p>
                      <p>Investor, Focalpoint</p>
                    </div>
                  </div>
                </div>
                <div className="testimonial17_content">
                  <div className="margin-bottom margin-small">
                    <div className="testimonial17_rating-wrapper">
                      <div className="testimonial17_rating-icon w-embed">
                        <svg
                          width="100%"
                          viewbox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.16379 0.551109C8.47316 -0.183704 9.52684 -0.183703 9.83621 0.551111L11.6621 4.88811C11.7926 5.19789 12.0875 5.40955 12.426 5.43636L17.1654 5.81173C17.9684 5.87533 18.294 6.86532 17.6822 7.38306L14.0713 10.4388C13.8134 10.6571 13.7007 10.9996 13.7795 11.3259L14.8827 15.8949C15.0696 16.669 14.2172 17.2809 13.5297 16.8661L9.47208 14.4176C9.18225 14.2427 8.81775 14.2427 8.52793 14.4176L4.47029 16.8661C3.7828 17.2809 2.93036 16.669 3.11727 15.8949L4.22048 11.3259C4.29928 10.9996 4.18664 10.6571 3.92873 10.4388L0.317756 7.38306C-0.294046 6.86532 0.0315611 5.87533 0.834562 5.81173L5.57402 5.43636C5.91255 5.40955 6.20744 5.19789 6.33786 4.88811L8.16379 0.551109Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="testimonial17_rating-icon w-embed">
                        <svg
                          width="100%"
                          viewbox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.16379 0.551109C8.47316 -0.183704 9.52684 -0.183703 9.83621 0.551111L11.6621 4.88811C11.7926 5.19789 12.0875 5.40955 12.426 5.43636L17.1654 5.81173C17.9684 5.87533 18.294 6.86532 17.6822 7.38306L14.0713 10.4388C13.8134 10.6571 13.7007 10.9996 13.7795 11.3259L14.8827 15.8949C15.0696 16.669 14.2172 17.2809 13.5297 16.8661L9.47208 14.4176C9.18225 14.2427 8.81775 14.2427 8.52793 14.4176L4.47029 16.8661C3.7828 17.2809 2.93036 16.669 3.11727 15.8949L4.22048 11.3259C4.29928 10.9996 4.18664 10.6571 3.92873 10.4388L0.317756 7.38306C-0.294046 6.86532 0.0315611 5.87533 0.834562 5.81173L5.57402 5.43636C5.91255 5.40955 6.20744 5.19789 6.33786 4.88811L8.16379 0.551109Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="testimonial17_rating-icon w-embed">
                        <svg
                          width="100%"
                          viewbox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.16379 0.551109C8.47316 -0.183704 9.52684 -0.183703 9.83621 0.551111L11.6621 4.88811C11.7926 5.19789 12.0875 5.40955 12.426 5.43636L17.1654 5.81173C17.9684 5.87533 18.294 6.86532 17.6822 7.38306L14.0713 10.4388C13.8134 10.6571 13.7007 10.9996 13.7795 11.3259L14.8827 15.8949C15.0696 16.669 14.2172 17.2809 13.5297 16.8661L9.47208 14.4176C9.18225 14.2427 8.81775 14.2427 8.52793 14.4176L4.47029 16.8661C3.7828 17.2809 2.93036 16.669 3.11727 15.8949L4.22048 11.3259C4.29928 10.9996 4.18664 10.6571 3.92873 10.4388L0.317756 7.38306C-0.294046 6.86532 0.0315611 5.87533 0.834562 5.81173L5.57402 5.43636C5.91255 5.40955 6.20744 5.19789 6.33786 4.88811L8.16379 0.551109Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="testimonial17_rating-icon w-embed">
                        <svg
                          width="100%"
                          viewbox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.16379 0.551109C8.47316 -0.183704 9.52684 -0.183703 9.83621 0.551111L11.6621 4.88811C11.7926 5.19789 12.0875 5.40955 12.426 5.43636L17.1654 5.81173C17.9684 5.87533 18.294 6.86532 17.6822 7.38306L14.0713 10.4388C13.8134 10.6571 13.7007 10.9996 13.7795 11.3259L14.8827 15.8949C15.0696 16.669 14.2172 17.2809 13.5297 16.8661L9.47208 14.4176C9.18225 14.2427 8.81775 14.2427 8.52793 14.4176L4.47029 16.8661C3.7828 17.2809 2.93036 16.669 3.11727 15.8949L4.22048 11.3259C4.29928 10.9996 4.18664 10.6571 3.92873 10.4388L0.317756 7.38306C-0.294046 6.86532 0.0315611 5.87533 0.834562 5.81173L5.57402 5.43636C5.91255 5.40955 6.20744 5.19789 6.33786 4.88811L8.16379 0.551109Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="testimonial17_rating-icon w-embed">
                        <svg
                          width="100%"
                          viewbox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.16379 0.551109C8.47316 -0.183704 9.52684 -0.183703 9.83621 0.551111L11.6621 4.88811C11.7926 5.19789 12.0875 5.40955 12.426 5.43636L17.1654 5.81173C17.9684 5.87533 18.294 6.86532 17.6822 7.38306L14.0713 10.4388C13.8134 10.6571 13.7007 10.9996 13.7795 11.3259L14.8827 15.8949C15.0696 16.669 14.2172 17.2809 13.5297 16.8661L9.47208 14.4176C9.18225 14.2427 8.81775 14.2427 8.52793 14.4176L4.47029 16.8661C3.7828 17.2809 2.93036 16.669 3.11727 15.8949L4.22048 11.3259C4.29928 10.9996 4.18664 10.6571 3.92873 10.4388L0.317756 7.38306C-0.294046 6.86532 0.0315611 5.87533 0.834562 5.81173L5.57402 5.43636C5.91255 5.40955 6.20744 5.19789 6.33786 4.88811L8.16379 0.551109Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="text-size-medium">
                      &quot;Ostrich is easier to use on daily basis. I chose to
                      avoid a distracting tool like excel for simpler upfront
                      analysis. &quot;
                    </div>
                  </div>
                  <div className="testimonial17_client">
                    <div className="testimonial17_client-image-wrapper">
                      <img
                        src="https://uploads-ssl.webflow.com/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg"
                        loading="lazy"
                        alt=""
                        className="testimonial17_customer-image"
                      />
                    </div>
                    <div className="testimonial17_client-info">
                      <p className="text-weight-semibold">Chris Anderson</p>
                      <p>Acquisitions, Real Estate PE</p>
                    </div>
                  </div>
                </div>
                <div className="testimonial17_content">
                  <div className="margin-bottom margin-small">
                    <div className="testimonial17_rating-wrapper">
                      <div className="testimonial17_rating-icon w-embed">
                        <svg
                          width="100%"
                          viewbox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.16379 0.551109C8.47316 -0.183704 9.52684 -0.183703 9.83621 0.551111L11.6621 4.88811C11.7926 5.19789 12.0875 5.40955 12.426 5.43636L17.1654 5.81173C17.9684 5.87533 18.294 6.86532 17.6822 7.38306L14.0713 10.4388C13.8134 10.6571 13.7007 10.9996 13.7795 11.3259L14.8827 15.8949C15.0696 16.669 14.2172 17.2809 13.5297 16.8661L9.47208 14.4176C9.18225 14.2427 8.81775 14.2427 8.52793 14.4176L4.47029 16.8661C3.7828 17.2809 2.93036 16.669 3.11727 15.8949L4.22048 11.3259C4.29928 10.9996 4.18664 10.6571 3.92873 10.4388L0.317756 7.38306C-0.294046 6.86532 0.0315611 5.87533 0.834562 5.81173L5.57402 5.43636C5.91255 5.40955 6.20744 5.19789 6.33786 4.88811L8.16379 0.551109Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="testimonial17_rating-icon w-embed">
                        <svg
                          width="100%"
                          viewbox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.16379 0.551109C8.47316 -0.183704 9.52684 -0.183703 9.83621 0.551111L11.6621 4.88811C11.7926 5.19789 12.0875 5.40955 12.426 5.43636L17.1654 5.81173C17.9684 5.87533 18.294 6.86532 17.6822 7.38306L14.0713 10.4388C13.8134 10.6571 13.7007 10.9996 13.7795 11.3259L14.8827 15.8949C15.0696 16.669 14.2172 17.2809 13.5297 16.8661L9.47208 14.4176C9.18225 14.2427 8.81775 14.2427 8.52793 14.4176L4.47029 16.8661C3.7828 17.2809 2.93036 16.669 3.11727 15.8949L4.22048 11.3259C4.29928 10.9996 4.18664 10.6571 3.92873 10.4388L0.317756 7.38306C-0.294046 6.86532 0.0315611 5.87533 0.834562 5.81173L5.57402 5.43636C5.91255 5.40955 6.20744 5.19789 6.33786 4.88811L8.16379 0.551109Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="testimonial17_rating-icon w-embed">
                        <svg
                          width="100%"
                          viewbox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.16379 0.551109C8.47316 -0.183704 9.52684 -0.183703 9.83621 0.551111L11.6621 4.88811C11.7926 5.19789 12.0875 5.40955 12.426 5.43636L17.1654 5.81173C17.9684 5.87533 18.294 6.86532 17.6822 7.38306L14.0713 10.4388C13.8134 10.6571 13.7007 10.9996 13.7795 11.3259L14.8827 15.8949C15.0696 16.669 14.2172 17.2809 13.5297 16.8661L9.47208 14.4176C9.18225 14.2427 8.81775 14.2427 8.52793 14.4176L4.47029 16.8661C3.7828 17.2809 2.93036 16.669 3.11727 15.8949L4.22048 11.3259C4.29928 10.9996 4.18664 10.6571 3.92873 10.4388L0.317756 7.38306C-0.294046 6.86532 0.0315611 5.87533 0.834562 5.81173L5.57402 5.43636C5.91255 5.40955 6.20744 5.19789 6.33786 4.88811L8.16379 0.551109Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="testimonial17_rating-icon w-embed">
                        <svg
                          width="100%"
                          viewbox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.16379 0.551109C8.47316 -0.183704 9.52684 -0.183703 9.83621 0.551111L11.6621 4.88811C11.7926 5.19789 12.0875 5.40955 12.426 5.43636L17.1654 5.81173C17.9684 5.87533 18.294 6.86532 17.6822 7.38306L14.0713 10.4388C13.8134 10.6571 13.7007 10.9996 13.7795 11.3259L14.8827 15.8949C15.0696 16.669 14.2172 17.2809 13.5297 16.8661L9.47208 14.4176C9.18225 14.2427 8.81775 14.2427 8.52793 14.4176L4.47029 16.8661C3.7828 17.2809 2.93036 16.669 3.11727 15.8949L4.22048 11.3259C4.29928 10.9996 4.18664 10.6571 3.92873 10.4388L0.317756 7.38306C-0.294046 6.86532 0.0315611 5.87533 0.834562 5.81173L5.57402 5.43636C5.91255 5.40955 6.20744 5.19789 6.33786 4.88811L8.16379 0.551109Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="testimonial17_rating-icon w-embed">
                        <svg
                          width="100%"
                          viewbox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.16379 0.551109C8.47316 -0.183704 9.52684 -0.183703 9.83621 0.551111L11.6621 4.88811C11.7926 5.19789 12.0875 5.40955 12.426 5.43636L17.1654 5.81173C17.9684 5.87533 18.294 6.86532 17.6822 7.38306L14.0713 10.4388C13.8134 10.6571 13.7007 10.9996 13.7795 11.3259L14.8827 15.8949C15.0696 16.669 14.2172 17.2809 13.5297 16.8661L9.47208 14.4176C9.18225 14.2427 8.81775 14.2427 8.52793 14.4176L4.47029 16.8661C3.7828 17.2809 2.93036 16.669 3.11727 15.8949L4.22048 11.3259C4.29928 10.9996 4.18664 10.6571 3.92873 10.4388L0.317756 7.38306C-0.294046 6.86532 0.0315611 5.87533 0.834562 5.81173L5.57402 5.43636C5.91255 5.40955 6.20744 5.19789 6.33786 4.88811L8.16379 0.551109Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="text-size-medium">
                      &quot;My favorite email everyday is the Emailer leads.
                      Last thing you want to do after a long day at work is to
                      manually analyze new listings for potential hits&quot;
                      <br />
                    </div>
                  </div>
                  <div className="testimonial17_client">
                    <div className="testimonial17_client-image-wrapper">
                      <img
                        src="https://uploads-ssl.webflow.com/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg"
                        loading="lazy"
                        alt=""
                        className="testimonial17_customer-image"
                      />
                    </div>
                    <div className="testimonial17_client-info">
                      <p className="text-weight-semibold">HG King</p>
                      <p>Investor, Digitheque</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section_layout17">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large-2">
              <div className="w-layout-grid layout17_component">
                <a
                  href={config.pluginSetupPage}
                  target="_blank"
                  className="layout17_lightbox w-inline-block w-lightbox"
                >
                  <img
                    src="https://uploads-ssl.webflow.com/624380709031623bfe4aee60/6243807090316259584aee68_placeholder-video-thumbnail.svg"
                    loading="lazy"
                    alt=""
                    className="layout17_lightbox-image"
                  />
                  <div className="lightbox-play-icon w-embed">
                    <svg
                      width="64"
                      height="64"
                      viewbox="0 0 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.33301 32C5.33301 17.2724 17.2721 5.33334 31.9997 5.33334C39.0721 5.33334 45.8549 8.14286 50.8559 13.1438C55.8568 18.1448 58.6663 24.9276 58.6663 32C58.6663 46.7276 46.7273 58.6667 31.9997 58.6667C17.2721 58.6667 5.33301 46.7276 5.33301 32ZM27.1198 43.4134L42.6664 33.7067C43.2482 33.3341 43.6001 32.6909 43.6001 32C43.6001 31.3092 43.2482 30.6659 42.6664 30.2934L27.0664 20.5867C26.452 20.1993 25.6758 20.1755 25.0388 20.5244C24.4018 20.8734 24.004 21.5403 23.9998 22.2667V41.7334C23.9912 42.4774 24.3963 43.1647 25.0514 43.5174C25.7065 43.8702 26.5033 43.8301 27.1198 43.4134Z"
                        fill="CurrentColor"
                      ></path>
                    </svg>
                  </div>
                  <div className="video-overlay-layer"></div>
                </a>
                <div className="layout17_content">
                  <div className="margin-bottom margin-xsmall">
                    <div className="text-weight-semibold">
                      Let the analysis come to you
                    </div>
                  </div>
                  <div className="margin-bottom margin-small">
                    <h2>Ostrich Emailer</h2>
                  </div>
                  <div className="margin-bottom margin-small">
                    <p className="text-size-medium">
                      <br />
                      Get the latest deals delivered to your inbox daily. Skip
                      checking out Zillow, Redfin, Realtor for deals in your
                      market. <br />
                    </p>
                  </div>
                  <div className="layout17_item-list">
                    <div
                      id="w-node-_0f8ff558-8505-8448-f4e0-1d1ff22a22da-f8b0799e"
                      className="layout17_item"
                    >
                      <div className="layout17_item-icon-wrapper">
                        <img
                          src="https://uploads-ssl.webflow.com/624380709031623bfe4aee60/624380709031626fc14aee84_icon.svg"
                          loading="lazy"
                          alt=""
                          className="icon-1x1-xsmall"
                        />
                      </div>
                      <div className="layout17_item-text-wrapper">
                        <p>
                          Select Tier 1 or above to get access. We have to pay
                          for the data so Emailer is a paid feature.
                        </p>
                      </div>
                    </div>
                    <div
                      id="w-node-_0f8ff558-8505-8448-f4e0-1d1ff22a22e0-f8b0799e"
                      className="layout17_item"
                    >
                      <div className="layout17_item-icon-wrapper">
                        <img
                          src="https://uploads-ssl.webflow.com/624380709031623bfe4aee60/624380709031626fc14aee84_icon.svg"
                          loading="lazy"
                          alt=""
                          className="icon-1x1-xsmall"
                        />
                      </div>
                      <div className="layout17_item-text-wrapper">
                        <p>
                          Enter your location, and the financial assumptions
                          (Loan, expenses etc)
                        </p>
                      </div>
                    </div>
                    <div
                      id="w-node-_0f8ff558-8505-8448-f4e0-1d1ff22a22e6-f8b0799e"
                      className="layout17_item"
                    >
                      <div className="layout17_item-icon-wrapper">
                        <img
                          src="https://uploads-ssl.webflow.com/624380709031623bfe4aee60/624380709031626fc14aee84_icon.svg"
                          loading="lazy"
                          alt=""
                          className="icon-1x1-xsmall"
                        />
                      </div>
                      <div className="layout17_item-text-wrapper">
                        <p>
                          Sit back and get leads with their cash flow return
                          analysis
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="margin-top margin-medium">
                    <div className="button-group-2">
                      <a href="#" className="button-2 is-secondary w-button">
                        Button
                      </a>
                      <a
                        href="#"
                        className="button-2 is-link is-icon w-inline-block"
                      >
                        <div>Button</div>
                        <div className="icon-embed-xxsmall w-embed">
                          <svg
                            width="16"
                            height="16"
                            viewbox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M6 3L11 8L6 13"
                              stroke="CurrentColor"
                              stroke-width="1.5"
                            ></path>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section_faq4">
        <div className="padding-global">
          <div className="container-small">
            <div className="padding-section-large-2">
              <div className="margin-bottom margin-xxlarge">
                <div className="text-align-center">
                  <div className="max-width-large">
                    <div className="margin-bottom margin-small">
                      <h2>FAQs</h2>
                    </div>
                    <p className="text-size-medium">
                      <br />
                    </p>
                  </div>
                </div>
              </div>
              <div className="faq4_component">
                <div className="w-layout-grid faq4_list">
                  <div className="faq4_accordion">
                    <div
                      data-w-id="86388f9e-fa23-6b2c-b6a7-51f02abb47af"
                      className="faq4_question"
                    >
                      <div className="text-size-medium text-weight-bold">
                        What is the difference between the Extension and the
                        Emailer?
                      </div>
                      <img
                        src="https://uploads-ssl.webflow.com/624380709031623bfe4aee60/624380709031621ef64aee78_icon_plus.svg"
                        loading="lazy"
                        alt=""
                        className="faq-05_icon"
                      />
                    </div>
                    <div style="width: 100%;" className="faq4_answer">
                      <div className="margin-bottom margin-small">
                        <p>
                          Extension helps you save hours from the manual work of
                          copying and pasting income and expenses into a
                          calculator online or on an excel sheet. But you still
                          have to visit the listing page on Zillow to get the
                          analysis. With the Emailer, you get the leads
                          delivered in your inbox everyday with the cash on cash
                          return metric. Extension is great to find cash flowing
                          markets since you can just go to Zillow and click on
                          any listing to find if it&#x27;s going to cash flow or
                          not.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="faq4_accordion">
                    <div
                      data-w-id="86388f9e-fa23-6b2c-b6a7-51f02abb47b8"
                      className="faq4_question"
                    >
                      <div className="text-size-medium text-weight-bold">
                        Why is there a charge?
                      </div>
                      <img
                        src="https://uploads-ssl.webflow.com/624380709031623bfe4aee60/624380709031621ef64aee78_icon_plus.svg"
                        loading="lazy"
                        alt=""
                        className="faq-05_icon"
                      />
                    </div>
                    <div style="width: 100%;" className="faq4_answer">
                      <div className="margin-bottom margin-small">
                        <p>
                          I built the tool to unlock speed for my own analysis
                          and then it was all good when few people were using
                          it. But then more people signed up. I am now
                          responsible for maintaining and updating the software,
                          as well as hosting it on own servers. There are costs
                          of the upkeep. Emailer is extra charge simply because
                          I am using expensive APIs to get the data needed for
                          analysis.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="faq4_accordion">
                    <div
                      data-w-id="86388f9e-fa23-6b2c-b6a7-51f02abb47c1"
                      className="faq4_question"
                    >
                      <div className="text-size-medium text-weight-bold">
                        Why is the Extension only limited to Zillow?
                      </div>
                      <img
                        src="https://uploads-ssl.webflow.com/624380709031623bfe4aee60/624380709031621ef64aee78_icon_plus.svg"
                        loading="lazy"
                        alt=""
                        className="faq-05_icon"
                      />
                    </div>
                    <div style="width: 100%;" className="faq4_answer">
                      <div className="margin-bottom margin-small">
                        <p>
                          Because Zillow provides rental estimates, which are
                          needed in the calculations.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="faq4_accordion">
                    <div
                      data-w-id="86388f9e-fa23-6b2c-b6a7-51f02abb47ca"
                      className="faq4_question"
                    >
                      <div className="text-size-medium text-weight-bold">
                        Does the product outside the US?
                      </div>
                      <img
                        src="https://uploads-ssl.webflow.com/624380709031623bfe4aee60/624380709031621ef64aee78_icon_plus.svg"
                        loading="lazy"
                        alt=""
                        className="faq-05_icon"
                      />
                    </div>
                    <div style="width: 100%;" className="faq4_answer">
                      <div className="margin-bottom margin-small">
                        <p>
                          No sorry, we are limited to US only at this point.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="margin-top-2 margin-xxlarge">
                <div className="text-align-center">
                  <div className="max-width-medium align-center">
                    <div className="margin-bottom margin-xsmall">
                      <h4>Still have questions?</h4>
                    </div>
                    <div className="margin-top margin-medium">
                      <a
                        href="mailto:v@ostrich.so?subject=Question%20about%20Ostrich"
                        className="button-2 secondary w-button"
                      >
                        Contact
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}
