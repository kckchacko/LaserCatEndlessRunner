class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set load path
        this.load.path = 'assets/';

        //=================This is all of the stuff from the tutorial==================== 
        // take care of all of our asset loading now
        // this.load.atlas('platformer_atlas', 'kenny_sheet.png', 'kenny_sheet.json');
        // this.load.image('arrowKey', 'arrowKey.png');
        // this.load.image('talltrees', 'talltrees.png');
        // this.load.image('groundScroll', 'ground.png');
        // this.load.atlasXML('shooter_atlas', 'shooter_sheet.png', 'shooter_sheet.xml');
        //===============================================================================

        //enemy, cat, & laser are all located within the texture atlas 
        this.load.atlas('cat_atlas', 'lasercatTextureAtlas.png', 'lasercatTextureAtlas.json');
        //loading audio  
        this.load.audio('sfx_intro', 'lasercatbg_intro.mp3');
        this.load.audio('cat_ded', 'lasercat_ded.mp3');
        this.load.audio('sfx_runnerLoopingBg','lasercat_bg.mp3');
        this.load.audio('cat_shoot', 'shooting_laser.mp3');
        this.load.audio('cat_jump', 'jump.mp3');
        this.load.audio('enemy_ded', 'enemydie.mp3');
        this.load.atlas('platformer_atlas', 'kenny_sheet.png', 'kenny_sheet.json');
        this.load.image('arrowKey', 'arrowKey.png');
        this.load.image('talltrees', 'talltrees.png');
        this.load.image('groundScroll', 'ground.png');
        this.load.atlasXML('shooter_atlas', 'shooter_sheet.png', 'shooter_sheet.xml');
        //loaded images
        this.load.image('title_card', 'lasercat_title.png');
        this.load.image('laser', 'laser.png');
        this.load.image('end_card', 'lasercat_endscreen.png');
        this.load.image('runner_bg', 'lasercat_bg.png');
        this.load.image('cat_tower','cat_tower.png');
        //load font
        this.load.bitmapFont('erasBold', 'font/ErasBoldITC.png', 'font/ErasBoldITC.xml')
    }

    create() {
        // ...and pass to the next Scene
        this.scene.start('laserCatRunnerScene');
    }
}