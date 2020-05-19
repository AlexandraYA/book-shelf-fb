import { CREATE_PLACE, DELETE_PLACE, SAVE_PLACE_CODE } from '../actions/actionTypes'
import places from '../../data/places.json'

const initialState = {
  places: places,
  placeToDeleteCode: null
}

export default function placesReducer (state = initialState, action) {

  switch (action.type) {
    case CREATE_PLACE:
      return {
        ...state,
        places: action.places
      }
    case DELETE_PLACE:
      return {
        ...state,
        places: action.places,
        placeToDeleteCode: null
      }
    case SAVE_PLACE_CODE:
      return {
        ...state,
        placeToDeleteCode: action.placeCode
      }
    default:
      return state
  }
}