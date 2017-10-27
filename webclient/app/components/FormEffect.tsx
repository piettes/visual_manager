import * as React from "react";
import Color from "../../../neopixelclient/src/canvas/Color";

interface FormProps {
  changeAnimation: (name: string) => void;
  changeColor: (colorName: string, pos: number) => void;
  changePatternLength: (value: number) => void;
  changeLuminosity: (value: number) => void;
  animationList: Array<string>;
  number: number;
  color1: string;
  color2: string;
}

class FormEffect extends React.Component<FormProps, any> {

  constructor(props: any) {
    super(props);

  }

  onChangeAnimation(event: any) {
    this.props.changeAnimation(event.target.value);
  }

  onChangeColor(colorName: string, pos: number): () => void {
    return () => {
      this.props.changeColor(colorName, pos);
    };
  }

  onChangePatternLength(event: any) {
    this.props.changePatternLength(event.target.value);
  }

  onChangeLuminosity(event: any) {
    this.props.changeLuminosity(event.target.value);
  }

  colorDropdown(pos: number) {

    const colorList = Color.COLORS.map((color: Color, index: number) => {
          let style = {backgroundColor: color.valueString};
          return <li key={color.name} style={style} className={"color-select-" + color.valueString}>
            <a href="#" style={style}
               onClick={this.onChangeColor(color.name, pos)}>{color.name}</a>
          </li>;
        }
    );

    let color;
    if (pos === 1) {
      color = this.props.color1;
    } else {
      color = this.props.color2;
    }
    const style = {backgroundColor: Color.fromName(color).valueString};

    return (
        <div className="btn-group">
          <div className="btn-group">
            <a href="" className="btn btn-default btn-sm dropdown-toggle" style={style} data-toggle="dropdown"
               aria-expanded="false">
              {"color" + pos}
            </a>
            <ul className="dropdown-menu">
              {colorList}
            </ul>
          </div>
        </div>
    );
  }

  render() {

    const animOptions = this.props.animationList.map((anim: string) =>
        <option key={anim} value={anim}>{anim}</option>
    );

    return (

        <div className="col-lg-3">

          <legend>Effect {this.props.number}</legend>

          <div className="form-group">
            <label htmlFor="selectEffect" className="col-lg-4 control-label">Animation</label>
            <div className="col-lg-8">
              <select className="form-control" id="selectEffect"
                      onChange={(event: any) => this.onChangeAnimation(event)}>
                {animOptions}
              </select>
            </div>
          </div>

          {this.colorDropdown(1)}
          {this.colorDropdown(2)}

          <div className="form-group">
            <label htmlFor="selectPatternLength" className="col-lg-4 control-label">Pattern Length</label>
            <div className="col-lg-8">
              <select className="form-control" id="selectPatternLength"
                      onChange={(event: any) => this.onChangePatternLength(event)}>
                <option>1</option>
                <option>2</option>
                <option>4</option>
                <option>8</option>
                <option>16</option>
                <option>32</option>
              </select>

            </div>
          </div>

          <div className="form-group">
            <label htmlFor="selectLuminosity" className="col-lg-4 control-label">Luminosity</label>
            <div className="col-lg-8">
              <select className="form-control" id="selectLuminosity"
                      onChange={(event: any) => this.onChangeLuminosity(event)}>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </select>

            </div>
          </div>


        </div>
    );
  }
}

export default FormEffect;