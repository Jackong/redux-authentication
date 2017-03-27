import React, { PropTypes } from 'react'

const authentication = Component => {
  class Authentication extends React.Component {
    constructor(props) {
      super(props)
      this.isAuthenticating = false
      this.authenticate(this.props)
    }
    componentWillReceiveProps(nextProps) {
      this.authenticate(nextProps)
    }
    authenticate({ isAuthenticated, goToLogin, actions }) {
      if (isAuthenticated) {
        this.isAuthenticating = false
        return true
      }

      //  prevent to call goToLogin multiple times
      if (this.isAuthenticating) {
        return false
      }
      this.isAuthenticating = true

      if (goToLogin) {
        goToLogin()
        return false
      }
      if (actions && actions.goToLogin) {
        actions.goToLogin()
        return false
      }
      return false
    }
    render() {
      if (!this.props.isAuthenticated) {
        return null
      }
      return (
        <Component {...this.props} />
      )
    }
  }
  Authentication.propTypes = {
    isAuthenticated: PropTypes.bool,
  }
  Authentication.displayName = `Authentication(${Component.displayName || Component.name})`
  return Authentication
}

export default authentication
