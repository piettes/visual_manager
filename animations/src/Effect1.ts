import {Animation} from "./Animation";
import {Point} from "./Point";

export class Effect1 implements Animation {

  animate(frame: Array<Point>, tick: number): void {
    if (tick < 100) {
      [0, 5].forEach(y => frame.push({x: 340 - tick, y: y, c: 0xff0000}));
      frame.push({x: 340 - tick, y: 4, c: 0xff0000});
    } else if (tick < 340 + 1) {
      [0, 1, 2, 3, 4, 5].forEach(y => frame.push({x: 340 - tick, y: y, c: 0xff0000}));
    }

  }

  tick(tick: number): number {
    return tick + 2;
  }

  resetTick(tick: number): number {
    if (tick > 340) {
      return 0;
    }
    return tick;
  }
}