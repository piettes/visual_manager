import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class Test3 extends AnimationBase implements Animation {

  private currentColor: number = this.color1;

  getName(): string {
    return "Test3";
  }

  nextframe(frame: Array<Point>, tick: number): boolean {
    if (tick === 1) {

      this.currentColor = this.currentColor === this.color1 ? this.color2 : this.color1;

      if (this.currentColor === this.LED_OFF) {
        return true;
      }

      frame.push({x: 40, y: 0, c: this.currentColor});
      frame.push({x: 41, y: 0, c: this.currentColor});
      frame.push({x: 42, y: 0, c: this.currentColor});
      frame.push({x: 43, y: 0, c: this.currentColor});

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

export {Test3};