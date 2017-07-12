import { Animation } from "./Animation";
import { Point } from "./Point";
declare abstract class Canvas {
    nextFrameList: Array<Point>;
    lastFrameList: Array<Point>;
    nextFrameMap: Map<number, number>;
    ticker: number;
    manualMode: boolean;
    animation: Animation;
    constructor();
    abstract drawPixel(x: number, y: number, color: any): void;
    abstract initDraw(): void;
    abstract setTickerFunction(tickerFunction: (delta: number) => void): void;
    abstract render(): void;
    abstract toggleTicker(run: boolean): void;
    accDelta: number;
    tickerCalled: number;
    private tickerFunction(_that);
    private step();
    private calculateFrameDiff();
    private initFrameLists();
    private static isInFrame(x, y);
    setAnimation(animation: any): void;
    toggleManual(): void;
    incTicker(): void;
}
export { Canvas };
