var canvas = document.getElementById('game')
var context = canvas.getContext('2d');

function onPageLoad() {
  console.log("Page Loaded");
}

function getCoordinates(e) {
  x = e.clientX;
  y = e.clientY;
  document.getElementById("xy").innerHTML = "Coordinates: (" + x + "," + y + ")";
}

function clearCoordinates() {
  document.getElementById("xy").innerHTML = "";
}

function buttonOnClick() {
  // alert("Booooommmmmm!!!");
  console.log("Button Pressed");
}

// Update Heads Up Display with Weapon Information
function weaponSelection() {
  console.log("weapon selection");
  var selection = document.getElementById("equipment").value;
  var active = document.getElementById("activated");
  if (active.checked == true) {
    document.getElementById("HUD").innerHTML = selection + " active ";
    console.log("Weapon Active");
  } else {
    document.getElementById("HUD").innerHTML = selection + " selected ";
    console.log("Weapon Selected");
  }
}

// Draw a HealthBar on Canvas, can be used to indicate players health
function drawHealthbar() {
  var width = 100;
  var height = 20;
  var max = 100;
  var val = 10;

  // Draw the background
  context.fillStyle = "#000000";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, width, height);

  // Draw the fill
  context.fillStyle = "#00FF00";
  var fillVal = Math.min(Math.max(val / max, 0), 1);
  context.fillRect(0, 0, fillVal * width, height);
}

// Array of Weapon Options
var options = [{
    "text": "Select a Weapon",
    "value": "No Weapon",
    "selected": true
  },
  {
    "text": "Spear",
    "value": "Javelin"
  },
  {
    "text": "Sword",
    "value": "Longsword"
  },
  {
    "text": "Crossbow",
    "value": "Pistol crossbow"
  }
];

var selectBox = document.getElementById('equipment');

for (var i = 0; i < options.length; i++) {
  var option = options[i];
  selectBox.options.add(new Option(option.text, option.value, option.selected));
}

drawHealthbar();