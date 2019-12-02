import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fontAwesome } from '../instances/font_awesome';

import { toggleAutoActions } from '../actions/homestead';

import Homestead from '../models/homestead';
import { utils } from '../models/utils';

class Header extends Component {
  props: HeaderProps;

  constructor(props: HeaderProps) {
    super(props);
  }

  render() {
    let dollars = utils.formatMoney(this.props.homestead.dollars, true);
    return (
      <div className="header">
        <div className="header-spacer"></div>
        <div>{ dollars }</div>
        {this.renderAutoButton()}
      </div>
    );
  }

  renderAutoButton() {
    if (this.props.homestead.autoOn) {
      return (
        <button className="icon-button"
          onClick={ () => this.props.toggleAutoActions() }>
          <FontAwesomeIcon icon={fontAwesome.get('hat-wizard')} />
        </button>
      );
    }
    else {
      return (
        <button className="icon-button"
          onClick={ () => this.props.toggleAutoActions() }>
          <FontAwesomeIcon icon={fontAwesome.get('hat-wizard')} />
          <div className="strikethrough"></div>
        </button>
      );
    }
  }
}

interface HeaderProps {
  homestead: Homestead;

  toggleAutoActions: () => any;
}

function mapStateToProps({ homestead }) {
  return { homestead }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({ toggleAutoActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
