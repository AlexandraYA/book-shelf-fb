import React from 'react'
import { connect } from 'react-redux'
import { hideModal, doAction } from '../store/actions/app'


const Modal = props => {

  return (
    <React.Fragment>
      <div
        className="modal d-block"
        style={{backgroundColor: "rgba(0,0,0,0.5)"}}
        tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            { props.title.length
              ? (<div className="modal-header">
                <h5 className="modal-title">{props.title}</h5>
                <button
                  type="button"
                  className="close"
                  onClick={props.close}
                >
                  <span>&times;</span>
                </button>
              </div>)
              : null
            }

            <div className="modal-body">
              <p>{ props.text }</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={props.close}
              >
                { props.closeBtn }
              </button>

              { props.actionBtn.length
                ? <button
                  type="button"
                  className="btn btn-primary"
                  onClick={props.success}
                >
                  { props.actionBtn }
                </button>
                : null
              }

            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

function mapStateToProps(state) {
  return {
    text: state.app.modalText,
    title: state.app.modalTitle,
    closeBtn: state.app.modalCloseBtn,
    actionBtn: state.app.modalActionBtn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    close: () => dispatch(hideModal()),
    success: () => dispatch(doAction())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Modal)