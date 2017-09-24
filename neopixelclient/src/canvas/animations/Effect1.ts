import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class Effect1 extends AnimationBase implements Animation {

  getName(): string {
    return "Effect1";
  }

  nextframe(frame: Array<Point>, tick: number): boolean {
    if (tick < 100) {
      [0, 4].forEach(y => {
        frame.push({x: tick, y: y, c: this.color1});
        frame.push({x: tick + 1, y: y, c: this.color1});
        frame.push({x: tick + 2, y: y, c: this.color1});
        frame.push({x: tick + 3, y: y, c: this.color1});
        frame.push({x: tick + 4, y: y, c: this.color1});
      });
    } else {
      [0, 1, 2, 3, 4].forEach(y => {
        frame.push({x: tick, y: y, c: this.color1});
        frame.push({x: tick + 1, y: y, c: this.color1});
        frame.push({x: tick + 2, y: y, c: this.color1});
        frame.push({x: tick + 3, y: y, c: this.color1});
        frame.push({x: tick + 4, y: y, c: this.color1});
      });
    }
    return true;
  }

  // 340
  tick(): void {
    if (this.ticker >= 332) {
      this.ticker = 0;
    }
    this.ticker += 4;
  }

}

export {Effect1};