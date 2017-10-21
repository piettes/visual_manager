import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class StarsBpm extends AnimationBase implements Animation {

  limit: number = 10;
  stars: Array<any> = [];
  // offsets: Array<any> = [];

  constructor() {
    super();
    this.stars.push(this.initStar(0));
    this.stars.push(this.initStar(1));
    this.stars.push(this.initStar(2));
    this.stars.push(this.initStar(3));
    this.stars.push(this.initStar(4));
    // this.initOffsets();
  }

  getName(): string {
    return "StarsBpm";
  }

  // initOffsets() {
  //   let offsets = [];
  //   offsets.push(0);
  //   offsets.push(0);
  //   offsets.push(0);
  //   offsets.push(0);
  //   offsets.push(0);
  //   // https://stackoverflow.com/a/18650169
  //   offsets.sort(function() {
  //     return .5 - Math.random();
  //   });
  //   this.offsets = offsets;
  // }

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
    } else if (tick === this.limit) {
      this.stars[starIndex].star_2.x++;
      this.stars[starIndex].star_3.x++;
      this.stars[starIndex].star_4.x++;
      this.stars[starIndex].star_5.x++;
      frame.push({...this.stars[starIndex].star_2});
      frame.push({...this.stars[starIndex].star_3});
      frame.push({...this.stars[starIndex].star_4});
      frame.push({...this.stars[starIndex].star_5});
      return true;
    } else if (tick === this.limit + 1) {
      this.stars[starIndex].star_3.x++;
      this.stars[starIndex].star_4.x++;
      this.stars[starIndex].star_5.x++;
      frame.push({...this.stars[starIndex].star_3});
      frame.push({...this.stars[starIndex].star_4});
      frame.push({...this.stars[starIndex].star_5});
      return true;
    } else if (tick === this.limit + 2) {
      this.stars[starIndex].star_4.x++;
      this.stars[starIndex].star_5.x++;
      frame.push({...this.stars[starIndex].star_4});
      frame.push({...this.stars[starIndex].star_5});
      return true;
    } else if (tick === this.limit + 3) {
      this.stars[starIndex].star_5.x++;
      frame.push({...this.stars[starIndex].star_5});
      return true;
    } else if (tick === this.limit + 4) {
      return true;
    }
    return false;
  }

  nextframe(frame: Array<Point>, tick: number): boolean {
    let res = false;
    this.array.forEach(i => {
      // if (tick - this.offsets[i] >= 0) {
        res = this.displayStar(i, tick , frame) || res;
      // }
    });
    return res;
  }

  tick(timeDiff: number): number {
    if (this.ticker >= 60 * AnimationBase.FPS_RATE / this.bpm) {
      this.ticker = 0;
      // this.initOffsets();
      return this.ticker;
    }
    this.ticker++;
    return this.ticker;
  }

}

export {StarsBpm};