class Tree extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        super(scene, 600, game.config.height- 100, 'cat_tower', 0);
        scene.add.existing(this);   // add to existing scene
        scene.physics.add.existing(this);
        this.setVelocityX(velocity);         // pixels per frame
        // this.physics.add.collider(this, scene.ground);
        this.newTree = true; 
    }

    update() {
        if(this.newTree && this.x < centerX) {
            this.newTree = false;
            // (recursively) call parent scene method from this context
            this.scene.addTree();
        }
        if(this.x < -this.width){
            this.destroy();
            treeCounter--;
            towerDestroyed = true;
        }
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
    addTree(){
        if(treeCounter < 2 && (Math.random()*10 > 9)){
            let tree = new Tree(this,-200);
            this.treeGroup.add(tree);    
            treeCounter++;
            towerDestroyed = false;
            console.log("we are adding a tree")
        }
        
        
    }
    addEnemy(){
        if(enemyDestroyed){
            this.enemy = this.physics.add.sprite(600, game.config.height/2, 'cat_atlas','enemy_walk0001.png').setScale(.90)
            enemyCounter++;
            this.enemy.setVelocityX(-100);
            this.physics.add.collider(this.enemy, this.ground);
            this.physics.add.collider(this.enemy, this.cat);
            this.physics.add.collider(this.enemy, this.bullts)
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
        if(!musicPlaying){
            this.bgm = this.sound.add('sfx_runnerLoopingBg', { 
                mute: false,
                volume: 1,
                rate: 1,
                loop: true 
            });
            this.bgm.play();
            musicPlaying = true;
        }
        
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
        // this.enemy = this.physics.add.sprite(600, game.config.height/2, 'cat_atlas','enemy_walk0001.png').setScale(.90)
        // this.enemy.setVelocityX(-100);
        // this.physics.add.collider(this.enemy, this.ground);
        // this.physics.add.collider(this.enemy, this.cat);
        let enemy = this.addEnemy();
        // this.tower = this.physics.add.sprite(400, game.config.height/2, 'cat_tower')
        // this.tower.destroyed = false;
        this.cat.destroyed = false; 
        this.cat.shooting = false; 
    

        //trying to use the tower class as an object////
        this.treeGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        
        // wait a few seconds before spawning barriers
        this.time.delayedCall(2500, () => { 
            this.addTree(); 
        });
        
        this.physics.add.collider(this.treeGroup, this.ground);
        this.physics.add.collider(this.cat, this.treeGroup);
        
        this.spawnTreeInc = this.time.addEvent({
            delay: 1000,
            callback: this.addTree(),
            callbackScope: this,
            loop: true
        })

        ///========================================================vvv changes
        // this.cat = this.physics.add.sprite(120, game.config.height/2- tileSize, 'cat_atlas','cat_run0001').setScale(SCALE);
        // this.tower1 = this.add.sprite(120, game.config.height- tileSize, 'cat_tower').setScale(SCALE);
        //  this.tree = new Tree(this, 500, game.config.height- 100, 'cat_tower', 0).setOrigin(0, 0);
        //  this.tree.setVelocityX(-100);
        //  this.physics.add.collider(this.tree, this.ground);
        //  this.physics.add.collider(this.tree, this.cat);
        //  this.tree.setVelocityX(-10);
        // this.tree.update();
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
        this.anims.create({ 
            key: 'cat_shoot', 
            frames: this.anims.generateFrameNames('cat_atlas', {      
                prefix: 'cat_shoot',
                start: 1,
                end: 12,
                suffix: '.png',
                zeroPad: 4 
            }), 
            frameRate: 30,
            repeat: -1 
        });
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider
        this.physics.add.collider(this.cat, this.ground);
        // this.physics.add.collider(this.tower, this.ground);
        // this.physics.add.collider(this.cat, this.tower);
        // this.tower.setVelocityX(-100);
        
        
        this.shootKeys = [
			this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
			// this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
		];
        this.bullets = this.physics.add.group({
            defaultKey: 'laser',
            // maxSize: 10
        });
        //collision detection for the bullets
        // this.physics.add.collider(this.bullets,this.treeGroup, function(bullet, tower){
        //     treeCounter--;
        //     towerDestroyed = true;
        //     enemy_dying_sfx.play();
        //     tower.destroy();
        //     bullet.destroy();
        // });
        this.physics.add.collider(this.bullets,this.enemy, function(bullet, enemy){
            treeCounter--;
            enemyDestroyed = true;
            enemy_dying_sfx.play();
            enemy.destroy();
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

        let cat_shoot_sfx = this.sound.add('cat_shoot_sfx');
        console.log("trees=", treeCounter);

        if(counter % 3600 == 0){
            console.log('something')
            counter = 0;
        }
        if(shots_left <= 0){
            this.time.delayedCall(2000, () =>{
                // console.log('just checking');
                shots_left = 2;
            })
        }
        if(treeCounter < 2){
            if((Math.random()*10 > 9) && (counter-counterDelta) > 500){
                counterDelta = counter;
                console.log("counterDelta is", counterDelta);
                this.addTree();
                towerDestroyed = false;
            }
        }
        if(enemyDestroyed && enemyCounter < 1 && (Math.random()*10 > 9) && (counter-counterDelta) > 700){
            counterDelta = counter;
            this.addEnemy();
            enemyDestroyed = false;
        }
    
        
        // update tile sprites (tweak for more "speed")
        this.runner_backg.tilePositionX += this.SCROLL_SPEED;
        //this.tree.tilePositionX += this.SCROLL_SPEED;
        this.groundScroll.tilePositionX += this.SCROLL_SPEED;

        //this.tree.tilePositionX -= 4;
		// check if alien is grounded
	    this.cat.isGrounded = this.cat.body.touching.down;

        this.shootKeys.forEach(key => {
			// Check if the key was just pressed, and if so -> fire the bullet
			if(Phaser.Input.Keyboard.JustDown(key) && shots_left > 0) {
                this.cat.anims.play('cat_shoot', true);
                cat_shoot_sfx.play();
                this.cat.shooting = true;
				this.shoot();
                shots_left = shots_left -1; 
			}
            if(Phaser.Input.Keyboard.JustUp(key)) {
                this.cat.anims.play('cat_run', true);
                this.cat.shooting = false;
                
            }
		});
        
	    if(this.cat.isGrounded && !this.cat.shooting) {
            // this.alien.anims.play('walk', true);
            this.cat.anims.play('cat_run', true);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
            // this.cat.body.velocity.x = 0;
	    } else {
            // this.cat.anims.play('cat_jump');
	    }
        
	    if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 150)) {
            this.cat.anims.play('cat_jump');
	        this.cat.body.velocity.y = this.JUMP_VELOCITY;
            
	        this.jumping = true;
	    } 
        
        // finally, letting go of the UP key subtracts a jump
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
	    if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }
        
    
        if(this.cat.x < 0){
            this.scene.start('endScene');
        }
        counter++;
    }

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
