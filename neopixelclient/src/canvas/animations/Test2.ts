import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class Test2 extends AnimationBase implements Animation {

  private currentColor: number = this.color1;

  getName(): string {
    return "Test2";
  }

  nextframe(frame: Array<Point>, tick: number): boolean {
    if (tick === 1) {

      this.currentColor = this.currentColor === this.color1 ? this.color2 : this.color1;

      if (this.currentColor === this.LED_OFF) {
        return true;
      }

      frame.push({x: 36, y: 0, c: this.currentColor});
      frame.push({x: 37, y: 0, c: this.currentColor});
      frame.push({x: 38, y: 0, c: this.currentColor});
      frame.push({x: 39, y: 0, c: this.currentColor});

      return true;
    }
    return false;
  }

  tick(): void {
    if (this.ticker >= 600 / this.bpm) {
      this.ticker = 0;
    }
    this.ticker++;
  }

  reset(): void {
    super.reset();
    this.currentColor = this.color1;
  }

}

export {Test2};