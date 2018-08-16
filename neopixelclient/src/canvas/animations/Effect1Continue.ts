import {Animation} from "../Animation";
import {AnimationBase} from "../AnimationBase";

class Effect1Continue extends AnimationBase implements Animation {

  getName(): string {
    return "Effect1Continue";
  }

  nextframe(frame: Array<number>, tick: number): boolean {
    if (tick < this.numLED) {
      let size = Math.min(4, this.numLED - tick);
      for (let i = 0; i < size; i++) {
        frame[tick + i] = this.getShade1();
      }
      return true;
    }
    return true;
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
    return Math.floor(this.timeAcc / this.animDuration * this.numLED) + 1;
  }

}

export {Effect1Continue};