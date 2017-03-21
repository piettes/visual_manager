import Animation from "./Animation";

class Effect1 implements Animation {

  animate(frame: any, tick: any): void {
    if (tick < 200) {
      frame.push({x: tick, y: 0, c: 0xff0000});
      frame.push({x: tick, y: 4, c: 0xff0000});
    }

  }

  resetTick(tick: any): number {
    if (tick < 300) {
      return -1;
    }
    return tick;
  }
}

export default Effect1;