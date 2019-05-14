import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { harvestSeed } from '../../actions/field';
import { setCard } from '../../actions/card';

class SeedDisplayFieldCard extends Component {
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

  render() {
    return (
      <div className="game-card" style={this.props.transStyle}
        onClick={() => this.fieldCardClick()}>
        <div>
          {this.props.field.seedsName}
        </div>
        <div>
          {this.props.field.seedsAgeLabel}
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
  (SeedDisplayFieldCard);
