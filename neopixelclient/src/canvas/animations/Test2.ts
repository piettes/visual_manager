import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class Test2 extends AnimationBase implements Animation {

  private currentColor: number = this.color1.value;

  getName(): string {
    return "Test2";
  }

  nextframe(frame: Array<Point>, tick: number): boolean {
    if (tick === 1) {

      this.currentColor = this.currentColor === this.color1.value ? this.color2.value : this.color1.value;

      if (this.currentColor === this.LED_OFF) {
        return true;
      }

      frame.push({x: 50, y: 1, c: this.currentColor});
      frame.push({x: 51, y: 1, c: this.currentColor});
      frame.push({x: 47, y: 2, c: this.currentColor});
      frame.push({x: 46, y: 2, c: this.currentColor});

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
    this.currentColor = this.color1.value;
  }

}

export {Test2};