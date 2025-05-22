import './index.css'
import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'
import {Component} from 'react'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}
  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }
  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    console.log(token)
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-ctn">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website logo"
          />
          <form className="input-ctn" onSubmit={this.submitForm}>
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              className="input"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUserName}
            />
            <label className="label" htmlFor="password">PASSWORD</label>
            <input
              id="password"
              type="text"
              className="input"
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
            <button className="button" type="submit">
              Login
            </button>
            {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
