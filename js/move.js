function myMove(x) {
  var new_row = [];
  var container = document.getElementById('container');
  var posx = [];
  var posy = [];
  var vx = [];
  var vy = [];
  var w = window.innerWidth;
  var h = window.innerHeight;
  var id = setInterval(frame, 15);
  var counter = 0;

  for (var i = 0; i < x; i++) {
    new_row[i] = document.createElement('div');
    new_row[i].style.position = "absolute";
    posx[i] = (Math.floor(Math.random() * w));
    posy[i] = (Math.floor(Math.random() * h));
    vx[i] = ((Math.random() * 20) - 10);
    vy[i] = ((Math.random() * 20) - 10);
    new_row[i].style.top = posy[i] + 'px';
    new_row[i].style.left = posx[i] + 'px';

    var btn = document.createElement("BUTTON");
    btn.style.transformOrigin = 'center';
    btn.style.position = 'relative';
    btn.style.transform = 'rotate('+(Math.random()*360)+'deg)';
    var t = document.createTextNode(" HELP ME !! ");
    
    btn.appendChild(t);
    new_row[i].appendChild(btn);
    container.appendChild(new_row[i]);
  }

  var clar = document.getElementById('clar');
  var cpx = (Math.floor(Math.random() * w));
  var cpy = (Math.floor(Math.random() * h));
  var cvx = (Math.random() * 40) - 20;
  var cvy = (Math.random() * 40) - 20;
  clar.style.top = cpx;
  clar.style.top = cpy;

  function frame() {
    w = window.innerWidth;
    h = window.innerHeight;
    counter++;


    for (var i = 0; i < new_row.length; i++) {
      let btn_i = new_row[i].childNodes[0];
      if (posx[i] <= 0 || posx[i] >= (w - 100)) {
        posx[i] = (Math.floor(Math.random() * w));
        vx[i] = (Math.floor((Math.random() * 20) - 10));
      } else if (posy[i] <= 0 || posy[i] >= (h - 100)) {
        posy[i] = (Math.floor(Math.random() * h));
        vy[i] = (Math.floor((Math.random() * 20) - 10));
      }

        posx[i] += vx[i] + ((20 * Math.random()) - 10);
        posy[i] += vy[i] + ((20 * Math.random()) - 10);
        new_row[i].style.top = posy[i] + 'px';
        new_row[i].style.left = posx[i] + 'px';
        if (counter % 5 == 0){
          btn_i.style.transform = 'rotate('+(Math.random()*360)+'deg)';
        }
      }

      if (counter % 6 == 0) {
        var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (
          Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        container.style.backgroundColor = hue;
      }

    moveImg();
  }

  function moveImg() {
    if (cpx <= 0 ||  cpx >= (w - 10)) {
      cvx *= -1;
    } else if (cpy <= 0 || cpy >= (h - 10)) {
      cvy *= -1;
    }
      cpx += cvx;
      cpy += cvy;
      clar.style.top = cpy + 'px';
      clar.style.left = cpx + 'px';
  }
}
