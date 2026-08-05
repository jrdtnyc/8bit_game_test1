export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.scene.add.existing(this);
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    //////////////////////////////////////Character hitbox
    var playerCollider = Bodies.circle(this.x, this.y, 12, {
      isSensor: false,
      label: "playerCollider",
    });
    var playerSensor = Bodies.circle(this.x, this.y, 24, {
      isSensor: true,
      label: "playerSensor",
    });
    const compoundBody = Body.create({
      parts: [playerCollider, playerSensor],
      frictionAir: 0.35,
    });
    this.setExistingBody(compoundBody);
    this.setFixedRotation();
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
    const speed = 1.5;
    let playerVelocity = new Phaser.Math.Vector2();

    let direction = "down";

    if (this.inputKeys.left.isDown) {
      playerVelocity.x = -1;
      direction = "left";
      console.log(direction);
      console.log(playerVelocity.x);
    }
    if (this.inputKeys.right.isDown) {
      playerVelocity.x = 1;
      direction = "right";
      console.log(direction);
      console.log(playerVelocity.x);
    }
    if (this.inputKeys.up.isDown) {
      playerVelocity.y = -1;
      direction = "up";
      console.log(direction);
      console.log(playerVelocity.y);
    }
    if (this.inputKeys.down.isDown) {
      playerVelocity.y = 1;
      direction = "down";
      console.log(direction);
      console.log(playerVelocity.y);
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
