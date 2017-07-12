import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class Effect1 extends AnimationBase implements Animation {

  color: number = 0x990099;

  getName(): string {
    return "Effect1";
  }

  animate(frame: Array<Point>, tick: number): boolean {
    if (tick < 100) {
      [0, 5].forEach(y => {
        frame.push({x: tick, y: y, c: this.color});
        frame.push({x: tick + 1, y: y, c: this.color});
        frame.push({x: tick + 2, y: y, c: this.color});
        frame.push({x: tick + 3, y: y, c: this.color});
        frame.push({x: tick + 4, y: y, c: this.color});
      });
    } else {
      [0, 1, 2, 3, 4, 5].forEach(y => {
        frame.push({x: tick, y: y, c: this.color});
        frame.push({x: tick + 1, y: y, c: this.color});
        frame.push({x: tick + 2, y: y, c: this.color});
        frame.push({x: tick + 3, y: y, c: this.color});
        frame.push({x: tick + 4, y: y, c: this.color});
      });
    }
    return true;
  }
  // 340
  tick(tick: number): number {
    if (tick >= 332) {
      return 0;
    }
    return tick + 4;
  }

}

export {Effect1};