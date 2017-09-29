import {Point} from "./Point";
import Color from "./Color";

abstract class AnimationBase {

  static FPS_RATE: number = 60;
  static DEFAULT_BPM: number = 125;

  LED_LINE_ROOF: number = 120;
  LED_LINE_WALL: number = 100;
  protected bpm: number = AnimationBase.DEFAULT_BPM;

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

  animate(frame: Array<Point>): boolean {
    this.tick();
    return this.nextframe(frame, this.ticker);
  }

  protected ticker: number = 0;

  protected abstract tick(): void;

  protected abstract nextframe(frame: Array<Point>, tick: number): boolean;

  reset(): void {
    this.ticker = 0;
  }

}

export {AnimationBase};