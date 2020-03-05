import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import './navbar.css'

const DisconnectedNavBar = ({logOut, isLoggedIn}) => (
  <div className="nav-container">
    <h1 className="nav-header">s t o c k - e</h1>

    <div className="divider" />
    <nav className="login-nav">
      {isLoggedIn ? (
        <div className = 'nav-menu'>
          {/* The navbar will show these links after you log in */}
          <div className="navbar-side-links">
          <Link className = 'nav-link' to="/portfolio">Portfolio</Link>
          <Link className = 'nav-link' to="/orders">Orders</Link>
          </div>
          <h3 className="nav-sub-header">Stocks made easy. Again.</h3>
          <div className="navbar-side-links">
          <a className = 'nav-link' id = ''href="#" onClick={logOut}>
            Logout
          </a>
          </div>

        </div>
      ) : (
        <br/>
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
  logOut: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
