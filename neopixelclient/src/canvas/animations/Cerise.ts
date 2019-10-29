import {Animation} from "../Animation";
import {AnimationBase} from "../AnimationBase";

class Cerise extends AnimationBase implements Animation {

  getName(): string {
    return "Cerise";
  }

  nextframe(frame: Array<number>, tick: number): boolean {


    return true;
  }

  tick(timeDiff: number): number {
    return 1;
  }

}

export {Cerise};
