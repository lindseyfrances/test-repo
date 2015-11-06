var mic;
var fft;
var amp;
var x;
var y;
var eas;
var div;

// function preload(){
//   eas = loadImage("etchasketch.png");
// }

//FLY BY

function setup() {
  createCanvas(624, 442);
  // canvas.position(189, 184);
  background(200);
  

  mic = new p5.AudioIn();

  fft = new p5.FFT();
  fft.setInput(mic);

  amp = new p5.Amplitude();
  amp.setInput(mic);

  mic.start();
  fft.smooth(0.99);
  
  x = width;
  y = height;
  // image(eas, 0, 0, 200, 200);
}

function draw() {
  // div = createDiv(image(eas, 0, 0, eas.width, eas.height));
  //div = image(eas, 0, 0, eas.width, eas.height);
  // div.position(0,0);

  stroke(0);
  var vol = amp.getLevel();
  fft.analyze();

  for (var i = 0; i < 8; i++) {

    var w = map(vol, 0, 0.5, 0, width);
    var centerFreq = i / 2; //(pow(2, i) * 125) / 2;
    var loFreq = 1 //(pow(2, i - 1) * 125) / 2 + centerFreq / 4;
    var hiFreq = (centerFreq + centerFreq / 2);

    var freqValue = fft.getEnergy(loFreq, hiFreq - 1);

    var h = map(freqValue, 0, 255, 0, height) ;
  }
  
  //easing toward center instead of to 0 with two easing equations
  
  // print(freqValue);
  // print(vol);
  
  y+=(h-y)*.001;
  x+=(w-x)*.001;
  noStroke();
  fill(random(0,100));
  ellipse(x, y, 2, 2);
}