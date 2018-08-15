import {Ws281x} from "../ws281x";

class Ws281xWrapper {
  private ws281x: Ws281x;

  constructor(num_led: number) {
    this.ws281x = require("rpi-ws281x-native");
    this.ws281x.init(num_led);
  }

  render(array: Array<number>) {
    this.ws281x.render(new Uint32Array(array));
  }

  reset() {
    this.ws281x.reset();
  }

  clearGrid() {
  }
}

export default Ws281xWrapper;