const NUM_LED_CENTRAL_1: number = 100;
const NUM_LED_CENTRAL_2: number = 100;
const NUM_LED_CONE: number = 24;
const NUM_LED_BIG_BALL_1: number = 10;
const NUM_LED_BIG_BALL_2: number = 10;
const NUM_LED_BIG_BALL_3: number = 10;
const NUM_LED_MEDIUM_BALL_1: number = 8;
const NUM_LED_MEDIUM_BALL_2: number = 8;
const NUM_LED_MEDIUM_BALL_3: number = 8;
const NUM_LED_MEDIUM_BALL_4: number = 8;
const NUM_LED_SMALL_BALL_1: number = 5;
const NUM_LED_SMALL_BALL_2: number = 5;
const NUM_LED_SMALL_BALL_3: number = -1;

const LED_OFF: number = 0x000000;
//
// const SECONDARY_NUM_LED = NUM_LED_CONE + NUM_LED_BIG_BALL_1 + NUM_LED_BIG_BALL_2 + NUM_LED_BIG_BALL_3
//     + NUM_LED_MEDIUM_BALL_1 + NUM_LED_MEDIUM_BALL_2 + NUM_LED_MEDIUM_BALL_3
//     + NUM_LED_SMALL_BALL_1 + NUM_LED_SMALL_BALL_2 + NUM_LED_SMALL_BALL_3
const SECONDARY_NUM_LED = NUM_LED_MEDIUM_BALL_1 + NUM_LED_SMALL_BALL_1 + NUM_LED_BIG_BALL_1 + NUM_LED_MEDIUM_BALL_1 +
    NUM_LED_BIG_BALL_2 + NUM_LED_MEDIUM_BALL_3 + NUM_LED_SMALL_BALL_2 + NUM_LED_BIG_BALL_3 + NUM_LED_MEDIUM_BALL_4 + NUM_LED_CONE;
const TOTAL_LED = NUM_LED_CENTRAL_1 + NUM_LED_CENTRAL_2 + SECONDARY_NUM_LED;

const DEFAULT_BPM: number = 125;

const getNumLed = (location: Location): number => {
  switch (location) {
    case Location.CENTRAL_1:
      return NUM_LED_CENTRAL_1;
    case Location.CENTRAL_2:
      return NUM_LED_CENTRAL_2;
    case Location.SECONDARY:
      return SECONDARY_NUM_LED;
    case Location.CONE:
      return NUM_LED_CONE;
    case Location.BIG_BALL_1:
      return NUM_LED_BIG_BALL_1;
    case Location.BIG_BALL_2:
      return NUM_LED_BIG_BALL_2;
    case Location.BIG_BALL_3:
      return NUM_LED_BIG_BALL_3;
    case Location.MEDIUM_BALL_1:
      return NUM_LED_MEDIUM_BALL_1;
    case Location.MEDIUM_BALL_2:
      return NUM_LED_MEDIUM_BALL_2;
    case Location.MEDIUM_BALL_3:
      return NUM_LED_MEDIUM_BALL_3;
    case Location.SMALL_BALL_1:
      return NUM_LED_SMALL_BALL_1;
    case Location.SMALL_BALL_2:
      return NUM_LED_SMALL_BALL_2;
    case Location.SMALL_BALL_3:
      return NUM_LED_SMALL_BALL_3;
    default:
      console.error("Unknown location", location);
      throw "Unknown location";
  }
};

enum Location {
  CENTRAL_1,
  CENTRAL_2,
  SECONDARY,
  CONE,
  BIG_BALL_1,
  BIG_BALL_2,
  BIG_BALL_3,
  MEDIUM_BALL_1,
  MEDIUM_BALL_2,
  MEDIUM_BALL_3,
  SMALL_BALL_1,
  SMALL_BALL_2,
  SMALL_BALL_3
}

export {
  Location,
  getNumLed,
  LED_OFF,
  TOTAL_LED,
  SECONDARY_NUM_LED,
  DEFAULT_BPM,
  NUM_LED_CENTRAL_1,
  NUM_LED_CENTRAL_2,
  NUM_LED_BIG_BALL_1,
  NUM_LED_BIG_BALL_2,
  NUM_LED_BIG_BALL_3,
  NUM_LED_CONE,
  NUM_LED_MEDIUM_BALL_1,
  NUM_LED_MEDIUM_BALL_2,
  NUM_LED_MEDIUM_BALL_3,
  NUM_LED_SMALL_BALL_1,
  NUM_LED_SMALL_BALL_2,
  NUM_LED_SMALL_BALL_3
};