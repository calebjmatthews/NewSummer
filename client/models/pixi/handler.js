import * as PIXI from 'pixi.js';

import PixiInitializer from './initializer';
import PixiPlants from './plants';
import {pixiStore} from '../../instances/pixi/store';

export default class PixiHandler {
  constructor() {
    this.pixiInitializer = null;
  }

  initPixi(numCards) {
    this.pixiInitializer = new PixiInitializer();
    this.pixiInitializer.initPixi(numCards);
  }

  addCard(offset) {
    this.pixiInitializer.addCard(offset);
  }

  setContainerOffset(offset) {
    pixiStore.cardContainer.x = offset;
  }
  setPlantAppearance(fieldIndex, textureName) {
    new PixiPlants().setPlantAppearance(fieldIndex, textureName);
  }
}
