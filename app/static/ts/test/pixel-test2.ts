/// <reference path="../references.ts" />

class PixelTest2 {
  pixelArray: Pixel[] = [];
  pixelSize: number = 1;
  xBnd = Math.floor($(window).width() / this.pixelSize) * this.pixelSize;
  yBnd = Math.floor($(window).height() / this.pixelSize) * this.pixelSize;
  sprite: PIXI.Sprite = null;

  init() {
    this.pixelArray = [];
    for (let iii = 0; iii < ((this.xBnd * this.yBnd) / this.pixelSize); iii++) {
      let pX = (iii - (Math.floor(iii / this.yBnd) * this.xBnd)) * this.pixelSize;
      let pY = (Math.floor(iii / this.yBnd)) * this.pixelSize;
      let pR = Math.random() * 255;
      let pG = Math.random() * 255;
      let pB = Math.random() * 255;
      this.pixelArray.push(new Pixel(iii, pX, pY, pR, pG, pB, 255));
    }
  }

  render() {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext("2d");
    canvas.height = this.yBnd;
    canvas.width = this.xBnd;
    context = canvas.getContext("2d");
    let id = context.createImageData(this.xBnd, this.yBnd);
    let d = id.data;
    for (let iii = 0; iii < (d.length); iii += 16) {
      let t: Pixel = this.pixelArray[iii/4];
      if (t != undefined) {
        d[iii] = t.r; d[iii+1] = t.g; d[iii+2] = t.b; d[iii+3] = t.a;
      }
    }
    context.putImageData(id, 0, 0);
    let canvasTexture = PIXI.Texture.fromCanvas(canvas);
    this.sprite = new PIXI.Sprite(canvasTexture);
    this.sprite.x = 0;
    this.sprite.y = 0;
    g.stage.addChild(this.sprite);
  }

  scramble() {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext("2d");
    canvas.height = this.yBnd;
    canvas.width = this.xBnd;
    let id = context.createImageData(this.xBnd, this.yBnd);
    let d = id.data;
    for (let iii = 0; iii < (d.length); iii += 4) {
      let t: Pixel = this.pixelArray[iii/4];
      if (t != undefined) {
        t.r = Math.random() * 255;
        t.g = Math.random() * 255;
        t.b = Math.random() * 255;
        d[iii] = t.r; d[iii+1] = t.g; d[iii+2] = t.b; d[iii+3] = t.a;
      }
    }
    context.putImageData(id, 0, 0);
    let canvasTexture = PIXI.Texture.fromCanvas(canvas);
    this.sprite.texture = canvasTexture;
  }
}