import {Point} from "./Point";

interface Animation {

  animate(frame: Array<Point>, tick: number): boolean;

  tick(tick: number): number;

  getName(): string;
}


export {Animation};