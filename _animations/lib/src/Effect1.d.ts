import { Animation } from "./Animation";
import { Point } from "./Point";
declare class Effect1 implements Animation {
    color: number;
    animate(frame: Array<Point>, tick: number): void;
    tick(tick: number): number;
}
export { Effect1 };
