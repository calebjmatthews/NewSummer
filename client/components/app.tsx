import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FieldCard from './field_card/index';
import ModalContainer from './modal_container';
import { addModal } from '../actions/modal';

import Modal from '../models/modal';
import { ModalTypes } from '../models/enums/modal_types';

class App extends Component {
  props: AppProps;
  spots = [0, 1];

  constructor(props: AppProps) {
    super(props);

    this.props.addModal(new Modal({
      type: ModalTypes.ALERT,
      title: 'Test modal',
      messages: ['Here are some messages for a test modal',
        'Here\'s a second message', 'Here\'s a third']
    }));
  }

  render() {
    return (
      <div className="main-container">
        <ModalContainer />
        <div className="game-card-container">
          {this.spots.map((spot) => {
            return <FieldCard key={spot} spot={spot} fieldId={spot} />
          })}
        </div>
      </div>
    );
  }
}

interface AppProps {
  addModal: Function;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addModal
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(App);
