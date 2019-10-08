import React, { Component } from 'react';

import FieldCard from './field_card/index';

export default class App extends Component {
  props: any;
  fieldIds = [0, 1];

  render() {
    return (
      <div className="container-main">
        <div className="game-card-container">
          {this.fieldIds.map((id) => {
            return <FieldCard fieldId={id} key={id} />
          })}
        </div>
      </div>
    );
  }
}
