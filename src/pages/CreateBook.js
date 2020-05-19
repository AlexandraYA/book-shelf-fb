import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import { createControl, validate, validateForm } from '../form/formFramework'
import Input from '../components/UI/Input'
import Select from '../components/UI/Select'
import Button from '../components/UI/Button'
import { addBookToLibrary } from '../store/actions/books'
import { checkToken } from '../store/actions/auth'
import { Alert } from '../components/Alert'
import { getWordByLocale } from '../locale'


class CreateBook extends Component {

  constructor(props) {
    super(props)

    this.state = Object.assign(
      this.getInitialState(),
      {placeCode: ''}
    )

    this.uploadFileHandler.bind(this)
  }

  componentDidMount() {
    this.props.checkToken(this.props.history)

    if (this.props.isAuth) {
      this.setState({
        placeCode: Object.keys(this.props.places).length ? Object.keys(this.props.places)[0] : ''
      })
    }
  }

  componentDidUpdate() {
    if (this.state.locale !== this.props.locale) {
      this.setState(
        Object.assign(
          {placeCode: Object.keys(this.props.places).length ? Object.keys(this.props.places)[0] : ''},
          this.getInitialState()
        )
      )
    }
  }

  getInitialState = () => ({
    locale: this.props.locale,
    isFormValid: false,
    formControls: this.createFormControls(),
    image: createControl({
      label: getWordByLocale('bookPhoto', this.props.locale),
      type: 'file',
      errorMessage: getWordByLocale('errBookCover', this.props.locale)
    }, {required: true}),
  })

  createTextInputControl = (label) => {
    return createControl({
      label: label,
      labelClass: "sr-only",
      errorMessage: getWordByLocale('errNotEmpty', this.props.locale)
    }, {required: true});
  };

  createFormControls = () => {
    return {
      rusAuthor: this.createTextInputControl(getWordByLocale('rusAuthor', this.props.locale)),
      engAuthor: this.createTextInputControl(getWordByLocale('engAuthor', this.props.locale)),
      rusName: this.createTextInputControl(getWordByLocale('rusName', this.props.locale)),
      engName: this.createTextInputControl(getWordByLocale('engName', this.props.locale)),
      year: this.createTextInputControl(getWordByLocale('yearTitle', this.props.locale))
    };
  };

  onSubmitHandler = event => {
    event.preventDefault()
  }

  addBookHandler = event => {
    event.preventDefault()

    const {rusAuthor, engAuthor, rusName, engName, year} = this.state.formControls;

    const book = {
      author: {
        rus: rusAuthor.value,
        eng: engAuthor.value
      },
      name: {
        rus: rusName.value,
        eng: engName.value
      },
      year: year.value,
      place: this.state.placeCode,
      image: this.state.image.value,
      isNew: true
    }

    this.props.createBook(book, this.props.history)

    this.setState({
      isFormValid: false,
      formControls: this.createFormControls(),
      image: createControl({
        label: getWordByLocale('bookCover', this.props.locale),
        type: "file",
        errorMessage: getWordByLocale('errBookCover', this.props.locale)
      }, {required: true}),
      placeCode: Object.keys(this.props.places)[0]
    });
  }

  changeHandler = (controlValue, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.touched = true;
    control.value = controlValue;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    });
  }

  selectChangeHandler = (value) => {
    this.setState({
      placeCode: value
    })
  }

  renderControls() {
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

  uploadFileHandler = (event) => {
    const image = {...this.state.image}

    image.touched = true
    image.value = URL.createObjectURL(event.target.files[0])
    image.valid = validate(image.value, image.validation)

    this.setState({
      image
    })
  }

  render() {
    const select = <Select
          label={getWordByLocale('bookPlaceTitle', this.props.locale)}
          value={this.state.placeCode}
          onChange={event => this.selectChangeHandler(event.target.value)}
          options={Object.values(this.props.places).map(place => {
                    return {
                      text: place.name[this.props.locale],
                      value: place.code
                    }
                  })}
        />

    return (
      <Layout withHeader={true} {...this.props}>
        { this.props.showAlert ? <Alert text={getWordByLocale('bookCreated', this.props.locale)} className="success" /> : null }
        <div>
          <div className="mb-5">
            <h2 className="text-center">{ getWordByLocale('titleCreateBook', this.props.locale) }</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-sm-12 col-md-10 col-lg-5">
              <div className="shadow-sm bg-white rounded p-5">
                <form onSubmit={this.onSubmitHandler}>

                  { this.renderControls() }

                  { select }

                  <Input
                    label={this.state.image.label}
                    labelClass={this.state.image.labelClass}
                    type="file"
                    valid={this.state.image.valid}
                    shouldValidate={!!this.state.image.validation}
                    touched={this.state.image.touched}
                    errorMessage={this.state.image.errorMessage}
                    onChange={this.uploadFileHandler}
                  />

                  <div className="mb-2">
                    { this.state.image.value
                        ? <img style={{width: '200px', height: '200px'}} src={this.state.image.value} alt="preview" />
                        : null
                    }
                  </div>

                  <Button
                    onClick={this.addBookHandler}
                    disabled={!this.state.isFormValid}
                    className="btn btn-success btn-lg btn-block"
                  >
                    { getWordByLocale('saveBtn', this.props.locale) }
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    showAlert: state.app.showAlert,
    places: state.places.places,
    locale: state.app.locale,
    isAuth: state.auth.isAuth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createBook: (newBook, history) => dispatch(addBookToLibrary(newBook, history)),
    checkToken: history => dispatch(checkToken(history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBook)