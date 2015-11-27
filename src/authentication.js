import {go2Login} from './actions'
import {connect} from 'react-redux'

const Authentication = Component => {
  class AuthComponent extends Component {
    constructor(props) {
      super(props)
    }
    componentWillMount() {
      this.authenticate()
      super.componentWillMount()
    }
    componentWillReceiveProps(nextProps) {
      this.authenticate()
      super.componentWillReceiveProps(nextProps)
    }
    authenticate() {
      const {dispatch, isAuthenticated} = this.props
      if (isAuthenticated) {
        return
      }
      dispatch(go2Login())
    }
  }
  const connector = connect(state => ({
    isAuthenticated: state.isAuthenticated,
  }))
  return connector(AuthComponent)
}

export default Authentication
