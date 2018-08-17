import "jest";
import CanvasNeopixel from "../../neopixelclient/src/CanvasNeopixel";
import {Animation} from "../../neopixelclient/src/canvas/Animation";
import {AnimationFactory} from "../../neopixelclient/src/canvas/AnimationFactory";
import {TOTAL_LED} from "../../neopixelclient/src/canvas/Setup";
import Color from "../../neopixelclient/src/canvas/Color";

const mockRender = jest.fn(() => {
});

jest.mock("../../neopixelclient/src/Ws281xWrapper", () => {
  return {
    "default": jest.fn().mockImplementation(() => {
      return {render: mockRender};
    })
  };
});

beforeEach(() => {
  mockRender.mockClear();
});

const getEmptyLEDArray = () => {
  return new Array<number>(TOTAL_LED).fill(0);
};


describe("StarsBpm test", () => {

  it("normal animation", () => {

    const canvasNeopixel: CanvasNeopixel = new CanvasNeopixel();
    const animation1 = AnimationFactory.get("StarsBpm");
    animation1.setColor1("blue");

    const anims: Array<Animation> = [animation1];
    canvasNeopixel.setAnimations(anims);

    //
    canvasNeopixel.incTicker();

    let expected = getEmptyLEDArray();
    expected[37] = Color.BLUE.getShade(1);
    expect(mockRender).toBeCalledWith(expected);

    canvasNeopixel.incTicker();

    expected = getEmptyLEDArray();
    expected[38] = Color.BLUE.getShade(2);
    expected[37] = Color.BLUE.getShade(3);
    expect(mockRender).toBeCalledWith(expected);

    canvasNeopixel.incTicker();

    expected = getEmptyLEDArray();
    expected[37] = Color.BLUE.getShade(3);
    expected[39] = Color.BLUE.getShade(2);
    expect(mockRender).toBeCalledWith(expected);

    canvasNeopixel.incTicker();

    expected = getEmptyLEDArray();
    expected[37] = Color.BLUE.getShade(4);
    expected[38] = Color.BLUE.getShade(3);
    expected[40] = Color.BLUE.getShade(2);
    expect(mockRender).toBeCalledWith(expected);

    canvasNeopixel.incTicker();


    for (let i = 0; i < 2000; i++) {
      canvasNeopixel.incTicker();
    }

  });

});