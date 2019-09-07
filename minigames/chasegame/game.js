// chaser game
var petId = window.location.search.substring(window.location.search.indexOf('petId=') + 6);
document.querySelector('.pet-sprite-chaser').setAttribute("src", `../assets/DinoSprites - ${petId} copy.png`);


// define canvas
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

// set to true to end game
var end = false;

var score = 0;
var timeRemaining = 30;

// set canvas dimensions
canvas.width = 500;
canvas.height = 500;


// define pet sprite
var petSprite = {
  // initialize random stats
  x: Math.random() * 450,
  y: Math.random() * 450,
  dx: (Math.random() - 0.5) * 1,
  dy: (Math.random() - 0.5) * 1,
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

  img: document.querySelector('.pet-sprite-chaser'),

  draw: function() {
    // define conditions for each animation state
    if (this.dx < 0.5 && this.dx > -0.5 &&
        this.dy < 0.5 && this.dy > -0.5) {
      this.animationState = this.animationModes.standing;
    }
    else if (this.dx > 3 || this.dx < -3 ||
            this.dy > 3 || this.dy < -3) {
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
  update: function() {

    // bounce off walls
    if (this.x > 465 || this.x < -15) {
      this.dx = -this.dx;
    }
    if (this.y > 468 || this.y < -5) {
      this.dy = -this.dy;
    }

    // add random movement component for unpredictability
    this.dx += (Math.random() - 0.5)/2;
    this.dy += (Math.random() - 0.5)/2;

    // update position from velocities
    this.x += this.dx;
    this.y += this.dy;

    // this.dx = 0; this.dy = 0;
    this.draw();
  }
};

document.addEventListener('click', function(event){
  if(!end) {
    console.log(petSprite.x, event.offsetX, petSprite.y, event.offsetY);
    // detects position of click relative to sprite
    if (event.offsetX > petSprite.x && event.offsetX < petSprite.x  + 40 &&
        event.offsetY > petSprite.y && event.offsetY < petSprite.y + 160) {
        // slow down sprite on catch
        console.log('got em');
      if (petSprite.dx < 0) {
        petSprite.dx += 2;
      }
      else if (petSprite.dx > 0) {
        petSprite.dx -= 2;
      }
      if (petSprite.dy < 0) {
        petSprite.dy += 2;
      }
      else if (petSprite.dy > 0) {
        petSprite.dy -= 2;
      }
      // update score
      score += 1;
      document.getElementById('scoreboard-chaser').textContent = `Score: ${score}`;
    }
  }
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
  if (end) {
    return;
  }
}

// set timer
var timer = setInterval(function () {
  timeRemaining -= 1;

  document.getElementById('timer-chaser').textContent = `Time remaining: ${timeRemaining}`;
  

  // when time runs out
  if (timeRemaining === 0) {
    clearInterval(timer);
    end = true;
  }
}, 1000);

animate();