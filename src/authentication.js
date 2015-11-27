const Authentication = Component => {
  class AuthComponent extends Component {
    constructor(props) {
      super(props)
    }
    componentWillMount() {
      this.authenticate()
    }
    componentWillReceiveProps(nextProps) {
      this.authenticate()
    }
    authenticate() {
      const {isAuthenticated, goToLogin, actions} = this.props
      if (isAuthenticated) {
        return
      }
      if (goToLogin) {
        goToLogin()
        return
      }
      actions.goToLogin()
    }
    render() {
      return this.props.isAuthenticated ? super.render() : null
    }
  }
  return AuthComponent
}

export default Authentication
