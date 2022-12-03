import * as Phaser from 'phaser'

class RotatingPixelSquareScene extends Phaser.Scene {
  private sprite: Phaser.GameObjects.Sprite

  preload () {
    this.load.image('img', 'pixel-render-test.png')
  }

  create () {
    this.sprite = this.add.sprite(12, 12, 'img')
  }

  update (time: number, delta: number) {
    const x = this.input.mousePointer.x - 12
    const y = this.input.mousePointer.y - 12
    this.sprite.rotation = Math.atan2(y, x)
  }
}

export const rotatingPixelSquareGameConfig: Phaser.Types.Core.GameConfig = {
  parent: 'phaser-playground',
  type: Phaser.WEBGL,
  width: 24,
  height: 24,
  scale: {
    zoom: 16,
    autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY,
    mode: Phaser.Scale.ScaleModes.NONE,
  },
  pixelArt: true,
  scene: new RotatingPixelSquareScene({})
}