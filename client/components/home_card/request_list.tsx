import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RecordBook from '../../models/record_book';
import Cast from '../../models/traveler/cast';
import Request from '../../models/traveler/request';

class RequestListCard extends Component {
  props: RequestListCardProps;

  render() {
    return (
      <div>
        <div className="header">
          <div>Current</div>
          <div>Completed</div>
        </div>
        <div className="body">
          {this.renderRequestNames()}
        </div>
      </div>
    );
  }

  renderRequestNames() {
    let requests: Request[] = [];
    Object.keys(this.props.recordBook.requestsCurrent).map((travelerRole) => {
      let travelerRequests = this.props.recordBook.requestsCurrent[travelerRole];
      Object.keys(travelerRequests).map((index) => {
        if (travelerRequests[index] == true) {
          requests.push(this.props.cast.members[travelerRole].requests[index])
        }
      });
    });
    return requests.map((request) => {
      return (
        <div>{request.name}</div>
      );
    });
  }
}


interface RequestListCardProps {
  spot: number;

  recordBook: RecordBook;
  cast: Cast;
}

function mapStateToProps({ recordBook, cast }) {
  return { recordBook, cast }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestListCard);
