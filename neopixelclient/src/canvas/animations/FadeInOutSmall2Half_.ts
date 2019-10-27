import {Animation} from "../Animation";
import {AnimationBase} from "../AnimationBase";

class FadeInOutSmall2Half extends AnimationBase implements Animation {

  getName(): string {
    return "FadeInOutSmall2Half";
  }

  nextframe(frame: Array<number>, tick: number): boolean {
    this.setLuminosity(tick);
    for (let i = 0; i < this.numLED / 4 - 3; i++) {
      frame[4 * i] = this.getShade1();
      frame[4 * i + 1] = this.getShade1();
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
    console.log(this.timeAcc)
    if (this.timeAcc < this.animDuration / 4) {
      return Math.floor(this.timeAcc * 32 / this.animDuration);
    } else if (this.timeAcc < this.animDuration / 2) {
      return Math.floor(32 - (this.timeAcc * 32 / this.animDuration));
    } else {
      return 0;
    }
  }

  reset(): void {
    super.reset();
  }

}

export {FadeInOutSmall2Half};
