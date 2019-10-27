import {Animation} from "../Animation";
import {AnimationBase} from "../AnimationBase";

class FadeInOutSmall2Half extends AnimationBase implements Animation {

  getName(): string {
    return "FadeInOutSmall2Half";
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
    for (let i = 0; i < this.numLED / 4 - 1; i++) {
      frame[4 * i] = this.getShade1();
      frame[4 * i + 1] = this.getShade1();
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
    console.log(this.timeAcc)
    if (this.timeAcc < this.animDuration / 4) {
      console.log("this.timeAcc < this.animDuration / 2 " + Math.floor(16 - (this.timeAcc * 32 / this.animDuration)));
      return Math.floor(16 - (this.timeAcc * 16 / this.animDuration));
    } else if (this.timeAcc < this.animDuration / 2) {
      console.log("this.timeAcc < this.animDuration / 4 " +  Math.floor(this.timeAcc * 32 / this.animDuration));
      return Math.floor(this.timeAcc * 16 / this.animDuration);
    } else {
      return -1;
    }
  }

  reset(): void {
    super.reset();
  }

}

export {FadeInOutSmall2Half};
