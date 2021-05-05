class Tower extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);   // add to existing scene
        this.physics.add.existing(this);
        this.setVelocityX(-100)
        this.newTower = true;
        this.frequency = 10; 
    }

    update() {
        // move spaceship left
        if(this.newTower && this.x < gameWidth){
            this.newTower = false;
            this.scene.addTower();
        }
    }

    // position reset
    reset() {
        this.x = game.config.width;
    }
}

// constructor(scene, x, y, texture, velocity =500) {
//     super( scene, game.config.width , Phaser.Math.Between(128/2, game.config.height - 128/2), 'items');

//      // add object to the existing scene
//      scene.add.existing(this);
//      scene.physics.add.existing(this);
//      this.setOffset(32, -8);
//      this.setVelocityX(-velocity);
//      this.setImmovable();
//      this.newItem = true;

//      if(this.x < -this.width) {
//         this.destroy();
//      }        
// }     

// update() {
//     if(this.newItem && this.x < game.config.width/2) {
//         this.newItem = false;
//         this.scene.addItem(this.velocity);
      
//     }
// }