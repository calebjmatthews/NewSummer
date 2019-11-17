import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { dismissModal } from '../actions/modal';
import Modal from '../models/modal';
import { ModalTypes } from '../models/enums/modal_types';

class ModalContainer extends Component {
  props: ModalContainerProps;

  constructor(props: ModalContainerProps) {
    super(props);

    this.backgroundClick = this.backgroundClick.bind(this);
    this.okClick = this.okClick.bind(this);
  }

  backgroundClick() {
    this.props.dismissModal();
  }

  okClick() {
    this.props.dismissModal();
  }

  render() {
    let modal = this.props.modals[0];

    if (modal != undefined) {
      return (
        <div className="modal-container">
          <div className="modal">
            <div className="modal-header">{modal.title}</div>
            <div className="modal-body">
              {modal.messages.map((message, index) => {
                return (
                  <p key={index}>{message}</p>
                );
              })}
              <button type="button" className="button-dark"
                onClick={() => this.okClick()}>
                Ok
              </button>
            </div>
          </div>
          <div className="modal-background" onClick={() => this.backgroundClick()}></div>
        </div>
      );
    }
    else {
      return null;
    }
  }
}

interface ModalContainerProps {
  modals: Modal[];

  dismissModal: () => any;
}

function mapStateToProps({ modals }) {
  return { modals }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    dismissModal
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
