import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ParticleEmitter from './particle_emitter';

import { dismissModal } from '../actions/modal';
import Modal from '../models/modal';
import { ModalTypes } from '../models/enums/modal_types';

class ModalContainer extends Component {
  props: ModalContainerProps;
  state: ModalContainerState;

  constructor(props: ModalContainerProps) {
    super(props);

    this.state = { modalExists: null }
    this.backgroundClick = this.backgroundClick.bind(this);
    this.okClick = this.okClick.bind(this);
  }

  backgroundClick() {
    this.props.dismissModal();
  }

  okClick() {
    this.props.dismissModal();
  }

  renderModal(modal: Modal) {
    switch(modal.type) {

      case ModalTypes.ALERT:
        return (
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
        );

      case ModalTypes.BANNER_LARGE:
      return (
        <div className="modal modal-banner-large">
          <div className="modal-header">
            <h2>{modal.title}</h2>
            <div className="subtitle">{modal.subtitle}</div>
          </div>
          <div className="modal-body">
            {modal.messages.map((message, index) => {
              return (
                <p key={index}>{message}</p>
              );
            })}
            <button type="button" className="button-dark"
              onClick={() => this.okClick()}>
              Great!
            </button>
          </div>
        </div>
      );
    }
  }

  getModalElement(refreshing: boolean = false): any {
    let element: any = document.getElementsByClassName('modal-banner-large')[0];
    if (element == undefined) {
      if (refreshing) { this.setState({ modalExists: false }) };
      setTimeout(() => this.getModalElement(true), 10);
    }
    else {
      if (refreshing) { this.setState({ modalExists: true }) };
    }
    return element;
  }

  render() {
    let modal = this.props.modals[0];

    if (modal != undefined) {
      return (
        <div className="modal-container">
          {this.renderModal(modal)}
          {this.renderParticles(modal)}
          <div className="modal-background" onClick={() => this.backgroundClick()}></div>
        </div>
      );
    }
    else {
      return null;
    }
  }

  renderParticles(modal: Modal) {
    switch(modal.type) {
      case (ModalTypes.BANNER_LARGE):
        let element = this.getModalElement();
        if (this.state.modalExists) {
          console.log("document.getElementsByClassName('modal-banner-large')");
          console.log(document.getElementsByClassName('modal-banner-large'));
          return(
            <div>
              <ParticleEmitter type={'sparkle'} direction={'up'}
                top={element.offsetTop} left={0}
                width={element.scrollWidth} height={0} />
              <ParticleEmitter type={'sparkle'} direction={'down'}
                top={(element.offsetTop + element.clientHeight)} left={0}
                width={element.scrollWidth} height={0} />
            </div>
          );
        }
        else {
          return null;
        }
    }
  }
}

interface ModalContainerProps {
  modals: Modal[];

  dismissModal: () => any;
}

interface ModalContainerState {
  modalExists: boolean
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
