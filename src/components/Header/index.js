import {Link, withRouter} from 'react-router-dom'
import {RiLogoutBoxRFill} from 'react-icons/ri'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="mobile-nav-items">
            <li className="icon">
              <Link to="/">
                <AiFillHome className="nav-icon" size="40" />
              </Link>
            </li>
            <li className="icon">
              <Link to="/jobs">
                <BsFillBriefcaseFill className="nav-icon" size="40" />
              </Link>
            </li>
            <li className="icon">
              <button
                type="button"
                className="nav-mobile-btn"
                onClick={onClickLogout}
              >
                <RiLogoutBoxRFill
                  color="white"
                  className="nav-icon"
                  size="40"
                />
              </button>
            </li>
          </ul>
        </div>

        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/jobs" className="nav-link">
                jobs
              </Link>
            </li>
          </ul>
          <div>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
