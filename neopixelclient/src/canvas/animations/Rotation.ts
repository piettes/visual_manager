import {Animation} from "../Animation";
import {AnimationBase} from "../AnimationBase";
import {Point} from "../Point";

class Rotation extends AnimationBase implements Animation {

  xlim = this.LED_LINE_ROOF * 2 + this.LED_LINE_WALL;

  getName() {
    return "Rotation";
  }

  animate(frame: Array<Point>, theta: number): boolean {
    if (theta === 0 || theta === 180) {
      for (let i = 0; i < this.LED_LINE_ROOF; i++) {
        frame.push({x: this.LED_LINE_WALL + i * 2, y: 2, c: 0xff0000});
        frame.push({x: this.LED_LINE_WALL + i * 2, y: 3, c: 0xff0000});
      }
      return true;
    }

    [0, 1, 2, 3, 4, 5].forEach(y => {
      // x = (y / sin theta) * cos theta = y / tan theta
      let x = Math.round((y - 2.5) / Math.tan(theta / 360 * Math.PI * 2) * 30) + this.LED_LINE_ROOF + this.LED_LINE_WALL;
      if (x > 0 && x < this.LED_LINE_ROOF * 2 + this.LED_LINE_WALL) {
        this.axAddPixels(frame, x, y);
      }
    });
    return true;
  }

  axAddPixels(frame: any, x: number, y: number) {
    frame.push({x: x, y: y, c: 0xff0000});
    [1, 2].forEach(i => {
      x + i < this.xlim ? frame.push({x: x + i, y: y, c: 0xff0000}) : "";
      x - i > 0 ? frame.push({x: x - i, y: y, c: 0xff0000}) : "";
    });
    [3, 4, 5, 6].forEach(i => {
      x + i < this.xlim ? frame.push({x: x + i, y: y, c: 0x00ff00}) : "";
      x - i > this.LED_LINE_WALL - 1 ? frame.push({x: x - i, y: y, c: 0x00ff00}) : "";
    });
  }

  tick(tick: number): number {
    if (tick === 359) {
      return 0;
    }
    return tick + 1;
  };

}

export {Rotation};