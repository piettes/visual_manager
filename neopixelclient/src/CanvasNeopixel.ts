import {Ws281x} from "../ws281x";
import {Canvas} from "./canvas/Canvas";
let NanoTimer = require("nanotimer");

const LED_LINE_ROOF = 120;
const LED_LINE_WALL = 100;
const LED_OFF = 0x000000;

class CanvasNeopixel extends Canvas {

  ws281x: Ws281x;
  pixelData: Uint32Array;
  intervalId: any;
  isRunning: boolean = false;

  constructor() {
    super();
    let num_led = LED_LINE_ROOF * 6 + LED_LINE_WALL * 2;
    this.pixelData = new Uint32Array(num_led);
    this.ws281x = require("rpi-ws281x-native");
    this.ws281x.init(num_led);
  }

  initDraw(): void {
  }

  drawPixel(x: number, y: number, _color: any): void {
    let color = _color === -1 ? LED_OFF : _color;
    switch (y) {
      case 0:
        this.pixelData[LED_LINE_WALL + x] = color;
        break;
      case 1:
        this.pixelData[LED_LINE_WALL + LED_LINE_ROOF * 2 - x] = color;
        break;
      case 2:
        this.pixelData[LED_LINE_WALL + LED_LINE_ROOF * 2 + x] = color;
        break;
      case 3:
        this.pixelData[LED_LINE_WALL + LED_LINE_ROOF * 4 - x] = color;
        break;
      case 4:
        this.pixelData[LED_LINE_WALL + LED_LINE_ROOF * 4 + x] = color;
        break;
    }
  }

  render() {
    this.ws281x.render(this.pixelData);
  }

  reset() {
    this.ws281x.reset();
  }

  setTickerFunction(tickerFunction: (delta: number) => void): void {
    let timer = new NanoTimer();
    this.isRunning = true;
    timer.setInterval(tickerFunction, [12], "100000u"); // 10 fps
  }

  toggleTicker(run: boolean): void {
    if (!run && this.intervalId) {
      clearInterval(this.intervalId);
      this.isRunning = false;
    } else if (!this.isRunning) {
      this.setTickerFunction(this.tickerFunction(this));
    }
  }

}

export default CanvasNeopixel;