import {Ws281x} from "../ws281x";
import {Canvas} from "./canvas/Canvas";
import Timer = NodeJS.Timer;

const LED_LINE_ROOF = 120;
const LED_LINE_WALL = 100;
const LED_OFF = 0x000000;

const FPS = 20;

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
        if (x < 100) {
          this.pixelData[x] = color;
        } else {
          this.pixelData[LED_LINE_WALL + LED_LINE_ROOF - (x - LED_LINE_WALL) / 2 - 1] = color;
        }
        break;
      case 1:
        this.pixelData[LED_LINE_WALL + LED_LINE_ROOF + (x - LED_LINE_WALL) / 2] = color;
        break;
      case 2:
        this.pixelData[LED_LINE_WALL + LED_LINE_ROOF * 3 - (x - LED_LINE_WALL) / 2 - 1] = color;
        break;
      case 3:
        this.pixelData[LED_LINE_WALL + LED_LINE_ROOF * 3 + (x - LED_LINE_WALL) / 2] = color;
        break;
      case 4:
        this.pixelData[LED_LINE_WALL + LED_LINE_ROOF * 5 - (x - LED_LINE_WALL) / 2 - 1] = color;
        break;
      case 5:
        if (x < 100) {
          this.pixelData[LED_LINE_WALL * 2 + LED_LINE_ROOF * 6 - x - 1] = color;
        } else {
          this.pixelData[LED_LINE_WALL + LED_LINE_ROOF * 5 + (x - LED_LINE_WALL) / 2] = color;
        }
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
    let delta = 1000 / FPS;
    this.isRunning = true;
    this.intervalId = setInterval(() => {
          tickerFunction(delta);
        }
        , delta);
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