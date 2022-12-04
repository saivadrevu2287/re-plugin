import { h, Fragment } from 'preact'

export default function Header(props) {
  const { toHome, children } = props
  return (
    <Fragment>
      <div class="navbar">
        <div class="nav-inner">
          <a onClick={toHome} class="brand-link w-inline-block">
            <img
              src="/logo.png"
              loading="lazy"
              srcset="/logo-p-500.png 500w, /logo-p-800.png 800w, /logo-p-1080.png 1080w, /logo-p-1600.png 1600w, /logo-p-2000.png 2000w, /logo-p-2600.png 2600w, /logo.png 2825w"
              sizes="70px"
              alt=""
              class="nav-logo"
            />
          </a>
          <div
            id="w-node-df2c582d-9a89-1fcc-9fe7-0e0f1f59e3a2-f8b0799e"
            class="navbar-btn-container"
          >
            {children}
          </div>
        </div>
      </div>
    </Fragment>
  )
}
