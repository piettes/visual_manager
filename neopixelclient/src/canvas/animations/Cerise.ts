import {Animation} from "../Animation";
import {AnimationBase} from "../AnimationBase";
import Color from "../Color";

class Cerise extends AnimationBase implements Animation {

  getName(): string {
    return "Cerise";
  }

  nextframe(frame: Array<number>, tick: number): boolean {

    if (tick === 1) {
      frame[0] = Color.RED.value;
      frame[1] = Color.RED.value;
      frame[2] = Color.DEEP_PINK.value;
      frame[3] = Color.RED.value;
      frame[4] = Color.RED.value;
      frame[5] = Color.CYAN.value;
      frame[6] = 0x1256f9;
      frame[7] = Color.DODGER_BLUE.value;
    }
    if (tick === 2) {

      for (let i = 1; i < 4; i++) {
        frame[10 * i] = Color.RED.value;
        frame[10 * i + 1] = Color.RED.value;
        frame[10 * i + 2] = Color.DEEP_PINK.value;
        frame[10 * i + 3] = Color.RED.value;
        frame[10 * i + 4] = Color.RED.value;
        frame[10 * i + 5] = Color.CYAN.value;
        frame[10 * i + 6] = 0x1256f9;
        frame[10 * i + 7] = Color.DODGER_BLUE.value;
      }
    }


    return true;
  }

  tick(timeDiff: number): number {
    this.timeAcc += timeDiff;

    let vanille = 1;

    if (this.timeAcc > 500) {
      vanille = 2;
    }

    if ( this.timeAcc > 1000) {
      this.timeAcc = 0;
    }

    return vanille;
  }



}

export {Cerise};
