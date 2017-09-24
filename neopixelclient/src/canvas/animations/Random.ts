import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class Random extends AnimationBase implements Animation {

  private currentColor: number = this.color1;

  getName(): string {
    return "Random";
  }

  nextframe(frame: Array<Point>, tick: number): boolean {
    if (tick === 1) {

      this.currentColor = this.currentColor === this.color1 ? this.color2 : this.color1;

      if (this.currentColor === this.LED_OFF) {
        return true;
      }

      [0, 1, 2, 3, 4].forEach(y => {
        let r: number = Math.floor(Math.random() * (this.LED_LINE_ROOF - 7));
        for (let i = 0; i < 7; i++) {
          frame.push({x: r + i, y: y, c: this.currentColor});
        }
      });
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

export {Random};