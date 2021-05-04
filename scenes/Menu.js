class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    } 

    create(){
        this.add.image(0,0, "title_card").setOrigin(0,0);
        let title_bgm = this.sound.add('sfx_intro');
        title_bgm.play();
        
    }

    update(){

    }
}