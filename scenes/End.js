class End extends Phaser.Scene {
    constructor() {
        super('endScene');
    }
    create(){
        this.add.image(0,0, "end_card").setOrigin(0,0);
        let scoreConfig = {
            fontFamily: 'Helvetica',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'center',
            padding: {
                top: 2,
                bottom: 2,
            },
            fixedWidth: 100
        }
        let borderUISize = game.config.height / 15;
        let borderPadding = borderUISize / 3;
        this.scoreLeft = this.add.text(borderUISize + borderPadding + 222, borderUISize + borderPadding*2 + 250, score, scoreConfig);
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