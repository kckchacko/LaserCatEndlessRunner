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
class laser extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.moveSpeed = 7;         // pixels per frame
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
    shoot() {
        var bullet = this.bullets.get(this.cat.x + 40, this.cat.y);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.setAllowGravity(false);
            bullet.body.velocity.x = 200;
        }
    }
    create() {
        // variables and settings
        this.JUMP_VELOCITY = -700;
        this.MAX_JUMPS = 2;
        this.SCROLL_SPEED = 4;
        currentScene = 3;
        this.physics.world.gravity.y = 2600;

        // add tile sprite
        this.runner_backg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'runner_bg').setOrigin(0);

        // play music 
        // let runner_bgm = this.sound.add('sfx_runnerLoopingBg');
        // runner_bgm.play();
        let enemy_dying_sfx = this.sound.add('enemy_ded');
        this.bgm = this.sound.add('sfx_runnerLoopingBg', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        });
        this.bgm.play();

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
        
        this.cat = this.physics.add.sprite(120, game.config.height/2, 'cat_atlas','cat_run0001.png').setScale(SCALE)
        this.tower = this.physics.add.sprite(400, game.config.height/2, 'cat_tower')
        this.tower.destroyed = false; 
        ///========================================================vvv changes
        // this.cat = this.physics.add.sprite(120, game.config.height/2- tileSize, 'cat_atlas','cat_run0001').setScale(SCALE);
        // //this.tree = this.add.sprite(120, game.config.height- tileSize, 'cat_tower').setScale(SCALE);
        // this.tree = new Tree(this, 500, game.config.height- 100, 'cat_tower', 0).setOrigin(0, 0);
        // this.laser = new laser(this, 700, game.config.height- 300, 'laser', 0).setOrigin(0, 0);
       //===================
       
        // create cat animations from texture atlas
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
            frameRate: 10,
            repeat: -1 
        });


        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider
        this.physics.add.collider(this.cat, this.ground);
        this.physics.add.collider(this.tower, this.ground);
        this.physics.add.collider(this.cat, this.tower);
        this.tower.setVelocityX(-100);
        
        
        //========================merge
        // this.tree = new Tree(this, 100, game.config.height- 115, 'cat_tower', 0).setOrigin(0, 0);
        // this.physics.add.collider(this.cat, this.tree);
        //this.physics.add.overlap(this.cat, this.tree);
        this.shootKeys = [
			this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
			// this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
		];
        this.bullets = this.physics.add.group({
            defaultKey: 'laser',
            maxSize: 10
        });
        //collision detection for the bullets
        this.physics.add.collider(this.bullets,this.tower, function(bullet, tower){
            enemy_dying_sfx.play();
            tower.destroy();
            bullet.destroy();
        });


        // set up Scene switcher
        this.input.keyboard.on('keydown', (event) => {
            //console.log(event);
            switch(event.key) {
                case '1':
                    this.scene.start('laserCatRunnerScene');
                    break;
                case '2':
                    this.scene.start('menuScene');
                    break;
                case '3':
                    this.scene.start('endScene');
                    break;
                default:
                    break;
            }
        });
        
        
        
    }

    update() {
        // update tile sprites (tweak for more "speed")
        this.runner_backg.tilePositionX += this.SCROLL_SPEED;
        //this.tree.tilePositionX += this.SCROLL_SPEED;
        this.groundScroll.tilePositionX += this.SCROLL_SPEED;

        //this.tree.tilePositionX -= 4;
		// check if alien is grounded
	    this.cat.isGrounded = this.cat.body.touching.down;
        // this.tree.update();
        // this.laser.update();
        if(!this.tower.destroyed){
            this.physics.world.collide(this.tower, this.bullets, this.bulletCollision, null, this );
            // console.log("this is the statment");
        }
        this.shootKeys.forEach(key => {
			// Check if the key was just pressed, and if so -> fire the bullet
			if(Phaser.Input.Keyboard.JustDown(key)) {
				this.shoot();
			}
		});

	    // if so, we have jumps to spare
	    if(this.cat.isGrounded) {
            // this.alien.anims.play('walk', true);
            this.cat.anims.play('cat_run', true);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
            // this.cat.body.velocity.x = 0;
	    } else {
            // this.cat.anims.play('cat_jump');
	    }
        // if(Phaser.Input.Keyboard.DownDuration(cursors.a, 150))
        // allow steady velocity change up to a certain key down duration
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
	    if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 150)) {
            this.cat.anims.play('cat_jump');
	        this.cat.body.velocity.y = this.JUMP_VELOCITY;
            // this.cat.body.velocity.x = 10;
	        this.jumping = true;
	    } 
        
        // finally, letting go of the UP key subtracts a jump
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
	    if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }
        
        // if(this.checkCollision(this.cat, this.tree)) {
        //     this.tree.reset();
        //     // this.scene.start('endScene');
        // }
        if(this.tower.x < 0){
            this.tower.x = game.config.width;
            //this.tree.reset();
            // this.scene.start('endScene');

        }
        if(this.cat.x < 0){
            this.scene.start('endScene');
        }
        // if(this.checkCollision2(this.cat, this.laser)) {
        //     //this.laser.reset();
        //     this.scene.start('endScene');
        // }

       
    }
    // bulletCollision(){
    //     console.log("hello world");
    // }
    checkCollision(cat, tree) {
        // simple AABB checking
        if (cat.x - 50 < tree.x + tree.width && 
            cat.x - 50 + cat.width > tree.x && 
            cat.y < tree.y + tree.height &&
            cat.height + cat.y > tree. y) {
                return true;
        } else {
            return false;
        }
    }
    checkCollision2(cat, tree) {
        // simple AABB checking
        if (cat.x - 100 < tree.x + tree.width && 
            cat.x - 100+ cat.width > tree.x && 
            cat.y < tree.y + tree.height &&
            cat.height + cat.y > tree. y) {
                return true;
        } else {
            return false;
        }
        
    }
    
}
