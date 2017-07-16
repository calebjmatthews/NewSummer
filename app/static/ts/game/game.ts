/// <reference path="../references.ts" />

class Game {
  // The set of actions that are performed every clocktick
  state: State = null;
  getState() { return this.state; }
  setState(pState) {
  	this.state = pState;
  	this.state.init();
  }
  
  // The set of colors and sizes used by the UI objects
  uiTheme: UITheme = null;
  // The PIXI stage which holds graphical objects
  stage = null;
  // The PIXI renderer
  renderer = null;
  // An array that holds all currently rendered graphical objects
  pixieArray: Pixie[] = [];
  // An array that holds all currently existing menus
  menuArray: any[] = [];
}