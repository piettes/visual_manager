import * as PIXI from "pixi.js";

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

class Canvas {

  nextFrameList: any;
  lastFrameList: any;
  nextFrameMap: any;
  view: any;
  ticker: any;
  manualMode: any;
  animation: any;
  roof: any;

  constructor() {
    this.initDisplay();
    this.initDraw();

    this.manualMode = false;
  }

  getView() {
    return this.view;
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
    console.log(this.manualMode)
  }

  initDraw() {
    let app = new PIXI.Application(ROOM_LENGTH + 300, ROOM_HEIGHT, {antialias: true});
    this.view = app.view;

    let graphics = new PIXI.Graphics();

    app.stage.addChild(graphics);
    this.drawGrid(graphics);

    graphics.lineStyle(1, 0xffd900);
    graphics.moveTo(MARGIN_LEFT + L_LED_NUMBER_1 * (100 * FACTOR / LED_PER_METER_1), 50);
    graphics.lineTo(MARGIN_LEFT + L_LED_NUMBER_1 * (100 * FACTOR / LED_PER_METER_1), ROOM_HEIGHT);
    graphics.lineStyle(0);

    let accDelta = 0;
    let _that = this;
    let lastTick = this.ticker;
    app.ticker.add(function (delta: any) {
      if (_that.animation) {
        if (_that.manualMode) {
          lastTick = _that.ticker;
        } else {
          accDelta += delta;
          if (accDelta > 2) {
            accDelta = 0;
            _that.ticker++;
            lastTick = _that.ticker;

          }
        }
        _that.animation.animate(_that.nextFrameList, _that.ticker);
        _that.renderFrame(graphics);
        _that.ticker = _that.animation.resetTick(_that.ticker);
      }

    });
  }

  initDisplay() {
    let l1: Array<any> = [], l2: Array<any> = [], l3: Array<any> = [], l4: Array<any> = [], l5: Array<any> = [];
    this.roof = [l1, l2, l3, l4, l5];

    [l2, l3, l4].forEach(l => {
      for (let i = 0; i < L_LED_NUMBER_1; i++) {
        l.push(LED_OFF);
      }
    });

    [l1, l5].forEach(l => {
      for (let i = 0; i < L_LED_NUMBER_1 + L_LED_NUMBER_2; i++) {
        l.push(LED_OFF);
      }
    });

    this.nextFrameList = [];
    this.lastFrameList = [];

    this.ticker = 130;
  }

  isInFrame(x: any, y: any) {
    if (0 < y && y < 4) {
      return -1 < x && x < L_LED_NUMBER_1 * 2 && x % 2 == 0;
    } else if (y === 0 || y === 4) {
      if (y === 4) {
      }
      return -1 < x && x < L_LED_NUMBER_1 * 2 && x % 2 == 0 || L_LED_NUMBER_1 * 2 - 1 < x && x < L_LED_NUMBER_1 * 2
          + L_LED_NUMBER_2;
    }
  }

  renderFrame(graphics: any) {
    this.nextFrameMap = new Map();
    this.nextFrameList = this.nextFrameList.filter((p: any) => this.isInFrame(p.x, p.y));
    this.nextFrameList.forEach((p: any) => {
      this.drawPixel(graphics, p.x, p.y, p.c);
      this.nextFrameMap.set(p.x * 10 + p.y, p.c);
    });
    this.lastFrameList.forEach((p: any) => {
      if (!this.nextFrameMap.get(p.x * 10 + p.y)) {
        this.drawPixel(graphics, p.x, p.y, LED_OFF);
      }
    });

    this.lastFrameList = this.nextFrameList.concat();
    this.nextFrameList = [];
  }

  drawPixel(graphics: any, x: any, y: any, color: any) {

    graphics.beginFill(color);
    let px;
    if (x < L_LED_NUMBER_1 * 2 - 1) {
      px = x * 100 * FACTOR / LED_PER_METER_1 / 2;
    } else {
      px = (x - L_LED_NUMBER_1) * 100 * FACTOR / LED_PER_METER_2 + L_LED_NUMBER_1 * 100 * FACTOR / LED_PER_METER_1 / 2;
    }

    graphics.drawRect(MARGIN_LEFT + px,
        ROOM_HEIGHT - (MARGIN_TOP + y * (LINE_SPACE - PIXEL_SIZE)),
        PIXEL_SIZE, PIXEL_SIZE);
    graphics.endFill();
  }

  drawGrid(graphics: any) {
    this.roof.forEach((l: any, row: any) => {
      l.forEach((p: any, column: any) => {
        graphics.beginFill(LED_OFF);
        let x = 0;
        if (column < L_LED_NUMBER_1) {
          x = column * 100 * FACTOR / LED_PER_METER_1;
        } else {
          x = (column - L_LED_NUMBER_1) * 100 * FACTOR / LED_PER_METER_2 + L_LED_NUMBER_1 * 100 * FACTOR
              / LED_PER_METER_1;
        }
        graphics.drawRect(MARGIN_LEFT + x,
            ROOM_HEIGHT - (MARGIN_TOP + row * (LINE_SPACE - PIXEL_SIZE)),
            PIXEL_SIZE, PIXEL_SIZE);
      });
    });

    graphics.endFill();

  }

}

export default Canvas;