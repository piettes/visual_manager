import {Animation} from "../Animation";
import {AnimationBase} from "../AnimationBase";

class FadeInOutSmall2 extends AnimationBase implements Animation {

  getName(): string {
    return "FadeInOutSmall2";
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
    if (this.timeAcc < this.animDuration / 2) {
      return Math.floor(this.timeAcc * 32 / this.animDuration);
    } else {
      return Math.floor(32 - (this.timeAcc * 32 / this.animDuration));
    }
  }

  reset(): void {
    super.reset();
  }

}

export {FadeInOutSmall2};
