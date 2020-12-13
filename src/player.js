export class Player {
    constructor(nummer, color, name, scene) {
        this.nummer = nummer;
        this.color = color;
        this.name = name;
        this.scene = scene;

        this.playerObj = scene.physics.add.sprite(50, 50, color + "_sprite");
        this.playerObj.setCollideWorldBounds(true);

        this.createAnimations(scene, color);
    }

    animate(direction='none') {
        const color = this.color;
        switch (direction) {
            case 'left':
                this.playerObj.anims.play("left_" + color);
                break;
            case 'right':
                    this.playerObj.anims.play("right_" + color);
                    break;
            case 'up':
                this.playerObj.anims.play("up_" + color);
                break;
            case 'down':
                this.playerObj.anims.play("down_" + color);
                break;
            default:
                this.playerObj.anims.play("stand_" + color);
                break;
        }
    }

    move(horizontal='none', vertical='none') {
        switch(horizontal) {
            case 'left':
                this.playerObj.setVelocityX(-160);
                break;
            case 'right':
                this.playerObj.setVelocityX(160);
                break;
            default:
                this.playerObj.setVelocityX(0);
                break;
        }

        switch(vertical) {
            case 'up':
                this.playerObj.setVelocityY(-160);
                break;
            case 'down':
                this.playerObj.setVelocityY(160);
                break;
            default:
                this.playerObj.setVelocityY(0);
                break;
        }

        const v = this.playerObj.body.velocity;
        if (v.x > 0) {
            this.animate('right');
        } else if (v.x < 0) {
            this.animate('left');
        } else if (v.y > 0) {
            this.animate('down');
        } else if (v.y < 0) {
            this.animate('up');
        } else {
            this.animate('none');
        }
    }

    createAnimations(scene, color) {
        scene.anims.create({
            key: "right_" + color,
            frames: scene.anims.generateFrameNumbers(color + "_sprite", { start: 0, end: 2 }),
            frameRate: 15,
            reapeat: -1,
        });
        scene.anims.create({
            key: "stand_" + color,
            frames: [{ key: color + "_sprite", frame: 3 }],
            frameRate: 1,
        });
        scene.anims.create({
            key: "left_" + color,
            frames: scene.anims.generateFrameNumbers(color + "_sprite", { start: 4, end: 6 }),
            frameRate: 15,
            reapeat: -1,
        });
        scene.anims.create({
            key: "down_" + color,
            frames: scene.anims.generateFrameNumbers(color + "_sprite", { start: 7, end: 9 }),
            frameRate: 15,
            reapeat: -1,
        });
        scene.anims.create({
            key: "up_" + color,
            frames: scene.anims.generateFrameNumbers(color + "_sprite", { start: 10, end: 12 }),
            frameRate: 15,
            reapeat: -1,
        });
    }
}
