/// <reference path="references.ts" />

let g = new Game();

function gameLoop() {
  requestAnimationFrame(gameLoop);
  g.getState().checkThenPerform();
  g.renderer.render(g.stage);
}

// Initialize the Game object
g.setState(stateSetup);
// Begin the PIXI animation loop
gameLoop();
