import {Animation} from "../Animation";
import {AnimationBase} from "../AnimationBase";

class FIORandomRandom extends AnimationBase implements Animation {

  getName(): string {
    return "FIORandomRandom";
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
        this.randomPosition1 = Math.floor(this.random() * (this.numLED - 1));
        this.randomPosition2 = Math.floor(this.random() * (this.numLED - 1));
        this.randomPosition3 = Math.floor(this.random() * (this.numLED - 1));
        return true;
      } else {
        return false;
      }
    }
    this.isOff = false;
    this.setLuminosity(tick);
    for (let i = 0; i < 2; i++) {
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

export {FIORandomRandom};
