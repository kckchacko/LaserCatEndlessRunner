// Nathan Altice
// Updated: 7/1/20
// Phaser 3 Movement Studies
// Concepts: Arcade physics, atlas and atlasXML loading, atlas animation (custom and generated frames), physics world wrapping, physics body properties (velocity, acceleration, drag, max acceleration), keyboard (isDown, JustPressed, DownDuration, UpDuration)
// Some mechanics inspired by and adapted from Game Mechanic Explorer https://gamemechanicexplorer.com
// The two example atlases  are commercial assets and should not be used for your own projects - buy them from https://www.kenney.nl/assets :)

// tame the javashrek
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
// const paddleVelocity = 150;
// let level;
// let highScore;
// let newHighScore = false;
// let cursors;