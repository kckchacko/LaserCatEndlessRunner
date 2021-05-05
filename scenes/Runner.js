class Tree extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.moveSpeed = 4;         // pixels per frame
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        } 
    }

    // position reset
    reset() {
        this.x = game.config.width;
    }
}

class Runner extends Phaser.Scene {
    constructor() {
        super('laserCatRunnerScene');
    }

    create() {
        // variables and settings
        this.JUMP_VELOCITY = -700;
        this.MAX_JUMPS = 2;
        this.SCROLL_SPEED = 4;
        currentScene = 3;
        this.physics.world.gravity.y = 2600;

        // add tile sprite
        this.talltrees = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'runner_bg').setOrigin(0);


        // make ground tiles group
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'platformer_atlas', 'block').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        // put another tile sprite above the ground tiles
        this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'groundScroll').setOrigin(0);
        //this.tree = this.add.sprite(500, game.config.height- tileSize -22, 'cat_tower').setScale(SCALE);
        // set up my alien son 👽
        //this.alien = this.physics.add.sprite(120, game.config.height/2-tileSize, 'platformer_atlas', 'side').setScale(SCALE);
        this.cat = this.physics.add.sprite(120, game.config.height/2- tileSize, 'cat_atlas','cat_run0001').setScale(SCALE);
        //this.tree = this.add.sprite(120, game.config.height- tileSize, 'cat_tower').setScale(SCALE);
        this.tree = new Tree(this, 600, game.config.height- 115, 'cat_tower', 0).setOrigin(0, 0);
        // create cat animations from texture atlas
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Types.Animations.html#toc1__anchor
        // key: string, frames: array, frameRate: int, repeat: int
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Types.Animations.html#.GenerateFrameNames__anchor
        // generateFrameNames returns an array of frame names derived from the rules provided in the configuration object parameter
        this.anims.create({ 
            key: 'cat_run', 
            frames: this.anims.generateFrameNames('cat_atlas', {      
                prefix: 'cat_run',
                start: 1,
                end: 12,
                suffix: '.png',
                zeroPad: 4 
            }), 
            frameRate: 30,
            repeat: -1 
        });

        this.anims.create({ 
            key: 'cat_jump', 
            frames: this.anims.generateFrameNames('cat_atlas', {      
                prefix: 'cat_jump',
                start: 1,
                end: 4,
                suffix: '.png',
                zeroPad: 4 
            }), 
            frameRate: 15,
            repeat: -1 
        });

        // add arrow key graphics as UI
        this.upKey = this.add.sprite(64, 32, 'arrowKey');
		this.leftKey = this.add.sprite(32, 64, 'arrowKey');
		this.downKey = this.add.sprite(64, 64, 'arrowKey');
		this.rightKey = this.add.sprite(96, 64, 'arrowKey');
		this.leftKey.rotation = Math.PI/2*3;
		this.downKey.rotation = Math.PI;
        this.rightKey.rotation = Math.PI/2;
        this.leftKey.tint = 0x333333;
        this.downKey.tint = 0x333333;
        this.rightKey.tint = 0x333333;

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider
        //this.physics.add.collider(this.alien, this.ground);
        this.physics.add.collider(this.cat, this.ground);
        this.physics.add.collider(this.cat, this.tree);
        //this.physics.add.overlap(this.cat, this.tree);
    }

    update() {
        // update tile sprites (tweak for more "speed")
        this.talltrees.tilePositionX += this.SCROLL_SPEED;
        //this.tree.tilePositionX += this.SCROLL_SPEED;
        this.groundScroll.tilePositionX += this.SCROLL_SPEED;
        //this.tree.tilePositionX -= 4;
		// check if alien is grounded
	    this.cat.isGrounded = this.cat.body.touching.down;
        this.tree.update();
	    // if so, we have jumps to spare
	    if(this.cat.isGrounded) {
            //this.cat.anims.play('walk', true);
            this.cat.anims.play('cat_run', true);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    } else {
	    	//this.cat.anims.play('jump');
            this.cat.anims.play('cat_jump');
	    }
        // allow steady velocity change up to a certain key down duration
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
	    if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 150)) {
	        this.cat.body.velocity.y = this.JUMP_VELOCITY;
            this.cat.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
	        this.upKey.tint = 0xFACADE;
	    } else {
	    	this.upKey.tint = 0xFFFFFF;
	    }
        // finally, letting go of the UP key subtracts a jump
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
	    if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }
        
        if(this.checkCollision(this.cat, this.tree)) {
            this.tree.reset();
            //this.scene.start('endScene');
        }

       
    }
    checkCollision(cat, tree) {
        // simple AABB checking
        if (cat.x - 100 < tree.x + tree.width && 
            cat.x - 100 + cat.width > tree.x && 
            cat.y < tree.y + tree.height &&
            cat.height + cat.y > tree. y) {
                return true;
        } else {
            return false;
        }
    }
}