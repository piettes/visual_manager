import {Animation} from "./Animation";
import {Point} from "./Point";
import {AnimationFactory} from "./AnimationFactory";

const FACTOR = 2;
const PIXEL_SIZE = 1 * FACTOR;
const LED_PER_METER_ROOF = 30;
const LED_PER_METER_WALL = 60;
const LED_LINE_ROOF = 120;
const LED_LINE_WALL = 100;
const LINE_SPACE = 65 * FACTOR;
const ROOM_LENGTH = 520 * FACTOR;
const ROOM_HEIGHT = 390 * FACTOR;
const MARGIN_LEFT = 10 * FACTOR;
const MARGIN_TOP = 67 * FACTOR;
const LED_OFF = -1;

abstract class Canvas {

  nextFrameList: Array<Point>;
  lastFrameList: Array<Point>;

  private manualMode: boolean;
  private animation1: Animation = AnimationFactory.getDefault();
  private animation2: Animation = AnimationFactory.getOff();

  constructor() {
    this.initFrameLists();
    this.initDraw();
    this.setTickerFunction(this.tickerFunction(this));
    this.manualMode = false;
  }

  abstract drawPixel(x: number, y: number, color: any): void;

  abstract initDraw(): void;

  abstract setTickerFunction(tickerFunction: (delta: number) => void): void;

  abstract render(): void;

  abstract toggleTicker(run: boolean): void;

  abstract reset(): void;

  tickerCalled: number = 0;
  lastTickerCalled: number = new Date().getTime();

  tickerFunction(_that: Canvas): (delta: number) => void {
    return (delta: number) => {

      this.tickerCalled++;
      let now = new Date().getTime();
      if (now - this.lastTickerCalled >= 10000) {
        console.log("avg fps: " + this.tickerCalled / 10);
        this.tickerCalled = 0;
        this.lastTickerCalled = now;
      }
      if (_that.animation1 || _that.animation2) {
        _that.step();
      }
    };
  }

  private step(): void {
    let changed: boolean = this.animation1.animate(this.nextFrameList);
    changed = this.animation2.animate(this.nextFrameList) || changed;
    if (changed) {
      this.calculateFrameDiff();
      this.render();
    }
  }

  private calculateFrameDiff(): void {
    let nextFrameMap = new Map<number, number>();
    this.nextFrameList = this.nextFrameList.filter((p: Point) => {
      return Canvas.isInFrame(p.x, p.y);
    });
    this.nextFrameList.forEach((p: Point) => {
      this.drawPixel(p.x, p.y, p.c);
      nextFrameMap.set(p.x * 10 + p.y, p.c);
    });
    this.lastFrameList.forEach((p: Point) => {
      if (!nextFrameMap.get(p.x * 10 + p.y)) {
        this.drawPixel(p.x, p.y, LED_OFF);
      }
    });

    this.lastFrameList = this.nextFrameList.concat();
    this.nextFrameList = [];
  }

  private initFrameLists(): void {
    this.nextFrameList = [];
    this.lastFrameList = [];
  }

  private static isInFrame(x: number, y: number): boolean {
    if (0 < y && y < 4) {
      return LED_LINE_WALL - 1 < x && x % 2 === 0;
    } else {
      return x < LED_LINE_WALL || x % 2 === 0;
    }
  }

  setManual(manual: boolean): void {
    console.log("set manual " + manual);
    this.manualMode = manual;
    this.toggleTicker(!manual);
  }

  incTicker(): void {
    this.step();
  }

  setAnimation1(anim1: Animation): void {
    this.setAnimations(anim1, this.animation2);
  }

  setAnimation2(anim2: Animation): void {
    this.setAnimations(this.animation1, anim2);
  }

  setAnimations(anim1: Animation, anim2: Animation): void {
    this.animation1 = anim1;
    this.animation2 = anim2;
    this.resetAnimations();
  }

  setColor(colorId: string, colorIndex: number): void {
    switch (colorId) {
      case "color11":
        this.animation1.setColor1(colorIndex);
        break;
      case "color12":
        this.animation1.setColor2(colorIndex);
        break;
      case "color21":
        this.animation2.setColor1(colorIndex);
        break;
      case "color22":
        this.animation2.setColor2(colorIndex);
        break;
      default:
        console.log("Wrong wolor Id");
    }
    this.resetAnimations();
  }

  setBpm(bpm: number): void {
    this.animation1.setBpm(bpm);
    this.animation2.setBpm(bpm);
    this.resetAnimations();
  }

  resetAnimations(): void {
    this.animation1.reset();
    this.animation2.reset();
  }

}

export {Canvas};
