import * as PIXI from 'pixi.js';

import {pixiStore} from '../../instances/pixi/store';

export default class PixiPlants {
  setPlantAppearance(fieldIndex, textureName) {
    let s = pixiStore;
    let card = s.cardContainer.children[fieldIndex + 1];
    if (card.children.length > 2) {
      card.removeChildAt(2);
    }
    if (textureName != null && textureName != undefined) {
      const plant = new PIXI.Sprite(s.resources[textureName].texture);
      plant.anchor.set(0.5, 0.5);
      plant.scale.set(3, 3);
      plant.x = (card.width/2) - (plant.width/2);
      plant.y = (card.height/2) - (plant.height/2);
      card.addChild(plant);
    }
  }
}
