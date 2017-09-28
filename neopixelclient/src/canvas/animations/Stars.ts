import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";

class Stars extends AnimationBase implements Animation {

  limit: number = 30;
  stars: Array<any> = [];
  offsets: Array<any> = [];

  constructor() {
    super();
    this.stars.push(this.initStar(0));
    this.stars.push(this.initStar(1));
    this.stars.push(this.initStar(2));
    this.stars.push(this.initStar(3));
    this.stars.push(this.initStar(4));
    this.offsets.push(Math.floor(Math.random() * 100));
    this.offsets.push(Math.floor(Math.random() * 100));
    this.offsets.push(Math.floor(Math.random() * 100));
    this.offsets.push(Math.floor(Math.random() * 100));
    this.offsets.push(Math.floor(Math.random() * 100));
  }

  getName(): string {
    return "Stars";
  }

  initStar(y: number) {
    let x = Math.floor(Math.random() * (120 - this.limit));
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
    if (tick - this.offsets[0] >= 0) {
      res = this.displayStar(0, tick - this.offsets[0], frame) || res;
    }
    if (tick - this.offsets[1] >= 0) {
      res = this.displayStar(1, tick - this.offsets[1], frame) || res;
    }
    if (tick - this.offsets[2] >= 0) {
      res = this.displayStar(2, tick - this.offsets[2], frame) || res;
    }
    if (tick - this.offsets[3] >= 0) {
      res = this.displayStar(3, tick - this.offsets[3], frame) || res;
    }
    if (tick - this.offsets[4] >= 0) {
      res = this.displayStar(4, tick - this.offsets[4], frame) || res;
    }
    return res;
  }

  // 340
  tick(): void {
    if (this.ticker >= 80) {
      this.ticker = 0;
      return;
    }
    this.ticker++;
  }

}

export {Stars};