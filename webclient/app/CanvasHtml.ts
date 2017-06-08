import {Application, Graphics} from "pixi.js";
import {Canvas} from "animations";

const FACTOR = 2;
const PIXEL_SIZE = 1 * FACTOR;
const LED_PER_METER_ROOF = 30;
const LED_PER_METER_WALL = 60;
const LED_LINE_ROOF = 120;
const LED_LINE_WALL = 100;
const LINE_SPACE = 56 * FACTOR;
const ROOM_LENGTH = 524 * FACTOR;
const ROOM_HEIGHT = 393 * FACTOR;
const MARGIN_LEFT = 10 * FACTOR; // 35cm du plafond + 50 du mur
const MARGIN_TOP = LINE_SPACE;
const LED_OFF = 0xFFFFFF;

class CanvasHtml extends Canvas {

  graphics: Graphics;
  app: Application;
  pixelMap: Array<Array<Graphics>>;

  constructor() {
    super();
  }

  setTickerFunction(tickerFunction: (delta: number) => void): void {
    this.app.ticker.speed = 1;
    this.app.ticker.stop();
    this.app.ticker.add(tickerFunction);
    console.log("minFPS " + this.app.ticker.minFPS);
    console.log("FPS " + this.app.ticker.FPS);
    console.log("rendererPIXI ", this.app.renderer);
  }

  initDraw(): void {
    this.app = new Application(ROOM_LENGTH + 300, ROOM_HEIGHT, {antialias: true});
    this.graphics = new Graphics();
    this.drawGrid();
  }

  private drawGrid(): void {
    this.pixelMap = new Array<Array<Graphics>>(6);
    for (let row = 0; row < 6; row++) {
      this.pixelMap[row] = new Array<Graphics>(220);
      for (let column = 0; column < 220; column++) {
        this.graphics.beginFill(LED_OFF);
        let x = 0;
        if (column < LED_LINE_WALL) {
          if (row === 0 || row === 5) {
            x = column * 100 * FACTOR / LED_PER_METER_WALL + MARGIN_LEFT;
          } else {
            continue;
          }
        } else {
          x = (column - LED_LINE_WALL) * 100 * FACTOR / LED_PER_METER_ROOF + LED_LINE_WALL * 100 * FACTOR
              / LED_PER_METER_WALL + MARGIN_LEFT;
        }
        let gr = new Graphics();
        gr.beginFill(LED_OFF);
        gr.drawRect(0, 0, PIXEL_SIZE, PIXEL_SIZE);
        gr.x = x;
        gr.y = ROOM_HEIGHT - (MARGIN_TOP + row * (LINE_SPACE - PIXEL_SIZE));
        this.app.stage.addChild(gr);
        this.pixelMap[row][column] = gr;
      }
    }
    this.graphics.endFill();
    this.app.render();
  }

  toggleTicker(run: boolean): void {
    if (run) {
      this.app.ticker.start();
    } else {
      this.app.ticker.stop();
    }
  }

  getView(): HTMLCanvasElement {
    return this.app.view;
  }

  drawPixel(x: number, y: number, color: any): void {
    let gr: Graphics;
    if (x < LED_LINE_WALL) {
      gr = this.pixelMap[y][x];
    } else {
      gr = this.pixelMap[y][LED_LINE_WALL + (x - LED_LINE_WALL) / 2];
    }
    gr.beginFill(color);
    gr.drawRect(0, 0, PIXEL_SIZE, PIXEL_SIZE);
    gr.endFill();
  }

  render(): void {
    if (!this.app.ticker.started) {
      this.app.render();
    }
  }
}

export default CanvasHtml;