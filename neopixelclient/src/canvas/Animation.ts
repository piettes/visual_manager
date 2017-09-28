import {Point} from "./Point";

interface Animation {

  getName(): string;

  animate(frame: Array<Point>): boolean;

  setBpm(bpm: number): void;

  getBpm(): number;

  setColor1(name: string): void;

  setColor2(name: string): void;

  reset(): void;

}

export {Animation};