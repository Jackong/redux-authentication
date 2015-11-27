import {go2Login} from './actions'

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
      const {dispatch, isAuthenticated} = this.props
      if (isAuthenticated) {
        return
      }
      dispatch(go2Login())
    }
    render() {
      return this.props.isAuthenticated ? super.render() : null
    }
  }
  return AuthComponent
}

export default Authentication
