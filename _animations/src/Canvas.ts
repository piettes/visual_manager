import {Animation} from "./Animation";
import {Point} from "./Point";
import {Effect1} from "./Effect1";

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
  nextFrameMap: Map<number, number>;
  ticker: number;
  private manualMode: boolean;
  animation: Animation;

  constructor() {
    this.initFrameLists();
    this.initDraw();
    this.setTickerFunction(this.tickerFunction(this));
    this.manualMode = false;

    this.animation = new Effect1();
  }

  abstract drawPixel(x: number, y: number, color: any): void;

  abstract initDraw(): void;

  abstract setTickerFunction(tickerFunction: (delta: number) => void): void;

  abstract render(): void;

  abstract toggleTicker(run: boolean): void;

  abstract reset(): void;

  accDelta: number = 0;
  tickerCalled: number = 0;
  lastTickerCalled: number = new Date().getTime();

  tickerFunction(_that: Canvas): (delta: number) => void {
    return (delta: number) => {

      this.tickerCalled++;
      if (new Date().getTime() - this.lastTickerCalled > 10000) {
        console.log("avg fps: " + this.tickerCalled / 10);
        this.tickerCalled = 1;
        this.lastTickerCalled = new Date().getTime();
      }

      if (_that.animation) {
        this.accDelta += delta;
        if (this.accDelta > 1) {
          this.accDelta = 0;
          _that.step();
        }
      }
    };
  }

  private step(): void {
    this.ticker = this.animation.tick(this.ticker);
    this.animation.animate(this.nextFrameList, this.ticker);
    this.calculateFrameDiff();
    this.render();
  }

  private calculateFrameDiff(): void {
    this.nextFrameMap = new Map<number, number>();
    this.nextFrameList = this.nextFrameList.filter((p: Point) => Canvas.isInFrame(p.x, p.y));
    this.nextFrameList.forEach((p: Point) => {
      this.drawPixel(p.x, p.y, p.c);
      this.nextFrameMap.set(p.x * 10 + p.y, p.c);
    });
    this.lastFrameList.forEach((p: Point) => {
      if (!this.nextFrameMap.get(p.x * 10 + p.y)) {
        this.drawPixel(p.x, p.y, LED_OFF);
      }
    });

    this.lastFrameList = this.nextFrameList.concat();
    this.nextFrameList = [];
  }

  private initFrameLists(): void {
    this.nextFrameList = [];
    this.lastFrameList = [];

    this.ticker = 0;
  }

  private static isInFrame(x: number, y: number): boolean {
    if (0 < y && y < 5) {
      return LED_LINE_WALL - 1 < x && x % 2 === 0;
    } else {
      return x < LED_LINE_WALL || x % 2 === 0;
    }
  }

  setAnimation(animation: any): void {
    this.animation = animation;
  }

  setManual(manual: boolean): void {
    console.log("set manual " + manual);
    this.manualMode = manual;
    this.toggleTicker(!manual);
  }

  incTicker(): void {
    this.step();
  }

}

export {Canvas};
