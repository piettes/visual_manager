import {Animation, Location} from "./Animation";
import {Point} from "./Point";
import {AnimationFactory} from "./AnimationFactory";

const LED_OFF = -1;

abstract class Canvas {

  nextFrameList: Array<Point> = [];
  lastFrameList: Array<Point> = [];
  nextFrameList2: Array<Point> = [];
  lastFrameList2: Array<Point> = [];

  private manualMode: boolean;
  private animation1: Animation = AnimationFactory.getDefault();
  private animation2: Animation = AnimationFactory.getOff();
  private animation3: Animation = AnimationFactory.getOff();
  private animation4: Animation = AnimationFactory.getOff();

  constructor() {
    console.log("New Canvas");
    this.initDraw();
    this.setTickerFunction(this.tickerFunction(this));
    this.manualMode = false;
  }

  abstract drawPixelRoof(x: number, y: number, color: any): void;

  abstract drawPixelWall(x: number, y: number, color: any): void;

  abstract initDraw(): void;

  abstract setTickerFunction(tickerFunction: (delta: number) => void): void;

  abstract render(): void;

  abstract toggleTicker(run: boolean): void;

  abstract reset(): void;

  tickerCalled: number = 0;
  lastTickerCalled: number = new Date().getTime();

  fps: number = 60;
  acc: number = 0;

  tada: number = new Date().getTime();

  tickerFunction(_that: Canvas): (delta: number) => void {
    return (delta: number) => {
      this.acc += delta;
      if (this.acc > 60 / this.fps) {
        this.acc = 0;
        this.tickerCalled++;
        let now = new Date().getTime();
        if (now - this.lastTickerCalled >= 10000) {
          console.log(this.tada - new Date().getTime());
          console.log("avg fps: " + this.tickerCalled / 10);
          this.tickerCalled = 0;
          this.lastTickerCalled = now;
        }
        if (_that.animation1 || _that.animation2) {
          _that.step();
        }
      }
    };
  }

  private step(): void {
    let changed: boolean = this.animation1.animate(this.nextFrameList);
    let changed2 = this.animation2.animate(this.nextFrameList);
    let changed3 = this.animation3.animate(this.nextFrameList2);
    let changed4 = this.animation4.animate(this.nextFrameList2);
    if (changed || changed2) {
      this.calculateFrameDiff(Location.ROOF);
    }
    if (changed3 || changed4) {
      this.calculateFrameDiff(Location.WALL);
    }
    if (changed || changed2 || changed3 || changed4) {
      this.render();
    }
  }

  private calculateFrameDiff(location: Location): void {
    // TODO refactor that
    if (location === Location.ROOF) {
      let nextFrameMap = new Map<number, number>();
      this.nextFrameList.forEach((p: Point) => {
        this.drawPixelRoof(p.x, p.y, p.c);
        nextFrameMap.set(p.x * 10 + p.y, p.c);
      });
      this.lastFrameList.forEach((p: Point) => {
        if (!nextFrameMap.get(p.x * 10 + p.y)) {
          this.drawPixelRoof(p.x, p.y, LED_OFF);
        }
      });
      this.lastFrameList = this.nextFrameList.concat();
      this.nextFrameList = [];
    } else {
      let nextFrameMap = new Map<number, number>();
      this.nextFrameList2.forEach((p: Point) => {
        this.drawPixelWall(p.x, p.y, p.c);
        nextFrameMap.set(p.x * 10 + p.y, p.c);
      });
      this.lastFrameList2.forEach((p: Point) => {
        if (!nextFrameMap.get(p.x * 10 + p.y)) {
          this.drawPixelWall(p.x, p.y, LED_OFF);
        }
      });

      this.lastFrameList2 = this.nextFrameList2.concat();
      this.nextFrameList2 = [];
    }
  }

  setManual(manual: boolean): void {
    console.log("set manual " + manual);
    this.manualMode = manual;
    this.toggleTicker(!manual);
  }

  incTicker(): void {
    this.step();
  }

  setAnimations(anims: Array<Animation>): void {
    this.animation1 = anims[0] ? anims[0] : AnimationFactory.getOff();
    this.animation2 = anims[1] ? anims[1] : AnimationFactory.getOff();
    this.animation3 = anims[2] ? anims[2] : AnimationFactory.getOff();
    this.animation4 = anims[3] ? anims[3] : AnimationFactory.getOff();
    this.animation3.setLocation(Location.WALL);
    this.animation4.setLocation(Location.WALL);
    this.resetAnimations();
  }

  setColor(colorId: string, colorName: string): void {
    switch (colorId) {
      case "color11":
        this.animation1.setColor1(colorName);
        break;
      case "color12":
        this.animation1.setColor2(colorName);
        break;
      case "color21":
        this.animation2.setColor1(colorName);
        break;
      case "color22":
        this.animation2.setColor2(colorName);
        break;
      case "color31":
        this.animation3.setColor1(colorName);
        break;
      case "color32":
        this.animation3.setColor2(colorName);
        break;
      case "color41":
        this.animation4.setColor1(colorName);
        break;
      case "color42":
        this.animation4.setColor2(colorName);
        break;
      default:
        console.log("Wrong wolor Id");
    }
    this.resetAnimations();
  }

  setBpm(bpm: number): void {
    this.animation1.setBpm(bpm);
    this.animation2.setBpm(bpm);
    this.animation3.setBpm(bpm);
    this.animation4.setBpm(bpm);
    this.resetAnimations();
  }

  resetAnimations(): void {
    this.animation1.reset();
    this.animation2.reset();
    this.animation3.reset();
    this.animation4.reset();
  }

}

export {Canvas};
