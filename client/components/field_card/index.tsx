import React, { Component } from 'react';
import { connect } from 'react-redux';

import Field from '../../models/field';

class FieldCard extends Component {
  props: FieldCardProps;

  constructor(props: FieldCardProps) {
    super(props);
  }

  render() {
    let field = this.props.fields.get(this.props.fieldId);

    return (
      <div className="game-card field-card">
        <div className="field-card-body">
          <div>{field.seedsNameLabel}</div>
          <div>{this.renderAgeLabel(field)}</div>
        </div>
      </div>
    );
  }

  renderAgeLabel(field: Field) {
    if (field.seedsAgeLabel.length > 0) {
      return (
        <div>
          {field.seedsAgeLabel}
        </div>
      );
    }
    else {
      return (null);
    }
  }
}

interface FieldCardProps {
  fields: Map<number, Field>;
  fieldId: number;
}

function mapStateToProps({ fields }) {
  return { fields }
}

export default connect(mapStateToProps)(FieldCard);
