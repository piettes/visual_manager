import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class Random extends AnimationBase implements Animation {

  private scal1: number = (this.LED_LINE_ROOF * 2 + this.LED_LINE_WALL - 5) / 2;
  private scal2: number = (this.LED_LINE_ROOF * 2 - 5) / 2;

  private currentColor = this.color1;

  getName(): string {
    return "Random";
  }

  nextframe(frame: Array<Point>, tick: number): boolean {
    if (tick === 1) {

      this.currentColor = this.currentColor === this.color1 ? this.color2 : this.color1;

      [0, 5].forEach(y => {
        let r: number = Math.floor(Math.random() * this.scal1) * 2;
        frame.push({x: r, y: y, c: this.currentColor});
        frame.push({x: r + 1, y: y, c: this.currentColor});
        frame.push({x: r + 2, y: y, c: this.currentColor});
        frame.push({x: r + 3, y: y, c: this.currentColor});
        frame.push({x: r + 4, y: y, c: this.currentColor});
        frame.push({x: r + 5, y: y, c: this.currentColor});
      });
      [1, 2, 3, 4].forEach(y => {
        let r: number = Math.floor(Math.random() * this.scal2) * 2 + this.LED_LINE_WALL;
        frame.push({x: r, y: y, c: this.currentColor});
        frame.push({x: r + 1, y: y, c: this.currentColor});
        frame.push({x: r + 2, y: y, c: this.currentColor});
        frame.push({x: r + 3, y: y, c: this.currentColor});
        frame.push({x: r + 4, y: y, c: this.currentColor});
        frame.push({x: r + 5, y: y, c: this.currentColor});
      });
      return true;
    }
    return false;
  }

  tick(): void {
    if (this.ticker >= 3600 / this.bpm) {
      this.ticker = 0;
    }
    this.ticker++;
  }

}

export {Random};