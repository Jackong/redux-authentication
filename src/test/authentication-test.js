import sinon from 'sinon'
import React from 'react'
import { mount } from 'enzyme'

import authentication from '../authentication'

class App extends React.Component {
  componentWillMount() {
  }
  componentDidMount() {
  }
  componentWillReceiveProps() {
  }
  render() {
    return (
      <div>
        App
      </div>
    )
  }
}
const AppWithAuth = authentication(App)

describe('Authentication', () => {
  beforeEach(() => {
    sinon.restore()
  })

  describe('with authentication flow', () => {
    it('should be ok', () => {
      const goToLogin = sinon.spy()
      const cwm = sinon.spy(App.prototype, 'componentWillMount')
      const cdm = sinon.spy(App.prototype, 'componentDidMount')
      const cwr = sinon.spy(App.prototype, 'componentWillReceiveProps')
      const render = sinon.spy(App.prototype, 'render')
      const authenticate = sinon.spy(AppWithAuth.prototype, 'authenticate')


      // from unauthenticated status
      const wrapper = mount(
        <AppWithAuth isAuthenticated={false} goToLogin={goToLogin} />
      )

      expect(cwm.callCount).to.be.equal(0)
      expect(cdm.callCount).to.be.equal(0)
      expect(cwr.callCount).to.be.equal(0)
      expect(render.callCount).to.be.equal(0)
      expect(authenticate.callCount).to.be.equal(1)

      expect(goToLogin.callCount).to.be.equal(1)

      //  to authenticated status
      wrapper.setProps({ isAuthenticated: true })

      expect(cwm.callCount).to.be.equal(1)
      expect(cdm.callCount).to.be.equal(1)
      expect(cwr.callCount).to.be.equal(0)
      expect(render.callCount).to.be.equal(1)
      expect(authenticate.callCount).to.be.equal(2)

      //  keeping called once
      expect(goToLogin.callCount).to.be.equal(1)

      // set others props
      wrapper.setProps({ user: {} })
      expect(cwm.callCount).to.be.equal(1)
      expect(cdm.callCount).to.be.equal(1)
      expect(cwr.callCount).to.be.equal(1)

      // will re-render
      expect(render.callCount).to.be.equal(2)

      // should call authenticate to check
      expect(authenticate.callCount).to.be.equal(3)

      // and back to unauthenticated status
      wrapper.setProps({ isAuthenticated: false })

      expect(cwm.callCount).to.be.equal(1)
      expect(cdm.callCount).to.be.equal(1)
      expect(cwr.callCount).to.be.equal(1)
      expect(render.callCount).to.be.equal(2)

      // should call authenticate
      expect(authenticate.callCount).to.be.equal(4)

      // should go to login again
      expect(goToLogin.callCount).to.be.equal(2)
    })
  })
})
