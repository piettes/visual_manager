import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";
import Color from "../Color";

class Stars extends AnimationBase implements Animation {

  limit: number = 30;
  col: Color = Color.PURPLE;
  stars: Array<any> = [];

  constructor() {
    super();
    this.stars.push(this.initStar(0));
    this.stars.push(this.initStar(1));
    this.stars.push(this.initStar(2));
    this.stars.push(this.initStar(3));
    this.stars.push(this.initStar(4));
  }

  getName(): string {
    return "Stars";
  }

  initStar(y: number) {
    let x = Math.floor(Math.random() * (120 - this.limit));
    let star = {star_1: {}, star_2: {}, star_3: {}, star_4: {}, star_5: {}};
    star.star_1 = {x: x, y: y, c: this.col.shade1};
    star.star_2 = {x: x, y: y, c: this.col.shade2};
    star.star_3 = {x: x, y: y, c: this.col.shade3};
    star.star_4 = {x: x, y: y, c: this.col.shade4};
    star.star_5 = {x: x, y: y, c: this.col.shade5};
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
    this.displayStar(0, tick, frame)
    this.displayStar(1, tick, frame)
    this.displayStar(2, tick, frame)
    this.displayStar(3, tick, frame)
    return this.displayStar(4, tick, frame);
  }

  // 340
  tick(): void {
    if (this.ticker >= 50) {
      this.ticker = 0;
      return;
    }
    this.ticker++;
  }

}

export {Stars};