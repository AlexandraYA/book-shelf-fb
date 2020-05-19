import React from 'react'
import { connect } from 'react-redux'
import { Navbar } from './Navbar/Navbar'
import Modal from './Modal'
import { changeLocale } from '../store/actions/app'
import { logout } from '../store/actions/auth'


const Layout = props => {
  return (
    <div className="flex-grow-1 bg-light">
      { props.withHeader && <header>
        <Navbar
          changeLocaleHandle={props.changeLocale}
          currentLocale={props.locale}
          logoutHandler={() => props.logout(props.history)}
          isAuth={props.isAuth}
        />
      </header>
      }
      <div className="container-fluid pt-5">
        { props.children }
      </div>
      { props.showModal ? <Modal /> : null }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    showModal: state.app.showModal,
    locale: state.app.locale,
    isAuth: state.auth.isAuth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeLocale: () => dispatch(changeLocale()),
    logout: history => dispatch(logout(history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);