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

  tick(timeDiff: number): number {
    if (this.timeAcc === -1) {
      this.timeAcc = timeDiff;
      return 0;
    }
    this.timeAcc += timeDiff;
    if (this.timeAcc >= this.animDuration) {
      this.timeAcc -= this.animDuration;
      return 0;
    }
    return Math.floor(this.timeAcc / this.animDuration * this.numLED * 2) + 1;
  }

}

export {Effect1};