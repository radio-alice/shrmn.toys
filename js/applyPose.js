function getVid(){
  var url = document.getElementsByTagName('iframe')[0].src;
  var video = document.getElementById('stream');
  video.setAttribute('src', url);
  console.log(url);
}