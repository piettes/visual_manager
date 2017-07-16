import * as React from "react";
import Axios from "axios";
import CanvasComponent from "./CanvasComponent";
import CanvasHtml from "../CanvasHtml";
import {AnimationFactory} from "../../../neopixelclient/src/canvas/AnimationFactory";
import Form from "./Form";

class Main extends React.Component<any, any> {

  private canvas: CanvasHtml;
  private manualMode: boolean = false;
  private host: string;
  private animationList: Array<string>;

  constructor(props: any) {
    super(props);

    this.incTicker = this.incTicker.bind(this);
    this.toggleManual = this.toggleManual.bind(this);
    this.getView = this.getView.bind(this);
    this.applyChanges = this.applyChanges.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.changeAnimation1 = this.changeAnimation1.bind(this);
    this.changeAnimation2 = this.changeAnimation2.bind(this);
    this.changeBpm = this.changeBpm.bind(this);

    this.canvas = new CanvasHtml();
    this.canvas.setAnimations(AnimationFactory.getDefault(), AnimationFactory.getOff());

    this.animationList = Array.from(AnimationFactory.getAll().map(anim => anim.getName()));

    this.host = props.hostUrl;
  }

  applyChanges(animJson: any): void {
    Axios.post(this.host + "update", animJson).then(res => console.log(res));
  }

  changeAnimation1(name: string): void {
    this.canvas.setAnimation1(AnimationFactory.get(name));
  }

  changeAnimation2(name: string): void {
    this.canvas.setAnimation2(AnimationFactory.get(name));
  }

  changeColor(colorId: string, colorIndex: number): void {
    this.canvas.setColor(colorId, colorIndex);
  }

  changeBpm(bpm: number) {
    this.canvas.setBpm(bpm);
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

    return (
        <div>

          <Form changeAnimation1={this.changeAnimation1} changeAnimation2={this.changeAnimation2}
                changeColor={this.changeColor} applyChanges={this.applyChanges}
                animationList={this.animationList} toggleManual={this.toggleManual} incTicker={this.incTicker}
                changeBpm={this.changeBpm}/>

          <CanvasComponent getView={this.getView}/>

        </div>
    );
  }
}

export default Main;