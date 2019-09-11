// player currency
var chippies = 100;

// start with some food
var steaks = 3;

// game score
var score = 0;

// set pet hunger
var hunger;

var updateChippies = function() {
  score = localStorage.getItem('score');
  if (score > 0) {
    chippies += score/2;
  }
  localStorage.setItem('score', 0); 
  score = 0;
  $("#chippiesLeft").html(chippies)
};

var petId = "doux";
var petName = "";
var petArr = [];
var currentPet = 0;


// this constructor creates a new netpet
var NetPet = function (name, hungerRate) {
  this.name = name;
  this.hungerValue = 100;
  this.hungerRate = hungerRate;

  this.getHungrier = function () { // add hunger over time
    if (this.hungerValue > 0) {
      this.hungerValue -= this.hungerRate;
    }
    else if (this.hungerValue < 0) {
      this.hungerValue = 0;
    }
    if (this.hungerValue === 0) {
      heart.hungerText = true;
    }
    else {
      heart.hungerText = false;
    }
  };

  this.feed = function (foodValue) {
    this.hungerValue += foodValue;
    if (this.hungerValue >= 200) { // limit amount of feeding
      this.hungerValue = 200;
      heart.fullText = true;
      setTimeout(() => {
        heart.fullText = false;
      }, 1500);
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
  $('#pet-display-sprite').attr({"src": `./assets/sheets/DinoSprites - ${petId}.png`});
  $('#pet-display-sprite-reverse').attr({"src": `./assets/sheets/DinoSprites - ${petId} reverse.png`});
  $(".pet-sprite").attr({ "src": "./assets/gifs/DinoSprites_doux.gif" });
  petArr.push(new NetPet(petName, 10));
  hunger = setInterval(function() {
    petArr[0].getHungrier()
  }, 10000);
});

$("#pet2").click(function () {
  $("#petChoose").hide();
  $('#petName').show();
  petId = "mort";
  $('#pet-display-sprite').attr({"src": `./assets/sheets/DinoSprites - ${petId}.png`});
  $('#pet-display-sprite-reverse').attr({"src": `./assets/sheets/DinoSprites - ${petId} reverse.png`});
  $(".pet-sprite").attr({ "src": "./assets/gifs/DinoSprites_mort.gif" });
  petArr.push(new NetPet(petName, 10));
  hunger = setInterval(function() {
    petArr[0].getHungrier()
  }, 10000);
});

$("#pet3").click(function () {
  $("#petChoose").hide();
  $('#petName').show();
  petId = "sally";
  $('#pet-display-sprite').attr({"src": `./assets/sheets/DinoSprites - ${petId}.png`});
  $('#pet-display-sprite-reverse').attr({"src": `./assets/sheets/DinoSprites - ${petId} reverse.png`});
  $(".pet-sprite").attr({ "src": "./assets/gifs/DinoSprites_tard.gif" });
  petArr.push(new NetPet(petName, 10));
  hunger = setInterval(function() {
    petArr[0].getHungrier()
  }, 10000);
});

$("#pet4").click(function () {
  $("#petChoose").hide();
  $('#petName').show();
  petId = "vita";
  $('#pet-display-sprite').attr({"src": `./assets/sheets/DinoSprites - ${petId}.png`});
  $('#pet-display-sprite-reverse').attr({"src": `./assets/sheets/DinoSprites - ${petId} reverse.png`});
  $(".pet-sprite").attr({ "src": "./assets/gifs/DinoSprites_vita.gif" });
  petArr.push(new NetPet(petName, 10));
  hunger = setInterval(function() {
    petArr[0].getHungrier()
  }, 10000);
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

localStorage.setItem('return', "false");
setInterval(function() { // handles return button within games
  if (localStorage.getItem('return') === "true") {
    $("#petStore").hide();
    $('#petDisplay').show();
    $('#miniGames').hide();
    $('#petLog').hide();
    $('#fruit').hide();
    $('#chase').hide();
    $('#race').hide();
    $('#follow').hide();
    localStorage.setItem('return', "false");
  }
}, 100);


var determineBackgroundFromWeather = function() {
  //array of images that will change body background image depending on local weather
  var weatherPicArray = [
    "./assets/images/cloudy.jpg",
    "./assets/images/rainy.jpg",
    "./assets/images/snowy.jpg",
    "./assets/images/sunny.jpg",
    "./assets/images/stormy.jpg"
  ];
  var index = 0;
  switch(weatherCondition) {
    case "Clear":
      index = 3;
      break;
    case "Clouds":
      index = 0;
      break;
    case "Snow":
      index = 2;
      break;
    case "Rain":
      index = 1;
      break;
    case "Drizzle":
      index = 1;
      break;
    case "Thunderstorm":
      index = 4;
      break;
    default:
      index = 3;
  }
  $('body').css({
    'background-image': `url(${weatherPicArray[index]})`
  });
};


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
      determineBackgroundFromWeather();
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

  database.ref().push({ 
    currentTime: currentTime, 
    type: care,
    name: petName})

});
$('#love-button').on('click', function (event) {
  event.preventDefault();
  var currentTime = new Date();
  var care = "love";

  database.ref().update({ currentTime: currentTime, type: care, name: petName})

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



$("#buy1").on("click", function(){
  if (chippies >= 50) {
    chippies -= 50;
    steaks += 1;
    $("#feedBadge").html(steaks);
  }
  else {
    $('#steak-price').html('Not enough chippies!');
    setTimeout(() => {
      $('#steak-price').html(`<i class="fas fa-coins"></i> 50`);
    }, 1000);
  }
  $("#chippiesLeft").html(chippies);
  //needs to stop at 0
});



// start of pet display
// interactive pet area


// define canvas
var canvas = document.querySelector('#pet-area');
var c = canvas.getContext('2d');

// set canvas dimensions
canvas.width = 1000;
canvas.height = 400;

var groundLevel = 250;

// define pet sprite
var petSprite = {
  // initialize random stats
  x: Math.random() * 460,
  y: groundLevel,
  dx: 0,
  dy: 0,
  touching: false,
  // speed of animation (higher is slower)
  animationRate: 7,
  // define sprite orientation
  animationDirection: 'left',
  // define animation state
  animationState: {
    // jogging is default mode
      counter: 0,
      frame: 0,
      lastFrame: 5,
      spriteSheetOffset: 4
  },
  // define all possible animation states
  animationModes: {
    right: {
      standing: {
        counter: 0,
        frame: 0,
        lastFrame: 4,
        spriteSheetOffset: 0
      },
      jogging: {
        counter: 0,
        frame: 0,
        lastFrame: 5,
        spriteSheetOffset: 4
      },
      running: {
        counter: 0,
        frame: 0,
        lastFrame: 6,
        spriteSheetOffset: 17.1
      },
      jumping: {
        counter: 0,
        frame: 0,
        lastFrame: 3,
        spriteSheetOffset: 10
      }
    },
    left: {
      standing: {
        counter: 0,
        frame: 0,
        lastFrame: -4,
        spriteSheetOffset: 23
      },
      jogging: {
        counter: 0,
        frame: 0,
        lastFrame: -5,
        spriteSheetOffset: 20
      },
      running: {
        counter: 0,
        frame: 0,
        lastFrame: -6,
        spriteSheetOffset: 5.9
      },
      jumping: {
        counter: 0,
        frame: 0,
        lastFrame: -3,
        spriteSheetOffset: 13
      }
    }
  }, 

  imgRight: document.querySelector('#pet-display-sprite'),
  imgLeft: document.querySelector('#pet-display-sprite-reverse'),
  img: document.querySelector('#pet-display-sprite'),

  draw: function() {
    // determine gait
    if (this.animationDirection === "left") {
      this.img = this.imgLeft;
      if (this.y < groundLevel) {
        this.animationState = this.animationModes.left.jumping;
      }
      else if (this.dx === 0) {
        this.animationState = this.animationModes.left.standing;
      }
      else if (this.dx > 3 || this.dx < -3) {
        this.animationState = this.animationModes.left.running;
      }
      else {
        this.animationState = this.animationModes.left.jogging;
      }
      if (this.animationState.frame < this.animationState.lastFrame){
        this.animationState.frame = 0;
      }
    }
    else if (this.animationDirection === "right") {
      this.img = this.imgRight;
      if (this.y < groundLevel) {
        this.animationState = this.animationModes.right.jumping;
      }
      else if (this.dx === 0) {
        this.animationState = this.animationModes.right.standing;
      }
      else if (this.dx > 3 || this.dx < -3) {
        this.animationState = this.animationModes.right.running;
      }
      else {
        this.animationState = this.animationModes.right.jogging;
      }
      if (this.animationState.frame > this.animationState.lastFrame){
        this.animationState.frame = 0;
      }
    }

    // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    c.drawImage(this.img, 24 * this.animationState.frame + (24 * this.animationState.spriteSheetOffset), 0, 25, 100, this.x, this.y, 160, 640);
    
    this.animationState.counter ++;
    if (this.animationState.counter > this.animationRate) {
      if (this.animationDirection === "left"){
        this.animationState.frame --;
      }
      else if (this.animationDirection === "right") {
        this.animationState.frame ++;
      }
      this.animationState.counter = 0;
    }
  },
  jump: function() {
    if (Math.random() > .995 && this.y === groundLevel) {
      this.dy = -7;
    };
  },
  update: function() {

    // bounce off walls
    if (this.x > innerWidth - 100 || this.x < -15) {
      this.dx = -this.dx;
    }

    if (meat.exists === true && meat.y === groundLevel + 70) {
      if (meat.x >= this.x + 5) {
        this.dx = 5;
      }
      else if (meat.x <= this.x - 5) {
        this.dx = -5;
      }
      if (meat.x < this.x + 50 && meat.x > this.x - 5) {
        meat.exists = false;
        heart.yumText = true;
        heart.hungerText = false;
        setTimeout(() => {
          heart.yumText = false;
        }, 1500);
      }
    }
    else {
    // create random movement
    if (Math.random() > .99) {
      this.dx = (Math.random() - 0.5) * 7;
    }
    else if (Math.random() < .02) {
      this.dx = 0;
    }
    // jump
    this.jump();
    }
    // determine direction sprite is facing
    if (this.dx < 0) {
      this.animationDirection = "left";
    }
    if (this.dx > 0) {
      this.animationDirection = "right";
    };

    // update position from velocities
    this.x += this.dx;
    this.y += this.dy;
    if (this.y < groundLevel) {
      this.dy += 0.5;
    }
    else if (this.y >= groundLevel) {
      this.y = groundLevel;
      this.dy = 0;
    }

    // this.dx = 0; this.dy = 0;
    this.draw();
  }
};

$('#feed-button').on('click', function(event) {
  event.preventDefault();
  if (steaks > 0 && meat.exists === false) {

    meat.exists = true;
    meat.x = Math.random() * 700;
    meat.y = 0;
    meat.dy = 0;
    petArr[currentPet].feed(cookie.foodValue);
    steaks --;
    if (steaks === 0 || steaks < 0) {
      steaks = 0;
    }
    $("#feedBadge").html(steaks);
  };
});

$('#love-button').on('click', function(event) {
  event.preventDefault();
  heart.show = true;
  setTimeout(() => {
    heart.show = false
  }, 1500);
});

var meat = {
  x: Math.random() * 700,
  y: 0,
  dx: 0,
  dy: 0,
  exists: false,
  img: document.querySelector('#pet-love-or-feed'),
  draw: function() {
    
    c.drawImage(this.img, this.x, this.y, 80, 80);
    
  },
  update: function() {
    // update based on player sprite location
    this.x += this.dx;
    this.y += this.dy;
    if (this.y < groundLevel + 70) {
      this.dy += 0.5;
    }
    else {
      this.y = groundLevel + 70;
      this.dy = 0;
    }

    this.draw();
  }
}

var heart = {
  // initialize random stats
  x: Math.random() * 460,
  y: Math.random() * 450,
  show: false,
  yumText: false,
  fullText: false,
  hungerText: false,
  counter: 0,
  frame: 1,
  animationRate: 10,

  img: document.querySelector('#heart-sprite-display1'),

  draw: function() {
    if (this.frame > 3){
      this.frame = 1;
    }
    this.img = document.querySelector(`#heart-sprite-display${this.frame}`);
    
    // how pet is emoting
    if (this.hungerText === true) {
      c.font = "30px Chewy";
      c.fillText("I'm hungry!", this.x, this.y);
    }
    else if (this.show === true) {
      c.drawImage(this.img, this.x, this.y, 45, 45);
    }
    else if (this.yumText === true) {
      c.font = "30px Chewy";
      c.fillText("Yum!", this.x, this.y);
    }
    else if (this.fullText === true) {
      c.font = "30px Chewy";
      c.fillText("I'm full!", this.x, this.y);
    }
    this.counter ++;
    if (this.counter > this.animationRate) {
      this.frame ++;
      this.counter = 0;
    }
  },
  update: function() {
    // update based on player sprite location
    this.x = petSprite.x + 120;
    this.y = petSprite.y - 10;


    this.draw();
  }
}

var cursor = {
  // initialize random stats
  x: 0,
  y: 0,
  w: 0,
  h: 0,


  draw: function() {
    
    // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    
    c.beginPath();
    c.rect(this.x, this.y, this.w, this.h);
    c.stroke();
  },

  update: function() {

    // this.dx = 0; this.dy = 0;
    this.draw();
  }
};

canvas.addEventListener('mousemove', function(event){
    cursor.x = event.offsetX;
    cursor.y = event.offsetY;
});

function animate() {
  
  requestAnimationFrame(animate);

  c.clearRect(0, 0, innerWidth, innerHeight);
  petSprite.update();

  // cursor.update();
  if (meat.exists === true) {
    meat.update();
  }
  if (heart.show === true || heart.yumText === true || heart.fullText === true || heart.hungerText === true) {
    heart.update();
  }
  
  // make heart appear
  // if (cursor.x > petSprite.x && cursor.x < petSprite.x  + 120 &&
  //     cursor.y > petSprite.y && cursor.y < petSprite.y + 160) {
  //     heart.update();
  //     petSprite.touching = true;
  // }
}

animate();