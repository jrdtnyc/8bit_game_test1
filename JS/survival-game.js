//import Phaser from "phaser";
//import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import MainScene from "./MainScene.js";

//Create the play surface in index.html survival-game div
const config = {
  width: 512,
  height: 480,
  backgroundColor: "#333333",
  parent: "survival-game", //<---Play surface will be generated here!
  scene: [MainScene],
  scale: {
    zoom: 2,
  },
  //Set physics ---> https://docs.phaser.io/phaser/concepts/physics/matter
  type: Phaser.AUTO,
  physics: {
    default: "matter",
    //Using the matter physics engine - Sidescrolling vertical gravity is off!
    matter: {
      debug: true,
      gravity: { y: 0 },
    },
  },
  /*
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin,
        key: "matterCollision",
        mapping: "matterCollision",
      },
    ],
  },*/
};

new Phaser.Game(config);
