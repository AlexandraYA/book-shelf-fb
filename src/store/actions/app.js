import {
  CHANGE_LOCALE,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ALERT,
  HIDE_ALERT,
  SHOW_MODAL,
  HIDE_MODAL,
  RESET_FILTER_SETTINGS,
  SAVE_SORT_VALUE,
  SAVE_FILTER_VALUE,
  SAVE_SEARCH_VALUE,
  SAVE_SEARCH_FIELD_VALUE
} from './actionTypes'
import { deletePlace } from './places'
import { fetchBooks, deleteBook } from './books'
import locales from '../../data/locales.json'


export function showLoader() {
  return {
    type: SHOW_LOADER
  }
}

export function hideLoader() {
  return {
    type: HIDE_LOADER
  }
}

export function showAlert() {
  return {
    type: SHOW_ALERT
  }
}

export function hideAlert() {
  return {
    type: HIDE_ALERT
  }
}

export function showModal(data) {
  return {
    type: SHOW_MODAL,
    data
  }
}

export function doAction() {
  return (dispatch, getState) => {
    const state = getState().app
    if (state.typeModal === 'deletePlace') {
      dispatch(deletePlace())
    } else if (state.typeModal === 'deleteBook') {
      dispatch(deleteBook())
    }
    dispatch(hideModal())
  }
}

export function hideModal() {
  return {
    type: HIDE_MODAL
  }
}

export function resetFilterSettings() {
  return dispatch => {
    dispatch({type: RESET_FILTER_SETTINGS})
    dispatch(fetchBooks(1))
  }
}

export function saveSortValue(value) {
  return {
    type: SAVE_SORT_VALUE,
    value
  }
}

export function saveFilterValue(value) {
  return {
    type: SAVE_FILTER_VALUE,
    value
  }
}

export function saveSearchValue(value) {
  return {
    type: SAVE_SEARCH_VALUE,
    value
  }
}

export function saveSearchFieldValue(value) {
  return {
    type: SAVE_SEARCH_FIELD_VALUE,
    value
  }
}

export function changeLocale() {
  return (dispatch, getState) => {
    const state = getState().app
    let newLocale = locales.RUS

    if (state.locale === locales.RUS) {
      newLocale = locales.ENG
    }

    return dispatch({
      type: CHANGE_LOCALE,
      newLocale
    })
  }
}