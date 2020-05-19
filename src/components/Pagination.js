import React from 'react'
import { connect } from 'react-redux'
import { fetchBooks } from '../store/actions/books'


const Pagination = props => {

  const { currentPage, allPages } = props

  let pages = [];

  for (let i = 0; i < allPages; i++) {
    pages.push({number: i + 1})
  }

  const changePage = (event, page) => {
    event.preventDefault()
    props.fetchBooks(page)
  }

  const prevPage = (event) => {
    event.preventDefault()
    if (currentPage > 1) {
      props.fetchBooks(currentPage - 1)
    }
  }

  const nextPage = (event) => {
    event.preventDefault()
    if (currentPage < allPages) {
      props.fetchBooks(currentPage + 1)
    }
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={ currentPage === 1 ? "page-item disabled" : "page-item" }>
          <a
            className="page-link"
            href="/"
            onClick={event => prevPage(event)}
          >
            <span>&laquo;</span>
          </a>
        </li>

        { pages.map(page => (
          <li key={page.number} className={ currentPage === page.number ? "page-item active" : "page-item" }>
            <a
              className="page-link"
              href="/"
              onClick={event => changePage(event, page.number)}
            >
              { page.number }
            </a>
          </li>
        ))}

        <li className={ currentPage > (allPages - 1) ? "page-item disabled" : "page-item" }>
          <a
            className="page-link"
            href="/"
            onClick={event => nextPage(event)}
          >
            <span>&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}

function mapStateToProps(state) {
  return {
    currentPage: state.books.currentPage,
    allPages: state.books.allPages
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBooks: page => dispatch(fetchBooks(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)