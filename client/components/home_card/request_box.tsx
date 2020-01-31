import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setCard } from '../../actions/card';

import RecordBook from '../../models/record_book';
import Card from '../../models/card';
import { CardTypes } from '../../models/enums/card_types';

class RequestBox extends Component {
  props: RequestBoxProps;

  requestClick() {
    this.props.setCard({type: CardTypes.REQUESTS_OPEN, spot: this.props.spot},
      this.props.spot);
  }

  render() {
    return (
      <button className="home-card-option"
        onClick={ () => this.requestClick() }>
        Requests
      </button>
    );
  }
}


interface RequestBoxProps {
  spot: number;

  recordBook: RecordBook;
  setCard: (card: Card, spot: number) => any;
}

function mapStateToProps({ recordBook }) {
  return { recordBook }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestBox);
