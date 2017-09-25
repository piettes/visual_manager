
class Color {

  value: number;
  valueString: string;

  shade1: number;
  shade2: number;
  shade3: number;
  shade4: number;
  shade5: number;
  shade6: number;
  shade7: number;

  constructor(value: number, valueString: string, shade1: number, shade2: number, shade3: number, shade4: number, shade5: number, shade6: number, shade7: number) {
    this.value = value;
    this.valueString = valueString;
    this.shade1 = shade1;
    this.shade2 = shade2;
    this.shade3 = shade3;
    this.shade4 = shade4;
    this.shade5 = shade5;
    this.shade6 = shade6;
    this.shade7 = shade7;
  }

  static RED: Color = new Color(0xFF0000, "#FF0000", 0xDD0000, 0xBB0000, 0x990000, 0x770000, 0x550000, 0x330000, 0x110000);
  static PURPLE: Color = new Color(0xFF00FF, "#FF00FF", 0xDD00DD, 0xBB00BB, 0x990099, 0x770077, 0x550055, 0x330033, 0x110011);


}

export default Color;