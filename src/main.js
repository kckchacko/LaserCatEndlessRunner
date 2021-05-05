// Noor, Kevin, Jordan
// Updated: 5/5/21
// LazerCat
// Creative tilt: The art we implemented in the game is a unique take on endless runners. The sound design is also
// appealing and something we're passionate about. We're proud of what we were able to accomplish in terms of programming. 
// With the time we had, we were able to realize our ideas into a fun and functioning game.

'use strict';

// global variables
let cursors;
let currentScene = 0;
const SCALE = 0.7;
const tileSize = 35;
let KeySPACE, rightKey;

// main game object
let config = {
    type: Phaser.WEBGL,
    width: 539,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Load, Runner, End,  Menu]
};

let game = new Phaser.Game(config);
let shots_left = 2;
let towerDestroyed = false;
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let gameWidth = game.config.width;
let gameHeight = game.config.height;
let musicPlaying = false;
let counter =0;
let counterDelta = 0;
let treeCounter = 0;
let enemyDestroyed = false;
let enemyCounter = 0;
let score = 0;
// const paddleVelocity = 150;
// let level;
// let highScore;
// let newHighScore = false;
// let cursors;