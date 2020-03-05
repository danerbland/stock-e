import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import './navbar.css'

const DisconnectedNavBar = ({handleClick, isLoggedIn}) => (
  <div className="nav-container">
    <h1 className="nav-header">s t o c k - e</h1>
    <div className="divider" />
    <h3 className="nav-sub-header">Stocks made easy. Again.</h3>
\

    <nav className="login-nav">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <div>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/orders">Orders</Link>
          </div>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id,
})

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logout()),
})

export const NavBar =  connect(mapStateToProps, mapDispatchToProps)(DisconnectedNavBar)

/**
 * PROP TYPES
 */
DisconnectedNavBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
