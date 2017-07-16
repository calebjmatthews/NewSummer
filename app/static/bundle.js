var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="../references.ts" />
var Game = (function () {
    function Game() {
        // The set of actions that are performed every clocktick
        this.state = null;
        // The set of colors and sizes used by the UI objects
        this.uiTheme = null;
        // The PIXI stage which holds graphical objects
        this.stage = null;
        // The PIXI renderer
        this.renderer = null;
        // An array that holds all currently rendered graphical objects
        this.pixieArray = [];
        // An array that holds all currently existing menus
        this.menuArray = [];
    }
    Game.prototype.getState = function () { return this.state; };
    Game.prototype.setState = function (pState) {
        this.state = pState;
        this.state.init();
    };
    return Game;
}());
/// <reference path="../references.ts" />
// Instances of the State class overload the perform method to define 
//  state-specific behavior
var State = (function () {
    function State() {
        this.initialized = false;
    }
    State.prototype.init = function () {
        this.initialized = true;
        return null;
    };
    State.prototype.checkThenPerform = function () {
        if (this.initialized) {
            this.perform();
        }
    };
    State.prototype.perform = function () {
        return null;
    };
    return State;
}());
/// <reference path="../references.ts" />
var stateSetup = new State();
// Empty init method so that the state object goes straight into perform()
stateSetup.init = function () {
    stateSetup.initialized = true;
};
// Redefine the perform method to define stateSetup behavior
stateSetup.perform = function () {
    console.log("stateSetup performed.");
    // Create the renderer and stage container object
    g.renderer = PIXI.autoDetectRenderer($(window).width(), $(window).height());
    document.body.appendChild(g.renderer.view);
    g.stage = new PIXI.Container();
    g.renderer.render(g.stage);
    g.uiTheme = testTheme;
    g.menuArray.push(new ArtMenu(10, eMPOS.right));
    g.setState(stateNull);
};
/// <reference path="../references.ts" />
var stateNull = new State();
// Empty init method so that the state object goes straight into perform()
stateNull.init = function () {
    stateNull.initialized = true;
};
// Redefine the perform method to define stateNull behavior
stateNull.perform = function () {
    console.log("stateNull performed.");
};
/// <reference path="../references.ts" />
var ePTYPE;
(function (ePTYPE) {
    ePTYPE[ePTYPE["pixelCanvas"] = 0] = "pixelCanvas";
    ePTYPE[ePTYPE["sprite"] = 1] = "sprite";
    ePTYPE[ePTYPE["graphics"] = 2] = "graphics";
    ePTYPE[ePTYPE["particle"] = 3] = "particle";
    ePTYPE[ePTYPE["text"] = 4] = "text";
})(ePTYPE || (ePTYPE = {}));
var Pixie = (function () {
    function Pixie() {
        // Add to related Game array, store resulting array length in id
        // The index of the instance in the Game's pixieArray
        this.id = null;
        // The order in which the graphical object is drawn to the renderer
        this.zOrder = 0;
        // The type of associated graphical object
        this.pType = null;
        // The actual instance of the graphical object
        this.pLinked = null;
        // The opacity of the object, from 0 to 1
        this.alpha = null;
        // Whether or not the Pixie ages as time passes
        this.mortal = null;
        // The remaining number of clockticks until the instance self-destructs
        this.life = null;
        // The rectangular bounds of the sprite
        this.ulBound = null;
        this.urBound = null;
        this.llBound = null;
        this.lrBound = null;
        // If mortal, add to the Game array that performs calling of aging methods
        // Create the graphical object, store it in the Pixie's pLinked property
        // Calculate the bounds using the Sprite information
    }
    // Checks whether or not the cursor exists within the bounds of the Pixie
    Pixie.prototype.inBounds = function (position) {
    };
    // Reduce / check the number of remaining clockticks
    Pixie.prototype.agePixie = function () {
        if (this.life <= 0) {
            this.selfDestruct();
        }
        else {
            this.life--;
        }
    };
    // Remove the sprite from the stage and this instance from the Game's array
    Pixie.prototype.selfDestruct = function () {
        g.stage.removeChild(this.pLinked);
        g.pixieArray[this.id] = null;
    };
    return Pixie;
}());
/// <reference path="../references.ts" />
var UITheme = (function () {
    function UITheme(gName, gBtnWidth, gBtnHeight, gPrimaryColor, gSecondaryColor, gTertiaryColor, gPadding, gHeadingSize, gStandardSize) {
        this.name = null;
        this.btnWidth = 0;
        this.btnHeight = 0;
        this.primaryColor = [];
        this.secondaryColor = [];
        this.tertiaryColor = [];
        this.padding = 0;
        this.headingSize = 0;
        this.standardSize = 0;
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
    return UITheme;
}());
var testTheme = new UITheme('Test Theme', 162, 100, [66, 134, 244], [177, 206, 255], [249, 251, 255], 10, 22, 16);
/// <reference path="../references.ts" />
var Pixel = (function () {
    function Pixel(pId, pX, pY, pR, pG, pB, pA) {
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
    Pixel.prototype.render = function (pContext) {
        var imageData = pContext.createImageData(1, 1);
        var pData = imageData.data;
        pData[0] = this.r;
        pData[1] = this.g;
        pData[2] = this.b;
        pData[3] = this.a;
        pContext.putImageData(this.id, this.x, this.y);
    };
    return Pixel;
}());
/// <reference path="../references.ts" />
var eMPOS;
(function (eMPOS) {
    eMPOS[eMPOS["top"] = 0] = "top";
    eMPOS[eMPOS["right"] = 1] = "right";
    eMPOS[eMPOS["bottom"] = 2] = "bottom";
    eMPOS[eMPOS["left"] = 3] = "left";
    eMPOS[eMPOS["dropdown"] = 4] = "dropdown";
    eMPOS[eMPOS["radial"] = 5] = "radial";
})(eMPOS || (eMPOS = {}));
var Menu = (function () {
    // Constructor which is added upon by the menu subclass or instance
    function Menu(gZOrder, gMenuPosition) {
        // The order of the menu within the game's menuArray
        this.id = null;
        // The order in which the menus appear for both graphical and functional purposes
        this.zOrder = 0;
        // The setting which determines the anchoring of the menu
        this.menuPosition = null;
        // The original value by which the menu elements are placed
        this.anchor = [];
        // An array of all the labels that make up the menu
        this.labelArray = [];
        // An array of all the buttons that make up the menu
        this.buttonArray = [];
        // The rectangular bounds of the menu
        this.ulBound = null;
        this.urBound = null;
        this.llBound = null;
        this.lrBound = null;
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
    Menu.prototype.inBounds = function (position) {
    };
    // Method which is called by the Game instance to handle the cursor hovering within 
    //  the bounds of the menu
    Menu.prototype.handleHover = function () { };
    // Method which is called by the Game instance to handle a click event within 
    //  the bounds of the menu
    Menu.prototype.handleClick = function () { };
    return Menu;
}());
/// <reference path="../references.ts" />
var ArtMenu = (function (_super) {
    __extends(ArtMenu, _super);
    function ArtMenu(gZOrder, gMenuPosition) {
        var _this = _super.call(this, gZOrder, gMenuPosition) || this;
        _this.lBackground = null;
        console.log('gMenuPosition is ' + _this.anchor);
        _this.labelArray.push(new Label('Drawing Plants!', [(_this.anchor[0] + g.uiTheme.padding), (_this.anchor[1] + g.uiTheme.padding)], 'heading'));
        return _this;
    }
    return ArtMenu;
}(Menu));
/// <reference path="../references.ts" />
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super.call(this) || this;
        // The order of the button within the game's menuArray
        _this.id = null;
        // The background graphic object
        _this.lBackground = null;
        // The text that is to be displayed on the button
        _this.textValue = null;
        // The linked PIXI Text object that displayes the text on the button
        _this.lText = null;
        return _this;
    }
    return Button;
}(Pixie));
/// <reference path="../references.ts" />
var Label = (function () {
    function Label(gTextValue, gAnchor, gStyle) {
        this.textValue = null;
        this.lText = null;
        this.anchor = [];
        this.style = null;
        this.textValue = gTextValue;
        this.anchor = gAnchor;
        this.style = gStyle;
        var tSize = null;
        if (this.style == 'heading') {
            tSize = g.uiTheme.headingSize;
        }
        else if (this.style == 'standard') {
            tSize = g.uiTheme.standardSize;
        }
        this.lText = new PIXI.Text(this.textValue, { fontFamily: 'Arial',
            fontSize: tSize, fill: "white" });
        this.lText.x = this.anchor[0];
        this.lText.y = this.anchor[1];
        g.stage.addChild(this.lText);
    }
    return Label;
}());
/// <reference path="references.ts" />
var g = new Game();
function gameLoop() {
    requestAnimationFrame(gameLoop);
    g.getState().checkThenPerform();
    g.renderer.render(g.stage);
}
// Initialize the Game object
g.setState(stateSetup);
// Begin the PIXI animation loop
gameLoop();
/// <reference path="game/game.ts" />
/// <reference path="game/state.ts" />
/// <reference path="game/state-setup.ts" />
/// <reference path="game/state-null.ts" />
/// <reference path="visual/pixie.ts" />
/// <reference path="visual/ui-theme.ts" />
/// <reference path="visual/pixel.ts" />
/// <reference path="visual/menu.ts" />
/// <reference path="visual/art-menu.ts" />
/// <reference path="visual/button.ts" />
/// <reference path="visual/label.ts" />
/// <reference path="run.ts" /> 
