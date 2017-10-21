import {Animation, Location} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class Effect1 extends AnimationBase implements Animation {

  getName(): string {
    return "Effect1";
  }

  nextframe(frame: Array<Point>, tick: number): boolean {
    if (tick < this.numLED) {
      this.array.forEach(y => {
        let size = Math.min(4, this.numLED - tick);
        for (let i = 0; i < size; i++) {
          frame.push({x: tick + i, y: y, c: this.color1.value});
        }
      });
      return true;
    } else if (tick === this.numLED) {
      return true;
    }
    return false;
  }

  // 340
  tick(timeDiff: number): void {
    if (this.ticker >= 332) {
      this.ticker = 0;
      return;
    }
    this.ticker += 2;
  }

}

export {Effect1};