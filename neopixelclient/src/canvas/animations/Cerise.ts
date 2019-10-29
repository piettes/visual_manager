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
      frame[0] = Color.PURPLE.value;
      frame[20] = Color.DODGER_BLUE.value;
      frame[21] = Color.GREEN.value;
      frame[22] = Color.CHARTREUSE.value;
      frame[23] = Color.ORANGE.value;
      frame[24] = 0x3edde6;
      frame[30] = 0x3edde6;
      frame[31] = 0x3edde6;
      frame[32] = 0x3edde6;
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
