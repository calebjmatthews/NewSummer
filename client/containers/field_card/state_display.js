import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { harvestSeed } from '../../actions/field';
import { setCard } from '../../actions/card';
import ClimateDisplay from './climate_display';

class StateDisplayFieldCard extends Component {
  componentDidMount() {
    this.fieldCardClick = this.fieldCardClick.bind(this);
  }

  fieldCardClick() {
    if (this.props.field.seedPlanted == null) {
      this.props.setCard({type: "seedPlanting"}, this.props.spot);
    }
    else {
      if (this.props.field.seedIsMature() == true) {
        this.props.harvestSeed(
          this.props.fieldsState.fields,
          this.props.storehouseState.storehouse,
          this.props.field.id
        );
      }
    }
  }

  renderAgeLabel() {
    if (this.props.field.seedsAgeLabel.length > 0) {
      return (
        <div>
          {this.props.field.seedsAgeLabel}
        </div>
      );
    }
    else {
      return (null);
    }
  }

  render() {
    return (
      <div className="game-card field-card" style={this.props.transStyle}>
        <ClimateDisplay field={this.props.field} />
        <div className="field-card-body"
          onClick={() => this.fieldCardClick()}>
          <div>{this.props.field.seedsName}</div>
          <div>{this.renderAgeLabel()}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ fieldsState, storehouseState }) {
  return { fieldsState, storehouseState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    harvestSeed, setCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (StateDisplayFieldCard);
