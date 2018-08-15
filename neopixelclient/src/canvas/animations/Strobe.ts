import {Animation} from "../Animation";
import {AnimationBase} from "../AnimationBase";
import {LED_OFF} from "../Setup";

class Strobe extends AnimationBase implements Animation {

  private currentColor: number = this.getShade1();

  getName(): string {
    return "Strobe";
  }

  column: Array<number> = new Array<number>(this.numLED).fill(LED_OFF);

  nextframe(frame: Array<number>, tick: number): boolean {
    if (tick === 0) {
      this.currentColor = this.currentColor === this.getShade1() ? this.getShade2() : this.getShade1();
      if (this.currentColor === this.LED_OFF) {
        return true;
      }
      this.column = [];
      let r: number = Math.floor(Math.random() * (this.numLED - 16));
      for (let i = 0; i < 16; i++) {
        this.column[r + i] = this.currentColor;
      }
    }
    frame = this.column;
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

export {Strobe};