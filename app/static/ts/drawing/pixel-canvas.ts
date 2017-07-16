/// <reference path="../references.ts" />

class PixelCanvas {
  pixelArray: Pixel[] = [];
  pixelSize: number = 1;
  xBnd: number = null;
  yBnd: number = null;
  anchor: number[] = [];
  lSprite: PIXI.Sprite = null;

  constructor(gPixelSize, gXBnd, gYBnd, gAnchor) {
    this.pixelSize = gPixelSize;
    this.xBnd = gXBnd;
    this.yBnd = gYBnd;
    this.anchor = gAnchor;
  }

  render() {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext("2d");
    canvas.height = this.yBnd;
    canvas.width = this.xBnd;
    context = canvas.getContext("2d");
    let id = context.createImageData(this.xBnd, this.yBnd);
    let d = id.data;
    for (let iii = 0; iii < (d.length); iii += 4) {
      let t: Pixel = this.pixelArray[iii/4];
      if (t != undefined) {
        d[iii] = t.r; d[iii+1] = t.g; d[iii+2] = t.b; d[iii+3] = t.a;
      }
      else {
        console.log('t not found at ' + iii);
      }
    }
    context.putImageData(id, 0, 0);
    let canvasTexture = PIXI.Texture.fromCanvas(canvas);
    this.lSprite = new PIXI.Sprite(canvasTexture);
    this.lSprite.x = this.anchor[0];
    this.lSprite.y = this.anchor[1];
    g.stage.addChild(this.lSprite);
  }