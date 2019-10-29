import {Animation} from "../Animation";
import {AnimationBase} from "../AnimationBase";

class Strobe extends AnimationBase implements Animation {

  getName(): string {
    return "Strobe";
  }

  randomPosition: number = 0;
  pair: boolean = false;


  nextframe(frame: Array<number>, tick: number): boolean {
    if (tick === 0) {
      this.pair = !this.pair;
      this.randomPosition = Math.floor(this.random() * (this.numLED - 5));
      [0, 1, 2, 3, 4].forEach(i => frame[i + this.randomPosition] = this.pair ? this.getShade1() : this.getShade2());
    }
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
  }

}

export {Strobe};
