import React from "react";
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

// TODO HSV to hexa
// TODO param for ax
// TODO random rain
// TODO strobo
// TODO
// TODO

class Main extends React.Component {

  roof;

  nextFrameList;
  lastFrameList;
  nextFrameMap;

  constructor(props) {
    super(props);

    this.initDisplay();

    this.initDraw = this.initDraw.bind(this);
    this.ax = this.ax.bind(this);
    this.renderFrame = this.renderFrame.bind(this);
    this.clicked = this.clicked.bind(this);
  }

  initDisplay() {
    let l1 = [], l2 = [], l3 = [], l4 = [], l5 = [];
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

  componentDidMount() {
    this.initDraw();
  }

  initDraw() {
    let app = new PIXI.Application(ROOM_LENGTH + 300, ROOM_HEIGHT, {antialias: true});
    this.refs.myCanvas.appendChild(app.view);

    let graphics = new PIXI.Graphics();

    app.stage.addChild(graphics);
    this.drawGrid(graphics);

    graphics.lineStyle(1, 0xffd900);
    graphics.moveTo(MARGIN_LEFT + L_LED_NUMBER_1 * (100 * FACTOR / LED_PER_METER_1), 50);
    graphics.lineTo(MARGIN_LEFT + L_LED_NUMBER_1 * (100 * FACTOR / LED_PER_METER_1), ROOM_HEIGHT);
    graphics.lineStyle(0);

    let accDelta = 0;
    let _that = this;
    let theta = 0;
    let lastTick = this.ticker;
    app.ticker.add(function (delta) {
      // if (lastTick !== _that.ticker) {
      //   lastTick = _that.ticker;
      //   _that.ax(lastTick);
      //   _that.renderFrame(graphics);
      // }
      accDelta += delta;
      if (accDelta > 2) {
        accDelta = 0;
        _that.ax(theta);
        _that.renderFrame(graphics);
        theta += 1;
        if (theta > 360) {
          theta = 0;
        }
      }
    });
  }

  isInFrame(x, y) {
    if (0 < y && y < 4) {
      return -1 < x  &&  x < L_LED_NUMBER_1 * 2 && x % 2 == 0;
    } else if (y === 0 || y === 4) {
      if (y === 4) {
      }
      return -1 < x && x < L_LED_NUMBER_1 * 2 && x % 2 == 0 || L_LED_NUMBER_1 * 2 - 1 < x  && x < L_LED_NUMBER_1 * 2 + L_LED_NUMBER_2;
    }
  }

  renderFrame(graphics) {
    this.nextFrameMap = new Map();
    this.nextFrameList = this.nextFrameList.filter(p => this.isInFrame(p.x, p.y))
    this.nextFrameList.forEach(p => {
      this.drawPixel(graphics, p.x, p.y, p.c);
      this.nextFrameMap.set(p.x * 10 + p.y, p.c);
    });
    this.lastFrameList.forEach(p => {
      if (!this.nextFrameMap.get(p.x * 10 + p.y)) {
        this.drawPixel(graphics, p.x, p.y, LED_OFF);
      }
    });

    this.lastFrameList = this.nextFrameList.concat();
    this.nextFrameList = [];
  }



  // circle() {
  //   let angle = 0;
  //   let pi_over180 = 3.14159265 / 180.0;
  //   let offset = LINE_SIZE;
  //   let n = 25;
  //   let step = 360 / n;
  //   let radius = LINE_SIZE / 2;
  //
  //   let l = [0, LINE_SPACE, LINE_SPACE * 2, LINE_SPACE * 3, LINE_SPACE * 4];
  //
  //   l.forEach(y => {
  //     let angle = Math.asin(((y * 2) - offset) / (radius * 2));
  //     let x = ((Math.cos(angle) * radius * 2) + offset) * 0.5 | 0;
  //     let x2 = ((Math.cos(angle + 3.14159265) * radius * 2) + offset) * 0.5 | 0;
  //
  //     console.log(x, x2, y);
  //     this.roof[l.indexOf(y)][x] = 0xFF00FF;
  //     this.roof[l.indexOf(y)][x2] = 0xFF00FF;
  //   });
  //
  //   for (let i = 0; i < n; i++) {
  //     let y = ((Math.sin(angle * pi_over180) * radius * 2) + offset) * 0.5 | 0;
  //     if (l.indexOf(y) != -1) {
  //       let x = ((Math.cos(angle * pi_over180) * radius * 2) + offset) * 0.5 | 0;
  //       // this.roof[l.indexOf(y)][x] = 0xff0000;
  //       // console.log(this.roof);
  //     }
  //     angle += step;
  //   }
  // }

  clicked() {
    this.ticker++;
  }

  ax(theta) {
    if (theta === 0 || theta === 180) {
      for (let i = 0; i < L_LED_NUMBER_1; i++) {
        this.nextFrameList.push({x: i * 2, y: 2, c: 0xff0000});
      }
      return;
    }

    let x = Math.round(0.1 / Math.tan(theta / 360 * Math.PI * 2) * 30) + L_LED_NUMBER_1;
    this.axAddPixels(x, 2);
    this.axAddPixels(L_LED_NUMBER_1 * 2 - x, 2);

    [0, 1, 3, 4].forEach(y => {
      // x = (y / sin theta) * cos theta = y / tan theta
      let x = Math.round((y - 2) / Math.tan(theta / 360 * Math.PI * 2) * 30) + L_LED_NUMBER_1;
      this.axAddPixels(x, y);
    });
  }

  axAddPixels (x, y) {
    this.nextFrameList.push({x: x, y: y, c: 0xff0000});
    this.nextFrameList.push({x: x - 1, y: y, c: 0xff0000});
    this.nextFrameList.push({x: x + 1, y: y, c: 0xff0000});
    this.nextFrameList.push({x: x + 2, y: y, c: 0xff0000});
    this.nextFrameList.push({x: x - 2, y: y, c: 0xff0000});
    this.nextFrameList.push({x: x + 3, y: y, c: 0x00ff00});
    this.nextFrameList.push({x: x - 3, y: y, c: 0x00ff00});
    this.nextFrameList.push({x: x + 4, y: y, c: 0x00ff00});
    this.nextFrameList.push({x: x - 4, y: y, c: 0x00ff00});
    this.nextFrameList.push({x: x + 5, y: y, c: 0x00ff00});
    this.nextFrameList.push({x: x - 5, y: y, c: 0x00ff00});
    this.nextFrameList.push({x: x + 6, y: y, c: 0x00ff00});
    this.nextFrameList.push({x: x - 6, y: y, c: 0x00ff00});
  }


  drawPixel(graphics, x, y, color) {

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

  drawGrid(graphics) {
    this.roof.forEach((l, row) => {
      l.forEach((p, column) => {
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

  render() {
    return (
        <div ref="myCanvas">

          <button onClick={this.clicked}>Step</button>

        </div>
    )
  }
}

export default Main;