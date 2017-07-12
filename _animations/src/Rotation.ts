import {Animation} from "./Animation";
import {Point} from "./Point";

// TODO Remove that
const L_LED_NUMBER_1 = 120;

class Rotation implements Animation {

  animate(frame: Array<Point>, theta: number): void {
    if (theta === 0 || theta === 180) {
      for (let i = 0; i < L_LED_NUMBER_1; i++) {
        frame.push({x: i * 2, y: 2, c: 0xff0000});
      }
      return;
    }

    let x = Math.round(0.1 / Math.tan(theta / 360 * Math.PI * 2) * 30) + L_LED_NUMBER_1;
    // this.axAddPixels(frame, x, 2);
    // this.axAddPixels(frame, L_LED_NUMBER_1 * 2 - x, 2);

    [0, 1, 2, 3, 4, 5].forEach(y => {
      // x = (y / sin theta) * cos theta = y / tan theta
      let x = Math.round((y - 2.5) / Math.tan(theta / 360 * Math.PI * 2) * 30) + L_LED_NUMBER_1;
      this.axAddPixels(frame, x, y);
    });
  }

  axAddPixels(frame: any, x: number, y: number) {
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

  tick(tick: number): number {
    if (tick === 359) {
      return 0;
    }
    return tick + 1;
  };

}

export {Rotation};