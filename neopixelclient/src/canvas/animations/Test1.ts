import {Animation, Location} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class Test1 extends AnimationBase implements Animation {

  private currentColor: number = this.color1.value;

  getName(): string {
    return "Test1";
  }

  nextframe(frame: Array<Point>, tick: number): boolean {
    if (tick === 1) {

      this.currentColor = this.currentColor === this.color1.value ? this.color2.value : this.color1.value;

      if (this.currentColor === this.LED_OFF) {
        return true;
      }

      frame.push({x: 48, y: 2, c: this.currentColor});
      frame.push({x: 49, y: 2, c: this.currentColor});

      if (this.location === Location.WALL) {
        for (let i = 0; i < this.numLED; i++) {
          frame.push({x: i, y: 1, c: this.currentColor});
          frame.push({x: i, y: 0, c: this.currentColor});

        }
      }


      return true;
    }
    return false;
  }

  tick(): void {
    if (this.ticker >= 60 * AnimationBase.FPS_RATE / this.bpm) {
      this.ticker = 0;
    }
    this.ticker++;
  }

  reset(): void {
    super.reset();
    this.currentColor = this.color1.value;
  }

}

export {Test1};