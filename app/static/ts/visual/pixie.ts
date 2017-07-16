/// <reference path="../references.ts" />

enum ePTYPE { pixelCanvas, sprite, graphics, particle, text }

class Pixie {
  // The index of the instance in the Game's pixieArray
  id: number = null;
  // The order in which the graphical object is drawn to the renderer
  zOrder: number = 0;
  // The type of associated graphical object
  pType: ePTYPE = null;
  // The actual instance of the graphical object
  pLinked: any = null;
  // The opacity of the object, from 0 to 1
  alpha: number = null;
  // Whether or not the Pixie ages as time passes
  mortal: boolean = null;
  // The remaining number of clockticks until the instance self-destructs
  life: number = null;

  // The rectangular bounds of the sprite
  ulBound: number = null;
  urBound: number = null;
  llBound: number = null;
  lrBound: number = null;

  constructor() {
    // Add to related Game array, store resulting array length in id

    // If mortal, add to the Game array that performs calling of aging methods

    // Create the graphical object, store it in the Pixie's pLinked property

    // Calculate the bounds using the Sprite information
  }

  // Checks whether or not the cursor exists within the bounds of the Pixie
  inBounds(position) {

  }

  // Reduce / check the number of remaining clockticks
  agePixie() {
    if (this.life <= 0) {
      this.selfDestruct()
    }
    else {
      this.life --;
    }
  }

  // Remove the sprite from the stage and this instance from the Game's array
  selfDestruct() {
    g.stage.removeChild(this.pLinked);
    g.pixieArray[this.id] = null;
  }
}