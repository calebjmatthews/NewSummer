import React, { Component } from 'react';

import FieldCard from './field_card/index';

export default class App extends Component {
  props: any;
  fieldIds = [0, 1];

  render() {
    return (
      <div>
        {this.fieldIds.map((id) => {
          return <FieldCard fieldId={id} />
        })}
      </div>
    );
  }
}
