import React, { Component } from 'react';

import FieldCard from './field_card/index';
import HomeCard from './home_card/index';
import ModalContainer from './modal_container';
import Initializer from './initializer';
import Header from './header';

export default class App extends Component {
  props: AppProps;
  fields = [1, 2];

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
          <HomeCard key={0} spot={0} />
          {this.fields.map((spot) => {
            return <FieldCard key={spot} spot={spot} fieldId={spot-1} />
          })}
        </div>
      </div>
    );
  }
}

interface AppProps {
}
