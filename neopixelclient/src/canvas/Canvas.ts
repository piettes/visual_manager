import {Animation, Location} from "./Animation";
import {Point} from "./Point";
import {AnimationFactory} from "./AnimationFactory";
import Color from "./Color";

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

  private lastTimeCalled: number;

  constructor() {
    console.log("New Canvas");
    this.initDraw();
    this.setTickerFunction(this.tickerFunction(this));
    this.manualMode = false;
    this.lastTimeCalled = new Date().getTime();
  }

  abstract drawPixelRoof(x: number, y: number, color: any): void;

  abstract drawPixelWall(x: number, y: number, color: any): void;

  abstract initDraw(): void;

  abstract setTickerFunction(tickerFunction: (delta: number) => void): void;

  abstract render(): void;

  abstract clearGrid(): void;

  abstract toggleTicker(run: boolean): void;

  abstract reset(): void;

  tickerCalled: number = 0;
  lastTickerCalled: number = new Date().getTime();
  autoColorChangeTime: number = new Date().getTime();
  autoColorChange: boolean = false;

  tickerFunction(_that: Canvas): (delta: number) => void {
    return (delta: number) => {
      this.tickerCalled++;
      let now = new Date().getTime();
      if (now - this.lastTickerCalled >= 10000) {
        console.log("avg ticker per seconde " + this.tickerCalled / 10);
        this.tickerCalled = 0;
        this.lastTickerCalled = now;
        if (this.autoColorChange === true && now - this.autoColorChangeTime >= 60000) {
          this.randomizeColors();
          this.autoColorChangeTime = now;
        }
      }
      let timeDiff = now - this.lastTimeCalled;
      this.lastTimeCalled = now;
      _that.step(timeDiff);
    };
  }

  private step(timeDiff: number): void {
    let changed: boolean = this.animation1.animate(this.nextFrameList, timeDiff);
    let changed2 = this.animation2.animate(this.nextFrameList, timeDiff);
    let changed3 = this.animation3.animate(this.nextFrameList2, timeDiff);
    let changed4 = this.animation4.animate(this.nextFrameList2, timeDiff);
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

  flash(num: number) {
    [0, 1, 2, 3, 4].forEach(i => {
      for (let j = 0; j < 12; j++) {
        this.drawPixelRoof(j * 10, i, Color.WHITE.value);
      }
    });
    [0, 1].forEach(i => {
      for (let j = 0; j < 20; j++) {
        this.drawPixelWall(j * 5, i, Color.WHITE.value);
      }
    });
    this.render();
    this.clearGrid();
    this.render();
    if (num > 1) {
      this.flash(num - 1);
    }
  }

  setManual(manual: boolean): void {
    console.log("set manual " + manual);
    this.manualMode = manual;
    this.toggleTicker(!manual);
  }

  incTicker(): void {
    this.step(1000);
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

  randomizeColors(): void {
    [this.animation1, this.animation2, this.animation3, this.animation4].forEach(anim => {
      anim.setColor1(Color.COLORS[Math.floor(Math.random() * Color.COLORS.length)].name);
      anim.setColor2(Color.COLORS[Math.floor(Math.random() * Color.COLORS.length)].name);
    });
  }

  getAutoColorChange(): boolean {
    return this.autoColorChange;
  }

  switchAutoColorChange(): void {
    this.autoColorChange = !this.autoColorChange;
  }

}

export {Canvas};
