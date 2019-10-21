import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../models/modal';
import { ModalTypes } from '../models/enums/modal_types';

class ModalContainer extends Component {
  props: ModalContainerProps;

  constructor(props: ModalContainerProps) {
    super(props);
  }

  render() {
    let modal = this.props.modals[0];

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
          </div>
        </div>
        <div className="modal-background"></div>
      </div>
    );
  }
}

interface ModalContainerProps {
  modals: Modal[];
}

function mapStateToProps({ modals }) {
  return { modals }
}

export default connect(mapStateToProps)(ModalContainer);
