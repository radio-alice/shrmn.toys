var coll = document.getElementsByClassName("collapsible");

window.onload = function() {
  for (let i=0; i < coll.length; i++){
    coll[i].addEventListener("click", function(event) {
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
}