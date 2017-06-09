import * as React from "react";
import Axios from "axios";
import {Animation, Effect1, Rotation} from "../../../animations/index";
import CanvasComponent from "./CanvasComponent";
import CanvasHtml from "../CanvasHtml";

class AnimationParameters {
  type: string;
}

class Main extends React.Component<any, any> {

  canvas: CanvasHtml;
  animationParameters: AnimationParameters;
  defaultAnimation: Animation;

  constructor(props: any) {
    super(props);

    this.state = {selectedEffect: "Rotation"};

    this.incTicker = this.incTicker.bind(this);
    this.toggleManual = this.toggleManual.bind(this);
    this.getView = this.getView.bind(this);
    this.changeEffect = this.changeEffect.bind(this);
    this.applyChange = this.applyChange.bind(this);

    this.canvas = new CanvasHtml();
    this.animationParameters = new AnimationParameters();

    this.defaultAnimation = new Effect1();
  }

  applyChange() {
    console.log(this.state.selectedEffect);
    Axios.get("http://localhost:3000/anim/" + this.state.selectedEffect).then(res => console.log(res));
  }

  changeEffect(event: any) {
    this.animationParameters.type = event.target.value;

    switch (this.animationParameters.type) {
      case "Rotation":
        this.canvas.setAnimation(new Rotation());
        break;
      case "Effect1":
        this.canvas.setAnimation(new Effect1());
        break;
      default:
        break;
    }
  }

  incTicker() {
    this.canvas.incTicker();
  }

  toggleManual() {
    this.canvas.toggleManual();
  }

  getView() {
    return this.canvas.getView();
  }

  render() {
    return (
        <div>

          <select onChange={this.changeEffect}>
            <option value="Rotation">Rotation</option>
            <option value="Effect1">Effect1</option>
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