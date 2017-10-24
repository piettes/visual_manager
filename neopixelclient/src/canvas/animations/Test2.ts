import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";
import Color from "../Color";

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

      frame.push({x: 120, y: 3, c: Color.RED.value});
      frame.push({x: 119, y: 3, c: Color.CYAN.value});
      frame.push({x: 118, y: 3, c: Color.BLUE.value});


      return true;
    }
    return false;
  }

  tick(timeDiff: number): number {
    if (this.ticker >= 600 / this.bpm) {
      this.ticker = 0;
      return this.ticker;
    }
    this.ticker++;
    return this.ticker;
  }

  reset(): void {
    super.reset();
    this.currentColor = this.color1.value;
  }

}

export {Test2};