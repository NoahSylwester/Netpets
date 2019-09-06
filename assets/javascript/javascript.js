// player currency
var chippies = 200;

var petId = "";
var petName = "";
var petArr = [];
var currentPet = 0;

// this constructor creates a new netpet
var NetPet = function(name, hungerRate) {
  this.name = name,
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
var Brian = new NetPet(Brian, 3);

// create food
var cookie = new FoodItem(10);


// feed pet with feed button
$('#feed-button').on('click', function(event) {
  event.preventDefault();
  petArr[currentPet].feed(cookie.foodValue);
});

$('#petName').hide();
$('#petDisplay').hide();
$('#petLog').hide();
$('#petStore').hide();


// //Storing into a variable
// //appending rows whenever a function is pushed, this will log the time stamp
// var timeStamp = childSnapshot.val().time
// var petCare = childSnapshot.val().
// var newRow = $('<tr>').append(
//  $('<td>'.text(timeStamp)
// )

// pet selection
  $("#pet1").click(function (){
    $("#petChoose").hide();
    $('#petName').show();
    petId = "Doux";
    $(".pet-sprite").attr({"src":"./assets/gifs/DinoSprites_doux.gif"});
    petArr.push(new NetPet(petName, 100));
  });
  $("#pet2").click(function (){
    $("#petChoose").hide();
    $('#petName').show();
    petId = "Mort";
    $(".pet-sprite").attr({"src":"./assets/gifs/DinoSprites_mort.gif"});
    petArr.push(new NetPet(petName, 100));
  });
  $("#pet3").click(function (){
    $("#petChoose").hide();
    $('#petName').show();
    petId = "Tard";
    $(".pet-sprite").attr({"src":"./assets/gifs/DinoSprites_tard.gif"});
    petArr.push(new NetPet(petName, 100));
  });
  $("#pet4").click(function (){
    $("#petChoose").hide();
    $('#petName').show();
    petId = "Vita";
    $(".pet-sprite").attr({"src":"./assets/gifs/DinoSprites_vita.gif"});
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

  $("#store").click(function (){
    $("#petStore").show();
    $('#petDisplay').hide();
  });

// weather API calls
var coordinates = [];
var weatherCondition = "Clear";
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
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

$('#feed-button').on('click' , function(event){
  event.preventDefault();
  var currentTime = new Date();
  database.ref().update({currentTime:currentTime})
});
$('#play-button').on('click' , function(event){
  event.preventDefault();
  var currentTime = new Date();
  database.ref().update({currentTime:currentTime})
});
$('#potty-button').on('click' , function(event){
  event.preventDefault();
  var currentTime = new Date();
  database.ref().update({currentTime:currentTime})
});
$('#love-button').on('click' , function(event){
  event.preventDefault();
  var currentTime = new Date();
  database.ref().update({currentTime:currentTime})
});
$('#sleep-button').on('click' , function(event){
  event.preventDefault();
  var currentTime = new Date();
  database.ref().update({currentTime:currentTime})
});

//current time stamps append to activity log in the table
$("#feed-button").on("click" , function(table){
var timeTable = event.timeStamp;
var type = "";
document.getElementById('time').innerHTML = timeTable;

if( type = 'Feed'){
 document.getElementById('type').innerHTML = type;
}
// $("#petCareTable").append("<tr>");
// $("#petCareTable").append("<td>");
});

