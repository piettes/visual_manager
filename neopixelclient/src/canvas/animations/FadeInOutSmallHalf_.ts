import {Animation} from "../Animation";
import {AnimationBase} from "../AnimationBase";

class FadeInOutSmallHalf extends AnimationBase implements Animation {

  getName(): string {
    return "FadeInOutSmallHalf";
  }

  isOff: boolean = false;

  nextframe(frame: Array<number>, tick: number): boolean {
    if (tick === -1) {
      if (!this.isOff) {
        this.isOff = true;
        return true;
      } else {
        return false;
      }
    }
    this.isOff = false;
    this.setLuminosity(tick);
    for (let i = 0; i < this.numLED / 2 - 1; i++) {
      frame[2 * i] = this.getShade1();
    }
    return true;
  }

  tick(timeDiff: number): number {
    if (this.timeAcc === -1) {
      this.timeAcc = timeDiff;
      return -1;
    }
    this.timeAcc += timeDiff;

    if (this.timeAcc >= this.animDuration) {
      this.timeAcc -= this.animDuration;
      return -1;
    }
    if (this.timeAcc < this.animDuration / 4) {
      return Math.floor(16 - (this.timeAcc * 64 / this.animDuration));
    } else if (this.timeAcc < this.animDuration / 2) {
      return Math.floor((this.timeAcc * 64 / this.animDuration) - 16);
    } else {
      return -1;
    }
  }

  reset(): void {
    super.reset();
  }

}

export {FadeInOutSmallHalf};
