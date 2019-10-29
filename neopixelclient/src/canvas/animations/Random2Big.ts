import {Animation} from "../Animation";
import {AnimationBase} from "../AnimationBase";

class Random2Big extends AnimationBase implements Animation {

  private currentColor_: number = this.getShade1();

  getName(): string {
    return "Random2Big";
  }

  randomPositions = Array(40);

  nextframe(frame: Array<number>, tick: number): boolean {
    if (tick === 0) {
      this.currentColor_ = this.currentColor_ === this.getShade1() ? this.getShade2() : this.getShade1();
      if (this.currentColor_ === this.LED_OFF) {
        return true;
      }
      this.randomPositions = Array.from(Array(40).keys()).map(x => Math.floor(this.random() * (this.numLED - 1)));
      // this.randomPosition1 = Math.floor(this.random() * (this.numLED - 5));
      // this.randomPosition2 = Math.floor(this.random() * (this.numLED - 5));
      // this.randomPosition3 = Math.floor(this.random() * (this.numLED - 5));
      // this.randomPosition4 = Math.floor(this.random() * (this.numLED - 5));
      // this.randomPosition5 = Math.floor(this.random() * (this.numLED - 5));
    }
    this.randomPositions.forEach(p => frame[p] = this.currentColor_);
    // frame[this.randomPosition1] = this.currentColor;
    // frame[this.randomPosition2] = this.currentColor;
    // frame[this.randomPosition3] = this.currentColor;
    // frame[this.randomPosition4] = this.currentColor;
    // frame[this.randomPosition5] = this.currentColor;

    return true;
  }

  tick(timeDiff: number): number {
    if (this.timeAcc === -1) {
      this.timeAcc = timeDiff;
      return 0;
    }
    this.timeAcc += timeDiff;
    if (this.timeAcc > this.animDuration) {
      this.timeAcc -= this.animDuration;
      return 0;
    }
    return 1;
  }

  reset(): void {
    super.reset();
    this.currentColor_ = this.getShade1();
  }

}

export {Random2Big};
