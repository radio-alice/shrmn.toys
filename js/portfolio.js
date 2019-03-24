var coll = document.getElementsByClassName("collapsible");
console.log(coll);
for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function(event) {
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