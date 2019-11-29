import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fontAwesome } from '../../instances/font_awesome';

import BackButton from '../back_button';
import QualityJewel from '../quality_jewel';
import { setCard } from '../../actions/card';

import Homestead from '../../models/homestead';
import HarvestStack from '../../models/seed/harvest_stack';
import RecordBook from '../../models/record_book';
import Card from '../../models/card';
import { QualityColors } from '../../models/enums/quality_colors';
import { CardTypes } from '../../models/enums/card_types';
import { utils } from '../../models/utils';
import { images } from '../../instances/images';

class InventoryCard extends Component {
  props: InventoryCardProps;
  state: InventoryCardState;

  constructor(props: InventoryCardProps) {
    super(props);

    this.state = {
      buttons: {
        detail: {
          className: 'pseudo-button selected',
          icon: 'check-circle',
          label: ' Detail',
          selected: true
        },
        sellOne: {
          className: 'pseudo-button',
          icon: 'circle',
          label: ' Sell One',
          selected: false
        },
        sellAll: {
          className: 'pseudo-button',
          icon: 'circle',
          label: ' Sell All',
          selected: false
        }
      }
    };

    this.buttonClick = this.buttonClick.bind(this);
    this.slotClick = this.slotClick.bind(this);
  }

  buttonClick(buttonName: string) {
    if (!this.state.buttons[buttonName].selected) {
      let newButtons: { [buttonName: string] : InventoryButton } = {};
      Object.keys(this.state.buttons).map((mButtonName) => {
        newButtons[mButtonName] = {};
        if (mButtonName == buttonName) {
          newButtons[mButtonName].className = 'pseudo-button selected';
          newButtons[mButtonName].icon = 'check-circle';
          newButtons[mButtonName].selected = true;
        }
        else {
          newButtons[mButtonName].className = 'pseudo-button';
          newButtons[mButtonName].icon = 'circle';
          newButtons[mButtonName].selected = false;
        }
        newButtons[mButtonName].label = this.state.buttons[mButtonName].label;
      });
      this.setState({ buttons: newButtons });
    }
  }

  slotClick(harvestStackId: string) {
    let selButtonName: string = null;
    Object.keys(this.state.buttons).map((buttonName) => {
      if (this.state.buttons[buttonName].selected) {
        selButtonName = buttonName;
      }
    });

    switch(selButtonName) {
      case 'detail':
      let seed = this.props.recordBook.seedMap
        [this.props.homestead.harvestStackMap[harvestStackId].seedId];
      this.props.setCard({type: CardTypes.SEED_DETAIL, selectedSeed: seed,
        spot: this.props.spot}, this.props.spot);
      break;
    }
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
          <div className="button-container-vertical">
            {Object.keys(this.state.buttons).map((buttonName) => {
              return this.renderButton(buttonName);
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
      <div className="inventory-slot" key={harvestStack.seedId+harvestStack.quality}
        onClick={() => this.slotClick(harvestStack.seedId+harvestStack.quality)}>
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

  renderButton(buttonName: string) {
    let button = this.state.buttons[buttonName];
    return (
      <div key={buttonName} className={button.className}
        onClick={() => this.buttonClick(buttonName)}>
        <FontAwesomeIcon icon={fontAwesome.get(button.icon)} />
        {button.label}
        <div className="icon-spacer"></div>
      </div>
    );
  }
}

interface InventoryCardProps {
  spot: number;

  homestead: Homestead;
  recordBook: RecordBook;
  setCard: (card: Card, spot: number) => any;
}

interface InventoryCardState {
  buttons: { [buttonName: string] : InventoryButton};
}

class InventoryButton {
  className?: string;
  icon?: string;
  label?: string;
  selected?: boolean;
}

function mapStateToProps({ homestead, recordBook }) {
  return { homestead, recordBook }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setCard
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(InventoryCard);
