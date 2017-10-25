import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";
import Color from "../Color";

class Rain extends AnimationBase implements Animation {

  offsets: Array<any> = [];

  constructor() {
    super();
    this.initOffsets();
  }

  getName(): string {
    return "Rain";
  }

  initOffsets() {
    let offsets = [];
    offsets.push(0);
    offsets.push(Math.floor(Math.random() * 30) + 10);
    offsets.push(Math.floor(Math.random() * 30) + 10);
    offsets.push(Math.floor(Math.random() * 30) + 30);
    offsets.push(Math.floor(Math.random() * 30) + 30);
    // https://stackoverflow.com/a/18650169
    offsets.sort(function () {
      return .5 - Math.random();
    });
    this.offsets = offsets;
  }

  nextframe(frame: Array<Point>, tick: number): boolean {
    this.array.forEach(y => {
      if (tick === this.offsets[y]) {
        let color: Color = Math.random() > 0.5 ? this.color1 : this.color2;
        let shade: number = color.getShade(Math.floor(Math.random() * 6));
        let position: number = Math.floor(Math.random() * this.numLED);
        frame.push({x: position, y: y, c: shade});
      }
    });
    return true;
  }

  tick(timeDiff: number): number {
    if (this.ticker >= 80) {
      this.ticker = 0;
      this.initOffsets();
      return this.ticker;
    }
    this.ticker++;
    return this.ticker;
  }

}

export {Rain};