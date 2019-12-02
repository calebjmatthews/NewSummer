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
import { harvestSeed } from '../../actions/field';

class StateDisplayFieldCard extends Component {
  props: FieldCardProps;
  state: FieldCardState;
  interval: NodeJS.Timeout;

  constructor(props: FieldCardProps) {
    super(props);
    this.state = { autoDelayRemaining: null };

    this.fieldCardClick = this.fieldCardClick.bind(this);
  }

  componentDidMount() {
    this.autoHarvestCheck();
    this.interval = setInterval(() => this.autoHarvestCheck(), 1000);
  }

  componentWillUnmount() {
    this.setState({ autoDelayRemaining: null });
    clearInterval(this.interval);
  }

  autoHarvestCheck() {
    let field = this.props.fields[this.props.fieldId];

    if (this.state.autoDelayRemaining != null && this.state.autoDelayRemaining <= 0) {
      this.fieldCardClick();
    }
    else if (this.state.autoDelayRemaining != null) {
      this.setState({ autoDelayRemaining: (this.state.autoDelayRemaining - 1000) });
    }
    else if (field.seedMature == true) {
      this.setState({ autoDelayRemaining: 10000 });
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
    if (this.state.autoDelayRemaining != null) {
      return (
        <div>
          {'Auto-harvesting in ' + (this.state.autoDelayRemaining / 1000) + 's...'}
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
}

interface FieldCardState {
  autoDelayRemaining: number;
}

function mapStateToProps({ fields, homestead, recordBook }) {
  return { fields, homestead, recordBook }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setCard, harvestSeed
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (StateDisplayFieldCard);
