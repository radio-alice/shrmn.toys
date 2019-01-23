window.onload = pageScroll;
function pageScroll() {
  var ps = setInterval(scroll, 10);
  function scroll() {
  window.scrollBy(0, (Math.random() * 30) - 15);
  }
}
