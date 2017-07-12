import {Rotation} from "./animations/Rotation";
import {Animation} from "./Animation";
import {Effect1} from "./animations/Effect1";
import {Random} from "./animations/Random";

class AnimationFactory {

  static get(name: string): Animation {
    switch (name) {
      case "Rotation":
        return new Rotation();
      case "Effect1":
        return new Effect1();
      case "Random":
        return new Random();
      default:
        console.error("Unknown animation ", name);
        return new Random();
    }
  }

  static getAll(): Array<Animation> {
    return [new Random(), new Effect1(), new Rotation()];
  }

  static getDefault(): string {
    return "Random";
  }

}

export {AnimationFactory};