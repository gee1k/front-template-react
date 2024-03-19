import Cookies from 'js-cookie'

const TokenKey = 'front-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string, expires?: Date | number) {
  return Cookies.set(TokenKey, token, { expires: expires })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
