/// <reference path="../references.ts" />

// Instances of the State class overload the perform method to define 
//  state-specific behavior
class State {
  userCanAct: boolean;
  notificationsCanDisplay: boolean;
  initialized: boolean = false;
  init() {
  	this.initialized = true;
  	return null;
  }
  checkThenPerform() {
  	if (this.initialized) {
      this.perform();
    }
  }
  perform() {
    return null;
  }
}