import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Field from '../../models/field';

class StateDisplayFieldCard extends Component {
  props: FieldCardProps;

  constructor(props: FieldCardProps) {
    super(props);
  }

  componentDidMount() {
    this.fieldCardClick = this.fieldCardClick.bind(this);
  }

  fieldCardClick() {

  }

  render() {
    let field = this.props.fields.get(this.props.fieldId);

    return (
      <div className="game-card field-card">
        <div className="field-card-body" onClick={() => this.fieldCardClick()}>
          <div>{field.seedsNameLabel}</div>
          <div>{field.seedsAgeLabel}</div>
        </div>
      </div>
    );
  }
}

interface FieldCardProps {
  fields: Map<number, Field>;
  fieldId: number;
}

function mapStateToProps({ fields }) {
  return { fields }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (StateDisplayFieldCard);
