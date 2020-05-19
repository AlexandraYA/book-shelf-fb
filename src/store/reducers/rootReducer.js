import { combineReducers } from 'redux'
import booksReducer from './books'
import appReducer from './app'
import placesReducer from './places'
import authReducer from './auth'


export default combineReducers({
  books: booksReducer,
  app: appReducer,
  places: placesReducer,
  auth: authReducer
});