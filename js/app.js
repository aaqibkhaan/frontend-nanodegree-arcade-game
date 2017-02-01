// Global Variables
var allEnemies , enemy , level , player;

// SuperClasses

var Character = function (sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;

};

// Draw the Chracter(Enemy and Player) on the screen, required method for game
Character.prototype.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Enemies our player must avoid
var Enemy = function(sprite, x , y , speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

// Superclass function call
    Character.call(this, sprite, x , y);

    // random speed for all the enemies
    this.speed = Math.floor((Math.random() * 250) + 100);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
};

// Enemy.prototype inherting Chracter.protype methods
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x<=550) {
        this.x += this.speed *dt;
    } else {
        this.x = -3;
    }

    // checking collision with Enemies

    checkCollision(this);

};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (sprite, x , y , speed) {
    // SuperClass Character call
    Character.call(this, sprite, x , y);
    // player moving at 60px speed
    this.speed = 60;

};

// Player.prototype inherting Chracter.protype methods
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;


Player.prototype.update = function () {
// no need to use at the moment
};

// Handling the Keyboard inputs and Keeping Player inside Canvas

Player.prototype.handleInput = function (pressKey) {

    if (pressKey==="up") {
             if (this.y < 65) {
        this.reset();
        // if Player reaches water increment level by 1 
        level++;

        console.log("Current Level : " + level );

        increaseLevel(level);
        gameStats();
        maxLevel();

    } else {
        this.y -= this.speed +20; 
    }
    } else if (pressKey=="down" && this.y < 400) {
        this.y += this.speed -20;
   
    } else if (pressKey == "right" && this.x < 400) {
        this.x += this.speed;
    } else if (pressKey == "left" && this.x > 0) {
        this.x -= this.speed;
    }
};

//Reset function for Player 
Player.prototype.reset = function () {
    this.x= 200;
    this.y = 380;
};

// Collision Detection between Enemies and Player
var checkCollision = function (anEnemy) {
// if player reaches near Enemy by 40 px in any direction player location will be reset
for (var i = 0; i < allEnemies.length; i++) {
        if (Math.abs(player.x - allEnemies[i].x) <= 40) {
            if (Math.abs(player.y - allEnemies[i].y) <= 40) {
                player.reset();
                // deacreasing the level of Game
                decreaseLevel();
                // Displaying the updated level
                gameStats();
                console.log("Current Level : " + level );
      
            }
        }
}
};

// Increasing level of the game by adding a Bug everytime level is increased by 1 
var increaseLevel = function (level) {
// Increasing the enemies as level increased
    allEnemies.length = 0; 
    for (var i = 0; i < level; i++) {
        var enemy = new Enemy('images/enemy-bug.png', -3, Math.random() * 190 + 50 );
        allEnemies.push(enemy);

    }
};

// checking if the player has reached Maximum limit of level which is 5
var maxLevel = function(){
    if (level >= 5) {
        console.log("Bravo!! You have reached Maximum Level , Please restart the Game to Play More");
        decreaseLevel();
    }
};

// Take one enemy out 
var decreaseLevel = function() {
    if (allEnemies.length >=1) {
        allEnemies.pop(enemy);
        level--;
    }

};

// displaying Statistics of the Game
var gameStats = function() {
   document.getElementById('gameStats').innerHTML = "Level :" + level.toString();
    document.getElementById('nOfEnemies').innerHTML = "Enemies : " + allEnemies.length.toString()  ; 
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
    allEnemies = [];
    // initiating first enemy
    enemy = new Enemy ('images/enemy-bug.png', -3 , 60);
    allEnemies.push(enemy);

    level = 1;

// Place the player object in a variable called player

    player  = new Player('images/char-boy.png', 200 , 380);

// Calling method to display Level and Enemies
gameStats();

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

 