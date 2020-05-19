import {
  LOGIN,
  REGISTER,
  LOGOUT,
  SET_ERROR,
  TOKEN_TRUE,
  TOKEN_FALSE
} from './actionTypes'
import { showAlert, hideAlert } from './app'
import axios from 'axios'


export function login(email, password, history) {
  return (dispatch, getState) => {

    const authData = {
      email, password,
      returnSecureToken: true
    }

    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.API_KEY}`

    const response = await axios.post(url, authData)
    const data = response.data

    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

    localStorage.setItem('token', data.idToken)

/*     if (!user) {
      dispatch({
        type: SET_ERROR,
        error: 'emailNotFound'
      })
      return activateAlert(dispatch)
    }

    if (user.password !== pwd) {
      dispatch({
        type: SET_ERROR,
        error: 'pwdIncorrect'
      })
      return activateAlert(dispatch)
    }

    const token = v4()
    window.localStorage.setItem('dombibliotoken', token) */

    dispatch({
      type: LOGIN,
      token
    })

    return history.push('/')
  }
}

export function register(email, password) {
  return dispatch => {

    const authData = {
      email, password,
      returnSecureToken: true
    }

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.API_KEY}`;

    return dispatch({
      type: REGISTER,
      newUser: {
        login: email,
        password
      }
    })
  }
}

export function logout(history) {
  return dispatch => {
    dispatch({
      type: LOGOUT
    })
    window.localStorage.removeItem('dombibliotoken')
    return history.push('/auth')
  }
}

export function checkToken(history) {
  return (dispatch, getState) => {
    const currentToken = getState().auth.token
    const storageToken = window.localStorage.getItem('dombibliotoken')

    if (storageToken && storageToken === currentToken) {
      return dispatch({
        type: TOKEN_TRUE
      })
    } else {
      dispatch({
        type: TOKEN_FALSE
      })
      return history.push('/auth')
    }
  }
}

function activateAlert(dispatch) {
  dispatch(showAlert())

  let setTimeoutId = setTimeout(() => {
    dispatch(hideAlert())
    clearTimeout(setTimeoutId)
  }, 3000)
}
