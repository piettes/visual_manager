import {Animation} from "../Animation";
import {AnimationBase} from "../AnimationBase";
import {LED_OFF} from "../Setup";

class Random extends AnimationBase implements Animation {

  private currentColor: number = this.getShade1();

  getName(): string {
    return "Random";
  }

  colum: Array<number> = new Array<number>(this.numLED).fill(LED_OFF);

  nextframe(frame: Array<number>, tick: number): boolean {
    if (tick === 0) {
      this.currentColor = this.currentColor === this.getShade1() ? this.getShade2() : this.getShade1();
      if (this.currentColor === this.LED_OFF) {
        return true;
      }
      this.colum = [];
      let r: number = Math.floor(Math.random() * (this.numLED - 7));
      for (let i = 0; i < 7; i++) {
        this.colum[r + i] = this.currentColor;
      }
    }
    frame = this.colum;
    if (this.currentColor === this.LED_OFF) {
      return true;
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
    this.currentColor = this.getShade1();
  }

}

export {Random};