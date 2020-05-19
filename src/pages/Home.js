import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import SettingsBlock from '../components/SettingsBlock/SettingsBlock'
import { Card } from '../components/Card'
import Loader from '../components/UI/Loader/Loader'
import { fetchBooks, setPageType } from '../store/actions/books'
import belka from '../belka.jpg'
import { Alert } from '../components/Alert'
import pageTypes from '../data/pageTypes.json'
import { resetFilterSettings } from '../store/actions/app'
import { getWordByLocale } from '../locale'


class Home extends Component {

  constructor() {
    super()
    this.state = {
      prevY: 0
    }
  }

  componentDidMount() {
    this.props.setPageType(pageTypes.HOME)
    this.props.fetchBooks()

    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    )
    this.observer.observe(this.loadingRef)
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      if (this.props.page < this.props.pages) {
        this.props.fetchBooks(this.props.page + 1)
      }
    }
    this.setState({ prevY: y });
  }

  render() {
    if (!this.props.books.length && this.props.loading) {
      return (
        <Loader />
      )
    }

    const loadingCSS = {
      height: "100px",
      margin: "30px"
    };

    return (
      <Layout withHeader={true} {...this.props}>
        <div>
          <h1 className="mb-5">{ getWordByLocale('titleHome', this.props.locale) }</h1>
          { this.props.showAlert ? <Alert text={ getWordByLocale('searchedNothing', this.props.locale) } className="danger" /> : null }

          <SettingsBlock
            currentLocale={this.props.locale}
            resetFilterSettings={this.props.resetFilterSettings}
          />

          <div className="row">
            { this.props.books.length
              ?
              this.props.books.map((book, index) => {
                const bookImage = book.image ? book.image : belka
                return (
                  <div
                    key={`${book.id}-${Math.random()}`}
                    className="col-sm-4">
                    <Card
                      book={book}
                      image={bookImage}
                      currentLocale={this.props.locale}
                    />
                  </div>
                )
              })
              : null
            }

            <div
              ref={loadingRef => (this.loadingRef = loadingRef)}
              style={loadingCSS}
            >
              {this.props.loading ? <Loader /> : null}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.app.loading,
    books: state.books.homeBooks,
    page: state.books.currentPage,
    pages: state.books.allPages,
    showAlert: state.app.showAlert,
    locale: state.app.locale
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPageType: type => dispatch(setPageType(type)),
    fetchBooks: page => dispatch(fetchBooks(page)),
    resetFilterSettings: () => dispatch(resetFilterSettings())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)