import Animation from "./Animation";

class Effect1 extends Animation {

  animate(frame, tick) {
    if (tick < 200) {
      frame.push({x: tick, y: 0, c: 0xff0000});
      frame.push({x: tick, y: 4, c: 0xff0000});
    }

  }

  resetTick(tick) {
    if (tick < 300) {
      return -1;
    }
    return tick;
  }
}

export default Effect1;