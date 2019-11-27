import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fontAwesome } from '../../instances/font_awesome';

import BackButton from '../back_button';

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
          src={images.get('images/background.png')}></img>
      </div>
    );
  }

  renderHarvestStack(harvestStack: HarvestStack) {
    const qualityColors: { [colorName: string] : string } = {};
    qualityColors[QualityColors.RED] = '#f44336';
    qualityColors[QualityColors.ORANGE] = '#ff9800';
    qualityColors[QualityColors.YELLOW] = '#ffeb3b';
    qualityColors[QualityColors.GREEN] = '#8bc34a';
    qualityColors[QualityColors.BLUE] = '#2196f3';
    qualityColors[QualityColors.INDIGO] = '#673ab7';
    qualityColors[QualityColors.VIOLET] = '#9c27b0';
    qualityColors[QualityColors.RAINBOW] = '#cddc39';
    qualityColors[QualityColors.FLAME] = '#ff5722';
    qualityColors[QualityColors.AURORA] = '#00bcd4';

    let seed = this.props.recordBook.seedMap[harvestStack.seedId];
    let style = { color: qualityColors[harvestStack.quality] };
    return (
      <div className="inventory-slot" key={harvestStack.seedId+harvestStack.quality}>
        <div className="inventory-slot-row">
          <div>{seed.name.slice(0, 3)}</div>
          <div>
            <FontAwesomeIcon icon={fontAwesome.get('star')} style={style} />
          </div>

        </div>
        <div className="inventory-slot-row">
          <div></div>
          <div>{'x' + harvestStack.quantity}</div>
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
