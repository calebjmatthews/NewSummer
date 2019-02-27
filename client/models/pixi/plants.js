import * as PIXI from 'pixi.js';

import {pixiStore} from '../../instances/pixi/store';

export default class PixiPlants {
  setPlantAppearance(fieldIndex, textureName) {
    let s = pixiStore;
    let card = s.cardContainer.children[fieldIndex + 1];
    if (card.children.length > 1) {
      card.removeChildAt(1);
    }
    if (textureName != null) {
      const plant = new PIXI.Sprite(s.resources[textureName].texture);
      plant.x = (card.width/2) - (plant.width/2);
      plant.y = (card.height/2) - (plant.height/2);
      card.addChild(plant);
    }
    console.log('inside setPlantAppearance')
  }
}
