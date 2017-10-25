import {Animation, Location} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class Fire extends AnimationBase implements Animation {

  getName(): string {
    return "Fire";
  }

  nextframe(frame: Array<Point>, tick: number): boolean {
    this.array.forEach(y => {
      for (let i = 0; i < 4 * this.patternLength; i++) {
        frame.push({x: i , y: y, c: this.color1.value});
      }
      for (let i = 0; i < 7; i++) {
        frame.push({x: 4 * this.patternLength + i , y: y, c: this.color2.getShade(i)});
      }
    });
    return true;
  }

  tick(timeDiff: number): number {
    if (this.ticker === 50) {
      this.ticker = 0;
    }
    return this.ticker;
  }

}

export {Fire};