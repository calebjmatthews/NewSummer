import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCard } from '../../actions/card';

class ExperimentalGarden extends Component {
  componentDidMount() {
    this.experimentalGardenClick = this.experimentalGardenClick.bind(this);
  }

  experimentalGardenClick() {
    this.props.setCard({type: "cultivarSelectA"}, this.props.spot);
  }

  render() {
    return (
      <div className="home-card-option"
        onClick={ () => this.experimentalGardenClick() }>
        <div>{'Experimental Garden:'}</div>
        <div>{'Breed two seeds together'}</div>
      </div>
    );
  }
}


function mapStateToProps({ storehouseState }) {
  return { storehouseState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (ExperimentalGarden);
