import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";
import Color from "../Color";

class Rain extends AnimationBase implements Animation {

  constructor() {
    super();
  }

  getName(): string {
    return "Rain";
  }

  nextframe(frame: Array<Point>, tick: number): boolean {
    if (tick === 0) {
      let color: Color = Math.random() > 0.5 ? this.color1 : this.color2;
      let shade: number = color.getShade(Math.floor(Math.random() * 6));
      let x: number = Math.floor(Math.random() * this.numLED);
      frame.push({x: x, c: shade});
    }
    return true;
  }

  tick(timeDiff: number): number {
    if (this.ticker >= this.patternLength) {
      this.ticker = 0;
      return this.ticker;
    }
    this.ticker++;
    return this.ticker;
  }

}

export {Rain};