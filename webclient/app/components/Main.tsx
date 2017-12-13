import * as React from "react";
import Axios from "axios";
import CanvasComponent from "./CanvasComponent";
import CanvasHtml from "../CanvasHtml";
import {AnimationFactory} from "../../../neopixelclient/src/canvas/AnimationFactory";
import Form from "./Form";
import {Animation} from "../../../neopixelclient/src/canvas/Animation";

class Main extends React.Component<any, any> {

  private canvas: CanvasHtml;
  private manualMode: boolean = false;
  private host: string;
  private animationList: Array<string>;
  private currentAnimations: Array<Animation>;

  constructor(props: any) {
    super(props);

    this.canvas = new CanvasHtml();
    this.canvas.setAnimations([AnimationFactory.getDefault(), AnimationFactory.getOff(), AnimationFactory.getOff(), AnimationFactory.getOff()]);

    this.animationList = Array.from(AnimationFactory.getAll().map(anim => anim.getName()));

    this.currentAnimations = [AnimationFactory.getDefault(), AnimationFactory.getOff(), AnimationFactory.getOff(), AnimationFactory.getOff()];

    this.host = props.hostUrl;
  }

  applyChanges(animJson: any): void {
    Axios.post(this.host + "update", animJson).then(res => console.log(res));
  }

  flash(num: number): void {
    Axios.post(this.host + "flash", {num: num}).then(res => console.log(res));
  }

  switchAutoColorChange(): void {
    Axios.post(this.host + "switchAutoColorChange").then(res => console.log(res));
  }

  changeAnimation1(name: string): void {
    this.currentAnimations[0] = AnimationFactory.get(name);
    this.canvas.setAnimations(this.currentAnimations);
  }

  changeAnimation2(name: string): void {
    this.currentAnimations[1] = AnimationFactory.get(name);
    this.canvas.setAnimations(this.currentAnimations);
  }

  changeColor(pos: number, id: number, colorName: string): void {
    if (pos === 1) {
      this.currentAnimations[id - 1].setColor1(colorName);
    } else {
      this.currentAnimations[id - 1].setColor2(colorName);
    }
    this.canvas.setAnimations(this.currentAnimations);
  }

  changeBpm(bpm: number) {
    this.canvas.setBpm(bpm);
  }

  incTicker() {
    // this.canvas.incTicker();
    Axios.get(this.host + "tick/");
  }

  toggleManual() {
    this.manualMode = !this.manualMode;
    // this.canvas.setManual(this.manualMode);
    Axios.get(this.host + "setManual/" + this.manualMode);
  }

  stopPreview() {
    // this.canvas.setManual(true);
  }

  getView() {
    return this.canvas.getView();
  }

  render() {

    return (
        <div>

          <Form changeAnimation1={(name: string) => this.changeAnimation1(name)}
                changeAnimation2={(name: string) => this.changeAnimation2(name)}
                changeColor={(pos: number, id: number, colorName: string) => this.changeColor(pos, id, colorName)}
                applyChanges={(animJson: any) => this.applyChanges(animJson)}
                animationList={this.animationList} toggleManual={() => this.toggleManual()}
                incTicker={() => this.incTicker()}
                changeBpm={(bpm: number) => this.changeBpm(bpm)}
                stopPreview={() => this.stopPreview()}
                flash={(num: number) => this.flash(num)}
                switchAutoColorChange={() => this.switchAutoColorChange()}
          />

          <CanvasComponent getView={() => this.getView()}/>

        </div>
    );
  }
}

export default Main;