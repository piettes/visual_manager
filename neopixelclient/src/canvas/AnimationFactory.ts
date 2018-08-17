import {Animation} from "./Animation";
import {Effect1} from "./animations/Effect1";
import {Random} from "./animations/Random";
import {Off} from "./animations/Off";
import {Stars} from "./animations/Stars";
import {StarsBpm} from "./animations/StarsBpm";
import {Strobe} from "./animations/Strobe";
import {Rain} from "./animations/Rain";
import {Fill} from "./animations/Fill";
import {Effect1Continue} from "./animations/Effect1Continue";
import {Random2} from "./animations/Random2";

class AnimationFactory {

  static get(name: string): Animation {
    switch (name) {
      case "Effect1":
        return new Effect1();
      case "Effect1Continue":
        return new Effect1Continue();
      case "Fill":
        return new Fill();
      case "Stars":
        return new Stars();
      case "Rain":
        return new Rain();
      case "StarsBpm":
        return new StarsBpm();
      case "Random":
        return new Random();
        case "Random2":
        return new Random2();
      case "Strobe":
        return new Strobe();
      case "Test1":
      case "Off":
        return new Off();
      default:
        console.error("Unknown animation ", name);
        return new Off();
    }
  }

  static all: Array<Animation> = [new Off(), new Random(), new Random2(), new Strobe(), new StarsBpm(), new Stars(), new Rain(), new Effect1(), new Effect1Continue(), new Fill()];


  static getAll(): Array<Animation> {
    return AnimationFactory.all;
  }

  static getDefaultArray(): Array<Animation> {
    return [new Random(), new StarsBpm(), new Off(), new Off()];
  }

  static getOff(): Animation {
    return new Off();
  }

}

export {AnimationFactory};