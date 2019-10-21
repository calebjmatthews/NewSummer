import React, { Component } from 'react';

import FieldCard from './field_card/index';

export default class App extends Component {
  props: any;
  spots = [0, 1];

  render() {
    return (
      <div className="container-main">
        <div className="game-card-container">
          {this.spots.map((spot) => {
            return <FieldCard key={spot} spot={spot} fieldId={spot} />
          })}
        </div>
      </div>
    );
  }
}
