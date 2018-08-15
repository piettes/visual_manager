import {Animation} from "../Animation";
import {AnimationBase} from "../AnimationBase";

class Fill extends AnimationBase implements Animation {

  getName(): string {
    return "Fill";
  }

  nextframe(frame: Array<number>, tick: number): boolean {
    frame.fill(this.getShade1());
    return true;
  }

  tick(timeDiff: number): number {
    this.ticker++;
    return this.ticker;
  }

  reset(): void {
    super.reset();
  }

}

export {Fill};