/// <reference path="../references.ts" />

class Button extends Pixie {
  // The order of the button within the game's menuArray
  id: number = null;
  // The background graphic object
  lBackground: PIXI.Graphics = null;
  // The text that is to be displayed on the button
  textValue: string = null;
  // The linked PIXI Text object that displayes the text on the button
  lText: PIXI.Text = null;

  constructor() {
    super();
  }


}