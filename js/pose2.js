let video;
let poseNet;
let poses = [];
let button;
let sp = [];
let gw = [];
let logo = [];
let hrm = [];
let img = [];
var counter = 0;

function setup() {
  loadImages();

  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, 'single');
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function draw() {
  image(video, 0, 0, width, height);
  drawKeypoints();
}

function loadImages(){
  img_urls = [...Array(5).keys()];
  for (let i = 0; i < img_urls.length; i++) {
    img.push(loadImage('poses/' + (img_urls[i]+1) + '.png'))
  }
  console.log('loaded');
}

function drawKeypoints()  {
  // Loop through all poses detected
  for (let i = 0; i < poses.length; i++) {
    let left = poses[i].pose.keypoints[5];
    let right = poses[i].pose.keypoints[6];
    let img_i = i;
    if (left != undefined && right != undefined && left.score > .2 && right.score > .2){
      let posX = abs(left.position.x - right.position.x);
      let posY = abs(left.position.y - right.position.y);
      let size = sqrt((posX)^2 + (posY)^2);
      image(img[img_i], posX - (25*size), posY, 50*size, 50*size);
    } else if (left!= undefined && left.score > .2) {
      image(img[img_i], left.position.x - 400, left.position.y - 400, 800, 800);
    } else if (right!= undefined && right.score > .2) {
      image(img[img_i], right.position.x, right.position.y - 50, 800, 800);
    }
  }
}