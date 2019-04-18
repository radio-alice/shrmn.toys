window.onload = start;
var vid;

function start () {
  vid = document.getElementById('myVideo').style;
}

function handler(e) {
    e = e || window.event;

    var pageX = e.pageX;
    var pageY = e.pageY;

    shift(pageX, pageY);
}

// attach handler to the mouse event of the document
if (document.attachEvent) document.attachEvent('mousemove', handler);
else document.addEventListener('mousemove', handler);

function shift(x, y){
  var hue = (x / window.innerWidth) * 360;
  var inv = ((y / window.innerHeight) * 20);
    if (inv > 10){
      inv += 90;
    }
  var blu = ((y / window.innerHeight) * 20) + 5;
  vid.filter = "hue-rotate(" + hue + "deg) invert(" + inv + "%) blur(" + blu+ "px) saturate(500%)";
}

var boys = ['🐵', '🙊', '🙉', '🙊', '🐒'];
var counter = 0;
function urlGoof () {
  location.hash = boys[counter%boys.length];
  counter++;
  setTimeout(urlGoof, 50);
}
urlGoof();