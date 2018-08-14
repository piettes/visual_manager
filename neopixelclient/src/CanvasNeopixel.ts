import {Canvas} from "./canvas/Canvas";
import {Location, LED_OFF, TOTAL_LED, NUM_LED_CENTRAL_1} from "./canvas/Setup";
import Ws281xWrapper from "./Ws281xWrapper";

let NanoTimer = require("nanotimer");

class CanvasNeopixel extends Canvas {

  private pixelData: Uint32Array;
  private tempArray: Array<number>;
  private intervalId: any;
  private isRunning: boolean = false;
  private num_led: number;
  private ws281xWrapper: Ws281xWrapper;

  constructor() {
    super();
    this.num_led = TOTAL_LED;
    this.pixelData = new Uint32Array(this.num_led);
    this.ws281xWrapper = new Ws281xWrapper(this.num_led);
    this.tempArray = [];
  }

  initDraw(): void {
  }

  clearGrid(): void {
    this.pixelData = new Uint32Array(this.num_led);
  }

  drawPixelCentral1(x: number, _color: any): void {
    this.pixelData[x] = _color === -1 ? LED_OFF : _color;
  }

  drawCentral1(array: Array<number>) {
    this.tempArray = array;
  }

  drawCentral2(array: Array<number>) {
    this.tempArray =  this.tempArray.concat(array);
  }

  drawPixelCentral2(x: number, _color: any): void {
    this.pixelData[x + NUM_LED_CENTRAL_1] = _color === -1 ? LED_OFF : _color;
  }

  render() {
    this.pixelData = new Uint32Array(this.tempArray);
    this.ws281xWrapper.render(this.pixelData);
  }

  reset() {
    this.ws281xWrapper.reset();
  }

  setTickerFunction(tickerFunction: (delta: number) => void): void {
    let timer = new NanoTimer();
    this.isRunning = true;
    timer.setInterval(tickerFunction, [12], "16666u"); // 60 fps
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