class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    } //test

    create(){
        this.add.image(0,0, "title_card").setOrigin(0,0);
        let title_bgm = this.sound.add('sfx_intro');
        title_bgm.play();
        rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.rightKey); 
        this.add.bitmapText(200,200, 'erasBold', 'SCORE', 64).setOrigin(0.5);


        // this.cat = this.physics.add.sprite(120, game.config.height/2- tileSize, 'cat_atlas','cat_run0001.png').setScale(SCALE);
        // this.anims.create({ 
        //     key: 'cat_run', 
        //     frames: this.anims.generateFrameNames('cat_atlas', {      
        //         prefix: 'cat_run',
        //         start: 1,
        //         end: 12,
        //         suffix: '.png',
        //         zeroPad: 4 
        //     }), 
        //     frameRate: 30,
        //     repeat: -1 
        // });
        // this.cat.visible = false;
    }

    update(){
        // this.cat.anims.play('cat_run');
        this.input.keyboard.on('keydown', (event) => {
            console.log(event);
            switch(event.key) {
                case '1':
                    this.scene.start('laserCatRunnerScene');
                    break;
                default:
                    break;
            }
        });
    }
}