import {Animation} from "./Animation";
import {Point} from "./Point";

const FACTOR = 2;
const PIXEL_SIZE = 1 * FACTOR;
const LED_PER_METER_1 = 30;
const LED_PER_METER_2 = 60;
const L_LED_NUMBER_1 = 120;
const L_LED_NUMBER_2 = 100;
const LINE_SPACE = 65 * FACTOR;
const ROOM_LENGTH = 520 * FACTOR;
const ROOM_HEIGHT = 390 * FACTOR;
const MARGIN_LEFT = 10 * FACTOR;
const MARGIN_TOP = 67 * FACTOR;
const LED_OFF = 0xFFFFFF;

export abstract class Canvas {

  nextFrameList: Array<Point>;
  lastFrameList: Array<Point>;
  nextFrameMap: Map<number, number>;
  ticker: number;
  manualMode: boolean;
  animation: Animation;
  grid: Array<Array<number>>;

  constructor() {
    this.initFrameLists();
    this.initDraw(this.grid);
    this.setTickerFunction(this.tickerFunction(this));

    this.manualMode = false;
  }

  abstract initDraw(grid: Array<Array<number>>): void;

  abstract drawPixel(x: number, y: number, color: any): void;

  abstract setTickerFunction(tickerFunction: (delta: number) => void): void;

  tickerFunction(_that: any): (delta: number) => void {
    return (delta: any) => {
      let accDelta = 0;
      if (_that.animation) {
        if (!_that.manualMode) {
          accDelta += delta;
          if (accDelta > 1) {
            _that.ticker = _that.animation.tick(_that.ticker);
          }
        }
        _that.animation.animate(_that.nextFrameList, _that.ticker);
        _that.renderFrame();
        _that.ticker = _that.animation.resetTick(_that.ticker);
      }
    };
  }

  incTicker() {
    this.ticker++;
  }

  add(point: any) {
    this.nextFrameList.push(point);
  }

  setAnimation(animation: any) {
    this.animation = animation;
  }

  toggleManual() {
    this.manualMode = !this.manualMode;
  }


  initFrameLists() {
    let l0: Array<number> = [], l1: Array<number> = [], l2: Array<number> = [], l3: Array<number> = [], l4: Array<number> = [], l5: Array<number> = [];
    this.grid = [l0, l1, l2, l3, l4, l5];

    [l1, l2, l3, l4].forEach(l => {
      for (let i = 0; i < L_LED_NUMBER_1; i++) {
        l.push(LED_OFF);
      }
    });

    [l0, l5].forEach(l => {
      for (let i = 0; i < L_LED_NUMBER_1 + L_LED_NUMBER_2; i++) {
        l.push(LED_OFF);
      }
    });

    this.nextFrameList = [];
    this.lastFrameList = [];

    this.ticker = 0;
  }

  static isInFrame(x: number, y: number) {
    if (0 < y && y < 5) {
      return -1 < x && x < L_LED_NUMBER_1 * 2 && x % 2 === 0;
    } else if (y === 0 || y === 5) {
      if (y === 5) {
      }
      return -1 < x && x < L_LED_NUMBER_1 * 2 && x % 2 === 0 || L_LED_NUMBER_1 * 2 - 1 < x && x < L_LED_NUMBER_1 * 2
          + L_LED_NUMBER_2;
    }
  }

  renderFrame() {
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

}
