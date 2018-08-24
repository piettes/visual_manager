import {Animation} from "../Animation";
import {AnimationBase} from "../AnimationBase";

class FadeIn extends AnimationBase implements Animation {

  getName(): string {
    return "FadeIn";
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
    return Math.floor(16 - (this.timeAcc * 16 / this.animDuration));
  }

  reset(): void {
    super.reset();
  }

}

export {FadeIn};