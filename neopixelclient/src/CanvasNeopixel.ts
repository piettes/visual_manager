import {Canvas} from "./canvas/Canvas";
import {TOTAL_LED} from "./canvas/Setup";
import Ws281xWrapper from "./Ws281xWrapper";
import {Random} from "./canvas/animations/Random";
import {Random2} from "./canvas/animations/Random2";
import {FadeInOutRandom} from "./canvas/animations/FadeInOutRandom";
import {Rain} from "./canvas/animations/Rain";

let NanoTimer = require("nanotimer");

class CanvasNeopixel extends Canvas {

  private pixelData: Array<number>;
  private intervalId: any;
  private isRunning: boolean = false;
  private num_led: number;
  private ws281xWrapper: Ws281xWrapper;

  constructor() {
    super();
    this.num_led = TOTAL_LED;
    this.ws281xWrapper = new Ws281xWrapper(this.num_led);
    this.pixelData = [];

    this.initAnimations();
  }

  initAnimations(): void {
    let anim1 = new Rain();
    let anim2 =  new Random2();
    anim2.setPatternLength(2);
    let anim3 = new FadeInOutRandom();
    anim3.setPatternLength(4);
    this.setAnimations([anim1, anim2, anim3]);
    this.randomizeColors();
  }

  initDraw(): void {
  }

  clearGrid(): void {
    this.ws281xWrapper.clearGrid();
  }

  drawCentral1(array: Array<number>) {
    this.pixelData = array;
  }

  drawCentral2(array: Array<number>) {
    this.pixelData =  this.pixelData.concat(array);
  }

  drawSecondary(array: Array<number>) {
    this.pixelData =  this.pixelData.concat(array);
  }

  render() {
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
