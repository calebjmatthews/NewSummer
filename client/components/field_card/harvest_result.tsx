import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fontAwesome } from '../../instances/font_awesome';
import { sellAllHarvest, sellHalfHarvest, collectAllHarvest }
  from '../../actions/field';
import { utils } from '../../models/utils';

import Field from '../../models/field';
import RecordBook from '../../models/record_book';
import Homestead from '../../models/homestead';
import { QualityColors } from '../../models/enums/quality_colors';
import { images } from '../../instances/images';

class HarvestResultFieldCard extends Component {
  props: HarvestResultFieldCardProps;

  constructor(props: HarvestResultFieldCardProps) {
    super(props);

    this.sellAllClick = this.sellAllClick.bind(this);
    this.sellHalfClick = this.sellHalfClick.bind(this);
    this.collectAllClick = this.collectAllClick.bind(this);
  }

  sellAllClick() {
    this.props.sellAllHarvest(this.props.fields[this.props.fieldId],
      this.props.homestead);
  }

  sellHalfClick() {
    this.props.sellHalfHarvest(this.props.fields[this.props.fieldId],
      this.props.homestead);
  }

  collectAllClick() {
    this.props.collectAllHarvest(this.props.fields[this.props.fieldId],
      this.props.homestead);
  }

  render() {
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

    let harvestResult = this.props.fields[this.props.fieldId].harvestResult;
    let style = { 'color': qualityColors[harvestResult.harvestStack.quality] };
    let seed = this.props.recordBook.seedMap[harvestResult.harvestStack.seedId];
    let singleValue = harvestResult.harvestStack.totalValue /
      harvestResult.harvestStack.quantity
    return (
      <div className="game-card field-card">
        <div className="game-card-body harvest-body">
          <div className="harvest-comment">
            {harvestResult.comment}
          </div>
          <div>
            <div className="harvest-description-label">
              {'Base value:'}
            </div>
            <div className="harvest-description-value">
              {utils.formatMoney(harvestResult.baseValue)}
            </div>
            {Object.keys(harvestResult.descriptions).map((prop) => {
              return (
                <div key={prop}>
                  <div className={"harvest-description-label "
                    + harvestResult.descriptions[prop].sign}>
                    {harvestResult.descriptions[prop].message + ' : '
                      + harvestResult.descriptions[prop].value}
                  </div>
                  <div className={"harvest-description-value "
                    + harvestResult.descriptions[prop].sign}>
                    {harvestResult.descriptions[prop].result}
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <div className="harvest-description-value">
              {seed.name + ' '}
              <FontAwesomeIcon icon={fontAwesome.get('star')} style={style} />
              {' x ' + harvestResult.harvestStack.quantity + ' ='}
            </div>
            <div className="harvest-value-final">
              {utils.formatMoney(harvestResult.value)}
            </div>
          </div>
          <div>
            <button onClick={() => this.sellAllClick()}>
              {'Sell all'}
            </button><button onClick={() => this.sellHalfClick()}>
              {'Sell half'}
            </button>
            <button onClick={() => this.collectAllClick()}>
              {'Collect all'}
            </button>
          </div>
        </div>
        <img className="game-card-background"
          src={images.get('images/background.png')}></img>
      </div>
    );
  }
}

interface HarvestResultFieldCardProps {
  fields: { [id: number] : Field };
  recordBook: RecordBook;
  homestead: Homestead;
  fieldId: number;

  sellAllHarvest: (field: Field, homestead: Homestead) => any;
  sellHalfHarvest: (field: Field, homestead: Homestead) => any;
  collectAllHarvest: (field: Field, homestead: Homestead) => any;
}

function mapStateToProps({ fields, recordBook, homestead }) {
  return { fields, recordBook, homestead }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({ sellAllHarvest, sellHalfHarvest, collectAllHarvest },
    dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HarvestResultFieldCard);
