"use strict";
var Effect1 = (function () {
    function Effect1() {
        this.color = 0x990099;
    }
    Effect1.prototype.animate = function (frame, tick) {
        var _this = this;
        if (tick < 100) {
            [0, 5].forEach(function (y) {
                frame.push({ x: tick, y: y, c: _this.color });
                frame.push({ x: tick + 1, y: y, c: _this.color });
                frame.push({ x: tick + 2, y: y, c: _this.color });
                frame.push({ x: tick + 3, y: y, c: _this.color });
                frame.push({ x: tick + 4, y: y, c: _this.color });
            });
        }
        else {
            [0, 1, 2, 3, 4, 5].forEach(function (y) {
                frame.push({ x: tick, y: y, c: _this.color });
                frame.push({ x: tick + 1, y: y, c: _this.color });
                frame.push({ x: tick + 2, y: y, c: _this.color });
                frame.push({ x: tick + 3, y: y, c: _this.color });
                frame.push({ x: tick + 4, y: y, c: _this.color });
            });
        }
    };
    // 340
    Effect1.prototype.tick = function (tick) {
        if (tick >= 332) {
            return 0;
        }
        return tick + 4;
    };
    return Effect1;
}());
exports.Effect1 = Effect1;
//# sourceMappingURL=Effect1.js.map