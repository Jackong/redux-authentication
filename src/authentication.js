const Authentication = Component => {
  class AuthComponent extends Component {
    constructor(props) {
      super(props)
      this.isAuthenticating = false
      this.authenticate(this.props)
    }
    componentWillMount() {
      if (this.props.isAuthenticated && super.componentWillMount) {
        super.componentWillMount()
      }
    }
    componentDidMount() {
      if (this.props.isAuthenticated && super.componentDidMount) {
        super.componentDidMount()
      }
    }
    componentWillReceiveProps(nextProps) {
      if (!this.authenticate(nextProps)) {
        return
      }
      const canReplay = this.props.isAuthenticated !== nextProps.isAuthenticated
      if (canReplay && super.componentWillMount) {
        super.componentWillMount()
      }
      if (super.componentWillReceiveProps) {
        super.componentWillReceiveProps(nextProps)
      }
      if (canReplay && super.componentDidMount) {
        super.componentDidMount()
      }
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
      return this.props.isAuthenticated ? super.render() : null
    }
  }
  return AuthComponent
}

export default Authentication
