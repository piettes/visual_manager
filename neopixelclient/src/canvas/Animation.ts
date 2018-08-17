import {Location} from "./Setup";

interface Animation {

  getName(): string;

  animate(frame: Array<number>, timeDiff: number): boolean;

  setBpm(bpm: number): void;

  setPatternLength(value: number): void;

  setColor1(name: string): void;

  setColor2(name: string): void;

  setLuminosity(luminosity: number): void;

  reset(): void;

  setLocation(location: Location): void;

}

export {Animation};