import * as React from "react";
import Axios from "axios";
import {Animation} from "../../../neopixelclient/Src/canvas/Animation";
import CanvasComponent from "./CanvasComponent";
import CanvasHtml from "../CanvasHtml";
import {AnimationFactory} from "../../../neopixelclient/src/canvas/AnimationFactory";

class Main extends React.Component<any, any> {

  canvas: CanvasHtml;
  private manualMode: boolean = false;
  private host: string = "http://pi:3000/";
  private animationList: Array<string>;

  constructor(props: any) {
    super(props);


    this.incTicker = this.incTicker.bind(this);
    this.toggleManual = this.toggleManual.bind(this);
    this.getView = this.getView.bind(this);
    this.changeAnimation = this.changeAnimation.bind(this);
    this.applyChange = this.applyChange.bind(this);

    this.canvas = new CanvasHtml();

    this.state = {selectedAnimation: AnimationFactory.getDefault()};
    this.canvas.setAnimation(AnimationFactory.getDefault());

    this.animationList = Array.from(AnimationFactory.getAll().map(anim => anim.getName()));

  }

  applyChange() {
    console.log(this.state.selectedAnimation);
    // Axios.get(this.host + "anim/" + this.state.selectedAnimation).then(res => console.log(res));
    Axios.post(this.host + "update", {params1: "bob", p2: {caca: "prout"}}).then(res => console.log(res));
  }

  changeAnimation(event: any) {
    this.setState({selectedAnimation: event.target.value});
    console.log("set " + event.target.value);
    this.canvas.setAnimation(event.target.value);
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

    const animOptions = this.animationList.map(anim =>
        <option key={anim} value={anim}>{anim}</option>
    );

    return (
        <div>

          <select onChange={this.changeAnimation}>
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