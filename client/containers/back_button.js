import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { revertCard } from '../actions/card';

class BackButton extends Component {
  componentDidMount() {
    this.backButtonClick = this.backButtonClick.bind(this);
  }

  backButtonClick() {
    this.props.revertCard(this.props.spot);
  }

  render() {
    return (
      <div className="back-button-wrapper">
        <button className="back-button"
          onClick={ () => this.backButtonClick() }>
          <FontAwesomeIcon icon="arrow-left" />
        </button>
      </div>
    );
  }
}

function mapStateToProps({ cardState }) {
  return { cardState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ revertCard }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (BackButton);
