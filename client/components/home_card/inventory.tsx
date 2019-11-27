import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BackButton from '../back_button';
import QualityJewel from '../quality_jewel';

import Homestead from '../../models/homestead';
import HarvestStack from '../../models/seed/harvest_stack';
import RecordBook from '../../models/record_book';
import { QualityColors } from '../../models/enums/quality_colors';
import { utils } from '../../models/utils';
import { images } from '../../instances/images';

class InventoryCard extends Component {
  props: InventoryCardProps;

  constructor(props: InventoryCardProps) {
    super(props);
  }

  render() {
    let hsIds = Object.keys(this.props.homestead.harvestStackMap);
    return (
      <div className="game-card">
        <div className="game-card-body">
          <BackButton spot={this.props.spot} />
          <div className="inventory-container">
            {utils.range(this.props.homestead.inventorySize).map((index) => {
              let harvestStack = this.props.homestead.harvestStackMap[hsIds[index]];
              if (harvestStack != undefined) {
                return this.renderHarvestStack(harvestStack);
              }
              else {
                return (
                  <div className="inventory-slot" key={index}>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <img className="game-card-background"
          src={images.get('background')}></img>
      </div>
    );
  }

  renderHarvestStack(harvestStack: HarvestStack) {
    let seed = this.props.recordBook.seedMap[harvestStack.seedId];
    return (
      <div className="inventory-slot" key={harvestStack.seedId+harvestStack.quality}>
        <div className="inventory-slot-row">
          <div className="inventory-slot-column">
            <div>{seed.adjectives[0].word}</div>
            <div>{seed.cultivarName + ' ' + seed.numeral}</div>
          </div>
          <div className="inventory-icon-wrapper">
            <img src={images.get('wild_grass_icon')} />
          </div>
          <div className="inventory-slot-column">
            <QualityJewel qualityColor={harvestStack.quality} />
            <div>{'x' + harvestStack.quantity}</div>
          </div>
        </div>
        <div className="inventory-value">
          {utils.formatMoney(harvestStack.totalValue)}
        </div>
      </div>
    );
  }
}

interface InventoryCardProps {
  spot: number;

  homestead: Homestead;
  recordBook: RecordBook;
}

function mapStateToProps({ homestead, recordBook }) {
  return { homestead, recordBook }
}

export default connect(mapStateToProps)(InventoryCard);
