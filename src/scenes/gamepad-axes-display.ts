import * as Phaser from 'phaser'

class GamepadAxisDisplay {
  private label: Phaser.GameObjects.Text
  private fractionDigits: number

  constructor (add: Phaser.GameObjects.GameObjectFactory, { x = 0, y = 0, fractionDigits = 3 }: Partial<{
    x: number,
    y: number,
    fractionDigits: number,
  }>) {
    this.fractionDigits = fractionDigits
    this.label = add.text(x, y, '0.' + '0'.repeat(fractionDigits))
  }

  get xLeft (): number {
    return this.label.x
  }

  get xRight (): number {
    return this.xLeft + this.label.width
  }

  get yTop (): number {
    return this.label.y
  }

  get yBottom (): number {
    return this.yTop + this.label.height
  }

  set axisValue (value: number) {
    this.label.text = value.toFixed(this.fractionDigits).toString()
  }

}

class GamepadAxesDisplay {
  private left: GamepadAxisDisplay
  private right: GamepadAxisDisplay

  constructor (add: Phaser.GameObjects.GameObjectFactory, { x = 0, y = 0, fractionDigits = 3 }: Partial<{
    x: number,
    y: number,
    fractionDigits: number,
  }> = {}) {
    this.left = new GamepadAxisDisplay(add, { x, y, fractionDigits })
    this.right = new GamepadAxisDisplay(add, {
      x: this.left.xRight,
      y,
      fractionDigits
    })
  }

  set xAxisValue (value: number) {
    if (value < 0) {
      this.left.axisValue = Math.abs(value)
      this.right.axisValue = 0
    } else {
      this.left.axisValue = 0
      this.right.axisValue = value
    }
  }
}

class GamepadAxesDisplayScene extends Phaser.Scene {
  private gamepad?: Phaser.Input.Gamepad.Gamepad
  private gamepadAxesDisplay: GamepadAxesDisplay

  create () {
    this.gamepadAxesDisplay = new GamepadAxesDisplay(this.add)
    this.input.gamepad.on('connected', (gamepadEvent: Gamepad) => {
      this.gamepad = this.input.gamepad.getPad(gamepadEvent.index)
    })

  }

  update (time: number, delta: number) {
    if (this.gamepad === undefined) {
      return
    }
    this.gamepadAxesDisplay.xAxisValue = this.gamepad.axes[0].value
  }
}

export const gamepadDisplayGameConfig: Phaser.Types.Core.GameConfig = {
  parent: 'phaser-playground',
  type: Phaser.WEBGL,
  width: 100,
  height: 100,
  scale: {
    mode: Phaser.Scale.ScaleModes.NONE
  },
  input: {
    gamepad: true
  },
  pixelArt: true,
  scene: new GamepadAxesDisplayScene({})
}