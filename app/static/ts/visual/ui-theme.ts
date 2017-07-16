/// <reference path="../references.ts" />

class UITheme {
  name: string = null;
  btnWidth: number = 0;
  btnHeight: number = 0;
  primaryColor: number[] = [];
  secondaryColor: number[] = [];
  tertiaryColor: number[] = [];
  padding: number = 0;
  headingSize: number = 0;
  standardSize: number = 0;

  constructor(gName, gBtnWidth, gBtnHeight, gPrimaryColor, gSecondaryColor, 
    gTertiaryColor, gPadding, gHeadingSize, gStandardSize) {
    this.name = gName;
    this.btnWidth = gBtnWidth;
    this.btnHeight = gBtnHeight;
    this.primaryColor = gPrimaryColor;
    this.secondaryColor = gSecondaryColor;
    this.tertiaryColor = gTertiaryColor;
    this.padding = gPadding;
    this.headingSize = gHeadingSize;
    this.standardSize = gStandardSize;
  }
}

let testTheme = new UITheme(
  /* name          */ 'Test Theme', 
  /* btnWidth      */ 162, 
  /* btnHeight     */ 100, 
  /* primaryColor  */ [66, 134, 244], 
  /* seconaryColor */ [177, 206, 255], 
  /* tertiaryColor */ [249, 251, 255], 
  /* padding       */ 10, 
  /* headingSize   */ 22, 
  /* standardSize  */ 16);