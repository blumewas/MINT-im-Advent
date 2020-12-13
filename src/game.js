import Phaser from "phaser";
import { Scene } from "phaser";
import { Player } from './player';

import bg from "./assets/bg.png";
import orange_sprite from "./assets/player_orange.png";

const scene = new Scene("Client");

scene.init = function() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.players = [];
}

scene.preload = function() {
    this.load.image('bg', bg);

    this.load.spritesheet('orange_sprite',
    orange_sprite,
    { frameWidth: 32, frameHeight: 32 });
}

scene.create = function() {
    this.cameras.main.setBounds(0, 0, 800, 800);

    for (var x = 0; x < 13; x++) {
        for (var y = 0; y < 13; y++) {
            this.add.image(64 * x, 64 * y, 'bg').setOrigin(0);
        }
    }

    const player = new Player(1, "orange", "Andreas", this);
    this.players.push(player);

    this.cameras.main.startFollow(player.playerObj, true);
}

scene.update = function (){
    const cursors = this.cursors;
    const player = this.players[0];

    let vertical;
    let horizontal;
    if (cursors.left.isDown) {
        horizontal = 'left';
    } else if (cursors.right.isDown) {
        horizontal = 'right';
    }

    if (cursors.up.isDown) {
        vertical = 'up';
    } else if (cursors.down.isDown) {
        vertical = 'down';
    }
    player.move(horizontal, vertical);
}

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
