import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class Random extends AnimationBase implements Animation {

  private currentColor: number = this.getShade1();

  getName(): string {
    return "Random";
  }

  colum: Array<Point> = [];

  nextframe(frame: Array<Point>, tick: number): boolean {
    if (tick === 0) {
      this.currentColor = this.currentColor === this.getShade1() ? this.getShade2() : this.getShade1();
      if (this.currentColor === this.LED_OFF) {
        return true;
      }
      this.colum = [];
      let r: number = Math.floor(Math.random() * (this.numLED - 7));
      for (let i = 0; i < 7; i++) {
        this.colum.push({x: r + i, c: this.currentColor});
      }
    }
    if (this.currentColor === this.LED_OFF) {
      return true;
    }
    frame.push(...this.colum);

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