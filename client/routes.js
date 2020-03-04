import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Login,
  Signup,
  Portfolio
} from './components'
import {me} from './store'
import history from './history'

class Routes extends React.Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <div id="router-container">

          {/* Routes placed here are available to all visitors */}
          {!isLoggedIn && (
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route component = {Login} />
            </Switch>
          )}

          {isLoggedIn && (
            <Router history={history}>
              {/* Routes placed here are only available after logging in */}
              <Route path='/portfolio' component={Portfolio}/>
              {/* <Route path="/home" component={UserHome} /> */}
            </Router>
          )}

      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
