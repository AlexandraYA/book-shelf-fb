import { CREATE_PLACE, DELETE_PLACE, SAVE_PLACE_CODE } from './actionTypes'
import { showAlert, hideAlert, showModal } from './app'
import { getWordByLocale } from '../../locale'


export function createPlace(place) {
  return (dispatch, getState) => {
    const state = getState().places

    dispatch({
      type: CREATE_PLACE,
      places: {...state.places,
        [place.code]: {
          id: Object.keys(state.places).length + 1,
          name: {
            rus: place.rusName,
            eng: place.engName,
            code: place.code
          },
          code: place.code
        }
      }
    })

    dispatch(showAlert())

    let setTimeoutId = setTimeout(() => {
      dispatch(hideAlert())
      clearTimeout(setTimeoutId)
    }, 3000)
  }
}

export function beforeDeletePlace(placeCode, placeName) {
  return (dispatch, getState) => {
    const stateBooks = getState().books.books
    const currentLocale = getState().app.locale
    const books = stateBooks.filter(book => book.place === placeCode)

    if (books.length) {
      dispatch(showModal({
        text: getWordByLocale('errDelPlace', currentLocale),
        closeBtn: getWordByLocale('closeBtn', currentLocale)
      }))
    } else {
      dispatch({
        type: SAVE_PLACE_CODE,
        placeCode
      })
      dispatch(showModal({
        title: getWordByLocale('placeDelTitle', currentLocale) + placeName,
        text: getWordByLocale('delPlacePrompt', currentLocale),
        actionBtn: getWordByLocale('deleteBtn', currentLocale),
        closeBtn: getWordByLocale('cancelBtn', currentLocale)
      }))
    }
  }
}

export function deletePlace() {
  return (dispatch, getState) => {
    const state = getState().places
    let places = {...state.places}
    delete places[state.placeToDeleteCode]

    dispatch({
      type: DELETE_PLACE,
      places
    })

    dispatch(showAlert())

    let setTimeoutId = setTimeout(() => {
      dispatch(hideAlert())
      clearTimeout(setTimeoutId)
    }, 3000)
  }
}