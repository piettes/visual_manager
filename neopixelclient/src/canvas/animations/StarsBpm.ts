import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class StarsBpm extends AnimationBase implements Animation {

  limit: number = 15;
  star: any = {};

  constructor() {
    super();
    this.star = this.initStar();
  }

  getName(): string {
    return "StarsBpm";
  }

  initStar() {
    let x = Math.floor(Math.random() * (this.numLED - this.limit * this.patternLength));
    let star = {star_1: {}, star_2: {}, star_3: {}, star_4: {}, star_5: {}};
    star.star_1 = {x: x, c: this.color1.getShade(1 + this.luminosity)};
    star.star_2 = {x: x, c: this.color1.getShade(2 + this.luminosity)};
    star.star_3 = {x: x, c: this.color1.getShade(3 + this.luminosity)};
    star.star_4 = {x: x, c: this.color1.getShade(4 + this.luminosity)};
    star.star_5 = {x: x, c: this.color1.getShade(5 + this.luminosity)};
    return star;
  }


  displayStar(tick: number, frame: Array<Point>): boolean {
    if (tick === 0) {
      this.star = this.initStar();
      frame.push({...this.star.star_1});
      return true;
    } else if (tick === 1) {
      this.star.star_1.x++;
      frame.push({...this.star.star_1});
      frame.push({...this.star.star_2});
      return true;
    } else if (tick === 2) {
      this.star.star_1.x++;
      this.star.star_2.x++;
      frame.push({...this.star.star_1});
      frame.push({...this.star.star_2});
      frame.push({...this.star.star_3});
      return true;
    } else if (tick === 3) {
      this.star.star_1.x++;
      this.star.star_2.x++;
      this.star.star_3.x++;
      frame.push({...this.star.star_1});
      frame.push({...this.star.star_2});
      frame.push({...this.star.star_3});
      frame.push({...this.star.star_4});
      return true;
    } else if (tick === 4) {
      this.star.star_1.x++;
      this.star.star_2.x++;
      this.star.star_3.x++;
      this.star.star_4.x++;
      frame.push({...this.star.star_1});
      frame.push({...this.star.star_2});
      frame.push({...this.star.star_3});
      frame.push({...this.star.star_4});
      frame.push({...this.star.star_5});
      return true;
    } else if (tick < this.limit * this.patternLength) {
      this.star.star_1.x++;
      this.star.star_2.x++;
      this.star.star_3.x++;
      this.star.star_4.x++;
      this.star.star_5.x++;
      frame.push({...this.star.star_1});
      frame.push({...this.star.star_2});
      frame.push({...this.star.star_3});
      frame.push({...this.star.star_4});
      frame.push({...this.star.star_5});
      return true;
    } else if (tick === this.limit * this.patternLength - 4) {
      this.star.star_2.x++;
      this.star.star_3.x++;
      this.star.star_4.x++;
      this.star.star_5.x++;
      frame.push({...this.star.star_2});
      frame.push({...this.star.star_3});
      frame.push({...this.star.star_4});
      frame.push({...this.star.star_5});
      return true;
    } else if (tick === this.limit * this.patternLength - 3) {
      this.star.star_3.x++;
      this.star.star_4.x++;
      this.star.star_5.x++;
      frame.push({...this.star.star_3});
      frame.push({...this.star.star_4});
      frame.push({...this.star.star_5});
      return true;
    } else if (tick === this.limit * this.patternLength - 2) {
      this.star.star_4.x++;
      this.star.star_5.x++;
      frame.push({...this.star.star_4});
      frame.push({...this.star.star_5});
      return true;
    } else if (tick === this.limit * this.patternLength - 1) {
      this.star.star_5.x++;
      frame.push({...this.star.star_5});
      return true;
    } else if (tick === this.limit * this.patternLength) {
      return true;
    }
    return false;
  }

  nextframe(frame: Array<Point>, tick: number): boolean {
    let res = false;
    res = this.displayStar(tick, frame) || res;
    return res;
  }

  tick(timeDiff: number): number {
    if (this.timeAcc === -1) {
      this.timeAcc = timeDiff;
      return 0;
    }
    this.timeAcc += timeDiff;
    if (this.timeAcc >= this.animDuration) {
      this.timeAcc -= this.animDuration;
      return 0;
    }
    return Math.floor(this.timeAcc / this.animDuration * this.limit) + 1;
  }

}

export {StarsBpm};