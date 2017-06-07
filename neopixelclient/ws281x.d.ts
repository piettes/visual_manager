export declare class Ws281x {
  init(num_leds: number): void;
  reset(): void;
  setBrightness(brightness: number): void;
  render(array: Uint32Array): void;
}