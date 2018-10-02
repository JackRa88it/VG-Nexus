## Phaser Website
http://phaser.io/

## First game tutorial
https://phaser.io/tutorials/making-your-first-phaser-3-game

## Examples
https://labs.phaser.io/

## Free assets
https://opengameart.org/

## Socket+Phaser Tutorial
https://gamedevacademy.org/create-a-basic-multiplayer-game-in-phaser-3-with-socket-io-part-1/


## Socket Notes

* socket.emit sends a signal to the client that triggered the "on" event handler
* socket.broadcast.emit sends a signal to ALL clients

## Creating class objects(to help separate code)
http://labs.phaser.io/edit.html?src=src\game%20objects\images\custom%20image%20class%20ES6.js
http://metroid.niklasberg.se/2016/02/12/phaser-making-and-using-a-generic-enemy-class-es6es2015/

# Notes
* looking at the docs, it seems that sprites and images have no functional difference. They just kept in both for legacy reasons.
* update() is called in every single game object that Phaser is tracking.
    * i.e. if there is a function called update() inside the enemy class it will be called every frame.

## Classes in ES6
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

## Setting up phaser in node
https://medium.com/@16patsle/running-phaser-3-on-the-server-4c0d09ffd5e6

## Creating an Enemy
* Add enemies as a constructor in enemiesServer.js
* Use Tier1Melee as a template
* the update() method is called at a tickrate of 30fps

* Near the end of update:
    this.x += this.xvel
    this.y += this.yvel
    
* Is called. The script should affect the velocity/acceleration of the enemy and then the position is updated based on that.

* Some possible useful functions are added at the end such as
    * angleBetween
    * unitVector
    * I should add a custom tween where in it follows the arc of the function provided with time as a parameter