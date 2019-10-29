import {Animation} from "../Animation";
import {AnimationBase} from "../AnimationBase";
import Color from "../Color";

class Cerise extends AnimationBase implements Animation {

  getName(): string {
    return "Cerise";
  }

  nextframe(frame: Array<number>, tick: number): boolean {

    frame[0] = Color.RED.value;
    frame[1] = Color.RED.value;
    frame[2] = Color.DEEP_PINK.value;
    frame[3] = Color.RED.value;
    frame[4] = Color.RED.value;
    frame[5] = Color.CYAN.value;
    frame[6] = 0x1256f9;
    frame[7] = Color.DODGER_BLUE.value;

    return true;
  }

  tick(timeDiff: number): number {
    console.log(timeDiff)
    return 1;
  }

}

export {Cerise};
