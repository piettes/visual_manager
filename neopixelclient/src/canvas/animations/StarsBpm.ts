import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class StarsBpm extends AnimationBase implements Animation {

  limit: number = 15;
  stars: Array<any> = [];

  constructor() {
    super();
    [0, 1, 2, 3, 4].forEach(i => this.stars.push(this.initStar(0)));
  }

  getName(): string {
    return "StarsBpm";
  }

  initStar(y: number) {
    let x = Math.floor(Math.random() * (this.numLED - this.limit));
    let star = {star_1: {}, star_2: {}, star_3: {}, star_4: {}, star_5: {}};
    star.star_1 = {x: x, y: y, c: this.color1.shade1};
    star.star_2 = {x: x, y: y, c: this.color1.shade2};
    star.star_3 = {x: x, y: y, c: this.color1.shade3};
    star.star_4 = {x: x, y: y, c: this.color1.shade4};
    star.star_5 = {x: x, y: y, c: this.color1.shade5};
    return star;
  }


  displayStar(starIndex: number, tick: number, frame: Array<Point>): boolean {
    if (tick === 0) {
      this.stars[starIndex] = this.initStar(starIndex);
      frame.push({...this.stars[starIndex].star_1});
      return true;
    } else if (tick === 1) {
      this.stars[starIndex].star_1.x++;
      frame.push({...this.stars[starIndex].star_1});
      frame.push({...this.stars[starIndex].star_2});
      return true;
    } else if (tick === 2) {
      this.stars[starIndex].star_1.x++;
      this.stars[starIndex].star_2.x++;
      frame.push({...this.stars[starIndex].star_1});
      frame.push({...this.stars[starIndex].star_2});
      frame.push({...this.stars[starIndex].star_3});
      return true;
    } else if (tick === 3) {
      this.stars[starIndex].star_1.x++;
      this.stars[starIndex].star_2.x++;
      this.stars[starIndex].star_3.x++;
      frame.push({...this.stars[starIndex].star_1});
      frame.push({...this.stars[starIndex].star_2});
      frame.push({...this.stars[starIndex].star_3});
      frame.push({...this.stars[starIndex].star_4});
      return true;
    } else if (tick === 4) {
      this.stars[starIndex].star_1.x++;
      this.stars[starIndex].star_2.x++;
      this.stars[starIndex].star_3.x++;
      this.stars[starIndex].star_4.x++;
      frame.push({...this.stars[starIndex].star_1});
      frame.push({...this.stars[starIndex].star_2});
      frame.push({...this.stars[starIndex].star_3});
      frame.push({...this.stars[starIndex].star_4});
      frame.push({...this.stars[starIndex].star_5});
      return true;
    } else if (tick < this.limit) {
      this.stars[starIndex].star_1.x++;
      this.stars[starIndex].star_2.x++;
      this.stars[starIndex].star_3.x++;
      this.stars[starIndex].star_4.x++;
      this.stars[starIndex].star_5.x++;
      frame.push({...this.stars[starIndex].star_1});
      frame.push({...this.stars[starIndex].star_2});
      frame.push({...this.stars[starIndex].star_3});
      frame.push({...this.stars[starIndex].star_4});
      frame.push({...this.stars[starIndex].star_5});
      return true;
    } else if (tick === this.limit - 4) {
      this.stars[starIndex].star_2.x++;
      this.stars[starIndex].star_3.x++;
      this.stars[starIndex].star_4.x++;
      this.stars[starIndex].star_5.x++;
      frame.push({...this.stars[starIndex].star_2});
      frame.push({...this.stars[starIndex].star_3});
      frame.push({...this.stars[starIndex].star_4});
      frame.push({...this.stars[starIndex].star_5});
      return true;
    } else if (tick === this.limit - 3) {
      this.stars[starIndex].star_3.x++;
      this.stars[starIndex].star_4.x++;
      this.stars[starIndex].star_5.x++;
      frame.push({...this.stars[starIndex].star_3});
      frame.push({...this.stars[starIndex].star_4});
      frame.push({...this.stars[starIndex].star_5});
      return true;
    } else if (tick === this.limit - 2) {
      this.stars[starIndex].star_4.x++;
      this.stars[starIndex].star_5.x++;
      frame.push({...this.stars[starIndex].star_4});
      frame.push({...this.stars[starIndex].star_5});
      return true;
    } else if (tick === this.limit - 1) {
      this.stars[starIndex].star_5.x++;
      frame.push({...this.stars[starIndex].star_5});
      return true;
    } else if (tick === this.limit) {
      return true;
    }
    return false;
  }

  nextframe(frame: Array<Point>, tick: number): boolean {
    let res = false;
    this.array.forEach(i => {
      res = this.displayStar(i, tick, frame) || res;
    });
    return res;
  }

  tick(timeDiff: number): number {
    if (this.timeAcc === -1) {
      this.timeAcc = timeDiff;
      return 0;
    }
    this.timeAcc += timeDiff;
    if (this.timeAcc > this.animDuration) {
      this.timeAcc -= this.animDuration;
      return 0;
    }
    let caca =  Math.floor(this.animDuration * this.limit / this.timeAcc);
    console.log("this.animDuration", this.animDuration);
    console.log("this.timeAcc", this.timeAcc);
    return caca;
    //
    // if (this.ticker >= 60 * AnimationBase.FPS_RATE / this.bpm) {
    //   this.ticker = 0;
    //   return this.ticker;
    // }
    // this.ticker++;
    // return this.ticker;
  }

}

export {StarsBpm};