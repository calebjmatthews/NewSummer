/// <reference path="../references.ts" />

enum eMPOS { top, right, bottom, left, dropdown, radial }

class Menu {
  // The order of the menu within the game's menuArray
  id: number = null;
  // The order in which the menus appear for both graphical and functional purposes
  zOrder: number = 0;
  // The setting which determines the anchoring of the menu
  menuPosition: eMPOS = null;
  // The original value by which the menu elements are placed
  anchor: number[] = [];
  // An array of all the labels that make up the menu
  labelArray = [];
  // An array of all the buttons that make up the menu
  buttonArray = [];

  // The rectangular bounds of the menu
  ulBound: number = null;
  urBound: number = null;
  llBound: number = null;
  lrBound: number = null;

  // Constructor which is added upon by the menu subclass or instance
  constructor(gZOrder, gMenuPosition) {
    this.id = g.menuArray.length + 1;
    this.zOrder = gZOrder;
    this.menuPosition = gMenuPosition;

    if (this.menuPosition == eMPOS.top) {
      this.anchor = [0, 0];
    }
    else if (this.menuPosition == eMPOS.right) {
      this.anchor = [($(window).width() - g.uiTheme.btnWidth - (2 * g.uiTheme.padding)),
        0];
    }
    else if (this.menuPosition == eMPOS.bottom) {
      this.anchor = [0, 
        ($(window).height() - g.uiTheme.btnHeight - (2 * g.uiTheme.padding))];
    }
    else if (this.menuPosition == eMPOS.left) {
      this.anchor = [0, 0];
    }
  }

  // Checks whether or not the cursor exists within the bounds of the Menu
  inBounds(position) {
    
  }

  // Method which is called by the Game instance to handle the cursor hovering within 
  //  the bounds of the menu
  handleHover() {}

  // Method which is called by the Game instance to handle a click event within 
  //  the bounds of the menu
  handleClick() {}

}