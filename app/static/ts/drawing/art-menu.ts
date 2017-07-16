/// <reference path="../references.ts" />

class ArtMenu extends Menu {
  lBackground: PIXI.Graphics = null;
  
  constructor(gZOrder, gMenuPosition) {
    super(gZOrder, gMenuPosition);
    console.log('gMenuPosition is ' + this.anchor);
    this.labelArray.push(new Label('Drawing Plants!', 
      [(this.anchor[0] + g.uiTheme.padding), (this.anchor[1] + g.uiTheme.padding)], 'heading'))
  }
}