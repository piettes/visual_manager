import "jest";
import {Effect1} from "../../neopixelclient/src/canvas/animations/Effect1";
import {Random} from "../../neopixelclient/src/canvas/animations/Random";
import {Animation} from "../../neopixelclient/src/canvas/Animation";
import {Point} from "../../neopixelclient/src/canvas/Point";

describe("Anim test", () => {

  [new Effect1(), new Random()].forEach((anim: Animation) => {

    it("test x values for anim " + anim.getName(), () => {

      for (let i = 0; i < 500; i++) {
        let array: Array<Point> = [];
        anim.animate(array);
        array.forEach((p: Point) => {
          // if (p.y === 0 || p.y === 5) {
          expect(p.x).toBeGreaterThan(-1);
          // } else {
          //   expect(p.x).toBeGreaterThan(119);
          // }
          expect(p.x).toBeLessThanOrEqual(340);
        });
      }

    });

  });

});