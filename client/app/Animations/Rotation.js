import Animation from "./Animation";

// TODO Remove that
const L_LED_NUMBER_1 = 120;

class Rotation extends Animation {

  animate(frame, theta) {
    if (theta === 0 || theta === 180) {
      for (let i = 0; i < L_LED_NUMBER_1; i++) {
        frame.push({x: i * 2, y: 2, c: 0xff0000});
      }
      return;
    }

    let x = Math.round(0.1 / Math.tan(theta / 360 * Math.PI * 2) * 30) + L_LED_NUMBER_1;
    this.axAddPixels(frame, x, 2);
    this.axAddPixels(frame, L_LED_NUMBER_1 * 2 - x, 2);

    [0, 1, 3, 4].forEach(y => {
      // x = (y / sin theta) * cos theta = y / tan theta
      let x = Math.round((y - 2) / Math.tan(theta / 360 * Math.PI * 2) * 30) + L_LED_NUMBER_1;
      this.axAddPixels(frame, x, y);
    });
  }

  axAddPixels(frame, x, y) {
    frame.push({x: x, y: y, c: 0xff0000});
    frame.push({x: x - 1, y: y, c: 0xff0000});
    frame.push({x: x + 1, y: y, c: 0xff0000});
    frame.push({x: x + 2, y: y, c: 0xff0000});
    frame.push({x: x - 2, y: y, c: 0xff0000});
    frame.push({x: x + 3, y: y, c: 0x00ff00});
    frame.push({x: x - 3, y: y, c: 0x00ff00});
    frame.push({x: x + 4, y: y, c: 0x00ff00});
    frame.push({x: x - 4, y: y, c: 0x00ff00});
    frame.push({x: x + 5, y: y, c: 0x00ff00});
    frame.push({x: x - 5, y: y, c: 0x00ff00});
    frame.push({x: x + 6, y: y, c: 0x00ff00});
    frame.push({x: x - 6, y: y, c: 0x00ff00});
  }

  resetTick(tick) {
    if (tick >= 360) {
      return -1;
    }
    return tick;
  }

}

export default Rotation;