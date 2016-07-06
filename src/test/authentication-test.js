import sinon from 'sinon'
import React from 'react'
import { mount } from 'enzyme'

import authentication from '../authentication'

class AppComponent extends React.Component {
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
const App = authentication(AppComponent)

describe('Authentication', () => {
  beforeEach(() => {
    sinon.restore()
  })

  describe('with authentication flow', () => {
    it('should be ok', () => {
      const goToLogin = sinon.spy()
      const cwm = sinon.spy(AppComponent.prototype, 'componentWillMount')
      const cdm = sinon.spy(AppComponent.prototype, 'componentDidMount')
      const cwr = sinon.spy(AppComponent.prototype, 'componentWillReceiveProps')
      const render = sinon.spy(AppComponent.prototype, 'render')
      const authenticate = sinon.spy(App.prototype, 'authenticate')


      // from unauthenticated status
      const wrapper = mount(
        <App isAuthenticated={false} goToLogin={goToLogin} />
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
      expect(cwr.callCount).to.be.equal(1)
      expect(render.callCount).to.be.equal(1)
      expect(authenticate.callCount).to.be.equal(2)

      //  keeping called once
      expect(goToLogin.callCount).to.be.equal(1)

      // and back to unauthenticated status
      wrapper.setProps({ isAuthenticated: false })

      expect(cwm.callCount).to.be.equal(1)
      expect(cdm.callCount).to.be.equal(1)
      expect(cwr.callCount).to.be.equal(1)
      expect(render.callCount).to.be.equal(1)

      // should call authenticate
      expect(authenticate.callCount).to.be.equal(3)

      // should go to login again
      expect(goToLogin.callCount).to.be.equal(2)
    })
  })
})
