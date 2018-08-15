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


describe("Stars test", () => {

  it("normal animation", () => {
    const canvasNeopixel: CanvasNeopixel = new CanvasNeopixel();
    const animation1 = AnimationFactory.get("Stars");
    animation1.setColor1("blue");

    const anims: Array<Animation> = [animation1];
    canvasNeopixel.setAnimations(anims);

    //
    canvasNeopixel.incTicker(2000);

    let expected = getEmptyLEDArray();
    // expected[0] = Color.BLUE.value;
    // expected[1] = Color.BLUE.value;
    // expected[2] = Color.BLUE.value;
    // expected[3] = Color.BLUE.value;
    expect(mockRender).toBeCalledWith(expected);

    //
    canvasNeopixel.incTicker(200);

    expected = getEmptyLEDArray();
    // expected[14] = Color.BLUE.value;
    // expected[15] = Color.BLUE.value;
    // expected[16] = Color.BLUE.value;
    // expected[17] = Color.BLUE.value;
    expect(mockRender).toHaveBeenCalledWith(expected);

    //
    canvasNeopixel.incTicker(200);

    expected = getEmptyLEDArray();
    // expected[21] = Color.BLUE.value;
    // expected[22] = Color.BLUE.value;
    // expected[23] = Color.BLUE.value;
    // expected[24] = Color.BLUE.value;
    expect(mockRender).toHaveBeenCalledWith(expected);

    //
    canvasNeopixel.incTicker(200);

    expected = getEmptyLEDArray();
    // expected[27] = Color.BLUE.value;
    // expected[28] = Color.BLUE.value;
    // expected[29] = Color.BLUE.value;
    // expected[30] = Color.BLUE.value;
    expect(mockRender).toHaveBeenCalledWith(expected);

    //
    canvasNeopixel.incTicker(150);
    canvasNeopixel.incTicker();

    expected = getEmptyLEDArray();
    // expected[96] = Color.BLUE.value;
    // expected[97] = Color.BLUE.value;
    // expected[98] = Color.BLUE.value;
    // expected[99] = Color.BLUE.value;
    expect(mockRender).toHaveBeenCalledWith(expected);

    //
    canvasNeopixel.incTicker();

    expected = getEmptyLEDArray();
    expect(mockRender).toHaveBeenCalledWith(expected);

    //
    canvasNeopixel.incTicker(230);

    expected = getEmptyLEDArray();
    expect(mockRender).toHaveBeenCalledWith(expected);

    // restart
    canvasNeopixel.incTicker();

    expected = getEmptyLEDArray();
    // expected[0] = Color.BLUE.value;
    // expected[1] = Color.BLUE.value;
    // expected[2] = Color.BLUE.value;
    // expected[3] = Color.BLUE.value;
    expect(mockRender).toHaveBeenCalledWith(expected);

  });

});