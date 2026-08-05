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
    //This function sets the first keyframe of character movement.
    this.player = new Player({
      scene: this,
      x: 0,
      y: 0,
      texture: "guys",
      frame: "guys000",
    });
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
