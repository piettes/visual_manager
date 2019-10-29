import {Animation} from "../Animation";
import {AnimationBase} from "../AnimationBase";
import Color from "../Color";

class Cerise extends AnimationBase implements Animation {

  getName(): string {
    return "Cerise";
  }

  nextframe(frame: Array<number>, tick: number): boolean {


    frame[0] = Color.BLUE.value;

    return true;
  }

  tick(timeDiff: number): number {
    return 1;
  }

}

export {Cerise};
