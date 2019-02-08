import * as PIXI from 'pixi.js';

import

export default class PixiHandler {
  constructor() {
    this.pixiApp = null;
    this.resources = null;
    this.cardContainer = null;
    this.cardMask = null;
    this.cSize = null;
  }

  initPixi(numCards) {
    let t = this;
    t.pixiApp = new PIXI.Application({
      width: window.innerWidth, height: window.innerHeight,
      backgroundColor: 0x277249
    });

    document.getElementById('root').appendChild(t.pixiApp.view);
    PIXI.loader.add('soil', './dist/images/soil.png')
    .load((loader, resources) => {
      t.resources = resources;
      t.cardContainer = new PIXI.Container();

      t.cSize = document.getElementsByClassName('game-card')[1]
      .getBoundingClientRect();

      for (let index = 0; index < numCards; index++) {
        const card = t.initCard(index -1);
        t.cardContainer.addChild(card);
      }

      t.pixiApp.stage.addChild(t.cardContainer);
      console.log('t.pixiApp.stage');
      console.log(t.pixiApp.stage);
    });
  }

  initCard(offset) {
    let t = this;

    const soil = new PIXI.extras.TilingSprite(
      t.resources.soil.texture, t.cSize.width, t.cSize.height
    );
    soil.x = (t.cSize.x + (t.cSize.width * 1.1 * offset));
    soil.y = t.cSize.y;
    soil.anchor.x = 0; soil.anchor.y = 0;
    soil.mask = genCardMask(offset);
    console.log('soil');
    console.log(soil);
    return soil;

    function genCardMask(offset) {
      const cardMask = new PIXI.Graphics();
      cardMask.beginFill(0x000000);
      cardMask.drawRoundedRect(
        (t.cSize.x + (t.cSize.width * 1.1 * offset)), t.cSize.top,
        t.cSize.width, t.cSize.height, 10
      );
      cardMask.endFill();
      cardMask.x = (t.cSize.x + (t.cSize.width * 1.1 * offset));
      cardMask.y = t.cSize.y;
      return cardMask;
    }
  }
}
