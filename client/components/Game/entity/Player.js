import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.armed = false;
    this.hat = false;
    // << INITIALIZE PLAYER ATTRIBUTES HERE >>
  }

  // Check which controller button is being pushed and execute movement & animation
  updateMovement(cursors) {
    // Move left
    if (cursors.left.isDown) {
      this.setVelocityX(-360);
      if (this.body.touching.down) {
        this.play('left', true);
      }
    }
    // Move right
    else if (cursors.right.isDown) {
      this.setVelocityX(360);
      if (this.body.touching.down) {
        this.play('right', true);
      }
    }
    // Neutral (no movement)
    else {
      if (this.hat) {
        this.setVelocityX(0);
        this.play('wearingHat', true);
      } else if (this.armed) {
        this.setVelocityX(0);
        this.play('wandHand', true);
      } else {
        this.setVelocityX(0);
        this.play('turn', true);
      }
    }
  }

  updateJump(cursors, jumpSound) {
    if (cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-800);
      jumpSound.play();
      if (cursors.right.isDown) {
        this.play('rightJump', true);
      } else if (cursors.left.isDown) {
        this.play('leftJump', true);
      }
    }
  }

  update(cursors, jumpSound) {
    this.updateMovement(cursors);
    this.updateJump(cursors, jumpSound);
  }
}
