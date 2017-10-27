import {Point} from "./Point";

interface Animation {

  getName(): string;

  animate(frame: Array<Point>, timeDiff: number): boolean;

  setBpm(bpm: number): void;

  setPatternLength(value: number): void;

  setColor1(name: string): void;

  setColor2(name: string): void;

  setLuminosity(luminosity: number): void;

  reset(): void;

  setLocation(location: Location): void;

}

enum Location {
  WALL,
  ROOF
}


export {Animation, Location};