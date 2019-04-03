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
    poseNet = ml5.poseNet(video);
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
      let size = sqrt((left.position.x - right.position.x)^2 +
        (left.position.y - right.position.y)^2)
      let img_i = i%16;
      if (pose != undefined && img[img_i] != undefined && pose.score > 0.2) {
        image(img[img_i], pose.position.x, pose.position.y, 200*size, 200*size);
      }
    }
  }