import { h, Fragment } from 'preact'

export default function DashboardNav(props) {
  const { activeTab, actions, toHome, toLogout } = props

  const actionsMobile = actions.map((action) => {
    const name = action.tab
    const selector = action.selector

    return (
      <div className="mobile-nav-link-container" onClick={selector}>
        <div
          className={`desktop-navigation-block ${
            activeTab == name && 'active-nav'
          } mobile`}
        >
          <div>{name}</div>
        </div>
      </div>
    )
  })

  const actionsDesktop = actions.map((action) => {
    const name = action.tab
    const selector = action.selector

    return (
      <a
        onClick={selector}
        className={`desktop-navigation-block w-inline-block ${
          activeTab == name && 'w--current'
        }`}
      >
        <div>{name}</div>
      </a>
    )
  })

  return (
    <Fragment>
      <div
        data-collapse="medium"
        data-animation="default"
        data-duration="400"
        data-easing="ease"
        data-easing2="ease"
        role="banner"
        className="mobile-navigation w-nav"
      >
        <div className="container w-container">
          <a onClick={toHome} className="mobile-home-link w-nav-brand">
            <img
              src="/logo.png"
              width="44"
              sizes="(max-width: 767px) 44px, 100vw"
              srcset="
            /logo-p-500.png   500w,
            /logo-p-800.png   800w,
            /logo-p-1080.png 1080w,
            /logo-p-1600.png 1600w,
            /logo-p-2000.png 2000w,
            /logo-p-2600.png 2600w,
            /logo.png        2825w
          "
              alt=""
              className="desktop-logo"
            />
          </a>
          <nav role="navigation" className="nav-menu w-nav-menu">
            {actionsMobile}
            <div
              className="mobile-nav-link-container bottom-nav"
              onClick={toLogout}
            >
              <div className="desktop-navigation-block bottom-nav">
                <div>Logout</div>
              </div>
            </div>
          </nav>
          <div className="menu-button w-nav-button">
            <div className="menu-icon-container">
              <img src="/Mobile-Menu-Icon.svg" width="22" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="desktop-navigation">
        <img
          src="/logo.png"
          onClick={toHome}
          width="44"
          sizes="(max-width: 767px) 100vw, 44px"
          srcset="
        /logo-p-500.png   500w,
        /logo-p-800.png   800w,
        /logo-p-1080.png 1080w,
        /logo-p-1600.png 1600w,
        /logo-p-2000.png 2000w,
        /logo-p-2600.png 2600w,
        /logo.png        2825w
      "
          alt=""
          className="desktop-logo"
        />
        <div className="desktop-navigation-container">
          <div className="desktop-navigation-icons-container">
            {actionsDesktop}
          </div>
          <div
            className="desktop-navigation-block bottom-nav"
            onClick={toLogout}
          >
            <div>Logout</div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
