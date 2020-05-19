import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import { getBookById } from '../store/actions/books'
import Loader from '../components/UI/Loader/Loader'
import places from '../data/places.json'
import { getWordByLocale } from '../locale'


class BookDetail extends Component {

  constructor(props) {
    super(props)

    this.state = {
      bookCover: require('../belka.jpg'),
      bookUploaded: false
    }
  }

  componentDidMount() {
    this.props.getBookById(this.props.match.params.id)
  }

  componentDidUpdate() {
    if (!this.state.bookUploaded) {
      this.setState({
        bookUploaded: true,
        bookCover: this.props.book.isNew ? this.props.book.image : require('../assets/images/' + this.props.book.image)
      })
    }
  }

  render() {
    const bookPlace = this.props.book.place
    return (
      <Layout withHeader={true} {...this.props}>
        <div className="container">
          {
            this.props.book
              ? (
                <div>
                  <h1 className="mb-5">{this.props.book.name[this.props.locale]}</h1>
                  <div className="row">
                    <div className="col-12 col-sm-7">
                      <ul className="list-group mb-4">
                        <li className="list-group-item">
                          <strong>{ getWordByLocale('author', this.props.locale) }</strong>
                          {this.props.book.author[this.props.locale]}
                        </li>
                        <li className="list-group-item">
                          <strong>{ getWordByLocale('yearBookPublic', this.props.locale) }</strong>
                          {this.props.book.year}
                        </li>
                        <li className="list-group-item">
                          <strong>{ getWordByLocale('bookPlace', this.props.locale) }</strong>
                          {bookPlace ? places[bookPlace].name[this.props.locale] : ""}
                        </li>
                      </ul>
                    </div>
                    <div className="col-12 col-sm-5 text-center">
                     <img
                        style={{maxWidth: '300px', width: '100%'}}
                        src={this.state.bookCover}
                        alt={ getWordByLocale('bookCover', this.props.locale) }
                      />
                    </div>
                  </div>
                </div>
              )
              : <Loader />
          }
        </div>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    book: state.books.book,
    locale: state.app.locale
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getBookById: id => dispatch(getBookById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail)
