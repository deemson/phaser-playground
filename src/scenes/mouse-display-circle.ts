import * as Phaser from 'phaser'

class MouseDisplayCircleScene extends Phaser.Scene {
  private line: Phaser.GameObjects.Graphics

  create () {
    const circle = this.add.circle(100, 100, 50)
    circle.setStrokeStyle(3, 0xff0000)
    this.line = this.add.graphics()
    this.updateLine()
  }

  update (time: number, delta: number) {
    this.updateLine()
  }

  updateLine () {
    this.line.clear()
    this.line.lineStyle(3, 0x00ff00)
    const x = this.input.mousePointer.x - 100
    const y = this.input.mousePointer.y - 100
    const len = Math.sqrt(x * x + y * y)
    let newX = this.input.mousePointer.x
    let newY = this.input.mousePointer.y
    if (len > 50) {
      newX = 100 + 50 * x / len
      newY = 100 + 50 * y / len
    }
    this.line.lineBetween(100, 100, newX, newY)
  }
}

export const mouseDisplayCircleGameConfig: Phaser.Types.Core.GameConfig = {
  parent: 'phaser-playground',
  type: Phaser.WEBGL,
  width: 200,
  height: 200,
  scale: {
    zoom: 2,
    mode: Phaser.Scale.ScaleModes.NONE
  },
  pixelArt: true,
  scene: new MouseDisplayCircleScene({})
}