// race game
var petId = window.location.search.substring(window.location.search.indexOf('petId=') + 6);
document.querySelector('.pet-sprite-race').setAttribute("src", `../assets/DinoSprites - ${petId} copy.png`);



document.addEventListener('keydown', function(event) {
  if (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "ArrowDown"){
    event.preventDefault();
  }
})

// define canvas
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

// set to true to end game
var end = false;

var score = 0;
var timeRemaining = 50;

var finishLine = 700;

// set canvas dimensions
canvas.width = 800;
canvas.height = 200;

var pinkMonster = {
  x: 45,
  y: 45,
  dx: 0.3,
  dy: 0,
  counter: 0,
  frame: 0,
  animationRate: 5,
  

  img: document.querySelector('.pink-monster-race'),

  draw: function() {
    if (this.frame > 5){
      this.frame = 0;
    }
    // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    c.drawImage(this.img, 32 * this.frame, 0, 25, 100, this.x, this.y, 40, 160);
    this.counter ++;
    if (this.counter > this.animationRate) {
      this.frame ++;
      this.counter = 0;
    }
  },
  update: function () {

    // update position from velocities
    this.x += this.dx;
    this.y += this.dy;

    // this.dx = 0; this.dy = 0;
    this.draw();
  }
};

// define pet sprite
var petSprite = {

  x: 50,
  y: 120,
  dx: 0,
  dy: 0,
  animationRate: 5,
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
    }
  },

  img: document.querySelector('.pet-sprite-race'),

  draw: function() {
    // define conditions for each animation state
    if (this.dx < 0.3 && this.dx > -0.3) {
      this.animationState = this.animationModes.standing;
    }
    else if (this.dx > .7 || this.dx < -.7 ||
            this.dy > .7 || this.dy < -.7) {
      this.animationState = this.animationModes.running;
    }
    else {
      this.animationState = this.animationModes.jogging;
    }
    // execute sprite animations
    if (this.animationState.frame > this.animationState.lastFrame){
      this.animationState.frame = 0;
    }
    // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    c.drawImage(this.img, 24 * this.animationState.frame + (24 * this.animationState.spriteSheetOffset), 0, 25, 100, this.x, this.y, 40, 160);
    this.animationState.counter ++;
    if (this.animationState.counter > this.animationRate) {
      this.animationState.frame ++;
      this.animationState.counter = 0;
    }
  },
  update: function () {

    // update position from velocities
    this.x += this.dx;
    if (this.dx > 0) {
      this.dx -= 0.01;
    }
    else if (this.dx < 0) {
      this.dx = 0;
    };

    // this.dx = 0; this.dy = 0;
    this.draw();
  }
};

// define text prompt object
var promptText = {

  x: petSprite.x + 40,
  y: 145,
  dx: 0,
  dy: 0,

  textOptions: ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", " "],
  textChoice: "",
  prompt: "",

  draw: function() {
    c.font = "20px Bookman";
    c.fillText(this.prompt, this.x, this.y);
  },

  update: function () {

    if (this.prompt === "") {
      this.textChoice = this.textOptions[Math.floor(Math.random() * this.textOptions.length)];
      // update prompt from choice
      if (this.textChoice === "ArrowUp") {
        this.prompt = "↑";
      }
      if (this.textChoice === "ArrowDown") {
        this.prompt = "↓";
      }
      if (this.textChoice === "ArrowRight") {
        this.prompt = "→";
      }
      if (this.textChoice === "ArrowLeft") {
        this.prompt = "←";
      }
      if (this.textChoice === " ") {
        this.prompt = "Space!";
      }
    }
    // update position from velocities
    this.x = petSprite.x + 40;
    this.y += this.dy;

    // this.dx = 0; this.dy = 0;
    this.draw();
  }
}

document.addEventListener('keydown', function(event){
  if(!end) {
      if (event.key === promptText.textChoice) {
        promptText.prompt = "";
        petSprite.dx += .3;
      // update score
      score += 1;
      document.getElementById('scoreboard-race').textContent = `Score: ${score}`;
      }
      else {petSprite.dx = 0;}
    }
  }
);

// adds functionality through iframe to return home
document.getElementById('returnHome').addEventListener('click', function() {
  localStorage.setItem('return', "true");
});

function animate() {
  if (!end) {
    requestAnimationFrame(animate);
  }
  else {
    localStorage.setItem('score', score);
  }
  c.clearRect(0, 0, innerWidth, innerHeight);
  petSprite.update();
  pinkMonster.update();
  promptText.update();
  c.beginPath();
  c.moveTo(finishLine, 0);
  c.lineTo(finishLine, 200);
  c.strokeStyle = "yellow";
  c.stroke();
  if (petSprite.x > finishLine - 20) {
    clearInterval(timer);
    end = true;
    score = timeRemaining + score;
    document.getElementById('scoreboard-race').textContent = `Score: ${score}`;
  }
  if (pinkMonster.x > finishLine - 20) {
    clearInterval(timer);
    end = true;
    document.getElementById('scoreboard-race').textContent = `LOSE`;
  }
  if (end) {
    return;
  }
};


// set timer
var timer = setInterval(function () {
  timeRemaining -= 1;

  document.getElementById('timer-race').textContent = `Time remaining: ${timeRemaining}`;
  

  // when time runs out
  if (timeRemaining === 0) {
    clearInterval(timer);
    end = true;
  }
}, 1000);

animate();