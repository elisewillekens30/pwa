function pageLoaded() {
// Array of Weapon Options
var options = [{
    "text": "Select a Character",
    "value": "mario",
    "selected": true
  },
  {
    "text": "Mario",
    "value": "mario"
  },
  {
    "text": "Lutin",
    "value": "santa"
  }
];

var selectBox = document.getElementById('character');

for (var i = 0; i < options.length; i++) {
  var option = options[i];
  selectBox.options.add(new Option(option.text, option.value, option.selected));
}

};

  
