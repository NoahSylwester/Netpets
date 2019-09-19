// follow game
var petId = window.location.search.substring(window.location.search.indexOf('petId=') + 6);
document.querySelector('.pet-sprite-follow').setAttribute("src", `../assets/DinoSprites - ${petId} copy.png`);


// define canvas
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

// set to true to end game
var end = false;

var score = 0;
var timeRemaining = 30;

// set canvas dimensions
if (window.innerWidth < 600) {
  canvas.width = window.innerWidth - 2;
}
else {
  canvas.width = 500;
};

canvas.height = canvas.width;

// define pet sprite
var petSprite = {
  // initialize random stats
  x: Math.random() * 460,
  y: Math.random() * 450,
  dx: 0,
  dy: 0,
  stamina: 100,
  maxStamina: 100,
  touching: false,
  scoreStash: 0,
  // speed of animation (higher is slower)
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

  img: document.querySelector('.pet-sprite-follow'),

  draw: function() {
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
    if (this.x > (canvas.width * (465/500)) || this.x < -15) {
      this.dx = -this.dx;
    }
    if (this.y > (canvas.height * (468/500)) || this.y < -5) {
      this.dy = -this.dy;
    }

    // move toward cursor if pet has stamina
    if (this.stamina !== 0) {
      this.dx = (cursor.x - (this.x + 17))/70;
      this.dy = (cursor.y - (this.y + 20))/70;
      if (!this.touching) {
        // gain score potential
        this.scoreStash += .05;
      }
    }
    else {
      this.dx = 0;
      this.dy = 0;
      // lose score potential
      if (this.scoreStash > 0) {
        this.scoreStash -= 1;
      }
      else {
        this.scoreStash = 0;
      }
    };

    // update position from velocities
    this.x += this.dx;
    this.y += this.dy;

    // this.dx = 0; this.dy = 0;
    this.draw();
  }
};

var heart = {
  // initialize random stats
  x: Math.random() * 460,
  y: Math.random() * 450,
  counter: 0,
  frame: 1,
  animationRate: 10,

  img: document.querySelector('.heart-sprite-follow3'),

  draw: function() {
    if (this.frame > 3){
      this.frame = 1;
    }
    this.img = document.querySelector(`.heart-sprite-follow${this.frame}`);
    // display exclamations when pet wants to run
    if (petSprite.scoreStash <= 0 && petSprite.stamina === petSprite.maxStamina) {
      c.font = "13px Bookman";
      c.fillText("!!!", this.x, this.y);
    }
    // otherwise draw heart
    else {
      c.drawImage(this.img, this.x, this.y, 15, 15);
    }
    this.counter ++;
    if (this.counter > this.animationRate) {
      this.frame ++;
      this.counter = 0;
    }
  },
  update: function() {
    // update based on player sprite location
    this.x = petSprite.x + 30;
    this.y = petSprite.y;


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

// log cursor position
canvas.addEventListener('mousemove', function(event){
  console.log(event);
  if(!end) {
    cursor.x = event.offsetX;
    cursor.y = event.offsetY;
  }
});

// mobile cursor
canvas.addEventListener('touchmove', function(event){
  console.log(event);
  if(!end) {
    cursor.x = event.changedTouches[0].pageX;
    cursor.y = event.changedTouches[0].pageY - 50;
  }
});


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
  cursor.update();
  // make heart appear, add score
  if (cursor.x > petSprite.x && cursor.x < petSprite.x  + 40 &&
      cursor.y > petSprite.y && cursor.y < petSprite.y + 40) {
      heart.update();
      petSprite.touching = true;
      // also take put scorestash into score
      if (petSprite.scoreStash > 0) {
        if (petSprite.scoreStash > 0) {
          petSprite.scoreStash -= 1;
          score += 1;
        }
        else {
          petSprite.scoreStash = 0;
        }
        console.log(petSprite.scoreStash);
        document.getElementById('scoreboard-follow').textContent = `Score: ${score}`;
      };
      // replenish pet stamina
      if (petSprite.stamina < petSprite.maxStamina) {
        petSprite.stamina += 1;
      }
      else if (petSprite.stamina > petSprite.maxStamina) {
        petSprite.stamina = petSprite.maxStamina;
      }
  }
  else {
    // else deplete pet stamina
    petSprite.touching = false;
    if (petSprite.stamina > 0) {
      petSprite.stamina -= .5;
    }
    else if (petSprite.stamina < 0) {
      petSprite.stamina = 0;
    }
  }
  if (end) {
    return;
  }
}

// set timer
var timer = setInterval(function () {
  timeRemaining -= 1;

  document.getElementById('timer-follow').textContent = `Time remaining: ${timeRemaining}`;
  

  // when time runs out
  if (timeRemaining === 0) {
    clearInterval(timer);
    end = true;
  }
}, 1000);

animate();