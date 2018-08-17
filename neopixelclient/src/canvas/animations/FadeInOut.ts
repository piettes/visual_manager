import {Animation} from "../Animation";
import {AnimationBase} from "../AnimationBase";

class FadeInOut extends AnimationBase implements Animation {

  getName(): string {
    return "FadeInOut";
  }

  nextframe(frame: Array<number>, tick: number): boolean {
    this.setLuminosity(tick);
    frame.fill(this.getShade1());
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
    return 15 - Math.floor(this.timeAcc * 15 / this.animDuration) + 1;
    // if (this.timeAcc < this.animDuration / 2) {
    //   return 15 - Math.floor(this.timeAcc * 15 / this.animDuration) + 1;
    // } else {
    //   return Math.floor(this.timeAcc * 15 / this.animDuration) + 1;
    // }
  }

  reset(): void {
    super.reset();
  }

}

export {FadeInOut};