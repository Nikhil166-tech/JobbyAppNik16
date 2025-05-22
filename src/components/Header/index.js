import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="header">
      <div className="header-holder">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="list-items">
          <li>
            <Link className="link" to="/">
              <AiFillHome />
            </Link>
          </li>
          <li>
            <Link className="link" to="/jobs">
              <BsFillBriefcaseFill />
            </Link>
          </li>
        </ul>
        <li>
          <button className="button1" type="button" onClick={onClickLogout}>
            <FiLogOut />
          </button>
        </li>
      </div>
      <div className="header1-holder">
        <div className="header1-"></div>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="list-items">
        <li>
          <Link className="link" to="/">
            Home
          </Link>
          </li>
          <li>
          <Link className="link" to="/jobs">
            Jobs
          </Link>
          </li>
        </ul>
        <button className="button1" type="button" onClick={onClickLogout}>
          Log out
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
