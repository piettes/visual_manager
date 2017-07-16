import {Rotation} from "./animations/Rotation";
import {Animation} from "./Animation";
import {Effect1} from "./animations/Effect1";
import {Random} from "./animations/Random";

class AnimationFactory {

  static get(name?: string): Animation | undefined {
    switch (name) {
      case "Rotation":
        return new Rotation();
      case "Effect1":
        return new Effect1();
      case "Random":
        return new Random();
      case "null":
      case undefined:
        return undefined;
      default:
        console.error("Unknown animation ", name);
        return undefined;
    }
  }

  static getAll(): Array<Animation> {
    return [new Random(), new Effect1(), new Rotation()];
  }

  static getDefault(): string {
    return "Random";
  }

  static colors: Array<number> = [0xFF0000, 0xFF00FF, 0xFFFF00, 0x00FF00, 0x00FFFF, 0x0000FF, 0xFFFFFF, 0x000000];
  static colorsString: Array<string> = ["#FF0000", "#FF00FF", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#FFFFFF", "#000000"];

}

export {AnimationFactory};