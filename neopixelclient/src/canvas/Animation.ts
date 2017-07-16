import {Point} from "./Point";

interface Animation {

  getName(): string;

  animate(frame: Array<Point>): boolean;

  setBpm(bpm: number): void;

  setColor1(colorIndex: number): void;

  setColor2(colorIndex: number): void;

}

export {Animation};