import * as Phaser from 'phaser'

const speed = 10

export class MovingPixelSquareScene extends Phaser.Scene {
  private sprite: Phaser.GameObjects.Sprite

  preload () {
    this.load.image('img', 'pixel-render-test.png')
  }

  create () {
    this.sprite = this.add.sprite(0, 0, 'img')
    this.sprite.setScale(10, 10)
    this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          this.sprite.y -= speed
          break
        case 'ArrowDown':
          this.sprite.y += speed
          break
        case 'ArrowLeft':
          this.sprite.x -= speed
          break
        case 'ArrowRight':
          this.sprite.x += speed
          break
      }
    })
  }
}