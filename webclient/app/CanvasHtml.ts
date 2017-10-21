import {Application, Graphics} from "pixi.js";
import {Canvas} from "../../neopixelclient/src/canvas/Canvas";

const FACTOR = 2;
const PIXEL_SIZE = 1 * FACTOR;
const LED_PER_METER_ROOF = 30;
const LED_PER_METER_WALL = 60;
const LED_LINE_ROOF = 120;
const LED_LINE_WALL = 100;
const LINE_SPACE = 56 * FACTOR;
const ROOM_LENGTH = 524 * FACTOR;
const ROOM_HEIGHT = 320 * FACTOR;
const MARGIN_LEFT = 10 * FACTOR; // 35cm du plafond + 50 du mur
const MARGIN_TOP = LINE_SPACE;
const LED_OFF = 0xFFFFFF;

class CanvasHtml extends Canvas {

  graphics: Graphics;
  app: Application;
  // pixelMap: Array<Array<Graphics>>;
  pixelMapRoof: Array<Array<Graphics>>;

  constructor() {
    super();
  }

  setTickerFunction(tickerFunction: (delta: number) => void): void {
    this.app.ticker.speed = 1;
    this.app.ticker.add(tickerFunction);
  }

  initDraw(): void {
    this.app = new Application(ROOM_LENGTH + 300, ROOM_HEIGHT, {antialias: true, backgroundColor: 0x999999D});
    this.graphics = new Graphics();
    this.drawGrid();
  }

  private drawGrid(): void {
    // this.pixelMap = new Array<Array<Graphics>>(5);
    this.pixelMapRoof = new Array<Array<Graphics>>(5);
    for (let row = 0; row < 5; row++) {
      this.pixelMapRoof[row] = new Array<Graphics>(120);
      for (let column = 0; column < 120; column++) {
        this.graphics.beginFill(LED_OFF);
        let x = (column) * 100 * FACTOR / LED_PER_METER_ROOF + LED_LINE_WALL * 100 * FACTOR
            / LED_PER_METER_WALL + MARGIN_LEFT;
        let gr = new Graphics();
        gr.beginFill(LED_OFF);
        gr.drawRect(0, 0, PIXEL_SIZE, PIXEL_SIZE);
        gr.x = x;
        gr.y = ROOM_HEIGHT - (MARGIN_TOP + row * (LINE_SPACE - PIXEL_SIZE));
        this.app.stage.addChild(gr);
        this.pixelMapRoof[row][column] = gr;
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

  drawPixelRoof(x: number, y: number, color: any): void {
    let gr: Graphics;
    gr = this.pixelMapRoof[y][x];
    gr.beginFill(color === -1 ? LED_OFF : color);
    gr.drawRect(0, 0, PIXEL_SIZE, PIXEL_SIZE);
    gr.endFill();
  }

  drawPixelWall(x: number, y: number, color: any): void {
    // TODO
  }

  reset(): void {
    // TODO
  }

  clearGrid(): void {
  }

  render(): void {
    if (!this.app.ticker.started) {
      this.app.render();
    }
  }
}

export default CanvasHtml;