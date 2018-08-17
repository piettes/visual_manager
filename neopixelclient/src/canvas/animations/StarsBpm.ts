import {Animation} from "../Animation";
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
    // console.log("init star")
    let x = Math.floor(this.random() * (this.numLED - this.limit * this.patternLength));
    let star = {star_1: {}, star_2: {}, star_3: {}, star_4: {}, star_5: {}};
    star.star_1 = {x: x, c: this.color1.getShade(1 + this.luminosity)};
    star.star_2 = {x: x, c: this.color1.getShade(2 + this.luminosity)};
    star.star_3 = {x: x, c: this.color1.getShade(3 + this.luminosity)};
    star.star_4 = {x: x, c: this.color1.getShade(4 + this.luminosity)};
    star.star_5 = {x: x, c: this.color1.getShade(5 + this.luminosity)};
    return star;
  }

  displayStar(tick: number, frame: Array<number>): boolean {
    if (tick === 0) {
      this.star = this.initStar();
      frame[this.star.star_1.x] = this.star.star_1.c;

    } else if (tick === 1) {
      this.star.star_1.x++;
      frame[this.star.star_1.x] = this.star.star_1.c;
      frame[this.star.star_2.x] = this.star.star_2.c;

    } else if (tick === 2) {
      this.star.star_1.x++;
      this.star.star_2.x++;
      frame[this.star.star_1.x] = this.star.star_1.c;
      frame[this.star.star_2.x] = this.star.star_2.c;
      frame[this.star.star_3.x] = this.star.star_3.c;

    } else if (tick === 3) {
      this.star.star_1.x++;
      this.star.star_2.x++;
      this.star.star_3.x++;
      frame[this.star.star_1.x] = this.star.star_1.c;
      frame[this.star.star_2.x] = this.star.star_2.c;
      frame[this.star.star_3.x] = this.star.star_3.c;
      frame[this.star.star_4.x] = this.star.star_4.c;

    } else if (tick === 4) {
      this.star.star_1.x++;
      this.star.star_2.x++;
      this.star.star_3.x++;
      this.star.star_4.x++;
      frame[this.star.star_1.x] = this.star.star_1.c;
      frame[this.star.star_2.x] = this.star.star_2.c;
      frame[this.star.star_3.x] = this.star.star_3.c;
      frame[this.star.star_4.x] = this.star.star_4.c;
      frame[this.star.star_5.x] = this.star.star_5.c;

    } else if (tick < this.limit * this.patternLength) {
      this.star.star_1.x++;
      this.star.star_2.x++;
      this.star.star_3.x++;
      this.star.star_4.x++;
      this.star.star_5.x++;
      frame[this.star.star_1.x] = this.star.star_1.c;
      frame[this.star.star_2.x] = this.star.star_2.c;
      frame[this.star.star_3.x] = this.star.star_3.c;
      frame[this.star.star_4.x] = this.star.star_4.c;
      frame[this.star.star_5.x] = this.star.star_5.c;

    } else if (tick === this.limit * this.patternLength - 4) {
      this.star.star_2.x++;
      this.star.star_3.x++;
      this.star.star_4.x++;
      this.star.star_5.x++;
      frame[this.star.star_2.x] = this.star.star_2.c;
      frame[this.star.star_3.x] = this.star.star_3.c;
      frame[this.star.star_4.x] = this.star.star_4.c;
      frame[this.star.star_5.x] = this.star.star_5.c;

    } else if (tick === this.limit * this.patternLength - 3) {
      this.star.star_3.x++;
      this.star.star_4.x++;
      this.star.star_5.x++;
      frame[this.star.star_3.x] = this.star.star_3.c;
      frame[this.star.star_4.x] = this.star.star_4.c;
      frame[this.star.star_5.x] = this.star.star_5.c;

    } else if (tick === this.limit * this.patternLength - 2) {
      this.star.star_4.x++;
      this.star.star_5.x++;
      frame[this.star.star_4.x] = this.star.star_4.c;
      frame[this.star.star_5.x] = this.star.star_5.c;
    } else if (tick === this.limit * this.patternLength - 1) {
      this.star.star_5.x++;
      frame[this.star.star_5.x] = this.star.star_5.c;
    }
    if (this.star.star_5.x >= 100) {
      console.log("cest la guere1");
    }
    if (this.star.star_5.x < 0) {
      console.log("cest la guere");
    }
    if (this.star.star_1.x >= 100) {
      console.log("cest la guere2");
    }
    if (this.star.star_1.x < 0) {
      console.log("cest la guere3");
    }
    return true;
  }

  nextframe(frame: Array<number>, tick: number): boolean {
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