class Color {

  name: string;
  value: number;
  valueString: string;

  private shade1: number;
  private shade2: number;
  private shade3: number;
  private shade4: number;
  private shade5: number;
  private shade6: number;
  private shade7: number;

  private shadeMap: Map<number, number>;
  private shade8: number;
  private shade9: number;
  private shade10: number;
  private shade11: number;
  private shade12: number;
  private shade13: number;
  private shade14: number;
  private shade15: number;

  constructor(name: string, value: number, valueString: string, shade1: number, shade2: number, shade3: number,
              shade4: number, shade5: number, shade6: number, shade7: number,
              shade8: number, shade9: number, shade10: number, shade11: number,
              shade12: number, shade13: number, shade14: number, shade15: number) {
    this.name = name;
    this.value = value;
    this.valueString = valueString;
    this.shade1 = shade1;
    this.shade2 = shade2;
    this.shade3 = shade3;
    this.shade4 = shade4;
    this.shade5 = shade5;
    this.shade6 = shade6;
    this.shade7 = shade7;
    this.shade8 = shade8;
    this.shade9 = shade9;
    this.shade10 = shade10;
    this.shade11 = shade11;
    this.shade12 = shade12;
    this.shade13 = shade13;
    this.shade14 = shade14;
    this.shade15 = shade15;
    this.shadeMap = new Map();
    this.shadeMap.set(0, value);
    this.shadeMap.set(1, shade1);
    this.shadeMap.set(2, shade2);
    this.shadeMap.set(3, shade3);
    this.shadeMap.set(4, shade4);
    this.shadeMap.set(5, shade5);
    this.shadeMap.set(6, shade6);
    this.shadeMap.set(7, shade7);
    this.shadeMap.set(8, shade8);
    this.shadeMap.set(9, shade9);
    this.shadeMap.set(10, shade10);
    this.shadeMap.set(11, shade11);
    this.shadeMap.set(12, shade12);
    this.shadeMap.set(13, shade13);
    this.shadeMap.set(14, shade14);
    this.shadeMap.set(15, shade15);
  }

  getShade(index: number): number {
    return this.shadeMap.get(index) || 0x000000;
  }

  static fromName(name: string): Color {
    switch (name) {
      case Color.RED.name :
        return Color.RED;
      case Color.ORANGE.name :
        return Color.ORANGE;
      case Color.PURPLE.name :
        return Color.PURPLE;
      case Color.WHITE.name :
        return Color.WHITE;
      case Color.BLUE.name :
        return Color.BLUE;
      case Color.GREEN.name :
        return Color.GREEN;
      case Color.YELLOW.name :
        return Color.YELLOW;
      case Color.CYAN.name :
        return Color.CYAN;
      case Color.CHARTREUSE.name :
        return Color.CHARTREUSE;
      case Color.DODGER_BLUE.name :
        return Color.DODGER_BLUE;
      case Color.DEEP_PINK.name :
        return Color.DEEP_PINK;
      case Color.BLACK.name :
        return Color.BLACK;
      default:
        console.warn("Unknown color " + name);
        return Color.BLACK;
    }

  }

  static BLUE: Color =           new Color("blue",        0x0000FF, "#0000FF", 0x0000EE, 0x0000DD, 0x0000CC, 0x0000BB, 0x0000AA, 0x000099, 0x000088, 0x000077,  0x000066, 0x000055, 0x000044, 0x000033, 0x000022, 0x000011, 0x000000);
  static RED: Color =            new Color("red",         0xFF0000, "#FF0000", 0xEE0000, 0xDD0000, 0xCC0000, 0xBB0000, 0xAA0000, 0x990000, 0x880000, 0x770000,  0x660000, 0x550000, 0x440000, 0x330000, 0x220000, 0x110000, 0x000000);
  static GREEN: Color =          new Color("green",       0x00FF00, "#00FF00", 0x00EE00, 0x00DD00, 0x00CC00, 0x00BB00, 0x00AA00, 0x009900, 0x008800, 0x007700,  0x006600, 0x005500, 0x004400, 0x003300, 0x002200, 0x001100, 0x000000);
  static PURPLE: Color =         new Color("purple",      0xFF00FF, "#FF00FF", 0xEE00EE, 0xDD00DD, 0xCC00CC, 0xBB00BB, 0xAA00AA, 0x990099, 0x880088, 0x770077,  0x660066, 0x550055, 0x440044, 0x330033, 0x220022, 0x110011, 0x000000);
  static YELLOW: Color =         new Color("yellow",      0xFFFF00, "#FFFF00", 0xEEEE00, 0xDDDD00, 0xCCCC00, 0xBBBB00, 0xAAAA00, 0x999900, 0x888800, 0x777700,  0x666600, 0x555500, 0x444400, 0x333300, 0x222200, 0x111100, 0x000000);
  static CYAN: Color =           new Color("cyan",        0x00FFFF, "#00FFFF", 0x00EEEE, 0x00DDDD, 0x00CCCC, 0x00BBBB, 0x00AAAA, 0x009999, 0x008888, 0x007777,  0x006666, 0x005555, 0x004444, 0x003333, 0x002222, 0x001111, 0x000000);

  static ORANGE: Color =         new Color("orange",      0xFF8800, "#FF8800", 0xEE8000, 0xDD7800, 0xCC7000, 0xBB6800, 0xAA6000, 0x995800, 0x885000, 0x774800,  0x664000, 0x553800, 0x443000, 0x332800, 0x222000, 0x110800, 0x000000);
  static DODGER_BLUE: Color =    new Color("dodger_blue", 0x0088FF, "#0088FF", 0x0080EE, 0x0078DD, 0x0070CC, 0x0068BB, 0x0060AA, 0x005899, 0x000811, 0x006EDD,  0x005DBB, 0x004C99, 0x003B77, 0x002A55, 0x001933, 0x000811, 0x000000);
  static CHARTREUSE: Color =     new Color("chartreuse",  0x88FF00, "#88FF00", 0x6EDD00, 0x5DBB00, 0x4C9900, 0x3B7700, 0x2A5500, 0x193300, 0x081100, 0x6EDD00,  0x5DBB00, 0x4C9900, 0x3B7700, 0x2A5500, 0x193300, 0x081100, 0x000000);
  static DEEP_PINK: Color =      new Color("deep_pink",   0xFF0088, "#FF0088", 0xDD006E, 0xBB005D, 0x99004C, 0x77003B, 0x55002A, 0x330019, 0x110008, 0xDD006E,  0xBB005D, 0x99004C, 0x77003B, 0x55002A, 0x330019, 0x110008, 0x000000);
  static WHITE: Color =          new Color("white",       0xFFFFFF, "#FFFFFF", 0xDDDDDD, 0xBBBBBB, 0x999999, 0x777777, 0x555555, 0x333333, 0x111111, 0xDDDDDD,  0xBBBBBB, 0x999999, 0x777777, 0x555555, 0x333333, 0x111111, 0x000000);
  static BLACK: Color =          new Color("black",       0x000000, "#000000", 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000,  0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000);

  static COLORS: Array<Color> = [Color.BLUE, Color.RED, Color.GREEN, Color.PURPLE, Color.YELLOW, Color.CYAN, Color.ORANGE, Color.DODGER_BLUE, Color.CHARTREUSE, Color.DEEP_PINK, Color.WHITE, Color.BLACK];

}

export default Color;