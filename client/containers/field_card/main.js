import React, { Component } from 'react';
import SeedPlantingFieldCard from './seed_planting';
import SeedDisplayFieldCard from './seed_display';

class FieldCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seedPlanting: false
    }
  }
  componentDidMount() {
    this.updateSeedPlanting = this.updateSeedPlanting.bind(this);
  }

  updateSeedPlanting(seedPlanting) {
    this.setState({ seedPlanting: seedPlanting });
  }

  render() {
    if (this.state.seedPlanting == true) {
      return (
        <SeedPlantingFieldCard transStyle={this.props.transStyle}
          field={this.props.field}
          updateSeedPlanting={this.updateSeedPlanting.bind(this)} />
      );
    }
    else {
      return (
        <SeedDisplayFieldCard transStyle={this.props.transStyle}
          field={this.props.field}
          updateSeedPlanting={this.updateSeedPlanting.bind(this)} />
      );
    }
  }
}

export default FieldCard;
