import {Rotation} from "./animations/Rotation";
import {Animation} from "./Animation";
import {Effect1} from "./animations/Effect1";
import {Random} from "./animations/Random";
import {Off} from "./animations/Off";
import {Stars} from "./animations/Stars";
import {Test2} from "./animations/Test2";
import {Test1} from "./animations/Test1";
import {Test3} from "./animations/Test3";
import {StarsTest1} from "./animations/StarsTest1";
import {StarsBpm} from "./animations/StarsBpm";
import {Test4} from "./animations/Test4";
import {StarsTest2} from "./animations/StarsTest2";

class AnimationFactory {

  static get(name: string): Animation {
    console.log("creating new Animation " + name);

    switch (name) {
      case "Rotation":
        return new Rotation();
      case "Effect1":
        return new Effect1();
      case "Stars":
        return new Stars();
      case "StarsBpm":
        return new StarsBpm();
      case "Random":
        return new Random();
      case "Test1":
        return new Test1();
      case "Test2":
        return new Test2();
      case "Test3":
        return new Test3();
      case "Test4":
        return new Test4();
      case "Off":
        return new Off();
      case "StarsTest1":
        return new StarsTest1();
        case "StarsTest2":
        return new StarsTest2();
      default:
        console.error("Unknown animation ", name);
        return new Off();
    }
  }

  static all: Array<Animation> = [new Random(), new StarsBpm(), new Stars(), new Effect1(), new Rotation(), new Off(), new Test1(), new Test2(), new Test3(), new Test4(), new StarsTest1(), new StarsTest2()];


  static getAll(): Array<Animation> {
    return AnimationFactory.all;
  }

  static getDefault(): Animation {
    return AnimationFactory.all[0];
  }

  static getOff(): Animation {
    return new Off();
  }

}

export {AnimationFactory};