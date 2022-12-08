import { h, Fragment } from 'preact'

export default function Header(props) {
  const { toHome, children } = props
  return (
    <Fragment>
      <div className="navbar">
        <div className="nav-inner">
          <a onClick={toHome} className="brand-link w-inline-block">
            <img
              src="/logo.png"
              loading="lazy"
              srcset="/logo-p-500.png 500w, /logo-p-800.png 800w, /logo-p-1080.png 1080w, /logo-p-1600.png 1600w, /logo-p-2000.png 2000w, /logo-p-2600.png 2600w, /logo.png 2825w"
              sizes="70px"
              alt=""
              className="nav-logo"
            />
          </a>
          <div
            id="w-node-df2c582d-9a89-1fcc-9fe7-0e0f1f59e3a2-f8b0799e"
            className="navbar-btn-container"
          >
            <div className='flex centered-items'>
            <a href="mailto:v@ostrich.so" className='personal-space-right'>Need Help?</a>
            {children}
            </div>
           
          </div>
        </div>
      </div>
    </Fragment>
  )
}
