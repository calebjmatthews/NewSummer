/// <reference path="../references.ts" />

class PixelTest3 {
  pixelArray: Pixel[] = [];
  pixelSize: number = 4;
  xBnd = Math.floor($(window).width() / this.pixelSize) * this.pixelSize;
  yBnd = Math.floor($(window).height() / this.pixelSize) * this.pixelSize;
  sprite: PIXI.Sprite = null;

  init() {
    this.pixelArray = [];
    for (let row = 0; row < (this.yBnd); row += this.pixelSize) {
      for (let col = 0; col < (this.xBnd); col += this.pixelSize) {
        let pR = Math.random() * 255;
        let pG = Math.random() * 255;
        let pB = Math.random() * 255;
        let anchor = (row * this.xBnd) + col;
        for (let inRow = 0; inRow < this.pixelSize; inRow++) {
          for (let inCol = 0; inCol < this.pixelSize; inCol++) {
            let pX = (col + inCol);
            let pY = (row + inRow);
            let index = (anchor + (this.xBnd * inRow)) + inCol;
            this.pixelArray[index] = new Pixel(index, pX, pY, pR, pG, pB, 255);
          }
        }
      }
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
    this.sprite = new PIXI.Sprite(canvasTexture);
    this.sprite.x = 0;
    this.sprite.y = 0;
    g.stage.addChild(this.sprite);
  }

  scramble() {
    for (let row = 0; row < (this.yBnd); row += this.pixelSize) {
      for (let col = 0; col < (this.xBnd); col += this.pixelSize) {
        let pR = Math.random() * 255;
        let pG = Math.random() * 255;
        let pB = Math.random() * 255;
        let anchor = (row * this.xBnd) + col;
        for (let inRow = 0; inRow < this.pixelSize; inRow++) {
          for (let inCol = 0; inCol < this.pixelSize; inCol++) {
            let pX = (col + inCol);
            let pY = (row + inRow);
            let index = (anchor + (this.xBnd * inRow)) + inCol;
            this.pixelArray[index].r = pR; 
            this.pixelArray[index].g = pG;
            this.pixelArray[index].b = pB;
          }
        }
      }
    }

    let canvas = document.createElement('canvas');
    let context = canvas.getContext("2d");
    canvas.height = this.yBnd;
    canvas.width = this.xBnd;
    let id = context.createImageData(this.xBnd, this.yBnd);
    let d = id.data;

    for (let iii = 0; iii < (d.length); iii += 4) {
      let t: Pixel = this.pixelArray[iii/4];
      if (t != undefined) {
        d[iii] = t.r; d[iii+1] = t.g; d[iii+2] = t.b; d[iii+3] = t.a;
      }
    }
    context.putImageData(id, 0, 0);
    let canvasTexture = PIXI.Texture.fromCanvas(canvas);
    this.sprite.texture = canvasTexture;
  }
}