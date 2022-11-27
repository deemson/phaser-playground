import * as Phaser from 'phaser'

type PhaserSize = Phaser.Structs.Size

const toPhaserColor = (jsColor: string): number => {
  return Number('0x' + jsColor.slice(1))
}
const gameSizeColor = '#d5360d'
const baseSizeColor = '#104bbd'
const displaySizeColor = '#0fb45c'
const lineWidth = 10
const lineShift = Math.floor(lineWidth / 2)

const labelText = (size: { width: number, height: number }): string => {
  return `${size.width}x${size.height}`
}

export class SizeRectanglesScene extends Phaser.Scene {
  private gameSizeRect: Phaser.GameObjects.Graphics
  private baseSizeRect: Phaser.GameObjects.Graphics
  private displaySizeRect: Phaser.GameObjects.Graphics
  private gameSizeLabel: Phaser.GameObjects.Text
  private baseSizeLabel: Phaser.GameObjects.Text
  private displaySizeLabel: Phaser.GameObjects.Text

  create () {
    this.gameSizeRect = this.add.graphics()
    this.baseSizeRect = this.add.graphics()
    this.displaySizeRect = this.add.graphics()
    this.gameSizeLabel = this.add.text(0, 0, '0')
    this.baseSizeLabel = this.add.text(0, 0, '0')
    this.displaySizeLabel = this.add.text(0, 0, '0')
    this.drawGameSizeRect(this.scale.gameSize)
    this.drawBaseSizeRect(this.scale.baseSize)
    this.drawBaseSizeRect(this.scale.displaySize)
    this.drawBaseSizeLabel(this.scale.baseSize)
    this.drawGameSizeLabel(this.scale.gameSize)
    this.drawDisplaySizeLabel(this.scale.displaySize)
    this.scale.on('resize', this.resize, this)
  }

  resize (gameSize: PhaserSize, baseSize: PhaserSize, displaySize: PhaserSize, previousWidth: number, previousHeight: number) {
    this.drawGameSizeRect(gameSize)
    this.drawBaseSizeRect(baseSize)
    this.drawDisplaySizeRect(displaySize)
    this.drawBaseSizeLabel(baseSize)
    this.drawGameSizeRect(gameSize)
    this.drawDisplaySizeLabel(displaySize)
  }

  drawGameSizeRect (gameSize: PhaserSize) {
    this.drawRect(gameSize, this.gameSizeRect, toPhaserColor(gameSizeColor))
  }

  drawBaseSizeRect (baseSize: PhaserSize) {
    this.drawRect(baseSize, this.baseSizeRect, toPhaserColor(baseSizeColor))
  }

  drawDisplaySizeRect (displaySize: PhaserSize) {
    this.drawRect(displaySize, this.displaySizeRect, toPhaserColor(displaySizeColor))
  }

  drawBaseSizeLabel (baseSize: PhaserSize) {
    this.baseSizeLabel.setColor(baseSizeColor)
    this.baseSizeLabel.text = labelText(baseSize)
    this.baseSizeLabel.x = this.scale.gameSize.width / 2 - this.baseSizeLabel.width / 2
    this.baseSizeLabel.y = this.scale.gameSize.height / 2 - this.baseSizeLabel.height / 2
  }

  drawGameSizeLabel (gameSize: PhaserSize) {
    this.gameSizeLabel.setColor(gameSizeColor)
    this.gameSizeLabel.text = labelText(gameSize)
    this.gameSizeLabel.x = this.scale.gameSize.width / 2 - this.gameSizeLabel.width / 2
    this.gameSizeLabel.y = this.scale.gameSize.height / 2 - this.baseSizeLabel.height / 2 - this.gameSizeLabel.height
  }

  drawDisplaySizeLabel (displaySize: PhaserSize) {
    this.displaySizeLabel.setColor(displaySizeColor)
    this.displaySizeLabel.text = labelText(displaySize)
    this.displaySizeLabel.x = this.scale.gameSize.width / 2 - this.gameSizeLabel.width / 2
    this.displaySizeLabel.y = this.scale.gameSize.height / 2 + this.baseSizeLabel.height / 2
  }

  drawRect (size: { width: number, height: number }, rect: Phaser.GameObjects.Graphics, color: number) {
    rect.clear()
    rect.lineStyle(lineWidth, color)
    rect.strokeRect(lineShift, lineShift, size.width - lineShift * 2, size.height - lineShift * 2)
  }
}