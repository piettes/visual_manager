import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class Random extends AnimationBase implements Animation {

  private scal1: number = (this.LED_LINE_ROOF * 2 + this.LED_LINE_WALL - 7) / 2;
  private scal2: number = (this.LED_LINE_ROOF * 2 - 7) / 2;

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
      [0, 4].forEach(y => {
        let r: number = Math.floor(Math.random() * this.scal1) * 2;
        frame.push({x: r, y: y, c: this.currentColor});
        frame.push({x: r + 1, y: y, c: this.currentColor});
        frame.push({x: r + 2, y: y, c: this.currentColor});
        frame.push({x: r + 3, y: y, c: this.currentColor});
        frame.push({x: r + 4, y: y, c: this.currentColor});
        frame.push({x: r + 5, y: y, c: this.currentColor});
        frame.push({x: r + 6, y: y, c: this.currentColor});
        frame.push({x: r + 7, y: y, c: this.currentColor});
      });
      [1, 2, 3].forEach(y => {
        let r: number = Math.floor(Math.random() * this.scal2) * 2 + this.LED_LINE_WALL;
        frame.push({x: r, y: y, c: this.currentColor});
        frame.push({x: r + 1, y: y, c: this.currentColor});
        frame.push({x: r + 2, y: y, c: this.currentColor});
        frame.push({x: r + 3, y: y, c: this.currentColor});
        frame.push({x: r + 4, y: y, c: this.currentColor});
        frame.push({x: r + 5, y: y, c: this.currentColor});
        frame.push({x: r + 6, y: y, c: this.currentColor});
        frame.push({x: r + 7, y: y, c: this.currentColor});

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