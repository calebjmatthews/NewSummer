import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import QualityJewel from '../quality_jewel';
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
  state: HarvestResultFieldCardState;
  interval: NodeJS.Timeout;

  constructor(props: HarvestResultFieldCardProps) {
    super(props);
    this.state = { autoDelayRemaining: null };

    this.sellAllClick = this.sellAllClick.bind(this);
    this.sellHalfClick = this.sellHalfClick.bind(this);
    this.collectAllClick = this.collectAllClick.bind(this);
  }

  componentDidMount() {
    this.autoCollectCheck();
    this.interval = setInterval(() => this.autoCollectCheck(), 1000);
  }

  componentWillUnmount() {
    this.setState({ autoDelayRemaining: null });
    clearInterval(this.interval);
  }

  autoCollectCheck() {
    if (this.props.homestead.autoOn) {
      if (this.state.autoDelayRemaining != null && this.state.autoDelayRemaining <= 0) {
        this.collectAllClick();
        this.setState({ autoDelayRemaining: null });
      }
      else if (this.state.autoDelayRemaining != null) {
        this.setState({ autoDelayRemaining: (this.state.autoDelayRemaining - 1000) });
      }
      else {
        this.setState({ autoDelayRemaining: 10000 });
      }
    }
    else if (this.state.autoDelayRemaining != null) {
      this.setState({ autoDelayRemaining: null });
    }
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
    let harvestResult = this.props.fields[this.props.fieldId].harvestResult;
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
              <QualityJewel qualityColor={harvestResult.harvestStack.quality} />
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
              <div>{'Collect all'}</div>
              <div>{this.renderAutoCollect()}</div>
            </button>
          </div>
        </div>
        <img className="game-card-background"
          src={images.get('background')}></img>
      </div>
    );
  }

  renderAutoCollect() {
    if (this.state.autoDelayRemaining != null) {
      return (
        <div>
          {'Auto-collecting in ' + (this.state.autoDelayRemaining / 1000) + 's...'}
        </div>
      );
    }
    else {
      return null;
    }
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

interface HarvestResultFieldCardState {
  autoDelayRemaining: number;
}

function mapStateToProps({ fields, recordBook, homestead }) {
  return { fields, recordBook, homestead }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({ sellAllHarvest, sellHalfHarvest, collectAllHarvest },
    dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HarvestResultFieldCard);
