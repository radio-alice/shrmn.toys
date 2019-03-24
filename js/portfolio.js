var coll = document.getElementsByClassName("collapsible");

window.onload = function() {
  coll[0].addEventListener("click", function(event) {
    this.classList.toggle("active");
    console.log('clikc');
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}