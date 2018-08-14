import Color from "./Color";
import {Location, getNumLed, DEFAULT_BPM} from "./Setup";

abstract class AnimationBase {

  protected bpm: number = DEFAULT_BPM;
  protected patternLength: number = 1;
  protected animDuration: number = 60 * 1000 * this.patternLength / DEFAULT_BPM;
  protected location: Location = Location.CENTRAL_1;

  protected numLED: number = getNumLed(Location.CENTRAL_1);

  LED_OFF: number = Color.BLACK.value;

  protected color1: Color = Color.PURPLE;
  protected color2: Color = Color.PURPLE;
  protected luminosity: number = 0;

  setBpm(bpm: number): void {
    this.bpm = bpm;
    this.fixAnimDuration();
  }

  private fixAnimDuration(): void {
    this.animDuration = 60 * 1000 * this.patternLength / this.bpm;
  }

  setPatternLength(value: number): void {
    this.patternLength = value;
    this.fixAnimDuration();
  }

  setColor1(name: string): void {
    this.color1 = Color.fromName(name);
  }

  setColor2(name: string): void {
    this.color2 = Color.fromName(name);
  }

  protected getShade1(): number {
    return this.color1.getShade(this.luminosity);
  }

  protected getShade2(): number {
    return this.color2.getShade(this.luminosity);
  }

  setLuminosity(luminosity: number): void {
    this.luminosity = luminosity;
  }

  animate(frame: Array<number>, timeDiff: number): boolean {
    return this.nextframe(frame, this.tick(timeDiff));
  }

  protected ticker: number = 0;
  protected timeAcc: number = -1;

  protected abstract tick(timeDiff: number): number;

  protected abstract nextframe(frame: Array<number>, tick: number): boolean;

  reset(): void {
    this.ticker = 0;
    this.timeAcc = -1;
  }

  setLocation(location: Location) {
    this.location = location;
    this.numLED = getNumLed(location);
  }

}

export {AnimationBase};