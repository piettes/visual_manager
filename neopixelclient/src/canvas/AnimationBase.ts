import {Point} from "./Point";
import Color from "./Color";
import {Location} from "./Animation";

abstract class AnimationBase {

  static FPS_RATE: number = 60;
  static DEFAULT_BPM: number = 125;

  LED_LINE_ROOF: number = 120;
  LED_LINE_WALL: number = 100;
  protected bpm: number = AnimationBase.DEFAULT_BPM;
  protected location: Location = Location.ROOF;

  protected array: Array<number> = [0, 1, 2, 3, 4];
  protected numLED: number = this.LED_LINE_ROOF;
  protected size: number = 5;

  LED_OFF: number = Color.BLACK.value;

  protected color1: Color = Color.PURPLE;
  protected color2: Color = Color.PURPLE;

  setBpm(bpm: number): void {
    this.bpm = bpm;
  }

  getBpm(): number {
    return this.bpm;
  }

  setColor1(name: string): void {
    this.color1 = Color.fromName(name);
  }

  setColor2(name: string): void {
    this.color2 = Color.fromName(name);
  }

  animate(frame: Array<Point>, timeDiff: number): boolean {
    this.tick(timeDiff);
    return this.nextframe(frame, this.ticker);
  }

  protected ticker: number = 0;

  protected abstract tick(timeDiff: number): void;

  protected abstract nextframe(frame: Array<Point>, tick: number): boolean;

  reset(): void {
    this.ticker = 0;
    this.ticker = 0;
  }

  setLocation(location: Location) {
    this.location = location;
    this.array = location === Location.ROOF ? [0, 1, 2, 3, 4] : [0, 1];
    this.numLED = location === Location.ROOF ? this.LED_LINE_ROOF : this.LED_LINE_WALL;
    this.size = location === Location.ROOF ? 5 : 2;
  }

}

export {AnimationBase};