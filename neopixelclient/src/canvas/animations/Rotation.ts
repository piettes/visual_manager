import {Animation} from "../Animation";
import {AnimationBase} from "../AnimationBase";
import {Point} from "../Point";

class Rotation extends AnimationBase implements Animation {

  xlim = this.LED_LINE_ROOF * 2 + this.LED_LINE_WALL;

  getName() {
    return "Rotation";
  }

  tick(): void {
    if (this.ticker === 359) {
      this.ticker = 0;
    }
    this.ticker++;
  };

  nextframe(frame: Array<Point>, theta: number): boolean {
    if ([0, 1, 359, 179, 180, 181].indexOf(theta) !== -1) {
      for (let i = 0; i < this.LED_LINE_ROOF; i++) {
        frame.push({x: this.LED_LINE_WALL + i * 2, y: 2, c: this.color1});
        frame.push({x: this.LED_LINE_WALL + i * 2, y: 3, c: this.color1});
      }
      return true;
    }

    [0, 1, 2, 3, 4].forEach(y => {
      // x = (y / sin theta) * cos theta = y / tan theta
      let x = Math.round((y - 2.5) / Math.tan(theta / 360 * Math.PI * 2) * 30) + this.LED_LINE_ROOF + this.LED_LINE_WALL;
      if (x > 0 && x < this.LED_LINE_ROOF * 2 + this.LED_LINE_WALL) {
        this.axAddPixels(frame, x, y);
      }
    });
    return true;
  }

  axAddPixels(frame: any, x: number, y: number) {
    frame.push({x: x, y: y, c: this.color1});
    [1, 2].forEach(i => {
      x + i < this.xlim ? frame.push({x: x + i, y: y, c: this.color1}) : "";
      x - i > 0 ? frame.push({x: x - i, y: y, c: this.color1}) : "";
    });
    [3, 4, 5, 6].forEach(i => {
      x + i < this.xlim ? frame.push({x: x + i, y: y, c: this.color2}) : "";
      x - i > this.LED_LINE_WALL - 1 ? frame.push({x: x - i, y: y, c: this.color2}) : "";
    });
  }

}

export {Rotation};