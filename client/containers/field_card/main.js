import React, { Component } from 'react';
import SeedPlantingFieldCard from './seed_planting';
import SeedDisplayFieldCard from './seed_display';
import SeedDetailCard from '../seed_detail';

class FieldCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seedPlanting: false,
      seedDetail: false
    }
  }
  componentDidMount() {
    this.updateSeedPlanting = this.updateSeedPlanting.bind(this);
    this.updateSeedDetail = this.updateSeedDetail.bind(this);
  }

  updateSeedPlanting(seedPlanting) {
    this.setState({ seedPlanting: seedPlanting });
  }

  updateSeedDetail(seedDetail) {
    this.setState({ seedDetail: seedDetail });
  }

  render() {
    if (this.state.seedDetail != false) {
      return (
        <SeedDetailCard transStyle={this.props.transStyle}
          seed={this.state.seedDetail}
          updateSeedDetail={this.updateSeedDetail.bind(this)} />
      )
    }
    if (this.state.seedPlanting == true) {
      return (
        <SeedPlantingFieldCard transStyle={this.props.transStyle}
          field={this.props.field}
          updateSeedPlanting={this.updateSeedPlanting.bind(this)}
          updateSeedDetail={this.updateSeedDetail.bind(this)} />
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
