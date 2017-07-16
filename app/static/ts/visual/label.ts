/// <reference path="../references.ts" />

class Label {
  textValue: string = null;
  lText: PIXI.Text = null;
  anchor: number[] = [];
  style: string = null;

  constructor(gTextValue, gAnchor, gStyle) {
    this.textValue = gTextValue;
    this.anchor = gAnchor;
    this.style = gStyle;
    let tSize = null;

    if (this.style == 'heading') {
      tSize = g.uiTheme.headingSize;
    }
    else if (this.style == 'standard') {
      tSize = g.uiTheme.standardSize;
    }

    this.lText = new PIXI.Text(this.textValue, {fontFamily: 'Arial', 
      fontSize: tSize, fill: "white"});
    this.lText.x = this.anchor[0];
    this.lText.y = this.anchor[1];
    g.stage.addChild(this.lText);
  }
}