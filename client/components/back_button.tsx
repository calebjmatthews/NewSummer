import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fontAwesome } from '../instances/font_awesome';
import { revertCard } from '../actions/card';

import CardState from '../models/card_state';

class BackButton extends Component {
  props: BackButtonProps;

  constructor(props: BackButtonProps) {
    super(props);

    this.backButtonClick = this.backButtonClick.bind(this);
  }

  backButtonClick() {
    this.props.revertCard(this.props.spot);
  }

  render() {
    return (
      <div className="back-button-wrapper">
        <button className="icon-button"
          onClick={ () => this.backButtonClick() }>
          <FontAwesomeIcon icon={fontAwesome.get('arrow-left')} />
        </button>
      </div>
    );
  }
}

interface BackButtonProps {
  spot: number;

  cardState: CardState;
  revertCard: (spot: number) => any;
}

function mapStateToProps({ cardState }) {
  return { cardState }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({ revertCard }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (BackButton);
