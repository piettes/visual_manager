import {Animation} from "../Animation";
import {AnimationBase} from "../AnimationBase";
import Color from "../Color";

class FadeInOutRandom extends AnimationBase implements Animation {

  getName(): string {
    return "FadeInOutRandom";
  }

  private isOff: boolean = false;
  private randomPosition1: number = 0;
  private randomPosition2: number = 0;
  private randomPosition3: number = 0;

  nextframe(frame: Array<number>, tick: number): boolean {
    if (tick === -1) {
      if (!this.isOff) {
        this.isOff = true;
        this.switchCurrentColor();
        this.randomPosition1 = Math.floor(this.random() * (this.numLED - 5));
        this.randomPosition2 = Math.floor(this.random() * (this.numLED - 5));
        this.randomPosition3 = Math.floor(this.random() * (this.numLED - 5));
        return true;
      } else {
        return false;
      }
    }
    this.isOff = false;
    this.setLuminosity(tick);
    for (let i = 0; i < 4; i++) {
      frame[this.randomPosition1 + i] = this.getCurrentShade();
      frame[this.randomPosition2 + i] = this.getCurrentShade();
      frame[this.randomPosition3 + i] = this.getCurrentShade();
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
    if (this.timeAcc < this.animDuration / 2) {
      let val = Math.floor(16 - (this.timeAcc * 32 / this.animDuration));
      console.log("this.timeAcc < this.animDuration / 2 " + val);
      return val;
    } else {
      let val = Math.floor(this.timeAcc * 32 / this.animDuration);
      console.log(val);
      return val;
    }
  }

  reset(): void {
    super.reset();
  }

}

export {FadeInOutRandom};
