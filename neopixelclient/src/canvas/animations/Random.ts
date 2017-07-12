import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class Random extends AnimationBase implements Animation {

  color: number = 0x990099;

  scal1: number = (this.LED_LINE_ROOF * 2 + this.LED_LINE_WALL - 5) / 2;
  scal2: number = (this.LED_LINE_ROOF * 2 - 5) / 2;

  getName(): string {
    return "Random";
  }

  animate(frame: Array<Point>, tick: number): boolean {
    if (tick === 1) {
      [0, 5].forEach(y => {
        let r: number = Math.floor(Math.random() * this.scal1) * 2;
        frame.push({x: r, y: y, c: this.color});
        frame.push({x: r + 1, y: y, c: this.color});
        frame.push({x: r + 2, y: y, c: this.color});
        frame.push({x: r + 3, y: y, c: this.color});
        frame.push({x: r + 4, y: y, c: this.color});
        frame.push({x: r + 5, y: y, c: this.color});
      });
      [1, 2, 3, 4].forEach(y => {
        let r: number = Math.floor(Math.random() * this.scal2) * 2 + this.LED_LINE_WALL;
        frame.push({x: r, y: y, c: this.color});
        frame.push({x: r + 1, y: y, c: this.color});
        frame.push({x: r + 2, y: y, c: this.color});
        frame.push({x: r + 3, y: y, c: this.color});
        frame.push({x: r + 4, y: y, c: this.color});
        frame.push({x: r + 5, y: y, c: this.color});
      });
      return true;
    }
    return false;
  }

  tick(tick: number): number {
    if (tick >= 30) {
      return 0;
    }
    return tick + 1;
  }

}

export {Random};