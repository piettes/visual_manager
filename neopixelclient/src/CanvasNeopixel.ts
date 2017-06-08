import {Ws281x} from "./../ws281x";
import {Canvas} from "animations";

const LED_LINE_ROOF = 120;
const LED_LINE_WALL = 100;
const LED_OFF = 0x000000;

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
    this.ws281x = require("rpi-ws281x-native")
    this.ws281x.init(num_led);
  }

  drawPixel(x: number, y: number, color: any): void {
    // if (color === 0x000000) {
      this.pixelData[x] = color === -1 ? LED_OFF : color;
    // } else {
    //   this.pixelData[x] = color;
    // }
  }

  render() {
    this.ws281x.render(this.pixelData);
  }

  reset() {
    this.ws281x.reset();
  }

  setTickerFunction(tickerFunction: (delta: number) => void): void {
    setInterval(() => {
          tickerFunction(1000 / 30);
        }
        , 1000 / 30
    );
  }

}

function rgb2Int(r: number, g: number, b: number) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

export default CanvasNeopixel;