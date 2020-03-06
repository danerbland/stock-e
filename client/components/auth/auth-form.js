import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../../store'
import {Link} from 'react-router-dom'

import './auth-form.css'

/**
 * COMPONENT
 */
//Will use state for front-end validation
class AuthForm extends React.Component {

  constructor(props){
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.onChange.bind(this)
  }

  //react form change lister
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
  const {name, displayName, handleSubmit, error} = this.props

  const isLogin = displayName === 'Login'
  const validEmail = emailCheck(this.state.email)
  const validPassword = passwordCheck(this.state.password)
  const isSubmittable = validEmail && validPassword
  const [alternativeName, alternativeRoute, alternativeMessage] = isLogin? ["Sign Up",'/signup', 'New to stock-e?'] : ["Login",'/login', 'Already registered?']


  return (
    <div id = 'auth-container'>
      <h1 id = 'welcome-message'>Welcome to stock-e</h1>
      <h2>{displayName}</h2>
      <form id = 'auth-form' onSubmit={handleSubmit} name={name}>

          <label htmlFor="email">
            <small>Email</small>
          </label>
          <div className='input-with-validation'>
          <input name="email" type="text" value={this.state.email} onChange={this.onChange}/>
          {!isLogin? <img className = 'validation-icon' src={getImageSrc(emailCheck(this.state.email))}/>: <div></div>}

          </div>


          <label htmlFor="password">
            <small>Password</small>
          </label>
          <div className='input-with-validation'>
          <input name="password" type="password" onChange={this.onChange}/>
          {!isLogin? <img className = 'validation-icon' src={getImageSrc(passwordCheck(this.state.password))}/>: <div></div>}
          </div>


          <div id = 'auth-buttons'>
          <button type="submit" className = {`auth-button ${isSubmittable? '' :'background'}`} disabled={!isSubmittable}>{displayName}</button>
          <p id = 'alternative-message'>{alternativeMessage}</p>
          <Link to={alternativeRoute}><button className='auth-button'>{alternativeName}</button></Link>
          </div>


        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )}
}

//right now we will only use validation for email, but could add password as well
const emailCheck = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

const passwordCheck = (password) => {
  if(password.length){
    return true
  }
  return false
}

const getImageSrc = (val)=> {
  return val ? './assets/icons/green-check.png' : './assets/icons/red-x.png'
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
