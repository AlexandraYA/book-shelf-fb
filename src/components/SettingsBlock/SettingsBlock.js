import React, {Component} from 'react'
import classes from './SettingsBlock.module.css'
import Button from '../UI/Button'
import Search from '../Search'
import Filter from '../Filter'
import Sort from '../Sort'
import { getWordByLocale } from '../../locale'


class SettingsBlock extends Component {

  state = {
    open: true
  }

  toggleFilters = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    return (
      <div className="row justify-content-center mb-4">
        <div className="col-sm-8 col-lg-6">
          <div className="d-flex justify-content-between mb-3">
            <Button
              className="btn btn-primary"
              disabled={false}
              onClick={this.toggleFilters}
            >
              { getWordByLocale('toggleFilters', this.props.currentLocale) }
            </Button>
            <Button
              className="btn btn-danger"
              disabled={false}
              onClick={this.props.resetFilterSettings}
            >
              { getWordByLocale('resetButton', this.props.currentLocale) }
            </Button>
          </div>
          <div className={this.state.open ? classes.settingsBlock + " " + classes.open : classes.settingsBlock + " " + classes.close}>
          {
            this.state.open
            ? (
              <div>
                <div className="mb-3">
                  <Search />
                </div>
                <div className="mb-3">
                  <Filter />
                </div>
                <div>
                  <Sort />
                </div>
              </div>
            )
            : null
          }
          </div>
        </div>
      </div>
    )
  }
}

export default SettingsBlock