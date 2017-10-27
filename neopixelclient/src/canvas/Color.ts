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

  constructor(name: string, value: number, valueString: string, shade1: number, shade2: number, shade3: number, shade4: number, shade5: number, shade6: number, shade7: number) {
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
    this.shadeMap = new Map();
    this.shadeMap.set(0, value);
    this.shadeMap.set(1, shade1);
    this.shadeMap.set(2, shade2);
    this.shadeMap.set(3, shade3);
    this.shadeMap.set(4, shade4);
    this.shadeMap.set(5, shade5);
    this.shadeMap.set(6, shade6);
    this.shadeMap.set(7, shade7);
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

  static BLUE: Color = new Color("blue", 0x0000FF, "#0000FF", 0x0000DD, 0x0000BB, 0x000099, 0x000077, 0x000055, 0x000033, 0x000011);
  static RED: Color = new Color("red", 0xFF0000, "#FF0000", 0xDD0000, 0xBB0000, 0x990000, 0x770000, 0x550000, 0x330000, 0x110000);
  static GREEN: Color = new Color("green", 0x00FF00, "#00FF00", 0x00DD00, 0x00BB00, 0x009900, 0x007700, 0x005500, 0x003300, 0x001100);
  static PURPLE: Color = new Color("purple", 0xFF00FF, "#FF00FF", 0xDD00DD, 0xBB00BB, 0x990099, 0x770077, 0x550055, 0x330033, 0x110011);
  static YELLOW: Color = new Color("yellow", 0xFFFF00, "#FFFF00", 0xDDDD00, 0xBBBB00, 0x999900, 0x777700, 0x555500, 0x333300, 0x111100);
  static CYAN: Color = new Color("cyan", 0x00FFFF, "#00FFFF", 0x00DDDD, 0x00BBBB, 0x009999, 0x007777, 0x005555, 0x003333, 0x001111);
  static ORANGE: Color = new Color("orange", 0xFF8800, "#FF8800", 0xDD6e00, 0xBB5D00, 0x994C00, 0x773B00, 0x552A00, 0x331900, 0x110800);
  static DODGER_BLUE: Color = new Color("dodger_blue", 0x0088FF, "#0088FF", 0x006EDD, 0x005DBB, 0x004C99, 0x003B77, 0x002A55, 0x001933, 0x000811);
  static CHARTREUSE: Color = new Color("chartreuse", 0x88FF00, "#88FF00", 0x6EDD00, 0x5DBB00, 0x4C9900, 0x3B7700, 0x2A5500, 0x193300, 0x081100);
  static DEEP_PINK: Color = new Color("deep_pink", 0xFF0088, "#FF0088", 0xDD006E, 0xBB005D, 0x99004C, 0x77003B, 0x55002A, 0x330019, 0x110008);
  static WHITE: Color = new Color("white", 0xFFFFFF, "#FFFFFF", 0xDDDDDD, 0xBBBBBB, 0x999999, 0x777777, 0x555555, 0x333333, 0x111111);
  static BLACK: Color = new Color("black", 0x000000, "#000000", 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000);

  static COLORS: Array<Color> = [Color.BLUE, Color.RED, Color.GREEN, Color.PURPLE, Color.YELLOW, Color.CYAN, Color.ORANGE, Color.DODGER_BLUE, Color.CHARTREUSE, Color.DEEP_PINK, Color.WHITE, Color.BLACK];

}

export default Color;