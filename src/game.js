import Phaser from "phaser";
import { Scene } from "phaser";
import { Client } from './client';

import bg from "./assets/bg.png";
import orange_sprite from "./assets/player_orange.png";
import green_sprite from "./assets/player_green.png";
import pink_sprite from "./assets/player_pink.png";
import cyan_sprite from "./assets/player_cyan.png";

const scene = new Scene("Client");

scene.init = function() {
    this.cursors = this.input.keyboard.createCursorKeys();
}

scene.preload = function() {
    this.load.image('bg', bg);

    this.load.spritesheet('orange_sprite',
    orange_sprite,
    { frameWidth: 32, frameHeight: 32 });

    this.load.spritesheet('green_sprite',
    green_sprite,
    { frameWidth: 32, frameHeight: 32 });

    this.load.spritesheet('pink_sprite',
    pink_sprite,
    { frameWidth: 32, frameHeight: 32 });

    this.load.spritesheet('cyan_sprite',
    cyan_sprite,
    { frameWidth: 32, frameHeight: 32 });
}

scene.create = function() {
    this.cameras.main.setBounds(0, 0, 800, 800);

    for (var x = 0; x < 13; x++) {
        for (var y = 0; y < 13; y++) {
            this.add.image(64 * x, 64 * y, 'bg').setOrigin(0);
        }
    }

    Client.start();
}

scene.update = function (){
    const cursors = this.cursors;
    const player = Client.getCurrentPlayer();
    console.log(player);
    if (!player) {
        return;
    }

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

    const data = {
        horizontal: horizontal,
        vertical: vertical,
        player_nr: player.nr,
        x: player.playerObj.x,
        y: player.playerObj.y,
    }
    Client.socket.emit('move', data);
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
