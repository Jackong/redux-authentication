export const types = {
  GO_TO_LOGIN: 'AUTH_GO_TO_LOGIN',
}

export const go2Login = payload => ({
  type: types.GO_TO_LOGIN,
  payload,
})
