import * as PIXI from 'pixi.js';

import {pixiStore} from '../../instances/pixi/store';

export default class PixiInitializer {
  constructor() {
    this.cSize = [];
  }

  initPixi(numCards) {
    let s = pixiStore;
    s.pixiApp = new PIXI.Application({
      width: window.innerWidth, height: window.innerHeight,
      backgroundColor: 0x277249
    });

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    document.getElementById('root').appendChild(s.pixiApp.view);
    PIXI.loader.add('background', './dist/images/background.png')
    .add('Corn_Stage_1', './dist/images/Corn_Stage_1.png')
    .add('Corn_Stage_2', './dist/images/Corn_Stage_2.png')
    .add('Corn_Stage_3', './dist/images/Corn_Stage_3.png')
    .add('Corn_Stage_4', './dist/images/Corn_Stage_4.png')
    .add('Corn_Stage_5', './dist/images/Corn_Stage_5.png')
    .add('Corn_Stage_6', './dist/images/Corn_Stage_6.png')
    .add('Corn_Stage_7', './dist/images/Corn_Stage_7.png')
    .load((loader, resources) => {
      s.resources = resources;
      s.cardContainer = new PIXI.Container();

      this.cSize = document.getElementsByClassName('game-card')[1]
      .getBoundingClientRect();

      for (let index = 0; index < numCards; index++) {
        const card = this.initCard(index - 1);
        s.cardContainer.addChild(card);
      }

      s.pixiApp.stage.addChild(s.cardContainer);
    });
  }

  addCard(offset) {
    let s = pixiStore;
    const card = this.initCard(offset);
    s.cardContainer.addChild(card);
  }

  initCard(offset) {
    let s = pixiStore;

    const card =  new PIXI.Container();
    const background = new PIXI.Sprite(s.resources.background.texture);
    card.x = (this.cSize.x + (this.cSize.width * 1.1 * offset));
    card.y = this.cSize.y;
    background.anchor.x = 0; background.anchor.y = 0;
    background.scale = new PIXI.Point(3.0, 3.0);
    card.addChild(background);
    let mask = genCardMask(offset, this.cSize);
    card.mask = mask;
    card.addChild(mask);
    return card;

    function genCardMask(offset, cSize) {
      const cardMask = new PIXI.Graphics();
      cardMask.beginFill(0x000000);
      cardMask.drawRect(
        1, 0, cSize.width, cSize.height
      );
      cardMask.endFill();
      return cardMask;
    }
  }
}
