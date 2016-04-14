const Authentication = Component => {
  class AuthComponent extends Component {
    constructor(props) {
      super(props)
    }
    componentWillMount() {
      this.authenticate(this.props)
    }
    componentWillReceiveProps(nextProps) {
      this.authenticate(nextProps)
    }
    authenticate(props) {
      const {isAuthenticated, goToLogin, actions} = props
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
