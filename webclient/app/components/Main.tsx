import * as React from "react";
import Axios from "axios";
import {Rotation} from "../../../neopixelclient/Src/canvas/animations/Rotation";
import {Effect1} from "../../../neopixelclient/Src/canvas/animations/Effect1";
import {Animation} from "../../../neopixelclient/Src/canvas/Animation";
import {Random} from "../../../neopixelclient/Src/canvas/animations/Random";
import CanvasComponent from "./CanvasComponent";
import CanvasHtml from "../CanvasHtml";

class AnimationParameters {
  type: string;
}

class Main extends React.Component<any, any> {

  canvas: CanvasHtml;
  animationParameters: AnimationParameters;
  animationMap: Map<string, Animation> = new Map();
  defaultAnimation: Animation;
  private manualMode: boolean = false;
  private host: string = "http://pi:3000/";

  constructor(props: any) {
    super(props);


    this.incTicker = this.incTicker.bind(this);
    this.toggleManual = this.toggleManual.bind(this);
    this.getView = this.getView.bind(this);
    this.changeEffect = this.changeEffect.bind(this);
    this.applyChange = this.applyChange.bind(this);

    this.canvas = new CanvasHtml();
    this.animationParameters = new AnimationParameters();

    let animList = [new Random(), new Effect1(), new Rotation()];
    animList.forEach(anim => {
      this.animationMap.set(anim.getName(), anim);
    });

    this.defaultAnimation = animList[0];
    this.state = {selectedEffect: this.defaultAnimation.getName()};
    this.canvas.setAnimation(this.defaultAnimation);
  }

  applyChange() {
    console.log(this.state.selectedEffect);
    Axios.get(this.host + "anim/" + this.state.selectedEffect).then(res => console.log(res));
  }

  changeEffect(event: any) {
    this.animationParameters.type = event.target.value;

    let anim = this.animationMap.get(this.animationParameters.type);
    if (anim != null) {
      console.log("set " + anim.getName());
      this.canvas.setAnimation(anim);
    }
  }

  incTicker() {
    this.canvas.incTicker();
    Axios.get(this.host + "tick/");
  }

  toggleManual() {
    this.manualMode = !this.manualMode;
    this.canvas.setManual(this.manualMode);
    Axios.get(this.host + "setManual/" + this.manualMode);
  }

  getView() {
    return this.canvas.getView();
  }

  render() {

    const animOptions = Array.from(this.animationMap.keys()).map(
        anim => <option key={anim} value={anim}>{anim}</option>
    );

    return (
        <div>

          <select onChange={this.changeEffect}>
            {animOptions}
          </select>

          <button onClick={this.applyChange}>Apply</button>

          <br/>

          <button onClick={this.toggleManual}>Toggle manual</button>
          <button onClick={this.incTicker}>Step</button>

          <CanvasComponent getView={this.getView}/>

        </div>
    );
  }
}

export default Main;