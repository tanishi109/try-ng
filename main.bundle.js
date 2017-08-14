webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/application/command.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__domain_Command__ = __webpack_require__("../../../../../src/app/domain/Command.ts");
/* unused harmony export CommandDial */

/* harmony default export */ __webpack_exports__["a"] = ({
    rollMoveDice: function () {
        var dial = new CommandDial(this.rollCrossCommandDice());
        var clockwise = this.rollDice(0, 1) === 0;
        var step = this.rollDice(1, 2);
        var first = dial.command;
        var second = dial.rotate(clockwise, step).command;
        var third = (function () {
            if (step === 2) {
                return dial.rotate(!clockwise, 1).command;
            }
            return dial.rotate(clockwise, 1).command;
        })();
        return [first, second, third, __WEBPACK_IMPORTED_MODULE_0__domain_Command__["a" /* Commands */].P];
    },
    rollCrossCommandDice: function () {
        var crossCommands = [__WEBPACK_IMPORTED_MODULE_0__domain_Command__["a" /* Commands */].Down, __WEBPACK_IMPORTED_MODULE_0__domain_Command__["a" /* Commands */].Right, __WEBPACK_IMPORTED_MODULE_0__domain_Command__["a" /* Commands */].Left, __WEBPACK_IMPORTED_MODULE_0__domain_Command__["a" /* Commands */].Up];
        var index = this.rollDice(0, crossCommands.length - 1);
        return crossCommands[index];
    },
    rollDice: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
});
var CommandDial = (function () {
    function CommandDial(command) {
        this.command = null;
        this.index = null;
        this.dial = [
            __WEBPACK_IMPORTED_MODULE_0__domain_Command__["a" /* Commands */].Up, __WEBPACK_IMPORTED_MODULE_0__domain_Command__["a" /* Commands */].RightUp, __WEBPACK_IMPORTED_MODULE_0__domain_Command__["a" /* Commands */].Right,
            __WEBPACK_IMPORTED_MODULE_0__domain_Command__["a" /* Commands */].RightDown, __WEBPACK_IMPORTED_MODULE_0__domain_Command__["a" /* Commands */].Down, __WEBPACK_IMPORTED_MODULE_0__domain_Command__["a" /* Commands */].LeftDown,
            __WEBPACK_IMPORTED_MODULE_0__domain_Command__["a" /* Commands */].Left, __WEBPACK_IMPORTED_MODULE_0__domain_Command__["a" /* Commands */].LeftUp
        ];
        this.command = command;
        this.index = this.dial.indexOf(command);
    }
    CommandDial.prototype.rotate = function (clockwise, step) {
        if (step === void 0) { step = 1; }
        if (step > this.dial.length) {
            new Error("minus overflow will occured. please fix rotate() method..."); // tslint:disable-line
        }
        var direction = clockwise ? 1 : -1;
        var delta = direction * step;
        var nextIndex = (this.index + this.dial.length + delta) % this.dial.length;
        var nextCommand = this.dial[nextIndex];
        this.index = nextIndex;
        this.command = nextCommand;
        return this;
    };
    return CommandDial;
}());

//# sourceMappingURL=command.js.map

/***/ }),

/***/ "../../../../../src/app/application/player.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_domain_Player__ = __webpack_require__("../../../../../src/app/domain/Player.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_domain_Task__ = __webpack_require__("../../../../../src/app/domain/Task.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__command__ = __webpack_require__("../../../../../src/app/application/command.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);




/* harmony default export */ __webpack_exports__["a"] = ({
    init: function () {
        var player = new __WEBPACK_IMPORTED_MODULE_0_app_domain_Player__["a" /* Player */]();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_lodash__["times"])(player.currentMoveIndex + 1).forEach(function () {
            player.taskQueue.push(new __WEBPACK_IMPORTED_MODULE_1_app_domain_Task__["a" /* Task */](__WEBPACK_IMPORTED_MODULE_2__command__["a" /* default */].rollMoveDice()));
        });
        return player;
    },
    setCurrentCommand: function (player, commands) {
        player.currentCommands = commands;
    },
    getCurrentCommand: function (player) {
        return player.getCurrentCommand();
    },
    isEq: function (player, commands) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_lodash__["isEqual"])(player.getCurrentMove(), commands);
    },
    doneTask: function (player) {
        player.taskQueue = [
            {
                move: __WEBPACK_IMPORTED_MODULE_2__command__["a" /* default */].rollMoveDice(),
                finished: false,
            }
        ].concat(player.taskQueue);
        player.score += 1;
    },
});
//# sourceMappingURL=player.js.map

/***/ }),

/***/ "../../../../../src/app/component/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".gameRoot {\n  height: 100%;\n  width: 100vw;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.taskBgWrapper {\n  position: relative;\n  width: 100vw;\n}\n\n.taskBg {\n  width: 150%;\n  background-color: #FFF514;\n  height: 230px;\n  -webkit-transform: skewX(-20deg) rotate(10deg) translateX(-50%);\n          transform: skewX(-20deg) rotate(10deg) translateX(-50%);\n  position: absolute;\n  top: 50px;\n  left: 50%;\n}\n\n.taskList {\n  height: calc(94px + 16px);\n  overflow: hidden;\n}\n\n.task {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.taskIn {\n  -webkit-animation-name: task-in;\n          animation-name: task-in;\n  -webkit-animation-timing-function: ease;\n          animation-timing-function: ease;\n}\n\n@-webkit-keyframes task-in {\n  0% {\n    -webkit-transform: translateY(-220px);\n            transform: translateY(-220px);\n  }\n  100% {\n    -webkit-transform: translateY(-110px);\n            transform: translateY(-110px);\n  }\n}\n\n@keyframes task-in {\n  0% {\n    -webkit-transform: translateY(-220px);\n            transform: translateY(-220px);\n  }\n  100% {\n    -webkit-transform: translateY(-110px);\n            transform: translateY(-110px);\n  }\n}\n\n.point {\n  z-index: 1;\n  font-size: 12px;\n  margin-top: 45px;\n}\n\n.pointNum {\n  font-size: 18px;\n  font-weight: bold;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/component/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div\n  (window:keydown)=\"handleKey($event)\"\n  class=\"gameRoot\"\n  >\n  <div class=\"taskBgWrapper\">\n  <div class=\"taskBg\">\n  </div>\n  </div>\n  <div class=\"taskList\">\n    <div\n      *ngFor=\"let task of player.taskQueue\"\n      class=\"task\" [ngClass]=\"{'taskIn': isMoving}\"\n      [ngStyle]=\"taskStyle\"\n      >\n      <app-command-component *ngFor=\"let m of task.move\" [command]=\"m\"></app-command-component> \n    </div>\n  </div>\n  <div class=\"point\">\n    Point: <b class=\"pointNum\">{{player.score}}</b>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/component/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_domain_Command__ = __webpack_require__("../../../../../src/app/domain/Command.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_domain_Gamepad__ = __webpack_require__("../../../../../src/app/domain/Gamepad.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_application_player__ = __webpack_require__("../../../../../src/app/application/player.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_infra_Gamepad__ = __webpack_require__("../../../../../src/app/infra/Gamepad.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__command_command_component__ = __webpack_require__("../../../../../src/app/component/command/command.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppComponent = (function () {
    function AppComponent() {
        var _this = this;
        this.player = __WEBPACK_IMPORTED_MODULE_4_app_application_player__["a" /* default */].init();
        this.isMoving = false;
        this.moveDuration = 250;
        this.taskStyle = {
            'animation-duration': this.moveDuration + "ms",
            'transform': "translateY(" + __WEBPACK_IMPORTED_MODULE_6__command_command_component__["b" /* outerSize */] * this.player.currentMoveIndex * -1 + "px)",
        };
        this.keyEvents = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"]();
        this.commandEvents = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"]();
        this.gamePadEvents = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"]();
        this.keyEvents
            .filter(function (keyCode) {
            return [37, 38, 39, 40, 90].includes(keyCode);
        })
            .timeout(100)
            .retry()
            .buffer(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].interval(100))
            .map(function (keyCodes) {
            var commands = keyCodes.map(function (c) {
                return __WEBPACK_IMPORTED_MODULE_3_app_domain_Gamepad__["a" /* default */].getCommandFromKeyCode(c);
            });
            __WEBPACK_IMPORTED_MODULE_4_app_application_player__["a" /* default */].setCurrentCommand(_this.player, commands);
            return __WEBPACK_IMPORTED_MODULE_4_app_application_player__["a" /* default */].getCurrentCommand(_this.player);
        })
            .filter(function (command) { return !!command; })
            .subscribe(function (command) {
            _this.commandEvents.next(command);
        });
        this.commandEvents
            .scan(function (acc, value) {
            var commands = acc.concat(value);
            if (commands.length < 4) {
                return commands;
            }
            return commands.slice(commands.length - 4, commands.length);
        }, [])
            .timeout(1000) // TODO: 20f
            .retry()
            .subscribe(function (commands) {
            if (__WEBPACK_IMPORTED_MODULE_4_app_application_player__["a" /* default */].isEq(_this.player, commands)) {
                _this.animate();
                __WEBPACK_IMPORTED_MODULE_4_app_application_player__["a" /* default */].doneTask(_this.player);
            }
            _this.player.commands = commands;
        });
        var prevValue = '0';
        this.gamePadEvents
            .subscribe(function (command) {
            if (command !== prevValue && command !== __WEBPACK_IMPORTED_MODULE_2_app_domain_Command__["a" /* Commands */].Neutral) {
                _this.commandEvents.next(command);
            }
            prevValue = command;
        });
        new __WEBPACK_IMPORTED_MODULE_5_app_infra_Gamepad__["a" /* GamepadInfra */](function (gamepad) {
            var crossKeyCode = gamepad.axes[gamepad.axes.length - 1]; // getCrossKeyにする
            var command = __WEBPACK_IMPORTED_MODULE_3_app_domain_Gamepad__["a" /* default */].getCommandFromProConKeyCode(crossKeyCode);
            var pad = gamepad.buttons.map(function (button, index) {
                if (button.pressed) {
                    return __WEBPACK_IMPORTED_MODULE_3_app_domain_Gamepad__["a" /* default */].getCommandFromProConKeyCode(parseFloat("" + index));
                }
            });
            pad
                .filter(function (c) { return !!c; })
                .forEach(function (c) {
                _this.gamePadEvents.next(c);
            });
            _this.gamePadEvents.next(command);
        });
    }
    AppComponent.prototype.handleKey = function ($event) {
        var keyCode = $event.keyCode;
        this.keyEvents.next(keyCode);
    };
    ;
    AppComponent.prototype.animate = function () {
        var _this = this;
        this.isMoving = true;
        setTimeout(function () {
            _this.isMoving = false;
        }, this.moveDuration);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* HostListener */])('keydown'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "handleKey", null);
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/component/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/component/app/app.component.css")],
            providers: [],
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/component/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/component/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__command_command_component__ = __webpack_require__("../../../../../src/app/component/command/command.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_4__command_command_component__["a" /* CommandComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormsModule */],
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/component/command/command.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".wrapper {\n  --border-color: black;\n\n  margin-left: 8px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.row:not(:first-child) {\n  margin-top: 2px;\n}\n\n.inner {\n  width: 30px;\n  height: 30px;\n  background-color: #000;\n  opacity: 0.3;\n}\n.inner:not(:first-child) {\n  margin-left: 2px;\n}\n.inner.active {\n  background-color: #000;\n  opacity: 1;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/component/command/command.component.html":
/***/ (function(module, exports) {

module.exports = "<div\n  class=\"wrapper\"\n  [ngStyle]=\"wrapperStyle\"\n  >\n    <ng-template [ngIf]=\"command !== 'p'\">\n      <div *ngFor=\"let row of [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3']]\" class=\"row\">\n        <div *ngFor=\"let r of row\" class=\"inner\" [ngClass]=\"{'active': command === r}\"></div>\n      </div>\n    </ng-template>\n    <ng-template [ngIf]=\"command === 'p'\">\n      + p\n    </ng-template>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/component/command/command.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* unused harmony export size */
/* unused harmony export topMargin */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return outerSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommandComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var size = 94;
var topMargin = 16;
var outerSize = size + topMargin;
var CommandComponent = (function () {
    function CommandComponent() {
        this.wrapperStyle = {
            'width.px': size,
            'height.px': size,
            'margin-top.px': topMargin,
        };
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Input */])(),
        __metadata("design:type", String)
    ], CommandComponent.prototype, "command", void 0);
    CommandComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
            selector: 'app-command-component',
            template: __webpack_require__("../../../../../src/app/component/command/command.component.html"),
            styles: [__webpack_require__("../../../../../src/app/component/command/command.component.css")],
        })
    ], CommandComponent);
    return CommandComponent;
}());

//# sourceMappingURL=command.component.js.map

/***/ }),

/***/ "../../../../../src/app/domain/Command.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Commands; });
var Commands;
(function (Commands) {
    Commands["LeftDown"] = "1";
    Commands["Down"] = "2";
    Commands["RightDown"] = "3";
    Commands["Left"] = "4";
    Commands["Neutral"] = "5";
    Commands["Right"] = "6";
    Commands["LeftUp"] = "7";
    Commands["Up"] = "8";
    Commands["RightUp"] = "9";
    Commands["P"] = "p";
})(Commands || (Commands = {}));
//# sourceMappingURL=Command.js.map

/***/ }),

/***/ "../../../../../src/app/domain/Gamepad.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Command__ = __webpack_require__("../../../../../src/app/domain/Command.ts");

/*
  7 8 9  ↖︎ ↑ ↗︎
  4 5 6  ←   →
  1 2 3  ↙ ︎↓ ↘︎
*/
var keyMap = {
    '37': __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].Left,
    '38': __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].Up,
    '39': __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].Right,
    '40': __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].Down,
    '90': __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].P,
};
var proConMap = {
    '0.7143': __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].Left,
    '-1.0000': __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].Up,
    '1.2857': __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].Neutral,
    '-0.4286': __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].Right,
    '0.1429': __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].Down,
    '-0.1429': __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].RightDown,
    '0.0000': __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].P,
    '1.0000': __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].P,
    '2.0000': __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].P,
    '3.0000': __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].P,
};
/* harmony default export */ __webpack_exports__["a"] = ({
    getCommandFromKeyCode: function (code) {
        return keyMap[code];
    },
    getCommandFromProConKeyCode: function (code) {
        var codeString = "" + code.toFixed(4);
        return proConMap[codeString];
    },
});
//# sourceMappingURL=Gamepad.js.map

/***/ }),

/***/ "../../../../../src/app/domain/Player.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Command__ = __webpack_require__("../../../../../src/app/domain/Command.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Player; });

var Player = (function () {
    function Player(params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        this.commands = [];
        this.taskQueue = [];
        this.score = 0;
        this.currentMoveIndex = 1;
        this.currentCommands = [];
        Object.keys(params).forEach(function (key) {
            _this[key] = params[key];
        });
    }
    Player.prototype.getCurrentCommand = function () {
        if (this.currentCommands.includes(__WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].Left) &&
            this.currentCommands.includes(__WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].Down)) {
            return __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].LeftDown;
        }
        if (this.currentCommands.includes(__WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].Right) &&
            this.currentCommands.includes(__WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].Down)) {
            return __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].RightDown;
        }
        if (this.currentCommands.includes(__WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].Left) &&
            this.currentCommands.includes(__WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].Up)) {
            return __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].LeftUp;
        }
        if (this.currentCommands.includes(__WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].Right) &&
            this.currentCommands.includes(__WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].Up)) {
            return __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* Commands */].RightUp;
        }
        return this.currentCommands[0];
    };
    Player.prototype.getCurrentMove = function () {
        return this.taskQueue[this.currentMoveIndex].move;
    };
    return Player;
}());

//# sourceMappingURL=Player.js.map

/***/ }),

/***/ "../../../../../src/app/domain/Task.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Task; });
var Task = (function () {
    function Task(move, finished) {
        if (finished === void 0) { finished = false; }
        this.move = [];
        this.finished = false;
        this.move = move;
        this.finished = finished;
    }
    return Task;
}());

//# sourceMappingURL=Task.js.map

/***/ }),

/***/ "../../../../../src/app/infra/Gamepad.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GamepadInfra; });

var GamepadInfra = (function () {
    function GamepadInfra(handleGamepad) {
        window.addEventListener('gamepadconnected', this.onConnect, false);
        window.addEventListener('gamepaddisconnected', this.onDisconnect, false);
        this.handleGamepad = handleGamepad;
        this.update();
    }
    GamepadInfra.prototype.update = function () {
        this.updateGamepads();
        requestAnimationFrame(this.update.bind(this));
    };
    GamepadInfra.prototype.updateGamepads = function () {
        var gamepads = this.getGamepads();
        gamepads.forEach(this.handleGamepad);
    };
    GamepadInfra.prototype.getGamepads = function () {
        var gamepads = navigator.getGamepads();
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_lodash__["compact"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_lodash__["times"])(gamepads.length)
            .map(function (index) { return gamepads[index]; }));
    };
    GamepadInfra.prototype.onConnect = function (e) {
        console.log('*** CONNECTED ***'); // tslint:disable-line no-console
    };
    GamepadInfra.prototype.onDisconnect = function (e) {
        console.log('*** DISCONNECTED ***'); // tslint:disable-line no-console
    };
    return GamepadInfra;
}());

//# sourceMappingURL=Gamepad.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component_app_app_module__ = __webpack_require__("../../../../../src/app/component/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_component_app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map