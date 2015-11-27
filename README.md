# redux-authentication

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![Gittip][gittip-image]][gittip-url]

[npm-image]: https://img.shields.io/npm/v/redux-authentication.svg?style=flat-square
[npm-url]: https://npmjs.org/package/redux-authentication
[travis-image]: https://travis-ci.org/Jackong/redux-authentication.svg?branch=master
[travis-url]: https://travis-ci.org/Jackong/redux-authentication
[david-image]: https://img.shields.io/david/Jackong/redux-authentication.svg?style=flat-square
[david-url]: https://david-dm.org/Jackong/redux-authentication
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.11-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[gittip-image]: https://img.shields.io/gratipay/Jackong.svg
[gittip-url]: https://gratipay.com/~Jackong

authentication component for redux

# Install

[![NPM](https://nodei.co/npm/redux-authentication.png?downloads=true)](https://nodei.co/npm/redux-authentication/)

# Examples

```js
import {Authentication} from 'redux-authentication'
import {connect} from 'react-redux'
import React, { PropTypes } from 'react'
import {goToLogin} from 'your-actions'

@connect(state => ({
  isAuthenticated: state.isAuthenticated
}), {
  goToLogin,//map to props.goToLogin props.actions.goToLogin
})
@Authentication
class App extends React.Component {
  render () {
    return (
      <div>
        App
      </div>
    )
  }
}

export default App
```
