import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sort } from '../store/actions/books'
import { saveSortValue } from '../store/actions/app'
import { getWordByLocale } from '../locale'
import InlineForm from './InlineForm'


class Sort extends Component {

  startSorting = (event) => {
    event.preventDefault()
    this.props.sort();
  }

  render() {
    return (
      <InlineForm
        wrappedSelect={false}
        btn={{
          class: "btn-outline-success",
          disabled: false,
          text: getWordByLocale('sortButton', this.props.currentLocale),
          onClick: this.startSorting
        }}
        select={{
          selectLabel: getWordByLocale('sortDefault', this.props.currentLocale),
          defaultValue: this.props.sortType,
          onChange: event => this.props.changeSortValue(event.target.value),
          options: Object.keys(this.props.sortTypes).map(key => {
                          return {
                            text: this.props.sortTypes[key].text[this.props.currentLocale],
                            value: key
                          }
                        })
        }}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    sortTypes: state.app.sortTypes,
    sortType: state.app.filterSettings.sortType,
    currentLocale: state.app.locale
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sort: () => dispatch(sort()),
    changeSortValue: value => dispatch(saveSortValue(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sort)