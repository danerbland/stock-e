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
    <h3 className="nav-sub-header">Stocks made easy. Again.</h3>
    <nav className="login-nav">
      {isLoggedIn ? (
        <div className = 'nav-menu'>
          {/* The navbar will show these links after you log in */}
          <div>
          <Link className = 'nav-link' to="/portfolio">Portfolio</Link>
          <Link className = 'nav-link' to="/orders">Orders</Link>
          </div>
          <a className = 'nav-link' href="#" onClick={logOut}>
            Logout
          </a>
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
