class End extends Phaser.Scene {
    constructor() {
        super('endScene');
    }
    create(){
        this.add.image(0,0, "end_card").setOrigin(0,0);
        
    }
    update(){
        this.input.keyboard.on('keydown', (event) => {
            console.log(event);
            switch(event.key) {
                case 'z':
                    this.scene.start('laserCatRunnerScene');
                    break;
                default:
                    break;
            }
        });
    }
}