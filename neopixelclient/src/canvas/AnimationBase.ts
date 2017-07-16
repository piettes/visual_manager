import {AnimationFactory} from "./AnimationFactory";
import {Point} from "./Point";

abstract class AnimationBase {

  LED_LINE_ROOF: number = 120;
  LED_LINE_WALL: number = 100;
  bpm: number = 110;

  protected color1: number = AnimationFactory.colors[0];
  protected color2: number = AnimationFactory.colors[0];

  setBpm(bpm: number): void {
    this.bpm = bpm;
  }

  setColor1(colorIndex: number): void {
    this.color1 = AnimationFactory.colors[colorIndex];
  }

  setColor2(colorIndex: number): void {
    this.color2 = AnimationFactory.colors[colorIndex];
  }

  animate(frame: Array<Point>): boolean {
    this.tick();
    return this.nextframe(frame, this.ticker);
  }

  protected ticker: number = 0;

  protected abstract tick(): void;
  protected abstract nextframe(frame: Array<Point>, tick: number): boolean;

}

export {AnimationBase};