import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Field from '../../models/field';
import Homestead from '../../models/homestead';
import RecordBook from '../../models/record_book';
import Card from '../../models/card';
import Seed from '../../models/seed/seed';
import Family from '../../models/seed/family';
import { families } from '../../instances/families';
import { images } from '../../instances/images';
import { CardTypes } from '../../models/enums/card_types';

import { setCard } from '../../actions/card';
import { harvestSeed, plantSeed } from '../../actions/field';

class StateDisplayFieldCard extends Component {
  props: FieldCardProps;
  state: FieldCardState;
  harvestInterval: NodeJS.Timeout;
  plantInterval: NodeJS.Timeout;

  constructor(props: FieldCardProps) {
    super(props);
    this.state = { harvestDelayRemaining: null, plantDelayRemaining: null };

    this.fieldCardClick = this.fieldCardClick.bind(this);
  }

  componentDidMount() {
    this.autoHarvestCheck();
    this.harvestInterval = setInterval(() => this.autoHarvestCheck(), 1000);
    this.plantInterval = setInterval(() => this.autoPlantCheck(), 1000);
  }

  componentWillUnmount() {
    this.setState({ harvestDelayRemaining: null, plantDelayRemaining: null });
    clearInterval(this.harvestInterval);
    clearInterval(this.plantInterval);
  }

  autoHarvestCheck() {
    let field = this.props.fields[this.props.fieldId];

    if (this.state.harvestDelayRemaining != null
      && this.state.harvestDelayRemaining <= 0) {
      this.fieldCardClick();
      this.setState({ harvestDelayRemaining: null });
    }
    else if (this.state.harvestDelayRemaining != null) {
      this.setState({
        harvestDelayRemaining: (this.state.harvestDelayRemaining - 1000)
      });
    }
    else if (field.seedMature == true) {
      this.setState({ harvestDelayRemaining: 10000 });
    }
  }

  autoPlantCheck() {
    let field = this.props.fields[this.props.fieldId];

    if (this.state.plantDelayRemaining != null
      && this.state.plantDelayRemaining <= 0) {
      let seed = this.props.recordBook.seedMap[field.lastSeedId];
      this.props.plantSeed(field, seed, this.props.recordBook.seedMap);
      this.setState({ plantDelayRemaining: null });
    }
    else if (this.state.plantDelayRemaining != null) {
      this.setState({
        plantDelayRemaining: (this.state.plantDelayRemaining - 1000)
      });
    }
    else if (field.seedPlantedId == null && field.lastSeedId != null) {
      this.setState({ plantDelayRemaining: 10000 });
    }
  }

  fieldCardClick() {
    let field = this.props.fields[this.props.fieldId];
    if (field.seedPlantedId == null) {
      this.props.setCard({type: CardTypes.SEED_PLANTING, spot: this.props.spot},
        this.props.spot);
    }
    else {
      if (field.seedMature == true) {
        this.props.harvestSeed(field, this.props.homestead,
          this.props.recordBook.seedMap);
      }
    }
  }

  render() {
    let field = this.props.fields[this.props.fieldId];

    if (field.seedPlantedId != null && field.seedMature == false) {
      return (
        <div className="game-card field-card">
          <div className="game-card-body">
            {this.renderPlant()}
            <div>{field.seedsNameLabel}</div>
            <div>{field.seedsAgeLabel}</div>
          </div>
          <img className="game-card-background"
            src={images.get('background')}></img>
        </div>
      );
    }

    else {
      return (
        <div className="game-card field-card">
          <div className="game-card-body">
            {this.renderPlant()}
            <button onClick={() => this.fieldCardClick()}>
              <div>{field.seedsNameLabel}</div>
              <div>{field.seedsAgeLabel}</div>
              {this.renderAutoHarvest()}
              {this.renderAutoPlant()}
            </button>
          </div>
          <img className="game-card-background"
            src={images.get('background')}></img>
        </div>
      );
    }

  }

  renderPlant() {
    let field = this.props.fields[this.props.fieldId];

    if (field.seedPlantedId != null) {
      return (
        <div className="sprite-wrapper">
          <img src={images.get(field.spriteAddress)} style={field.spriteStyle} />
        </div>
      )
    }
    else {
      return null;
    }
  }

  renderAutoHarvest() {
    if (this.state.harvestDelayRemaining != null) {
      return (
        <div>
          {'Auto-harvesting in ' + (this.state.harvestDelayRemaining / 1000) + 's...'}
        </div>
      );
    }
    else {
      return null;
    }
  }

  renderAutoPlant() {
    if (this.state.plantDelayRemaining != null) {
      return (
        <div>
          {'Auto-replanting in ' + (this.state.plantDelayRemaining / 1000) + 's...'}
        </div>
      );
    }
    else {
      return null;
    }
  }
}

interface FieldCardProps {
  fields: { [id: number] : Field };
  homestead: Homestead;
  recordBook: RecordBook;
  fieldId: number;
  spot: number;

  setCard: (card: Card, spot: number) => any;
  harvestSeed: (field: Field, homestead: Homestead,
    seedMap: { [id: number] : Seed }) => any;
  plantSeed: (field: Field, seed: Seed, seedMap: { [id: number] : Seed }) => any;
}

interface FieldCardState {
  harvestDelayRemaining: number;
  plantDelayRemaining: number;
}

function mapStateToProps({ fields, homestead, recordBook }) {
  return { fields, homestead, recordBook }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setCard, harvestSeed, plantSeed
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (StateDisplayFieldCard);
