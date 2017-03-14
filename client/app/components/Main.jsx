import React from "react";
import * as PIXI from "pixi.js";

const FACTOR = 2;
const PIXEL_SIZE = 1 * FACTOR;
const LED_PER_METER = 30 / FACTOR;
const LINE_SIZE = 400 * FACTOR;
const L_LED_NUMBER = LINE_SIZE * LED_PER_METER / 100;
const LINE_SPACE = 65 * FACTOR;
const ROOM_LENGTH = 520 * FACTOR;
const ROOM_HEIGHT = 390 * FACTOR;
const MARGIN_LEFT = 60 * FACTOR;
const MARGIN_TOP = 60 * FACTOR;
const LED_OFF = 0xFFFFFF;

class Main extends React.Component {

  roof;

  nextFrameList;
  lastFrameList;
  nextFrameMap;

  constructor(props) {
    super(props);

    this.initDisplay();
    this.initDraw();

    this.initDraw = this.initDraw.bind(this);
    this.ax = this.ax.bind(this);
    this.clearGrid = this.clearGrid.bind(this);
    this.renderFrame = this.renderFrame.bind(this);
    this.drawPixel = this.drawPixel.bind(this);
  }

  initDisplay() {
    let l1 = [], l2 = [], l3 = [], l4 = [], l5 = [];
    this.roof = [];
    this.roof.push(l1);
    this.roof.push(l2);
    this.roof.push(l3);
    this.roof.push(l4);
    this.roof.push(l5);
    this.roof.forEach(l => {
      for (let i = 0; i < L_LED_NUMBER; i++) {
        l.push(LED_OFF);
      }
    });

    this.nextFrameList = [];
    this.lastFrameList = [];
  }

  initDraw() {
    var app = new PIXI.Application(ROOM_LENGTH, ROOM_HEIGHT, {antialias: true});
    document.body.appendChild(app.view);

    var graphics = new PIXI.Graphics();

    app.stage.addChild(graphics);
    this.drawGrid(graphics);

    let accDelta = 0;
    let _that = this;
    let tick = 0;
    let theta = 0;
    app.ticker.add(function (delta) {
      accDelta += delta;
      if (accDelta > 10) {
        accDelta = 0;
        theta += 5;
        if (theta > 360) {
          theta = 0;
        }
        _that.ax(theta);
        _that.renderFrame(graphics);
      }
    });
  }

  renderFrame(graphics) {
    this.nextFrameMap = new Map();
    this.nextFrameList.forEach(p => {
      // this.roof[p.y][p.x] = p.c;
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

  ax(theta) {
    if (theta === 0 || theta === 180) {
      for (let i = 0; i < this.roof[2].length; i++) {
        this.nextFrameList.push({x : i, y: 2, c: 0xff0000});
      }
      return;
    }
    let ys = [0, 1, 2, 3, 4];
    ys.forEach(y => {
      // x = (y / sin theta) * cos theta = y / tan theta
      let x = Math.round((y - 2) / Math.tan(theta / 180 * Math.PI) * 30) + L_LED_NUMBER / 2;
      if (x > -1 && x < L_LED_NUMBER + 1) {
        this.nextFrameList.push({x : x, y: y, c: 0xff0000});
        if (x < L_LED_NUMBER) {
          this.nextFrameList.push({x : x + 1, y: y, c: 0x00ff00});
          if (x < L_LED_NUMBER - 1) {
            this.nextFrameList.push({x : x + 2, y: y, c: 0x00ff00});
          }
        }
        if (x > -2) {
          this.nextFrameList.push({x : x - 1, y: y, c: 0x00ff00});
          if (x > -3) {
            this.nextFrameList.push({x : x - 2, y: y, c: 0x00ff00});
          }
        }
      }
    });
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

  drawPixel(graphics, x, y, color) {
    graphics.beginFill(color);
    graphics.drawRect(MARGIN_LEFT + x * (100 / LED_PER_METER),
        ROOM_HEIGHT - (MARGIN_TOP + y * (LINE_SPACE - PIXEL_SIZE)),
        PIXEL_SIZE, PIXEL_SIZE);
    graphics.endFill();
  }

  drawGrid(graphics) {
    let column = 0;
    this.roof.forEach(l => {
      let row = 0;
      l.forEach(p => {
        graphics.beginFill(p);
        graphics.drawRect(MARGIN_LEFT + row * (100 / LED_PER_METER),
            ROOM_HEIGHT - (MARGIN_TOP + column * (LINE_SPACE - PIXEL_SIZE)),
            PIXEL_SIZE, PIXEL_SIZE);
        row++;
      });
      column++;
    });

    graphics.endFill();

  }

  render() {
    return (
        <div>

        </div>
    )
  }
}

export default Main;