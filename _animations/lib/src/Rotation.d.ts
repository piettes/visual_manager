import { Animation } from "./Animation";
import { Point } from "./Point";
declare class Rotation implements Animation {
    animate(frame: Array<Point>, theta: number): void;
    axAddPixels(frame: any, x: number, y: number): void;
    tick(tick: number): number;
}
export { Rotation };
