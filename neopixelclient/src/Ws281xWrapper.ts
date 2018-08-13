import {Ws281x} from "../ws281x";

class Ws281xWrapper {
  private ws281x: Ws281x;

  constructor(num_led: number) {
    this.ws281x = require("rpi-ws281x-native");
    this.ws281x.init(num_led);
  }

  render(array: Uint32Array) {
    this.ws281x.render(array);
  }

  reset() {
    this.ws281x.reset();
  }
}

export default Ws281xWrapper;