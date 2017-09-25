import {Animation} from "../Animation";
import {Point} from "../Point";
import {AnimationBase} from "../AnimationBase";
import Color from "../Color";

class Stars extends AnimationBase implements Animation {

  getName(): string {
    return "Stars";
  }

  limit: number = 30;
  col: Color = Color.RED;
  star1: any = {x: 0, y: 0, c: this.col.shade1};
  star1_1: any = {...this.star1, c: this.col.shade2};
  star1_2: any = {...this.star1_1, c: this.col.shade3};
  star1_3: any = {...this.star1_2, c: this.col.shade4};
  star1_4: any = {...this.star1_3, c: this.col.shade5};

  nextframe(frame: Array<Point>, tick: number): boolean {
    console.log(tick);
    if (tick === 0) {
      this.star1 = {x: 0, y: 0, c: this.col.shade1};
      this.star1_1 = {...this.star1, c: this.col.shade2};
      this.star1_2 = {...this.star1_1, c: this.col.shade3};
      this.star1_3 = {...this.star1_2, c: this.col.shade4};
      this.star1_4 = {...this.star1_3, c: this.col.shade5};
      frame.push({...this.star1});
      return true;
    } else if (tick === 1) {
      this.star1.x++;
      frame.push({...this.star1});
      frame.push({...this.star1_1});
      return true;
    } else if (tick === 2) {
      this.star1.x++;
      this.star1_1.x++;
      frame.push({...this.star1});
      frame.push({...this.star1_1});
      frame.push({...this.star1_2});
      return true;
    } else if (tick === 3) {
      this.star1.x++;
      this.star1_1.x++;
      this.star1_2.x++;
      frame.push({...this.star1});
      frame.push({...this.star1_1});
      frame.push({...this.star1_2});
      frame.push({...this.star1_3});
      return true;
    } else if (tick === 4) {
      this.star1.x++;
      this.star1_1.x++;
      this.star1_2.x++;
      this.star1_3.x++;
      frame.push({...this.star1});
      frame.push({...this.star1_1});
      frame.push({...this.star1_2});
      frame.push({...this.star1_3});
      frame.push({...this.star1_4});
      return true;
    } else if (tick < this.limit) {
      this.star1.x++;
      this.star1_1.x++;
      this.star1_2.x++;
      this.star1_3.x++;
      this.star1_4.x++;
      frame.push({...this.star1});
      frame.push({...this.star1_1});
      frame.push({...this.star1_2});
      frame.push({...this.star1_3});
      frame.push({...this.star1_4});
      return true;
    } else if (tick === this.limit) {
      this.star1_1.x++;
      this.star1_2.x++;
      this.star1_3.x++;
      this.star1_4.x++;
      frame.push({...this.star1_1});
      frame.push({...this.star1_2});
      frame.push({...this.star1_3});
      frame.push({...this.star1_4});
      return true;
    } else if (tick === this.limit + 1) {
      this.star1_2.x++;
      this.star1_3.x++;
      this.star1_4.x++;
      frame.push({...this.star1_2});
      frame.push({...this.star1_3});
      frame.push({...this.star1_4});
      return true;
    } else if (tick === this.limit + 2) {
      this.star1_3.x++;
      this.star1_4.x++;
      frame.push({...this.star1_3});
      frame.push({...this.star1_4});
      return true;
    } else if (tick === this.limit + 3) {
      this.star1_4.x++;
      frame.push({...this.star1_4});
      return true;
    } else if (tick === this.limit + 4) {
      return true;
    }
    return false;
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