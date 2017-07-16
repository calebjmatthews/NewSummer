/// <reference path="../references.ts" />

let stateSetup = new State();

// Empty init method so that the state object goes straight into perform()
stateSetup.init = function() {
  stateSetup.initialized = true;
}

// Redefine the perform method to define stateSetup behavior
stateSetup.perform = function() {
  console.log("stateSetup performed.");
  // Create the renderer and stage container object
  g.renderer = PIXI.autoDetectRenderer($(window).width(), $(window).height());
  document.body.appendChild(g.renderer.view);
  g.stage = new PIXI.Container();
  g.renderer.render(g.stage);
  g.uiTheme = testTheme;
  g.menuArray.push(new ArtMenu(10, eMPOS.right));
  g.setState(stateNull);
}