// player currency
var chippies = 200;



// this constructor creates a new netpet
var NetPet = function(hungerRate) {
  this.hungerValue = 100;
  this.hungerRate = hungerRate;

  this.getHungrier = function() { // add hunger over time
    hungerValue += hungerRate;
  };

  this.feed = function(foodValue) {
    this.hungerValue += foodValue;
    if (this.hungerValue >= 200) { // limit amount of feeding
      this.hungerValue = 200;
      $('.pet-display').text("I'm full!"); // .pet-display working class
    };
    $('.status-bar').text('Hunger: ' + this.hungerValue); // .status-bar working class
  };
}

// this constructor creates food items
var FoodItem = function(foodValue) {
  this.foodValue = foodValue;
}

// initialize new pet for testing
var Brian = new NetPet(3);

// create food
var cookie = new FoodItem(10);


// feed pet with feed button
$('#feed-button').on('click', function(event) {
  event.preventDefault();
  Brian.feed(cookie.foodValue);
});

$('#petName').hide();
$('#petDisplay').hide();
$('#petLog').hide();

  $("#pet1, #pet2, #pet3, #pet4").click(function (){
    $("#petChoose").hide();
  });
  $("#changePet").click(function (){
    $("#petChoose").show();
  });
