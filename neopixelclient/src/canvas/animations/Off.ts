import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class Off extends AnimationBase implements Animation {

  getName(): string {
    return "Off";
  }

  nextframe(frame: Array<Point>, tick: number): boolean {
    if (tick === 1 || tick === 2) {
      return true;
    }
    return false;
  }

  tick(): void {
    this.ticker++;
  }

  reset(): void {
    super.reset();
  }

}

export {Off};