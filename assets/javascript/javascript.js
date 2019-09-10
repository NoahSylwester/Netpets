// player currency
var chippies = 100;

// game score
var score = 0;

var updateChippies = function() {
  score = localStorage.getItem('score');
  if (score > 0) {
    chippies += score/2;
  }
  localStorage.setItem('score', 0); 
  score = 0;
};

var petId = "doux";
var petName = "";
var petArr = [];
var currentPet = 0;
var feedBtnValue = 3;

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
      $('#pet-words').text("I'm full!");
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

//start page load with all content hidden except petChoose page
$('#petName').hide();
$('#petDisplay').hide();
$('#petLog').hide();
$('#petStore').hide();
$('#miniGames').hide();
$('#fruit').hide();
$('#chase').hide();
$('#race').hide();
$('#follow').hide();

// pet selection
$("#pet1").click(function () {
  $("#petChoose").hide();
  $('#petName').show();
  petId = "doux";
  $(".pet-sprite").attr({ "src": "./assets/gifs/DinoSprites_doux.gif" });
  petArr.push(new NetPet(petName, 100));
});

$("#pet2").click(function () {
  $("#petChoose").hide();
  $('#petName').show();
  petId = "mort";
  $(".pet-sprite").attr({ "src": "./assets/gifs/DinoSprites_mort.gif" });
  petArr.push(new NetPet(petName, 100));
});

$("#pet3").click(function () {
  $("#petChoose").hide();
  $('#petName').show();
  petId = "sally";
  $(".pet-sprite").attr({ "src": "./assets/gifs/DinoSprites_tard.gif" });
  petArr.push(new NetPet(petName, 100));
});

$("#pet4").click(function () {
  $("#petChoose").hide();
  $('#petName').show();
  petId = "vita";
  $(".pet-sprite").attr({ "src": "./assets/gifs/DinoSprites_vita.gif" });
  petArr.push(new NetPet(petName, 100));
});

$('#save-name').on('click', function () {
  petName = $('#pet-name-input').val().trim();
  if (petName === "") {
    petName = petId.charAt(0).toUpperCase() + petId.slice(1);
  }
  $('#pet-home-link').text(petName);
  $("#petName").hide();
  $("#petDisplay").show();
});

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
  updateChippies();
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
  updateChippies();
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
  updateChippies();
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
  updateChippies();
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
  var game = $(`<iframe src="./minigames/index.html?petId=${petId}"></iframe>`);
  $('.game-window-fruit').html(game);
});

$("#game2").click(function () {
  $("#petStore").hide();
  $('#petDisplay').hide();
  $('#miniGames').hide();
  $('#petLog').hide();
  $('#fruit').show();
  $('#chase').hide();
  $('#race').hide();
  $('#follow').hide();
  var game = $(`<iframe src="./minigames/chasegame/index.html?petId=${petId}"></iframe>`);
  $('.game-window-fruit').html(game);
});

$("#game3").click(function () {
  $("#petStore").hide();
  $('#petDisplay').hide();
  $('#miniGames').hide();
  $('#petLog').hide();
  $('#fruit').show();
  $('#chase').hide();
  $('#race').hide();
  $('#follow').hide();
  var game = $(`<iframe src="./minigames/racegame/index.html?petId=${petId}"></iframe>`);
  $('.game-window-fruit').html(game);
});

$("#game4").click(function () {
  $("#petStore").hide();
  $('#petDisplay').hide();
  $('#miniGames').hide();
  $('#petLog').hide();
  $('#fruit').show();
  $('#chase').hide();
  $('#race').hide();
  $('#follow').hide();
  var game = $(`<iframe src="./minigames/followgame/index.html?petId=${petId}"></iframe>`);
  $('.game-window-fruit').html(game);
});

//array of images that will change body background image depending on local weather
var weatherPicArray = [
  "../images/jean-luc-crucifix-19tQv51x4-A-unsplash.jpg",
  "../images/linh-nguyen-xjXz8GKXcTI-unsplash.jpg",
  "../images/nils-rasmusson-NXNU0vvMwXo-unsplash.jpg",
  "../images/riley-pope-_52HIBqdGYc-unsplash.jpg"
];

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

// activity log page 
$('#feed-button').on('click', function (event) {
  event.preventDefault();
  var currentTime = new Date();
  var care = "feed";
  database.ref().update({ currentTime: currentTime, type:care, name:petName })
});
$('#love-button').on('click', function (event) {
  event.preventDefault();
  var currentTime = new Date();
  var care = "love";
  database.ref().update({ currentTime: currentTime, type:care, name:petName })
});

//current time stamps append to activity log in the table
$("#feed-button").on("click", function (table) {
  var today = Date();
  var getTime = today.toString()
  var type = 'Feed';
  // var tableBody = $('#timestamp-table');
  var newRow = $('<tr>').attr("class", "row-type").append(
    $('<td>').text(type),
    $('<td>').text(getTime)
  );
  $('#content-body').prepend(newRow);
});

$("#love-button").on("click", function (table) {
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

$("#feed-button").on("click", function() {
  feedBtnValue --;
  $("#feedBadge").html(feedBtnValue);
  //needs to stop at 0 though.
});

$("#buy1").on("click", function(){
  chippies = chippies-50;
  $("#chippiesLeft").html(chippies);
});

