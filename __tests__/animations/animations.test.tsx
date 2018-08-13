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
  return new Uint32Array(TOTAL_LED).fill(0);
};


describe("Effect1 test", () => {

  it("doesn't display anything with no animations ", () => {
    const canvasNeopixel: CanvasNeopixel = new CanvasNeopixel();

    canvasNeopixel.incTicker();

    expect(mockRender).toBeCalledWith(expect.objectContaining(getEmptyLEDArray()));
  });

  it("normal animation", () => {
    const canvasNeopixel: CanvasNeopixel = new CanvasNeopixel();
    const animation1 = AnimationFactory.get("Effect1");
    animation1.setColor1("blue");

    const anims: Array<Animation> = [animation1];
    canvasNeopixel.setAnimations(anims);

    //
    canvasNeopixel.incTicker();

    let expected = getEmptyLEDArray();
    expected[0] = Color.BLUE.value;
    expected[1] = Color.BLUE.value;
    expected[2] = Color.BLUE.value;
    expected[3] = Color.BLUE.value;
    expect(mockRender).toBeCalledWith(expect.objectContaining(expected));

    //
    canvasNeopixel.incTicker();

    expected = getEmptyLEDArray();
    expected[14] = Color.BLUE.value;
    expected[15] = Color.BLUE.value;
    expected[16] = Color.BLUE.value;
    expected[17] = Color.BLUE.value;
    expect(mockRender).toHaveBeenCalledWith(expect.objectContaining(expected));

    //
    canvasNeopixel.incTicker();

    expected = getEmptyLEDArray();
    expected[21] = Color.BLUE.value;
    expected[22] = Color.BLUE.value;
    expected[23] = Color.BLUE.value;
    expected[24] = Color.BLUE.value;
    expect(mockRender).toHaveBeenCalledWith(expect.objectContaining(expected));

    //
    canvasNeopixel.incTicker();

    expected = getEmptyLEDArray();
    expected[27] = Color.BLUE.value;
    expected[28] = Color.BLUE.value;
    expected[29] = Color.BLUE.value;
    expected[30] = Color.BLUE.value;
    expect(mockRender).toHaveBeenCalledWith(expect.objectContaining(expected));

    //
    canvasNeopixel.incTicker(150);
    canvasNeopixel.incTicker();

    expected = getEmptyLEDArray();
    expected[96] = Color.BLUE.value;
    expected[97] = Color.BLUE.value;
    expected[98] = Color.BLUE.value;
    expected[99] = Color.BLUE.value;
    expect(mockRender).toHaveBeenCalledWith(expect.objectContaining(expected));

    //
    canvasNeopixel.incTicker();

    expected = getEmptyLEDArray();
    expect(mockRender).toHaveBeenCalledWith(expect.objectContaining(expected));

    //
    canvasNeopixel.incTicker(230);

    expected = getEmptyLEDArray();
    expect(mockRender).toHaveBeenCalledWith(expect.objectContaining(expected));

    // restart
    canvasNeopixel.incTicker();

    expected = getEmptyLEDArray();
    expected[0] = Color.BLUE.value;
    expected[1] = Color.BLUE.value;
    expected[2] = Color.BLUE.value;
    expected[3] = Color.BLUE.value;
    expect(mockRender).toHaveBeenCalledWith(expect.objectContaining(expected));

  });

  it("animation in patternLength = 2", () => {
    const canvasNeopixel: CanvasNeopixel = new CanvasNeopixel();
    const animation1 = AnimationFactory.get("Effect1");
    animation1.setColor1("blue");
    animation1.setLuminosity(3);
    animation1.setPatternLength(2);

    const anims: Array<Animation> = [animation1];
    canvasNeopixel.setAnimations(anims);

    //
    canvasNeopixel.incTicker();

    let expected = getEmptyLEDArray();
    expected[0] = Color.BLUE.getShade(3);
    expected[1] = Color.BLUE.getShade(3);
    expected[2] = Color.BLUE.getShade(3);
    expected[3] = Color.BLUE.getShade(3);
    expect(mockRender).toBeCalledWith(expect.objectContaining(expected));

    //
    canvasNeopixel.incTicker();

    expected = getEmptyLEDArray();
    expected[7] = Color.BLUE.getShade(3);
    expected[8] = Color.BLUE.getShade(3);
    expected[9] = Color.BLUE.getShade(3);
    expected[10] = Color.BLUE.getShade(3);
    expect(mockRender).toHaveBeenCalledWith(expect.objectContaining(expected));

    //
    canvasNeopixel.incTicker();

    expected = getEmptyLEDArray();
    expected[11] = Color.BLUE.getShade(3);
    expected[12] = Color.BLUE.getShade(3);
    expected[13] = Color.BLUE.getShade(3);
    expected[14] = Color.BLUE.getShade(3);
    expect(mockRender).toHaveBeenCalledWith(expect.objectContaining(expected));

    //
    canvasNeopixel.incTicker();

    expected = getEmptyLEDArray();
    expected[14] = Color.BLUE.getShade(3);
    expected[15] = Color.BLUE.getShade(3);
    expected[16] = Color.BLUE.getShade(3);
    expected[17] = Color.BLUE.getShade(3);
    expect(mockRender).toHaveBeenCalledWith(expect.objectContaining(expected));

    //
    canvasNeopixel.incTicker(150);

    expected = getEmptyLEDArray();
    expected[45] = Color.BLUE.getShade(3);
    expected[46] = Color.BLUE.getShade(3);
    expected[47] = Color.BLUE.getShade(3);
    expected[48] = Color.BLUE.getShade(3);
    expect(mockRender).toHaveBeenCalledWith(expect.objectContaining(expected));

    //
    canvasNeopixel.incTicker(230);

    expected = getEmptyLEDArray();
    expected[93] = Color.BLUE.getShade(3);
    expected[94] = Color.BLUE.getShade(3);
    expected[95] = Color.BLUE.getShade(3);
    expected[96] = Color.BLUE.getShade(3);
    expect(mockRender).toHaveBeenCalledWith(expect.objectContaining(expected));

    //
    canvasNeopixel.incTicker(230);

    expected = getEmptyLEDArray();
    expect(mockRender).toHaveBeenCalledWith(expect.objectContaining(expected));
  });
});