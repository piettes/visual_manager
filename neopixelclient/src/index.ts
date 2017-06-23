import * as express from "express";
import CanvasNeopixel from "./CanvasNeopixel";
import {Canvas} from "../../animations/index";

const app = express();

const canvas: Canvas = new CanvasNeopixel();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function (req: any, res: any) {
  res.send("Hello World!");
});

app.get("/anim/:anim", function (req: any, res: any) {
  console.log("Hello World! " + req.params.anim);
  res.send("Hello World! " + req.params.anim);
});

app.get("/setManual/:bool", function (req: any, res: any) {
  canvas.setManual(req.params.bool === "true");
  res.send("OK");
});

app.get("/tick", function (req: any, res: any) {
  canvas.incTicker();
  res.send("OK");
});


app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

process.on("SIGINT", function () {
  canvas.reset();
  process.nextTick(function () {
    process.exit(0);
  });
});

console.log("Press <ctrl>+C to exit.");

// function initWs() {
//   let ws281x: Ws281x = require("rpi-ws281x-native");
//
//   const NUM_LEDS = 30 * 4 * 6;
//   const pixelData = new Uint32Array(NUM_LEDS);
//
//   ws281x.init(NUM_LEDS);
//
// // ---- trap the SIGINT and reset before exit
//   process.on("SIGINT", function () {
//     ws281x.reset();
//     process.nextTick(function () { process.exit(0); });
//   });
//
// // ---- animation-loop
//   let offset = 0;
//   setInterval(function () {
//     for (let i = 0; i < NUM_LEDS; i++) {
//       pixelData[i] = colorwheel((offset + i) % 256);
//     }
//
//     offset = (offset + 1) % 256;
//     ws281x.setBrightness(10);
//     ws281x.render(pixelData);
//   }, 1000 / 30);
//
// }


// // rainbow-colors, taken from http://goo.gl/Cs3H0v
// function colorwheel(pos: any) {
//   pos = 255 - pos;
//   if (pos < 85) { return rgb2Int(255 - pos * 3, 0, pos * 3); }
//   else if (pos < 170) { pos -= 85; return rgb2Int(0, pos * 3, 255 - pos * 3); }
//   else { pos -= 170; return rgb2Int(pos * 3, 255 - pos * 3, 0); }
// }
//
// function rgb2Int(r: any, g: any, b: any) {
//   return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
// }
