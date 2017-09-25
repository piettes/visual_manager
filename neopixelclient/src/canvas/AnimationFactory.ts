import {Rotation} from "./animations/Rotation";
import {Animation} from "./Animation";
import {Effect1} from "./animations/Effect1";
import {Random} from "./animations/Random";
import {Off} from "./animations/Off";
import {Stars} from "./animations/Stars";

class AnimationFactory {

  static get(name?: string): Animation {
    console.log("creating new Animation " + name);
    switch (name) {
      case "Rotation":
        return new Rotation();
      case "Effect1":
        return new Effect1();
      case "Stars":
        return new Stars();
      case "Random":
        return new Random();
      case "Off":
        return new Off();
      default:
        console.error("Unknown animation ", name);
        return new Off();
    }
  }

  static getAll(): Array<Animation> {
    return [new Stars(), new Random(), new Effect1(), new Rotation(), new Off()];
  }

  static getDefault(): Animation {
    return new Stars();
  }

  static getOff(): Animation {
    return new Off();
  }

  static colorOFF: number = 0x000000;

  static colors: Array<number> = [0xFF0000, 0xFF00FF, 0xFFFF00, 0x00FF00, 0x00FFFF, 0x0000FF, 0xFFFFFF, 0x000000];
  static colorsString: Array<string> = ["#FF0000", "#FF00FF", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#FFFFFF", "#000000"];

}

export {AnimationFactory};