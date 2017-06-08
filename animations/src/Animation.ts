import {Point} from "./Point";

export interface Animation {

  animate: (frame: Array<Point>, theta: number) => void;

  tick: (tick: number) => number;
}
