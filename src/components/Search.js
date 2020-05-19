import React, { Component } from 'react'
import { connect } from 'react-redux'
import InlineForm from './InlineForm'
import { search } from '../store/actions/books'
import { saveSearchValue, saveSearchFieldValue } from '../store/actions/app'
import { getWordByLocale } from '../locale'


class Search extends Component {

  startSearching = (event) => {
    event.preventDefault()
    this.props.search();
  }

  render () {
    return (

      <InlineForm
        wrappedSelect={true}
        btn={{
          class: "btn-outline-info",
          disabled: false,
          text: getWordByLocale('searchButton', this.props.currentLocale),
          onClick: this.startSearching
        }}
        select={{
          defaultValue: this.props.field,
          onChange: event => this.props.changeSearchFieldValue(event.target.value),
          options: [{
            text: getWordByLocale('searchAuthor', this.props.currentLocale),
            value: "author"
          },{
            text: getWordByLocale('searchName', this.props.currentLocale),
            value: "name"
          }]
        }}
        input={{
          onChange: event => this.props.changeSearchValue(event.target.value),
          value: this.props.value,
          placeholder: getWordByLocale('searchDefault', this.props.currentLocale)
        }}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    field: state.app.filterSettings.searchField,
    value: state.app.filterSettings.search,
    currentLocale: state.app.locale
  }
}

function mapDispatchToProps(dispatch) {
  return {
    search: () => dispatch(search()),
    changeSearchValue: value => dispatch(saveSearchValue(value)),
    changeSearchFieldValue: value => dispatch(saveSearchFieldValue(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)