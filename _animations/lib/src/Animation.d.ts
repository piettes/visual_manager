import { Point } from "./Point";
interface Animation {
    animate: (frame: Array<Point>, theta: number) => void;
    tick: (tick: number) => number;
}
export { Animation };
