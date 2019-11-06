import React, { Component } from 'react';
import { connect } from 'react-redux';

import Homestead from '../models/homestead';
import { utils } from '../models/utils';

class Header extends Component {
  props: HeaderProps;

  constructor(props: HeaderProps) {
    super(props);
  }

  render() {
    let dollars = utils.formatMoney(this.props.homestead.dollars);
    return (
      <div className="header">
        { dollars }
      </div>
    );
  }
}

interface HeaderProps {
  homestead: Homestead;
}

function mapStateToProps({ homestead }) {
  return { homestead }
}

export default connect(mapStateToProps)(Header);
