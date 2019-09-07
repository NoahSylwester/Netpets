// player currency
var chippies = 200;

var petId = "";
var petName = "";
var petArr = [];
var currentPet = 0;

// this constructor creates a new netpet
var NetPet = function (name, hungerRate) {
  this.name = name,
    this.hungerValue = 100;
  this.hungerRate = hungerRate;

  this.getHungrier = function () { // add hunger over time
    hungerValue += hungerRate;
  };

  this.feed = function (foodValue) {
    this.hungerValue += foodValue;
    if (this.hungerValue >= 200) { // limit amount of feeding
      this.hungerValue = 200;
      $('.pet-display').text("I'm full!"); // .pet-display working class
    };
    $('.status-bar').text('Hunger: ' + this.hungerValue); // .status-bar working class
  };
}

// this constructor creates food items
var FoodItem = function (foodValue) {
  this.foodValue = foodValue;
}

// initialize new pet for testing
var Brian = new NetPet(Brian, 3);

// create food
var cookie = new FoodItem(10);


// feed pet with feed button
$('#feed-button').on('click', function (event) {
  event.preventDefault();
  petArr[currentPet].feed(cookie.foodValue);
});

$('#petName').hide();
$('#petDisplay').hide();
$('#petLog').hide();
$('#petStore').hide();
$('#miniGames').hide();
$('#fruit').hide();
$('#chase').hide();
$('#race').hide();
$('#follow').hide();



// //Storing into a variable
// //appending rows whenever a function is pushed, this will log the time stamp
// var timeStamp = childSnapshot.val().time
// var petCare = childSnapshot.val().
// var newRow = $('<tr>').append(
//  $('<td>'.text(timeStamp)
// )

// pet selection
$("#pet1").click(function () {
  $("#petChoose").hide();
  $('#petName').show();
  petId = "Doux";
  $(".pet-sprite").attr({ "src": "./assets/gifs/DinoSprites_doux.gif" });
  petArr.push(new NetPet(petName, 100));
});
$("#pet2").click(function () {
  $("#petChoose").hide();
  $('#petName').show();
  petId = "Mort";
  $(".pet-sprite").attr({ "src": "./assets/gifs/DinoSprites_mort.gif" });
  petArr.push(new NetPet(petName, 100));
});
$("#pet3").click(function () {
  $("#petChoose").hide();
  $('#petName').show();
  petId = "Tard";
  $(".pet-sprite").attr({ "src": "./assets/gifs/DinoSprites_tard.gif" });
  petArr.push(new NetPet(petName, 100));
});
$("#pet4").click(function () {
  $("#petChoose").hide();
  $('#petName').show();
  petId = "Vita";
  $(".pet-sprite").attr({ "src": "./assets/gifs/DinoSprites_vita.gif" });
  petArr.push(new NetPet(petName, 100));
});



$('#save-name').on('click', function () {
  petName = $('#pet-name-input').val().trim();
  if (petName === "") {
    petName = petId;
  }
  $('#pet-home-link').text(petName);
  $("#petName").hide();
  $("#petDisplay").show();
})

$("#store").click(function () {
  $("#petChoose").hide();
  $("#petName").hide();
  $("#petStore").show();
  $('#petDisplay').hide();
  $('#miniGames').hide();
  $('#petLog').hide();
  $('#fruit').hide();
  $('#chase').hide();
  $('#race').hide();
  $('#follow').hide();
});

$("#log").click(function () {
  $("#petChoose").hide();
  $("#petName").hide();
  $("#petStore").hide();
  $('#petDisplay').hide();
  $('#miniGames').hide();
  $('#petLog').show();
  $('#fruit').hide();
  $('#chase').hide();
  $('#race').hide();
  $('#follow').hide();
});

$("#collect-chippies").click(function () {
  $("#petChoose").hide();
  $("#petName").hide();
  $("#petStore").hide();
  $('#petDisplay').hide();
  $('#miniGames').show();
  $('#petLog').hide();
  $('#fruit').hide();
  $('#chase').hide();
  $('#race').hide();
  $('#follow').hide();
});

$("#pet-home-link").click(function () {
  $("#petChoose").hide();
  $("#petName").hide();
  $("#petStore").hide();
  $('#petDisplay').show();
  $('#miniGames').hide();
  $('#petLog').hide();
  $('#fruit').hide();
  $('#chase').hide();
  $('#race').hide();
  $('#follow').hide();
});

$("#game1").click(function () {
  $("#petStore").hide();
  $('#petDisplay').hide();
  $('#miniGames').hide();
  $('#petLog').hide();
  $('#fruit').show();
  $('#chase').hide();
  $('#race').hide();
  $('#follow').hide();
});

$("#game2").click(function () {
  $("#petStore").hide();
  $('#petDisplay').hide();
  $('#miniGames').hide();
  $('#petLog').hide();
  $('#fruit').hide();
  $('#chase').show();
  $('#race').hide();
  $('#follow').hide();
});

$("#game3").click(function () {
  $("#petStore").hide();
  $('#petDisplay').hide();
  $('#miniGames').hide();
  $('#petLog').hide();
  $('#fruit').hide();
  $('#chase').hide();
  $('#race').show();
  $('#follow').hide();
});

$("#game4").click(function () {
  $("#petStore").hide();
  $('#petDisplay').hide();
  $('#miniGames').hide();
  $('#petLog').hide();
  $('#fruit').hide();
  $('#chase').hide();
  $('#race').hide();
  $('#follow').show();
});
// weather API calls
var coordinates = [];
var weatherCondition = "Clear";
window.onload = function () {
  var startPos;
  var geoSuccess = function (position) {
    startPos = position;
    coordinates[0] = startPos.coords.latitude;
    coordinates[1] = startPos.coords.longitude;
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/weather?appid=c28057a1359b867949b94e14058a8e1a&lat=${coordinates[0]}&lon=${coordinates[1]}`,
      method: "GET"
    }).then((response) => {
      // possible weather conditions:
      // "Clear" -- sunny
      // "Clouds" -- cloudy
      // "Snow"
      // "Rain" or "Drizzle"
      // "Thunderstorm"
      weatherCondition = response.weather[0].main;
    });
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};


//firebase script link

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB2-iC_UGBuJwHLq98-xnOS6Q6izNH5vts",
  authDomain: "netpet-a7d7a.firebaseapp.com",
  databaseURL: "https://netpet-a7d7a.firebaseio.com",
  projectId: "netpet-a7d7a",
  storageBucket: "",
  messagingSenderId: "407927560249",
  appId: "1:407927560249:web:a2c1240e29efb5ec9c95e8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

//time stamps for the activity log 

function createUser(name){
var id = generateRandomId();
database.ref(id).set(name)
.then(function(snapshot){ 
  localStorage.setItem('NetPet', id)
  console.log(localStorage)
  console.log("create user returns: ", snapshot)
}).catch(function(error){
  console.log("error in create user: ", error)
})
}
createUser("Eric");
createUser("Maltida");
createUser("Stephania");


function generateRandomId (){
  var id = "";
  for ( var i = 0; i < 10; i++){
    id += Math.floor(Math.random()* 10) 
  }
  return id;
}

// activity log page 











$('#feed-button').on('click', function (event) {
  event.preventDefault();
  var currentTime = new Date();
  database.ref().update({ currentTime: currentTime })
});

$('#love-button').on('click', function (event) {
  event.preventDefault();
  var currentTime = new Date();
  database.ref().update({ currentTime: currentTime })
});

//current time stamps append to activity log in the table

$("#feed-button").on("click" , function(table) {

var today = Date();
var getTime = today.toString()
var type = 'Feed';
// var tableBody = $('#timestamp-table');

var newRow = $('<tr>').attr("class", "row-type").append(
   $('<td>').text(type),
  $('<td>').text(getTime)
);

$('#content-body').prepend(newRow);

$("#love-button").on("click" , function(table) {

var today = Date();
var getTime = today.toString()
var type = 'Love';
// var tableBody = $('#timestamp-table');

var newRow = $('<tr>').attr("class", "row-type").append(
   $('<td>').text(type),
  $('<td>').text(getTime)
);

$('#content-body').prepend(newRow);

});

