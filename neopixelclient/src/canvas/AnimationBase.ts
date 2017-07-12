
abstract class AnimationBase {

  LED_LINE_ROOF: number = 120;
  LED_LINE_WALL: number = 100;
  bpm: number = 110;

  setBpm(bpm: number): void {
    this.bpm = bpm;
  }

}

export {AnimationBase};