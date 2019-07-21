import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let barStyleDict = {
  temperature: ["#454ec6", "#504bb9", "#5b49ad", "#6746a0", "#724393",
    "#7d4187", "#883e7a", "#943b6d", "#9f3961", "#aa3654", "#b53347",
    "#c1313b", "#cc2e2e"],
  moisture: ["#abc978", "#a0c27b", "#95bb7f", "#8bb482", "#80ac85", "#75a589",
    "#6a9e8c", "#5f978f", "#549093", "#4a8896", "#3f8199", "#347a9d",
    "#2973a0"],
  fertility: ["#9e6b4d", "#98704d", "#92754d", "#8c7a4e", "#867f4e",
    "#80844e", "#7a8a4e", "#738f4e", "#6d944e", "#67994e", "#619e4f",
    "#5ba34f", "#55a84f"],
  pests: ["#454946", "#424d44", "#3e5042", "#3b5441", "#38583f", "#345b3d",
    "#315f3b", "#2e6339", "#2a6637", "#276a35", "#246e34", "#207132",
    "#1d7530"],
  disease: ["#b5a6b3", "#ae9aad", "#a78fa7", "#a083a1", "#99779b", "#926c95",
    "#8b608f", "#845489", "#7d4983", "#763d7d", "#6f3177", "#682671",
    "#611a6b"]
}

export default class ClimateDisplay extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		barsVisible: false
  	}
  }

  componentDidMount() {
    if (this.props.barsVisible == true) {
      this.setState({barsVisible: true});
    }
    this.showClick = this.showClick.bind(this);
  }

  showClick() {
    this.setState({barsVisible: !this.state.barsVisible});
  }

  renderBar(measure) {
    let count = this.props.field[measure];
    let startingPoint = (count * 2);
    let iconStyle = {
      color: barStyleDict[measure][startingPoint]
    };
    let iconName = '';
    if (measure == 'temperature') { iconName = 'sun'; }
    else if (measure == 'moisture') { iconName = 'tint'; }
    else if (measure == 'fertility') { iconName = 'globe-europe'; }
    else if (measure == 'pests') { iconName = 'bug'}
    else if (measure == 'disease') { iconName = 'splotch'}

    let aMap = [startingPoint];
    for (let index = 1; index < (count+1); index++) {
      aMap.push(startingPoint - index);
    }
    let tickStyles = [];
    aMap.map((tickIndex) => {
      tickStyles.push({
        background: barStyleDict[measure][tickIndex]
      })
    });

    return (
      <div className="climate-bar-wrapper">
        <div className="climate-bar">
          <div className="climate-bar-background"></div>
          <div className="climate-tick-container">
            {tickStyles.map((tickStyle, index) => {
              return (
                <div key={index}
                  className="climate-tick" style={tickStyle}></div>
              );
            })}
          </div>
        </div>
        <div className="climate-icon">
          <FontAwesomeIcon icon={iconName} style={iconStyle} />
        </div>
      </div>
    );
  }
  render() {
    if (this.state.barsVisible == true) {
      return (
        <div className="climate-container">
          <div className="climate-icon"
            onClick={ () => this.showClick() }>
            <FontAwesomeIcon icon="caret-up" />
          </div>
          {this.renderBar('temperature')}
          {this.renderBar('moisture')}
          {this.renderBar('fertility')}
          {this.renderBar('pests')}
          {this.renderBar('disease')}
        </div>
      );
    }
    else {
      return (
        <div className="climate-container">
          <div className="climate-icon"
            onClick={ () => this.showClick() }>
            <FontAwesomeIcon icon="image" />
          </div>
        </div>
      );
    }
  }
}
