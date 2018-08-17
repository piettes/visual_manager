import {Animation} from "../Animation";
import {AnimationBase} from "../AnimationBase";

class Random extends AnimationBase implements Animation {

  private currentColor: number = this.getShade1();

  getName(): string {
    return "Random";
  }

  randomPosition: number = 0;

  nextframe(frame: Array<number>, tick: number): boolean {
    if (tick === 0) {
      this.currentColor = this.currentColor === this.getShade1() ? this.getShade2() : this.getShade1();
      if (this.currentColor === this.LED_OFF) {
        return true;
      }
      this.randomPosition = Math.floor(Math.random() * (this.numLED - 5));
    }
    [0, 1, 2, 3, 4].forEach(i => frame[i + this.randomPosition] = this.currentColor);

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
    this.currentColor = this.getShade1();
  }

}

export {Random};