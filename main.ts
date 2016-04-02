function $ (id) { return document.getElementById(id); }
function create(tag, attr) { 
  var el = document.createElement(tag);
  if (attr) {
    for (var key in attr) {
      el[key] = attr[key];
    }
  }
  return el; 
}

window.onload = function() {
  var div = $("div");
  div.appendChild(create("p", { textContent: "Hello world" }));
};