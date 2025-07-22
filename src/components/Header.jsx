import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/img/argentBankLogo.png'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

function Header() {
  const token = useSelector((state) => state.auth.token)
  const user = useSelector((state) => state.profile.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        {token ? (
          <>
            <Link className="main-nav-item" to="/profile">
            <FontAwesomeIcon icon={faUserCircle} /> {user?.firstName || 'User'}
            </Link>
             <span
              className="main-nav-item"
              onClick={handleLogout}
              style={{ cursor: 'pointer', marginLeft: '1rem' }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
            </span>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Header
