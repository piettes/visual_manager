"use strict";
var Effect1_1 = require("./Effect1");
var FACTOR = 2;
var PIXEL_SIZE = 1 * FACTOR;
var LED_PER_METER_ROOF = 30;
var LED_PER_METER_WALL = 60;
var LED_LINE_ROOF = 120;
var LED_LINE_WALL = 100;
var LINE_SPACE = 65 * FACTOR;
var ROOM_LENGTH = 520 * FACTOR;
var ROOM_HEIGHT = 390 * FACTOR;
var MARGIN_LEFT = 10 * FACTOR;
var MARGIN_TOP = 67 * FACTOR;
var LED_OFF = -1;
var Canvas = (function () {
    function Canvas() {
        this.accDelta = 0;
        this.tickerCalled = 0;
        this.initFrameLists();
        this.initDraw();
        this.setTickerFunction(this.tickerFunction(this));
        this.manualMode = false;
        this.animation = new Effect1_1.Effect1();
    }
    // lastTickerCalled: number = performance.now();
    Canvas.prototype.tickerFunction = function (_that) {
        var _this = this;
        return function (delta) {
            _this.tickerCalled++;
            // if (performance.now() - this.lastTickerCalled > 1000) {
            //   if (this.tickerCalled < 40) {
            //     console.error("avg fps: " + this.tickerCalled , performance.now() / 1000);
            //   } else {
            //     console.log("avg fps: " + this.tickerCalled, performance.now() / 1000);
            //   }
            //   this.tickerCalled = 0;
            //   this.lastTickerCalled = performance.now();
            // }
            if (_that.animation) {
                _this.accDelta += delta;
                if (_this.accDelta > 1) {
                    _this.accDelta = 0;
                    _that.step();
                }
            }
        };
    };
    Canvas.prototype.step = function () {
        this.ticker = this.animation.tick(this.ticker);
        this.animation.animate(this.nextFrameList, this.ticker);
        this.calculateFrameDiff();
        this.render();
    };
    Canvas.prototype.calculateFrameDiff = function () {
        var _this = this;
        this.nextFrameMap = new Map();
        this.nextFrameList = this.nextFrameList.filter(function (p) { return Canvas.isInFrame(p.x, p.y); });
        this.nextFrameList.forEach(function (p) {
            _this.drawPixel(p.x, p.y, p.c);
            _this.nextFrameMap.set(p.x * 10 + p.y, p.c);
        });
        this.lastFrameList.forEach(function (p) {
            if (!_this.nextFrameMap.get(p.x * 10 + p.y)) {
                _this.drawPixel(p.x, p.y, LED_OFF);
            }
        });
        this.lastFrameList = this.nextFrameList.concat();
        this.nextFrameList = [];
    };
    Canvas.prototype.initFrameLists = function () {
        this.nextFrameList = [];
        this.lastFrameList = [];
        this.ticker = 0;
    };
    Canvas.isInFrame = function (x, y) {
        if (0 < y && y < 5) {
            return LED_LINE_WALL - 1 < x && x % 2 === 0;
        }
        else if (y === 0 || y === 5) {
            return x < LED_LINE_WALL || x % 2 === 0;
        }
    };
    Canvas.prototype.setAnimation = function (animation) {
        this.animation = animation;
    };
    Canvas.prototype.toggleManual = function () {
        console.log("set manual " + !this.manualMode);
        this.manualMode = !this.manualMode;
        this.toggleTicker(!this.manualMode);
    };
    Canvas.prototype.incTicker = function () {
        this.step();
    };
    return Canvas;
}());
exports.Canvas = Canvas;
//# sourceMappingURL=Canvas.js.map