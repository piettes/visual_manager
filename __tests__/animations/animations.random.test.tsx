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

describe("Random test", () => {

  it("normal animation", () => {
    const canvasNeopixel: CanvasNeopixel = new CanvasNeopixel();
    const animation1 = AnimationFactory.get("Random");
    animation1.setColor1("blue");

    const anims: Array<Animation> = [animation1];
    canvasNeopixel.setAnimations(anims);

    //
    canvasNeopixel.incTicker(2000);

    let expected = getEmptyLEDArray();
    expected[51] = Color.BLUE.value;
    expected[52] = Color.BLUE.value;
    expected[53] = Color.BLUE.value;
    expected[54] = Color.BLUE.value;
    expected[55] = Color.BLUE.value;
    expect(mockRender).toBeCalledWith(expected);
  });

});