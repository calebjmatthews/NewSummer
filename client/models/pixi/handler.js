import * as PIXI from 'pixi.js';

import PixiInitializer from './initializer';
import PixiPlants from './plants';
import {pixiStore} from '../../instances/pixi/store';

export default class PixiHandler {
  initPixi(numCards) {
    new PixiInitializer().initPixi(numCards);
  }

  setContainerOffset(offset) {
    pixiStore.cardContainer.x = offset;
  }
  setPlantAppearance(fieldIndex, textureName) {
    new PixiPlants().setPlantAppearance(fieldIndex, textureName);
  }
}
