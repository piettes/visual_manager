import {Animation} from "./Animation";
import {Point} from "./Point";

export class Effect1 implements Animation {

  animate(frame: Array<Point>, tick: number): void {
    if (tick < 100) {
      [0, 5].forEach(y => frame.push({x: tick, y: y, c: 0xff0000}));
    } else {
      [0, 1, 2, 3, 4, 5].forEach(y => frame.push({x: tick, y: y, c: 0xff0000}));
    }
  }

  tick(tick: number): number {
    if (tick === 339) {
      return 0;
    }
    return tick + 1;
  }

}