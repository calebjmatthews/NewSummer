import * as PIXI from 'pixi.js';

import {pixiStore} from '../../instances/pixi/store';

export default class PixiInitializer {
  initPixi(numCards) {
    let s = pixiStore;
    s.pixiApp = new PIXI.Application({
      width: window.innerWidth, height: window.innerHeight,
      backgroundColor: 0x277249
    });

    document.getElementById('root').appendChild(s.pixiApp.view);
    PIXI.loader.add('soil', './dist/images/soil.png')
    .load((loader, resources) => {
      s.resources = resources;
      s.cardContainer = new PIXI.Container();

      let cSize = document.getElementsByClassName('game-card')[1]
      .getBoundingClientRect();

      for (let index = 0; index < numCards; index++) {
        const card = this.initCard(index -1, cSize);
        s.cardContainer.addChild(card);
      }

      s.pixiApp.stage.addChild(s.cardContainer);
    });
  }

  initCard(offset, cSize) {
    let s = pixiStore;

    const soil = new PIXI.extras.TilingSprite(
      s.resources.soil.texture, cSize.width, cSize.height
    );
    soil.x = (cSize.x + (cSize.width * 1.1 * offset));
    soil.y = cSize.y;
    soil.anchor.x = 0; soil.anchor.y = 0;
    let mask = genCardMask(offset);
    console.log('mask');
    console.log(mask);
    soil.mask = mask;
    soil.addChild(mask);
    return soil;

    function genCardMask(offset) {
      const cardMask = new PIXI.Graphics();
      cardMask.beginFill(0x000000);
      cardMask.drawRoundedRect(
        1, 0,
        cSize.width, cSize.height, 10
      );
      cardMask.endFill();
      return cardMask;
    }
  }
}
