import jsdom from 'mocha-jsdom'
import React from 'react'
import {combineReducers, createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import {
  renderIntoDocument,
} from 'react-addons-test-utils'

import authentication from '../authentication'
import {types} from '../actions'

class AppComponent extends React.Component {
  render() {
    expect(this.props.isAuthenticated).to.be.equal(true)
    return (
      <div>
        App
      </div>
    )
  }
}

const App = connect(state => ({
  isAuthenticated: state.isAuthenticated,
}))(authentication(AppComponent))

const renderApp = (isAuthenticated) => {
  const reducer = combineReducers({
    isAuthenticated,
  })

  const store = createStore(reducer)

  return renderIntoDocument(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

describe('Authentication', () => {
  jsdom()
  describe('with un-authenticated state', () => {
    const isAuthenticated = (state = false, action) => {
      switch (action.type) {
      case types.GO_TO_LOGIN:
        expect(action.type).to.be.equal(types.GO_TO_LOGIN)
        return state
      default:
        return state
      }
    }

    it('should be ok', () => {
      renderApp(isAuthenticated)
    })
  })

  describe('with authenticated state', () => {
    const isAuthenticated = (state = true, action) => {
      switch (action.type) {
      case types.GO_TO_LOGIN:
        expect(true).to.be.equal(false)
        return state
      default:
        return state
      }
    }

    it('should be ok', () => {
      renderApp(isAuthenticated)
    })
  })
})
