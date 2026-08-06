//import Phaser from "phaser";
import Player from "./Player.js";
export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }
  //Load images
  preload() {
    //////////////////////////////////////Preload Player Class from Player.js
    Player.preload(this);
    //////////////////////////////////////Preload tilemap .png file and map JSON file
    this.load.image("tiles", "assets/images/RPG Nature Tileset.png");
    this.load.tilemapTiledJSON("map", "assets/images/map.json");
  }
  //////////////////////////////////////Remember that order matters in creation!
  //////////////////////////////////////Always create background layer first and build up from there!!!
  create() {
    //////////////////////////////////////Background
    //Add the imported tileset to addTilesetImage
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("RPG Nature Tileset", "tiles");
    //////////////////////////////////////Draw Map - Tile Layer 1 - From tiled app!
    const layer1 = map.createLayer("Tile Layer 1", tileset, 0, 0); //<---Correct method is createLayer - This adds map layers
    layer1.setDepth(1); //<---This is the ground layer.
    const layer2 = map.createLayer("Tile Layer 2", tileset, 0, 0);
    layer2.setDepth(1);
    //https://phaser.io/news/2021/05/matter-js-collision-tutorial
    layer1.setCollisionByProperty({ collides: true }); //<--collides was set in map.json in Tiled for boundary tiles
    this.matter.world.convertTilemapLayer(layer1);
    //////////////////////////////////////Player
    this.player = new Player({
      scene: this,
      x: 300,
      y: 300,
      texture: "guys",
      frame: "guys000",
    });
    this.player.setDepth(3);

    /*
    this.player2 = new Player({
      scene: this,
      x: 300,
      y: 300,
      texture: "guys",
      frame: "guys000",
    });
    this.player2.setDepth(3);
    */
    //////////////////////////////////////Player Character Key mapping
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }
  //Call 60 fps update on characters, animated objects!
  update() {
    this.player.update();
  }
}
