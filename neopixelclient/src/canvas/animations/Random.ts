import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class Random extends AnimationBase implements Animation {

  private currentColor: number = this.color1.value;

  getName(): string {
    return "Random";
  }

  nextframe(frame: Array<Point>, tick: number): boolean {
    if (tick === 0) {
      this.currentColor = this.currentColor === this.color1.value ? this.color2.value : this.color1.value;

      if (this.currentColor === this.LED_OFF) {
        return true;
      }

      this.array.forEach(y => {
        let r: number = Math.floor(Math.random() * (this.numLED - 7));
        for (let i = 0; i < 7; i++) {
          frame.push({x: r + i, y: y, c: this.currentColor});
        }
      });
      return true;
    }
    return false;
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
    this.currentColor = this.color1.value;
  }

}

export {Random};