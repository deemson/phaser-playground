import * as Phaser from 'phaser'

type PhaserSize = Phaser.Structs.Size

const toPhaserColor = (jsColor: string): number => {
  return Number('0x' + jsColor.slice(1))
}
const gameSizeColor = toPhaserColor('#d5360d')
const baseSizeColor = toPhaserColor('#104bbd')
const displaySizeColor = toPhaserColor('#0fb45c')
const scaleSizeColor = toPhaserColor('#b4850f')
const lineWidth = 10
const lineShift = Math.floor(lineWidth / 2)

export class SizeRectanglesScene extends Phaser.Scene {
  private gameSizeRect: Phaser.GameObjects.Graphics
  private baseSizeRect: Phaser.GameObjects.Graphics
  private displaySizeRect: Phaser.GameObjects.Graphics
  private scaleSizeRect: Phaser.GameObjects.Graphics

  create () {
    this.gameSizeRect = this.add.graphics()
    this.baseSizeRect = this.add.graphics()
    this.displaySizeRect = this.add.graphics()
    this.scaleSizeRect = this.add.graphics()
    this.drawGameSizeRect(this.scale.gameSize)
    this.drawBaseSizeRect(this.scale.baseSize)
    this.drawBaseSizeRect(this.scale.displaySize)
    this.drawScaleSizeRect(this.scale.width, this.scale.height)
    this.scale.on('resize', this.resize, this)
  }

  resize (gameSize: PhaserSize, baseSize: PhaserSize, displaySize: PhaserSize, width: number, height: number) {
    this.drawGameSizeRect(gameSize)
    this.drawBaseSizeRect(baseSize)
    this.drawDisplaySizeRect(displaySize)
    this.drawScaleSizeRect(width, height)
  }

  drawGameSizeRect (gameSize: PhaserSize) {
    this.drawRect(gameSize, this.gameSizeRect, gameSizeColor)
  }

  drawBaseSizeRect (baseSize: PhaserSize) {
    this.drawRect(baseSize, this.baseSizeRect, baseSizeColor)
  }

  drawDisplaySizeRect (displaySize: PhaserSize) {
    this.drawRect(displaySize, this.displaySizeRect, displaySizeColor)
  }

  drawScaleSizeRect (width: number, height: number) {
    this.drawRect({ width, height }, this.scaleSizeRect, scaleSizeColor)
  }

  drawRect (size: { width: number, height: number }, rect: Phaser.GameObjects.Graphics, color: number) {
    rect.clear()
    rect.lineStyle(lineWidth, color)
    rect.strokeRect(lineShift, lineShift, size.width - lineShift * 2, size.height - lineShift * 2)
  }
}