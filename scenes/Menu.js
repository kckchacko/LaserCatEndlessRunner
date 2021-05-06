class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    } //test

    create(){
        this.add.image(0,0, "title_card").setOrigin(0,0);
        let title_bgm = this.sound.add('sfx_intro');
        title_bgm.play();
        rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.rightKey); 
        // this.add.bitmapText(200,200, 'erasBold', 'SCORE', 64).setOrigin(0.5);


    }

    update(){
        // this.cat.anims.play('cat_run');
        this.input.keyboard.on('keydown', (event) => {
            console.log(event);
            switch(event.key) {
                case '1':
                    this.scene.start('laserCatRunnerScene');
                    title_bgm.stop();
                    break;
                default:
                    break;
            }
        });
    }
}