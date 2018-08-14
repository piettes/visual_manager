import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class Off extends AnimationBase implements Animation {

  getName(): string {
    return "Off";
  }

  nextframe(frame: Array<number>, tick: number): boolean {
    if (tick === 1) {
      return true;
    }
    return false;
  }

  tick(timeDiff: number): number {
    this.ticker++;
    return this.ticker;
  }

  reset(): void {
    super.reset();
  }

}

export {Off};