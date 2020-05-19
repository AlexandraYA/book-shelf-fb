import {
  LOGIN,
  REGISTER,
  LOGOUT,
  SET_ERROR,
  TOKEN_TRUE,
  TOKEN_FALSE
} from '../actions/actionTypes'


const initialState = {
  users: [
    {
      login: 'demo@demo.ru',
      password: '1234567'
    }
  ],
  token: '',
  isAuth: false,
  error: ''
}

export default function authReducer(state = initialState, action) {

  switch(action.type) {
    case REGISTER:
      return {
        ...state,
        users: [...state.users, action.newUser]
      }
    case LOGIN:
      return {
        ...state,
        token: action.token,
        isAuth: true
      }
    case LOGOUT:
      return {
        ...state,
        token: '',
        isAuth: false
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.error
      }
    case TOKEN_TRUE:
      return {
        ...state,
        isAuth: true
      }
    case TOKEN_FALSE:
      return {
        ...state,
        isAuth: false
      }
    default:
      return state
  }
}
