import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class Stars extends AnimationBase implements Animation {

  limit: number = 35;
  star: any = {};
  offset: number = 0;

  constructor() {
    super();
    this.star  = this.initStar();
    this.initOffsets();
  }

  getName(): string {
    return "Stars";
  }

  initOffsets() {
    this.offset = Math.floor(Math.random() * 30) + 10;
  }

  initStar() {
    let inc = Math.random() < 0.5 ? -1 : 1;
    let x;
    if (inc === 1) {
      x = Math.floor(Math.random() * (this.numLED - this.limit));
    } else {
      x = Math.floor(Math.random() * (this.numLED - this.limit) + this.limit);
    }
    let star = {star_1: {}, star_2: {}, star_3: {}, star_4: {}, star_5: {}, inc: inc};
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
    } else if (tick === 1) {
      this.star.star_1.x += this.star.inc;
      frame.push({...this.star.star_1});
      frame.push({...this.star.star_2});
    } else if (tick === 2) {
      this.star.star_1.x += this.star.inc;
      this.star.star_2.x += this.star.inc;
      frame.push({...this.star.star_1});
      frame.push({...this.star.star_2});
      frame.push({...this.star.star_3});
    } else if (tick === 3) {
      this.star.star_1.x += this.star.inc;
      this.star.star_2.x += this.star.inc;
      this.star.star_3.x += this.star.inc;
      frame.push({...this.star.star_1});
      frame.push({...this.star.star_2});
      frame.push({...this.star.star_3});
      frame.push({...this.star.star_4});
    } else if (tick === 4) {
      this.star.star_1.x += this.star.inc;
      this.star.star_2.x += this.star.inc;
      this.star.star_3.x += this.star.inc;
      this.star.star_4.x += this.star.inc;
      frame.push({...this.star.star_1});
      frame.push({...this.star.star_2});
      frame.push({...this.star.star_3});
      frame.push({...this.star.star_4});
      frame.push({...this.star.star_5});
    } else if (tick < this.limit) {
      this.star.star_1.x += this.star.inc;
      this.star.star_2.x += this.star.inc;
      this.star.star_3.x += this.star.inc;
      this.star.star_4.x += this.star.inc;
      this.star.star_5.x += this.star.inc;
      frame.push({...this.star.star_1});
      frame.push({...this.star.star_2});
      frame.push({...this.star.star_3});
      frame.push({...this.star.star_4});
      frame.push({...this.star.star_5});
    } else if (tick === this.limit) {
      this.star.star_2.x += this.star.inc;
      this.star.star_3.x += this.star.inc;
      this.star.star_4.x += this.star.inc;
      this.star.star_5.x += this.star.inc;
      frame.push({...this.star.star_2});
      frame.push({...this.star.star_3});
      frame.push({...this.star.star_4});
      frame.push({...this.star.star_5});
    } else if (tick === this.limit + 1) {
      this.star.star_3.x += this.star.inc;
      this.star.star_4.x += this.star.inc;
      this.star.star_5.x += this.star.inc;
      frame.push({...this.star.star_3});
      frame.push({...this.star.star_4});
      frame.push({...this.star.star_5});
    } else if (tick === this.limit + 2) {
      this.star.star_4.x += this.star.inc;
      this.star.star_5.x += this.star.inc;
      frame.push({...this.star.star_4});
      frame.push({...this.star.star_5});
    } else if (tick === this.limit + 3) {
      this.star.star_5.x += this.star.inc;
      frame.push({...this.star.star_5});
    }
    return true;
  }

  nextframe(frame: Array<Point>, tick: number): boolean {
    let res = false;
    if (tick - this.offset >= 0) {
      res = this.displayStar(tick - this.offset, frame) || res;
    }
    return res;
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

export {Stars};