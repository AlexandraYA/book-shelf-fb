import {
  CREATE_BOOK,
  GET_BOOK_BY_ID,
  FETCH_BOOKS,
  CONTINUE_LIST,
  TO_PAGE_EDIT_BOOK,
  EDIT_BOOK,
  DELETE_BOOK,
  SAVE_BOOK_ID,
  SET_PAGE_TYPE
} from '../actions/actionTypes'
import storage from '../../data/books.json'
import pageTypes from '../../data/pageTypes.json'

const InitialBook = {
  id: null,
  author: '',
  name: '',
  year: '',
  place: '',
  image: ''
}

const initialState = {
  books: storage.books,
  booksShow: [],
  homeBooks: [],
  pageType: pageTypes.HOME,
  book: {
    id: null,
    author: '',
    name: '',
    year: '',
    place: '',
    image: ''
  },
  filterType: '',
  filterValue: '',
  sortType: '',
  sortValue: '',
  searchField: '',
  searchValue: '',
  bookToDelete: null,
  count: 0,
  currentPage: 1,
  booksPerPage: 10,
  allPages: 0
}


export default function booksReducer(state = initialState, action) {

  switch (action.type) {
    case FETCH_BOOKS:
      return {
        ...state,
        booksShow: action.booksForPage,
        count: action.count,
        currentPage: action.currentPage,
        allPages: action.allPages
      }
    case CONTINUE_LIST:
      return {
        ...state,
        homeBooks: action.books,
        count: action.count,
        currentPage: action.currentPage,
        allPages: action.allPages
      }
    case SET_PAGE_TYPE:
      return {
        ...state,
        pageType: action.pageType
      }
    case CREATE_BOOK:
      return {
        ...state,
        books: [...action.books],
        booksShow: [...action.books]
      }
    case GET_BOOK_BY_ID:
      return {
        ...state,
        book: state.books.find(book => book.id === action.bookId)
      }
    case SAVE_BOOK_ID:
      return {
        ...state,
        bookToDelete: action.bookId
      }
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book.id !== state.bookToDelete),
        booksShow: state.booksShow.filter(book => book.id !== state.bookToDelete),
        bookToDelete: null
      }
    case TO_PAGE_EDIT_BOOK:
      return {
        ...state,
        book: state.books.find(book => book.id === action.bookId)
      }
    case EDIT_BOOK:
      return {
        ...state,
        book: { ...InitialBook },
        books: [...action.editedBooks],
        booksShow: [...action.editedBooks]
      }
    default:
      return state
  }
}