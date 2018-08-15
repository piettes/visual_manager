import {Animation} from "./Animation";
import {Point} from "./Point";
import {AnimationFactory} from "./AnimationFactory";
import Color from "./Color";
import {
  LED_OFF, Location, NUM_LED_BIG_BALL_1, NUM_LED_BIG_BALL_2, NUM_LED_BIG_BALL_3, NUM_LED_CENTRAL_1, NUM_LED_CENTRAL_2,
  NUM_LED_CONE, NUM_LED_MEDIUM_BALL_1, NUM_LED_MEDIUM_BALL_2, NUM_LED_MEDIUM_BALL_3, NUM_LED_SMALL_BALL_1,
  NUM_LED_SMALL_BALL_2, NUM_LED_SMALL_BALL_3, SECONDARY_NUM_LED
} from "./Setup";

abstract class Canvas {

  private manualMode: boolean;
  private animation1: Animation = AnimationFactory.getOff();
  private animation2: Animation = AnimationFactory.getOff();
  private animation3: Animation = AnimationFactory.getOff();
  private animation4: Animation = AnimationFactory.getOff();

  private lastTimeCalled: number;

  constructor() {
    this.initDraw();
    this.manualMode = false;
    this.lastTimeCalled = new Date().getTime();
  }

  start() {
    this.setTickerFunction(this.tickerFunction(this));
  }

  abstract drawCentral1(array: Array<number>): void;

  abstract drawCentral2(array: Array<number>): void;

  abstract drawSecondary(array: Array<number>): void;

  abstract initDraw(): void;

  abstract setTickerFunction(tickerFunction: (delta: number) => void): void;

  abstract render(): void;

  abstract clearGrid(): void;

  abstract toggleTicker(run: boolean): void;

  abstract reset(): void;

  tickerCalled: number = 0;
  lastTickerCalled: number = new Date().getTime();
  autoColorChangeTime: number = new Date().getTime();
  autoColorChange: boolean = false;

  tickerFunction(_that: Canvas): (delta: number) => void {
    return (delta: number) => {
      this.tickerCalled++;
      let now = new Date().getTime();
      if (now - this.lastTickerCalled >= 10000) {
        console.log("avg ticker per seconde " + this.tickerCalled / 10);
        this.tickerCalled = 0;
        this.lastTickerCalled = now;
        if (this.autoColorChange === true && now - this.autoColorChangeTime >= 60000) {
          this.randomizeColors();
          this.autoColorChangeTime = now;
        }
      }
      let timeDiff = now - this.lastTimeCalled;
      this.lastTimeCalled = now;
      _that.step(timeDiff);
    };
  }

  private step(timeDiffMs: number): void {
    const animArray1 = new Array<number>(NUM_LED_CENTRAL_1).fill(LED_OFF);
    const animArray2 = new Array<number>(NUM_LED_CENTRAL_2).fill(LED_OFF);
    const animArray3 = new Array<number>(SECONDARY_NUM_LED).fill(LED_OFF);
    this.animation1.animate(animArray1, timeDiffMs);
    this.animation2.animate(animArray2, timeDiffMs);
    this.animation3.animate(animArray3, timeDiffMs);
    this.drawCentral1(animArray1);
    this.drawCentral2(animArray2);
    this.drawSecondary(animArray3);
    this.render();
  }

  flash(num: number) {
    for (let j = 0; j < 20; j++) {
      // this.drawPixelCentral1(j * 5, Color.WHITE.value);
      // this.drawPixelCentral2(j * 5, Color.WHITE.value);
    }
    this.render();
    this.clearGrid();
    this.render();
    if (num > 1) {
      this.flash(num - 1);
    }
  }

  setManual(manual: boolean): void {
    console.log("set manual " + manual);
    this.manualMode = manual;
    this.toggleTicker(!manual);
  }

  incTicker(timeDiffMs = 16): void {
    this.step(timeDiffMs);
  }

  setAnimations(anims: Array<Animation>): void {
    this.animation1 = anims[0] ? anims[0] : AnimationFactory.getOff();
    this.animation2 = anims[1] ? anims[1] : AnimationFactory.getOff();
    this.animation3 = anims[2] ? anims[2] : AnimationFactory.getOff();
    this.animation4 = anims[3] ? anims[3] : AnimationFactory.getOff();
    this.animation1.setLocation(Location.CENTRAL_1);
    this.animation2.setLocation(Location.CENTRAL_2);
    this.animation3.setLocation(Location.SECONDARY);
    this.resetAnimations();
  }

  resetAnimations(): void {
    this.animation1.reset();
    this.animation2.reset();
    this.animation3.reset();
    this.animation4.reset();
  }

  randomizeColors(): void {
    [this.animation1, this.animation2, this.animation3, this.animation4].forEach(anim => {
      anim.setColor1(Color.COLORS[Math.floor(Math.random() * Color.COLORS.length)].name);
      anim.setColor2(Color.COLORS[Math.floor(Math.random() * Color.COLORS.length)].name);
    });
  }

  getAutoColorChange(): boolean {
    return this.autoColorChange;
  }

  switchAutoColorChange(): void {
    this.autoColorChange = !this.autoColorChange;
  }

}

export {Canvas};
