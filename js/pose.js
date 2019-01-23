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
    button = select('#butt');
    loadImages();

    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);

    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, modelReady);
    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    poseNet.on('pose', function(results) {
      poses = results;
    });
    // Hide the video element, and just show the canvas
    video.hide();
  }

  function modelReady() {
    select('#status').html('Model Loaded');
  }

  function draw() {
    image(video, 0, 0, width, height);

    // We can call both functions to draw all keypoints and the skeletons
    drawKeypoints();
    button.mousePressed(switchPose);
  }

  function switchPose (){
    counter++;
    var c = counter % 4;
    if (c === 0){
      img = gw;
    }

    if (c === 1){
      img = hrm;
    }

    if (c === 2){
      img = logo;
    }

    if (c === 3){
      img = sp;
    }
    console.log('switched');
  }

  function loadImages(){
    gw[0] = loadImage('/poses/gw.png');
    gw[1] = loadImage('/poses/gwleft.png');
    gw[2] = loadImage('/poses/gwright.png');
    hrm[0] = loadImage('/poses/hrm.png');
    logo[0] = loadImage('/poses/logo.png');
    logo[1] = loadImage('/poses/logoleft.png');
    logo[2] = loadImage('/poses/logoright.png');
    sp[0] = loadImage('/poses/sp.png');
    sp[1] = loadImage('/poses/spleft.png');
    sp[2] = loadImage('/poses/spright.png');
    console.log('loaded');
    img = gw;
  }

  // A function to draw ellipses over the detected keypoints
  function drawKeypoints()  {
    // Loop through all the poses detected
    for (let i = 0; i < poses.length; i++) {
      // For each pose detected, loop through all the keypoints
      let pose = poses[i].pose.keypoints;

      let nose = pose[0];
      let left = pose[5];
      let right = pose[6];

      if (nose != undefined && img[0] != undefined && nose.score > 0.2) {
        image(img[0], nose.position.x - 150, nose.position.y - 150, 300, 300);
      }
      if (right != undefined && img[1] != undefined && right.score > 0.2) {
        image(img[1], right.position.x - 350, right.position.y - 120, 400, 300);
      }
      if (left != undefined && img[1] != undefined && left.score > 0.2) {
        image(img[2], left.position.x - 180, left.position.y - 150, 400, 300);
      }
    }
  }