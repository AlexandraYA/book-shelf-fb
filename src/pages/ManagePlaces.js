import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import { createControl, validate, validateForm } from '../form/formFramework'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'
import { Alert } from '../components/Alert'
import { IconTrash } from '../components/UI/icons'
import { createPlace, deletePlace, beforeDeletePlace } from '../store/actions/places'
import { checkToken } from '../store/actions/auth'
import { getWordByLocale } from '../locale'


class ManagePlaces extends Component {

  constructor(props) {
    super(props)

    this.state = {
      locale: this.props.locale,
      formControls: this.createFormControls(),
      isFormValid: false,
      regim: "create",
      alert: {
        create: {
          text: getWordByLocale('placeCreated', this.props.locale),
          class: "success"
        },
        delete: {
          text: getWordByLocale('placeDeleted', this.props.locale),
          class: "danger"
        }
      }
    }
  }

  componentDidMount() {
    this.props.checkToken(this.props.history)
  }

  componentDidUpdate() {
    if (this.state.locale !== this.props.locale) {
      this.setState({
        locale: this.props.locale,
        formControls: this.createFormControls(),
        isFormValid: false,
        regim: "create",
        alert: {
          create: {
            text: getWordByLocale('placeCreated', this.props.locale),
            class: "success"
          },
          delete: {
            text: getWordByLocale('placeDeleted', this.props.locale),
            class: "danger"
          }
        }
      })
    }
  }

  createTextInputControl = (label) => {
    return createControl({
      label: label,
      labelClass: "sr-only",
      errorMessage: getWordByLocale('errMinLeng3', this.props.locale)
    }, {required: true, minLength: 3});
  };

  createFormControls = () => {
    return {
      rusName: this.createTextInputControl(getWordByLocale('rusName', this.props.locale)),
      engName: this.createTextInputControl(getWordByLocale('engName', this.props.locale)),
      code: this.createTextInputControl(getWordByLocale('placeCode', this.props.locale))
    };
  };

  onSubmitHandler = event => {
    event.preventDefault()
  }

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = value
    control.touched = true
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  openDeleteModal = (placeCode, placeName) => {
    this.props.beforeDeletePlace(placeCode, placeName)
    this.setState({
      regim: 'delete'
    })
  }

  createPlaceHandler = event => {
    event.preventDefault()

    const {rusName, engName, code} = this.state.formControls;

    const place = {
      rusName: rusName.value,
      engName: engName.value,
      code: code.value
    }

    this.props.createPlace(place)

    this.setState({
      regim: 'create',
      formControls: this.createFormControls(),
      isFormValid: false
    })
  }

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]

      return (
          <Input
            key={controlName + index}
            label={control.label}
            labelClass={control.labelClass}
            value={control.value}
            type={control.type}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => this.changeHandler(event.target.value, controlName)}
          />
      );
    });
  }

  render() {
    const { regim, alert } = this.state

    return (
      <Layout withHeader={true} {...this.props}>
        { this.props.showAlert ? <Alert text={alert[regim].text} className={alert[regim].class} /> : null }
        <div>
          <h1 className="mb-5 text-break">{ getWordByLocale('titleManagePlaces', this.props.locale) }</h1>
          <div className="row justify-content-center mb-4">
            <div className="col-md-6">
              <ul className="list-group mb-5">
                { Object.values(this.props.places).map(place => (
                  <li key={place.code} className="list-group-item d-flex justify-content-between">
                    <span>{place.name[this.props.locale]}</span>
                    <Button
                      onClick={() => this.openDeleteModal(place.code, place.name[this.props.locale])}
                      disabled={false}
                      className="btn btn-danger btn-sm"
                    >
                      <IconTrash />
                    </Button>
                  </li>
                )) }
              </ul>
            </div>
            <div className="col-md-6">
              <form onSubmit={this.onSubmitHandler}>

                { this.renderInputs() }

                <Button
                    onClick={this.createPlaceHandler}
                    disabled={!this.state.isFormValid}
                    className="btn btn-success btn-lg btn-block"
                  >
                    { getWordByLocale('saveBtn', this.props.locale) }
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    places: state.places.places,
    showAlert: state.app.showAlert,
    locale: state.app.locale
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createPlace: place => dispatch(createPlace(place)),
    deletePlace: placeId => dispatch(deletePlace(placeId)),
    beforeDeletePlace: (placeId, placeName) => dispatch(beforeDeletePlace(placeId, placeName)),
    checkToken: history => dispatch(checkToken(history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePlaces)
