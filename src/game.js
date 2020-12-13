import Phaser from "phaser";
import { Scene } from "phaser";
import { Player } from './player';

import orange_sprite from "./assets/player_orange.png";

export default {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 800,
    height: 800,
    scene: scene,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

const scene = new Scene("Client");

scene.init = function() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.players = [];
}

scene.preload = function() {
    this.load.spritesheet('orange_sprite',
    orange_sprite,
    { frameWidth: 32, frameHeight: 32 });
}

scene.create = function() {
    this.cameras.main.setBounds(0, 0, 800, 800);
    const player = new Player(1, "orange", "Andreas", this);
    this.players.push(player);

    this.cameras.main.startFollow(player.playerObj, true);
}
