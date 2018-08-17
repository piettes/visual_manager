import "jest";
import CanvasNeopixel from "../../neopixelclient/src/CanvasNeopixel";
import {Animation} from "../../neopixelclient/src/canvas/Animation";
import {AnimationFactory} from "../../neopixelclient/src/canvas/AnimationFactory";
import {
  NUM_LED_CENTRAL_1, NUM_LED_CENTRAL_2, SECONDARY_NUM_LED, TOTAL_LED
} from "../../neopixelclient/src/canvas/Setup";
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

describe("Fill test", () => {

  it("central1 ", () => {
    const canvasNeopixel: CanvasNeopixel = new CanvasNeopixel();
    const animation1 = AnimationFactory.get("Fill");
    animation1.setColor1("blue");
    const anims: Array<Animation> = [animation1];
    canvasNeopixel.setAnimations(anims);
    //
    canvasNeopixel.incTicker(2000);

    let expected = getEmptyLEDArray();
    expected.fill(Color.BLUE.value, 0, NUM_LED_CENTRAL_1);
    expect(mockRender).toBeCalledWith(expected);
  });

  it("central2 ", () => {
    const canvasNeopixel: CanvasNeopixel = new CanvasNeopixel();
    const animation1 = AnimationFactory.get("Fill");
    animation1.setColor1("blue");
    const anims: Array<Animation> = [AnimationFactory.get("Off"), animation1];
    canvasNeopixel.setAnimations(anims);
    //
    canvasNeopixel.incTicker(2000);

    let expected = getEmptyLEDArray();
    expected.fill(Color.BLUE.getShade(0), NUM_LED_CENTRAL_1, NUM_LED_CENTRAL_1 + NUM_LED_CENTRAL_2);
    expect(mockRender).toBeCalledWith(expected);
  });

  it("secondary ", () => {
    const canvasNeopixel: CanvasNeopixel = new CanvasNeopixel();
    const animation1 = AnimationFactory.get("Fill");
    animation1.setColor1("blue");
    const anims: Array<Animation> = [AnimationFactory.get("Off"), AnimationFactory.get("Off"), animation1];
    canvasNeopixel.setAnimations(anims);
    //
    canvasNeopixel.incTicker(2000);

    let expected = getEmptyLEDArray();
    expected.fill(Color.BLUE.getShade(0), NUM_LED_CENTRAL_1 + NUM_LED_CENTRAL_2, NUM_LED_CENTRAL_1 + NUM_LED_CENTRAL_2 + SECONDARY_NUM_LED);
    expect(mockRender).toBeCalledWith(expected);
  });

});