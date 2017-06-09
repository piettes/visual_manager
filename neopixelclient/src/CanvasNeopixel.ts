import {Ws281x} from "../ws281x";
import {Canvas} from "../../animations/index";

const LED_LINE_ROOF = 120;
const LED_LINE_WALL = 100;
const LED_OFF = 0x000000;

const FPS = 30;

class CanvasNeopixel extends Canvas {

  initDraw(): void {
  }

  toggleTicker(run: boolean): void {
  }

  ws281x: Ws281x;
  pixelData: Uint32Array;

  constructor() {
    super();
    let num_led = LED_LINE_ROOF * 6 + LED_LINE_WALL * 2;
    this.pixelData = new Uint32Array(num_led);
    this.ws281x = require("rpi-ws281x-native");
    this.ws281x.init(num_led);
  }

  drawPixel(x: number, y: number, _color: any): void {
    let color = _color === -1 ? LED_OFF : _color;
    switch (y) {
      case 0:
        if (x < 100) {
          this.pixelData[x] = color;
        } else {
          this.pixelData[LED_LINE_WALL + LED_LINE_ROOF - (x - LED_LINE_WALL) / 2] = color;
        }
        break;
      case 1:
        this.pixelData[LED_LINE_WALL + LED_LINE_ROOF + (x - LED_LINE_WALL) / 2] = color;
        break;
      case 2:
        this.pixelData[LED_LINE_WALL + LED_LINE_ROOF * 3 - (x - LED_LINE_WALL) / 2] = color;
        break;
      case 3:
        this.pixelData[LED_LINE_WALL + LED_LINE_ROOF * 3 + (x - LED_LINE_WALL) / 2] = color;
        break;
      case 4:
        this.pixelData[LED_LINE_WALL + LED_LINE_ROOF * 5 - (x - LED_LINE_WALL) / 2] = color;
        break;
      case 5:
        if (x < 100) {
          this.pixelData[LED_LINE_WALL * 2 + LED_LINE_ROOF * 6 - x] = color;
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

    setInterval(() => {
          tickerFunction(delta);
        }
        , delta);
  }

}

function rgb2Int(r: number, g: number, b: number) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

export default CanvasNeopixel;