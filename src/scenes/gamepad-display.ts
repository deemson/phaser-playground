import * as Phaser from 'phaser'

// https://gamepad-tester.com/

class RoundButton {
  private circle: Phaser.GameObjects.Arc

  constructor (add: Phaser.GameObjects.GameObjectFactory, private x: number, private y: number, private radius: number) {
    this.circle = add.circle(x, y, radius)
    this.circle.setStrokeStyle(2, 0xffffff)
    this.circle.setFillStyle(0x000000, 1)
  }

  update (isOn: boolean) {
    if (isOn) {
      this.circle.setFillStyle(0xdddddd, 1)
    } else {
      this.circle.setFillStyle(0x000000, 1)
    }
  }
}

class GamepadStick {
  private circle: Phaser.GameObjects.Arc
  private line: Phaser.GameObjects.Graphics

  constructor (add: Phaser.GameObjects.GameObjectFactory, private x: number, private y: number, private radius: number) {
    this.line = add.graphics()
    this.line.lineStyle(3, 0xffffff)
    this.line.lineBetween(x, y, x, y)
    this.circle = add.circle(x, y, radius)
    this.circle.setFillStyle(0x000000, 0)
    this.circle.setStrokeStyle(2, 0xffffff)
  }

  update (xAxis: number, yAxis: number) {
    this.line.clear()
    this.line.lineStyle(3, 0xffffff)
    this.line.lineBetween(
      this.x,
      this.y,
      this.x + this.radius * xAxis,
      this.y + this.radius * yAxis,
    )
  }
}

class GamepadDisplay {

}

class GamepadDisplayScene extends Phaser.Scene {
  private gamepad?: Phaser.Input.Gamepad.Gamepad
  private leftStick: GamepadStick
  private rightStick: GamepadStick
  private onSignal: RoundButton

  create () {
    this.onSignal = new RoundButton(this.add, 80, 30, 5)
    this.leftStick = new GamepadStick(this.add, 40, 50, 30)
    this.rightStick = new GamepadStick(this.add, 120, 50, 30)
    this.input.gamepad.on('connected', (gamepadEvent: Gamepad) => {
      console.log('gamepad connected')
      this.gamepad = this.input.gamepad.getPad(gamepadEvent.index)
      this.gamepad.on('down', (buttonEvent) => {
        console.log(buttonEvent)
      })
    })
  }

  update () {
    if (this.gamepad === undefined) {
      this.onSignal.update(false)
      return
    }
    this.onSignal.update(true)
    this.leftStick.update(this.gamepad.axes[0].value, this.gamepad.axes[1].value)
    this.rightStick.update(this.gamepad.axes[2].value, this.gamepad.axes[3].value)
  }
}

export const gamepadDisplayGameConfig: Phaser.Types.Core.GameConfig = {
  parent: 'phaser-playground',
  type: Phaser.WEBGL,
  width: 200,
  height: 200,
  scale: {
    mode: Phaser.Scale.ScaleModes.NONE
  },
  input: {
    gamepad: true
  },
  pixelArt: true,
  scene: new GamepadDisplayScene({})
}