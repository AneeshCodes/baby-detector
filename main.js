status = "";
label = "";
x = 0
y = 0
confidenceMain = 0
width = 0
height = 0
objects = []
alarm = ""

function preload() {
  alarm = loadSound('christmas_bells.mp3')
}

function setup() {
 
  canvas = createCanvas(500, 400)
  canvas.center()
  video = createCapture(VIDEO)
  video.hide()
  objectDetector = ml5.objectDetector('cocossd', modelLoaded)
  document.getElementById('status').innerHTML = 'Detecting Objects';
}

function modelLoaded() {
  console.log('Model Is Loaded');
  status = true;
  objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error)
  }
  else {
    console.log(results);
    objects = results
  }
}

function draw() {
  objectDetector = ml5.objectDetector('cocossd', modelLoaded)
  document.getElementById('status').innerHTML = 'Detecting Objects';
  image(video, 0, 0, 500, 400)
    if (status != '') {
      r = random(255)
      g = random(255)
      b = random(255)
      for (i = 0; i < objects.length; i++) {
        document.getElementById('status').innerHTML = 'Objects have been Detected';
        confidence1 = objects[i].confidence;
        confidenceMain = (confidence1.toFixed(2) * 100)
        label = objects[i].label;
        x = objects[i].x;
        y = objects[i].y;
        width = objects[i].width;
        height = objects[i].height;
        fill(r,g,b)
        text(label + ' ' + confidenceMain + '%', x, y)
        noFill()
        stroke(r,g,b)
        textSize(13)
        rect(x, y, width, height)
        
        if(label == 'person'){
          alarm.stop()
          document.getElementById('status').innerHTML = 'Baby found';
        }
        else{
          alarm.play()
          document.getElementById('status').innerHTML = 'Baby not found';
        }
      }
    }
    if(objects.length == 0){
      alarm.play()
      document.getElementById('status').innerHTML = 'Baby not found';
    }
}