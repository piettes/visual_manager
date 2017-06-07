import {Application, Graphics} from "pixi.js";
import {Canvas} from "animations";

const FACTOR = 2;
const PIXEL_SIZE = 1 * FACTOR;
const LED_PER_METER_1 = 30;
const LED_PER_METER_2 = 60;
const L_LED_NUMBER_1 = 120;
const L_LED_NUMBER_2 = 100;
const LINE_SPACE = 56 * FACTOR;
const ROOM_LENGTH = 524 * FACTOR;
const ROOM_HEIGHT = 393 * FACTOR;
const MARGIN_LEFT = 10 * FACTOR; // 35cm du plafond + 50 du mur
const MARGIN_TOP = LINE_SPACE;
const LED_OFF = 0xFFFFFF;

class CanvasHtml extends Canvas {

  view: HTMLCanvasElement;
  graphics: Graphics;
  app: Application;

  constructor() {
    super();
    this.initDraw(this.grid);
  }

  setTickerFunction(tickerFunction: (delta: number) => void) {
    this.app.ticker.add(tickerFunction);
  }

  drawPixel(x: number, y: number, color: any): void {
    this.graphics.beginFill(color);
    let px;
    if (x < L_LED_NUMBER_1 * 2 - 1) {
      px = x * 100 * FACTOR / LED_PER_METER_1 / 2;
    } else {
      px = (x - L_LED_NUMBER_1) * 100 * FACTOR / LED_PER_METER_2 + L_LED_NUMBER_1 * 100 * FACTOR / LED_PER_METER_1 / 2;
    }

    this.graphics.drawRect(MARGIN_LEFT + px, ROOM_HEIGHT - (MARGIN_TOP + y * (LINE_SPACE - PIXEL_SIZE)), PIXEL_SIZE, PIXEL_SIZE);
    this.graphics.endFill();
  }

  render() {
  }

  private initDraw(grid: Array<Array<number>>): void {
    this.app = new Application(ROOM_LENGTH + 300, ROOM_HEIGHT, {antialias: true});
    this.view = this.app.view;

    this.graphics = new Graphics();

    this.app.stage.addChild(this.graphics);
    this.drawGrid(grid);

    // draw separation wall/roof
    this.graphics.lineStyle(1, 0xffd900);
    this.graphics.moveTo(MARGIN_LEFT + L_LED_NUMBER_1 * (100 * FACTOR / LED_PER_METER_1), LINE_SPACE);
    this.graphics.lineTo(MARGIN_LEFT + L_LED_NUMBER_1 * (100 * FACTOR / LED_PER_METER_1), ROOM_HEIGHT - LINE_SPACE);
    this.graphics.lineStyle(0);
  }

  private drawGrid(grid: Array<Array<number>>): void {
    grid.forEach((l: any, row: any) => {
      l.forEach((p: any, column: any) => {
        this.graphics.beginFill(LED_OFF);
        let x = 0;
        if (column < L_LED_NUMBER_1) {
          x = column * 100 * FACTOR / LED_PER_METER_1;
        } else {
          x = (column - L_LED_NUMBER_1) * 100 * FACTOR / LED_PER_METER_2 + L_LED_NUMBER_1 * 100 * FACTOR
              / LED_PER_METER_1;
        }
        this.graphics.drawRect(MARGIN_LEFT + x,
            ROOM_HEIGHT - (MARGIN_TOP + row * (LINE_SPACE - PIXEL_SIZE)),
            PIXEL_SIZE, PIXEL_SIZE);
      });
    });
    this.graphics.endFill();
  }

  getView() {
    return this.view;
  }

}

export default CanvasHtml;