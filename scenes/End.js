class End extends Phaser.Scene {
    constructor() {
        super('endScene');
    }
    create(){
        this.add.image(0,0, "end_card").setOrigin(0,0);
        
    }
}