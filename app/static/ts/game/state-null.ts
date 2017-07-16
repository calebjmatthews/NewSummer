/// <reference path="../references.ts" />

let stateNull = new State();

// Empty init method so that the state object goes straight into perform()
stateNull.init = function() {
  stateNull.initialized = true;
}

// Redefine the perform method to define stateNull behavior
stateNull.perform = function() {
  console.log("stateNull performed.");

}