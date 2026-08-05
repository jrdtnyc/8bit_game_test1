import Player from "./Player.js";
export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }
  //Load images
  preload() {
    Player.preload(this);
  }
  //Game objects
  create() {
    this.player = new Player({
      scene: this,
      x: 0,
      y: 0,
      texture: "guys",
      frame: "guys000",
    });

    //Test Player
    let testPlayer = new Player({
      scene: this,
      x: 100,
      y: 100,
      texture: "guys",
      frame: "guys000",
    });
    //Test Player

    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }
  //Called 60fps to updatwe play surface
  update() {
    this.player.update();
  }
}
