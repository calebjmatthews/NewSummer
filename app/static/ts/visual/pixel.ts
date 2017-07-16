/// <reference path="../references.ts" />

class Pixel {
  id: number;
  x: number;
  y: number;
  r: number;
  b: number;
  g: number;
  a: number;

  constructor(pId: number, pX: number, pY: number, pR: number, pG: number, 
      pB: number, pA: number) {
    this.id = pId;
    this.x = pX;
    this.y = pY;
    if ((pR < 0) || (pR > 255)) {
      throw new RangeError("Pixel red value should be between 0 and 255.");
    }
    else {
      this.r = pR;
    }
    if ((pG < 0) || (pG > 255)) {
      throw new RangeError("Pixel green value should be between 0 and 255.");
    }
    else {
      this.g = pG;
    }
    if ((pB < 0) || (pB > 255)) {
      throw new RangeError("Pixel blue value should be between 0 and 255.");
    }
    else {
      this.b = pB;
    }
    if ((pA < 0) || (pA > 255)) {
      throw new RangeError("Pixel alpha value should be between 0 and 255.");
    }
    else {
      this.a = pA;
    }
  }
}