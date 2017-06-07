import {Canvas} from "animations";
import {Ws281x} from "./../ws281x";

class CanvasNeopixel extends Canvas {

  ws281x: Ws281x;
  pixelData: Uint32Array;

  constructor() {
    super();
    let num_led = this.grid.length * this.grid[0].length;
    this.pixelData = new Uint32Array(num_led);
    this.ws281x = require("rpi-ws281x-native")
    this.ws281x.init(num_led);
  }

  drawPixel(x: number, y: number, color: any): void {
    this.pixelData[x] = rgb2Int(50, 0, 50);
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