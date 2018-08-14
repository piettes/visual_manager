import {Animation} from "./Animation";
import {Point} from "./Point";
import {AnimationFactory} from "./AnimationFactory";
import Color from "./Color";
import {Location} from "./Setup";

const LED_OFF = -1;

abstract class Canvas {

  nextFrameList: Array<Point> = [];
  lastFrameList: Array<Point> = [];
  nextFrameList2: Array<Point> = [];
  lastFrameList2: Array<Point> = [];

  private manualMode: boolean;
  private animation1: Animation = AnimationFactory.getOff();
  private animation2: Animation = AnimationFactory.getOff();
  private animation3: Animation = AnimationFactory.getOff();
  private animation4: Animation = AnimationFactory.getOff();

  private lastTimeCalled: number;

  constructor() {
    console.log("New Canvas");
    this.initDraw();
    this.manualMode = false;
    this.lastTimeCalled = new Date().getTime();
  }

  start() {
    this.setTickerFunction(this.tickerFunction(this));
  }

  abstract drawPixelCentral1(x: number, color: any): void;

  abstract drawPixelCentral2(x: number, color: any): void;

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
    let changed: boolean = this.animation1.animate(this.nextFrameList, timeDiffMs);
    let changed2 = this.animation2.animate(this.nextFrameList, timeDiffMs);
    let changed3 = this.animation3.animate(this.nextFrameList2, timeDiffMs);
    let changed4 = this.animation4.animate(this.nextFrameList2, timeDiffMs);
    if (changed) {
      this.calculateFrameDiff(Location.CENTRAL_1);
    }
    if (changed2) {
      this.calculateFrameDiff(Location.CENTRAL_2);
    }
    if (changed || changed2 || changed3 || changed4) {
      this.render();
    }
  }

  private calculateFrameDiff(location: Location): void {
    // TODO refactor that
    if (location === Location.CENTRAL_1) {
      let nextFrameMap = new Map<number, number>();
      this.nextFrameList.forEach((p: Point) => {
        this.drawPixelCentral1(p.x, p.c);
        nextFrameMap.set(p.x, p.c);
      });
      this.lastFrameList.forEach((p: Point) => {
        if (!nextFrameMap.get(p.x)) {
          this.drawPixelCentral1(p.x, LED_OFF);
        }
      });
      this.lastFrameList = this.nextFrameList.concat();
      this.nextFrameList = [];
    } else if (location === Location.CENTRAL_2) {
      let nextFrameMap = new Map<number, number>();
      this.nextFrameList2.forEach((p: Point) => {
        this.drawPixelCentral2(p.x, p.c);
        nextFrameMap.set(p.x, p.c);
      });
      this.lastFrameList2.forEach((p: Point) => {
        if (!nextFrameMap.get(p.x)) {
          this.drawPixelCentral2(p.x, LED_OFF);
        }
      });

      this.lastFrameList2 = this.nextFrameList2.concat();
      this.nextFrameList2 = [];
    }
  }

  flash(num: number) {
    for (let j = 0; j < 20; j++) {
      this.drawPixelCentral1(j * 5, Color.WHITE.value);
      this.drawPixelCentral2(j * 5, Color.WHITE.value);
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
    this.animation2.setLocation(Location.CENTRAL_2);
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
