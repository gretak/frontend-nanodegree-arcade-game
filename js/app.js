/* canvas size */
var width = 505;
var height = 606;


// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    s = (Math.random() * 250 * dt);
    this.x += s;
    if (this.x > 500) this.x = 0;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var initialPlayerPosY = -20 + (83*5);

var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    // this.x = width/2-50;
    this.x = width/2-50;
    // this.y = height-170;
    this.y = initialPlayerPosY;
    

};

var wonTimes = 0;

// Now write your own player class
// This class requires an update(), render() and
Player.prototype.update = function(dt) {
    //console.log('[update]', { y: this.y, x: this.x });
    if (this.y<0){
        this.y=initialPlayerPosY;
        this.x=width/2-50;
        wonTimes++;
        document.getElementById('wonTimes').innerHTML = wonTimes;
    }
    this.x*(dt);
    this.y*(dt);
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
   // all computers.
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// a handleInput() method.

Player.prototype.handleInput = function(direction){
    if (direction==="up" && this.y>-50){
        this.y-=83;
    }
    if (direction==="down" && this.y<395){
        this.y+=83;
    }
    if (direction==="left" && this.x>5){
        this.x-=100;
    }
    if (direction==="right" && this.x<400){
        this.x+=100;
    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies=[new Enemy];
for (var i = 0; i < 3; i++) {
   y = 220 - (80 * i);
   x = 400 / (1 + i);
   allEnemies.push(new Enemy(x,y));
}
var player = new Player;

var lostTimes=0;

function checkCollisions() {
 for (var i=0;i<allEnemies.length;i++) {
    if ((allEnemies[i].x) <= player.x + 30 &&
            (allEnemies[i].x + 30) >= (player.x) &&
            (allEnemies[i].y)<= player.y + 30 &&
            (allEnemies[i].y + 30) >= (player.y)) {
         alert('YOU LOSE');
      player.y=initialPlayerPosY;
      player.x=width/2-50; 
      lostTimes ++;
      document.getElementById('lostTimes').innerHTML = lostTimes;
  }
};
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
