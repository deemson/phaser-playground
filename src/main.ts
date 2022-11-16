import * as Phaser from 'phaser'

type PhaserSize = Phaser.Structs.Size

class PlaygroundScene extends Phaser.Scene {
  private label: Phaser.GameObjects.Text

  create () {
    const { width, height } = this.scale.gameSize
    this.label = this.add.text(0, 0, `${width}x${height}`)
    const x = width / 2 - this.label.width / 2
    const y = height / 2 - this.label.height / 2
    this.label.setPosition(x, y)
    this.scale.on('resize', this.resize, this)
  }

  resize (gameSize: PhaserSize, baseSize: PhaserSize, displaySize: PhaserSize, width: number, height: number) {
    this.cameras.resize(gameSize.width, gameSize.height)
    const x = gameSize.width / 2 - this.label.width / 2
    const y = gameSize.height / 2 - this.label.height / 2
    this.label.setText(`${gameSize.width}x${gameSize.height}`)
    this.label.setPosition(x, y)
  }
}

new Phaser.Game({
  parent: 'phaser-playground',
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE
  },
  scene: new PlaygroundScene({})
})