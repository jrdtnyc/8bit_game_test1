export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.scene.add.existing(this);
  }
  //////////////////////////////////////
  static preload(scene) {
    scene.load.atlas(
      "guys",
      "assets/images/guys.png",
      "assets/images/guys_atlas.json",
    );
    scene.load.animation("guys_anim", "assets/images/guys_anim.json");
  }

  get velocity() {
    return this.body.velocity;
  }

  //////////////////////////////////////
  update() {
    this.setVelocity(0);
    let playerVelocity = new Phaser.Math.Vector2();
    let direction = "down";

    const speed = 2.5;

    if (this.inputKeys.left.isDown) {
      playerVelocity.x = -1;
      direction = "left";
      console.log(direction);
    }
    if (this.inputKeys.right.isDown) {
      playerVelocity.x = 1;
      direction = "right";
      console.log(direction);
    }
    if (this.inputKeys.up.isDown) {
      playerVelocity.y = -1;
      direction = "up";
      console.log(direction);
    }
    if (this.inputKeys.down.isDown) {
      playerVelocity.y = 1;
      direction = "down";
      console.log(direction);
    }
    playerVelocity.normalize();
    playerVelocity.scale(speed);

    this.setVelocity(playerVelocity.x, playerVelocity.y);
    console.log(this.velocity.x, this.velocity.y);
    if (this.velocity.x > 0.1) {
      const flipAnimsRight = this.anims.play("walk_side", true);
      flipAnimsRight.setFlipX(true);
    }

    if (this.velocity.x < -0.1) {
      this.anims.play("walk_side", true);
      const flipAnimsRight = this.anims.play("walk_side", true);
      flipAnimsRight.setFlipX(false);
    }

    if (this.velocity.y > 0.1) {
      this.anims.play("walk_front", true);
    }

    if (this.velocity.y < -0.1) {
      this.anims.play("walk_back", true);
    }
    //////////////////////////////////////
  }
}
