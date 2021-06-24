import Cookies from "js-cookie";
import Router from "next/router";

export const checkErrorAuth = (error) => {
  const strError = JSON.stringify(error)

  if (strError.includes("Invalid authentication code [tkn]!")) {
    Router.push('/login')
  }
}

export const checkLogin = () => {
  if (!isTokenExist()) {
    Router.push('/login')
  }
}

export const isTokenExist = () => {
  const strToken = Cookies.get('token')

  if (strToken) {
    return true
  }

  return false
}