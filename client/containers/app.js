import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PIXI from 'pixi.js';

import { ageAllSeeds, harvestSeed, plantSeed } from '../actions/field';
import FieldCard from './field_card';
import HomeCard from './home_card';

const pixiApp = new PIXI.Application({
  width: window.innerWidth, height: window.innerHeight
});

const TIME_STEP = (0.25 * 1000);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spotCurrent: 1
    }
  }
  componentDidMount() {
    setInterval(() => {
      this.props.ageAllSeeds(this.props.fieldsState.fields);
    }, TIME_STEP);

    document.getElementById('root').appendChild(pixiApp.view);
    PIXI.loader.add('soil', './dist/images/soil.png')
    .load((loader, resources) => {
      const bgSprite = new PIXI.Graphics();
      bgSprite.beginFill(0x277249);
      bgSprite.drawRect(0, 0, window.innerWidth, window.innerHeight);
      bgSprite.endFill();
      bgSprite.x = 0;
      bgSprite.y = 0;

      pixiApp.stage.addChild(bgSprite);

      const containerCards = new PIXI.Container();

      const cardMask = new PIXI.Graphics();
      cardMask.beginFill(0x000000);
      cardMask.drawRoundedRect(27, 43, 267, 424, 10);
      cardMask.endFill();
      cardMask.x = 27;
      cardMask.y = 43;

      const soil0 = new PIXI.extras.TilingSprite(
        resources.soil.texture, window.innerWidth, window.innerHeight
      );
      soil0.x = 27; soil0.y = 0; soil0.anchor.x = 0; soil0.anchor.y = 0;
      soil0.mask = cardMask;
      containerCards.addChild(soil0);
      const soil1 = new PIXI.extras.TilingSprite(
        resources.soil.texture, window.innerWidth, window.innerHeight
      );
      soil1.x = -window.innerWidth; soil1.y = 0;
      soil1.anchor.x = 0; soil1.anchor.y = 0;
      soil1.mask = cardMask;
      containerCards.addChild(soil1);

      pixiApp.stage.addChild(containerCards);
    });

    this.navLeftClick = this.navLeftClick.bind(this);
    this.navRightClick = this.navRightClick.bind(this);
  }

  navLeftClick() {
    if (this.state.spotCurrent > 0) {
      const newSpot = this.state.spotCurrent - 1;
      this.setState({spotCurrent: newSpot});
    }
    else {
      const newSpot = this.props.fieldsState.fields.getLength();
      this.setState({spotCurrent: newSpot});
    }
  }

  navRightClick() {
    if (this.state.spotCurrent <=
      (this.props.fieldsState.fields.getLength()-1)) {
      const newSpot = this.state.spotCurrent + 1;
      this.setState({spotCurrent: newSpot});
    }
    else {
      this.setState({spotCurrent: 0});
    }
  }

  getCardStyle(thisIndex) {
    let position = (this.state.spotCurrent - thisIndex) * -1;
    let cardStyle = {
      transform: ('translateX(' + (100 * position) + 'vw)')
    };
    return cardStyle;
  }

  render() {
    return (
      <div className="container-main">
        <div className="header">
          {'$' + this.props.storehouseState.storehouse.dollars}
        </div>
        <div className="game-card-wrapper">
          <div className="nav-button nav-button-left"
            onClick={() => this.navLeftClick()}>
            <div>{'<'}</div>
          </div>
          <div className="nav-button nav-button-right"
            onClick={() => this.navRightClick()}>
            <div>{'>'}</div>
          </div>
          <HomeCard transStyle={this.getCardStyle(0)} />
          {this.props.fieldsState.fields.getAll().map((field) => {
            return (
              <FieldCard key={field.id} field={field}
                transStyle={this.getCardStyle(field.index+1)} />
            );
          })}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ fieldsState, storehouseState }) {
  return { fieldsState, storehouseState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ageAllSeeds
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
