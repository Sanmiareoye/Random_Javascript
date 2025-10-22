const output = document.getElementById("output");
function date() {
  const p = new Date();
  console.log(p);
  output.innerHTML = `Time ${p.toLocaleTimeString()}`;
}

function updateT(time) {
  setInterval(time, 1000);
}

function updatedT() {
  updateT(date);
}

document.addEventListener("DOMContentLoaded", updatedT);
