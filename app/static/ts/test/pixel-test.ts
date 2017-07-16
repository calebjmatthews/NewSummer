/// <reference path="../references.ts" />

class PixelTest {
  pixelArray: Pixel[] = [];
  bound: number = 500;
  sprite: PIXI.Sprite = null;

  init() {
    this.pixelArray = [];
    for (let iii = 0; iii < (this.bound * this.bound); iii++) {
      let pX = iii - (Math.floor(iii / this.bound) * this.bound);
      let pY = Math.floor(iii / this.bound);
      let pR = Math.random() * 255;
      let pG = Math.random() * 255;
      let pB = Math.random() * 255;
      this.pixelArray.push(new Pixel(iii, pX, pY, pR, pG, pB, 255));
    }
  }

  scramble() {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext("2d");
    canvas.height = this.bound;
    canvas.width = this.bound;
    for (let iii = 0; iii < this.pixelArray.length; iii++) {
      let t: Pixel = this.pixelArray[iii];
      t.r = Math.random() * 255;
      t.g = Math.random() * 255;
      t.b = Math.random() * 255;

      let id = context.createImageData(1, 1);
      let d = id.data;
      d[0] = t.r; d[1] = t.g; d[2] = t.b; d[3] = t.a;
      context.putImageData(id, t.x, t.y);
    }
    let canvasTexture = PIXI.Texture.fromCanvas(canvas);
    this.sprite.texture = canvasTexture;
  }

  render() {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext("2d");
    canvas.height = this.bound;
    canvas.width = this.bound;
    context = canvas.getContext("2d");
    for (let iii = 0; iii < this.pixelArray.length; iii ++) {
      let t: Pixel = this.pixelArray[iii];
      let id = context.createImageData(1, 1);
      let d = id.data;
      d[0] = t.r; d[1] = t.g; d[2] = t.b; d[3] = t.a;
      context.putImageData(id, t.x, t.y);
    }
    let canvasTexture = PIXI.Texture.fromCanvas(canvas);
    this.sprite = new PIXI.Sprite(canvasTexture);
    this.sprite.x = 0;
    this.sprite.y = 0;
    g.stage.addChild(this.sprite);
  }
}