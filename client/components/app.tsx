import React, { Component } from 'react';

import FieldCard from './field_card/index';
import ModalContainer from './modal_container';
import Initializer from './initializer';
import Header from './header';

export default class App extends Component {
  props: AppProps;
  spots = [0, 1];

  constructor(props: AppProps) {
    super(props);
  }

  render() {
    return (
      <div className="main-container">
        <Initializer />
        <ModalContainer />
        <Header />
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
}
