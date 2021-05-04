class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    } //test

    create(){
        this.add.image(0,0, "title_card").setOrigin(0,0);
        let title_bgm = this.sound.add('sfx_intro');
        title_bgm.play();
        rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.rightKey); 
        
    }

    update(){
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