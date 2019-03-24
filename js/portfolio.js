var coll = document.getElementsByClassName("collapsible");

window.onload = function() {
  coll[0].addEventListener("click", function(event) {
    this.classList.toggle("active");
    console.log('clikc');
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}