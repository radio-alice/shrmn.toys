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
    poseNet = ml5.poseNet(video, 'multiple');
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

    // We can call both functions to draw all keypoints and the skeletons
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
      let pose = poses[i].pose.keypoints[5];
      img %= 16;
      if (pose != undefined && img[i] != undefined && pose.score > 0.2) {
        image(img[i], pose.position.x - 150, pose.position.y - 150, 300, 300);
      }
    }
  }