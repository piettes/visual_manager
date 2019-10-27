import {Animation} from "./Animation";
import {Effect1} from "./animations/Effect1";
import {Random} from "./animations/Random";
import {Off} from "./animations/Off";
import {Stars} from "./animations/Stars";
import {Strobe} from "./animations/Strobe";
import {Rain} from "./animations/Rain";
import {Fill} from "./animations/Fill";
import {Effect1Continue} from "./animations/Effect1Continue";
import {Random2} from "./animations/Random2";
import {FadeOut} from "./animations/FadeOut";
import {FadeInOut} from "./animations/FadeInOut";
import {FadeIn} from "./animations/FadeIn";
import {RandomBig} from "./animations/RandomBig";
import {Random2Big} from "./animations/Random2Big";
import {FadeInOutSmall} from "./animations/FadeInOutSmall";
import {FadeInOutSmall2Half} from "./animations/FadeInOutSmall2Half";
import {FadeInOutSmall2} from "./animations/FadeInOutSmall2";
import {FadeInOutSmallHalf} from "./animations/FadeInOutSmallHalf";
import {FadeInOutRandomHalf} from "./animations/FadeInOutRandomHalf";
import {FadeInOutRandom} from "./animations/FadeInOutRandom";

class AnimationFactory {

  static get(name: string): Animation {
    switch (name) {
      case "Effect1":
        return new Effect1();
      case "Effect1Continue":
        return new Effect1Continue();
      case "Fill":
        return new Fill();
      case "FadeOut":
        return new FadeOut();
      case "FadeIn":
        return new FadeIn();
      case "FadeInOut":
        return new FadeInOut();
      case "FadeInOutSmall":
        return new FadeInOutSmall();
      case "FadeInOutSmall2":
        return new FadeInOutSmall2();
      case "FadeInOutSmall2Half":
        return new FadeInOutSmall2Half();
      case "FadeInOutSmallHalf":
        return new FadeInOutSmallHalf();
      case "FadeInOutRandomHalf":
        return new FadeInOutRandomHalf();
      case "FadeInOutRandom":
        return new FadeInOutRandom();
      case "Stars":
        return new Stars();
      case "Rain":
        return new Rain();
        // case "StarsBpm":
        //   return new StarsBpm();
      case "Random":
        return new Random();
      case "Random2":
        return new Random2();
      case "Strobe":
        return new Strobe();
      case "RandomBig":
        return new RandomBig();
      case "Random2Big":
        return new Random2Big();
      case "Test1":
      case "Off":
        return new Off();
      default:
        console.error("Unknown animation ", name);
        return new Off();
    }
  }

  static all: Array<Animation> = [new Off(), new Random(), new Random2(), new Strobe(), new Stars(),
    new Rain(), new Effect1(), new Effect1Continue(), new FadeInOutRandomHalf(), new FadeInOutRandom(), new FadeOut(), new FadeIn(), new FadeInOut(), new FadeInOutSmall(),
    new FadeInOutSmall2(), new FadeInOutSmallHalf(), new FadeInOutSmall2Half(), new Fill(), new RandomBig(), new Random2Big()];


  static getAll(): Array<Animation> {
    return AnimationFactory.all;
  }

  static getDefaultArray(): Array<Animation> {
    return [new Random(), new Off(), new Off(), new Off()];
  }

  static getOff(): Animation {
    return new Off();
  }

}

export {AnimationFactory};
