import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setCard } from '../../actions/card';

import Homestead from '../../models/homestead';
import Card from '../../models/card';
import { CardTypes } from '../../models/enums/card_types';

class InventoryBox extends Component {
  props: InventoryBoxProps;

  constructor(props: InventoryBoxProps) {
    super(props);

    this.state = {
      currentlyVisiting: null
    }

    this.inventoryClick = this.inventoryClick.bind(this);
  }

  inventoryClick() {
    this.props.setCard({type: CardTypes.INVENTORY_OPEN, spot: this.props.spot},
      this.props.spot);
  }

  render() {
    return (
      <button className="home-card-option"
        onClick={ () => this.inventoryClick() }>
        Inventory
      </button>
    );
  }
}

interface InventoryBoxProps {
  spot: number;

  homestead: Homestead;
  setCard: (card: Card, spot: number) => any;
}

function mapStateToProps({ homestead }) {
  return { homestead }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (InventoryBox);
