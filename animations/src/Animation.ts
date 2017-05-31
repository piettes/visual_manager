import {Point} from "./Point";

export interface Animation {

  animate: (frame: Array<Point>, theta: number) => void;

  resetTick: (tick: number) => number;

  tick: (tick: number) => number;
}
