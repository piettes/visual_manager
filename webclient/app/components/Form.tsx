import * as React from "react";
import {AnimationFactory} from "../../../neopixelclient/src/canvas/AnimationFactory";
import {AnimationBase} from "../../../neopixelclient/src/canvas/AnimationBase";
import FormEffect from "./FormEffect";

interface FormProps {
  changeAnimation1: (name: string) => void;
  changeAnimation2: (name: string) => void;
  changeColor: (pos: number, id: number, colorName: string) => void;
  animationList: Array<string>;
  applyChanges: (animJson: any) => void;
  toggleManual: () => void;
  incTicker: () => void;
  flash: (num: number) => void;
  switchAutoColorChange: () => void;
}

class Form extends React.Component<FormProps, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      color11: "purple", color12: "purple", color21: "purple", color22: "purple",
      color31: "purple", color32: "purple", color41: "purple", color42: "purple",
      patternLength1: 1, patternLength2: 1, patternLength3: 1, patternLength4: 1,
      luminosity1: 0, luminosity2: 0, luminosity3: 0, luminosity4: 0,
      animation1: AnimationFactory.getDefaultArray()[0].getName(), animation2: AnimationFactory.getOff().getName(),
      animation3: AnimationFactory.getOff().getName(), animation4: AnimationFactory.getOff().getName(),
      bpm: AnimationBase.DEFAULT_BPM
    };
  }

  changeAnimation(name: string, id: number) {
    this.setState({["animation" + id]: name});
    this.props.changeAnimation1(name);
  }

  changeColor(name: string, pos: number, id: number) {
    this.setState({["color" + id + pos]: name});
    this.props.changeColor(pos, id, name);
  }

  changePatternLength(id: number, value: number): void {
    this.setState({["patternLength" + id]: value});
  }

  changeLuminosity(id: number, value: number): void {
    this.setState({["luminosity" + id]: value});
  }


  onChangeBpm(event: any) {
    let val: number = event.target.value;
    if (val > 250) {
      val = 250;
    }
    if (val < 0) {
      val = 0;
    }
    this.setState({bpm: val});
  }

  onBpmPlus() {
    if (this.state.bpm === "") {
      this.setState({bpm: 1});
    } else if (this.state.bpm < 250) {
      this.setState({bpm: parseInt(this.state.bpm) + 1});
    }
  }

  onBpmMinus() {
    if (this.state.bpm === "") {
      this.setState({bpm: 1});
    } else if (this.state.bpm > 1) {
      this.setState({bpm: parseInt(this.state.bpm) - 1});
    }
  }

  applyChanges() {
    this.props.applyChanges(this.buildAnimJson());
  }

  buildAnimJson(): any {
    let res: any = {};
    for (let i = 1; i < 5; i++) {
      if (this.state["animation" + i]) {
        let anim: any = {};
        anim.name = this.state["animation" + i];
        anim.color1 = this.state["color" + i + 1];
        anim.color2 = this.state["color" + i + 2];
        anim.patternLength = this.state["patternLength" + i];
        anim.luminosity = this.state["luminosity" + i];
        res["anim" + i] = anim;
      }
    }
    res.bpm = this.state.bpm ? this.state.bpm : 1;

    return res;
  }


  render() {

    // const animOptions = this.props.animationList.map((anim: string) =>
     //   {/*<option key={anim} value={anim}>{anim}</option>*/}
    // );

    return (
        <div>

          <form className="form-horizontal">

            <fieldset>

              <div className="row">


                <FormEffect animationList={this.props.animationList} number={1}
                            changeAnimation={(name: string) => this.changeAnimation(name, 1)}
                            changeColor={(name: string, pos: number) => this.changeColor(name, pos, 1)}
                            color1={this.state.color11} color2={this.state.color12}
                            changePatternLength={(value: number) => this.changePatternLength(1, value)}
                            changeLuminosity={(value: number) => this.changeLuminosity(1, value)}
                />

                <FormEffect animationList={this.props.animationList} number={2}
                            changeAnimation={(name: string) => this.changeAnimation(name, 2)}
                            changeColor={(name: string, pos: number) => this.changeColor(name, pos, 2)}
                            color1={this.state.color21} color2={this.state.color22}
                            changePatternLength={(value: number) => this.changePatternLength(2, value)}
                            changeLuminosity={(value: number) => this.changeLuminosity(2, value)}
                />


                <FormEffect animationList={this.props.animationList} number={3}
                            changeAnimation={(name: string) => this.changeAnimation(name, 3)}
                            changeColor={(name: string, pos: number) => this.changeColor(name, pos, 3)}
                            color1={this.state.color31} color2={this.state.color32}
                            changePatternLength={(value: number) => this.changePatternLength(3, value)}
                            changeLuminosity={(value: number) => this.changeLuminosity(3, value)}
                />

                <FormEffect animationList={this.props.animationList} number={4}
                            changeAnimation={(name: string) => this.changeAnimation(name, 4)}
                            changeColor={(name: string, pos: number) => this.changeColor(name, pos, 4)}
                            color1={this.state.color41} color2={this.state.color42}
                            changePatternLength={(value: number) => this.changePatternLength(4, value)}
                            changeLuminosity={(value: number) => this.changeLuminosity(4, value)}
                />

              </div>

              <br/>

              <div className="row">
                <div className="col-lg-3">

                  <div className="form-group">
                    <label htmlFor="bpm" className="col-lg-2 control-label">BPM</label>
                    <div className="input-group col-lg-2">
                      <input type="number" className="form-control" id="bpm"
                             onChange={(event: any) => this.onChangeBpm(event)}
                             value={this.state.bpm}/>
                      <span className="input-group-btn">
                          <button className="btn btn-default btn-xs my-plus-button" onClick={() => this.onBpmPlus()}
                                  type="button">+</button>
                        <br/>
                          <button className="btn btn-default btn-xs my-minus-button" onClick={() => this.onBpmMinus()}
                                  type="button">-</button>
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </fieldset>
          </form>

          <br/>

          <button className="btn btn-sm btn-primary" onClick={() => this.applyChanges()}>Apply</button>
          <button className="btn btn-sm btn-secondary" onClick={() => this.props.flash(1)}>Flash 1</button>
          <button className="btn btn-sm btn-secondary" onClick={() => this.props.flash(4)}>Flash 4</button>
          <button className="btn btn-sm btn-secondary" onClick={() => this.props.flash(8)}>Flash 8</button>
          <button className="btn btn-sm btn-secondary" onClick={() => this.props.flash(13)}>Flash 13</button>
          <button className="btn btn-sm btn-primary" onClick={() => this.props.switchAutoColorChange()}>Switch Auto Color Change</button>
          <br/>
          <br/>
          <button className="btn btn-sm btn-default" onClick={this.props.toggleManual}>Toggle manual</button>
          <button className="btn btn-sm btn-default" onClick={this.props.incTicker}>Step</button>
        </div>
    );

  }

}

export default Form;