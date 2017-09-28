import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class Effect1 extends AnimationBase implements Animation {

  getName(): string {
    return "Effect1";
  }

  nextframe(frame: Array<Point>, tick: number): boolean {
    if (tick < 120) {
      [0, 1, 2, 3, 4].forEach(y => {
        let size = Math.min(4, 120 - tick);
        for (let i = 0; i < size; i++) {
          frame.push({x: tick + i, y: y, c: this.color1.value});
        }
      });
      return true;
    } else if (tick === 120) {
      return true;
    }
    return false;
  }

  // 340
  tick(): void {
    if (this.ticker >= 332) {
      this.ticker = 0;
      return;
    }
    this.ticker += 2;
  }

}

export {Effect1};